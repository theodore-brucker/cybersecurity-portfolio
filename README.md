[![Netlify Status](https://api.netlify.com/api/v1/badges/d2d2408b-6bd1-4916-8654-e8b4faaba574/deploy-status)](https://app.netlify.com/sites/tbrucker-website/deploys)

# theobrucker.us

Static site built with [Eleventy](https://www.11ty.dev/), deployed on Netlify from `main`.

## Layout

```
site/
  index.html              homepage (existing SPA sections, blog list now server-rendered)
  blog-index.njk          /blog/ archive
  blog/
    blog.11tydata.js      shared front matter for all posts
    *.md                  one file per post
  _includes/
    base.njk              shell: head, nav, footer, disclaimer
    post.njk              post layout + BlogPosting structured data
  _data/site.js           site metadata and the disclaimer text
  feed.njk                -> /feed.xml (Atom)
  sitemap.njk             -> /sitemap.xml (generated from posts)
scripts/new-post.js       post scaffolder
```

## Weekly workflow

```bash
npm run new -- "Your Post Title"   # creates site/blog/<slug>.md as a draft
npm run dev                        # live preview at localhost:8080
# write, then set draft: false in the front matter
git add . && git commit -m "post: your title" && git push
```

Netlify builds on push to `main`. GitHub Actions runs Gitleaks and Semgrep first.

## Drafts

A post with `draft: true` is not written to disk at all. It will not appear in
the feed, the sitemap, the archive, or at a guessable URL. Set `draft: false`
to publish.

## Post front matter

```yaml
---
title: "Post Title"
date: 2026-08-06
summary: "Shown in search results, the RSS feed, and the LinkedIn preview card."
tags: ["CMMC", "NIST 800-171"]
readingTime: 6
draft: true
---
```

## Commands

```bash
npm install       # once
npm run dev       # local server with hot reload
npm run build     # production build into _site/
npm run new       # scaffold a post
```
