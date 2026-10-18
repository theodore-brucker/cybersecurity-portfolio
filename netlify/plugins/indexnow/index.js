// Netlify build plugin: once a production deploy is live, tell IndexNow which
// URLs changed. IndexNow feeds Bing (and through it Copilot and much of ChatGPT
// search) plus Yandex, Seznam, Naver, and others.
//
// Before the build, it reads the sitemap that is currently live. After the deploy,
// it compares that with the sitemap this build produced and submits URLs that are
// new, whose <lastmod> changed, or that were removed. If the live sitemap cannot
// be read, it submits every URL. It only runs in the production context and never
// fails a build.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { parseSitemap, changedUrls, findKey, submit } from "../../../scripts/lib/indexnow.mjs";

const STATE_FILE = path.join(os.tmpdir(), "indexnow-live-sitemap.json");

const isProduction = () => process.env.CONTEXT === "production";

export const onPreBuild = async () => {
  if (!isProduction() || !process.env.URL) return;
  try {
    const response = await fetch(new URL("/sitemap.xml", process.env.URL));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const live = parseSitemap(await response.text());
    await fs.writeFile(STATE_FILE, JSON.stringify([...live]));
  } catch (error) {
    console.log(`IndexNow: could not read the live sitemap (${error.message}); all URLs will be submitted.`);
  }
};

async function readLiveSitemap() {
  try {
    return new Map(JSON.parse(await fs.readFile(STATE_FILE, "utf8")));
  } catch {
    return null;
  }
}

export const onSuccess = async ({ constants, utils }) => {
  if (!isProduction()) return;
  let summary;
  try {
    const publishDir = constants.PUBLISH_DIR;
    const current = parseSitemap(await fs.readFile(path.join(publishDir, "sitemap.xml"), "utf8"));
    const key = await findKey(publishDir);
    if (!key || current.size === 0) {
      console.log("IndexNow: no key file or empty sitemap in the build output; nothing submitted.");
      return;
    }
    const host = new URL(current.keys().next().value).host;
    const previous = await readLiveSitemap();
    const urls = (previous ? changedUrls(previous, current) : [...current.keys()]).filter(
      (url) => new URL(url).host === host
    );
    if (urls.length === 0) {
      console.log("IndexNow: no sitemap URLs changed; nothing submitted.");
      return;
    }
    const status = await submit({ host, key, urls });
    summary = `Submitted ${urls.length} URL(s); IndexNow answered HTTP ${status}.`;
    console.log(`IndexNow: ${summary}`);
  } catch (error) {
    console.log(`IndexNow: submission skipped (${error.message}).`);
    return;
  }
  try {
    utils.status.show({ title: "IndexNow", summary });
  } catch {
    // Status reporting is cosmetic; the result is already in the deploy log.
  }
};
