# Premium Kit — Development Handoff

Last updated: 2026-07-24
Current milestone: Phase 4 started — the multi-page site kit layer ships with its first 4 sector
kits, in EN, TR and as machine-readable JSON
Project path: `C:\Users\TC-ICT\projects\premium-kit`
Local URL: `http://localhost:3000`
GitHub: `https://github.com/gokobaba361/premium-kit` (private)

## 1. Product state

Premium Kit is a Turkish-first, source-owned website production system for people and AI coding
agents. A user starts with a business brief, chooses a site skeleton and complete visual system,
then installs editable blocks and primitives through a shadcn-compatible registry. Turkish and
English human routes and machine-readable AI routes describe the same source of truth.

Validated inventory:

- 85 registry items
- 58 full-page blocks
- 15 grouped primitive families
- 6 user-facing motion components plus one shared motion foundation
- 12 visual themes, each with a full worked `/templates/<theme>` page
- 10 purpose-led site skeletons, each with a live assembled preview (EN + TR detail pages)
- 4 of the 18 planned sector site kits, each with its route tree, content model, structured-data
  types, forms, legal surfaces and operational states (EN + TR detail pages, plus
  `/r/site-kits.json`)
- 261 statically generated documentation/product pages
- Dynamic `/r/<slug>.json` and `/r/registry.json` endpoints
- Turkish catalogue coverage: 85/85
- Five assembled demo flows: `/demo/commerce`, `/demo/content`, `/demo/booking`, `/demo/event` and
  `/demo/admin`
- Every catalogue block is viewable: 31 have a boxed preview, 43 whole-page blocks render in a
  framed viewer (`/preview/<slug>`) with a viewport and 12-theme switch, and `confirm-dialog` shows
  an honest prose fallback (a controlled dialog cannot be given a static example without crossing
  the server/client boundary)
- Every skeleton renders as an assembled page (`/preview/skeleton/<slug>`), shown in the same
  framed viewer on `/skeletons/<slug>` and `/tr/iskeletler/<slug>`

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

- lint: clean (including the React Compiler rules: no manual useMemo it cannot preserve, no
  setState synchronously inside an effect)
- typecheck: clean
- registry installation audit: 85/85, no errors
- Turkish coverage: 85/85
- site kit reference audit: 4 kits, 0 broken references
- theme contrast audit: 0 pairs below WCAG AA
- production build: 261/261 static pages, dynamic registry and preview endpoints
- clean `src` and non-`src` consumer fixtures: install, typecheck and build pass
- site kits verified in the browser: EN and TR index and detail pages render every section, the
  route table's skeleton and block pills resolve (spot-checked `/skeletons/service-business`,
  `/components/availability-calendar`, `/components/booking-store`, `/templates/clinic` and the TR
  equivalents, all 200), the language switch maps `/kits/<slug>` to `/tr/kitler/<slug>`, the TR page
  resolves block names into Turkish, `/r/site-kits.json` returns the full contract, no horizontal
  page scroll at 1280px or 375px (the wide route table scrolls in its own box), clean console
- admin flow (previous batch) still verified end to end

## 6. Completed in the latest batch

Started Phase 4 by building the layer the sector kits need, then the first 4 kits. (The previous
batch, the admin flow that completed Phase 3, is in git history.)

**What a kit is, and why it is not a skeleton**

A skeleton is one page's section order. A kit is a whole site, which is the thing Phase 4 asks for:
which routes exist and in what build order, which skeleton or registry items drive each route, the
content model behind them, the schema.org type each route emits, what each form collects and where
that data actually goes, the legal surfaces the sector genuinely requires, and the operational
states that must exist before the build is done.

**The data layer**

- `src/registry/site-kits.ts` — the `SiteKit` model plus the first four kits. Routes carry a
  `required` flag, so a kit states its core set and keeps the rest as an explicit backlog rather
  than an implied promise.
- `src/registry/site-kits-tr.ts` — Turkish kit copy, one source shared by the TR index and detail.
- The kits are **Turkey-first in the legal layer**: `KVKK aydınlatma metni` for anything collecting
  personal data, `açık rıza` for the clinic (health data is özel nitelikli kişisel veri and needs
  separate explicit consent), `mesafeli satış sözleşmesi` and `ön bilgilendirme formu` for commerce,
  allergen information for hospitality. Every page in that list says why the sector needs it. Both
  the pages and the JSON state plainly that this is a build checklist, not legal advice.

**The first four kits**

`saas-product` (8 routes), `clinic-healthcare` (6), `ecommerce-store` (8), `restaurant-hospitality`
(5). They deliberately consume the Phase 3 flows: the clinic kit's `/randevu` route is built from
the booking blocks, the commerce kit's checkout path from the commerce blocks.

**Surfaces**

- `/kits` and `/kits/<slug>` (EN), `/tr/kitler` and `/tr/kitler/<slug>` (TR). The detail page renders
  the route table (each route linking to its skeleton and registry items), content model, forms with
  their real destinations, legal surfaces and operational states.
- `/r/site-kits.json` — the whole contract for agents, with install URLs resolved per route and per
  form. Registered in the AI manifest's `endpoints` and `inventory`.
- Language switch now maps `/kits/<slug>` and `/skeletons/<slug>` to their TR equivalents (the
  skeleton detail mapping was missing since those pages were added).

**A new audit, because nothing else could catch this**

- `scripts/kit-audit.mjs` (`npm run audit:kits`, wired into `npm run audit` and CI). A kit route
  points at a skeleton slug and registry slugs as plain strings. The registry audit does not see
  kits (they are catalogue data, not installable entries) and TypeScript cannot check a string
  against another file's data, so a rename would silently produce a kit linking nowhere. The audit
  fails on any unknown skeleton slug, registry slug or preset id. Verified by deliberately breaking
  a slug: it exited 1 with the correct message, then passed again once restored.

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

**Phase 4 is under way**: the kit layer ships and 4 of the 18 planned sector kits are written. The
obvious continuation is **the next batch of kits**, since the model, the audit, both language
surfaces and the AI endpoint already exist — adding a kit is now editing one data file and letting
the audit check it.

Remaining 14, roughly in descending order of how well the current block library already covers them
(so the early ones need no new blocks):

- Agency and creative studio, Freelancer and portfolio, Consultant and professional service —
  covered by `studio-portfolio` and the proof/contact blocks.
- Blog/publication/newsletter, Documentation and developer portal — covered by `publication`,
  `documentation-hub` and the content flow.
- Event and conference — covered by the event flow shipped two batches ago.
- Education and online course, Non-profit and donation, Real estate and architecture, Hotel and
  travel, Legal and financial service, Creator and personal brand, Marketplace and community,
  Dashboard and internal tool.

Watch for kits that genuinely need a block the library lacks (a course curriculum list, a donation
form with amount tiers, a property listing card). When that happens, build the block first with a
`block-examples.tsx` entry, then write the kit, so the kit never references a slug that does not
exist.

The alternative remains the owner's backlog below (open-source reference curation, the AI-manifest /
recipe-bundle candidates). Confirm with the owner if unsure.

Conventions to carry forward for any batch:
- A new kit is a `site-kits.ts` entry plus a `site-kits-tr.ts` translation, and `npm run audit:kits`
  must stay green. Kit legal surfaces are stated as sector obligations in Türkiye and always framed
  as a checklist, never as legal advice.
- The count-label pattern (`string | (count) => string`) is the convention for any new counted
  surface.
- Every new whole-page block gets a `block-examples.tsx` entry in the same commit, so nothing
  regresses to the prose fallback — **except** a block whose interactivity is entirely
  callback-driven through a controlled `open`/`onOpenChange` (or similar) prop, like
  `confirm-dialog`. That cannot be given a static example without a server-to-client closure leak,
  which is a real 500 at request time, not a lint or type error. Leave those with the prose
  fallback and exercise them in a demo instead.
- Money in integer minor units; dates in UTC with the time zone carried as a label (see
  `availability-calendar`).
- Shared cross-block state uses a module store read via `useSyncExternalStore` (see `cart-store`,
  `booking-store`), never prop-threading or setState-in-effect. Not every flow needs one: a linear
  flow (see `registration-form` → `registration-confirmation`) can thread state locally in the demo.
- The React Compiler is on: do not add a manual `useMemo`/`useCallback` it cannot preserve, and
  never `setState` synchronously inside an effect (see the calendar's month-change reset, or
  `confirm-dialog`'s reset-on-close in its `onOpenChange` handler instead of an effect).

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
2. ~~Fill the remaining preview and template gaps.~~ **Done this batch:** skeletons render in the
   framed viewer (`/preview/skeleton/<slug>` + EN/TR detail pages) and all 12 themes now have a
   `/templates/<theme>` page.
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
