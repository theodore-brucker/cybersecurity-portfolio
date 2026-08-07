export default {
  layout: "post.njk",
  tags: ["posts"],
  ogType: "article",
  eleventyComputed: {
    // Drafts are never written to disk, so they cannot be reached by URL guessing.
    permalink: (data) =>
      data.draft ? false : `/blog/${data.page.fileSlug}/index.html`,
  },
};
