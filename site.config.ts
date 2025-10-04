import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '28293e5cdc05800f89eadb5dc5fa5160',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  // 95de4ccb-1dbe-46f6-ab66-689d1c911dfe
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'ALTHEORA',
  domain: 'altheora.vercel.app',
  author: 'ALTHEORA',

  // open graph metadata (optional)
  description: '📚 Organized by KOSEMAKU 2025',

  // social usernames (optional)
  // twitter: '#',
  // github: 'anargya-anubhawa',
  // linkedin: 'anargya-prima-anubhawa',
  instagram: 'altheora.25',
  // facebook: '#',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '@anargya.anubhawa', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
     {
       title: 'Home',
       pageId: '28293e5cdc05800f89eadb5dc5fa5160'
     },
     {
       title: 'About',
       pageId: '28293e5cdc0580d483c0ceea46956275'
     }
   ]
})
