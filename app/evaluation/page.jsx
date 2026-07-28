import Link from "next/link";
import latest from "@/evaluation/results/latest.json";
import robustness from "@/evaluation/results/robustness-latest.json";
import SiteFooter from "@/components/SiteFooter";

export default function EvaluationPage() {
  const metrics = latest.metrics;
  const knownFailures = robustness.rows
    .filter((row) => row.mismatchReason)
    .map((row) => row.id);

  const reasoningRows = [
    ["Misconception-positive", metrics.clearMisconceptionPositives],
    ["Valid-method negative", metrics.validMethodNegatives],
    ["Ambiguous", metrics.ambiguousCases],
    ["Hidden recall", metrics.hiddenMisconceptionRecall],
    ["Valid-method false-positive rate", metrics.validMethodFalsePositiveRate],
  ];
  const systemRows = [
    ["Evidence span validity", metrics.evidenceSpanValidity],
    ["Schema success rate", metrics.schemaSuccessRate],
    ["Deterministic simulation pass rate", metrics.deterministicSimulationPassRate],
  ];

  return (
    <>
      <main>
        <header>
          <h1>FAULTLINE / evaluation</h1>
          <p><Link href="/">back to home</Link></p>
        </header>

        <p>These are authored engineering regression results. They are not live-model accuracy or proof that learning improved.</p>

        <h2>Regression results</h2>
        <table>
          <thead>
            <tr><th>metric</th><th>value</th></tr>
          </thead>
          <tbody>
            <tr className="metric-group"><th colSpan="2">reasoning cases</th></tr>
            {reasoningRows.map(([name, value]) => (
              <tr key={name}><td>{name}</td><td>{value}</td></tr>
            ))}
            <tr className="metric-group"><th colSpan="2">system checks</th></tr>
            {systemRows.map(([name, value]) => (
              <tr key={name}><td>{name}</td><td>{value}</td></tr>
            ))}
          </tbody>
        </table>

        <h2>Run notes</h2>
        <pre>{`production e2e runs: 3
physics packs completed: 3/3
vacuum-drop repeated gold path: 10/10
inference mode: cached analysis, live validation
adversarial language: ${robustness.passed}/${robustness.caseCount}
known failures: ${knownFailures.length ? knownFailures.join(", ") : "none in generated run"}`}</pre>

        <h2>Architecture disclosure</h2>
        <p>The language model extracts claims and relations. Regular code validates the authored physics and requires exact learner evidence. Low-confidence cases request clarification.</p>
      </main>
      <SiteFooter />
    </>
  );
}
