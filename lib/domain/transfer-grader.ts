import type { Pack } from "@/content/packs";
export const gradeTransfer = (pack: Pack, answer: string, reasoning: string) => ({ correct: answer === pack.transfer.correctAnswer, methodValid: /same acceleration|equal and opposite|zero horizontal|gravity.*vertical|no horizontal/i.test(reasoning), incomplete: reasoning.trim().length < 12 });
