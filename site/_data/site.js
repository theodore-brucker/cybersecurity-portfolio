export default {
  title: "Theo Brucker",
  tagline: "CISSP",
  url: "https://theobrucker.us",
  author: {
    name: "Theo Brucker",
    email: "bruckertheodore@gmail.com",
    linkedin: "https://www.linkedin.com/in/theobrucker/",
    github: "https://github.com/theodore-brucker",

    // Structured data (JSON-LD) for the homepage Person node. Google's rules,
    // and this site's, are that structured data may only describe what a
    // visitor can see, so keep every value here in sync with the homepage text.
    alternateName: "Theodore Brucker", // matches the theodore-brucker GitHub handle shown on the homepage
    // Third-person form of the first sentence of the About section.
    description:
      "Cybersecurity professional who builds and evaluates programs that identify and address risk, whether the threat is a nation-state adversary or a regulatory obligation.",
    jobTitle: "Staff Consultant, CMMC",
    worksFor: { name: "A-LIGN", url: "https://www.a-lign.com/" },
    alumniOf: { name: "University of Maine", url: "https://umaine.edu/" },
    // Names match the Education & Certifications list on the homepage.
    credentials: [
      {
        name: "CISSP",
        alternateName: "Certified Information Systems Security Professional",
        category: "certification",
        issuer: { name: "ISC2", url: "https://www.isc2.org/" },
      },
      {
        name: "CMMC Certified Professional (CCP)",
        category: "certification",
        issuer: { name: "The Cyber AB", url: "https://cyberab.org/" },
      },
      {
        name: "CompTIA Security+",
        category: "certification",
        issuer: { name: "CompTIA", url: "https://www.comptia.org/" },
      },
      {
        name: "B.S. in Computer Science",
        category: "degree",
        educationalLevel: "Bachelor's degree",
        issuer: "alumniOf",
      },
    ],
    // Each topic appears on the homepage in the About, Experience, or Projects text.
    knowsAbout: [
      "CMMC",
      "NIST SP 800-171",
      "NIST SP 800-53",
      "DFARS 252.204-7012",
      "DFARS 252.204-7021",
      "Incident response",
      "Security operations",
      "Risk Management Framework (RMF)",
      "Governance, risk, and compliance (GRC)",
    ],
    // Portrait shown in the About section; 800 x 1200, metadata stripped.
    image: { src: "/images/theo-brucker-800.jpg", width: 800, height: 1200 },
  },

  // Social preview image (Open Graph and Twitter cards): 1200 x 630, under 5 MB,
  // metadata stripped. Pages can override it with an `ogImage` front matter path.
  ogImage: {
    src: "/images/theo-brucker-og.jpg",
    width: 1200,
    height: 630,
    alt: "Headshot of Theo Brucker",
  },
  locale: "en_US",
  language: "en-US",

  // Opening paragraph of /llms.txt and /llms-full.txt. Every fact in it is stated
  // on the homepage; update both together.
  profileSummary:
    "Theo Brucker is a cybersecurity professional who builds and assesses security programs. He holds the CISSP, CMMC Certified Professional (CCP), and CompTIA Security+ certifications and a B.S. in Computer Science from the University of Maine. Since July 2026 he has been a Staff Consultant on the CMMC practice at A-LIGN, where he runs CMMC readiness assessments and CMMC Level 2 assessments against NIST SP 800-171. Before that he was the ISSM at a defense manufacturer, where he built the cybersecurity program, carried a CMMC Level 2 effort from gap assessment through C3PAO engagement, and hardened classified systems under DCSA oversight and NIST SP 800-53. Earlier he spent three years as a SOC analyst at a managed security service provider, handling incident response across roughly 100 client environments.",
  // Rendered in the footer of every page and at the end of every post.
  disclaimer:
    "The views and opinions expressed on this site are my own. They do not represent the views, positions, or opinions of any current or former employer, client, or affiliated organization. Nothing here is written on behalf of anyone but me, and no content is derived from confidential or client-specific information.",
  // Rendered in the footer, next to the disclaimer.
  pledge: "Every blog post is written by me without AI assistance.",
  buildYear: new Date().getFullYear(),

  // Model training crawlers (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
  // CCBot). true lets them read the site, which helps models recognize the name as
  // an entity. false opts out of training and does not affect citations in AI
  // search answers, which come from the search and user-fetch crawlers.
  // Cloudflare's Training policy must agree; see docs/seo/cloudflare-checklist.md.
  allowTrainingCrawlers: true,

  // Search engine ownership verification. Paste only the content value of the meta
  // tag each service gives you; an empty string leaves the tag out. Google Search
  // Console is already verified by site/google81b481de2f276844.html.
  verification: {
    google: "", // <meta name="google-site-verification" content="...">
    bing: "", // <meta name="msvalidate.01" content="...">
  },
};
