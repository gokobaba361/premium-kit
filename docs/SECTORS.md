# Sector map

How each preset was calibrated: which real sites set the bar, what they actually do,
and what the preset copies at the system level (never at the pixel level).

Use this file when starting a new client project. Pick the row, read the "what to copy"
column, then compose blocks. If the client does not fit a row, add a new preset in
`src/design/themes.css` plus an entry in `src/design/presets.ts` instead of overriding
tokens inside a component.

---

## Obsidian - developer tools, infrastructure, technical SaaS

**References:** linear.app, vercel.com, resend.com, planetscale.com, railway.com

**What they do**
- Dark ground, hairline borders instead of shadows, one signal accent used sparingly.
- Product screenshots are real, never illustrated. The UI is the hero asset.
- Copy states mechanics, not benefits. No adjectives before nouns.
- Motion is short and functional: entry reveals, hover feedback, nothing looping.

**What to copy:** the restraint. Structure comes from lines and spacing, hierarchy from
type weight, personality from exactly one accent color.

**Do not copy:** neon glows, gradient headline text, animated mesh backgrounds.

---

## Bone - design studios, agencies, portfolios

**References:** basicagency.com, locomotive.ca, instrument.com, humaan.com

**What they do**
- The work is the content. Image scale is aggressive, chrome is nearly absent.
- Extreme type scale contrast: a 7rem statement next to 0.875rem metadata.
- Sharp corners, no shadows, hard edges between sections.
- Higher motion budget, but motion is tied to scroll position and content reveal.

**What to copy:** the confidence to ship a page with four sections and no feature grid.

**Do not copy:** rotated vertical labels, section numbering, locale and weather strips,
cursor followers. Those are the agency-site cliches, not the reason those sites work.

---

## Forest - premium consumer, DTC, outdoor, food and craft

**References:** aesop.com, filson.com, greatjonesgoods.com, madeincookware.com

**What they do**
- Photography does the selling. Text sections exist to caption the product.
- Calm pacing, generous radii, warm accent against a cool or neutral ground.
- Materials, dimensions and care are stated plainly, grouped, never dumped in a
  hairline-per-row spec table.

**What to copy:** image-first section rhythm and specification grouping.

**Do not copy:** the beige plus brass plus espresso palette every AI-built consumer
site defaults to. This preset deliberately uses bone, deep green and amber instead.

---

## Cobalt - fintech, B2B platforms, enterprise, legal

**References:** stripe.com, mercury.com, ramp.com, brex.com

**What they do**
- Trust signals rank above aesthetics: logos, compliance, real numbers, real names.
- Tight radii, dense but readable spacing, saturated accent used only on primary action.
- The pricing page is honest and short. Two or three plans, not a nine row matrix.

**What to copy:** proof placement. Logo wall directly under the hero, quote from a
named operator with a real role, numbers only when they are real.

**Do not copy:** the isometric 3D illustration set. It reads as stock in 2026.

---

## Clinic - healthcare, insurance, public services, education

**References:** design-system.service.gov.uk, designsystem.digital.gov, hioscar.com

**What they do**
- Accessibility outranks taste: AA contrast minimum, visible focus, plain language.
- Near static motion. Nothing moves that a user did not trigger.
- Short line length, large tap targets, explicit form labels above inputs.

**What to copy:** the discipline. If a choice is between elegant and legible, legible wins.

**Do not copy:** stock photography of smiling staff in hallways. Use real facilities,
real people, or restrained illustration.

---

## Terracotta - hospitality, restaurants, travel, venues

**References:** standardhotels.com, acehotel.com, noma.dk, thehoxton.com

**What they do**
- Full bleed atmosphere imagery, minimal copy, booking action always reachable.
- Warm accent against a cool ground so the food and interiors carry the warmth.
- Practical information (hours, address, menu) is one click deep and never decorative.

**What to copy:** the balance of mood and utility. A booking CTA that survives scroll.

**Do not copy:** atmospheric locale strips and time-and-weather widgets in the header.

---

## Slate - architecture, real estate, interiors, construction

**References:** heatherwick.com, big.dk, compass.com, dezeen.com

**What they do**
- Plans, elevations and photography carry the page. Copy is captions and facts.
- Square corners, cool grey ground, one technical blue used for actions only.
- Wide image ratios, often 16:7 or wider, because buildings are wide.

**What to copy:** letting a floor plan be a hero asset instead of a decorative aside.

**Do not copy:** the sunset render with lens flare. Use real photography or honest greyscale plans.

---

## Signal - consumer apps, startups, marketplaces

**References:** notion.com, duolingo.com, revolut.com, linear.app

**What they do**
- One saturated accent, pill shapes, big friendly type, quick to parse.
- Product screenshots are real and large, usually on a device or a plain surface.
- Short sections. The page is a queue of single ideas, not a document.

**What to copy:** the clarity. Every section answers one question a new user has.

**Do not copy:** the mascot-plus-gradient-blob combination that every seed stage site ships.

---

## Ember - fitness, sport, performance, motorsport

**References:** nike.com, whoop.com, roguefitness.com, formula1.com

**What they do**
- Near black grounds, one hot accent, heavy wide display type at large sizes.
- Motion is tied to scroll and used for reveals, not for constant looping.
- Numbers matter here and are usually real, so they are printed large with units.

**What to copy:** the confidence of a full bleed image with four words over it.

**Do not copy:** the italic-everything, slash-separated, all-caps energy drink register.

---

## Ivory - beauty, wellness, spa, fashion

**References:** aesop.com, glossier.com, byredo.com, thelinehotel.com

**What they do**
- Enormous whitespace, very low density, small type against large images.
- Product photography is neutral and evenly lit. No dramatic shadows.
- Ingredients and rituals are described plainly, in short paragraphs.

**What to copy:** the pacing. Fewer sections, each with a lot of air around it.

**Do not copy:** the warm beige and brass palette. This theme is deliberately cold luxury.

---

## Archive - education, publishing, museums, cultural institutions

**References:** moma.org, tate.org.uk, lrb.co.uk, cooperhewitt.org

**What they do**
- Paper and ink. Serif display, long measure, minimal colour beyond one accent.
- Dense information handled with hierarchy and rules, not with cards.
- Dates, credits and provenance are treated as content, not as metadata clutter.

**What to copy:** the respect for long reading. Measure, leading and hierarchy do the work.

**Do not copy:** scanned paper textures and faux-vintage filters.

---

## Neon - gaming, streaming, music, nightlife

**References:** discord.com, riotgames.com, boilerroom.tv, resident advisor

**What they do**
- Dark violet or near black ground with exactly one electric accent.
- Motion is generous but purposeful: reveals, hovers, scroll-tied transitions.
- Community and schedule information is easy to find, not buried under the art direction.

**What to copy:** the restraint inside the loudness. One accent, not five.

**Do not copy:** glow on every element, angular gamer typefaces, RGB gradients.

---

## Typography per sector

Every face is SIL OFL and self hosted by `next/font/google` at build time, so no
request leaves the visitor's browser for a font CDN. All are loaded with the
`latin-ext` subset because the templates use Turkish copy.

| Theme | Display face | Why this one |
| --- | --- | --- |
| Obsidian | Geist | The grotesque this sector already reads as native |
| Bone | Bricolage Grotesque | Wide and slightly odd, which is what holds up at poster size |
| Forest | Familjen Grotesk | Warm, open apertures, does not compete with product photography |
| Cobalt | Instrument Sans | Neutral and tight, unremarkable in the way a bank should be |
| Clinic | Public Sans | Drawn for US federal services, tested at small sizes, used for body too |
| Terracotta | Cormorant Garamond | A serif earned by a genuinely editorial hospitality brief |
| Slate | Space Grotesk | Squared terminals read technical without a blueprint pastiche |
| Signal | Plus Jakarta Sans | Friendly geometric that survives the heavy weights this sector uses |
| Ember | Archivo | Sturdy and wide, keeps its counters open at 700 |
| Ivory | Jost | Geometric with high contrast counters, the fashion register |
| Archive | EB Garamond | The second serif, deliberately different from Terracotta |
| Neon | Sora | Techy geometric without the angular gamer cliche |

Two mechanisms keep this honest:

- `--pk-display-scale` corrects optical size per face. Cormorant runs at 1.14 because
  a small x-height reads smaller at the same pixel size, Public Sans at 0.96 because
  its x-height is tall. Headings never guess their own font-size to compensate.
- `ThemeScope` re-applies `font-sans`, because `<body>` sits outside the themed
  subtree and would otherwise keep the default body face.

### Using a licensed retail face

Faces like Söhne, GT Walsheim, ABC Diatype or PP Editorial New are commercial. They
cannot be committed to this repository. To use one:

1. Buy the web licence and download the woff2 files.
2. Put them outside version control, or in `src/fonts/` if the licence permits.
3. Load with `next/font/local` in `src/app/layout.tsx`, exposing a CSS variable.
4. Point the theme's `--pk-font-display` at that variable in `src/design/themes.css`.

Nothing else changes: the components read the token, not the font.

## Open source this kit builds on

| Piece | Source | Why |
| --- | --- | --- |
| Utility layer | Tailwind CSS v4 | Token bridge via `@theme inline` |
| Motion | `motion` (`motion/react`) | Reduced motion support, motion values off the render path |
| Icons | `@phosphor-icons/react` | One family, consistent weights, tree shaken via `/dist/ssr` |
| Brand marks | Simple Icons CDN | Real logos for social proof, tinted per theme |
| Variants | `class-variance-authority` | Typed component variants without a runtime CSS lib |
| Class merge | `clsx` + `tailwind-merge` | Predictable override order |
| Placeholder photos | picsum.photos seeds | Deterministic per seed, swap for real assets before launch |

Licences, so you know what you can ship commercially:

| Package | Licence |
| --- | --- |
| Next.js, React | MIT |
| Tailwind CSS | MIT |
| Radix UI primitives | MIT |
| Motion | MIT |
| Phosphor Icons | MIT |
| clsx, tailwind-merge, class-variance-authority | MIT |
| Simple Icons (brand marks) | CC0, but the trademarks themselves are not |
| Every font in this kit | SIL Open Font Licence |

All of it is usable in commercial client work. The one caveat is Simple Icons:
the SVG files are CC0, the logos they depict remain the property of their owners,
so only show a brand you actually have permission to name.

Optional additions when a project needs them: `@radix-ui/react-*` primitives for
dialogs, popovers and menus; shadcn/ui if the client wants owned component source;
GSAP with ScrollTrigger only when a page genuinely needs pinning or scrubbing.
