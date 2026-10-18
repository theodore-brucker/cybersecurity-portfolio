import { DateTime } from "luxon";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { buildGraph, serializeGraph } from "./lib/structured-data.js";
import { toDate, latest, postModified, postsWithTags, relatedPosts } from "./lib/posts.js";

const isPost = (item) => (item.data.tags || []).includes("posts");

// Pages that list posts set `listsPosts: true` (every post) or a list of tags.
const postsListedOn = (item, posts) => {
  const listed = item.data.listsPosts;
  if (listed === true) return posts;
  return Array.isArray(listed) ? postsWithTags(posts, listed) : [];
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // The same markdown-it instance Eleventy uses for posts, so front matter
  // fields such as FAQ answers render exactly like post bodies.
  let markdownLibrary;
  eleventyConfig.amendLibrary("md", (md) => {
    markdownLibrary = md;
  });
  const renderMarkdown = (text) => (markdownLibrary ? markdownLibrary.render(String(text ?? "")) : "");

  // Static assets are copied through untouched.
  eleventyConfig.addPassthroughCopy("site/images");
  eleventyConfig.addPassthroughCopy("site/styles.css");
  eleventyConfig.addPassthroughCopy("site/fonts");
  eleventyConfig.addPassthroughCopy("site/feed.xsl");
  eleventyConfig.addPassthroughCopy("site/site.webmanifest");
  eleventyConfig.addPassthroughCopy("site/*.png");
  eleventyConfig.addPassthroughCopy("site/*.ico");
  eleventyConfig.addPassthroughCopy("site/*.svg");
  eleventyConfig.addPassthroughCopy("site/google*.html");
  // IndexNow key file. The key is public by design; see "IndexNow" in README.md.
  eleventyConfig.addPassthroughCopy("site/*.txt");

  // Search Console verification file must stay at its exact path, not be templated.
  eleventyConfig.ignores.add("site/google*.html");
  eleventyConfig.ignores.add("site/feed.xsl");

  // Only published posts, newest first.
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("site/blog/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // Topic hubs (site/topics/) that have output in this build. Draft hubs are
  // built for local and deploy-preview builds only.
  eleventyConfig.addCollection("topics", (api) =>
    api.getFilteredByGlob("site/topics/*.njk").filter((t) => t.url)
  );

  // Every canonical, indexable HTML page. Drafts have no output path, and pages
  // can opt out with `noindex: true` or `sitemap: false`.
  eleventyConfig.addCollection("sitemap", (api) =>
    api
      .getAll()
      .filter((item) => {
        const out = item.outputPath ? String(item.outputPath) : "";
        if (!out.endsWith(".html")) return false;
        return !item.data.draft && !item.data.noindex && item.data.sitemap !== false;
      })
      .sort((a, b) => a.url.localeCompare(b.url))
  );

  eleventyConfig.addFilter("slice5", (arr) => (arr || []).slice(0, 5));

  eleventyConfig.addFilter("readableDate", (d) =>
    DateTime.fromJSDate(d, { zone: "utc" }).toFormat("LLLL d, yyyy")
  );

  eleventyConfig.addFilter("isoDate", (d) =>
    DateTime.fromJSDate(d, { zone: "utc" }).toISO()
  );

  eleventyConfig.addFilter("dateOnly", (d) =>
    DateTime.fromJSDate(d, { zone: "utc" }).toFormat("yyyy-LL-dd")
  );

  eleventyConfig.addFilter("postModified", postModified);

  // The later of a page's date and its optional `updated` front matter value.
  eleventyConfig.addFilter("modifiedDate", (date, updated) => latest([date, toDate(updated)]));

  // Newest revision across a list of posts, for the feed's <updated>.
  eleventyConfig.addFilter("newestModified", (posts) => latest((posts || []).map(postModified)));

  // Removes HTML comments (such as the pre-publish checklist) from markdown.
  eleventyConfig.addFilter("stripComments", (text) =>
    String(text || "").replace(/<!--[\s\S]*?-->\s*/g, "")
  );

  // Markdown from front matter (FAQ answers), rendered like a post body.
  eleventyConfig.addFilter("markdown", renderMarkdown);

  // Posts tagged with any of the given tags, newest first (topic hubs).
  eleventyConfig.addFilter("postsWithTags", (posts, tags) => postsWithTags(posts, tags));

  // Up to three other posts that share a tag with the current one.
  eleventyConfig.addFilter("relatedPosts", (posts, url, tags) => relatedPosts({ url, tags }, posts));

  // Published topic hubs whose tags overlap the given post tags.
  eleventyConfig.addFilter("topicsForTags", (topics, tags) =>
    (topics || []).filter(
      (t) => !t.data.draft && postsWithTags([{ data: { tags } }], t.data.topicTags).length
    )
  );

  // Last substantive change for a sitemap entry. Posts use `updated` or their
  // date. Other pages use their own `updated` field and, when they list posts,
  // the newest publish date among those posts. Returns null when unknown.
  eleventyConfig.addFilter("lastModified", (item, posts = []) => {
    if (isPost(item)) return postModified(item);
    const listed = postsListedOn(item, posts).map((p) => p.date);
    return latest([toDate(item.data.updated), ...listed]);
  });

  // One JSON-LD @graph per page; see lib/structured-data.js.
  eleventyConfig.addFilter("structuredData", (data, site, collections) =>
    serializeGraph(buildGraph(data, site, collections, { renderMarkdown }))
  );

  return {
    dir: {
      input: "site",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
