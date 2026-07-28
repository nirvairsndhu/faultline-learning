"use client";

import { useState } from "react";
import Link from "next/link";
import { freeFallTime, collisionForces, projectileAt } from "@/lib/domain/physics";
import { graphDiff } from "@/lib/domain/graph-validator";
import SiteFooter from "@/components/SiteFooter";

const stages = ["answer", "explain", "graph", "predict", "lab", "teach", "repair", "transfer", "report"];

export default function FaultlineApp({ pack, demo = false }) {
  const [stage, setStage] = useState("answer");
  const [answer, setAnswer] = useState(demo ? pack.correctAnswer : "");
  const [explanation, setExplanation] = useState(demo ? "Mass causes greater free-fall acceleration." : "");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prediction, setPrediction] = useState(demo ? pack.correctAnswer : "");
  const [ran, setRan] = useState(false);
  const [teach, setTeach] = useState(demo ? "In a vacuum, acceleration is independent of mass." : "");
  const [teachAnalysis, setTeachAnalysis] = useState(null);
  const [teachVerification, setTeachVerification] = useState(null);
  const [transfer, setTransfer] = useState(demo ? pack.transfer.correctAnswer : "");
  const [transferWhy, setTransferWhy] = useState(demo ? "Both objects have the same acceleration independent of mass in a vacuum." : "");
  const [transferVerification, setTransferVerification] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const correct = answer === pack.correctAnswer;
  const before = analysis?.edges || [];
  const after = teachAnalysis?.edges || [];
  const diff = graphDiff(before, after);
  const teachValid = Boolean(teachVerification?.success);

  const requestAnalysis = async (payload) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The reasoning check could not be completed.");
      return result;
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The reasoning check could not be completed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const verify = (phase, text, selectedAnswer) =>
    requestAnalysis({ packId: pack.id, explanation: text, phase, selectedAnswer });

  const advance = (next) => {
    setError("");
    setStage(next);
  };

  return (
    <>
      <main>
        <header>
          <h1><Link href="/">FAULTLINE</Link></h1>
          <p>step {stages.indexOf(stage) + 1} of {stages.length}: {stage}</p>
          <p><strong>Cached analysis, live validation</strong></p>
        </header>

        <section>
          <p>pack_id: {pack.id}</p>
          <h2>{pack.title}</h2>
          <p>{pack.problem}</p>
          {demo && <p className="notice">demo mode: inputs are preloaded, checks are still live</p>}
        </section>

        {stage === "answer" && (
          <section className="stage">
            <h3>1. Commit to an answer</h3>
            <fieldset>
              <legend>Choose before seeing the analysis.</legend>
              {pack.choices.map((choice) => (
                <label className="choice" key={choice.id}>
                  <input
                    type="radio"
                    name="answer"
                    value={choice.id}
                    checked={answer === choice.id}
                    onChange={() => setAnswer(choice.id)}
                  />
                  {choice.label}
                </label>
              ))}
            </fieldset>
            <button disabled={!answer} onClick={() => advance("explain")}>Explain your method</button>
          </section>
        )}

        {stage === "explain" && (
          <section className="stage" aria-busy={loading}>
            <h3>2. Explain the causal method</h3>
            <p>State what causes what. Your words are treated as data, not instructions.</p>
            <label>
              Reasoning
              <textarea
                value={explanation}
                maxLength={1600}
                onChange={(event) => setExplanation(event.target.value)}
                placeholder="Explain the relationship that determines the outcome."
              />
            </label>
            {loading && <p role="status">checking evidence and relations...</p>}
            {error && <p role="alert" className="error">ERROR: {error}</p>}
            <button
              disabled={loading || explanation.trim().length < 8}
              onClick={async () => {
                const result = await requestAnalysis({ packId: pack.id, explanation });
                if (!result) return;
                setAnalysis(result);
                advance("graph");
              }}
            >
              {loading ? "Checking reasoning…" : "Map reasoning"}
            </button>
          </section>
        )}

        {stage === "graph" && analysis && (
          <section className="stage">
            <h3>3. Analysis output</h3>
            <p className={correct ? "success" : "error"}>
              answer_selected={correct ? "correct" : "incorrect"}
            </p>
            <ReasoningDump pack={pack} edges={before} />
            <h4>{analysis.decision === "diagnose" ? "unsupported relationship found" : "analysis status"}</h4>
            <p>{analysis.summary}</p>
            {analysis.edges[0] && <blockquote>{analysis.edges[0].evidence}</blockquote>}
            <dl>
              <dt>confidence</dt><dd>{Math.round(analysis.confidence * 100)}% fixture</dd>
              <dt>validation</dt><dd>live deterministic checks</dd>
            </dl>
            <GraphText pack={pack} edges={before} />
            <button onClick={() => advance("predict")}>Make prediction</button>
          </section>
        )}

        {stage === "predict" && (
          <section className="stage">
            <h3>4. Prediction gate</h3>
            <p>{pack.prediction}</p>
            <fieldset>
              <legend>prediction</legend>
              {pack.choices.map((choice) => (
                <label className="choice" key={choice.id}>
                  <input
                    type="radio"
                    name="prediction"
                    checked={prediction === choice.id}
                    onChange={() => setPrediction(choice.id)}
                  />
                  {choice.label}
                </label>
              ))}
            </fieldset>
            <button disabled={!prediction} onClick={() => advance("lab")}>Unlock simulation</button>
          </section>
        )}

        {stage === "lab" && (
          <section className="stage">
            <h3>5. Local simulation</h3>
            <Lab pack={pack} ran={ran} run={() => setRan(true)} />
            {ran && (
              <div className="success-box">
                <strong>Observed result</strong>
                <p>{pack.observation}</p>
                <p>prediction: {pack.choices.find((choice) => choice.id === prediction)?.label}</p>
                <button onClick={() => advance("teach")}>Explain again</button>
              </div>
            )}
          </section>
        )}

        {stage === "teach" && (
          <section className="stage" aria-busy={loading}>
            <h3>6. Teach the model back</h3>
            <p>Describe the relevant causes and relationships in your own words.</p>
            <label>
              Revised reasoning
              <textarea
                value={teach}
                onChange={(event) => setTeach(event.target.value)}
                placeholder="What relationship did the test isolate?"
              />
            </label>
            {error && <p role="alert" className="error">ERROR: {error}</p>}
            <button
              disabled={loading || teach.trim().length < 12}
              onClick={async () => {
                const result = await verify("teach_back", teach);
                if (!result) return;
                setTeachAnalysis(result.analysis);
                setTeachVerification(result.verification);
                advance("repair");
              }}
            >
              {loading ? "Checking repair…" : "Verify repair"}
            </button>
          </section>
        )}

        {stage === "repair" && (
          <section className="stage">
            <h3>7. Repair trace</h3>
            <ReasoningDump
              pack={pack}
              edges={after}
              before={before}
              missing={teachVerification?.requiredMet === false}
            />
            <h4>{teachValid ? "Required relations mapped." : "One relationship still needs revision."}</h4>
            <pre>{`removed=${diff.removed.map((edge) => `${edge.source}->${edge.target}`).join(",") || "none"}
added=${diff.added.map((edge) => `${edge.source}->${edge.target}`).join(",") || "none"}
evidence=${teachVerification?.exactEvidence ? "valid" : "not_valid"}
contradiction=${teachVerification?.contradiction ? "true" : "false"}`}</pre>
            {teachValid
              ? <button onClick={() => advance("transfer")}>Test transfer</button>
              : <button onClick={() => advance("teach")}>Revise explanation</button>}
          </section>
        )}

        {stage === "transfer" && (
          <section className="stage" aria-busy={loading}>
            <h3>8. Transfer to a changed context</h3>
            <p>{pack.transfer.question}</p>
            <fieldset>
              <legend>answer</legend>
              {pack.transfer.choices.map((choice) => (
                <label className="choice" key={choice.id}>
                  <input
                    type="radio"
                    name="transfer"
                    checked={transfer === choice.id}
                    onChange={() => setTransfer(choice.id)}
                  />
                  {choice.label}
                </label>
              ))}
            </fieldset>
            <label>
              Why?
              <textarea
                value={transferWhy}
                onChange={(event) => setTransferWhy(event.target.value)}
                placeholder="State the causal relationship."
              />
            </label>
            {attempts > 0 && <p className="error">The answer alone is not enough. Use this pack&apos;s causal relation.</p>}
            {error && <p role="alert" className="error">ERROR: {error}</p>}
            <button
              disabled={loading || !transfer || transferWhy.length < 12}
              onClick={async () => {
                const result = await verify("transfer", transferWhy, transfer);
                if (!result) return;
                setTransferVerification(result.verification);
                if (result.verification.success) advance("report");
                else setAttempts((count) => count + 1);
              }}
            >
              {loading ? "Checking transfer…" : "Verify transfer"}
            </button>
          </section>
        )}

        {stage === "report" && (
          <section className="stage">
            <h3>Method repaired. Transfer verified.</h3>
            <table>
              <tbody>
                <tr><th>pack</th><td>{pack.title}</td></tr>
                <tr><th>initial answer</th><td>{pack.choices.find((choice) => choice.id === answer)?.label} ({correct ? "correct" : "incorrect"})</td></tr>
                <tr><th>initial method</th><td>{analysis?.summary}</td></tr>
                <tr><th>evidence</th><td>{analysis?.edges[0]?.evidence || "no fault edge"}</td></tr>
                <tr><th>intervention</th><td>prediction + deterministic simulation</td></tr>
                <tr><th>transfer</th><td>{transferVerification?.success ? "answer and method verified" : "incomplete"}</td></tr>
                <tr><th>inference mode</th><td>cached analysis, live validation</td></tr>
                <tr><th>session id</th><td>local-{pack.id}-v1</td></tr>
              </tbody>
            </table>
            <p><Link href={`/report/local-${pack.id}-v1`}>Open report view</Link></p>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}

function GraphText({ pack, edges }) {
  return (
    <details>
      <summary>graph text alternative</summary>
      <ul>
        {edges.length ? edges.map((edge, index) => (
          <li key={index}>
            {pack.concepts.find((concept) => concept.id === edge.source)?.label}
            {" -- "}{edge.type.replaceAll("_", " ")}{" -> "}
            {pack.concepts.find((concept) => concept.id === edge.target)?.label}.
            evidence: &quot;{edge.evidence}&quot;
          </li>
        )) : <li>no validated learner relation was extracted</li>}
      </ul>
    </details>
  );
}

function ReasoningDump({ pack, edges, before = [], missing = false }) {
  const edgeKey = (edge) => `${edge.source}:${edge.target}:${edge.type}`;
  const current = new Set(edges.map(edgeKey));
  const previous = new Set(before.map(edgeKey));
  const removed = before.filter((edge) => !current.has(edgeKey(edge)));

  const lines = [
    "reasoning_graph {",
    ...pack.concepts.map((concept) => `  node ${concept.id} = "${concept.label}"`),
    ...removed.map((edge) => `  - ${edge.source} --${edge.type}--> ${edge.target}`),
    ...edges.map((edge) => {
      const invalid = pack.forbidden.some((item) => edgeKey(item) === edgeKey(edge));
      const prefix = invalid ? "!" : previous.has(edgeKey(edge)) ? " " : "+";
      return `  ${prefix} ${edge.source} --${edge.type}--> ${edge.target}`;
    }),
    ...(missing ? pack.required.map((edge) => `  ? ${edge.source} --${edge.type}--> ${edge.target}`) : []),
    "}",
  ];

  return <pre className="debug-output">{lines.join("\n")}</pre>;
}

function Lab({ pack, ran, run }) {
  const vacuum = freeFallTime(20);
  const forces = collisionForces();
  const shot = projectileAt(.8);

  const diagram = pack.id === "vacuum-drop"
    ? `  o       O
  |       |
  v       v
--------------
floor / h=20m`
    : pack.id === "collision-forces"
      ? `[ TRUCK ] ---->  <---- [ CAR ]
            contact`
      : `ball ---->
          .
             .
                v gravity`;

  const output = pack.id === "vacuum-drop"
    ? `time_a=${vacuum.toFixed(2)}s
time_b=${vacuum.toFixed(2)}s
g=9.81m/s^2`
    : pack.id === "collision-forces"
      ? `truck_force=${forces.truck}N
car_force=${forces.car}N
magnitude=equal`
      : `ax=${shot.ax}m/s^2
ay=${shot.ay}m/s^2
x_at_0.8s=${shot.x.toFixed(1)}m`;

  return (
    <div>
      <pre className="ascii-diagram">{diagram}</pre>
      <button onClick={run}>{ran ? "Run again" : "Run simulation"}</button>
      <pre>{ran ? output : "simulation_status=not_run"}</pre>
    </div>
  );
}
