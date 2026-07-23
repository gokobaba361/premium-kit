# Contributing to Premium Kit

## Before changing code

1. Read `PLAN.md`.
2. Read `HANDOFF.md`.
3. Confirm the active roadmap item.
4. Read the relevant installed Next.js documentation under `node_modules/next/dist/docs/`.
5. Check whether a similar registry item already exists.

New ideas belong in `PLAN.md` before implementation. The handoff must identify the exact active
batch and the next batch.

## Registry item requirements

Every new item needs:

- An entry in `src/registry/registry.ts`.
- Accurate npm and registry dependencies.
- Turkish name and description in `src/registry/registry-tr.ts`.
- A realistic preview when interaction or appearance benefits from one.
- Metadata v2 coverage through `src/registry/registry-metadata.ts`.
- “Use when” and “avoid when” guidance.
- Keyboard, focus, responsive and reduced-motion behaviour where applicable.
- A recorded compatible licence and source when adapted from external work.

Do not invent logos, customer names, metrics, certifications or testimonials.

## Source and licence policy

- Do not copy code merely because it is publicly visible.
- Confirm the repository licence before adaptation.
- Record the source in `src/registry/research-sources.ts`.
- Preserve required copyright or attribution notices.
- Prefer studying a pattern and rebuilding it around Premium Kit tokens and accessibility rules.

## Validation

Run the complete gate before committing:

```bash
npm run lint
npm run audit:contrast
npm run build
```

Also verify new Turkish and English routes and registry JSON endpoints.

## Commit policy

- One coherent product batch per commit.
- Use an imperative, descriptive commit subject.
- Update `PLAN.md` and `HANDOFF.md` in the same commit as the work they describe.
- Never commit `.env` files, credentials, generated builds or local caches.
- Keep `package-lock.json` aligned with `package.json`.
