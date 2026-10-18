# Measuring AI search visibility

Four places show whether engines can reach the site, index it, and cite it. Check them monthly, alongside the queries in `test-queries.md`.

## 1. Cloudflare: are crawlers getting through?

**AI Crawl Control** in the zone dashboard (setup details are in `cloudflare-checklist.md`):

- **Overview:** total, allowed, and unsuccessful AI crawler requests over time, plus robots.txt status.
- **Crawlers:** requests per crawler and its current Allow or Block action.
- **Metrics:** requests by crawler, operator, or category, status codes, and the most requested paths. AI referral data is limited to paid plans.

What to look for: steady 200 responses for OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, and Bingbot; occasional bursts from ChatGPT-User, Claude-User, and Perplexity-User (each burst is a person asking an AI engine something that led it to fetch a page); and no 403 or challenge responses for any of them. A crawler with zero requests over 30 days is either blocked or not interested yet.

## 2. Google Search Console: indexing and AI features

- **Performance > Search results:** clicks and impressions from AI Overviews and AI Mode are included in these totals. AI Mode clicks arrive as ordinary Google referrals.
- **Search Generative AI performance:** Google began rolling out a separate report for AI Overviews and AI Mode on June 3, 2026, to a subset of sites. It shows impressions by page, country, device, and date, but not clicks. If it appears in your account, it is the most direct view of AI feature visibility on Google.
- **Page indexing** and **Sitemaps:** every sitemap URL should be indexed.
- **Enhancements:** the Breadcrumbs and Profile page reports confirm Google parsed the structured data.

## 3. Bing Webmaster Tools: Bing, Copilot, and ChatGPT search

- **Search Performance:** Bing clicks and impressions.
- **AI Performance:** citation counts for your pages in Microsoft Copilot, Bing's AI-generated summaries, and select partner integrations. It lists cited pages, citations per page, and the "grounding queries" Bing used to retrieve them (Bing's interpretation of what people asked, not their exact words), with citation share. It shows no clicks. Data appears about a day after setup.
- **IndexNow:** confirms the Netlify plugin's submissions are arriving.

ChatGPT search relies heavily on Bing's index, so Bing indexing problems tend to show up in ChatGPT as well.

## 4. Referral traffic from AI engines

The site has no analytics today. Referrers to watch for, once something can record them:

| Referrer | Engine |
| --- | --- |
| `chatgpt.com` | ChatGPT (links often carry `utm_source=chatgpt.com`) |
| `perplexity.ai` | Perplexity |
| `claude.ai` | Claude |
| `gemini.google.com` | Gemini |
| `copilot.microsoft.com` | Microsoft Copilot |
| `google.com` | Google Search, including AI Overviews and AI Mode (not separable here) |

Options that set no cookies:

- **Netlify Web Analytics** (in the Netlify project under Analytics & metrics > Analytics; check current pricing before enabling): collected server-side, so it adds no script to the site and needs no change to the Content Security Policy. Its "Top sources" chart shows referrers. This fits the site's constraints best.
- **Cloudflare Web Analytics** (free): cookieless, but it adds a JavaScript beacon from Cloudflare, so the Content Security Policy would need to allow it. That is a third-party script, so it needs your sign-off before it is added.

Either way, AI referrals will be small compared with citations. Citations without clicks are still the goal for the entity: an engine that names you and links the site when someone asks about you or a CMMC question is doing what this rollout is for.

## Expected lag

- **Perplexity:** new pages tend to appear within days.
- **ChatGPT search:** within a few weeks, once Bing has indexed the page.
- **Google AI Overviews and AI Mode:** over one to two months.

The entity queries ("who is Theo Brucker") should improve first, because the site already says who you are. Practitioner queries will not cite the site until CMMC posts from `content-plan.md` are published, so start the monthly log now to have a baseline.
