# Off-site checklist

AI engines decide who someone is, and whether to trust them on a topic, mostly from what other sites say. The site can only confirm what LinkedIn, GitHub, and third-party mentions already establish. Items are ordered by how much they matter.

Before anything that names A-LIGN or presents you as a CMMC assessor (bylines, talks, podcasts, directory listings), check A-LIGN's policy on public writing and outside activities. Keep the personal brand clearly separate from the employer, as the site's disclaimer does.

## 1. One identity string everywhere (do this first)

Engines match profiles to each other by name, headline, photo, and links. Use the same versions on the site, LinkedIn, and GitHub. Suggested strings, which you should edit into your own words:

- **Name:** Theo Brucker. Use "Theodore Brucker" only as an alternate (the site's structured data already lists it).
- **Short headline:** Cybersecurity professional, CISSP. Builds and assesses security programs, with a focus on CMMC and NIST SP 800-171.
- **One-line bio (fits GitHub's 160 characters):** Cybersecurity professional who builds and assesses security programs, focused on CMMC and NIST SP 800-171. CISSP.
- **Photo:** the same headshot as the site, so image matching agrees.
- **Website field:** `https://theobrucker.us` on every profile that has one.

Checklist:

- [ ] LinkedIn: headline consistent with the above; `theobrucker.us` in Contact info and as a Featured link; the About section opens with the same one-line bio.
- [ ] GitHub: name, bio, and website fields set; location optional.
- [ ] The site's homepage title and description already match this framing (Phase 2).
- [ ] If you want regional queries such as "CMMC consultant New England" to work, state a location on LinkedIn and decide whether to add one line to the site's About section. Today the site names no location, so engines have nothing to match.

## 2. GitHub profile README

- [ ] Create the public repository `theodore-brucker/theodore-brucker` with a `README.md`. GitHub shows it on your profile page.
- [ ] Keep it short: the one-line bio, a link to `https://theobrucker.us`, a link to the blog, and the projects you want to be known for.
- [ ] Pin `cybersecurity-portfolio`, `CoveSecurity`, and `threat-radar` (or whichever public repositories you want associated with your name), and give each a README that links back to the site.

## 3. Search engine tools

Google Search Console (already verified by `site/google81b481de2f276844.html`):

- [ ] Sitemaps: submit `https://theobrucker.us/sitemap.xml`.
- [ ] URL Inspection: request indexing for `/`, `/blog/`, and each post after the stack merges.
- [ ] Page indexing: confirm every sitemap URL is indexed and nothing is excluded unexpectedly.
- [ ] Enhancements: watch the Breadcrumbs and Profile page reports for structured data errors.

Bing Webmaster Tools (feeds Copilot and much of ChatGPT search):

- [ ] Sign in at bing.com/webmasters and choose **Import from Google Search Console**, which verifies and adds the site in one step. Otherwise add the site manually and paste the `msvalidate.01` value into `verification.bing` in `site/_data/site.js`.
- [ ] Sitemaps: submit `https://theobrucker.us/sitemap.xml`.
- [ ] IndexNow: after the first production deploy, confirm submissions appear in the IndexNow section. Run `npm run build && npm run indexnow:all` once after this stack merges.
- [ ] Turn on the AI Performance report (see `measurement.md`).

## 4. Professional directory profiles

Add the site link wherever a profile allows one and the platform's rules permit it:

- [ ] Credly (where ISC2 and CompTIA issue badges): make the CISSP and Security+ badges public and link your LinkedIn.
- [ ] ISC2 community profile.
- [ ] The Cyber AB Marketplace listing for your CCP. Check how it presents your organizational affiliation before adding personal links.
- [ ] University of Maine alumni network and LinkedIn education entry.
- [ ] A speaker profile (for example Sessionize) once you start giving talks, with the same bio and photo.

## 5. Earning mentions and links

Ordered by how much each tends to move AI citations for practitioner questions:

1. **Community answers.** Perplexity, ChatGPT, and Google's AI features cite Reddit heavily, and r/CMMC is where contractors ask the questions in `content-plan.md`. Answer well and in full on the thread; link a post only when it answers the exact question. A track record of good answers under a consistent username is itself a signal.
2. **Bylined articles in DIB and GovCon publications.** Op-eds and contributed pieces in outlets such as Federal News Network, National Defense (NDIA), Breaking Defense, Washington Technology, or AFCEA's SIGNAL carry your name to domains engines already trust on the topic. One good byline outweighs many directory links.
3. **Talks and webinars.** APEX Accelerators (the former PTACs) in Maine and New Hampshire run CMMC sessions for small contractors, and BSides events and NDIA chapter meetings take practitioner talks. Event pages usually publish your bio and a link, and recordings get transcribed.
4. **Podcasts.** CMMC, GovCon, and security podcasts publish show notes and transcripts that engines index. Bring one specific, first-hand point per episode.
5. **LinkedIn posts that point to the long version.** Post the short take on LinkedIn and link the full post. LinkedIn articles are themselves cited, so keep the canonical, complete version on the site.
6. **Open source.** Public tools with good READMEs (the Threat Radar honeypot, for example) earn links from people who use them and reinforce the technical side of the entity.

Skip paid directories, link exchanges, and AI-written guest posts. They add nothing engines trust, and the last one would undercut the site's pledge.

## What matters most

- **For "who is Theo Brucker":** consistent LinkedIn and GitHub profiles, the GitHub profile README, the site itself, and any bio pages from talks or bylines.
- **For citations on CMMC questions:** published posts on the site that follow `content-plan.md`, backed by community answers and at least one or two bylines or talks that mention you by name.
