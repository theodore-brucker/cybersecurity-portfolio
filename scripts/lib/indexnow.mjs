// IndexNow helpers shared by the Netlify build plugin and scripts/indexnow-submit.mjs.
//
// IndexNow keys are public by design. The key file is served at the site root
// (/<key>.txt) so that search engines can confirm that whoever submits URLs
// controls the host. Nothing here is a secret, and the key never needs to live in
// an environment variable or a CI secret.

import fs from "node:fs/promises";
import path from "node:path";

export const ENDPOINT = "https://api.indexnow.org/indexnow";

// The key file is named <key>.txt and contains exactly the key.
const KEY_FILE = /^([a-f0-9]{32})\.txt$/;

// Map of <loc> to <lastmod> ("" when a URL has no lastmod).
export function parseSitemap(xml) {
  const entries = new Map();
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>\s*([^<\s]+)\s*<\/loc>/)?.[1];
    if (!loc) continue;
    const lastmod = block.match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/)?.[1] ?? "";
    entries.set(loc, lastmod);
  }
  return entries;
}

// URLs that are new, whose lastmod changed, or that were removed. Removed URLs
// are included so engines recrawl them, see the 404, and drop them.
export function changedUrls(previous, current) {
  const urls = [];
  for (const [loc, lastmod] of current) {
    if (!previous.has(loc) || previous.get(loc) !== lastmod) urls.push(loc);
  }
  for (const loc of previous.keys()) {
    if (!current.has(loc)) urls.push(loc);
  }
  return urls;
}

// Finds the key file in a build output directory and returns the key, or null.
export async function findKey(dir) {
  for (const name of await fs.readdir(dir)) {
    const match = name.match(KEY_FILE);
    if (!match) continue;
    const contents = (await fs.readFile(path.join(dir, name), "utf8")).trim();
    if (contents === match[1]) return match[1];
  }
  return null;
}

// Posts the URL list and returns the HTTP status. 200 and 202 mean accepted.
export async function submit({ host, key, urls }) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `https://${host}/${key}.txt`,
      urlList: urls,
    }),
  });
  return response.status;
}
