import { DateTime } from "luxon";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// Front matter dates arrive as Date objects (unquoted YAML) or strings (quoted).
const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = DateTime.fromISO(String(value), { zone: "utc" });
  return parsed.isValid ? parsed.toJSDate() : null;
};

const latest = (dates) =>
  dates.filter(Boolean).reduce((newest, d) => (!newest || d > newest ? d : newest), null);

const isPost = (item) => (item.data.tags || []).includes("posts");

// A post's last substantive revision: `updated` when set, otherwise its publish date.
const postModified = (post) => latest([post.date, toDate(post.data.updated)]);

// Pages that list posts set `listsPosts: true` (every post) or a list of tags.
const postsListedOn = (item, posts) => {
  const listed = item.data.listsPosts;
  if (listed === true) return posts;
  if (!Array.isArray(listed)) return [];
  const wanted = listed.map((t) => String(t).toLowerCase());
  return posts.filter((p) =>
    (p.data.tags || []).some((t) => wanted.includes(String(t).toLowerCase()))
  );
};

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

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

  // Last substantive change for a sitemap entry. Posts use `updated` or their
  // date. Other pages use their own `updated` field and, when they list posts,
  // the newest publish date among those posts. Returns null when unknown.
  eleventyConfig.addFilter("lastModified", (item, posts = []) => {
    if (isPost(item)) return postModified(item);
    const listed = postsListedOn(item, posts).map((p) => p.date);
    return latest([toDate(item.data.updated), ...listed]);
  });

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
