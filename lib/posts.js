// Date and tag helpers shared by eleventy.config.js and lib/structured-data.js.

import { DateTime } from "luxon";

// Front matter dates arrive as Date objects (unquoted YAML) or strings (quoted).
export const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = DateTime.fromISO(String(value), { zone: "utc" });
  return parsed.isValid ? parsed.toJSDate() : null;
};

export const latest = (dates) =>
  dates.filter(Boolean).reduce((newest, d) => (!newest || d > newest ? d : newest), null);

// A post's last substantive revision: `updated` when set, otherwise its publish date.
export const postModified = (post) => latest([post.date, toDate(post.data.updated)]);

// Tags shown to readers; "posts" is the internal collection tag.
export const visibleTags = (tags) => (tags || []).filter((t) => t !== "posts");

const lower = (value) => String(value).toLowerCase();

// Posts carrying any of the given tags, compared without regard to case.
export function postsWithTags(posts, tags) {
  const wanted = (tags || []).map(lower);
  return (posts || []).filter((p) => visibleTags(p.data.tags).some((t) => wanted.includes(lower(t))));
}

// Other posts that share at least one tag with this one, most shared tags first,
// then newest first.
export function relatedPosts(post, posts, limit = 3) {
  const mine = visibleTags(post.data?.tags ?? post.tags).map(lower);
  if (!mine.length) return [];
  return (posts || [])
    .filter((p) => p.url !== post.url)
    .map((p) => ({ p, shared: visibleTags(p.data.tags).filter((t) => mine.includes(lower(t))).length }))
    .filter(({ shared }) => shared > 0)
    .sort((a, b) => b.shared - a.shared || b.p.date - a.p.date)
    .slice(0, limit)
    .map(({ p }) => p);
}
