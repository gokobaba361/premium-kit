# Premium Kit — Development Handoff

Last updated: 2026-09-10
Current milestone: Phase 4 at 12 of 18 sector kits — the first blocks-then-kit batch is done
(`dashboard-internal`, then `curriculum-list` + `lesson-shell` and the `education-course` kit)
Project path: `C:\Users\TC-ICT\Projects\premium-kit`
Local URL: `http://localhost:3000`
GitHub: `https://github.com/gokobaba361/premium-kit` (private)

## 1. Product state

Premium Kit is a Turkish-first, source-owned website production system for people and AI coding
agents. A user starts with a business brief, chooses a site skeleton and complete visual system,
then installs editable blocks and primitives through a shadcn-compatible registry. Turkish and
English human routes and machine-readable AI routes describe the same source of truth.

Validated inventory:

- 87 registry items
- 60 full-page blocks
- 15 grouped primitive families
- 6 user-facing motion components plus one shared motion foundation
- 12 visual themes, each with a full worked `/templates/<theme>` page
- 10 purpose-led site skeletons, each with a live assembled preview (EN + TR detail pages)
- 12 of the 18 planned sector site kits, each with its route tree, content model, structured-data
  types, forms, legal surfaces and operational states (EN + TR detail pages, plus
  `/r/site-kits.json`)
- 281 statically generated documentation/product pages
- Dynamic `/r/<slug>.json` and `/r/registry.json` endpoints
- Turkish catalogue coverage: 87/87
- Five assembled demo flows: `/demo/commerce`, `/demo/content`, `/demo/booking`, `/demo/event` and
  `/demo/admin`
- Every catalogue block is viewable: 31 have a boxed preview, 45 whole-page blocks render in a
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

`scripts/registry-audit.mjs` checks all 87 entries for:

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
- registry installation audit: 87/87, no errors
- Turkish coverage: 87/87
- site kit reference audit: 12 kits, 0 broken references, 0 missing Turkish entries
- theme contrast audit: 0 pairs below WCAG AA
- production build: 281/281 static pages, dynamic registry and preview endpoints
- clean `src` and non-`src` consumer fixtures: install, typecheck and build pass
- verified in the browser: both new kits return 200 in EN and TR and the index lists 12 cards; the
  TR pages resolve the new block names into Turkish (`Müfredat listesi`, `Ders çerçevesi`) and show
  each sector's Turkish legal surfaces; every outbound link from the two kits was checked by HTTP
  (35 distinct component, skeleton and template routes, all 200); `/r/site-kits.json` returns 12
  kits and `/r/lesson-shell.json` resolves `button`, `tabs` and `premium-kit-base` as full URLs
- both new blocks verified in the framed viewer: `curriculum-list` shows the derived total
  (2h 41m), per-module counts, the progress bar at 31%, the in-progress badge and the
  module-complete line, and a module containing an in-progress lesson opens even under
  `defaultOpen="first"`; `lesson-shell` switches tabs and renders the resources panel; no
  horizontal scroll at 375px on either; both checked on a light theme (`ivory`) as well as the
  dark default; clean console

## 6. Completed in the latest batch

The first batch under the blocks-then-kits rule, taking Phase 4 from 10 to 12 of 18.

**`dashboard-internal` (11 routes, 9 core)** — the one remaining kit that needed no new blocks,
because the admin flow already ships `resource-table`, `record-form`, `confirm-dialog`, `audit-log`
and `settings-form`. It is not a marketing site with a login bolted on, and the write-up says so:
it is the only kit here that emits **no JSON-LD on any route**, because an authenticated tool has to
be noindex rather than indexed well. Its legal block is deliberately not `baseLegal`: staff are data
subjects through the employment relationship, which a visitor-facing aydınlatma metni does not
cover, so it carries a çalışan-and-user aydınlatma metni, a **saklama ve imha politikası** (the
document that actually decides how long the audit log may be kept, and the reason `retentionDays`
is a setting rather than a guess), an internal acceptable-use page, and a cookie policy whose note
records that a session-only cookie needs no consent banner but staff analytics does. `/kurulum` is
a required route rather than a later one: an empty workspace with nobody invited is the state every
internal tool forgets to build.

**`curriculum-list` and `lesson-shell`** — the two blocks the education kit needed.

- `curriculum-list` is server-rendered on native `details`/`summary`, so it expands with no
  JavaScript, is keyboard operable for free and stays findable by find-in-page while collapsed.
  One `enrolled` flag makes it serve two pages: `false` is the sales page (free previews
  advertised, the rest locked, no progress claimed), `true` is the signed-in page (completion
  ticks, progress bar). A module holding an in-progress lesson opens regardless of `defaultOpen`,
  because the point of the page is to resume. Access and progress are one field (`locked` sits
  beside `not-started`/`in-progress`/`complete`) so a caller cannot describe a lesson that is both
  locked and half finished.
- `lesson-shell` owns no video vendor and no progress store: the player arrives through `media`,
  the curriculum through `aside`, and completion is controlled by the page the way every other
  selection block here is controlled. Transcript and resources are tabs rather than an accordion,
  and both **state their empty case instead of dropping the tab** — a silently absent tab reads as
  a bug, and a missing transcript is information.

**`education-course` (9 routes, 7 core)** — curriculum above the price, because the curriculum is
what a buyer is actually evaluating. The lesson route is behind enrolment and therefore emits no
structured data. Its content model separates `Lesson progress` into its own entity to make the rule
explicit: progress lives in the learner's record and the two new blocks are handed it, never derive
it. Certificates may only be issued against completed progress and must carry a verifiable URL.

**One Turkey-specific finding worth carrying forward**

An online course is distance selling, so `mesafeli satış sözleşmesi` and `ön bilgilendirme formu`
were expected. The one that matters more is **cayma hakkı**: digital content delivered immediately
loses the fourteen-day withdrawal right *only* where the buyer consented in advance and
acknowledged losing it. If the checkout never captured that acknowledgement, the right survives —
so the kit puts the acknowledgement in the checkout form's `collects` and requires it to be stored
with the order, not merely displayed. That is a general lesson, now recorded in `PLAN.md`: a kit
that names an obligation without naming the control that satisfies it has not finished the job.
`/sertifika-hakkinda` follows the publication kit's precedent of a credibility obligation rather
than a legal one — if the certificate is not an officially recognised qualification, the page has
to say so before someone buys expecting one.

**A stale document corrected**

`PLAN.md` section 3 ("Current baseline") had been carrying figures from an earlier phase — 73
items, 47 blocks, 190 pages — while its date was refreshed each batch. It now holds the real count
and is expected to stay in step with section 1 of this file.

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

**Phase 4 is at 12 of 18.** The pattern is settled: write the block, then the kit that consumes it,
never a kit referencing a slug that does not exist yet. Six kits remain and each needs at least one
new block.

Remaining 6, grouped by the block they need:

- **Non-profit and donation** — a donation form with amount tiers, one-off versus monthly, and a
  gift-aid-style consent. Money in integer minor units like everywhere else. Turkish charities
  collecting donations online have their own permit rules (bağış toplama izni) worth stating in the
  legal surfaces, and a monthly donation is a recurring authorisation, which is a different consent
  from a single payment. **Suggested next**, because the block is small and the flow is short.
- **Real estate and architecture** — a property listing card and a property detail (specs, floor
  plan, location map) plus a viewing-request form. `product-grid` is close but a property has
  different facts and no cart.
- **Hotel and travel** — a room type card and a date-range availability search. The existing
  `availability-calendar` is single-date; a stay needs check-in and check-out, which is a real
  extension of that block rather than a new one. Read it before writing: the month-change reset is
  handled in the change handler, not in an effect, and that has to stay true.
- **Creator and personal brand** — a link-hub block and a membership/subscription tier block. The
  membership tiers are close to `ticket-tiers` and `pricing-duo`; check both before writing a third
  price ladder, and if one of them stretches honestly, stretch it instead.
- **Marketplace and community** — a seller/member profile and a listing index with facets.
  `content-index` and `filter-toolbar` cover part of the faceted list already.
- **Legal and financial service** — mostly covered by `professional-service`, but regulated
  disclosure surfaces differ enough to be worth their own kit. Needs no new block, so it is the
  cheap one to slot in whenever a batch has room.

Suggested order: non-profit, real estate, hotel, then creator, marketplace and legal-financial.

Two conventions this batch confirmed and worth reusing:

- A block that has both a public and a signed-in life should take a flag rather than fork into two
  blocks (`curriculum-list`'s `enrolled`). The sales page and the dashboard then cannot drift.
- A stateful block never owns the state. It is handed progress, selection or completion and hands
  back an event; the page persists it. `curriculum-list`, `lesson-shell`, `ticket-tiers` and
  `service-picker` all follow this.

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
