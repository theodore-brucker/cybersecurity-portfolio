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
            --background-color: #2A2420;
            --text-color: #E6D5B8;
            --accent-color: #E59560;
            --secondary-accent: #A45C40;
            --highlight-color: #F2A65A;
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: var(--text-color);
            background-color: var(--background-color);
            max-width: 760px;
            margin: 0 auto;
            padding: 2rem 1.25rem 3rem;
            font-size: clamp(14px, 4vw, 16px);
          }
          h1 {
            color: var(--accent-color);
            font-size: clamp(1.5rem, 6vw, 2.2rem);
            border-bottom: 3px solid var(--accent-color);
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
          }
          h2 { color: var(--accent-color); font-size: 1.15rem; margin-bottom: 0.35rem; }
          h2 a { color: var(--highlight-color); text-decoration: none; }
          h2 a:hover { color: var(--accent-color); text-decoration: underline; }
          a { color: var(--highlight-color); }
          .banner {
            background-color: rgba(164, 92, 64, 0.18);
            border-left: 4px solid var(--accent-color);
            border-radius: 0 8px 8px 0;
            padding: 1rem 1.2rem;
            margin: 1.5rem 0 2rem;
          }
          .banner p { margin-bottom: 0.6rem; }
          .banner p:last-child { margin-bottom: 0; }
          .url {
            display: block;
            font-family: 'Courier New', Courier, monospace;
            background-color: #1A1614;
            color: var(--accent-color);
            padding: 0.7rem 0.9rem;
            border-radius: 5px;
            overflow-x: auto;
            white-space: nowrap;
            margin-top: 0.5rem;
          }
          .subtitle { margin-bottom: 0.5rem; }
          article {
            border-top: 1px solid var(--secondary-accent);
            padding-top: 1.5rem;
            margin-top: 1.5rem;
          }
          .meta { color: var(--secondary-accent); font-size: 0.85rem; margin-bottom: 0.6rem; }
          footer {
            border-top: 1px solid var(--secondary-accent);
            margin-top: 2.5rem;
            padding-top: 1.25rem;
            font-size: 0.8rem;
            opacity: 0.7;
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
