# SEO and AI search audit: theobrucker.us

Audited on 2026-10-18 against `master` at commit `b031aba`, using a local production build (`npm run build`, Eleventy 3.1.6). The live-site checks in section 3 could not run from the build sandbox because its egress proxy blocks `theobrucker.us`, so the commands are written out for you to run.

## Summary of findings

Ordered by how much each one limits retrieval and citation.

1. **Edge access is unverified, and Cloudflare is the largest risk.** Cloudflare reworked its AI crawler controls on July 1, 2026 and changed defaults on September 15, 2026. The single "Block AI bots" toggle became separate Search, Agent, and Training policies; a Training policy of "Block" now also blocks Googlebot, Bingbot, and Applebot from search; and the managed robots.txt feature became Bot Preference Sync, which prepends its own rules to the robots.txt the site serves. Nothing in the repo can override those settings. Run the checks in section 3 and work through `docs/seo/cloudflare-checklist.md` (added in Phase 1).
2. **The headshot is a 6.6 MB camera original.** `site/images/about-me.jpg` is 6000 by 4000 pixels with an EXIF rotation that displays it as a 4000 by 6000 portrait. Every homepage visit downloads all 6.6 MB to render a 168 pixel wide image, and the same file is the `og:image` for every page. LinkedIn and X ignore preview images over 5 MB, so shared links most likely render without an image, and a portrait image is center-cropped into a landscape card when it does render. The file also carries the camera's EXIF data, including body and lens serial numbers. Phase 2 adds a stripped 1200 by 630 social image, and Phase 3 serves a right-sized copy on the homepage.
3. **Structured data does not connect the person to the posts.** The homepage `Person` and the inline `author` on each `BlogPosting` have no shared `@id`, so they read as two separate entities. The homepage block lists `mailto:` in `sameAs`, includes `knowsAbout` entries that do not appear on the page, gives no issuer for any certification, and has no `WebSite` or `ProfilePage` node. Every post reports `dateModified` equal to `datePublished`. The blog index has no structured data. All blocks parse as valid JSON. Details are in section 2.
4. **Titles and descriptions have gaps.** The blog index renders `<title>Blog</title>` with an empty `og:title`, because `pageTitle` replaces the whole title. The homepage description is 267 characters, so search results truncate it at roughly 155 to 160. Post descriptions are the teaser `summary`, which says what the post is about but not who wrote it. No page has `meta name="author"` or `rel="me"` links.
5. **Heading structure skips levels.** The homepage has no `<h1>`, and its section labels are `<p class="eyebrow">` elements, so the first headings on the page are `<h3>` role titles. The blog index goes from `<h1>` straight to `<h3>` post titles. Posts are correct (`<h1>` title, `<h2>` sections).
6. **The sitemap carries little date signal.** The homepage and blog index have no `<lastmod>`, posts use the publish date, and there is no support for a separate updated date. `changefreq` and `priority` are present, but Google ignores both.
7. **The feed lists entries oldest first.** The `posts` collection is already sorted newest first and `feed.njk` reverses it. Entries carry full content and the feed has a feed-level author, but there is no per-entry author and no distinction between published and updated dates.
8. **There is no custom 404 page.** Netlify serves its default page, which has no navigation back into the site.
9. **There is no published CMMC or NIST SP 800-171 writing yet.** The only CMMC post is an unpublished draft template, so practitioner citations depend on new posts. Phase 4 adds the templates and a content plan. The site also does not state a location anywhere, so regional queries such as "CMMC consultant New England" have nothing on the site to match.
10. **Fixed in this PR:** the homepage blog blurb now reads "Weekly blog on building cybersecurity programs and interesting side projects or news." A new CI check also fails any pull request that changes text below the front matter of a post in `site/blog/`.

Already in good shape: every page has a self-referencing canonical URL, all content is in the static HTML (the projects register uses `<details>` and `<summary>`), drafts are never written to disk and CI checks for leaks, fonts are self-hosted and preloaded, the feed carries full post content, and the Content Security Policy does not interfere with JSON-LD because data blocks are never executed.

Nothing found here blocks Phase 1.

## 1. Inventory

### Layouts, includes, and templates

| File | Output | Role |
| --- | --- | --- |
| `site/_includes/base.njk` | layout | Document shell: head tags, marking bar, header and nav, `<main>`, footer with disclaimer, pledge, and links |
| `site/_includes/post.njk` | layout | Post layout; wraps `base.njk` and emits an inline `BlogPosting` JSON-LD block |
| `site/index.njk` | `/` | Homepage; emits a `Person` JSON-LD block; all sections are hand-written HTML |
| `site/blog-index.njk` | `/blog/` | Archive of published posts |
| `site/blog/*.md` | `/blog/<slug>/` | Posts; `blog.11tydata.js` sets the layout, tags, `ogType: article`, and drops drafts |
| `site/feed.njk` | `/feed.xml` | Atom feed, styled by `site/feed.xsl` |
| `site/sitemap.njk` | `/sitemap.xml` | Sitemap with two hard-coded pages plus the posts collection |
| `site/robots.txt` | `/robots.txt` | Static passthrough copy |
| `site/_data/site.js` | data | Site title, URL, author links, disclaimer, pledge |
| `site/google81b481de2f276844.html` | same path | Google Search Console verification file |

There are no other includes. `netlify.toml` holds the build settings, one redirect, and the security headers. There is no `_headers` file and no `_redirects` file.

### Head tags per page

| Page | `<title>` | Meta description | Canonical | Open Graph and Twitter |
| --- | --- | --- | --- | --- |
| `/` | Theo Brucker \| CISSP | 267 characters, starts "Theo Brucker: CISSP-certified cybersecurity professional..." | `https://theobrucker.us/` | `og:title` "Theo Brucker - CISSP", `og:type` website, `og:image` about-me.jpg, `twitter:card` summary_large_image |
| `/blog/` | Blog | 149 characters, first person | `https://theobrucker.us/blog/` | `og:title` empty, `og:type` website, same image and card |
| Each post | Post title \| Theo Brucker | The post's `summary` (64 to 104 characters) | Self | `og:type` article, no `article:published_time` or `article:modified_time`, same image and card |

All pages share `og:site_name`, `og:url`, and the same `og:image`. There is no `og:image:alt`, no image dimensions, no `og:locale`, no `meta name="author"`, and no `rel="me"`.

### JSON-LD blocks

| Page | Block | Location |
| --- | --- | --- |
| `/` | One `Person` (no `@id`) | Top of `<main>` |
| `/blog/` | None | |
| Each post | One `BlogPosting` with an inline `Person` author and an inline `Person` publisher, neither with an `@id` | Top of `<main>` |

### Heading structure

| Page | Structure |
| --- | --- |
| `/` | No `<h1>`. Section labels (About, Experience, Projects, Education and Certifications, Blog, Contact) are paragraphs. Headings are three `<h3>` role titles and one `<h3>` per listed post. Project names are `<span>` elements inside `<summary>`. |
| `/blog/` | `<h1>` "All posts", then one `<h3>` per post |
| Posts | `<h1>` title, `<h2>` sections from the markdown |

The header wordmark is `Theo Brucker<span class="creds">CISSP</span>` with no space, so text extraction reads it as "Theo BruckerCISSP".

### robots.txt

```text
User-agent: *
Allow: /

Sitemap: https://theobrucker.us/sitemap.xml
```

This is the file in the repo. What Cloudflare actually serves may differ (section 3).

### Sitemap output

Five URLs: `/`, `/blog/`, and the three published posts. Only the posts have `<lastmod>`, set to the publish date. Every entry has `changefreq` and `priority`. The draft post is correctly absent.

### Feed output

Atom 1.0 at `/feed.xml` with a feed-level `<author>`, a `<rights>` element containing the disclaimer, and full post HTML in `<content type="html">`. Entries are ordered oldest first, each `<updated>` is the publish date, and there is no `<published>` element or per-entry author.

### netlify.toml and headers

Build command `npm run build`, publish directory `_site`, Node 24. One redirect sends `/blog` to `/blog/` with a 301. Every path gets `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, a restrictive `Permissions-Policy`, and a Content Security Policy that allows only same-origin scripts. Cloudflare's email obfuscation script is served from `/cdn-cgi/` on the same origin, so the policy permits it.

### 404 handling

No `404.html` is built, so Netlify returns its generic 404 page with a 404 status.

### Images

No `<img>` element has `width` and `height` attributes. Alt text is minimal ("Theo Brucker" for the portrait, company names for the logos). `cissp-logo.png`, `associate-of-isc2.png`, `sec-logo.png`, and `umaine-logo.jpg` are in `site/images/` but are not referenced by any page.

## 2. JSON-LD validation

Method: extracted every block from the local build, parsed it, reviewed the properties against schema.org and Google's structured data documentation, and compared each value with the text a visitor can see on the same page. All blocks parse.

### Homepage `Person`

| Severity | Finding |
| --- | --- |
| Error | `sameAs` includes `mailto:bruckertheodore@gmail.com`. `sameAs` is for URLs of pages that identify the same entity, and a mail link is not one. |
| Error | No `@id`, so post authors cannot reference this entity. |
| Warning | `knowsAbout` includes "Azure Security", which appears nowhere on the page. "Cloud Security", "Network Security", "Threat Detection", and "Security Automation" are only loosely supported by tags and passing phrases. Several entries combine or rename visible terms, such as "DFARS 252.204-7012 / 7021" and "CMMC 2.0 Program Management". |
| Warning | `description` repeats the meta description, which is not visible on the page. |
| Warning | The three certifications in `hasCredential` have no `recognizedBy` issuer. The degree entry correctly names the University of Maine. |
| Note | No `alumniOf` or `worksFor`. PR #1 removed `worksFor` deliberately; the Phase 2 spec asks for it again, so that PR calls out the change. |
| Note | No `WebSite`, `ProfilePage`, or `mainEntity` relationship. |

### Post `BlogPosting`

| Severity | Finding |
| --- | --- |
| Error | `author` is an inline `Person` with no `@id`, disconnected from the homepage entity. |
| Warning | `dateModified` always equals `datePublished` because there is no `updated` field. |
| Warning | No `image`. Google recommends one for article results. The headshot is not shown on post pages, so it should not be used here. |
| Warning | No `BreadcrumbList`, and no breadcrumb trail is visible on the page. |
| Note | `publisher` is a separate inline `Person` rather than a reference to the author. |
| Note | `keywords` is a comma-joined string. That is valid, though an array is easier to consume. |

### Duplicates

No page carries two blocks for the same entity, but the person is described three different ways across the site (homepage `Person`, post `author`, post `publisher`) with no identifier tying them together.

## 3. Live crawler checks (run these yourself)

The build sandbox cannot reach `theobrucker.us`; its proxy refused the connection. Run the following from your own machine and record the results in the table at the end of this section.

```bash
# 1. Status code for each crawler user agent.
for ua in "GPTBot" "OAI-SearchBot" "ChatGPT-User" "ClaudeBot" "Claude-SearchBot" "Claude-User" "PerplexityBot" "Googlebot" "bingbot"; do
  printf "%-18s " "$ua"
  curl -s -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; $ua)" https://theobrucker.us/
done

# 2. The robots.txt Cloudflare actually serves.
curl -s https://theobrucker.us/robots.txt

# 3. Challenge detection: Cloudflare adds a cf-mitigated header when it serves a challenge.
for ua in "GPTBot" "ClaudeBot" "Claude-User" "PerplexityBot" "Googlebot"; do
  printf "%-14s " "$ua"
  curl -s -D - -o /dev/null -A "Mozilla/5.0 (compatible; $ua)" https://theobrucker.us/ \
    | grep -i -E '^(HTTP/|cf-mitigated)' | tr -d '\r' | tr '\n' ' '
  echo
done

# 4. Whether email obfuscation rewrote anything inside the homepage JSON-LD.
curl -s https://theobrucker.us/ | grep -c 'email-protection'
```

How to read the results:

- Flag any 403, 503, or challenge (a `cf-mitigated: challenge` header or a "Just a moment" page).
- In the robots.txt output, flag any `# BEGIN Cloudflare Managed content` or `# BEGIN Cloudflare Bot Preference Sync` block, and any `Content-Signal` line. Either block means Cloudflare is prepending rules to the file in the repo.
- These requests come from your own IP address with a borrowed user agent. Cloudflare verifies real crawlers by their published IP ranges, so a 200 here does not prove the real bot gets through, and a 403 may only mean Cloudflare caught an impersonator, which is the correct behavior for Googlebot and bingbot in particular. The AI Crawl Control dashboard is the authoritative view of what real crawlers received (see the Cloudflare checklist).
- A count above zero in check 4 means Cloudflare rewrote the email address inside the JSON-LD. Phase 2 removes the address from structured data, so this only matters for the current live site.

| Check | Before (fill in) | After Cloudflare changes (fill in) |
| --- | --- | --- |
| GPTBot | | |
| OAI-SearchBot | | |
| ChatGPT-User | | |
| ClaudeBot | | |
| Claude-SearchBot | | |
| Claude-User | | |
| PerplexityBot | | |
| Googlebot | | |
| bingbot | | |
| Cloudflare block in robots.txt | | |
| Challenges seen | | |

## 4. Other notes

- Published posts keep their HTML comment blocks (the pre-publish checklist from the post template). Comments are not visible on the page, but they appear in the page source and, escaped, in the feed. Removing them is a post edit, so it is left to you.
- `site.js` says the disclaimer renders in the footer and at the end of every post. It renders in the footer of every page, including posts, but not at the end of the post body.
- `site.webmanifest` names the site "Theo Brucker | CISSP, CCP", while PR #4 limited name-adjacent branding to CISSP. Its `theme_color` (#2A2420) is from the previous palette.
- The README says Netlify deploys from `main` and describes `site/index.html`; the branch is `master` and the homepage is `site/index.njk`.
