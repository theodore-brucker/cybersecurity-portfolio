[![Netlify Status](https://api.netlify.com/api/v1/badges/d2d2408b-6bd1-4916-8654-e8b4faaba574/deploy-status)](https://app.netlify.com/sites/tbrucker-website/deploys)

# theobrucker.us

Static site built with [Eleventy](https://www.11ty.dev/), deployed on Netlify from `master`.

## Layout

```
site/
  index.njk               homepage
  blog-index.njk          /blog/ archive
  404.njk                 not-found page (noindex)
  blog/
    blog.11tydata.js      shared front matter for all posts
    *.md                  one file per post
  _includes/
    base.njk              shell: head, nav, footer, disclaimer
    post.njk              post layout + BlogPosting structured data
  _data/site.js           site metadata, disclaimer, crawler and verification settings
  feed.njk                -> /feed.xml (Atom)
  sitemap.njk             -> /sitemap.xml (every indexable page)
  robots.njk              -> /robots.txt
  <key>.txt               IndexNow key file (public by design)
netlify/plugins/indexnow  submits changed URLs to IndexNow after production deploys
scripts/new-post.js       post scaffolder
docs/seo/                 audit, Cloudflare checklist, and other SEO notes
```

## Weekly workflow

```bash
npm run new -- "Your Post Title"   # creates site/blog/<slug>.md as a draft
npm run dev                        # live preview at localhost:8080
# write, then set draft: false in the front matter
git add . && git commit -m "post: your title" && git push
```

Netlify builds on push to `master`. GitHub Actions runs Gitleaks and Semgrep first.

## Drafts

A post with `draft: true` is not written to disk at all. It will not appear in
the feed, the sitemap, the archive, or at a guessable URL. Set `draft: false`
to publish.

## Post front matter

```yaml
---
title: "Post Title"
date: 2026-08-06
updated: 2026-09-01   # optional: last substantive revision, used for lastmod
summary: "Shown in search results, the RSS feed, and the LinkedIn preview card."
tags: ["CMMC", "NIST 800-171"]
readingTime: 6
draft: true
---
```

## Search engines and AI crawlers

- **robots.txt** is built from `site/robots.njk`. Search and user-fetch crawlers
  are always allowed. Training crawlers follow `allowTrainingCrawlers` in
  `site/_data/site.js`. Cloudflare can override all of this at the edge, so
  check `docs/seo/cloudflare-checklist.md` after any change.
- **Sitemap** lists every HTML page that is not a draft and does not set
  `noindex: true` or `sitemap: false`. Posts use `updated` (or `date`) for
  `<lastmod>`. The homepage uses its own `updated` field together with the
  newest post date, so bump `updated` in `site/index.njk` when you change the
  bio, experience, or projects.
- **Verification tags**: paste the content values for Google Search Console or
  Bing Webmaster Tools into `verification` in `site/_data/site.js`. Empty
  values render nothing. Google is already verified by the HTML file in `site/`.

### IndexNow

IndexNow lets the site tell Bing (which also feeds Copilot and much of ChatGPT
search), Yandex, Seznam, Naver, and others which URLs changed. The key is the
file name and the content of `site/<key>.txt`. It is public by design: search
engines fetch it from the site root to confirm that whoever submits URLs
controls the domain, so it is not a secret and does not belong in CI secrets.

After every production deploy, the local Netlify plugin in
`netlify/plugins/indexnow/` compares the sitemap that was live before the build
with the new one and submits URLs that are new, changed, or removed. It never
fails a build and does nothing on deploy previews. After a site-wide template
change that leaves every `<lastmod>` the same, submit everything once:

```bash
npm run build && npm run indexnow:all
```

To rotate the key, replace the file with a new random 32-character hex name and
matching content (`node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"`).

## Commands

```bash
npm install          # once
npm run dev          # local server with hot reload
npm run build        # production build into _site/
npm run new          # scaffold a post
npm run indexnow:all # submit every sitemap URL to IndexNow
```
