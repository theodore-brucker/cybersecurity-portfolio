#!/usr/bin/env node
// Submits every URL in the built sitemap to IndexNow. The Netlify plugin handles
// day-to-day changes on its own; run this once after a site-wide template change
// that did not touch any <lastmod> value:
//
//   npm run build && npm run indexnow:all

import fs from "node:fs/promises";
import { parseSitemap, findKey, submit } from "./lib/indexnow.mjs";

const OUTPUT_DIR = "_site";

const entries = parseSitemap(await fs.readFile(`${OUTPUT_DIR}/sitemap.xml`, "utf8"));
const key = await findKey(OUTPUT_DIR);
if (!key || entries.size === 0) {
  console.error("Build the site first: no IndexNow key file or sitemap entries found in _site/.");
  process.exit(1);
}

const urls = [...entries.keys()];
const host = new URL(urls[0]).host;
const status = await submit({ host, key, urls });
console.log(`Submitted ${urls.length} URL(s) for ${host}; IndexNow answered HTTP ${status}.`);
if (status >= 400) process.exitCode = 1;
