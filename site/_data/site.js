export default {
  title: "Theo Brucker",
  tagline: "CISSP",
  url: "https://theobrucker.us",
  author: {
    name: "Theo Brucker",
    email: "bruckertheodore@gmail.com",
    linkedin: "https://www.linkedin.com/in/theobrucker/",
    github: "https://github.com/theodore-brucker",
  },
  // Rendered in the footer of every page and at the end of every post.
  disclaimer:
    "The views and opinions expressed on this site are my own. They do not represent the views, positions, or opinions of any current or former employer, client, or affiliated organization. Nothing here is written on behalf of anyone but me, and no content is derived from confidential or client-specific information.",
  // Rendered in the footer, next to the disclaimer.
  pledge: "Every blog post is written by me without AI assistance.",
  buildYear: new Date().getFullYear(),

  // Model training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
  // CCBot). true lets them read the site, which helps models recognize the name as
  // an entity. false opts out of training and does not affect citations in AI
  // search answers, which come from the search and user-fetch crawlers.
  // Cloudflare's Training policy must agree; see docs/seo/cloudflare-checklist.md.
  allowTrainingCrawlers: true,

  // Search engine ownership verification. Paste only the content value of the meta
  // tag each service gives you; an empty string leaves the tag out. Google Search
  // Console is already verified by site/google81b481de2f276844.html.
  verification: {
    google: "", // <meta name="google-site-verification" content="...">
    bing: "", // <meta name="msvalidate.01" content="...">
  },
};
