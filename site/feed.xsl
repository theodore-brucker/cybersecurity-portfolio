<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  exclude-result-prefixes="atom">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title><xsl:value-of select="atom:feed/atom:title"/></title>
        <meta name="robots" content="noindex"/>
        <style>
          :root {
            --paper: #F5F7F6;
            --ink: #0D1B26;
            --slate: #5C6B70;
            --line: #D3DBD8;
            --fill: #EBEFED;
            --federal: #1A4B8C;
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Public Sans', 'Segoe UI', system-ui, sans-serif;
            line-height: 1.65;
            color: var(--ink);
            background-color: var(--paper);
            max-width: 760px;
            margin: 0 auto;
            padding: 2rem 1.25rem 3rem;
            font-size: clamp(14px, 4vw, 16px);
          }
          h1 {
            font-size: clamp(1.5rem, 6vw, 2.2rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            margin-bottom: 0.5rem;
          }
          h2 { font-size: 1.1rem; margin-bottom: 0.25rem; }
          h2 a { color: var(--ink); text-decoration: none; }
          h2 a:hover { color: var(--federal); text-decoration: underline; }
          a { color: var(--federal); }
          .banner {
            background-color: var(--fill);
            border-left: 3px solid var(--federal);
            padding: 1rem 1.2rem;
            margin: 1.5rem 0 2rem;
          }
          .banner p { margin-bottom: 0.6rem; }
          .banner p:last-child { margin-bottom: 0; }
          .url {
            display: block;
            font-family: 'IBM Plex Mono', 'Consolas', monospace;
            background-color: var(--ink);
            color: var(--paper);
            padding: 0.7rem 0.9rem;
            overflow-x: auto;
            white-space: nowrap;
            margin-top: 0.5rem;
            font-size: 0.85rem;
          }
          .subtitle { color: var(--slate); margin-bottom: 0.5rem; }
          article {
            border-top: 1px solid var(--line);
            padding-top: 1.25rem;
            margin-top: 1.25rem;
          }
          .meta {
            font-family: 'IBM Plex Mono', 'Consolas', monospace;
            color: var(--slate);
            font-size: 0.78rem;
            margin-bottom: 0.5rem;
          }
          footer {
            border-top: 1px solid var(--line);
            margin-top: 2.5rem;
            padding-top: 1.25rem;
            font-size: 0.8rem;
            color: var(--slate);
          }
          footer p { margin-bottom: 0.75rem; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="atom:feed/atom:title"/></h1>
        <p class="subtitle"><xsl:value-of select="atom:feed/atom:subtitle"/></p>

        <div class="banner">
          <p><strong>This is a web feed.</strong> Paste the address below into a
          feed reader such as Feedly, Inoreader, or NetNewsWire to get new posts
          automatically, with no algorithm and no email address required.</p>
          <code class="url"><xsl:value-of select="atom:feed/atom:link[@rel='self']/@href"/></code>
        </div>

        <p>
          <a>
            <xsl:attribute name="href">
              <xsl:value-of select="atom:feed/atom:link[not(@rel='self')]/@href"/>
            </xsl:attribute>
            Back to the site
          </a>
        </p>

        <xsl:for-each select="atom:feed/atom:entry">
          <article>
            <h2>
              <a>
                <xsl:attribute name="href">
                  <xsl:value-of select="atom:link/@href"/>
                </xsl:attribute>
                <xsl:value-of select="atom:title"/>
              </a>
            </h2>
            <p class="meta"><xsl:value-of select="substring(atom:updated, 1, 10)"/></p>
            <p><xsl:value-of select="atom:summary"/></p>
          </article>
        </xsl:for-each>

        <footer>
          <p><xsl:value-of select="atom:feed/atom:rights"/></p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
