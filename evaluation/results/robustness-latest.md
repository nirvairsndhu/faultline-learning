# Supplementary robustness regression

This separate 13-case fixture regression is not a scientific benchmark and is not included in the headline canonical 30-case metrics. It detects obvious dependence on exact fixture wording. Raw result: **5 passed, 8 failed**.

| Case | Pack | Answer | Expected method | Expected decision | Actual decision | Actual misconception | Retrieval | Confidence | Validator | Evidence | Contradictions | Gate | Reason |
|---|---|---|---|---|---|---|---:|---:|---|---|---:|---|---|
| r01 | vacuum-drop | same | valid_method | no_misconception | ask_follow_up | — | 0.1 | 0.4 | true | true | 1 | ask_follow_up | ambiguity handling |
| r02 | vacuum-drop | same | valid_method | no_misconception | diagnose | vacuum-drop | 0.86 | 0.91 | true | true | 0 | diagnose | confidence policy |
| r03 | vacuum-drop | heavy | hidden_misconception | diagnose | ask_follow_up | — | 0.1 | 0.4 | true | true | 1 | ask_follow_up | ambiguity handling |
| r04 | vacuum-drop | heavy | valid_method | no_misconception | no_misconception | — | 0.22 | 0.88 | true | true | 0 | no_misconception | — |
| r05 | collision-forces | equal | valid_method | no_misconception | no_misconception | — | 0.22 | 0.88 | true | true | 0 | no_misconception | — |
| r06 | collision-forces | truck | misconception | diagnose | ask_follow_up | — | 0.1 | 0.4 | true | true | 1 | ask_follow_up | ambiguity handling |
| r07 | collision-forces | equal | misconception | diagnose | ask_follow_up | — | 0.1 | 0.4 | true | true | 1 | ask_follow_up | ambiguity handling |
| r08 | projectile-motion | none | valid_method | no_misconception | ask_follow_up | — | 0.1 | 0.4 | true | true | 1 | ask_follow_up | ambiguity handling |
| r09 | projectile-motion | forward | valid_method | no_misconception | no_misconception | — | 0.22 | 0.88 | true | true | 0 | no_misconception | — |
| r10 | projectile-motion | forward | misconception | diagnose | ask_follow_up | — | 0.1 | 0.4 | true | true | 1 | ask_follow_up | ambiguity handling |
| r11 | vacuum-drop | same | ambiguous | ask_follow_up | ask_follow_up | — | 0.5 | 0.42 | true | true | 1 | ask_follow_up | — |
| r12 | collision-forces | equal | ambiguous | ask_follow_up | no_misconception | — | 0.22 | 0.88 | true | true | 0 | no_misconception | extraction fixture |
| r13 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.88 | true | true | 0 | no_misconception | — |
