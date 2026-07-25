# E2E stability

The following are three consecutive unchanged-code production-build runs after `npm ci`. The default E2E configuration uses one worker, owns the `npm start -- -p 3123` child process, refuses port reuse, and writes `test-results/e2e-summary.json`. The committed per-run summaries below preserve each machine-readable result.

| Run | Total | Passed | Failed | Skipped | Flaky | Playwright duration | Exit code | Machine-readable result |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | 9 | 9 | 0 | 0 | 0 | 26.10s | 0 | [docs/e2e-results-run1.json](e2e-results-run1.json) |
| 2 | 9 | 9 | 0 | 0 | 0 | 27.61s | 0 | [docs/e2e-results-run2.json](e2e-results-run2.json) |
| 3 | 9 | 9 | 0 | 0 | 0 | 26.14s | 0 | [docs/e2e-results-run3.json](e2e-results-run3.json) |

Every run left port 3123 available afterward. The desktop suite includes the repeated Vacuum Drop production gold path, which completed 10/10 each time. Screenshot capture is intentionally a separate `npm run capture` artifact command so the normal E2E lifecycle remains bounded; its reviewed outputs are recorded in `docs/VISUAL-QA.md`.
