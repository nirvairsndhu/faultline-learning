# Supplementary robustness regression

This separate 16-case fixture regression is not a scientific benchmark and is not included in the headline canonical 30-case metrics. It detects obvious dependence on exact fixture wording. Raw result: **16 passed, 0 failed**.

| Case | Pack | Answer | Expected method | Expected decision | Actual decision | Actual misconception | Retrieval | Confidence | Validator | Evidence | Contradictions | Gate | Reason |
|---|---|---|---|---|---|---|---:|---:|---|---|---:|---|---|
| r01 | vacuum-drop | same | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r02 | vacuum-drop | same | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r03 | vacuum-drop | heavy | hidden_misconception | diagnose | diagnose | vacuum-drop | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| r04 | vacuum-drop | heavy | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r05 | collision-forces | equal | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r06 | collision-forces | truck | misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| r07 | collision-forces | equal | misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| r08 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r09 | projectile-motion | forward | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r10 | projectile-motion | forward | misconception | diagnose | diagnose | projectile-motion | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| r11 | vacuum-drop | same | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| r12 | collision-forces | equal | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| r13 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| r14 | vacuum-drop | same | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| r15 | vacuum-drop | same | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| r16 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
