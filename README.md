# Premium Kit

Premium Kit is a Turkish-first, source-owned website production system for people and AI coding
agents. It combines design tokens, sector-calibrated themes, accessible components, full-page
blocks and purpose-led site recipes.

The goal is not to generate another generic component page. The goal is to move from a real
business brief to a deliberate sitemap, visual direction and maintainable website while keeping
the delivered source code editable and owned by the user.

## Current scope

- 72 installable registry items
- 46 full-page blocks
- 14 grouped primitive families
- 6 motion components
- 12 sector-calibrated visual themes
- 10 purpose-led site skeletons
- Turkish and English catalogue routes
- AI brief-to-production-prompt workflow
- Machine-readable metadata v2, recipes and agent guides
- Build-time Shiki source highlighting
- Build-time TypeScript AST prop documentation
- Automated WCAG AA theme contrast audit
- Portable shadcn installation for projects with or without a `src/` directory
- Real clean-consumer installation, typecheck and production-build fixtures

## Start locally

```bash
npm install
npm run dev
```

Open:

- Turkish catalogue: `http://localhost:3000/tr`
- AI site builder: `http://localhost:3000/tr/yapay-zeka`
- Components: `http://localhost:3000/tr/bilesenler`
- Blocks: `http://localhost:3000/tr/bloklar`
- Site skeletons: `http://localhost:3000/tr/iskeletler`

## Human-facing routes

| English | Turkish | Purpose |
| --- | --- | --- |
| `/` | `/tr` | Product and visual-theme entry |
| `/components` | `/tr/bilesenler` | Searchable registry catalogue |
| `/blocks` | `/tr/bloklar` | Full-page block inventory |
| `/skeletons` | `/tr/iskeletler` | Purpose-led site recipes |
| `/sources` | `/tr/kaynaklar` | Open-source research and provenance |
| `/ai` | `/tr/yapay-zeka` | Brief-to-production-prompt workflow |

## Machine-facing routes

| Route | Purpose |
| --- | --- |
| `/r/registry.json` | Shadcn-compatible registry index |
| `/r/<name>.json` | Installable item source and dependencies |
| `/r/catalog.json` | Premium Kit metadata v2 discovery layer |
| `/r/site-recipes.json` | Ordered site skeletons |
| `/r/ai-manifest.json` | Workflow, themes, endpoints and quality gates |
| `/r/AI-GUIDE.md` | Portable English agent contract |
| `/r/AI-GUIDE.tr.md` | Portable Turkish agent contract |
| `/r/SITE-BRIEF.md` | English discovery template |
| `/r/SITE-BRIEF.tr.md` | Turkish discovery template |

## Installing a registry item

When the catalogue is deployed:

```bash
npx shadcn@latest add https://your-domain.example/r/command-palette.json
```

The CLI writes source through shadcn's portable `@components` and `@lib` targets, installs npm
packages and follows full Premium Kit dependency URLs. Every non-theme item automatically installs
`premium-kit-base`, which owns the token contract, all 12 themes, shared global styles, `cn` and
layout primitives. This works in projects both with and without a `src/` directory.

Source shown in the documentation is read from the shipping file at build time, so documentation
cannot silently drift from implementation.

## How the system is organised

```text
src/
  app/                    English, Turkish and registry routes
  components/
    blocks/               Full-page sections
    motion/               Reduced-motion-safe effects
    primitives/           Interaction and content foundations
    site/                 Catalogue and AI workflow UI
  design/
    base.css              Tailwind bridge, global rules, prose and motion CSS
    tokens.css            Shared design-token contract
    themes.css            Twelve complete theme implementations
  lib/premium-kit/
    presets.ts            Theme rationale, sectors and design dials
  registry/
    registry.ts           Installable item source of truth
    registry-output.ts    Portable shadcn payload and dependency URLs
    registry-css.ts       Canonical CSS to shadcn CSS/cssVars conversion
    registry-tr.ts        Turkish catalogue copy
    registry-metadata.ts  AI-oriented metadata v2
    skeletons.ts          Purpose-led page recipes
    site-planning.ts      Brief schema, prompts and quality gates
    props.ts              Build-time TypeScript AST extraction
    source.ts             Build-time source loading
scripts/
  contrast-audit.mjs      WCAG AA audit across every theme
  registry-audit.mjs      Full local-import, CSS and dependency-graph audit
  consumer-install-test.mjs  Clean src/non-src shadcn install fixtures
```

## Project memory

Development is guided by two required files:

- [`PLAN.md`](./PLAN.md) — north star, architecture, roadmap and definition of done.
- [`HANDOFF.md`](./HANDOFF.md) — validated state, fixed decisions and exact next work.

Every coherent development batch must begin by reading both files and end by updating both files.

## Validation

```bash
npm run lint
npm run typecheck
npm run audit
npm run build
npm run test:consumer-registry
```

A registry item is not stable until its dependencies, Turkish copy, accessibility behaviour,
responsive layout and machine-readable metadata are complete.

## Contributing

Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before proposing a change. External code may only be
adapted after its licence and provenance are recorded.

## Licence

Premium Kit is available under the [MIT licence](./LICENSE). Third-party names and research links
remain the property of their respective owners.
