/**
 * The presentation layer for the inference engine.
 *
 * rules.ts emits output codes; this module turns a code into prose. Keeping
 * them apart is deliberate: the codes are the record stored in the database,
 * and prose changes without invalidating it.
 *
 * Fee figures come from the tables in 03-INFERENCE-RULES.md section 13. Both
 * bounds of a band are always shown. Never display an upper bound alone, and
 * never display any figure representing the firm's own professional fees.
 */

export const NOTICE_VERSION = "1.0";

export interface Item {
  title: string;
  body: string;
  /** Article citation shown beneath the item. */
  source?: string;
}

// ---------------------------------------------------------------------------
// Legal role
// ---------------------------------------------------------------------------

export const ROLES: { [code: string]: Item } = {
  "ROLE-C": {
    title: "You are a controller.",
    body: "You determine the purposes for which personal data is processed and the means of processing it. Anyone holding data about their own employees or customers is a controller as to that data.",
    source: "PDPL Art. 1",
  },
  "ROLE-P": {
    title: "You are a processor.",
    body: "You process personal data on behalf of another party and on that party’s instructions.",
    source: "PDPL Art. 1",
  },
  "ROLE-CP": {
    title: "You are both a controller and a processor.",
    body: "You are a controller as to your own employees, customers, and contacts, and a processor as to the data your clients entrust to you. The two roles carry different obligations and both apply to you.",
    source: "PDPL Art. 1",
  },
};

export const ROLE_QUALIFIER =
  "You are a controller. Whether you are also a processor requires examination.";

// ---------------------------------------------------------------------------
// Primary license or permit
// ---------------------------------------------------------------------------

export const PRIMARY: { [code: string]: Item } = {
  "BAS-L-CP": {
    title: "Combined controller and processor license",
    body: "A license covering both roles, issued to legal persons. Once issued it covers your processing operations whatever their nature or scope.",
    source: "ER Art. 19",
  },
  "BAS-L-C": {
    title: "Controller-only license",
    body: "A license for legal persons acting as controller only. The fee is half that of the combined license.",
    source: "ER Art. 19",
  },
  "BAS-L-P": {
    title: "Processor-only license",
    body: "A license for legal persons acting as processor only. The fee is half that of the combined license.",
    source: "ER Art. 19",
  },
  "BAS-P": {
    title: "Controller or processor permit",
    body: "A permit covers processing for a defined, temporary purpose not exceeding one calendar year. A natural person - a sole trader or an individual professional practice with no registered company - may hold a permit only, and may not hold a license.",
    source: "ER Arts. 20 and 22; Licenses and Permits Guideline, item 3",
  },
  "BAS-SPECIAL": {
    title: "License under the special schedule for associations and clubs",
    body: "Associations and clubs are assessed on their own fee schedule rather than the general one.",
    source: "ER Art. 19",
  },
};

export const PRIMARY_EXCLUSIVITY =
  "A license and a permit are alternatives. They are not held together.";

// ---------------------------------------------------------------------------
// Supplementary instruments
// ---------------------------------------------------------------------------

export const SUPPLEMENTARY: { [code: string]: Item } = {
  SENS: {
    title: "License or permit to handle sensitive personal data",
    body: "Issued according to your capacity - a license where you are eligible for one, a permit otherwise. It sits alongside your primary instrument.",
    source: "PDPL Arts. 12 and 26(6); ER Art. 14",
  },
  "SUP-XB": {
    title: "Cross-border transfer of personal data - 50% of the primary fee",
    body: "Covers transfer, storage, sharing, processing, and making data available outside Egypt. Cloud hosting on foreign servers falls within it, and so does making data available to another controller or processor within your own group.",
    source: "PDPL Art. 14; ER Arts. 23 to 27",
  },
  "SUP-MKT-SELF": {
    title: "Direct electronic marketing, own account - 10% of the primary fee",
    body: "Required where you send promotional messages for your own products and services.",
    source: "ER Art. 29",
  },
  "SUP-MKT-3P": {
    title: "Direct electronic marketing, third party - 25% of the primary fee",
    body: "Required where you send promotional messages on behalf of other clients.",
    source: "ER Art. 29",
  },
  "SUP-CCTV": {
    title: "Visual surveillance in public places",
    body: "EGP 1,000 for every three years under a license, or EGP 500 per year under a permit.",
    source: "ER Art. 31",
  },
};

export const SUPPLEMENTARY_PREREQUISITE =
  "Nothing supplementary may issue, or remain valid, without a valid primary license or permit.";

// ---------------------------------------------------------------------------
// Registrations and accreditations
// ---------------------------------------------------------------------------

export const REGISTRATIONS: { [code: string]: Item } = {
  "REG-DPO": {
    title: "Register a Data Protection Officer and obtain a DPO code",
    body: "The legal representative of a legal person must appoint a competent employee within its own legal entity and staffing structure, register that person in the PDPC register, and disclose the appointment publicly.",
    source: "PDPL Art. 8; ER Arts. 7 to 12",
  },
  "DPO-A": {
    title: "DPO Category A - Lead",
    body: "For 2,000,001 records and above.",
    source: "DPOC Guideline, Section I",
  },
  "DPO-B": {
    title: "DPO Category B - Advanced",
    body: "For 100,001 up to 2,000,000 records.",
    source: "DPOC Guideline, Section I",
  },
  "DPO-C": {
    title: "DPO Category C - Entry level",
    body: "For up to 100,000 records.",
    source: "DPOC Guideline, Section I",
  },
  "DPO-SHARED": {
    title: "Shared Data Protection Officer",
    body: "Requires the consent of every entity served, a binding contractual agreement defining scope and accountability, a separate system, direct reporting to the highest level of management in each entity, and the PDPC’s prior review and acceptance.",
    source: "ER Arts. 11 and 12(5); DPOC Guideline, Section II",
  },
  "REG-REP": {
    title: "Appoint a PDPC-approved representative inside Egypt",
    body: "Required of a foreign entity that has no branch or representative office in Egypt.",
    source: "ER Arts. 3(First)(6) and 4(First)(5)",
  },
  "ACC-NAT": {
    title: "Data protection consultancy accreditation - natural person",
    body: "EGP 5,000 per year for each consultant.",
    source: "ER Arts. 32 and 34",
  },
  "ACC-LEG": {
    title: "Data protection consultancy accreditation - legal person",
    body: "EGP 50,000 per year. The certificate is valid for three years.",
    source: "ER Arts. 33 and 34",
  },
  "APP-MECH": {
    title: "PDPC approval of your data collection and consent mechanisms",
    body: "Includes the mechanism for obtaining parental consent where children’s data is collected.",
    source: "ER Art. 2(First)(3)",
  },
  "APP-MECH-DSR": {
    title: "PDPC approval of the mechanism for exercising data subject rights",
    body: "A mechanism, approved by the PDPC, through which a person can request knowledge of and access to their data, withdraw consent, obtain correction or amendment, restrict processing to a defined scope, or object to processing.",
    source: "PDPL Art. 2; ER Art. 3(First)(5)",
  },
};

// ---------------------------------------------------------------------------
// Documents and obligations
// ---------------------------------------------------------------------------

export const DOCUMENTS: { [code: string]: Item } = {
  "DOC-POLICY": { title: "Data protection policy", body: "In two parts: governance - principles, roles and responsibilities, oversight body, segregation of duties, and a privacy risk management process; and operations - staff instructions on collecting, using, retaining, and sharing data.", source: "PDPL Arts. 4 and 5; ER Arts. 3 and 4" },
  "DOC-WEBPRIV": { title: "Website and application privacy notice", body: "Published where individuals can read it before their data is collected.", source: "PDPL Art. 3; ER Art. 2" },
  "DOC-COOKIE": { title: "Cookie policy", body: "With a consent mechanism that allows refusal as readily as acceptance.", source: "PDPL Art. 6; ER Art. 2" },
  "DOC-CONSENT": { title: "Consent management guidelines and mechanisms", body: "How consent is obtained, recorded, and withdrawn.", source: "PDPL Art. 6; ER Art. 2" },
  "DOC-CONS-EMP": { title: "Employee consent form", body: "", source: "PDPL Art. 6; ER Art. 2" },
  "DOC-CONS-CAND": { title: "Job applicant consent form", body: "", source: "PDPL Art. 6; ER Art. 2" },
  "DOC-CONS-CHILD": { title: "Parental consent mechanism and forms", body: "Written explicit consent from the guardian, obtained before collection, and stating the period for which it is given.", source: "PDPL Art. 12; ER Art. 15" },
  "DOC-VISITOR": { title: "Visitor privacy notice, including visual surveillance", body: "", source: "ER Arts. 2, 3, and 31" },
  "DOC-ROPA": { title: "Record of processing activities", body: "", source: "PDPL Art. 4; ER Art. 21(2)" },
  "DOC-PROCREC": { title: "Processor’s record of processing operations", body: "A copy of the processing contract is a required part of this record.", source: "ER Art. 4(Second)(3)" },
  "DOC-DSR": { title: "Data subject request procedure, forms, and logs", body: "", source: "PDPL Arts. 2 and 32; ER Art. 3(First)(5)" },
  "DOC-COMPLAINT": { title: "Complaint policy, form, and log", body: "", source: "PDPL Art. 33" },
  "DOC-BREACH": { title: "Breach management procedure, incident register, and notification form", body: "", source: "PDPL Art. 7; ER Arts. 5 and 6" },
  "DOC-RETENTION": { title: "Retention and erasure policy and schedule", body: "", source: "PDPL Art. 3; ER Art. 3(First)(4)" },
  "DOC-DPA": { title: "Data processing agreement and vendor risk management policy", body: "A processing agreement with every party that accesses data about individuals on your behalf.", source: "PDPL Arts. 4 and 5" },
  "DOC-TRAIN": { title: "Training and awareness program", body: "", source: "PDPL Art. 13; ER Art. 12" },
  "DOC-DPO-CHART": { title: "DPO charter, compliance monitoring procedure, and annual report", body: "", source: "PDPL Art. 9; ER Art. 12(1)" },
  "DOC-MKT-REC": { title: "Marketing consent records", body: "Kept for three years from the date of the last message sent.", source: "PDPL Art. 18; ER Art. 18(Second)(4)" },
  "DOC-DPIA": { title: "Data protection impact assessment methodology and template", body: "Interpretive: there is no express provision requiring it. It is inferred from ER Art. 3.", source: "Interpretive - inferred from ER Art. 3" },
  "DOC-TIA": { title: "Transfer impact assessment", body: "Interpretive: drawn from the PDPC compliance plan checklist rather than from an express provision.", source: "Interpretive - PDPC Compliance Plan Checklist, Section VI(h)" },
  "DOC-AI": { title: "Controls on using personal data to train artificial intelligence and emerging technologies", body: "", source: "ER Art. 4(First)(7)" },
  "SENS-CONSENT": { title: "Written explicit consent for sensitive personal data", body: "On paper or electronic.", source: "PDPL Art. 12; ER Art. 14" },
  "SENS-REG": { title: "Secured electronic records of consents and of erasure, amendment, and suspension requests", body: "", source: "PDPL Art. 12; ER Art. 14" },
};

// ---------------------------------------------------------------------------
// Notices
// ---------------------------------------------------------------------------

export const NOTICES: { [code: string]: Item } = {
  B7: { title: "If you already hold a license or permit", body: "If you already hold a valid license or permit from the PDPC, what is required is a review of whether its scope covers your actual activity and data volume - not a new application. You may apply to amend it when the nature of the activity, the scope of processing, or the data volume changes.", source: "PDPL Art. 28; Licenses and Permits Guideline, item 5.2" },
  N3: { title: "You are in scope, with dual subjection", body: "Money transfer and currency exchange companies are carved out of the exclusion that applies to entities under Central Bank supervision. The PDPL applies to you, and the rules laid down by the Central Bank on handling personal data are also to be observed in your regard.", source: "Promulgation Art. 3(6)" },
  N6a: { title: "Scope extends beyond Egypt’s borders", body: "Because you process data relating to Egyptian nationals residing abroad or foreign nationals residing in Egypt, the law reaches that data even where the processing itself occurs outside Egypt.", source: "Promulgation Art. 2" },
  B5b: { title: "A permit cannot cover your duration", body: "A permit may not exceed one calendar year. Because the period you expect is longer, the result above is presented as a license rather than a permit.", source: "ER Art. 20; PDPL Art. 1" },
  B6: { title: "This result is the more likely outcome, not a settled one", body: "You were not certain whether your processing is ongoing or temporary. An organization processing its employees’ or customers’ data in the ordinary course is ongoing by nature, which is why a license is shown. A license and a permit are alternatives and are never held together.", source: "ER Arts. 19 and 20" },
  S3: { title: "Children aged 15 to 18", body: "The child, or the guardian as the case may be, must furnish the guardian’s consent.", source: "ER Art. 15" },
  S4: { title: "Restrictions specific to children’s data", body: "It is prohibited to collect more data than is necessary for participation in a game, competition, or other activity, and to use children’s data for profiling, tracking, or behavioral monitoring.", source: "PDPL Art. 12; ER Art. 14(5)" },
  S5: { title: "Profiling requires a stated lawful basis", body: "Establish and document the lawful basis on which profiling, tracking, or behavioral monitoring is carried out.", source: "PDPL Art. 6" },
  X2: { title: "Making data available within your group", body: "This is covered by the same cross-border instrument, not an additional one, but it carries added conditions: the group’s activities must be of a shared or integrated nature, there must be a legitimate interest, and the protection afforded by the recipient must be no less than that applied in Egypt. A colleague abroad merely viewing data about Egyptians is a form of making it available.", source: "PDPL Art. 16; ER Art. 17" },
  X3: { title: "A wording difference worth flagging", body: "The law says “license or permit” for transferring data abroad, but “license” alone for making it available within a group. A holder eligible only for a permit may therefore not be eligible for intra-group availability. This needs examination in your case.", source: "PDPL Arts. 14 and 16" },
  X4: { title: "Consent is a separate condition", body: "The data subject’s consent to the transfer stands alongside the license. The license does not displace it.", source: "ER Art. 16(First)(2)" },
  X5: { title: "The hosting location must be established first", body: "You did not know which country your data is stored in. The cross-border requirement above is likely rather than certain until that is determined.", source: "" },
  X6: { title: "The license must be updated as countries are added", body: "Where further countries are added during the term of the license, it must be updated.", source: "ER Art. 16(First)(4)" },
  M4: { title: "Prior explicit consent precedes the first marketing contact", body: "The marketing license does not displace it. Consent must be obtained before the first message is sent.", source: "PDPL Art. 17; ER Art. 18(First)(2)" },
  M5: { title: "Lists obtained from public sources or purchased", body: "A marketing intermediary must verify that consent was obtained and retain evidence of its source. Failing that, it must immediately cease using the data.", source: "ER Art. 18(Second)(3)" },
  M6: { title: "Message content requirements", body: "Every marketing message must identify its originator and its sender, give a valid contact address, and state expressly that its purpose is marketing.", source: "PDPL Art. 17; ER Art. 18(Second)(2)" },
  M7: { title: "A refusal and withdrawal mechanism is required", body: "There must be a clear and easily accessible way to refuse further messages and to withdraw consent.", source: "PDPL Art. 17" },
  M9: { title: "Two cases require erasure", body: "Withdrawal of consent, or expiry of the retention period or the marketing purpose ceasing - whichever comes first.", source: "ER Art. 18(First)(3)" },
  V2: { title: "Residential units are excluded", body: "Provided the cameras do not exceed the boundaries of the premises.", source: "ER Art. 31, final paragraph" },
  V3: { title: "Notices must be displayed", body: "Individuals must be informed that surveillance is in operation, by notices in visible locations.", source: "ER Art. 31(2)" },
  V4: { title: "Facial recognition is prohibited by default", body: "Except in cases prescribed by law, or with the data subject’s explicit consent.", source: "ER Art. 31(4)" },
  V5: { title: "Recordings may not leave Egypt", body: "Transferring surveillance recordings outside Egypt is prohibited except for reasons prescribed by law. This is stricter than the general cross-border rule.", source: "ER Art. 31(3)" },
  V6: { title: "Staff-only areas", body: "Employees must be informed, but no visual surveillance license is required where the area is not a public place.", source: "ER Art. 31, by implication" },
  D2: { title: "A natural person may act personally", body: "You may appoint a Data Protection Officer or assume the obligations personally.", source: "PDPL Art. 8; DPO Guideline, item 3.1" },
  D4: { title: "An external provider does not satisfy Article 8", body: "The law requires the legal representative of a legal person to appoint a competent employee within its own legal entity and staffing structure, to register that person with the PDPC, and to disclose the appointment publicly.", source: "PDPL Art. 8" },
  D5: { title: "A shared officer carries added conditions", body: "The consent of every entity served, the PDPC’s prior review and acceptance, a separate system, a binding contractual agreement defining scope and accountability, and direct reporting to the highest level of management in each entity.", source: "ER Arts. 11 and 12(5)" },
  D6: { title: "Position and independence", body: "The role must not conflict with any other assignment that would prejudice data protection. The position must sit at a sufficiently senior level, the officer must report directly to the highest level of management, and must be protected against dismissal or disciplinary action for performing the role.", source: "ER Art. 12(4)" },
  D7: { title: "Contact details must be accessible", body: "The officer’s contact details must be made available and easily accessible to data subjects. The officer is their point of contact, and the point of contact with the PDPC.", source: "DPO Guideline, item 1" },
  D8: { title: "The DPO code must match the data handled", body: "Because you handle sensitive personal data, the officer’s code must cover the nature and volume of that data.", source: "ER Art. 9" },
  D12: { title: "Qualifying requirements for this category", body: "Category A: a pass above 80%, two international certifications or 50 documented training credit hours, and three to five years of experience. Category B: a pass above 70%, one certification or 30 hours, and two to three years.", source: "DPOC Guideline, Section I" },
  D13: { title: "The category shown is the likely one", body: "Final classification is at the PDPC’s discretion. It may conduct an assessment interview and reassign the category.", source: "DPOC Guideline, Section I" },
  D14: { title: "Reassessment every three years", body: "Accreditation is subject to comprehensive reassessment every three years, and the PDPC may initiate a reassessment at any time.", source: "DPOC Guideline, Section III(B)" },
  "W4-cookie": { title: "Refusal must be as easy as acceptance", body: "Because you use analytics, tracking tools, or an advertising pixel, the consent mechanism must allow refusal as readily as acceptance.", source: "PDPL Art. 6; ER Art. 2" },
  "W5-priority": { title: "Priority gap: vendor contracts", body: "Not all of your vendor contracts contain data protection clauses. Every party that accesses data about individuals on your behalf must be under a processing agreement.", source: "PDPL Arts. 4 and 5" },
  W5a: { title: "A processor may not act without a written contract", body: "A processor may not process except under a written contract and written instructions, and a copy of the processing contract is a required part of the processor’s record.", source: "ER Art. 4(Second)(3)" },
  W5b: { title: "Vendor risk management is a live gap", body: "Establish vendor selection criteria, a privacy and security risk assessment before contracting, and monitoring thereafter.", source: "PDPC Compliance Plan Checklist" },
  W7: { title: "Breach notification timelines", body: "Notify the PDPC within 72 hours of becoming aware, and immediately where the breach touches national security considerations. Notify the affected individual within three working days of notifying the PDPC. Record the event in a secured electronic register.", source: "PDPL Art. 7; ER Arts. 5 and 6" },
  W8: { title: "Six working days is the statutory limit", body: "You do not currently have a mechanism to receive individuals’ requests and respond within six working days.", source: "PDPL Art. 32" },
  W9: { title: "Certifications do not displace the license", body: "An ISO or SOC certification may cover part of the technical controls, but it does not displace the license, the registrations, or the legal documentation.", source: "" },
  W11: { title: "Existing GDPR documentation reduces scope", body: "A substantial part of GDPR compliance documentation - records of processing, privacy notices, data protection addenda in vendor contracts, data subject request procedures, and impact assessments - can be adapted to Egyptian requirements rather than created anew. This is the single largest factor reducing scope, duration, and cost. It does not displace the license or permit, the DPO registration, or PDPC approval of the mechanisms.", source: "" },
  A3: { title: "Personnel must themselves be accredited", body: "A legal person’s accreditation requires its personnel to hold PDPC accreditation and a valid permit to practice.", source: "ER Art. 33(3)" },
};

// ---------------------------------------------------------------------------
// Fees
// ---------------------------------------------------------------------------

/** ER Art. 19  -  annual license fee, legal persons, by Q3.1 band. */
const LICENSE_FEE: { [band: string]: string } = {
  b1: "Exempt from license fees",
  b2: "EGP 200 to EGP 1,000 per year",
  b3: "EGP 200 to EGP 1,000 per year",
  b4: "EGP 5,000 to EGP 50,000 per year",
  b5: "EGP 60,000 to EGP 150,000 per year",
  b6: "EGP 165,000 to EGP 300,000 per year",
  b7: "EGP 320,000 to EGP 500,000 per year",
  b8: "EGP 666,666 per year - the statutory maximum, totaling EGP 2,000,000 across the three-year term",
};

/** ER Art. 20  -  permit fee. Q3.2 refines the first two Q3.1 bands. */
const PERMIT_FEE_BY_Q32: { [code: string]: string } = {
  u25k: "Exempt from permit fees, for any duration",
  "25kTo100k": "EGP 10,000 to EGP 25,000, by duration",
  "100kTo250k": "EGP 10,000 to EGP 25,000, by duration",
  "250kTo500k": "EGP 12,500 to EGP 50,000, by duration",
};

const PERMIT_FEE_BY_BAND: { [band: string]: string } = {
  b3: "EGP 25,000 to EGP 100,000, by duration",
  b4: "EGP 50,000 to EGP 200,000, by duration",
  b5: "EGP 75,000 to EGP 300,000, by duration",
  b6: "EGP 100,000 to EGP 400,000, by duration",
  b7: "EGP 125,000 to EGP 500,000, by duration",
  b8: "EGP 500,000 - the statutory maximum for any period",
};

export interface FeeLine {
  amount: string;
  qualifier?: string;
  unresolved?: boolean;
}

export function primaryFee(
  primary: string,
  band: string,
  q32: string
): FeeLine {
  if (primary === "BAS-SPECIAL") {
    return {
      amount:
        "Associations: EGP 5,000. Clubs: EGP 20,000 where member records are fewer than 50,000, and EGP 50,000 above that.",
      qualifier:
        "The record band you selected does not resolve which club figure applies, because the schedule breaks at 50,000 and the band does not.",
      unresolved: true,
    };
  }

  if (primary === "BAS-P") {
    if (band === "b1" || band === "b2") {
      if (q32 && PERMIT_FEE_BY_Q32[q32]) {
        return { amount: PERMIT_FEE_BY_Q32[q32] };
      }
      return {
        amount:
          band === "b1"
            ? "Either exempt, or EGP 10,000 to EGP 25,000 by duration"
            : "Either EGP 10,000 to EGP 25,000, or EGP 12,500 to EGP 50,000, by duration",
        qualifier: "Your exact record count was not known, and it decides which row applies.",
        unresolved: true,
      };
    }
    if (PERMIT_FEE_BY_BAND[band]) return { amount: PERMIT_FEE_BY_BAND[band] };
    return {
      amount: "Not determined",
      qualifier: "Your record volume was not known, and the permit fee is set by it.",
      unresolved: true,
    };
  }

  // License
  if (!LICENSE_FEE[band]) {
    return {
      amount: "Not determined",
      qualifier: "Your record volume was not known, and the license fee is set by it.",
      unresolved: true,
    };
  }
  const half = primary === "BAS-L-C" || primary === "BAS-L-P";
  return {
    amount: LICENSE_FEE[band],
    qualifier: half && band !== "b1" ? "A controller-only or processor-only license is half this figure." : undefined,
  };
}

export const FEE_CEILINGS =
  "The statutory ceilings are EGP 2,000,000 for a license and EGP 500,000 for a permit or an accreditation.";

// ---------------------------------------------------------------------------
// Statutory timelines
// ---------------------------------------------------------------------------

export const TIMELINES: { label: string; period: string; source: string }[] = [
  { label: "Decision on a license or permit application", period: "90 working days from completion of the information and documents. No response is a refusal.", source: "ER Art. 36" },
  { label: "Decision on a cross-border transfer application", period: "90 working days from completion. No response is a refusal.", source: "ER Art. 26" },
  { label: "License term", period: "Three years. Renewal at least three months before expiry.", source: "Licenses and Permits Guideline, item 4.1" },
  { label: "Permit term", period: "Not exceeding one year. Renewal at least one month before expiry.", source: "Licenses and Permits Guideline, item 4.2" },
  { label: "Decision on DPO registration", period: "30 working days, and 15 days after the documents are completed.", source: "ER Art. 8" },
  { label: "Breach notification to the PDPC", period: "72 hours from becoming aware. Immediately where national security is engaged.", source: "ER Art. 5" },
  { label: "Breach notification to the individual", period: "Three working days from notifying the PDPC.", source: "ER Art. 5" },
  { label: "Response to a data subject request", period: "Six working days.", source: "PDPL Art. 32" },
  { label: "Decision on a complaint before the PDPC", period: "30 working days. The respondent implements within 7 working days of notification.", source: "PDPL Art. 33" },
  { label: "Compliance grace period", period: "Ends November 1, 2026.", source: "Promulgation Art. 6" },
];

// ---------------------------------------------------------------------------
// Approved legal copy  -  renders verbatim
// ---------------------------------------------------------------------------

export const DISCLAIMER_PARAGRAPHS = [
  "This tool is provided for awareness and preliminary scoping purposes only. The result is based on the answers you provide, without independent verification, and does not constitute legal advice or a legal opinion. Use of this tool does not create an attorney-client relationship between you and Hamza & Partners Law Firm. A definitive assessment of your position requires a professional review of your processing activities.",
  "The fees shown are taken from the financial schedules of the Executive Regulations of the Personal Data Protection Law. They are official fees payable to the Personal Data Protection Center and do not include professional fees.",
];
