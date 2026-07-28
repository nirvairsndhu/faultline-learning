# Devpost copy

## Project title

Faultline

## Tagline

Make physics reasoning inspectable.

## Links

- GitHub: https://github.com/nirvairsndhu/faultline-learning
- Live demo: **To be added after deployment**
- Video: **To be added after recording**

## Inspiration

Correct answers can conceal incorrect causal reasoning. We wanted a compact instrument that makes that difference visible.

## What it does

Faultline maps a learner explanation to a bounded physics graph, validates it deterministically, runs a local counterexample simulation, and requires a verified repair plus transfer.

It covers three authored scenarios: Vacuum Drop, Collision Forces, and Projectile Motion. The flow requires a prediction before simulation and keeps exact learner evidence beside each extracted relation.

## How it works

The model extracts claims and relation candidates. Deterministic code validates active-pack concepts, exact evidence, required relations, forbidden relations, contradictions, and simulations.

## How we built it

Next.js, TypeScript, Zod, Playwright, Vitest, local physics functions, and a bounded extraction interface.

AI is limited to language extraction. Authored packs and deterministic TypeScript code own physics truth, evidence validation, repair, simulation, and transfer verification. Without a Featherless key, the product discloses Cached analysis, live validation; fixture evaluation is not presented as live-model accuracy.

## Challenges

Avoiding false passes from negation, quotations, contradictions, and cross-pack language while keeping the graph truthful to learner input.

## Accomplishments

A graph-repair flow that compares actual initial and revised learner relations, with reproducible engineering regression and browser tests.

The merged release has 61 passing tests, 9 passing Chromium/WebKit E2E tests, and 0 production dependency vulnerabilities.

## What we learned

Language extraction needs a small deterministic authority beside it when physics truth and evidence provenance matter.

## What's next

Independent human review and learner testing; neither has been claimed here.

## Technologies used

Next.js, React, TypeScript, Zod, Vitest, Playwright, OpenAI-compatible extraction API.

## What remains

Deployment and final video recording are external submission tasks. No learning-impact or live-model-accuracy claim is made.
