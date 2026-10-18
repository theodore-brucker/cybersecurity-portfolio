// Rough word count of a post's markdown: drops comments, markup, and link
// targets, then counts what is left. Used for BlogPosting.wordCount.
function countWords(markdown = "") {
  const text = markdown
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/^```.*$/gm, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, " ")
    .replace(/[*_`~]/g, " ");
  return text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;
}

export default {
  layout: "post.njk",
  tags: ["posts"],
  ogType: "article",
  // Visible trail above each post; the post itself is added in structured data.
  breadcrumb: [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog/" },
  ],
  eleventyComputed: {
    // Drafts are never written to disk, so they cannot be reached by URL guessing.
    permalink: (data) =>
      data.draft ? false : `/blog/${data.page.fileSlug}/index.html`,
    wordCount: (data) => countWords(data.page.rawInput),
  },
};
