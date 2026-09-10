# Premium Kit — Development Handoff

Last updated: 2026-09-10
Current milestone: Phase 4 at 13 of 18 sector kits — `donation-form` and the
`nonprofit-donation` kit it unblocks, plus a Checkbox primitive that can now be read from a form
Project path: `C:\Users\TC-ICT\Projects\premium-kit`
Local URL: `http://localhost:3000`
GitHub: `https://github.com/gokobaba361/premium-kit` (private)

## 1. Product state

Premium Kit is a Turkish-first, source-owned website production system for people and AI coding
agents. A user starts with a business brief, chooses a site skeleton and complete visual system,
then installs editable blocks and primitives through a shadcn-compatible registry. Turkish and
English human routes and machine-readable AI routes describe the same source of truth.

Validated inventory:

- 88 registry items
- 61 full-page blocks
- 15 grouped primitive families
- 6 user-facing motion components plus one shared motion foundation
- 12 visual themes, each with a full worked `/templates/<theme>` page
- 10 purpose-led site skeletons, each with a live assembled preview (EN + TR detail pages)
- 13 of the 18 planned sector site kits, each with its route tree, content model, structured-data
  types, forms, legal surfaces and operational states (EN + TR detail pages, plus
  `/r/site-kits.json`)
- 285 statically generated documentation/product pages
- Dynamic `/r/<slug>.json` and `/r/registry.json` endpoints
- Turkish catalogue coverage: 88/88
- Five assembled demo flows: `/demo/commerce`, `/demo/content`, `/demo/booking`, `/demo/event` and
  `/demo/admin`
- Every catalogue block is viewable: 31 have a boxed preview, 46 whole-page blocks render in a
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

`scripts/registry-audit.mjs` checks all 88 entries for:

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
- registry installation audit: 88/88, no errors
- Turkish coverage: 88/88
- site kit reference audit: 13 kits, 0 broken references, 0 missing Turkish entries
- theme contrast audit: 0 pairs below WCAG AA
- production build: 285/285 static pages, dynamic registry and preview endpoints
- clean `src` and non-`src` consumer fixtures: install, typecheck and build pass
- verified in the browser: the kit returns 200 in EN and TR, the index lists 13 cards, every
  outbound link from it was checked by HTTP (21 distinct component, skeleton and template routes,
  all 200), the TR page resolves the new block name into Turkish (`Bağış formu`),
  `/r/site-kits.json` returns 13 kits and `/r/donation-form.json` resolves `button`, `form`,
  `feedback` and `premium-kit-base` as full URLs
- `donation-form` driven end to end in the framed viewer: submitting empty raised exactly the
  expected four errors; switching to one-off swapped the ladder (₺75–₺600 → ₺250–₺2.500), dropped
  the recurring consent and relabelled the button, keeping the tier position; the receipt box
  revealed the ID field and made it required; an "other amount" of ₺10 was rejected against the
  ₺25 minimum; a filled form reached the thanked state. Turkish money formatting (`₺1.000`) is
  correct
- the Checkbox fix verified in the DOM rather than by eye: the three consent boxes render hidden
  inputs carrying `wantsReceipt`, `publicName` and `privacyConsent`, and `new FormData(form)`
  returns `"on"` for a ticked box and nothing for an unticked one — which is what the submit
  handler reads
- clicking the aydınlatma-metni link inside the consent label leaves the box unticked
- no horizontal scroll at 375px; checked on a light theme (`bone`) as well as the dark default;
  no application console errors (only the preview pane's own dev-server HMR socket)

## 6. Completed in the latest batch

`donation-form`, the `nonprofit-donation` kit it unblocks, and a primitive that turned out to be
broken in a way nothing had exercised. Phase 4 is now 13 of 18.

**`donation-form`** — a donation is not a checkout, and three things follow from that.

- **A monthly gift is a recurring authorisation, not a payment.** It carries its own consent,
  separate from the privacy consent, and that consent names the amount, the frequency and how it
  ends: "₺150 every month, until you cancel." The sentence is assembled from the live selection
  rather than written once, so it cannot drift from what is actually being authorised. The consent
  is required only in monthly mode.
- **A receipt is a document, not a thank-you email.** The Turkish bağış makbuzu has to carry the
  donor's ID number, so the block asks for that number only when the donor ticks the receipt box,
  and the field is required only then. Collecting an ID from everyone "just in case" is the
  failure mode this avoids.
- **The two amount ladders are independent.** A monthly ladder is not the one-off ladder divided
  by twelve. Switching frequency re-picks from the other ladder and clamps the index, because the
  ladders are different lengths and a carried-over index lands silently on the wrong amount.

Beyond that: a minimum that is stated up front rather than enforced at the payment step ("card
fees take most of anything smaller"), a commitment line above the submit button that only appears
once the amount is actually giveable, and a "list my name publicly" box whose description says it
affects the public list and not the receipt. No provider, no card fields; `onDonated` hands the
donation on.

**The Checkbox primitive could not participate in a form.** `Checkbox` in `form.tsx` accepted only
`label`, `description`, `defaultChecked`, `indeterminate` and `disabled`. Radix renders its hidden
input only when `name` is set, and `name` was never forwarded — so the box was unreadable from
`FormData` and effectively decorative. Nothing had caught it because the only existing use was the
catalogue's own component gallery, where nothing is submitted. Consent boxes are exactly the
control a submit handler must read, so the wrapper now forwards `name`, `value`, `checked`,
`onCheckedChange`, `required` and an `error` slot matching `Field`, and `label`/`description` widen
to `ReactNode` because a consent label almost always contains a link. Every existing prop keeps its
meaning, so this is additive.

That link needed its own fix: an anchor inside a `<label>` toggles the box on click, so opening the
document you are being asked to read would tick the box saying you had. `ConsentLink` stops the
propagation.

**`nonprofit-donation` (10 routes, 7 core)** — the site earns trust before it asks. Two routes are
core that a donation site usually treats as optional:

- `/seffaflik` — where the money went, reports by year, and who audited them. A Turkish association
  files a dernek beyannamesi anyway, so publishing a summary of it costs nothing and is the
  cheapest trust the site can buy. `auditedBy` stays empty until it is true, because a year that
  quietly says nothing about audit reads as an audited one.
- `/duzenli-bagisim` — the donor portal. The monthly consent promises "until you cancel", so a
  route where cancelling actually happens is part of the promise rather than a nice-to-have. The
  content model stores a mandate with an id the donor can be shown, not a repeating charge record.

`/bagis/tesekkurler` reuses `order-confirmation` rather than adding a block: it already carries a
reference and a what-happens-next list, and the words change while the shape does not.

**The Turkey-specific item most likely to be skipped: yardım toplama izni.** Collecting aid is
permit-based under 2860 sayılı Yardım Toplama Kanunu. Some organisations — a kamu yararına çalışan
dernek, a vergi muafiyeti tanınan vakıf — may be granted the right to collect without a per-campaign
permit; most are not. The kit's legal surface says to state which you are and, where a permit
applies, to publish its number and validity. Whether a fundraising email is a ticari elektronik
ileti is flagged as a question for counsel, with the note that registering the consent in İYS costs
nothing and being wrong the other way costs the list.

This is the second batch in a row where the same rule paid off, and `PLAN.md` now records it twice
over: a kit that names an obligation without naming the control that satisfies it has not finished
the job.

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

**Phase 4 is at 13 of 18.** Block first, then the kit that consumes it. Five kits remain.

Remaining 5, grouped by the block they need:

- **Real estate and architecture** — a property listing card and a property detail (specs, floor
  plan, location map) plus a viewing-request form. `product-grid` is close but a property has
  different facts and no cart. **Suggested next.** Turkey-specific surfaces to check while writing
  it: the taşınmaz ticareti yetki belgesi an estate agency must hold, and the fact that a listing
  price is an invitation rather than an offer.
- **Hotel and travel** — a room type card and a date-range availability search. The existing
  `availability-calendar` is single-date; a stay needs check-in and check-out, which is a real
  extension of that block rather than a new one. Read it before writing: the month-change reset is
  handled in the change handler, not in an effect, and that has to stay true.
- **Creator and personal brand** — a link-hub block and a membership/subscription tier block. The
  membership tiers are close to `ticket-tiers` and `pricing-duo`; check both before writing a third
  price ladder, and if one of them stretches honestly, stretch it instead. A membership is a
  recurring authorisation, so it reuses the consent shape `donation-form` established rather than
  inventing another.
- **Marketplace and community** — a seller/member profile and a listing index with facets.
  `content-index` and `filter-toolbar` cover part of the faceted list already.
- **Legal and financial service** — mostly covered by `professional-service`, but regulated
  disclosure surfaces differ enough to be worth their own kit. Needs no new block, so it is the
  cheap one to slot in whenever a batch has room.

Suggested order: real estate, hotel, creator, then marketplace and legal-financial.

Conventions these batches confirmed and worth reusing:

- A block that has both a public and a signed-in life should take a flag rather than fork into two
  blocks (`curriculum-list`'s `enrolled`). The sales page and the dashboard then cannot drift.
- A stateful block never owns the state. It is handed progress, selection or completion and hands
  back an event; the page persists it. `curriculum-list`, `lesson-shell`, `ticket-tiers`,
  `service-picker` and `donation-form` all follow this.
- A recurring commitment gets its own consent, separate from the privacy consent, naming the
  amount, the frequency and how it ends — assembled from the live selection so it cannot drift —
  and the kit gives it a route where it can actually be ended. See `donation-form` and
  `nonprofit-donation`.
- When a primitive turns out to be unusable in a real form, fix the primitive additively rather
  than bypassing it in the block. `donation-form` was first drafted with native inputs around
  `Checkbox`; forwarding the props Radix already supports turned out smaller than the workaround
  and fixed the gap for every future block.

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
