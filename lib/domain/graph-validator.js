export const evidenceIsExact = (text, evidence) => Boolean(evidence.trim()) && text.toLowerCase().includes(evidence.toLowerCase());
export const normalizeLearnerInput = (text) => text.replace(/\s+/g, " ").trim().slice(0, 1600);
export const validateEdges = (pack, edges, text, required = pack.required, forbidden = pack.forbidden) => {
    const ids = new Set(pack.concepts.map((c) => c.id));
    const relationTypes = new Set(["causes", "equal_to", "opposes", "has_acceleration", "has_no_acceleration"]);
    const valid = edges.filter((e) => ids.has(e.source) && ids.has(e.target) && relationTypes.has(e.type) && evidenceIsExact(text, e.evidence));
    const key = (e) => `${e.source}:${e.target}:${e.type}`;
    const has = (e) => valid.some((x) => key(x) === key(e));
    return { valid, requiredMet: required.every(has), forbiddenFound: forbidden.some(has), invalidCount: edges.length - valid.length };
};
export const graphDiff = (before, after) => { const key = (e) => `${e.source}:${e.target}:${e.type}`; return { removed: before.filter((b) => !after.some((a) => key(a) === key(b))), added: after.filter((a) => !before.some((b) => key(a) === key(b))), retained: after.filter((a) => before.some((b) => key(a) === key(b))) }; };
