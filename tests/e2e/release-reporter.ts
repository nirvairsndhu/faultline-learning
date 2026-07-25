import type { FullConfig, FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { mkdirSync, writeFileSync } from "node:fs";

type Counts = { total: number; passed: number; failed: number; skipped: number; flaky: number };

class ReleaseReporter implements Reporter {
  private readonly startedAt = Date.now();
  private readonly counts: Counts = { total: 0, passed: 0, failed: 0, skipped: 0, flaky: 0 };

  onBegin(_config: FullConfig, suite: { allTests: () => TestCase[] }) {
    this.counts.total = suite.allTests().length;
  }

  onTestEnd(test: TestCase, _result: TestResult) {
    const outcome = test.outcome();
    if (outcome === "expected") this.counts.passed += 1;
    else if (outcome === "skipped") this.counts.skipped += 1;
    else if (outcome === "flaky") this.counts.flaky += 1;
    else this.counts.failed += 1;
  }

  onEnd(result: FullResult) {
    const durationMs = Date.now() - this.startedAt;
    const summary = { ...this.counts, durationMs, duration: `${(durationMs / 1000).toFixed(2)}s`, exitCode: result.status === "passed" ? 0 : 1, status: result.status };
    mkdirSync("test-results", { recursive: true });
    writeFileSync("test-results/e2e-summary.json", `${JSON.stringify(summary, null, 2)}\n`);
    process.stdout.write(`\nRelease E2E summary: total ${summary.total}, passed ${summary.passed}, failed ${summary.failed}, skipped ${summary.skipped}, flaky ${summary.flaky}, duration ${summary.duration}, exit code ${summary.exitCode}\n`);
  }
}

export default ReleaseReporter;
