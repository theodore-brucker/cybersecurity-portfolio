// Shared data for topic hubs in site/topics/. Each hub sets `title`,
// `topicName`, `topicTags`, `description`, and optionally a `slug`.
//
// A hub with `draft: true` is built for local and deploy-preview builds so it
// can be reviewed, but never in Netlify's production context, and it is always
// noindex and left out of the sitemap while it is a draft.
const isProduction = process.env.CONTEXT === "production";

export default {
  layout: "topic.njk",
  schemaType: "Topic",
  eleventyComputed: {
    permalink: (data) =>
      data.draft && isProduction ? false : `/${data.slug || data.page.fileSlug}/index.html`,
    noindex: (data) => Boolean(data.draft || data.noindex),
    // The sitemap dates a hub by the newest post it lists.
    listsPosts: (data) => data.topicTags || [],
    breadcrumb: (data) => [
      { name: "Home", url: "/" },
      { name: data.title, url: `/${data.slug || data.page.fileSlug}/` },
    ],
  },
};
