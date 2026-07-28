import { freeFallTime, collisionForces, projectileAt } from "@/lib/domain/physics";

export function ProgressStatus({ stages, current }) {
  const index = stages.indexOf(current);
  return (
    <div className="progress-status">
      <label htmlFor="learning-progress">step {index + 1} of {stages.length}: {current.replaceAll("_", " ")}</label>
      <progress id="learning-progress" max={stages.length} value={index + 1}>
        {index + 1} of {stages.length}
      </progress>
    </div>
  );
}

export function ChoiceFieldset({ legend, name, choices, value, onChange }) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {choices.map((choice) => (
        <label className="choice" key={choice.id}>
          <input
            type="radio"
            name={name}
            value={choice.id}
            checked={value === choice.id}
            onChange={() => onChange(choice.id)}
          />
          {choice.label}
        </label>
      ))}
    </fieldset>
  );
}

export function StageActions({ backLabel = "Previous step", onBack, children }) {
  return (
    <div className="stage-actions">
      {onBack && <button type="button" className="secondary-action" onClick={onBack}>{backLabel}</button>}
      {children}
    </div>
  );
}

export function ReasoningDump({ pack, edges, before = [], missing = false }) {
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

  return (
    <details className="technical-details">
      <summary>raw reasoning graph</summary>
      <p><small>legend: + added / - removed / ! unsupported / ? required but missing</small></p>
      <pre className="debug-output">{lines.join("\n")}</pre>
      <GraphText pack={pack} edges={edges} />
    </details>
  );
}

function GraphText({ pack, edges }) {
  return (
    <details>
      <summary>plain text graph</summary>
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

export function SimulationPanel({ pack, ran, run }) {
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

  const input = pack.id === "vacuum-drop"
    ? "height=20m / vacuum=true / g=9.81m/s^2"
    : pack.id === "collision-forces"
      ? "contact_force=12000N / directions=opposite"
      : "sample_time=0.8s / air_resistance=false";

  const output = pack.id === "vacuum-drop"
    ? `time_a=${vacuum.toFixed(2)}s
time_b=${vacuum.toFixed(2)}s
result=landing_times_equal`
    : pack.id === "collision-forces"
      ? `truck_force=${forces.truck}N
car_force=${forces.car}N
result=magnitudes_equal`
      : `ax=${shot.ax}m/s^2
ay=${shot.ay}m/s^2
x_at_0.8s=${shot.x.toFixed(1)}m`;

  return (
    <div className="simulation-panel">
      <p><strong>model input:</strong> {input}</p>
      <pre className="ascii-diagram">{diagram}</pre>
      <button onClick={run}>{ran ? "Run again" : "Run simulation"}</button>
      <details open={ran}>
        <summary>simulation output</summary>
        <pre>{ran ? output : "simulation_status=not_run"}</pre>
      </details>
    </div>
  );
}
