# Faultline

Faultline is a bounded physics-reasoning product: it maps learner explanations, validates authored causal relations deterministically, runs local counterexample simulations, and verifies repair through transfer.

## Architecture

- `content/packs.js`: authored, shared-schema packs; no UI contains physics truth.
- `lib/domain`: deterministic physics, relation, repair and transfer authority.
- `lib/ai`: bounded extraction only; a missing key uses disclosed fixtures.
- `app/api`: validated server boundaries; pack endpoint removes hidden diagnosis keys.
- `components/FaultlineApp.jsx`: accessible stage flow and visual instrument.

## Commands

`npm run dev`, `npm run lint`, `npm run test`, `npm run test:e2e`, `npm run evaluate`, `npm run build`, `npm run check`, `npm start`.

## Invariants

Never infer physics from model text. Evidence must be a literal learner-text substring. A repair needs required relations, no prohibited relation, and a verified transfer. Prediction cannot be skipped. Never expose pack diagnosis keys through public pack APIs.

## Reliability and metrics

Without a Featherless key, show “Cached analysis, live validation”; fixtures are versioned and deterministic while simulations and validators remain live. Do not describe fixture evaluation as live-model performance or claim unsupported learning outcomes.

## Non-goals and design

No chatbot, authentication, uploads, arbitrary subjects, LMS integration, generated simulations, classroom management, gamification, or learner profiles. Use semantic charcoal/gray/amber/red/cyan/green; keep the evidence-linked graph dominant and make color non-exclusive.
