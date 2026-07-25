# Faultline evaluation

Canonical set: **30 authored cases** — **15 clear misconception positives** (9 explicit and 6 hidden), **9 valid-method negatives**, and **6 ambiguous cases evaluated separately**. The diagnosis confusion matrix covers the **24 non-ambiguous cases**.

| Metric | Result | Raw counts |
|---|---:|---|
| Diagnosis confusion | TP 15, FP 0, TN 9, FN 0 | 15/0/9/0 |
| Hidden misconception recall | 1 | 6/6 detected |
| Valid-method false-positive rate | 0 | 0/9 |
| Ambiguity-routing accuracy | 1 | 6/6 routed correctly |
| Evidence-span validity | 1 | 30/30 |
| Schema success | 1 | 30/30 |
| Deterministic simulation pass | 1 | 3/3 |

Model confidence threshold: **0.72**. Retrieval similarity threshold: **0.58**.

Engineering regression set: fixtures replace only external inference; parsing, evidence validation, deterministic relation validation, simulations, and confidence policy remain live.

Not claimed. Live Featherless measurements were skipped without credentials.

Operational confidence values are not calibrated probabilities.

Independent human review remains pending.
