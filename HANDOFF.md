# Premium Kit — Development Handoff

Last updated: 2026-07-24
Current milestone: Phase 3 content flow complete
Project path: `C:\Users\TC-ICT\projects\premium-kit`
Local URL: `http://localhost:3000`
GitHub: `https://github.com/gokobaba361/premium-kit` (private)

## 1. Product state

Premium Kit is a Turkish-first, source-owned website production system for people and AI coding
agents. A user starts with a business brief, chooses a site skeleton and complete visual system,
then installs editable blocks and primitives through a shadcn-compatible registry. Turkish and
English human routes and machine-readable AI routes describe the same source of truth.

Validated inventory:

- 73 registry items
- 47 full-page blocks
- 14 grouped primitive families
- 6 user-facing motion components plus one shared motion foundation
- 12 visual themes and 10 purpose-led site skeletons
- 190 statically generated documentation/product pages
- Dynamic `/r/<slug>.json` and `/r/registry.json` endpoints
- Turkish catalogue coverage: 73/73

## 2. Fixed architecture

Preserve these decisions:

1. Next.js App Router, Server Components by default.
2. Read the matching local guide under `node_modules/next/dist/docs/` before editing Next.js
   behavior; the installed version is `16.2.11`.
3. Turkish is implemented as real `/tr` routes, not a client-only translation layer.
4. Shiki highlighting runs at build time and sends no highlighter JavaScript.
5. Props tables are derived from TypeScript AST syntax at build time.
6. Registry source is copied into the consumer; there is no opaque Premium Kit runtime package.
7. External code needs compatible licensing and recorded provenance before adaptation.
8. Themes change typography, density, shape, imagery and motion—not only color.
9. Never invent customer proof, metrics, logos or testimonials.

## 3. Registry distribution contract

The registry is now a tested installation graph:

- `premium-kit-base` owns `tokens.css`, `themes.css`, `base.css`, `cn.ts` and `layout.tsx`.
- Every non-theme item receives `premium-kit-base` automatically.
- `motion-foundation` owns `Reveal` and `MotionScope`; all 19 reveal-based blocks declare it.
- Premium Kit registry dependencies leave the server as full `/r/<slug>.json` URLs. A bare
  `button`, `form` or `data` can therefore never resolve to shadcn's built-in item by accident.
- File targets use shadcn's portable `@components/` and `@lib/` placeholders.
- Canonical CSS is parsed at request time. Normal rules use the registry `css` field and Tailwind
  v4 `@theme inline` declarations use `cssVars.theme`.
- Registry routes are dynamic because their dependency URLs must use the actual request origin.
- `next.config.ts` narrowly includes registry source and CSS in `/r/*` server traces so dynamic
  endpoints also work in packaged/serverless deployments.
- `src/lib/premium-kit/presets.ts` is the installable preset source;
  `src/design/presets.ts` remains a compatibility re-export inside the catalogue app.

Primary files:

- `src/registry/registry.ts` — item source of truth and dependency closure
- `src/registry/registry-output.ts` — shadcn types, targets and full dependency URLs
- `src/registry/registry-css.ts` — PostCSS conversion to `css` and `cssVars`
- `src/design/base.css` — shared Tailwind bridge, global rules, prose and keyframes
- `src/app/r/[slug]/route.ts` — individual install endpoint
- `src/app/r/registry.json/route.ts` — registry discovery endpoint

## 4. Quality automation

`scripts/registry-audit.mjs` checks all 73 entries for:

- missing published files and CSS files
- invalid or cyclic registry dependencies
- unresolved `@/` and relative imports
- local imports not supplied by the item, base or a declared registry dependency
- undeclared npm imports
- unsupported non-portable output paths
- missing base token, Tailwind bridge and `.pk-prose` contracts
- accidental loss of full Premium Kit dependency URL generation
- missing runtime source globs in the dynamic registry route's output trace

`scripts/consumer-install-test.mjs` starts the production registry and uses real
`shadcn@4.14.1` to install representative items into two temporary Next.js 16.2.11 projects:

- one with `src/`
- one without `src/`

The fixture installs `button`, `hero-split`, `content-index`, `article-layout` and
`checkout-form`, which exercises base CSS, direct and transitive registry dependencies, client
filtering, motion helpers, prose and a complex commerce block. Both fixtures verify installed
paths and CSS markers, then run TypeScript and a production Next.js build. Successful fixtures
are deleted; failed fixtures are preserved and their path is printed.

CI runs lint, typecheck, all audits, the production build and this consumer test.

## 5. Current validation

Run from the repository root:

```powershell
npm run lint
npm run typecheck
npm run audit
npm run build
npm run test:consumer-registry
```

Latest local result:

- lint: clean
- typecheck: clean
- registry installation audit: 73/73, no errors
- Turkish coverage: 73/73
- theme contrast audit: 0 pairs below WCAG AA
- production build: 190/190 static pages, dynamic registry endpoints
- dynamic registry trace: shared CSS and representative block/primitive source included
- clean `src` fixture: install, typecheck and build pass
- clean non-`src` fixture: install, typecheck and build pass

## 6. Completed in the latest batch

- Added `content-index`, a filterable editorial category/index block with realistic article data.
- Kept the data model aligned with existing content blocks: title, excerpt, href, category, ISO
  date and localised reading time.
- Added explicit active-filter state, result count, a real empty category state and reset action.
- Used native buttons, `aria-pressed`, `aria-controls` and a polite atomic status announcement.
- Added configurable labels plus `Intl.DateTimeFormat` locale support with stable UTC date-only
  formatting.
- Added English and Turkish registry copy, metadata v2 tags/guidance and a live preview.
- Kept the item dependency-free beyond the automatic `premium-kit-base` registry foundation.
- Added `content-index` to both clean consumer fixtures and verified `src` and non-`src`
  installation, TypeScript and production builds.
- Verified long content, 375px mobile wrapping, no horizontal overflow and a clean browser error
  log.

## 7. Research decision and non-blocking quality work

The architecture review confirmed that Premium Kit should remain focused on producing real
customer websites faster and with more consistent quality. Large general-purpose agent
frameworks and agent runtime/orchestration layers were rejected for the core.

Three small additions are recorded under Phase 6:

- `premium-kit-site-build` as the only Agent Skills v0 skill
- a report-only Design Review v0 that separates deterministic checks from subjective visual
  evaluation
- a real-project learning loop that promotes repeated problems into skill, rule, registry-item
  or test candidates only after evidence from at least two customer projects

Agent Skills v0 and Design Review v0 are non-blocking quality work. They must not delay the
content or booking flow. Office document automation, repository graphs, multi-agent/worktree
infrastructure and customer opportunity analysis remain conditional future decision gates, not
current implementation tasks.

## 8. Exact next batch

After this batch is committed, pushed and green in CI:

1. Optionally assemble `/demo/content` from blog-grid, content-index, article-layout,
   search-results and newsletter-signup.
2. Then begin the booking flow: service → staff/location → calendar → confirmation.

Before that next implementation, re-read `PLAN.md`, this file and relevant local Next.js docs.

## 9. Source-control protocol

- Keep `main` in a validated state.
- One coherent batch, one descriptive commit.
- Update `PLAN.md` and `HANDOFF.md` in the same commit.
- Inspect the full diff before committing.
- Never commit `.env`, caches, `.next`, temporary fixtures or credentials.
- Push only after local checks pass, then verify the GitHub Actions run reaches success.
