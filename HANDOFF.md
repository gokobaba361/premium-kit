# Premium Kit — Development Handoff

Last updated: 2026-07-24
Current milestone: Admin flow complete and assembled end to end (`/demo/admin`) — all six Phase 3
product flows now ship
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
- 250 statically generated documentation/product pages
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
- theme contrast audit: 0 pairs below WCAG AA
- production build: 250/250 static pages, dynamic registry and preview endpoints
- clean `src` and non-`src` consumer fixtures: install, typecheck and build pass
- admin flow verified end to end in the browser (`/demo/admin`): list, search and role filter,
  client pagination (7 seed users, page 2 correct), create (toast + audit entry), edit with correct
  prefill, and delete with the type-to-confirm dialog (confirm button disabled until the exact name
  is typed, then enabled; dialog closes, toast fires, audit records it, row is gone); a real 500 was
  found and fixed here (see batch notes below); clean console after the fix
- event flow (previous batch) still verified

## 6. Completed in the latest batch

Built the admin flow — the last of the six Phase 3 product flows (commerce, account, content,
booking, event, admin all now ship). It leans on primitives already in the kit (`data`, `feedback`,
`toast`, `dashboard-shell`) and adds the CRUD blocks and a real destructive-action pattern. (The
previous batch, the event flow, is in git history.)

**The admin blocks**

- `resource-table` (block): an admin list. A table with a status pill column, per-row edit/delete
  icon buttons and client pagination, with a real empty state. Presentational; owns no data. The
  delete button only opens the parent's confirmation, never deletes directly, so a destructive
  action always has a confirm step.
- `record-form` (block): one field-config-driven form for both create and edit. Pass `values` to
  prefill for an edit, omit it for a create, so the two modes cannot drift apart. Required fields
  validate inline; the parent performs the write through `onSubmit`.
- `confirm-dialog` (block): a controlled confirmation for a destructive or irreversible action. For
  the highest-stakes actions, pass `confirmPhrase` to require typing the resource's name before the
  confirm button enables, so a delete is never a reflexive click. Radix handles the focus trap,
  escape and scroll lock.
- `audit-log` (block, server component): a read-only trail — who did what, to what, when — rendered
  from real events with ISO timestamps shown in the page locale. No numbered badges; the rail
  carries the sequence.

**A real bug, found and fixed in-flight**

- The first `confirm-dialog` example in `block-examples.tsx` passed `onOpenChange`/`onConfirm`
  closures as props from the (server) preview route into the (client) block. Next.js correctly
  rejected it at request time: `/preview/confirm-dialog` returned a real 500 ("Event handlers cannot
  be passed to Client Component props"), not a build-time or type error, because a static example
  cannot supply working closures to a controlled dialog without crossing the server/client boundary.
  A controlled, callback-driven overlay is not representable as a static example. Fix: no
  `confirm-dialog` entry in `block-examples.tsx`; its detail page correctly shows the honest prose
  fallback instead. The flow itself is fully exercised in `/demo/admin`.

**The demo**

- `/demo/admin` on the `slate` theme: a fictional team-management page ("Relay Admin"), wrapped in
  `ToastProvider`. Full CRUD: search and role filter, client-paginated list, create, edit with
  prefill, and delete gated by typing the user's exact name. Every write also appends to a local
  audit trail and fires a toast. State is local and in memory; nothing is persisted. Fictional
  people.

**Registry wiring**

- All 4 items registered in `registry.ts`, `registry-tr.ts` and `registry-metadata.ts` (client
  items, tags, avoid-when). `resource-table`, `record-form` and `confirm-dialog` are client;
  `audit-log` is a server component. 3 of the 4 got `block-examples.tsx` entries (`confirm-dialog`
  intentionally does not, see above).

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

**Phase 3 is complete**: commerce, account, content, booking, event and admin all ship as full
flows with an assembled demo each. There is no single mandated "next" flow anymore. Two real
directions:

1. **Phase 4 (sector site kits)** — the roadmap's next phase. Assemble full multi-page kits (SaaS,
   agency, clinic, restaurant, etc.) from the now-complete block library. This is the more natural
   "next phase" per `PLAN.md`.
2. **The owner's backlog** (below) — open-source reference curation, or the AI-manifest /
   recipe-bundle candidates — advances the north star ("everything needed to build a site with AI")
   directly and does not require Phase 4 to start first.

Confirm direction with the owner before starting either; both are legitimate, and neither was
explicitly chosen yet.

Conventions to carry forward for any batch:
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
