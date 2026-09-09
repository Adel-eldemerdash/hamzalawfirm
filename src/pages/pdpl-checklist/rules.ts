/**
 * The inference engine, from 03-INFERENCE-RULES.md.
 *
 * Every rule is condition -> output code. This module emits codes only; the
 * presentation layer turns codes into prose. No output may be produced that is
 * not defined in section 1 of that document, and the codes are permanent.
 *
 * Rule identifiers appear in comments so any output can be traced back to the
 * rule that produced it.
 */

import { Answers, values, has, is } from "./flow";
import { QUESTIONS, UNRESOLVED_VALUES } from "./questions";

export const RULE_SET_VERSION = "2026-08-29";

export interface Exclusion {
  code: string;
  title: string;
  body: string;
}

export interface Result {
  exclusion: Exclusion | null;
  role: string;
  roleQualified: boolean;
  primary: string;
  primaryHedged: boolean;
  supplementary: string[];
  registrations: string[];
  documents: string[];
  alreadyInPlace: string[];
  notices: string[];
  unresolved: string[];
  dpoCategory: string;
}

function add(list: string[], code: string) {
  if (list.indexOf(code) === -1) list.push(code);
}

// ---------------------------------------------------------------------------
// Section 2 — scope. Evaluated first; a firing exclusion ends the assessment.
// ---------------------------------------------------------------------------

export function screen(answers: Answers): Exclusion | null {
  // N1
  if (is(answers, "Q0.1", "paper")) {
    return {
      code: "N1",
      title: "On these answers, the PDPL does not apply to this data.",
      body:
        "The law governs personal data processed by electronic or technical means, wholly or partly. Data held entirely on paper falls outside it. Note that digitizing those records later — scanning them, entering them into a system, or putting them in a spreadsheet — brings them into scope from that point.",
    };
  }

  // N2 — excluded, unless the money transfer carve-out applies (N3)
  if (has(answers, "Q0.2", "bank") && !has(answers, "Q0.2", "moneyTransfer")) {
    return {
      code: "N2",
      title: "On these answers, you are excluded from the scope of the law.",
      body:
        "Banks and entities subject to the oversight and supervision of the Central Bank of Egypt are excluded from the scope of the annexed law. The Central Bank’s own rules on handling personal data apply to you instead.",
    };
  }

  // N4
  if (has(answers, "Q0.2", "media")) {
    return {
      code: "N4",
      title: "On these answers, you are excluded from the scope of the law.",
      body:
        "A press or media entity is excluded where the processing is carried out exclusively for that purpose. The exclusion is conditional: the data must be accurate, and it must not be used for any purpose other than the media purpose. If either condition fails, the exclusion does not hold.",
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Sections 3 to 11
// ---------------------------------------------------------------------------

export function infer(answers: Answers): Result {
  const supplementary: string[] = [];
  const registrations: string[] = [];
  const documents: string[] = [];
  const alreadyInPlace: string[] = [];
  const notices: string[] = [];

  const exclusion = screen(answers);
  if (exclusion) {
    return {
      exclusion: exclusion,
      role: "",
      roleQualified: false,
      primary: "",
      primaryHedged: false,
      supplementary: supplementary,
      registrations: registrations,
      documents: documents,
      alreadyInPlace: alreadyInPlace,
      notices: notices,
      unresolved: [],
      dpoCategory: "",
    };
  }

  // N3 — in scope with dual subjection
  if (has(answers, "Q0.2", "moneyTransfer")) add(notices, "N3");
  // N6a — territorial reach
  if (has(answers, "Q0.4", "egyptianOutside") || has(answers, "Q0.4", "foreignInside")) {
    add(notices, "N6a");
  }
  // N7 — in-country representative
  if (has(answers, "Q0.3", "foreignNoBranch")) add(registrations, "REG-REP");

  // ---- Section 3: role -----------------------------------------------------
  const isController = values(answers, "Q2.1").length > 0; // R1
  const isProcessor =
    is(answers, "Q1.1", "yes") ||
    is(answers, "Q1.2", "yes") ||
    // W5a — an inbound entrustment confirms processor status
    is(answers, "Q8.4", "contractWithClauses") ||
    is(answers, "Q8.4", "contractNoClauses") ||
    is(answers, "Q8.4", "noContract");

  let role = "ROLE-C";
  if (isController && isProcessor) role = "ROLE-CP"; // R3
  else if (isProcessor) role = "ROLE-P"; // R2
  // R4 — controller established, processor status uncertain
  const roleQualified = is(answers, "Q1.1", "unsure") && !isProcessor;

  // ---- Section 4: primary instrument --------------------------------------
  const naturalPerson = has(answers, "Q0.2", "soleTrader");
  const temporary = is(answers, "Q4.1", "temporary");
  const overOneYear = is(answers, "Q4.2", "over1y");
  let primary: string;
  let primaryHedged = false;

  if (has(answers, "Q0.2", "association") || has(answers, "Q0.2", "club")) {
    primary = "BAS-SPECIAL"; // N5
  } else if (naturalPerson) {
    primary = "BAS-P"; // B1 — a natural person may hold a permit only
  } else if (temporary && !overOneYear) {
    primary = "BAS-P"; // B5
  } else if (temporary && overOneYear) {
    // B5b — a permit may not exceed one calendar year
    primary = role === "ROLE-CP" ? "BAS-L-CP" : role === "ROLE-P" ? "BAS-L-P" : "BAS-L-C";
    add(notices, "B5b");
  } else {
    // B2 / B3 / B4
    primary = role === "ROLE-CP" ? "BAS-L-CP" : role === "ROLE-P" ? "BAS-L-P" : "BAS-L-C";
    if (is(answers, "Q4.1", "unsure")) {
      primaryHedged = true; // B6
      add(notices, "B6");
    }
  }
  add(notices, "B7"); // unconditional footnote

  // ---- Section 5: sensitive data ------------------------------------------
  const sensitive = values(answers, "Q2.2").filter(function (v) {
    return v !== "none" && v !== "unsure";
  });
  if (sensitive.length) {
    add(supplementary, "SENS"); // S1
    add(documents, "SENS-CONSENT");
    add(documents, "SENS-REG");
  }
  if (has(answers, "Q2.2", "children")) {
    add(notices, "S4"); // unconditional children's notice
    if (is(answers, "Q2.3", "under15") || is(answers, "Q2.3", "both")) {
      add(documents, "DOC-CONS-CHILD"); // S2
    }
    if (is(answers, "Q2.3", "15to18") || is(answers, "Q2.3", "both")) {
      add(notices, "S3");
    }
  }
  if (is(answers, "Q2.4", "yes")) {
    add(documents, "DOC-DPIA"); // S5
    add(notices, "S5");
  }
  if (is(answers, "Q2.5", "yes") || is(answers, "Q2.5", "planned")) {
    add(documents, "DOC-AI"); // S6
  }

  // ---- Section 6: cross-border --------------------------------------------
  const crossBorder =
    has(answers, "Q5.1", "cloud") ||
    has(answers, "Q5.1", "outsideEgypt") ||
    is(answers, "Q5.2", "outsideEgypt") ||
    is(answers, "Q5.2", "distributed") ||
    is(answers, "Q5.3", "yes");

  if (crossBorder) {
    add(supplementary, "SUP-XB"); // X1
    add(documents, "DOC-TIA"); // X4
    add(notices, "X4");
    add(notices, "X6");
    if (is(answers, "Q5.4", "yes") || is(answers, "Q5.4", "both")) {
      add(notices, "X2");
      if (primary === "BAS-P") add(notices, "X3");
    }
    if (is(answers, "Q5.2", "unknown")) add(notices, "X5");
  }

  // ---- Section 7: direct electronic marketing -----------------------------
  const marketing = !is(answers, "Q6.1", "no") && values(answers, "Q6.1").length > 0;
  if (marketing) {
    if (is(answers, "Q6.2", "self") || is(answers, "Q6.2", "both")) {
      add(supplementary, "SUP-MKT-SELF"); // M1 / M3
    }
    if (is(answers, "Q6.2", "thirdParty") || is(answers, "Q6.2", "both")) {
      add(supplementary, "SUP-MKT-3P"); // M2 / M3
    }
    const anyMkt =
      supplementary.indexOf("SUP-MKT-SELF") !== -1 ||
      supplementary.indexOf("SUP-MKT-3P") !== -1;
    if (anyMkt) {
      add(notices, "M4");
      add(notices, "M9");
    }
    if (has(answers, "Q6.3", "publicSources") || has(answers, "Q6.3", "purchased")) {
      add(notices, "M5");
    }
    if (values(answers, "Q6.4").length && !is(answers, "Q6.4", "allThree")) add(notices, "M6");
    if (is(answers, "Q6.5", "no")) add(notices, "M7");
    if (is(answers, "Q6.6", "no")) add(documents, "DOC-MKT-REC"); // M8
  }

  // ---- Section 8: visual surveillance -------------------------------------
  if (is(answers, "Q7.1", "yes")) {
    const publicPlace =
      has(answers, "Q7.2", "publicAreas") || has(answers, "Q7.2", "perimeter");
    if (publicPlace) add(supplementary, "SUP-CCTV"); // V1

    // V2 — residential units are excluded by the express text of ER Art. 31.
    // The option that fed this rule was removed from Q7.2 on the client's
    // instruction of September 9, 2026, so the rule can no longer fire. It is
    // left here, inert, because the exclusion itself still stands in law and
    // the rule becomes live again the moment the option returns.
    const only = values(answers, "Q7.2");
    if (only.length === 1 && only[0] === "residential") add(notices, "V2");

    if (is(answers, "Q7.3", "no")) {
      add(documents, "DOC-VISITOR"); // V3
      add(notices, "V3");
    }
    if (is(answers, "Q7.4", "yes")) add(notices, "V4");
    if (is(answers, "Q7.5", "yes")) add(notices, "V5");
    if (has(answers, "Q7.2", "staffAreas")) add(notices, "V6");
  }

  // ---- Section 9: DPO ------------------------------------------------------
  if (!naturalPerson) {
    add(registrations, "REG-DPO"); // D1
  } else {
    add(notices, "D2");
  }
  if (is(answers, "Q9.1", "no") || !is(answers, "Q9.2", "yes")) {
    add(registrations, "REG-DPO"); // D3
    add(documents, "DOC-DPO-CHART");
  }
  if (is(answers, "Q9.3", "external")) add(notices, "D4");
  if (is(answers, "Q9.3", "shared")) {
    add(registrations, "DPO-SHARED"); // D5
    add(notices, "D5");
  }
  add(notices, "D6");
  add(notices, "D7");
  if (sensitive.length) add(notices, "D8");

  // D9 / D10 / D11 — category by record band
  const band = values(answers, "Q3.1")[0] || "";
  let dpoCategory = "";
  if (band === "b5" || band === "b6" || band === "b7" || band === "b8") dpoCategory = "DPO-A";
  else if (band === "b2" || band === "b3" || band === "b4") dpoCategory = "DPO-B";
  else if (band === "b1") dpoCategory = "DPO-C";
  if (dpoCategory) {
    add(registrations, dpoCategory);
    if (dpoCategory === "DPO-A" || dpoCategory === "DPO-B") add(notices, "D12");
  }
  add(notices, "D13"); // always present the category as likely, not settled
  add(notices, "D14");

  // ---- Section 10: documents and obligations ------------------------------
  // W1 — always
  ["DOC-POLICY", "DOC-CONSENT", "DOC-RETENTION", "DOC-DSR", "DOC-BREACH", "DOC-TRAIN", "DOC-COMPLAINT"].forEach(
    function (c) {
      add(documents, c);
    }
  );
  // W2
  if (role === "ROLE-C" || role === "ROLE-CP") add(documents, "DOC-ROPA");
  if (role === "ROLE-P" || role === "ROLE-CP") add(documents, "DOC-PROCREC");
  // W3
  if (has(answers, "Q2.1", "employees")) add(documents, "DOC-CONS-EMP");
  if (has(answers, "Q2.1", "applicants")) add(documents, "DOC-CONS-CAND");
  if (has(answers, "Q2.1", "premisesVisitors")) add(documents, "DOC-VISITOR");
  // W4
  const hasChannel = values(answers, "Q10.1").length > 0 && !has(answers, "Q10.1", "none");
  if (hasChannel) {
    add(documents, "DOC-WEBPRIV");
    if (is(answers, "Q10.3", "yes")) {
      add(documents, "DOC-COOKIE");
      add(notices, "W4-cookie");
    }
  }
  // W5
  if (is(answers, "Q8.1", "yes")) {
    add(documents, "DOC-DPA");
    if (!is(answers, "Q8.2", "all")) add(notices, "W5-priority");
  }
  // W5a
  if (
    (is(answers, "Q8.4", "contractNoClauses") || is(answers, "Q8.4", "noContract"))
  ) {
    add(documents, "DOC-DPA");
    add(notices, "W5a");
  }
  // W5b
  if (is(answers, "Q8.3", "no")) add(notices, "W5b");
  // W7 — unconditional breach timelines
  add(notices, "W7");
  // W8
  if (is(answers, "Q11.2", "no")) add(notices, "W8");
  // W8a
  if (!is(answers, "Q10.4", "dedicatedForm") && !is(answers, "Q10.4", "controlPanel")) {
    add(documents, "DOC-DSR");
    add(registrations, "APP-MECH-DSR");
  }
  // W9
  if (is(answers, "Q11.3", "yes")) add(notices, "W9");
  // W10 — always
  add(registrations, "APP-MECH");
  // W11
  if (is(answers, "Q11.4", "yes")) add(notices, "W11");

  // ---- Section 11: consultancy accreditation ------------------------------
  if (!is(answers, "Q12.1", "no") && values(answers, "Q12.1").length) {
    if (is(answers, "Q12.2", "legalPerson") || is(answers, "Q12.2", "both")) {
      add(registrations, "ACC-LEG"); // A1
      add(notices, "A3");
    }
    if (is(answers, "Q12.2", "individuals") || is(answers, "Q12.2", "both")) {
      add(registrations, "ACC-NAT"); // A2
    }
  }

  // ---- W6 — deduct what is already in place -------------------------------
  const inPlace: { [option: string]: string } = {
    policy: "DOC-POLICY",
    notice: "DOC-WEBPRIV",
    ropa: "DOC-ROPA",
    dsrProc: "DOC-DSR",
    breachProc: "DOC-BREACH",
    retention: "DOC-RETENTION",
    consentForms: "DOC-CONSENT",
    training: "DOC-TRAIN",
  };
  values(answers, "Q11.1").forEach(function (v) {
    const code = inPlace[v];
    if (code) add(alreadyInPlace, code);
  });
  // W4 — an existing published notice becomes "review it", not "produce it"
  if (hasChannel && is(answers, "Q10.2", "yes")) add(alreadyInPlace, "DOC-WEBPRIV");

  const remainingDocuments = documents.filter(function (c) {
    return alreadyInPlace.indexOf(c) === -1;
  });

  // ---- Section 12: "Not sure" ---------------------------------------------
  const unresolved: string[] = [];
  QUESTIONS.forEach(function (q) {
    const v = values(answers, q.id);
    if (v.some(function (x) { return UNRESOLVED_VALUES.indexOf(x) !== -1; })) {
      unresolved.push(q.id);
    }
  });

  return {
    exclusion: null,
    role: role,
    roleQualified: roleQualified,
    primary: primary,
    primaryHedged: primaryHedged,
    supplementary: supplementary,
    registrations: registrations,
    documents: remainingDocuments,
    alreadyInPlace: alreadyInPlace,
    notices: notices,
    unresolved: unresolved,
    dpoCategory: dpoCategory,
  };
}
