# Building a real site with this kit

Two ways to use it. Pick one per client.

## A. Copy the kit, build one site in it

Best when the site is the only thing you are shipping.

```bash
cp -r premium-kit acme-site
cd acme-site
rm -rf src/app/templates src/app/kit src/app/blocks
npm install
npm run dev
```

Then:

1. Pick a preset in `src/design/presets.ts` whose sector and dials match the client.
2. Build `src/app/page.tsx` wrapped in `<ThemeScope theme="cobalt">`.
3. Compose blocks. Never repeat a layout family twice on one page.
4. Replace every `picsum.photos` seed with real photography.
5. Run `npm run audit:contrast` and the checklist in `docs/RULES.md`.

Keep `/kit` while you work if you want the component reference next to the build,
then delete it before launch.

## B. Keep the kit as a library, one repo per client

Best when you are running several client sites off the same system.

Copy these into the new project and leave the rest behind:

```
src/design/          tokens.css, themes.css, presets.ts
src/lib/cn.ts
src/components/      primitives/ and blocks/
src/app/globals.css  the token to Tailwind bridge
scripts/contrast-audit.mjs
```

The font declarations in `src/app/layout.tsx` come too, but trim them to the
faces the chosen theme actually uses. Loading twelve families to ship one theme
is waste, and next/font only self hosts what you import.

## Starting a page

```tsx
import { ThemeScope } from "@/components/primitives/theme-scope";
import { SiteNav } from "@/components/blocks/site-nav";
import { HeroSplit } from "@/components/blocks/hero-split";
import { CtaBand } from "@/components/blocks/cta-band";
import { SiteFooter } from "@/components/blocks/site-footer";

export default function Page() {
  return (
    <ThemeScope theme="slate">
      <SiteNav
        brand="Acme"
        items={[{ label: "Work", href: "#work" }]}
        cta={{ label: "Book a viewing", href: "#book" }}
      />
      <main>
        <HeroSplit
          headline="Four words, maybe five."
          subtext="Twenty words at most, because the hero has to fit the first screen."
          primary={{ label: "Book a viewing", href: "#book" }}
          image={{ src: "/hero.jpg", alt: "Living room with north light" }}
        />
        <CtaBand
          title="Closing line."
          primary={{ label: "Book a viewing", href: "#book" }}
        />
      </main>
      <SiteFooter brand="Acme" blurb="One sentence." groups={[]} />
    </ThemeScope>
  );
}
```

The CTA label repeats on purpose: one intent, one wording, everywhere.

## Using it as a registry, like shadcn

Deploy the kit anywhere (Vercel, a static host, an internal box). Then from any
other project on your machine:

```bash
npx shadcn@latest add https://your-domain.com/r/spotlight-card.json
```

The CLI fetches `/r/<name>.json`, writes the file into that project and installs
the npm dependencies listed in the entry. `/r/registry.json` is the index.

Adding a component to the registry is three steps:

1. Write the component under `src/components/`.
2. Add an entry to `src/registry/registry.ts` with its files, npm dependencies
   and, if it depends on other entries, their slugs.
3. Add a preview to `src/registry/previews.tsx` and its slug to
   `src/registry/preview-slugs.ts`.

The source shown on the page is read from the real file at build time, so a
snippet can never fall out of date with the component it documents. The same is
true of the props table: it is parsed from the component signature, including
JSDoc comments and the defaults in the destructuring pattern, so documenting a
prop means writing a comment above it in the code.

Syntax highlighting runs on the server with Shiki, so the pages ship highlighted
markup and no highlighter. Token colours are keyed to the page theme, not to the
operating system, and the high contrast GitHub themes are used because the
default ones put comment grey below WCAG AA on the code surface.

Before deploying, replace `your-domain.com` in
`src/app/components/[slug]/page.tsx` and `src/app/r/registry.json/route.ts`
with the real host.

## Adding a new sector theme

1. Add a `[data-theme="yourname"]` block to `src/design/themes.css` with the full
   token set. Copy the nearest existing theme and change values, never partially
   override, or the theme inherits the previous one's accent.
2. Register it in `src/design/presets.ts` with dials, display face and references.
3. Run `npm run audit:contrast`. It fails the command if any text pair drops below
   WCAG AA, and prints a corrected hex for each failure.

No component changes are needed. Every block reads tokens.

## Letting visitors switch theme

Only when the theme is genuinely a user preference, for example a light and dark
pair. Otherwise lock one theme per page with `ThemeScope`.

```tsx
// app/layout.tsx
import { ThemeScript, ThemeProvider } from "@/components/primitives/theme-runtime";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ThemeScript defaultTheme="signal" />
      </head>
      <body>
        <ThemeProvider defaultTheme="signal">{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

Then drop `<ThemePicker ids={["signal", "obsidian"]} />` anywhere, usually the
footer. `ThemeScript` applies the stored choice before first paint, so the page
never flashes the default. The theme lands on `documentElement`, which is why
dialogs, selects and toasts inherit it: those render in portals, outside any
`ThemeScope`.

## Swapping in a licensed font

```tsx
import localFont from "next/font/local";

const soehne = localFont({
  src: "./fonts/soehne-buch.woff2",
  variable: "--font-soehne",
});
```

Then point the theme at it in `themes.css`:

```css
[data-theme="yourname"] {
  --pk-font-display: var(--font-soehne), ui-sans-serif, system-ui, sans-serif;
  --pk-display-scale: 1;
}
```

Font files are licensed per project. Do not commit them to a shared repository.

## Commands

```bash
npm run dev              # local development
npm run build            # production build, fails on type errors
npm run lint             # eslint, including the React Compiler rules
npm run audit:contrast   # WCAG AA check across every theme, exits 1 on failure
```
