# Premium Kit — Development Handoff

Last updated: 2026-07-24
Current milestone: Every block is now visible in a framed, themeable preview
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
- 197 statically generated documentation/product pages
- Dynamic `/r/<slug>.json` and `/r/registry.json` endpoints
- Turkish catalogue coverage: 73/73
- Two assembled demo flows: `/demo/commerce` and `/demo/content`
- Every catalogue block is now viewable: 31 have a boxed preview, and the 40 whole-page blocks
  render in a framed viewer (`/preview/<slug>`) with a viewport and 12-theme switch

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
- production build: 197/197 static pages, dynamic registry and preview endpoints
- dynamic registry trace: shared CSS and representative block/primitive source included
- clean `src` fixture: install, typecheck and build pass
- clean non-`src` fixture: install, typecheck and build pass
- preview system verified in a production server (not only dev): every `/preview/<slug>` returns
  200 across themes; the desktop frame fills its column with no overflow and no scale transform on
  first paint; tablet and mobile cap and centre; the theme switch reloads the iframe with the new
  `data-theme`; no horizontal scroll inside the frame or on the page

## 6. Completed in the latest batch

Until now, 42 of the 73 registry items showed a paragraph of prose instead of the block, because a
whole-page section cannot sit honestly in a boxed thumbnail. That was the catalogue's biggest gap:
the code was there, but a person or an agent choosing a block could not see it. This batch closes
it. (The previous batch, `/demo/content` plus the count-label and prose fixes, is in git history.)

**The preview system**

- Added `/preview/<slug>`, a bare document (no catalogue chrome, no language switch, no footer) that
  renders one block full width under a chosen theme. `?theme=<id>` selects one of the 12 systems and
  falls back to `obsidian`. Marked `robots: noindex`. Renders per request rather than statically:
  40 blocks across 12 themes is 480 documents, and the catalogue pages linking here are static.
- Added `src/registry/block-examples.tsx`: one canonical, honest example per block. Brands and people
  are fictional, every `source`-bearing stat carries a source, and integration/logo slugs name real
  products being integrated with (a factual list, not borrowed credibility). 40 blocks covered; the
  17 that already had template examples plus these means every whole-page block now has one.
- Added `src/components/site/block-preview.tsx`, the viewer on the detail page: an iframe (so the
  block's own `md:` breakpoints answer to a real viewport, which a scaled `div` cannot do), a quiet
  viewport toggle (desktop / tablet / mobile) and a 12-theme `select`, plus a "new tab" link.
- `LanguageSwitch` now hides itself under `/preview/`, so preview documents carry no catalogue
  chrome.
- The detail page shows the framed viewer for whole-page blocks, the existing boxed preview for the
  31 that have one, and keeps the prose fallback only for anything with neither.

**A real bug, found and fixed in-flight**

- The first viewer scaled a 1280px iframe down to the column with a `ResizeObserver`. It measured on
  mount, and if layout had not settled the width read 0, the effect bailed, and because its
  dependencies never changed again it never retried. The frame stayed at 1:1 and overflowed its box.
  Reproduced in a production server, not only dev. The fix removed the measurement entirely:
  desktop simply fills the column (already a real desktop viewport) and the narrow viewports are
  capped with `min(<w>px, 100%)` and centred. A width that needs no measurement cannot get stuck.

**Verified in a production build (not only dev)**

- Every `/preview/<slug>` returns 200 across themes; all 40 examples render with no runtime error.
- Desktop frame fills its column (1182 of 1184px) with no overflow and no transform on first paint.
- Tablet caps at 768, mobile at 375, both centred and within the column.
- The theme `select` swaps the iframe's `data-theme` live (checked `neon` → dark violet ground).
- No horizontal scroll inside the iframe or on the page; Turkish detail page renders the viewer with
  Turkish chrome.
- Examples audited: zero em-dashes, no generic placeholder names.

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

After this batch is committed, pushed and green in CI, begin the **booking flow**:
service → staff/location → calendar → confirmation.

Expected shape, following the commerce precedent:

1. `service-picker` — selectable services with duration and price in integer minor units.
2. `availability-calendar` — the hard one. A month grid with keyboard navigation, disabled and
   fully-booked days, and an explicit time-zone. Decide early whether slots arrive pre-computed
   from the parent (they should) rather than being derived in the block.
3. `booking-summary` / confirmation, reusing `order-confirmation`'s honesty rules: no invented
   reference numbers beyond the demo's own.
4. A shared booking store if the flow needs live state across blocks, mirroring `cart-store`.
5. Then `/demo/booking` to prove it end to end.

Note for that batch: the count-label pattern (`string | (count) => string`) is the convention for
any new counted surface, and every new whole-page block must get a `block-examples.tsx` entry in the
same commit, so nothing regresses to the prose fallback.

Before starting, re-read `PLAN.md`, this file and the relevant local Next.js docs under
`node_modules/next/dist/docs/`.

### North star (owner's framing, 2026-07-24)

The owner's stated goal: **this site must hold everything a person needs to build a website with
AI.** If something is plausibly needed for AI-assisted site building, it belongs here. Treat that as
the tie-breaker when scoping future batches, and add capabilities proactively rather than waiting to
be asked for each one.

### Backlog raised by the owner (do not lose)

1. **Curate open-source references into the kit.** The owner wants relevant open-source skills,
   skeletons, blocks and effects (high/medium/low priority) pulled in as raw material. This does NOT
   mean bulk-copying repositories. It goes through the existing gate: architecture decision #7 and
   `src/registry/research-sources.ts` — record licence and provenance first, then adapt. Proposed
   process: (a) widen `research-sources.ts` with candidate repos tagged by priority and licence;
   (b) per accepted source, adapt into a registry item or skill with a provenance note; (c) only
   MIT/OFL/permissive, never a copy without attribution. This is a multi-batch workstream.
2. **Fill the remaining preview and template gaps.** `/skeletons` still renders as text with no
   visual; only 6 of 12 themes have a `/templates/<theme>` page. The framed viewer built this batch
   is the tool to close both — a skeleton is just a sequence of blocks, so it can render in the same
   iframe.
3. **Candidate additions the owner has not named but the north star implies** (agent's suggestions,
   confirm before building): a copy-paste "install everything for this site recipe" bundle; an
   `llms.txt` / expanded AI manifest so an agent can enumerate blocks and their example props in one
   fetch; a booking/calendar primitive (overlaps the next batch); an image-and-asset guidance page
   (the kit uses picsum placeholders — an agent needs to be told how to swap real assets in).

## 9. Source-control protocol

- Keep `main` in a validated state.
- One coherent batch, one descriptive commit.
- Update `PLAN.md` and `HANDOFF.md` in the same commit.
- Inspect the full diff before committing.
- Never commit `.env`, caches, `.next`, temporary fixtures or credentials.
- Push only after local checks pass, then verify the GitHub Actions run reaches success.
