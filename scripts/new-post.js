#!/usr/bin/env node
// Usage: npm run new -- "Why CMMC Scoping Is Where Programs Die"
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- "Your Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/['’]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const date = new Date().toISOString().slice(0, 10);
const file = path.join("site", "blog", `${slug}.md`);

if (fs.existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

const body = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
summary: "One or two sentences. This is the LinkedIn preview and the Google result snippet, so make it earn the click."
tags: ["CMMC"]
readingTime: 4
draft: true
# Optional fields. Uncomment the ones you use; each renders on the page only when set.
# description: "One plain sentence for search snippets: what the post covers, and that you wrote it."
# updated: ${date}   # last substantive revision; shows as "Last updated"
# bluf: "Two or three sentences that answer the post's question up front. Shown in a box above the body."
# faq:
#   - q: "A question readers actually ask?"
#     a: "A short, direct answer. Markdown links work."
# sources:
#   - title: "32 CFR Part 170, CMMC Program"
#     url: "https://www.ecfr.gov/current/title-32/subtitle-A/chapter-I/subchapter-G/part-170"
#     publisher: "eCFR"
---

Open with the claim, not the setup. State the opinion in the first two sentences.

## The context

## What I actually think

## What I would do differently

<!--
Pre-publish check:
- No client names, no engagement details, no anything traceable to a specific org
- No non-public detail from work systems
- Opinion is framed as mine, not as guidance from an employer
- Set draft: false to publish
-->
`;

fs.writeFileSync(file, body);
console.log(`Created ${file}`);
console.log(`URL will be: https://theobrucker.us/blog/${slug}/`);
