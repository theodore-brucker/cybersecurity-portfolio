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
    base.njk              shell: head tags, JSON-LD, nav, footer, disclaimer
    post.njk              post layout
    breadcrumb.njk        visible breadcrumb trail (matches the JSON-LD)
    topic.njk             topic hub layout
  topics/
    topics.11tydata.js    hub defaults (draft hubs skip production builds)
    cmmc.njk              /cmmc/ hub (draft until the intro is written)
  _data/site.js           site metadata, disclaimer, crawler and verification settings
  feed.njk                -> /feed.xml (Atom)
  sitemap.njk             -> /sitemap.xml (every indexable page)
  robots.njk              -> /robots.txt
  blog-markdown.njk       -> /blog/<slug>/index.md (original markdown of each post)
  headers.njk             -> /_headers (serves the markdown copies as text/markdown)
  llms.njk, llms-full.njk -> /llms.txt, /llms-full.txt
  <key>.txt               IndexNow key file (public by design)
lib/structured-data.js    builds the JSON-LD @graph for every page
lib/posts.js              date and tag helpers (related posts, topic matching)
netlify/plugins/indexnow  submits changed URLs to IndexNow after production deploys
scripts/new-post.js       post scaffolder
scripts/validate-jsonld.mjs  checks the built JSON-LD (runs in CI)
docs/seo/                 audit, Cloudflare checklist, content plan, off-site and measurement notes
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
summary: "Shown in post lists, the RSS feed, and the LinkedIn preview card."
description: "Optional. One plain sentence for search snippets that says what the post covers and that you wrote it. Falls back to summary."
tags: ["CMMC", "NIST 800-171"]
readingTime: 6
draft: true
# Optional image shown at the top of the post and used in its structured data:
# image: "/images/posts/example.png"
# imageAlt: "What the image shows"
# imageWidth: 1200
# imageHeight: 675
---
```

Posts show "Published" with `date`, and "Last updated" when `updated` is later.

### Optional fields for citable posts

AI search engines quote passages that answer a question directly, cite primary
sources, and come from first-hand experience. These optional fields support
that without touching the post body. Each renders only when present.

```yaml
bluf: "Two or three sentences that answer the post's question up front."
faq:
  - q: "What can go on a POA&M for CMMC Level 2?"
    a: "A short, direct answer. Markdown links work."
sources:
  - title: "32 CFR Part 170, CMMC Program"
    url: "https://www.ecfr.gov/current/title-32/subtitle-A/chapter-I/subchapter-G/part-170"
    publisher: "eCFR"
    date: "2024"
```

- `bluf` shows as a "Bottom line" box above the body. (`summary` was already
  the teaser for lists, the feed, and LinkedIn, so the answer box has its own
  field.)
- `faq` renders as a visible "Frequently asked questions" section at the end
  and adds matching FAQPage structured data. Use it only for real questions the
  post answers.
- `sources` renders as a numbered "Sources" list and becomes
  `BlogPosting.citation`.
- Posts that share a tag link to each other under "Related posts".

### Topic hubs

`site/topics/*.njk` pages list every published post carrying any of their
`topicTags`, newest first, under an intro you write in the file body. The CMMC
hub lives at `/cmmc/` once published. A hub with `draft: true` is built for
local and deploy-preview builds (with a visible draft banner) but never in
production, and stays noindex and out of the sitemap. Publish it by writing the
intro, replacing the TODO placeholder, and setting `draft: false` after at
least one post carries its tags. Published hubs are linked from matching posts.

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

### Machine-readable copies

Each post also exists as plain markdown at `/blog/<slug>/index.md`: generated
front matter (title, author, canonical URL, dates, description, tags) followed
by the post body exactly as written. The HTML page links to it with
`rel="alternate" type="text/markdown"`, and a `Link: rel="canonical"` header
points search engines back at the HTML page. `/llms.txt` lists the site's pages
for AI agents and coding tools, and `/llms-full.txt` adds the full text of every
post. Search engines do not use llms.txt for ranking or citations, so treat both
as a convenience. The summary paragraph in both files is `profileSummary` in
`site/_data/site.js`; keep it in step with the homepage.

### Structured data

Every indexable page gets one JSON-LD `@graph` from `lib/structured-data.js`,
built from `site/_data/site.js` and the page's front matter. Stable ids tie it
together: `https://theobrucker.us/#person`, `#website`, and per-page
`<url>#webpage`, `#article`, and `#breadcrumb`. The full Person node (job,
employer, education, credentials, topics) appears only on the homepage, where
that information is visible; other pages reference the same id. Structured data
may only describe what a visitor can see, so when you change the homepage
experience or certifications, update `author` in `site/_data/site.js` to match.

`npm run build && npm run validate:jsonld` checks the output; CI runs the same
check and fails on parse errors, missing required properties, unresolved `@id`
references, and values that are not visible on the page.

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
npm run validate:jsonld # check structured data in _site/
```
