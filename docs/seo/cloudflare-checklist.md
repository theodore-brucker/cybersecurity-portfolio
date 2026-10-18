# Cloudflare checklist for AI crawler access

Cloudflare sits in front of theobrucker.us, so its settings decide what crawlers can reach before anything in this repo matters. This checklist reflects Cloudflare's dashboard and documentation as of October 2026. Cloudflare renames menus often, so if a label below does not match, search the dashboard for the setting name.

## What changed in 2026

- **July 1, 2026.** The single "Block AI bots" toggle was replaced by three policies, each set independently: **Search** (crawlers that index content to answer later questions), **Agent** (fetches made in real time for a person, such as ChatGPT-User and Claude-User), and **Training** (crawlers that collect content to train models). Free plans get all three.
- **September 15, 2026.** New defaults for new domains, and a change to what "Block" means for Training. With Training set to **Block**, Cloudflare now also blocks mixed-use crawlers, which include **Googlebot, Bingbot, and Applebot**, so the site would drop out of Google and Bing search entirely. The separate **Disallow AI Training** option writes a no-training preference into robots.txt and blocks training-only crawlers while leaving Googlebot, Bingbot, and Applebot alone.
- **Migration.** Zones that had the legacy "Block AI bots" toggle on were moved to Search: Allow, Training: Disallow AI Training, Agent: Block on pages with ads. Training values of Block were converted to Disallow AI Training.
- **robots.txt.** The old managed robots.txt feature (`# BEGIN Cloudflare Managed content`) is deprecated in favor of **Bot Preference Sync**, which prepends a block between `# BEGIN Cloudflare Bot Preference Sync` and `# END Cloudflare Bot Preference Sync` to the robots.txt the site serves. It is on by default for new customers.

## Target configuration for this site

The site is not ad-supported, wants to be cited, and `allowTrainingCrawlers` is `true` in `site/_data/site.js`.

| Setting | Value |
| --- | --- |
| Search | Allow |
| Agent | Allow |
| Training | Allow (if you ever set `allowTrainingCrawlers` to `false`, use **Disallow AI Training**, never **Block**) |
| Bot Preference Sync | Off, so the robots.txt in this repo is the only source. If you keep it on, confirm its block adds no `Disallow` lines. |
| Bot Fight Mode | Off, unless the Security Events check below shows it leaves the crawlers alone |

## Steps

1. **Record what is served now.** Run the commands in section 3 of `docs/seo/audit.md` and fill in the "Before" column.
2. **Set the AI bot policies.** Dashboard, select the account and the theobrucker.us zone, then **Security** > **Settings**. Filter by **Bot traffic** and open **Configure AI bot policies** (Cloudflare's changelog calls the screen "Configure AI bot traffic policies"). Set Search, Agent, and Training as in the table above and save. Avoid "Block on pages with ads" for any of them; if Cloudflare ever misdetects an embed as an ad, that option blocks crawlers on that page.
3. **Turn off Bot Preference Sync**, which is on the same screen. If a legacy managed robots.txt setting is still listed anywhere, turn it off as well.
4. **Check individual crawlers.** Open **AI Crawl Control** > **Crawlers**. Confirm that GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, and Perplexity-User all show **Allow**. A per-crawler Block creates a WAF custom rule, so an old Block here overrides everything else. A Cloudflare Community report from October 16, 2026 describes Claude-User locked as blocked "by an existing AI bot policy" on a Free zone with Agent set to Allow and Training set to Disallow AI Training. With Training set to Allow that should not apply, but confirm Claude-User specifically.
5. **Check Bot Fight Mode.** **Security** > **Settings**, filter by **Bot traffic**, then **Bot fight mode**. On the Free plan it cannot be bypassed with a WAF skip rule. Before deciding, open **Security** > **Events** (Security Analytics on some accounts), filter the last 7 days by action (Managed Challenge, JS Challenge, Block), and look at the user agents. If any of the crawlers above, or Googlebot or bingbot, were challenged, turn Bot Fight Mode off.
6. **Check everything else that can challenge a crawler.** Under **Security** > **WAF**, review custom rules and rate limiting rules for anything that matches user agents, countries, or ASNs. AI crawlers often come from cloud provider networks, so a rule aimed at hosting ASNs can catch them. Confirm **Security Level** is not "I'm Under Attack". Browser Integrity Check can stay on, but if Security Events shows it challenging crawlers, add an exception or turn it off.
7. **Leave Email Address Obfuscation as you prefer.** It only affects the contact address on the homepage. After Phase 2, structured data contains no email address, so obfuscation cannot corrupt it.
8. **Re-run the audit commands** and fill in the "After" column. The served robots.txt should match `site/robots.njk` exactly, with no Cloudflare block at the top.

## Where to watch crawler activity

- **AI Crawl Control** > **Overview**: requests over time, allowed versus unsuccessful requests, and robots.txt status.
- **AI Crawl Control** > **Crawlers**: requests per crawler and the current Allow or Block action for each.
- **AI Crawl Control** > **Metrics**: requests by crawler, operator, or category, the status code distribution, and the most requested paths. Referral data from AI services is limited to paid plans.
- **Cloudflare Radar** bots directory: how Cloudflare classifies each crawler (Search, Agent, Training, or mixed use) and which operators it treats as accountable.

A healthy pattern a few weeks after the changes is steady 200 responses for OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot, and Bingbot, occasional bursts from ChatGPT-User, Claude-User, and Perplexity-User when someone asks about a topic you cover, and no 403 or challenge responses for any of them.

## Sources

- Cloudflare changelog, "New options to manage AI traffic" (July 1, 2026): <https://developers.cloudflare.com/changelog/post/2026-07-01-ai-traffic-options/>
- Cloudflare blog, "Have it both ways: stay discoverable in search while disallowing AI training" (September 2026): <https://blog.cloudflare.com/accountable-mixed-use-ai-crawlers/>
- Cloudflare blog, "Say it once: introducing Bot Preference Sync": <https://blog.cloudflare.com/bot-preference-sync/>
- Cloudflare docs, "Analyze AI traffic": <https://developers.cloudflare.com/ai-crawl-control/features/analyze-ai-traffic>
- Cloudflare docs, bot protection on Free, Pro, and Business plans: <https://developers.cloudflare.com/use-cases/solutions/stop-malicious-bots/>
- Cloudflare Community report on Claude-User (October 16, 2026): <https://community.cloudflare.com/t/claude-user-locked-as-blocked-with-agent-allow-and-training-disallow/969423>
