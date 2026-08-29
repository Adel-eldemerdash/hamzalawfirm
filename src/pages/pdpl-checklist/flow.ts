/**
 * Which questions this visitor actually sees.
 *
 * The bank holds 47 questions; a given visitor should see 20 to 25. Branching
 * is what makes the difference, so it is implemented exactly as specified in
 * 01-TOOL-SPEC.md section 4.
 */

import { QUESTIONS, Question, Option, QUESTIONS_BY_ID } from "./questions";

export type Answers = { [questionId: string]: string | string[] };

function values(answers: Answers, id: string): string[] {
  const v = answers[id];
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

function has(answers: Answers, id: string, value: string): boolean {
  return values(answers, id).indexOf(value) !== -1;
}

function is(answers: Answers, id: string, value: string): boolean {
  const v = values(answers, id);
  return v.length === 1 && v[0] === value;
}

function answered(answers: Answers, id: string): boolean {
  return values(answers, id).length > 0;
}

/**
 * Presentation order.
 *
 * Group 4 is presented before Group 3 because Q3.2 is conditional on Q4.1,
 * which the spec permits and which keeps Q3.1 and Q3.2 adjacent. The question
 * identifiers are unaffected.
 */
export const GROUP_ORDER = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9, 10, 11, 12];

export function isVisible(question: Question, answers: Answers): boolean {
  switch (question.id) {
    // ---- question-level conditions ----
    case "Q2.3":
      return has(answers, "Q2.2", "children");

    case "Q3.2":
      return (
        is(answers, "Q4.1", "temporary") &&
        (is(answers, "Q3.1", "b1") || is(answers, "Q3.1", "b2"))
      );

    case "Q4.2":
      return is(answers, "Q4.1", "temporary");

    case "Q5.4":
      return is(answers, "Q5.3", "yes");

    case "Q12.2":
      return answered(answers, "Q12.1") && !is(answers, "Q12.1", "no");

    // ---- group-level conditions ----
    case "Q6.2":
    case "Q6.3":
    case "Q6.4":
    case "Q6.5":
    case "Q6.6":
      return answered(answers, "Q6.1") && !is(answers, "Q6.1", "no");

    case "Q7.2":
    case "Q7.3":
    case "Q7.4":
    case "Q7.5":
      return is(answers, "Q7.1", "yes");

    case "Q8.2":
    case "Q8.3":
      return is(answers, "Q8.1", "yes");

    case "Q9.2":
    case "Q9.3":
      return answered(answers, "Q9.1") && !is(answers, "Q9.1", "no");

    case "Q10.2":
    case "Q10.3":
    case "Q10.4":
      return answered(answers, "Q10.1") && !has(answers, "Q10.1", "none");

    default:
      return true;
  }
}

/**
 * Q3.2 carries two option sets and the applicable one depends on Q3.1. The
 * "Not known" option is common to both.
 */
export function optionsFor(question: Question, answers: Answers): Option[] {
  if (question.id !== "Q3.2") return question.options;

  const wanted = is(answers, "Q3.1", "b1")
    ? ["u25k", "25kTo100k", "unknown"]
    : ["100kTo250k", "250kTo500k", "unknown"];

  return question.options.filter(function (o) {
    return wanted.indexOf(o.value) !== -1;
  });
}

/** Every question reachable on the answers given so far, in presentation order. */
export function reachable(answers: Answers): Question[] {
  const out: Question[] = [];
  GROUP_ORDER.forEach(function (g) {
    QUESTIONS.forEach(function (q) {
      if (q.group === g && isVisible(q, answers)) out.push(q);
    });
  });
  return out;
}

/**
 * The screens, one group per screen, in presentation order. A group with no
 * currently visible question is dropped rather than shown empty.
 */
export function screens(answers: Answers): { group: number; questions: Question[] }[] {
  const out: { group: number; questions: Question[] }[] = [];
  GROUP_ORDER.forEach(function (g) {
    const qs = QUESTIONS.filter(function (q) {
      return q.group === g && isVisible(q, answers);
    });
    if (qs.length) out.push({ group: g, questions: qs });
  });
  return out;
}

/**
 * Progress, computed from the currently reachable set rather than the full
 * bank, and recomputed on every answer. Groups are skipped as the visitor
 * answers, so a denominator taken from all 47 would run backwards.
 */
export function progress(answers: Answers): { answered: number; total: number; percent: number } {
  const rs = reachable(answers);
  const done = rs.filter(function (q) {
    return answered(answers, q.id);
  }).length;
  return {
    answered: done,
    total: rs.length,
    percent: rs.length ? Math.round((done / rs.length) * 100) : 0,
  };
}

/** Answers left over from a branch the visitor has since navigated away from. */
export function pruneUnreachable(answers: Answers): Answers {
  const live = reachable(answers).map(function (q) {
    return q.id;
  });
  const out: Answers = {};
  Object.keys(answers).forEach(function (id) {
    if (live.indexOf(id) !== -1) out[id] = answers[id];
  });
  return out;
}

/** True when every visible question on the screen has an answer. */
export function screenComplete(questions: Question[], answers: Answers): boolean {
  return questions.every(function (q) {
    return answered(answers, q.id);
  });
}

export { values, has, is, answered, QUESTIONS_BY_ID };
