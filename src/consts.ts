/**
 * Site metadata that is used across the site.
 *
 * A few of these are not used yet, and are subject to change, example of this is Author.
 */
export const SITE_METADATA = {
  theme: "system", // Options: system, light, dark
  siteUrl: "https://tasb.yon.fun/",
  siteRepo: "https://github.com/wanoo21/tailwind-astro-starting-blog",
  robots: "index, follow", // Options: index, noindex, follow, nofollow

  // These are not supported yet
  analytics: {
    fathom: {
      site: "", // Add your site id here
      src: "https://cdn.usefathom.com/fathom.js",
    },
    googleAnalyticsId: null, // Add your Google Analytics id here
    metricalApp: null, // Add your Metrical app here
    plausible: {
      domain: "", // Add your domain here
      src: "https://plausible.io/js/plausible.js",
    },
    simpleAnalytics: false, // Activate Simple Analytics
    umami: {
      site: "", // Add your site id here
      dataId: "", // Add your data id here
      host: "/umami.js", // Add your host here
    },
    // amplitudeApiKey: null, // Add your Amplitude Api Key here, not yet implemented
    matomo: {
      id: "", // Add your Matomo id here
      url: "", // Add your Matomo url here
    },
    minimalAnalyticsId: null, // Add your Minimal Analytics id here
  },
  // newsletter: {
  //     // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
  //     // Please add your .env file and modify it according to your selection
  //     provider: 'buttondown',
  // },
  // comments: {
  //     // If you want to use an analytics provider you have to add it to the
  //     // content security policy in the `next.config.js` file.
  //     // Select a provider and use the environment variables associated to it
  //     // https://vercel.com/docs/environment-variables
  //     provider: 'giscus', // supported providers: giscus, utterances, disqus
  //     giscusConfig: {
  //         // Visit the link below, and follow the steps in the 'configuration' section
  //         // https://giscus.app/
  //         repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
  //         repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
  //         category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
  //         categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  //         mapping: 'pathname', // supported options: pathname, url, title
  //         reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
  //         // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
  //         metadata: '0',
  //         // theme example: light, dark, dark_dimmed, dark_high_contrast
  //         // transparent_dark, preferred_color_scheme, custom
  //         theme: 'light',
  //         // theme when dark mode
  //         darkTheme: 'transparent_dark',
  //         // If the theme option above is set to 'custom`
  //         // please provide a link below to your custom theme css file.
  //         // example: https://giscus.app/themes/custom_example.css
  //         themeURL: '',
  //         // This corresponds to the `data-lang="en"` in giscus's configurations
  //         lang: 'en',
  //     },
  // },
  // search: {
  //     provider: 'kbar', // kbar or algolia
  //     kbarConfig: {
  //         searchDocumentsPath: 'search.json', // path to load documents to search
  //     },
  //     // provider: 'algolia',
  //     // algoliaConfig: {
  //     //   // The application ID provided by Algolia
  //     //   appId: 'R2IYF7ETH7',
  //     //   // Public API key: it is safe to commit it
  //     //   apiKey: '599cec31baffa4868cae4e79f180729b',
  //     //   indexName: 'docsearch',
  //     // },
  // },
};

/**
 * Default posts per page for pagination.
 */
export const ITEMS_PER_PAGE = 5;


/**
 * Navigation items.
 If title is not found in the translation file, it will be used as is.
 example: if title is "nav.home", and translation file does not have "nav.home", it will be displayed as "nav.home"

 You should add translations for these in src/i18n/ui.ts or use as is.
 */
export const NAVIGATION = [
  { href: "/", title: "nav.home" },
  { href: "/blog", title: "nav.blog" },
  { href: "/tags", title: "nav.tags" },
  { href: "/projects", title: "nav.projects" },
  { href: "/about", title: "nav.about" },
] as const;

export const POST_METADATA = {
  defaultLayout: "column", // Default layout for blog posts, options: simple and column
  showFullWidthCover: false, // Show full width cover image in blog post
  showCover: true, // Show cover image in blog post
  showTags: true, // Show tags in blog post, TODO: Add support for hiding tags
  showDate: true, // Show date in blog post, TODO: Add support for hiding date
  showSummary: true, // Show summary in blog post
  showAuthors: true, // Show authors in blog post, TODO: Add support for hiding authors
  showRelatedPosts: true, // Show related posts in blog post, TODO: Add support for hiding related posts
  showTableOfContents: true, // Show table of contents in blog post
  showShareButtons: 'both', // Show share buttons in blog post, options: top, bottom, both, none
};
