import { type ExtendedRecordMap } from 'notion-types'
import { parsePageId, uuidToId } from 'notion-utils'

import { includeNotionIdInUrls } from './config'
import { getCanonicalPageId } from './get-canonical-page-id'
import { type Site } from './types'

const uuid = !!includeNotionIdInUrls

export const mapPageUrl =
  (site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })!
    const canonicalPageId = getCanonicalPageId(pageUuid, recordMap, { uuid })

    const block = recordMap.block[pageUuid]?.value
    const parentId = block?.parent_id
    const collection =
      parentId && recordMap.collection?.[parentId]
        ? recordMap.collection[parentId].value
        : null

    const isBlogPost =
      block?.type === 'page' &&
      block?.parent_table === 'collection' &&
      collection?.name?.[0]?.[0] === 'Posts'

    const path = isBlogPost
      ? `/blog/${canonicalPageId}`
      : `/${canonicalPageId}`

    return createUrl(path, searchParams)
  }

export const getCanonicalPageUrl =
  (site: Site, recordMap: ExtendedRecordMap) =>
  (pageId = '') => {
    const pageUuid = parsePageId(pageId, { uuid: true })!
    const canonicalPageId = getCanonicalPageId(pageUuid, recordMap, { uuid })

    const block = recordMap.block[pageUuid]?.value
    const parentId = block?.parent_id
    const collection =
      parentId && recordMap.collection?.[parentId]
        ? recordMap.collection[parentId].value
        : null

    const isRootPage = uuidToId(pageId) === site.rootNotionPageId

    const path = isRootPage
      ? ''
      : (block?.type === 'page' &&
         block?.parent_table === 'collection' &&
         collection?.name?.[0]?.[0] === 'Posts'
        )
        ? `/blog/${canonicalPageId}`
        : `/${canonicalPageId}`

    return `https://${site.domain}${path}`
  }

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join('?')
}
