# Visual QA

All named final production screenshots were opened and inspected at high detail on 2026-07-25. The review checked state fidelity, clipping, graph and exact-evidence legibility, non-colour state cues, fallback disclosure, reachable mobile actions, overflow, browser overlays, and legibility at 1280×720 and 390×844.

The final set is `featured-hidden-misconception.png`, `featured-edge-evidence.png`, `featured-prediction.png`, `featured-simulation.png`, `featured-repair-diff.png`, `featured-transfer-success.png`, `evaluation-page.png`, and `mobile-featured-graph.png`. The only defect found was that capture could occur during node entrance motion; the capture test now emulates reduced motion before navigation and all affected images were regenerated. The machine-readable inspection record is [the screenshot manifest](../public/screenshots/manifest.json).
