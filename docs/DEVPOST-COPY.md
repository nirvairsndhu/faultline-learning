# Devpost copy

## Inspiration

Correct answers can conceal incorrect causal reasoning. We wanted a compact instrument that makes that difference visible.

## What it does

Faultline maps a learner explanation to a bounded physics graph, validates it deterministically, runs a local counterexample simulation, and requires a verified repair plus transfer.

## How it works

The model extracts claims and relation candidates. Deterministic code validates active-pack concepts, exact evidence, required relations, forbidden relations, contradictions, and simulations.

## How we built it

Next.js, TypeScript, Zod, Playwright, Vitest, local physics functions, and a bounded extraction interface.

## Challenges

Avoiding false passes from negation, quotations, contradictions, and cross-pack language while keeping the graph truthful to learner input.

## Accomplishments

A graph-repair flow that compares actual initial and revised learner relations, with reproducible engineering regression and browser tests.

## What we learned

Language extraction needs a small deterministic authority beside it when physics truth and evidence provenance matter.

## What's next

Independent human review and learner testing; neither has been claimed here.

## Technologies used

Next.js, React, TypeScript, Zod, Vitest, Playwright, OpenAI-compatible extraction API.
