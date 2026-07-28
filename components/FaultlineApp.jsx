"use client";

import { useState } from "react";
import Link from "next/link";
import { graphDiff } from "@/lib/domain/graph-validator";
import SiteFooter from "@/components/SiteFooter";
import {
  ChoiceFieldset,
  ProgressStatus,
  ReasoningDump,
  SimulationPanel,
  StageActions,
} from "@/components/LearningParts";

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
        <header className="learning-header">
          <h1><Link href="/">FAULTLINE</Link></h1>
          <ProgressStatus stages={stages} current={stage} />
          <p><strong>Cached analysis, live validation</strong></p>
        </header>

        <section className="pack-summary">
          <p>pack_id: {pack.id}</p>
          <h2>{pack.title}</h2>
          <p>{pack.problem}</p>
          {demo && <p className="notice">demo mode: inputs are preloaded, checks are still live</p>}
        </section>

        {stage === "answer" && (
          <section className="stage">
            <h3>1. Commit to an answer</h3>
            <ChoiceFieldset
              legend="Choose before seeing the analysis."
              name="answer"
              choices={pack.choices}
              value={answer}
              onChange={setAnswer}
            />
            {!answer && <p className="requirement">Choose an answer to continue.</p>}
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
            {explanation.trim().length < 8 && <p className="requirement">Write at least 8 characters about the cause.</p>}
            <StageActions onBack={() => advance("answer")}>
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
            </StageActions>
          </section>
        )}

        {stage === "graph" && analysis && (
          <section className="stage">
            <h3>3. Analysis output</h3>
            <p className={correct ? "success" : "error"}>
              answer_selected={correct ? "correct" : "incorrect"}
            </p>
            <h4>{analysis.decision === "diagnose" ? "unsupported relationship found" : "analysis status"}</h4>
            <p>{analysis.summary}</p>
            {analysis.edges[0] && <blockquote>{analysis.edges[0].evidence}</blockquote>}
            <dl>
              <dt>confidence</dt><dd>{Math.round(analysis.confidence * 100)}% fixture</dd>
              <dt>validation</dt><dd>live deterministic checks</dd>
            </dl>
            <ReasoningDump pack={pack} edges={before} />
            <StageActions onBack={() => advance("explain")}>
              <button onClick={() => advance("predict")}>Make prediction</button>
            </StageActions>
          </section>
        )}

        {stage === "predict" && (
          <section className="stage">
            <h3>4. Prediction gate</h3>
            <p>{pack.prediction}</p>
            <ChoiceFieldset
              legend="prediction"
              name="prediction"
              choices={pack.choices}
              value={prediction}
              onChange={setPrediction}
            />
            {!prediction && <p className="requirement">Select a prediction to unlock the simulation.</p>}
            <StageActions onBack={() => advance("graph")}>
              <button disabled={!prediction} onClick={() => advance("lab")}>Unlock simulation</button>
            </StageActions>
          </section>
        )}

        {stage === "lab" && (
          <section className="stage">
            <h3>5. Local simulation</h3>
            <SimulationPanel
              pack={pack}
              ran={ran}
              run={() => setRan(true)}
              reset={() => setRan(false)}
            />
            {ran && (
              <div className="success-box">
                <strong>Observed result</strong>
                <p>{pack.observation}</p>
                <dl className="comparison">
                  <dt>your prediction</dt>
                  <dd>{pack.choices.find((choice) => choice.id === prediction)?.label}</dd>
                  <dt>observed</dt>
                  <dd>{pack.observation}</dd>
                </dl>
                <StageActions onBack={() => advance("predict")}>
                  <button onClick={() => advance("teach")}>Explain again</button>
                </StageActions>
              </div>
            )}
            {!ran && <StageActions onBack={() => advance("predict")} />}
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
            {teach.trim().length < 12 && <p className="requirement">Write at least 12 characters about the tested relationship.</p>}
            <StageActions onBack={() => advance("lab")}>
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
            </StageActions>
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
            <StageActions onBack={teachValid ? () => advance("teach") : undefined}>
              {teachValid
                ? <button onClick={() => advance("transfer")}>Test transfer</button>
                : <button onClick={() => advance("teach")}>Revise explanation</button>}
            </StageActions>
          </section>
        )}

        {stage === "transfer" && (
          <section className="stage" aria-busy={loading}>
            <h3>8. Transfer to a changed context</h3>
            <p>{pack.transfer.question}</p>
            <ChoiceFieldset
              legend="answer"
              name="transfer"
              choices={pack.transfer.choices}
              value={transfer}
              onChange={setTransfer}
            />
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
            {(!transfer || transferWhy.length < 12) && <p className="requirement">Choose an answer and explain why in at least 12 characters.</p>}
            <StageActions onBack={() => advance("repair")}>
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
            </StageActions>
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
