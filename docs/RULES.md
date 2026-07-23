# House rules

The rules the blocks already enforce, plus the ones you have to hold yourself.
These exist so a page built from this kit does not read as generated.

## Enforced by the code

- **One theme per page.** `ThemeScope` wraps the whole page. Sections never invert.
- **One accent per theme.** Components read `--pk-accent`. There is no second accent.
- **One radius system per theme.** `rounded-pk` everywhere, value comes from the theme.
- **CTA labels never wrap.** Buttons are `whitespace-nowrap` by construction.
- **Button contrast is paired.** Accent background always ships accent foreground.
- **Motion degrades.** `Reveal` returns static output under `prefers-reduced-motion`,
  and `--pk-dur` collapses to 1ms.
- **Grids have exact cell counts.** `FeatureBento` renders what you pass, so an empty
  tile cannot appear.
- **Quotes stay short.** `ProofQuote` takes one quote and requires name plus role.
- **Sections have no eyebrows.** `SectionHead` has no eyebrow slot on purpose.
- **Steps are named, not numbered.** `StepsFlow` takes verb titles and offers no
  "Step 1 / Phase 02" label.
- **Specs are grouped.** `SpecGrouped` caps at 3 clusters of 4 rows with one rule per
  cluster, so a hairline-per-row table cannot happen.
- **Forms label above the input.** `ContactForm` has no placeholder-as-label path, and
  ships idle, sending, error and success states.
- **Low motion presets are static.** Wrap the page in `StaticMotion` and every `Reveal`
  inside renders without animation, regardless of the visitor's system setting.
- **Fields wire themselves.** `Field` generates the id and the `aria-describedby`, and the
  control reads them from context, so a label without a `for` cannot ship.
- **Stats need a source.** `Stat` requires the `source` prop, so an invented number cannot
  be rendered.
- **Icon buttons carry a name.** `IconButton` requires `label`, which becomes `aria-label`.
- **Zigzag is capped.** `FeaturesSplit` slices its input at two rows.
- **Toasts are transient only.** Anything requiring action renders inline via `Alert`.

## Yours to hold

- **Hero fits the first viewport.** Headline two lines, subtext twenty words maximum,
  CTA visible without scrolling.
- **Four text elements in the hero, maximum.** No tagline under the CTAs, no trust
  micro-strip, no pricing teaser. Those are sections.
- **One CTA intent per page.** If the hero says "Start free", the nav and the closing
  band say "Start free". Not "Get started", not "Try it".
- **Layout families do not repeat.** Eight sections need at least four different
  layouts. Never three consecutive image-and-text splits.
- **No em dash anywhere in visible copy.** Use a period, a comma or a hyphen.
- **Numbers are real or absent.** No invented precision like "4.1x faster".
- **Names are real sounding and locale appropriate.** No Acme, no John Doe.
- **Images are real.** Generated, licensed or seeded placeholders. Never a fake product
  UI built out of divs.
- **Logo walls carry logos only.** No category label under each mark.

## Pre-launch checklist

```
[ ] Hero fits 1440x900 without scrolling
[ ] Nav is one line at 1024px and 80px tall or less
[ ] Every CTA label is identical for the same intent
[ ] Zero em dashes in visible copy
[ ] Contrast checked on accent buttons and muted body text
[ ] Page tested with prefers-reduced-motion enabled
[ ] Real images swapped in for every picsum seed
[ ] Metadata: title, description, opengraph image
[ ] Lighthouse: LCP under 2.5s, CLS under 0.1
```
