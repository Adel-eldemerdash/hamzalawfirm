/**
 * Language-aware lookup.
 *
 * The engine works only in codes, and both languages are keyed by those same
 * codes, so switching language re-renders the page without re-running a rule
 * or changing a stored answer.
 *
 * English is the fallback throughout: if an Arabic entry is ever missing, the
 * visitor sees the English rather than an empty element.
 */

import { isArabic } from "./i18n";
import { Question, Option } from "./questions";
import { AR_QUESTIONS, AR_GROUP_TITLES } from "./questions.ar";
import {
  ROLES, ROLE_QUALIFIER, PRIMARY, PRIMARY_EXCLUSIVITY, SUPPLEMENTARY,
  SUPPLEMENTARY_PREREQUISITE, REGISTRATIONS, DOCUMENTS, NOTICES, TIMELINES,
  DISCLAIMER_PARAGRAPHS, FEE_CEILINGS, primaryFee, Item, FeeLine,
} from "./content";
import {
  AR_ROLES, AR_ROLE_QUALIFIER, AR_PRIMARY, AR_PRIMARY_EXCLUSIVITY,
  AR_SUPPLEMENTARY, AR_SUPPLEMENTARY_PREREQUISITE, AR_REGISTRATIONS,
  AR_DOCUMENTS, AR_NOTICES, AR_TIMELINES, AR_DISCLAIMER_PARAGRAPHS,
  AR_FEE_CEILINGS, AR_LICENSE_FEE, AR_PERMIT_FEE_BY_Q32, AR_PERMIT_FEE_BY_BAND,
  AR_FEE_TEXT, AR_EXCLUSIONS, AR_GROUP_INTROS,
} from "./content.ar";

// ---- questions -------------------------------------------------------------

export function qText(q: Question): string {
  const ar = AR_QUESTIONS[q.id];
  return isArabic() && ar ? ar.text : q.text;
}

export function qHelper(q: Question): string {
  const ar = AR_QUESTIONS[q.id];
  if (isArabic() && ar && ar.helper) return ar.helper;
  return isArabic() ? "" : q.helper || "";
}

export function qNote(q: Question): string {
  const ar = AR_QUESTIONS[q.id];
  if (isArabic()) return ar && ar.note ? ar.note : "";
  return q.note || "";
}

export function oLabel(q: Question, o: Option): string {
  const ar = AR_QUESTIONS[q.id];
  const entry = ar && ar.options[o.value];
  return isArabic() && entry ? entry.label : o.label;
}

export function oExample(q: Question, o: Option): string {
  const ar = AR_QUESTIONS[q.id];
  const entry = ar && ar.options[o.value];
  if (isArabic()) return entry && entry.example ? entry.example : "";
  return o.example || "";
}

export function oFreeText(q: Question, o: Option): string {
  const ar = AR_QUESTIONS[q.id];
  const entry = ar && ar.options[o.value];
  if (isArabic() && entry && entry.freeText) return entry.freeText;
  return o.freeText || "";
}

export function groupTitle(index: number, fallback: string): string {
  const ar = AR_GROUP_TITLES[String(index)];
  return isArabic() && ar ? ar : fallback;
}

// ---- result content --------------------------------------------------------

function pick(code: string, en: { [k: string]: Item }, ar: { [k: string]: Item }): Item | undefined {
  if (isArabic() && ar[code]) return ar[code];
  return en[code];
}

export function roleItem(code: string) { return pick(code, ROLES, AR_ROLES); }
export function primaryItem(code: string) { return pick(code, PRIMARY, AR_PRIMARY); }
export function suppItem(code: string) { return pick(code, SUPPLEMENTARY, AR_SUPPLEMENTARY); }
export function regItem(code: string) { return pick(code, REGISTRATIONS, AR_REGISTRATIONS); }
export function docItem(code: string) { return pick(code, DOCUMENTS, AR_DOCUMENTS); }
export function noticeItem(code: string) { return pick(code, NOTICES, AR_NOTICES); }

export function roleQualifier() { return isArabic() ? AR_ROLE_QUALIFIER : ROLE_QUALIFIER; }
export function primaryExclusivity() { return isArabic() ? AR_PRIMARY_EXCLUSIVITY : PRIMARY_EXCLUSIVITY; }
export function supplementaryPrerequisite() { return isArabic() ? AR_SUPPLEMENTARY_PREREQUISITE : SUPPLEMENTARY_PREREQUISITE; }
export function feeCeilings() { return isArabic() ? AR_FEE_CEILINGS : FEE_CEILINGS; }
export function timelines() { return isArabic() ? AR_TIMELINES : TIMELINES; }
export function disclaimerParagraphs() { return isArabic() ? AR_DISCLAIMER_PARAGRAPHS : DISCLAIMER_PARAGRAPHS; }
export function exemptNote() {
  return isArabic()
    ? AR_FEE_TEXT.exemptNote
    : "Exemption from the fee is not exemption from the license, nor from any other obligation.";
}

/** Mirrors primaryFee in content.ts, on the Arabic tables. */
export function feeFor(primary: string, band: string, q32: string): FeeLine {
  if (!isArabic()) return primaryFee(primary, band, q32);

  if (primary === "BAS-SPECIAL") {
    return { amount: AR_FEE_TEXT.special, qualifier: AR_FEE_TEXT.specialQualifier, unresolved: true };
  }

  if (primary === "BAS-P") {
    if (band === "b1" || band === "b2") {
      if (q32 && AR_PERMIT_FEE_BY_Q32[q32]) return { amount: AR_PERMIT_FEE_BY_Q32[q32] };
      return {
        amount: band === "b1" ? AR_FEE_TEXT.straddleB1 : AR_FEE_TEXT.straddleB2,
        qualifier: AR_FEE_TEXT.straddleQualifier,
        unresolved: true,
      };
    }
    if (AR_PERMIT_FEE_BY_BAND[band]) return { amount: AR_PERMIT_FEE_BY_BAND[band] };
    return { amount: AR_FEE_TEXT.unknownPermit, qualifier: AR_FEE_TEXT.unknownPermitQualifier, unresolved: true };
  }

  if (!AR_LICENSE_FEE[band]) {
    return { amount: AR_FEE_TEXT.unknownLicense, qualifier: AR_FEE_TEXT.unknownLicenseQualifier, unresolved: true };
  }
  const half = primary === "BAS-L-C" || primary === "BAS-L-P";
  return {
    amount: AR_LICENSE_FEE[band],
    qualifier: half && band !== "b1" ? AR_FEE_TEXT.halfNote : undefined,
  };
}

/** Screening exits carry their own Arabic; the engine still emits the rule id. */
export function exclusionText(
  code: string,
  fallback: { title: string; body: string }
): { title: string; body: string } {
  const ar = AR_EXCLUSIONS[code];
  return isArabic() && ar ? ar : fallback;
}

export function groupIntro(index: number, fallback: string): string {
  const ar = AR_GROUP_INTROS[String(index)];
  if (isArabic()) return ar || "";
  return fallback;
}
