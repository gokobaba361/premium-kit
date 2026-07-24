# Premium Kit — Development Handoff

Last updated: 2026-07-24
Current milestone: Phase 4 at 10 of 18 sector kits — every kit that the existing block library
already covers is written
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
- 10 of the 18 planned sector site kits, each with its route tree, content model, structured-data
  types, forms, legal surfaces and operational states (EN + TR detail pages, plus
  `/r/site-kits.json`)
- 273 statically generated documentation/product pages
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
- site kit reference audit: 10 kits, 0 broken references, 0 missing Turkish entries
- theme contrast audit: 0 pairs below WCAG AA
- production build: 273/273 static pages, dynamic registry and preview endpoints
- clean `src` and non-`src` consumer fixtures: install, typecheck and build pass
- site kits verified in the browser: all 6 new kits return 200 in EN and TR, the index lists 10
  cards, every outbound link from the new kits was checked by HTTP (22 distinct skeleton, block and
  template routes, all 200), the TR pages resolve block names into Turkish and show the sector's
  Turkish legal surfaces, `/r/site-kits.json` returns 10 kits, no horizontal page scroll, clean
  console on a fresh tab
- admin flow (previous batch) still verified end to end

## 6. Completed in the latest batch

Wrote the 6 sector kits that the existing block library already covers completely, taking Phase 4
from 4 to 10 of 18. No new blocks were needed, which was the selection rule for this batch. (The
previous batch, the kit layer itself plus the first 4 kits, is in git history.)

**The six kits**

- `agency-studio` (6 routes) and `freelancer-portfolio` (5): both on `studio-portfolio`, but they
  are genuinely different sites. The agency kit qualifies an enquiry with a budget band and has a
  case-study route; the freelancer kit carries an availability field that drives a banner, and its
  project model records **role**, because on a one-person site what you did matters more than what
  the team did.
- `professional-service` (6): consulting and regulated advice. Uses the booking blocks for the first
  consultation, and its content model notes that a regulated profession must state its real chamber
  or bar registration rather than decorate it.
- `publication-newsletter` (7): the content flow as a whole publication, with an archive, topic
  pages and a real newsletter route.
- `developer-docs` (6): documentation with `appliesToVersion` in the content model, which is what
  stops a doc site silently describing a release nobody runs.
- `event-conference` (7): consumes the event flow shipped two batches ago end to end
  (`ticket-tiers` → `registration-form` → `registration-confirmation`).

**Two Turkey-specific findings while writing them**

- Writing the publication kit surfaced **İYS (İleti Yönetim Sistemi)**: commercial email or SMS to
  recipients in Türkiye needs consent registered there, with an opt-out in every message. That
  applies to any kit with a newsletter, so the existing `ecommerce-store` kit was missing it too and
  has been corrected. Both now carry a `/ileti-izni` legal surface.
- The publication kit also carries an editorial-standards page covering funding, corrections and
  sponsored-content labelling. That one is stated as a credibility obligation, not a legal one.

**Two real defects caught in-flight**

1. The kits were first appended with `siteKits.push(...)`. That compiles and renders fine, but
   `kit-audit.mjs` reads the `siteKits` **array literal** through the TypeScript AST, so it would
   have silently kept auditing only the original 4 and reported "OK" while 6 kits went unchecked.
   Fixed by folding them into the array literal; the audit then correctly reported 10.
2. A missing Turkish entry would crash the TR index (`siteKitTr[kit.slug].sector` on undefined) and
   404 the TR detail page, and nothing caught it — the i18n audit covers registry items, not kits.
   `kit-audit.mjs` now also fails on a missing or empty Turkish field and warns on a stale entry.
   Verified by deleting a translation: it failed with the right message, then passed once restored.

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

**Phase 4 is at 10 of 18.** Every kit the existing block library already covered is written, so the
easy half is done and the remaining 8 are a different shape: each one needs at least one block the
library does not have. The next batch is therefore **blocks first, then the kits that use them**,
never a kit referencing a slug that does not exist yet.

Remaining 8, grouped by the block they need:

- **Education and online course** — a curriculum/module list (nested lessons with duration and a
  completion state) and a lesson player shell. `steps-flow` is not a substitute; a curriculum is
  hierarchical and stateful.
- **Non-profit and donation** — a donation form with amount tiers, one-off versus monthly, and a
  gift-aid-style consent. Money in integer minor units like everywhere else. Turkish charities
  collecting donations online have their own permit rules worth stating in the legal surfaces.
- **Real estate and architecture** — a property listing card and a property detail (specs, floor
  plan, location map) plus a viewing-request form. `product-grid` is close but a property has
  different facts and no cart.
- **Hotel and travel** — a room type card and a date-range availability search. The existing
  `availability-calendar` is single-date; a stay needs check-in and check-out, which is a real
  extension rather than a new block.
- **Legal and financial service** — mostly covered by `professional-service`, but regulated
  disclosure surfaces differ enough to be worth their own kit once written.
- **Creator and personal brand** — a link-hub block and a membership/subscription tier block.
- **Marketplace and community** — a seller/member profile and a listing index with facets.
- **Dashboard and internal tool** — largely covered by the admin flow; needs a kit write-up rather
  than new blocks, so it can be done at any time.

Suggested order: `dashboard-internal` first (no new blocks), then education, non-profit, real
estate, the rest.

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
