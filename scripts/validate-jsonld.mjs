#!/usr/bin/env node
// Validates the JSON-LD in the built site. Run after `npm run build`:
//
//   node scripts/validate-jsonld.mjs [output-dir]
//
// Fails (exit 1) when:
//   - an indexable page (one with a canonical link) does not have exactly one
//     JSON-LD block, or a block does not parse
//   - a block is not a schema.org @graph
//   - a node is missing a required property for its type
//   - an @id reference does not resolve to a node defined on the same page, or
//     one @id is defined twice on a page
//   - a date or URL value is malformed
//   - a value that must be visible on the page is not: the Person name, each
//     credential name, a post's headline (which must equal its <h1>), each FAQ
//     question and answer, and each breadcrumb name
// Recommended properties that are missing are reported as warnings.

import fs from "node:fs/promises";
import path from "node:path";

const OUTPUT_DIR = process.argv[2] || "_site";

const REQUIRED = {
  Person: ["name", "url"],
  WebSite: ["name", "url"],
  WebPage: ["url", "name"],
  ProfilePage: ["url", "name", "mainEntity"],
  CollectionPage: ["url", "name"],
  Blog: ["name", "url"],
  BlogPosting: ["headline", "url", "datePublished", "author"],
  BreadcrumbList: ["itemListElement"],
  ListItem: ["position", "name"],
  ItemList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Question: ["name", "acceptedAnswer"],
  Answer: ["text"],
  ImageObject: ["url"],
  CreativeWork: ["name"],
  EducationalOccupationalCredential: ["name", "credentialCategory"],
  Organization: ["name"],
  CollegeOrUniversity: ["name"],
};

const RECOMMENDED = {
  BlogPosting: ["dateModified", "description", "mainEntityOfPage", "wordCount"],
  ProfilePage: ["dateModified"],
  WebPage: ["description"],
  CollectionPage: ["description"],
};

const DATE_KEYS = new Set(["datePublished", "dateModified", "dateCreated", "uploadDate"]);
const URL_KEYS = new Set(["url", "item", "@id"]);

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", mdash: "\u2014",
  ndash: "\u2013", middot: "\u00b7", larr: "\u2190", rarr: "\u2192", copy: "\u00a9",
  hellip: "\u2026", rsquo: "\u2019", lsquo: "\u2018", ldquo: "\u201c", rdquo: "\u201d",
  minus: "\u2212",
};

const decode = (text) =>
  text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : match;
    }
    return ENTITIES[code.toLowerCase()] ?? match;
  });

const normalize = (text) => decode(text).replace(/\s+/g, " ").trim().toLowerCase();

// Text a visitor can see: the body without scripts, styles, and markup.
function visibleText(html) {
  const body = html.replace(/^[\s\S]*?<body[^>]*>/i, "").replace(/<\/body>[\s\S]*$/i, "");
  return normalize(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  );
}

const types = (node) => [].concat(node["@type"] || []);
const isReference = (value) =>
  value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 1 && "@id" in value;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function checkPage(file, html) {
  const errors = [];
  const warnings = [];
  const isIndexable = /<link rel="canonical"/i.test(html);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

  if (!isIndexable) {
    if (blocks.length) warnings.push(`${blocks.length} JSON-LD block(s) on a page without a canonical link`);
    return { errors, warnings, nodes: 0 };
  }
  if (blocks.length !== 1) {
    errors.push(`expected exactly one JSON-LD block, found ${blocks.length}`);
    if (!blocks.length) return { errors, warnings, nodes: 0 };
  }

  const definitions = new Map();
  const references = [];
  const all = [];

  const walk = (value, where) => {
    if (Array.isArray(value)) return value.forEach((v, i) => walk(v, `${where}[${i}]`));
    if (!value || typeof value !== "object") return;
    if (isReference(value)) {
      references.push({ id: value["@id"], where });
      return;
    }
    if (value["@id"]) {
      if (definitions.has(value["@id"])) errors.push(`@id defined more than once: ${value["@id"]}`);
      definitions.set(value["@id"], value);
    }
    if (value["@type"]) all.push({ node: value, where });
    for (const [key, child] of Object.entries(value)) {
      if (DATE_KEYS.has(key) && (typeof child !== "string" || Number.isNaN(Date.parse(child)))) {
        errors.push(`${where}.${key} is not an ISO 8601 date: ${JSON.stringify(child)}`);
      }
      if (URL_KEYS.has(key) && typeof child === "string" && !/^https:\/\/[^\s]+$/.test(child)) {
        errors.push(`${where}.${key} is not an absolute https URL: ${child}`);
      }
      if (!key.startsWith("@")) walk(child, `${where}.${key}`);
    }
  };

  for (const block of blocks) {
    let json;
    try {
      json = JSON.parse(block);
    } catch (error) {
      errors.push(`JSON-LD does not parse: ${error.message}`);
      continue;
    }
    if (json["@context"] !== "https://schema.org") errors.push('missing "@context": "https://schema.org"');
    if (!Array.isArray(json["@graph"])) {
      errors.push("JSON-LD is not an @graph");
      continue;
    }
    walk(json["@graph"], "@graph");
  }

  for (const { id, where } of references) {
    if (!definitions.has(id)) errors.push(`unresolved @id reference at ${where}: ${id}`);
  }

  const text = visibleText(html);
  const seen = (value) => text.includes(normalize(String(value)));
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1Text = h1 ? normalize(h1[1].replace(/<[^>]+>/g, " ")) : null;
  const pageUrl = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];

  for (const { node, where } of all) {
    for (const type of types(node)) {
      for (const key of REQUIRED[type] || []) {
        if (node[key] === undefined || node[key] === "" || (Array.isArray(node[key]) && !node[key].length)) {
          errors.push(`${type} at ${where} is missing required "${key}"`);
        }
      }
      // Recommended properties apply to the page's own nodes, not to summaries of
      // other pages such as the post list on the blog index.
      const ownNode = !node["@id"] || node["@id"].startsWith(`${pageUrl}#`);
      for (const key of ownNode ? RECOMMENDED[type] || [] : []) {
        if (node[key] === undefined) warnings.push(`${type} at ${where} has no "${key}"`);
      }
    }

    const t = types(node);
    if (t.includes("Person") && node.name && !seen(node.name)) {
      errors.push(`Person name "${node.name}" is not visible on the page`);
    }
    for (const credential of node.hasCredential || []) {
      if (credential.name && !seen(credential.name)) {
        errors.push(`credential "${credential.name}" is not visible on the page`);
      }
    }
    if (t.includes("BlogPosting") && node["@id"] === `${pageUrl}#article` && node.headline) {
      if (normalize(node.headline) !== h1Text) {
        errors.push(`BlogPosting headline "${node.headline}" does not match the page <h1>`);
      }
    }
    if (t.includes("Question")) {
      if (node.name && !seen(node.name)) errors.push(`FAQ question "${node.name}" is not visible on the page`);
      const answer = node.acceptedAnswer?.text;
      if (answer && !seen(answer.replace(/<[^>]+>/g, " "))) {
        errors.push(`FAQ answer to "${node.name}" is not visible on the page`);
      }
    }
    if (t.includes("BreadcrumbList")) {
      for (const item of node.itemListElement || []) {
        if (item.name && !seen(item.name)) errors.push(`breadcrumb "${item.name}" is not visible on the page`);
      }
    }
  }

  return { errors, warnings, nodes: all.length };
}

const files = (await htmlFiles(OUTPUT_DIR)).sort();
let errorCount = 0;
let checked = 0;
for (const file of files) {
  const html = await fs.readFile(file, "utf8");
  const { errors, warnings, nodes } = checkPage(file, html);
  const name = path.relative(OUTPUT_DIR, file);
  if (nodes) checked++;
  for (const e of errors) console.error(`ERROR   ${name}: ${e}`);
  for (const w of warnings) console.log(`warning ${name}: ${w}`);
  errorCount += errors.length;
}

if (errorCount) {
  console.error(`\nJSON-LD validation failed with ${errorCount} error(s).`);
  process.exit(1);
}
console.log(`\nJSON-LD valid on ${checked} page(s); ${files.length} HTML file(s) scanned.`);
