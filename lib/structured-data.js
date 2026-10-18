// Builds the single JSON-LD @graph that base.njk emits on every indexable page.
//
// The rule for every node: describe only what a visitor can see on that page.
// The full Person node (employer, education, credentials, topics) is emitted on
// the homepage, where all of that is shown. Other pages reference the same
// @id with a minimal Person (name, URL, and the profile links in the footer), so
// search engines can merge them into one entity without any page claiming more
// than it shows. scripts/validate-jsonld.mjs checks the output in CI.

import { DateTime } from "luxon";

const toDate = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value;
  const parsed = DateTime.fromISO(String(value), { zone: "utc" });
  return parsed.isValid ? parsed.toJSDate() : null;
};

const latest = (dates) =>
  dates.filter(Boolean).reduce((newest, d) => (!newest || d > newest ? d : newest), null);

const iso = (date) =>
  date ? DateTime.fromJSDate(date, { zone: "utc" }).toISO({ suppressMilliseconds: true }) : undefined;

const visibleTags = (tags) => (tags || []).filter((t) => t !== "posts");

export function buildGraph(data, site, collections = {}) {
  const abs = (path) => new URL(path, `${site.url}/`).href;
  const pageUrl = abs(data.page.url);
  const ref = (id) => ({ "@id": id });

  const id = {
    person: `${site.url}/#person`,
    personImage: `${site.url}/#personimage`,
    school: `${site.url}/#alumniof`,
    website: `${site.url}/#website`,
    blog: `${site.url}/blog/#blog`,
    page: `${pageUrl}#webpage`,
    article: `${pageUrl}#article`,
    breadcrumb: `${pageUrl}#breadcrumb`,
  };
  const articleId = (post) => `${abs(post.url)}#article`;

  const isHome = data.page.url === "/";
  const isPost = (data.tags || []).includes("posts");
  const posts = collections.posts || [];
  const description = data.description || data.summary;
  const blogName = `${site.title}'s blog`;

  const author = site.author;
  const person = {
    "@type": "Person",
    "@id": id.person,
    name: author.name,
    url: `${site.url}/`,
    sameAs: [author.linkedin, author.github],
  };
  if (isHome) {
    Object.assign(person, {
      alternateName: author.alternateName,
      description: author.description,
      image: {
        "@type": "ImageObject",
        "@id": id.personImage,
        url: abs(author.image.src),
        width: author.image.width,
        height: author.image.height,
        caption: author.name,
      },
      jobTitle: author.jobTitle,
      worksFor: { "@type": "Organization", name: author.worksFor.name, url: author.worksFor.url },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        "@id": id.school,
        name: author.alumniOf.name,
        url: author.alumniOf.url,
      },
      hasCredential: author.credentials.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.name,
        alternateName: c.alternateName,
        credentialCategory: c.category,
        educationalLevel: c.educationalLevel,
        recognizedBy:
          c.issuer === "alumniOf"
            ? ref(id.school)
            : { "@type": "Organization", name: c.issuer.name, url: c.issuer.url },
      })),
      knowsAbout: author.knowsAbout,
    });
  }

  const website = {
    "@type": "WebSite",
    "@id": id.website,
    url: `${site.url}/`,
    name: site.title,
    inLanguage: site.language,
    publisher: ref(id.person),
    author: ref(id.person),
  };

  const webPage = (type) => ({
    "@type": type,
    "@id": id.page,
    url: pageUrl,
    name: data.documentTitle,
    description,
    inLanguage: site.language,
    isPartOf: ref(id.website),
  });

  // Visible trail from front matter (`breadcrumb`), plus the current page when
  // the trail stops at its parent, as it does on posts.
  const crumbs = [...(data.breadcrumb || [])];
  if (crumbs.length && crumbs[crumbs.length - 1].url !== data.page.url) {
    crumbs.push({ name: data.title, url: data.page.url });
  }
  const breadcrumbList = crumbs.length
    ? {
        "@type": "BreadcrumbList",
        "@id": id.breadcrumb,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: abs(c.url),
        })),
      }
    : null;

  const graph = [person, website];

  if (isHome) {
    graph.push({
      ...webPage("ProfilePage"),
      mainEntity: ref(id.person),
      about: ref(id.person),
      primaryImageOfPage: ref(id.personImage),
      dateModified: iso(toDate(data.updated)),
    });
  } else if (isPost) {
    const published = data.page.date;
    const modified = latest([published, toDate(data.updated)]);
    graph.push({
      ...webPage("WebPage"),
      breadcrumb: breadcrumbList ? ref(id.breadcrumb) : undefined,
      mainEntity: ref(id.article),
      datePublished: iso(published),
      dateModified: iso(modified),
    });
    const article = {
      "@type": "BlogPosting",
      "@id": id.article,
      headline: data.title,
      description,
      url: pageUrl,
      datePublished: iso(published),
      dateModified: iso(modified),
      author: ref(id.person),
      publisher: ref(id.person),
      mainEntityOfPage: ref(id.page),
      isPartOf: ref(id.blog),
      inLanguage: site.language,
      keywords: visibleTags(data.tags),
      wordCount: data.wordCount,
    };
    // Only an image the post itself displays; the headshot is not shown on posts.
    if (data.image) {
      article.image = {
        "@type": "ImageObject",
        url: abs(data.image),
        caption: data.imageAlt,
      };
    }
    graph.push(article);
    graph.push({ "@type": "Blog", "@id": id.blog, url: abs("/blog/"), name: blogName });
  } else if (data.schemaType === "Blog") {
    graph.push({
      ...webPage("CollectionPage"),
      breadcrumb: breadcrumbList ? ref(id.breadcrumb) : undefined,
      mainEntity: ref(id.blog),
    });
    graph.push({
      "@type": "Blog",
      "@id": id.blog,
      url: pageUrl,
      name: blogName,
      description,
      inLanguage: site.language,
      author: ref(id.person),
      publisher: ref(id.person),
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        "@id": articleId(post),
        headline: post.data.title,
        url: abs(post.url),
        datePublished: iso(post.date),
        dateModified: iso(latest([post.date, toDate(post.data.updated)])),
        author: ref(id.person),
      })),
    });
  } else {
    graph.push({
      ...webPage("WebPage"),
      breadcrumb: breadcrumbList ? ref(id.breadcrumb) : undefined,
    });
  }

  if (breadcrumbList && !isHome) graph.push(breadcrumbList);

  return { "@context": "https://schema.org", "@graph": graph };
}

// JSON for a <script type="application/ld+json"> element. Escaping "<" keeps any
// "</script>" inside a string value from closing the element early.
export function serializeGraph(graph) {
  return JSON.stringify(graph, null, 2).replace(/</g, "\\u003c");
}
