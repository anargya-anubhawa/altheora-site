import { getAllPagesInSpace, getPageProperty, uuidToId } from 'notion-utils'
import pMemoize from 'p-memoize'

import type * as types from './types'
import * as config from './config'
import { includeNotionIdInUrls } from './config'
import { getCanonicalPageId } from './get-canonical-page-id'
import { notion } from './notion-api'

const uuid = !!includeNotionIdInUrls

export async function getSiteMap(): Promise<types.SiteMap> {
  const partialSiteMap = await getAllPages(
    config.rootNotionPageId,
    config.rootNotionSpaceId ?? undefined
  )

  return {
    site: config.site,
    ...partialSiteMap
  } as types.SiteMap
}

const getAllPages = pMemoize(getAllPagesImpl, {
  cacheKey: (...args) => JSON.stringify(args)
})

const getPage = async (pageId: string, opts?: any) => {
  console.log('\nnotion getPage', uuidToId(pageId))
  return notion.getPage(pageId, {
    kyOptions: {
      timeout: 30_000
    },
    ...opts
  })
}

async function getAllPagesImpl(
  rootNotionPageId: string,
  rootNotionSpaceId?: string,
  {
    maxDepth = 10
  }: {
    maxDepth?: number
  } = {}
): Promise<Partial<types.SiteMap>> {
  const pageMap = await getAllPagesInSpace(
    rootNotionPageId,
    rootNotionSpaceId,
    getPage,
    {
      maxDepth
    }
  )

  const canonicalPageMap: Record<string, string> = {}

  for (const pageId of Object.keys(pageMap)) {
    const recordMap = pageMap[pageId]
    if (!recordMap) continue

    const block = recordMap.block?.[pageId]?.value
    if (!block) continue

    const isPublic = getPageProperty<boolean | null>('Public', block, recordMap) ?? true
    if (!isPublic) continue

    const canonicalId = getCanonicalPageId(pageId, recordMap, { uuid })
    if (!canonicalId) continue

    if (canonicalPageMap[canonicalId]) {
      console.warn('⚠️ Duplicate canonical page id', {
        canonicalId,
        pageId,
        existingPageId: canonicalPageMap[canonicalId]
      })
      continue
    }

    canonicalPageMap[canonicalId] = pageId
  }

  return {
    pageMap,
    canonicalPageMap
  }
}
