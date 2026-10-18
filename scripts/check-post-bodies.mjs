#!/usr/bin/env node
// Fails when a change touches the body of a blog post, meaning anything below
// the closing front matter delimiter in site/blog/*.md. Front matter edits are
// allowed. The site promises that every post is written without AI assistance,
// so automated changes must never reach post prose.
//
// Usage: node scripts/check-post-bodies.mjs <base-ref> [head-ref]
// CI runs it on pull requests with the base and head commit SHAs. A pull request
// that intentionally edits or adds a post can carry the "post-body-edit" label,
// which skips the check (see .github/workflows/post-body-guard.yml).

import { execFileSync } from "node:child_process";

const [base, head = "HEAD"] = process.argv.slice(2);
if (!base) {
  console.error("Usage: node scripts/check-post-bodies.mjs <base-ref> [head-ref]");
  process.exit(2);
}

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

const POST_FILE = /^site\/blog\/[^/]+\.md$/;

// Everything after the line that closes the front matter. A file without front
// matter is treated as all body.
function postBody(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  if (lines[0].trim() !== "---") return normalized;
  const close = lines.findIndex((line, i) => i > 0 && line.trim() === "---");
  return close === -1 ? normalized : lines.slice(close + 1).join("\n");
}

const mergeBase = git("merge-base", base, head).trim();
const changed = git("diff", "--name-status", "--no-renames", mergeBase, head, "--", "site/blog")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("\t"))
  .filter(([, file]) => POST_FILE.test(file));

const problems = [];
for (const [status, file] of changed) {
  if (status === "A") {
    problems.push(`${file}: a new post was added`);
  } else if (status === "D") {
    problems.push(`${file}: a post was deleted`);
  } else {
    const before = postBody(git("show", `${mergeBase}:${file}`));
    const after = postBody(git("show", `${head}:${file}`));
    if (before !== after) problems.push(`${file}: the post body changed`);
  }
}

if (problems.length) {
  console.error("Blog post bodies must not change in this pull request:");
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    'Front matter edits are fine. If the change is your own writing, add the "post-body-edit" label to skip this check.'
  );
  process.exit(1);
}

console.log(
  changed.length
    ? `Checked ${changed.length} post file(s); only front matter changed.`
    : "No blog post files changed."
);
