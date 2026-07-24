# Premium Kit — Development Handoff

Last updated: 2026-07-24
Current milestone: Booking flow complete and assembled end to end (`/demo/booking`)
Project path: `C:\Users\TC-ICT\projects\premium-kit`
Local URL: `http://localhost:3000`
GitHub: `https://github.com/gokobaba361/premium-kit` (private)

## 1. Product state

Premium Kit is a Turkish-first, source-owned website production system for people and AI coding
agents. A user starts with a business brief, chooses a site skeleton and complete visual system,
then installs editable blocks and primitives through a shadcn-compatible registry. Turkish and
English human routes and machine-readable AI routes describe the same source of truth.

Validated inventory:

- 78 registry items
- 51 full-page blocks
- 15 grouped primitive families
- 6 user-facing motion components plus one shared motion foundation
- 12 visual themes, each with a full worked `/templates/<theme>` page
- 10 purpose-led site skeletons, each with a live assembled preview (EN + TR detail pages)
- 234 statically generated documentation/product pages
- Dynamic `/r/<slug>.json` and `/r/registry.json` endpoints
- Turkish catalogue coverage: 78/78
- Three assembled demo flows: `/demo/commerce`, `/demo/content` and `/demo/booking`
- Every catalogue block is now viewable: 31 have a boxed preview, and the 40 whole-page blocks
  render in a framed viewer (`/preview/<slug>`) with a viewport and 12-theme switch
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
- registry installation audit: 78/78, no errors
- Turkish coverage: 78/78
- theme contrast audit: 0 pairs below WCAG AA
- production build: 234/234 static pages, dynamic registry and preview endpoints
- clean `src` and non-`src` consumer fixtures: install, typecheck and build pass
- booking flow verified end to end in the browser (`/demo/booking`): progressive disclosure reveals
  each step, the calendar shows exactly the open days with an explicit time zone, UTC date maths
  gives the right weekday (2026-08-11 is a Tuesday), arrow keys move between open days skipping
  closed ones, empty confirm shows a validation error, and a valid submit reaches the summary
  (VIRA-xxxx, €90.00, "Tuesday, 11 August 2026, 09:45"); clean console
- all 4 new block previews return 200 and their detail pages render the framed viewer;
  `/preview/booking-store` is 404 by design (a primitive with no visual example, like cart-store)

## 6. Completed in the latest batch

Built the booking flow — the next Phase 3 product flow after commerce and content — following the
commerce precedent exactly (presentational blocks, a shared store, one assembled demo). (The
previous batch, skeleton previews and the 6 templates, is in git history.)

**The booking blocks**

- `service-picker` (block): a radiogroup of services, each with duration and price in integer minor
  units. Presentational; the parent owns the selection.
- `staff-picker` (block): choose a practitioner or location, with avatars and an "any available"
  option for businesses that assign.
- `availability-calendar` (block): the hard one. A month grid where **slots are pre-computed by the
  parent and passed in**, never derived in the block. **All date maths is UTC** so a day never
  shifts across time zones; the passed time zone is a label for the slots, shown explicitly. Arrow
  keys move between open days (roving tabindex, skipping closed days). Navigation is bounded to the
  months that actually contain availability. Selecting a day reveals that day's time slots.
- `booking-summary` (block, server component): the confirmation. Reference, service, practitioner,
  time (in the page locale and the booking's time zone), duration and price. No invented reference
  beyond the one the flow generated, mirroring `order-confirmation`'s honesty rules.
- `booking-store` (primitive): a shared booking read through `useBooking` via `useSyncExternalStore`,
  mirroring `cart-store`. No setState-in-effect, no hydration mismatch.

**The demo**

- `/demo/booking` on the `clinic` theme: a physiotherapy clinic ("Vira Clinic"). Progressive
  disclosure gates each step on the last (service → staff → calendar → a small contact fieldset →
  confirm), all sharing the booking store, ending on the summary. Fictional brand and staff.

**React Compiler notes (for the next batch)**

- This repo runs the React Compiler. Two of its lint rules bit during this batch and are worth
  remembering: it rejects a manual `useMemo`/`useCallback` it cannot preserve (just compute the
  value directly — the compiler memoizes), and it rejects calling `setState` synchronously inside an
  effect. The calendar needed to reset its roving-focus target when the month changes; the fix is
  the React-endorsed "adjust state during render" pattern (compare the previous month in render and
  `setState` there), not an effect.

**Registry wiring**

- All 5 items registered in `registry.ts`, `registry-tr.ts` and `registry-metadata.ts` (client
  items, tags, avoid-when). The 4 whole-page blocks each got a `block-examples.tsx` entry, so they
  show in the framed viewer rather than the prose fallback; `booking-store` has none by design.

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

The booking flow is done. Phase 3 product flows now remaining: **Event** (schedule → speaker →
venue → registration) and **Admin** (list → filter → create → edit → delete → audit). Event is the
smaller of the two and most of its blocks already exist (`event-schedule`, `team-grid` for speakers,
`location-grid` for the venue, `stats-band` for the facts), so the batch is mostly a registration
step plus an assembled `/demo/event`. Admin is larger and leans on the `data`, `feedback` and
`toast` primitives already in the kit.

Either is a valid next step. Alternatively, the owner's backlog (below) — open-source reference
curation, or the AI-manifest / recipe-bundle candidates — advances the north star directly. Confirm
direction with the owner if unsure.

Conventions to carry forward for any batch:
- The count-label pattern (`string | (count) => string`) is the convention for any new counted
  surface.
- Every new whole-page block gets a `block-examples.tsx` entry in the same commit, so nothing
  regresses to the prose fallback.
- Money in integer minor units; dates in UTC with the time zone carried as a label (see
  `availability-calendar`).
- Shared cross-block state uses a module store read via `useSyncExternalStore` (see `cart-store`,
  `booking-store`), never prop-threading or setState-in-effect.
- The React Compiler is on: do not add a manual `useMemo`/`useCallback` it cannot preserve, and
  never `setState` synchronously inside an effect (see the calendar's month-change reset).

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
