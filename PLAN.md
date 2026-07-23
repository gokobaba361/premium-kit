# Premium Kit — Master Plan

Last updated: 2026-07-23
Status: Active development
Working language: Turkish-first, English parity
Primary surface: `http://localhost:3000/tr`
GitHub: `https://github.com/gokobaba361/premium-kit` (private)

## 1. North star

Premium Kit is not only a component gallery. It is a source-owned website production system
that a person or an AI coding agent can use to move from an incomplete business brief to a
complete, premium, restrained and maintainable website.

The system must support two equal workflows:

1. A person browses themes, components, blocks and site skeletons, then copies the source.
2. An AI reads machine-readable manifests, chooses compatible resources and builds the site
   using the same rules shown to the person.

Success means a user can say “build a calm Turkish dental clinic site” or “build an animated
English SaaS launch site” and receive a result with a deliberate sitemap, visual system, real
content structure, accessible interaction and editable source code.

## 2. Product principles

1. **Plan before composition.** Audience, outcome, sitemap and content precede components.
2. **Source ownership.** Registry items are copied into the target project; there is no opaque
   runtime UI dependency.
3. **Themes are systems.** Typography, density, spacing, shape, imagery and motion change
   together. A colour swap is not a theme.
4. **Server first.** Static and server-rendered output is the default. Client JavaScript exists
   only where interaction requires it.
5. **Real states.** Interactive flows include loading, empty, error, success and disabled states.
6. **Evidence over decoration.** Never invent customer logos, metrics, testimonials or claims.
7. **Accessibility by construction.** Semantic HTML, keyboard support, WCAG AA contrast and
   reduced motion are release requirements.
8. **Turkish is first-class.** Turkish routes and documentation are not machine-translated
   afterthoughts. English remains available for broader tooling compatibility.
9. **Licensed research only.** External code is adapted only after its licence, provenance and
   dependencies are recorded. Community posts inform method and taxonomy, not code copying.

## 3. Current baseline

As of 2026-07-23:

- 66 registry items
- 43 full-page blocks
- 14 grouped primitive families
- 6 motion components
- 3 theme-system entries
- 12 sector-calibrated visual themes
- 10 purpose-led site skeletons
- 242 statically generated routes
- English and Turkish catalogue routes
- Build-time Shiki syntax highlighting
- Build-time TypeScript AST prop documentation
- AI brief builder and generated production prompt
- Machine-readable component registry, site recipes and AI manifest
- WCAG AA theme contrast audit with zero failures

## 4. System architecture

### 4.1 Human-facing catalogue

- `/tr` and `/` — theme and product entry
- `/tr/bilesenler` and `/components` — registry browser
- `/tr/bloklar` and `/blocks` — block inventory
- `/tr/iskeletler` and `/skeletons` — purpose-led site recipes
- `/tr/kaynaklar` and `/sources` — open-source research and licence record
- `/tr/yapay-zeka` and `/ai` — brief-to-prompt workflow

### 4.2 Machine-facing catalogue

- `/r/registry.json` — shadcn-compatible install registry
- `/r/<slug>.json` — individual installable item
- `/r/catalog.json` — Premium Kit metadata v2 catalogue
- `/r/site-recipes.json` — ordered site skeletons
- `/r/ai-manifest.json` — AI workflow, endpoints, themes and quality gates
- `/r/AI-GUIDE.md` and `/r/AI-GUIDE.tr.md` — portable agent contract
- `/r/SITE-BRIEF.md` and `/r/SITE-BRIEF.tr.md` — discovery template

### 4.3 AI build pipeline

1. Collect business, audience, proof, primary outcome and constraints.
2. Produce sitemap and user flow.
3. Select a complete visual system.
4. Select the closest site skeleton.
5. Select compatible registry items using metadata v2.
6. Write concrete content and implement complete states.
7. Run quality gates.
8. Report assumptions, sources, dependencies and checks.

## 5. Definition of done

Every new registry item must meet all applicable requirements:

- Clear name, description, category, tags and intended use.
- Honest “use when” and “avoid when” guidance.
- Accurate npm and registry dependencies.
- Source file is readable and owned by the target project.
- Props are documented from TypeScript source where applicable.
- Preview uses concrete, believable content.
- Keyboard and touch behaviour are intentional.
- Focus remains visible.
- WCAG AA colour contrast passes.
- Reduced-motion behaviour preserves access to content.
- Mobile, tablet and desktop layouts remain usable.
- No unnecessary client-side JavaScript.
- Loading, empty, error and success states exist when data or submission is involved.
- English and Turkish catalogue copy exists.
- Licence/provenance is recorded when adapted from external research.
- Lint, production build and relevant audits pass.

## 6. Roadmap

### Phase 0 — Foundation audit

Status: Complete

- [x] Establish design tokens and 12 sector themes.
- [x] Establish registry and shadcn-compatible item routes.
- [x] Add build-time source rendering with Shiki.
- [x] Add build-time AST prop extraction.
- [x] Add Turkish catalogue parity.
- [x] Add open-source research catalogue.
- [x] Expand to 56 items, 38 blocks and 10 skeletons.

### Phase 1 — AI production contract

Status: In progress

- [x] Add Turkish and English AI site builder pages.
- [x] Add brief-to-production-prompt generator.
- [x] Add AI manifest, recipe JSON and Markdown guides.
- [x] Add `PLAN.md` and `HANDOFF.md`.
- [x] Add registry metadata v2 catalogue.
- [x] Add metadata filtering/search to the human catalogue.
- [x] Export a complete `DESIGN.md` for each visual theme.
- [x] Export a generated project recipe from a completed brief.

Exit condition: An AI can discover, select and explain compatible Premium Kit resources without
scraping rendered pages.

### Phase 2 — Primitive and navigation completeness

Status: In progress

Latest completed batch: discovery primitives — combobox, popover/context menu, locale selectors
and search-result states.

- [x] Mega menu navigation.
- [x] Command palette.
- [x] Combobox/autocomplete.
- [x] Date and time inputs.
- [x] OTP input.
- [x] Native file upload.
- [x] Popover and context menu.
- [x] Language and currency selector.
- [x] Search results and no-results patterns.

Exit condition: Common marketing, commerce and application interactions can be built without
inventing new primitives.

### Phase 3 — Complete product flows

Status: Planned

- [~] Commerce: collection → product → cart → checkout → confirmation. Product
  detail, cart drawer, checkout and confirmation blocks shipped; collection grid
  already existed. Remaining: a bound cart store and an assembled demo route.
- [ ] Account: sign up → onboarding → dashboard → settings.
- [ ] Content: index → category → article → search → subscription.
- [ ] Booking: service → staff/location → calendar → confirmation.
- [ ] Event: schedule → speaker → venue → registration.
- [ ] Admin: list → filter → create → edit → delete → audit.

Exit condition: The library ships complete states and pages, not homepage-only compositions.

### Phase 4 — Sector site kits

Status: Planned

Target kits:

- SaaS and AI product
- Agency and creative studio
- Freelancer and portfolio
- E-commerce
- Clinic, dentist and healthcare
- Consultant and professional service
- Restaurant, cafe and hospitality
- Hotel and travel
- Event and conference
- Education and online course
- Blog, publication and newsletter
- Real estate and architecture
- Legal and financial service
- Non-profit and donation
- Documentation and developer portal
- Dashboard and internal tool
- Marketplace and community
- Creator and personal brand

Each kit must include its required routes, content model, structured data type, forms, legal
surfaces and operational states.

### Phase 5 — Visual-system breadth

Status: Planned

- [x] Turn all 12 themes into complete `DESIGN.md` exports.
- [ ] Add typography-pair specimens and selection guidance.
- [ ] Define image direction per theme.
- [ ] Define component density and section pacing per theme.
- [ ] Define motion recipes and budgets per theme.
- [ ] Add deliberate theme compatibility to every skeleton.

Exit condition: Sites can differ in composition and design language, not only palette.

### Phase 6 — Quality automation

Status: Planned

- [x] Registry link and dependency audit.
- [x] Turkish translation coverage audit.
- [ ] Keyboard/focus test matrix.
- [ ] Reduced-motion audit.
- [ ] Image and metadata completeness audit.
- [ ] Structured-data validation.
- [ ] JavaScript budget reporting.
- [ ] Automated route and registry smoke tests.

Exit condition: A registry item cannot be marked stable without passing repeatable checks.

### Phase 7 — Distribution and community

Status: Planned

- [ ] Public production domain.
- [ ] Namespaced shadcn registry configuration.
- [ ] MCP setup instructions for Codex, Claude, Cursor and VS Code.
- [ ] Contribution template with licence/provenance fields.
- [ ] Versioning and changelog policy.
- [ ] Deprecation and migration policy.
- [ ] Community requests and coverage voting.

## 7. Target scale

The target is breadth with quality, not a raw item count:

- 80+ primitive and compound component entries
- 150+ page blocks
- 30+ complete page templates
- 24+ multi-page site kits
- 15–20 complete visual systems
- 100% Turkish and English catalogue coverage
- 100% stable items with metadata, dependency and quality records

## 8. Research sources

Approved MIT-licensed references currently recorded in the product:

- Launch UI
- Shadcn Space
- Origin UI
- Magic UI
- Page UI
- TailGrids
- TailAdmin

Additional architecture references to audit before adaptation:

- shadcn/ui registry and MCP documentation
- Radix Primitives accessibility and interaction conventions
- Motion Primitives
- Next.js SaaS Starter
- Spree Storefront
- Shadcn Admin Kit
- HugoBlox

No external source is copied into the registry until licence and provenance are recorded.

## 9. Working protocol

At the start of each development batch:

1. Read `PLAN.md`.
2. Read `HANDOFF.md`.
3. Confirm the current inventory and build state.
4. Mark the active roadmap items.
5. Implement one coherent batch.
6. Update Turkish and English surfaces together.
7. Run required checks.
8. Update both documents before handoff.

The handoff must always state what changed, what was verified, what remains and the exact next
batch. Work is not considered complete when the code changes but the project memory is stale.

## 10. Source-control policy

1. `main` must always represent a validated state.
2. One coherent product batch becomes one descriptive commit.
3. `PLAN.md` and `HANDOFF.md` are updated in the same commit as the work they describe.
4. New user ideas are added to the roadmap before implementation.
5. `.env`, credentials, local caches and generated output are never committed.
6. `package-lock.json` stays aligned with dependency changes.
7. Lint, contrast audit and production build pass before push.
8. GitHub Actions repeats the same checks on every push and pull request.
9. External code requires licence and provenance review before it enters the repository.
10. The remote `main` branch is pushed only after local verification succeeds.
