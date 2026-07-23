# Premium Kit — Development Handoff

Last updated: 2026-07-23
Current milestone: Phase 1 AI production contract + Phase 2 completeness
Project path: `C:\Users\TC-ICT\projects\premium-kit`
Local URL: `http://localhost:3000`
Repository status: Git repository on `main`, connected to a private GitHub remote.
GitHub remote: `https://github.com/gokobaba361/premium-kit`

## 1. Read this first

The product goal and complete roadmap live in `PLAN.md`. This file is the operational handoff:
what exists now, which decisions are fixed, what changed most recently and what to do next.

Do not restart architecture from scratch. Preserve the existing Next.js App Router structure,
registry model, design tokens, Turkish routes and build-time documentation pipeline.

Before editing Next.js code, read the relevant local guides under:

`node_modules/next/dist/docs/`

The installed Next.js version is `16.2.11` and contains breaking changes compared with older
training knowledge.

## 2. Current validated state

Latest fully validated state before the active batch:

- Registry items: 66
- Block entries: 43
- Grouped primitive entries: 14
- Site skeletons: 10
- Visual themes: 12
- Static pages: 242/242
- Lint: clean
- Theme contrast audit: 0 WCAG AA failures
- Key Turkish routes: HTTP 200
- AI JSON and Markdown resources: HTTP 200
- Missing Turkish registry translations: 0
- Broken site-recipe registry references: 0

## 3. Important architecture

### Registry

- `src/registry/registry.ts` — source of truth for installable items.
- `src/registry/registry-tr.ts` — Turkish names and descriptions.
- `src/registry/previews.tsx` — visual preview routing.
- `src/registry/source.ts` — build-time source loading.
- `src/registry/props.ts` — TypeScript AST prop extraction.
- `src/registry/skeletons.ts` — purpose-led site recipes.
- `src/registry/site-planning.ts` — brief schema, prompt generation and quality gates.
- `src/registry/research-sources.ts` — approved source research and backlog.

### Human-facing pages

- `src/app/page.tsx` and `src/app/tr/page.tsx`
- `src/app/components/*` and `src/app/tr/bilesenler/*`
- `src/app/blocks/page.tsx` and `src/app/tr/bloklar/page.tsx`
- `src/app/skeletons/page.tsx` and `src/app/tr/iskeletler/page.tsx`
- `src/app/ai/page.tsx` and `src/app/tr/yapay-zeka/page.tsx`
- `src/app/sources/page.tsx` and `src/app/tr/kaynaklar/page.tsx`

### AI-facing resources

- `/r/registry.json`
- `/r/<slug>.json`
- `/r/ai-manifest.json`
- `/r/site-recipes.json`
- `/r/AI-GUIDE.md`
- `/r/AI-GUIDE.tr.md`
- `/r/SITE-BRIEF.md`
- `/r/SITE-BRIEF.tr.md`

### Design

- `src/design/tokens.css` — shared token contract.
- `src/design/themes.css` — theme implementations.
- `src/design/presets.ts` — theme metadata and design rationale.
- `src/app/globals.css` — token bridge and global utilities.

## 4. Decisions that must be preserved

1. Shiki highlighting runs at build time. Do not add a browser highlighter.
2. Prop tables come from TypeScript syntax at build time. Do not hand-maintain prop docs.
3. Turkish routes are real routes, not client-side translation toggles.
4. The language switch maps equivalent routes using `usePathname`.
5. Pages and layouts remain Server Components unless interaction requires a Client Component.
6. Code blocks use one dual-theme Shiki markup tree and theme-scoped token colours.
7. External GitHub code requires a verified compatible licence and recorded provenance.
8. Themes must change typography, density, shape and motion—not only colours.
9. Site skeletons encode argument and hierarchy; visual themes remain swappable.
10. No invented customer proof, metrics or testimonials in previews.

## 5. Completed work

### Foundation

- 12 theme presets with local `next/font` families.
- Primitive, motion, block and theme registry categories.
- Shadcn-compatible install JSON routes.
- Source preview and AST prop documentation.
- Contrast audit script.

### Catalogue expansion

- Expanded registry to 59 items.
- Expanded block library to 39 entries.
- Added 10 site skeletons covering marketing, commerce, apps, docs and events.
- Added Turkish component, block, skeleton and source pages.

### AI production contract

- Added `/ai` and `/tr/yapay-zeka`.
- Added an interactive brief builder.
- The builder combines 10 skeletons and 12 visual directions.
- Generated prompts include planning, registry use, content rules and quality gates.
- Added AI manifest, site recipe JSON, AI guides and brief templates.
- Linked the AI workflow from the home and skeleton pages.

## 6. Active batch

The current batch must complete these items:

1. Add combobox/autocomplete with keyboard navigation and an empty state.
   Status: complete.
2. Expand the overlay family with popover and context-menu primitives.
   Status: complete.
3. Add language and currency selector patterns.
   Status: complete.
4. Add search results, no-results and recent-search patterns.
   Status: complete.
5. Add English/Turkish registry copy, metadata and live previews.
   Status: complete.
6. Record Radix provenance and dependency details.
   Status: complete.
7. Run lint, contrast audit, production build and route checks.
   Status: complete.

## 7. Exact next implementation order

1. Add a bound cart store primitive (client context + hook) so product-detail,
   cart-drawer and checkout share live state instead of prop wiring.
2. Assemble a demo commerce route that sequences the four blocks end to end.
3. Add the account flow: sign up, onboarding, dashboard shell, settings.
4. Run all validation.
5. Update `PLAN.md` and this handoff before closing the batch.

Completed recently: metadata v2 filters (batch 15); per-theme DESIGN.md exports
(batch 16); downloadable project recipe (batch 17); registry integrity audit
(batch 18); Turkish coverage audit (batch 19); commerce flow blocks (batch 20).

## Audit commands

- \`npm run audit:contrast\` — WCAG AA across every theme.
- \`npm run audit:registry\` — registry files exist, registryDependencies resolve,
  every imported npm package is declared.
- \`npm run audit:i18n\` — every registry slug has a non-empty Turkish name and
  description; stale translation keys warn.
- \`npm run audit\` — all three of the above.

## 8. Validation commands

Run from the project root:

```powershell
npm run lint
npm run audit:contrast
npm run build
```

Then verify at minimum:

- `/tr/yapay-zeka`
- `/tr/bilesenler/combobox`
- `/tr/bilesenler/locale-selectors`
- `/tr/bilesenler/search-results`
- `/tr/bilesenler/overlay`
- `/r/catalog.json`
- `/r/combobox.json`
- `/r/locale-selectors.json`
- `/r/search-results.json`
- `/r/overlay.json`

## 9. Known constraints

- The project is currently local and has no `.openai/hosting.json`.
- The project is under Git version control and mirrored to a private GitHub repository.
- Browser animation behaviour has not been explicitly requested for manual visual QA.
- Registry homepage metadata still needs a real production domain before public distribution.
- `npm audit --omit=dev` reports advisories in Next.js-owned PostCSS/Sharp versions. The offered
  forced fix incorrectly downgrades Next.js to 9.3.3, so no unsafe automatic fix was applied.
- Current site recipes are homepage/flow structures; most sector kits do not yet contain every
  interior route.
- Metadata v2 is a Premium Kit discovery layer and must not break the official shadcn registry
  schema used by `/r/registry.json`.

## 10. Next milestone after this batch

Finish Phase 2 discovery and form completeness, then begin Phase 3 with complete commerce and
account flows:

1. Product detail
2. Cart drawer
3. Checkout form
4. Order confirmation
5. Account navigation
6. Sign-up and onboarding
7. Settings forms
8. Loading, empty, error and success states

## 11. Latest batch result

Completed on 2026-07-23:

- Added `PLAN.md` and `HANDOFF.md`.
- Added Premium Kit metadata v2 at `/r/catalog.json`.
- Added `MegaNav`, `CommandPalette` and advanced native form fields.
- Added Turkish catalogue copy and live previews.
- Updated the AI prompt, AI manifest and AI guides to use metadata v2.
- Updated the source research backlog.
- Validated 59 catalogue items, 39 blocks, 11 primitive entries and 10 skeletons.
- Lint clean.
- TypeScript clean.
- Contrast audit: 0 failures.
- Production build: 207/207 static pages.
- New Turkish detail pages and registry endpoints: HTTP 200.

## 12. GitHub publication policy

- `main` is the protected-quality branch by convention.
- Every batch updates `PLAN.md` and `HANDOFF.md`.
- Local lint, contrast and build checks run before push.
- GitHub Actions repeats the complete quality gate.
- Repository secrets and `.env` files remain untracked.
- External source licences and provenance are reviewed before adaptation.

## 13. GitHub publication result

- Repository: `gokobaba361/premium-kit`
- Visibility: private
- Default development branch: `main`
- CI workflow: lint, theme contrast audit and production build
- Initial GitHub Actions quality run: passed
- Pull-request template: roadmap, registry completeness and quality checklist
- Contribution policy: `CONTRIBUTING.md`
- Licence: MIT

Update `PLAN.md` and this file after every coherent batch.

## 14. Discovery primitives batch

Completed on 2026-07-23:

- Added a searchable combobox with keyboard navigation, controlled/uncontrolled values,
  disabled options and an explicit no-results state.
- Expanded overlays with Radix Popover and Context Menu, including managed focus, keyboard
  navigation and long-press support.
- Added independent language and currency selector patterns.
- Added server-rendered result, no-result and recent-search patterns.
- Added English and Turkish catalogue copy, metadata v2 records and live previews.
- Added Radix Primitives to the MIT provenance catalogue.
- Registry total: 62 items; grouped primitive families: 14.
- Lint and TypeScript clean.
- Theme contrast audit: 0 failures.
- Production build: 216/216 static pages.
- New human and machine routes: HTTP 200.

## 15. Catalogue filter batch

Completed on 2026-07-23:

- Added metadata v2 facets to `src/registry/registry-metadata.ts`: `facetsBySlug`
  (rendering, JavaScript level, tags per slug), `tagCounts` and the mode lists.
  Facets are keyed by slug, so English and Turkish catalogues share one object.
- Rebuilt `ComponentsBrowser` with rendering and JavaScript single-select facets,
  multi-select tag chips (AND semantics), a combined empty state with a reset
  control and a live result counter. Full English and Turkish labels.
- Wired facets and the top 18 tags into `/components` and `/tr/bilesenler`.
- Turkish cards now link to `/tr/bilesenler/<slug>` rather than the English route.
- Verified in-browser: Server facet 62 -> 42, tag `form` -> 4, `form` + `keyboard`
  -> 1, Turkish `İstemci` -> 16, empty state and reset both work.
- No new colours: every control reuses accent and line tokens already audited.
- Lint clean. Production build: 216/216 static pages. `/r/catalog.json`,
  `/components` and `/tr/bilesenler`: HTTP 200. Contrast audit: 0 failures.

## 16. Theme DESIGN.md batch

Completed on 2026-07-23:

- Added `src/registry/design-md.ts`: a build-time generator that reads real token
  values from `tokens.css` (defaults) and `themes.css` (per-theme overrides) and
  combines them with preset metadata into a complete DESIGN.md per theme.
- Sections per spec: identity, design dials with readings, colour role table with
  live token values, typography, shape, spacing/rhythm, motion budget, imagery
  direction and do/do-not rules.
- Added routes: `/r/design/<theme>.md` (12, prerendered) and `/r/design.json` index.
- Wired into `/r/ai-manifest.json` (`endpoints.designIndex` and per-theme
  `designSpec`) and both AI guides (workflow step 4).
- Added a "Design spec" / "Tasarım spesi" link to every theme card on `/` and `/tr`.
  Cards are no longer a single wrapping anchor, so template and spec links coexist
  without nested anchors.
- Verified: 12/12 specs HTTP 200 with zero unresolved `inherit` tokens and correct
  per-theme values (optical scale, radius, display font). design.json count 12.
  Home pages expose 12 spec links, 0 nested anchors.
- Lint clean. Production build: 229/229 static pages. Contrast audit: 0 failures.

## 17. Project recipe batch

Completed on 2026-07-23:

- Added `buildProjectRecipe(input, language)` and `recipeFileName(input)` to
  `src/registry/site-planning.ts`. The recipe resolves the chosen skeleton and
  theme, marks which sections map to an installable registry item, lists the
  de-duplicated install order and endpoints, and embeds the quality gates and
  the generated prompt. Values are derived from the brief plus shipping data.
- Added a "Download recipe (.json)" button to the brief builder that serialises
  the recipe to a Blob and downloads it. Filename slugs from the project name,
  Unicode-safe (Turkish "Köşe Kafé" -> `kose-kafe-recipe.json`).
- Published a worked example at `/r/project-recipe.example.json` and referenced
  it from the AI manifest (`endpoints.projectRecipeExample`) and both AI pages.
- Verified: example recipe resolves the clinic theme with 9 installable sections
  in the correct order and a 2645-char prompt; download button produces a blob
  with the expected filename in-browser.
- Lint clean. Build 230/230 static. Contrast audit: 0 failures.
- Phase 1 (AI production contract) checklist is now complete.

## 18. Registry integrity audit batch

Completed on 2026-07-23:

- Added `scripts/registry-audit.mjs`. Parses `registry.ts` with the TypeScript
  compiler (syntax only) and checks, per entry: source files exist,
  registryDependencies resolve to real slugs, and every imported npm package is
  declared in dependencies. Declared-but-unused deps are warnings; missing
  files, broken slugs and undeclared imports are errors that exit non-zero.
- The audit initially surfaced 21 warnings. Fixed the real one: `locale-selectors`
  declared `@radix-ui/react-select` and `@phosphor-icons/react` although its file
  imports only the `form` registry item (which provides them) and `cn`. Trimmed
  its direct dependencies to `clsx` and `tailwind-merge`.
- The remaining warnings were blocks that declare `motion` but reach it through
  the local `reveal` helper. Taught the audit about that transitive helper via a
  HELPER_PACKAGES map, so a genuine transitive need no longer warns while a truly
  dead dependency still would.
- Added `npm run audit:registry` and a combined `npm run audit`, and added the
  registry audit as a CI step in `.github/workflows/ci.yml`.
- Verified: audit exits 0 with zero warnings; `/r/locale-selectors.json` now
  lists deps `["clsx","tailwind-merge"]` and registryDependency `form`; detail
  page HTTP 200. Lint clean, build 230/230, contrast 0 failures.

## 19. Turkish coverage audit batch

Completed on 2026-07-23:

- Added `scripts/i18n-audit.mjs`. Parses registry slugs from registry.ts and the
  `text` translation map from registry-tr.ts, both via the TypeScript compiler.
  Fails when any slug has no Turkish translation or an empty name/description;
  warns on a stale translation key with no matching slug.
- The Turkish catalogue silently falls back to English for a missing slug, so
  this closes the one gap that build and lint could not see.
- Verified detection: temporarily removing the marquee translation produced
  "61/62" and exit 1; restored to 62/62 exit 0.
- Added `npm run audit:i18n`, folded it into `npm run audit`, and added a CI step.
- Current coverage: 62/62 complete, zero stale keys.

## 20. Commerce flow blocks batch

Completed on 2026-07-23:

- Added four commerce blocks, each presentational (parent owns data/callbacks)
  with complete states and integer-minor-unit money via Intl.NumberFormat:
  - product-detail: thumbnail gallery, variant selection that keeps sold-out
    options visible-but-disabled, quantity stepper, add-to-cart with a transient
    added state.
  - cart-drawer: Radix Dialog slide-over with line items, quantity, remove, a
    subtotal/shipping/total summary and an empty state.
  - checkout-form: contact and delivery fields with inline validation, an order
    summary aside, and idle/placing/placed states. Collects no card details;
    payment is explicitly handed to a provider on submit.
  - order-confirmation: success state with order number, itemised total and a
    next step. No invented tracking numbers.
- Enhanced the shared form Select with a `name` prop (Radix renders a hidden
  native select) so it participates in FormData; the checkout country field
  needed it.
- Registered all four in registry.ts, registry-tr.ts, registry-metadata (client
  items, tags, avoid-when) and previews (with a stateful cart preview).
- Verified in-browser: sold-out variant disabled, quantity 1->3, added state,
  EUR de-DE formatting (145,00 €); cart remove down to empty state; checkout
  shows 5 errors on empty submit and reaches "Order placed" when valid (total
  215,00 €); confirmation renders order OCK-2048.
- Registry 62 -> 66 items. Lint clean. audit: integrity OK, TR 66/66. Build
  242/242 static. Contrast 0 failures. All 12 new routes (EN/TR/JSON) HTTP 200.
