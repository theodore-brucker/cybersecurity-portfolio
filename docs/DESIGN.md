# Design

The site uses one typeface, a white page, and a dark green band. The tokens
are at the top of `site/styles.css`. Read this before changing the look of
any page, and check new work against the list at the end.

## Tokens

| Name | Value | Use |
| --- | --- | --- |
| `--band` | `#1F3B32` | Homepage band and the inner-page header |
| `--green` | `#22553F` | Links, buttons, focus outline |
| `--green-deep` | `#123426` | Link and button hover |
| `--ink` | `#171C26` | Body text and headings |
| `--muted` | `#4A5260` | Dates, issuers, summaries, footer |
| `--line` | `#DCE0E8` | The footer rule |
| `--tint` | `#EEF3F0` | Bottom line box on posts, inline code |
| `--band-soft` | `#E3ECE7` | Intro text on the band |
| `--band-muted` | `#C3D3CA` | Credential line on the band |

Type is Charis SIL at 400, 400 italic, and 700, self-hosted from
`@fontsource/charis-sil` (SIL Open Font License). Body text is 17 to 19 px
with a 1.6 line height. Reading columns are 720 px wide inside a 1040 px shell.
Dates and issuers are set in italic, not in a second typeface. Monospace is
only for code.

## Interaction

- Links rest with a 45 percent underline and fill to full strength and the
  hover color on hover. Hover rules sit inside
  `@media (hover: hover) and (pointer: fine)` so taps on phones do not leave
  a stuck hover state.
- Hover changes are color only, 150 ms with `ease`. The one movement on the
  site is the filled button's press, `scale(0.97)` over 160 ms with
  `--ease-out`, and reduced motion removes it.
- The focus ring is 2 px green on the white page and white on the band and
  the inner-page header, where green would not show.
- Nav links and the wordmark carry vertical padding so each is a 44 px tap
  target. On phones the gap between nav links narrows so all five fit on one
  row at 375 px and wider.
- No entrance animations, scroll reveals, or parallax.

## Layout

- The homepage opens with the band: nav, headshot, name as the `<h1>`, a
  two-sentence intro, and a one-line credential summary. Below it come
  Writing, Work, Certifications, Projects, and Contact in one column.
- Inner pages get a slim band header with the name and the nav, then the
  page's own `<h1>`.
- Section headings are plain sentence-case `<h2>` elements with no label above
  them. On the homepage they run about 34 px on desktop, and every entry
  title under them (posts and jobs alike) is 1.3 rem, so the two levels read
  as different steps.
- Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty` to
  avoid one-word last lines.

## Patterns to leave out

These are common in generated sites and made the previous version of this one
look generated. Do not add them back.

- Tracked, uppercase, or monospace labels above headings, and monospace for
  dates, nav, buttons, or metadata.
- Strings joined with middle dots, double slashes, or pipes ("A · B · C").
  Write a sentence or a comma list instead.
- Hairline rules between every row of a list.
- A filled button paired with an outlined button. Use one button at most, and
  a text link for the second action.
- Colored left or top borders on boxes and cards.
- Tag chips. Tags render as an italic comma list.
- Gradients, glows, glass panels, and decorative shadows.
- Icons or emoji next to headings and links.
- Arrows in link text.
- A cream or off-white page with a clay or terracotta accent, and a
  near-black page with one neon accent. Both are what models produce when
  asked to look less like a model.
- Inter, Geist, Space Grotesk, Instrument Serif, Fraunces, and Newsreader.
