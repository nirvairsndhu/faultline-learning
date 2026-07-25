# Error analysis

| Case | Pack | Answer | Expected method | Expected decision | Actual decision | Actual misconception | Retrieval | Confidence | Validator | Evidence | Contradictions | Gate | Reason |
|---|---|---|---|---|---|---|---:|---:|---|---|---:|---|---|
| v01 | vacuum-drop | same | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| v02 | vacuum-drop | same | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| v03 | vacuum-drop | same | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| v04 | vacuum-drop | heavy | misconception | diagnose | diagnose | vacuum-drop | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| v05 | vacuum-drop | heavy | misconception | diagnose | diagnose | vacuum-drop | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| v06 | vacuum-drop | light | misconception | diagnose | diagnose | vacuum-drop | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| v07 | vacuum-drop | same | hidden_misconception | diagnose | diagnose | vacuum-drop | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| v08 | vacuum-drop | same | hidden_misconception | diagnose | diagnose | vacuum-drop | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| v09 | vacuum-drop | same | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| v10 | vacuum-drop | heavy | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| c01 | collision-forces | equal | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| c02 | collision-forces | equal | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| c03 | collision-forces | equal | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| c04 | collision-forces | truck | misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| c05 | collision-forces | truck | misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| c06 | collision-forces | car | misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| c07 | collision-forces | equal | hidden_misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| c08 | collision-forces | equal | hidden_misconception | diagnose | diagnose | collision-forces | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| c09 | collision-forces | equal | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| c10 | collision-forces | truck | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| p01 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| p02 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| p03 | projectile-motion | none | valid_method | no_misconception | no_misconception | — | 0.22 | 0.9 | true | true | 0 | no_misconception | — |
| p04 | projectile-motion | forward | misconception | diagnose | diagnose | projectile-motion | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| p05 | projectile-motion | forward | misconception | diagnose | diagnose | projectile-motion | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| p06 | projectile-motion | gravity | misconception | diagnose | diagnose | projectile-motion | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| p07 | projectile-motion | none | hidden_misconception | diagnose | diagnose | projectile-motion | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| p08 | projectile-motion | none | hidden_misconception | diagnose | diagnose | projectile-motion | 0.86 | 0.9 | true | true | 0 | diagnose | — |
| p09 | projectile-motion | none | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
| p10 | projectile-motion | forward | ambiguous | ask_follow_up | ask_follow_up | — | 0.22 | 0.42 | true | true | 1 | ask_follow_up | — |
