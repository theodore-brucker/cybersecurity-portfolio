import { DateTime } from "luxon";
import rssPlugin from "@11ty/eleventy-plugin-rss";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Static assets are copied through untouched.
  eleventyConfig.addPassthroughCopy("site/images");
  eleventyConfig.addPassthroughCopy("site/styles.css");
  eleventyConfig.addPassthroughCopy("site/fonts");
  eleventyConfig.addPassthroughCopy("site/robots.txt");
  eleventyConfig.addPassthroughCopy("site/feed.xsl");
  eleventyConfig.addPassthroughCopy("site/site.webmanifest");
  eleventyConfig.addPassthroughCopy("site/*.png");
  eleventyConfig.addPassthroughCopy("site/*.ico");
  eleventyConfig.addPassthroughCopy("site/*.svg");
  eleventyConfig.addPassthroughCopy("site/google*.html");

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
