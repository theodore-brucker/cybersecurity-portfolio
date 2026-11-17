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
          @font-face {
            font-family: 'Charis SIL';
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/charis-sil-latin-400-normal.woff2') format('woff2');
          }
          @font-face {
            font-family: 'Charis SIL';
            font-weight: 700;
            font-display: swap;
            src: url('/fonts/charis-sil-latin-700-normal.woff2') format('woff2');
          }
          :root {
            --ink: #171C26;
            --muted: #4A5260;
            --line: #DCE0E8;
            --tint: #EEF3F0;
            --green: #22553F;
          }
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Charis SIL', Charter, Georgia, serif;
            line-height: 1.6;
            color: var(--ink);
            background: #FFFFFF;
            max-width: 760px;
            margin: 0 auto;
            padding: 2rem 1.25rem 3rem;
            font-size: clamp(16px, 4vw, 18px);
          }
          h1 {
            font-size: clamp(1.75rem, 6vw, 2.4rem);
            line-height: 1.1;
            margin-bottom: 0.5rem;
          }
          h2 { font-size: 1.3rem; line-height: 1.3; margin-bottom: 0.15rem; }
          h2 a { color: var(--ink); text-decoration: none; }
          h2 a:hover { text-decoration: underline; }
          a { color: var(--green); text-underline-offset: 3px; }
          .banner {
            background: var(--tint);
            padding: 1rem 1.2rem;
            margin: 1.5rem 0 2rem;
          }
          .banner p { margin-bottom: 0.6rem; }
          .banner p:last-child { margin-bottom: 0; }
          .url {
            display: block;
            font-family: ui-monospace, Consolas, monospace;
            background: var(--ink);
            color: #F2F4F7;
            padding: 0.7rem 0.9rem;
            overflow-x: auto;
            white-space: nowrap;
            margin-top: 0.5rem;
            font-size: 0.85rem;
          }
          .subtitle { color: var(--muted); margin-bottom: 0.5rem; }
          article { margin-top: 1.6rem; }
          .meta { color: var(--muted); font-style: italic; margin-bottom: 0.25rem; }
          footer {
            border-top: 1px solid var(--line);
            margin-top: 2.5rem;
            padding-top: 1.25rem;
            font-size: 0.88rem;
            color: var(--muted);
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
            <p class="meta"><xsl:value-of select="substring(atom:published, 1, 10)"/></p>
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
