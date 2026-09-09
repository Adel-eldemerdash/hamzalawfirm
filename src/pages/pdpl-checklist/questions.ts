/**
 * The question bank, transcribed from 02-QUESTION-BANK.md.
 *
 * Three rules govern this file:
 *
 * 1. Question text and option labels are approved legal copy. They render
 *    verbatim. Do not reword, shorten, or "improve" them.
 * 2. Question identifiers are permanent. They are the keys under `answers` in
 *    the database and the operands of every rule in rules.ts. Never renumber.
 * 3. Option `value` codes are equally permanent. Labels may be corrected in
 *    the source of record and reflowed here; the codes must not change, or
 *    every stored answer becomes uninterpretable.
 *
 * If a question is ambiguous or an option is missing, stop and report it. The
 * correction is made in the Arabic source of record first.
 */

export const QUESTION_SET_VERSION = "2026-08-29";

export type QuestionType = "single" | "multi";

export interface Option {
  /** Permanent. Stored in the database and referenced by rules.ts. */
  value: string;
  /** Approved copy. Rendered verbatim. */
  label: string;
  /** Selecting this clears every other option in a multi-select. */
  exclusive?: boolean;
  /** Renders an accompanying free-text field. */
  freeText?: string;
  /**
   * Concrete examples shown beneath the option.
   *
   * NOT part of the approved copy in 02-QUESTION-BANK.md. Added at the
   * client's instruction on August 30, 2026 because the abstract category
   * names were being read too narrowly — "financial data" in particular was
   * not being recognized as covering employee payroll. Back-port these to the
   * source of record.
   */
  example?: string;
}

export interface Question {
  id: string;
  group: number;
  text: string;
  helper?: string;
  /** Rendered beneath the question, from the blockquotes in the bank. */
  note?: string;
  type: QuestionType;
  options: Option[];
}

export interface Group {
  index: number;
  title: string;
  intro?: string;
}

export const GROUPS: Group[] = [
  { index: 0, title: "Does the law apply to you at all?" },
  { index: 1, title: "Your role" },
  { index: 2, title: "Data subjects and data types" },
  { index: 3, title: "Record volume" },
  { index: 4, title: "Nature and duration of the activity" },
  { index: 5, title: "Where the data sits, and cross-border transfer" },
  { index: 6, title: "Direct electronic marketing" },
  { index: 7, title: "Visual surveillance" },
  { index: 8, title: "Data leaving you, and data coming to you",
    intro:
      "Two opposite directions. Data you control goes out to a vendor working for you, and data your clients control comes in to you to process on their behalf. The two are independent; either or both may apply — and your legal role differs in each direction." },
  { index: 9, title: "Data Protection Officer" },
  { index: 10, title: "Digital channels" },
  { index: 11, title: "Existing governance and information security",
    intro:
      "The purpose is to deduct what already exists from the scope of work. Answering “No” does not in itself mean you are in breach." },
  { index: 12, title: "Providing data protection consultancy" },
];

const YES_NO_UNSURE: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

export const QUESTIONS: Question[] = [
  // ---- Group 0 -----------------------------------------------------------
  {
    id: "Q0.1",
    group: 0,
    text: "Do you keep, store, or process data about individuals by electronic or technical means, whether wholly or partly?",
    helper: "Examples: a spreadsheet of employee or customer details, payroll records, a customer database, website visitor data, email, an HR system, an accounting system, a mobile app, security cameras.",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "paper", label: "No — entirely on paper" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q0.2",
    group: 0,
    text: "Which of the following describe your organization?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "company", label: "A private company or establishment" },
      { value: "bank", label: "A bank or an entity subject to the oversight and supervision of the Central Bank of Egypt" },
      { value: "moneyTransfer", label: "A money transfer company or a currency exchange company" },
      { value: "media", label: "A press or media entity, where processing is exclusively for media purposes" },
      { value: "association", label: "An association" },
      { value: "club", label: "A club" },
      { value: "soleTrader", label: "A sole trader or an individual professional practice, with no registered company" },
      { value: "none", label: "None of the above", exclusive: true },
    ],
  },
  {
    id: "Q0.3",
    group: 0,
    text: "Where is your organization located?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "egyptInside", label: "An Egyptian entity operating inside Egypt" },
      { value: "egyptOutside", label: "An Egyptian entity operating outside Egypt" },
      { value: "foreignWithBranch", label: "A foreign entity with a branch or representative office inside Egypt" },
      { value: "foreignNoBranch", label: "A foreign entity with no branch or representative office inside Egypt" },
      { value: "unsure", label: "Not sure", exclusive: true },
    ],
  },
  {
    id: "Q0.4",
    group: 0,
    text: "Whose data do you process?",
    helper: "“Process” here means any handling of the data: collecting, storing, using, amending, sharing, or erasing it. Select all that apply.",
    type: "multi",
    options: [
      { value: "egyptianInside", label: "Egyptian nationals residing inside Egypt" },
      { value: "egyptianOutside", label: "Egyptian nationals residing outside Egypt" },
      { value: "foreignInside", label: "Foreign nationals residing inside Egypt" },
      { value: "foreignOutside", label: "Foreign nationals residing outside Egypt" },
      { value: "unsure", label: "Not sure", exclusive: true },
    ],
  },

  // ---- Group 1 -----------------------------------------------------------
  {
    id: "Q1.1",
    group: 1,
    text: "Do you process data about individuals on behalf of your clients and on their instructions?",
    helper:
      "That is, the data is not yours: a client hands it to you so you can do work for them. Examples: operating a system on the client’s behalf, hosting their data, running a marketing campaign for them, providing accounting or HR services, or running a call center in their name. It also covers your team seeing data about a client’s employees or customers while delivering a project at their premises.",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q1.2",
    group: 1,
    text: "Do your services involve a client uploading data to you on an ongoing basis, which you then process on an ongoing basis?",
    helper: "A platform or subscription model — SaaS",
    type: "single",
    options: YES_NO_UNSURE,
  },

  // ---- Group 2 -----------------------------------------------------------
  {
    id: "Q2.1",
    group: 2,
    text: "Whose data do you hold?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "employees", label: "Employees" },
      { value: "applicants", label: "Job applicants" },
      { value: "customers", label: "Individual customers" },
      { value: "clientReps", label: "Individuals representing your corporate clients (procurement manager, technical contact, contract signatory)" },
      { value: "suppliers", label: "Suppliers" },
      { value: "trainees", label: "Trainees or students" },
      { value: "webVisitors", label: "Website visitors" },
      { value: "premisesVisitors", label: "Visitors to your premises" },
      { value: "prospects", label: "Prospect and lead lists" },
      { value: "other", label: "Other", freeText: "Please specify" },
    ],
  },
  {
    id: "Q2.2",
    group: 2,
    text: "Do you handle any of the following?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "health", label: "Data revealing physical, mental, psychological, or genetic health", example: "Includes sick leave records and medical certificates, health insurance files for staff and their dependants, pre-employment medical examinations, occupational injury reports, and any disability accommodation on file." },
      { value: "biometric", label: "Biometric data (fingerprint, facial recognition, voiceprint, and the like)", example: "Includes fingerprint or face-scan attendance devices, facial recognition on entry gates or cameras, voiceprints captured in a call center, and iris or palm scanners used for access control." },
      { value: "financial", label: "Financial data", example: "Includes employee payroll and salary records, bank account and IBAN details, salary transfer files sent to a bank, end-of-service and bonus calculations, customer card or payment data, invoices and payment histories, and credit or installment applications. Payroll alone puts almost every employer in this category." },
      { value: "religion", label: "Religious beliefs", example: "Includes the religion field carried on a national ID copy held in an HR file, religious holiday or pilgrimage leave entitlements, and any record of place of worship or religious affiliation." },
      { value: "political", label: "Political opinions", example: "Includes political party or syndicate membership recorded in a file, records of candidacy or political activity, and any note of political affiliation in a personnel or customer record." },
      { value: "security", label: "Security status", example: "Includes criminal record certificates required on hiring, background and security screening results, security clearance files, and military service status records." },
      { value: "children", label: "Data relating to children under 18", example: "Includes employees’ children listed on medical insurance or family allowances, trainees or students under 18, any account or profile opened for a minor, and children appearing in photographs or on a school, club, or learning platform." },
      { value: "none", label: "None of the above", exclusive: true },
      { value: "unsure", label: "Not sure", exclusive: true },
    ],
  },
  {
    id: "Q2.3",
    group: 2,
    text: "Which age band?",
    type: "single",
    options: [
      { value: "under15", label: "Under 15" },
      { value: "15to18", label: "15 to 18" },
      { value: "both", label: "Both" },
      { value: "na", label: "Not applicable" },
    ],
  },
  {
    id: "Q2.4",
    group: 2,
    text: "Do you carry out profiling, tracking, or behavioral monitoring of individuals?",
    helper: "This means analyzing a person’s data to build a picture of them, predict their behavior, or treat them differently on that basis. Examples: credit scoring, segmenting customers by purchasing behavior, advertising targeted on activity, tracking a visitor across pages or sites, and automated assessment of employee performance.",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q2.5",
    group: 2,
    text: "Is data about individuals used to train artificial intelligence models or other emerging technologies?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "planned", label: "We plan to" },
      { value: "unsure", label: "Not sure" },
    ],
  },

  // ---- Group 3 -----------------------------------------------------------
  {
    id: "Q3.1",
    group: 3,
    text: "In total, how many personal data records relating to individuals do you hold?",
    helper:
      "An approximate estimate is sufficient — include employees, customers, contacts, marketing lists, and archives",
    note: "The first band — up to 100,000 records — is exempt from license fees under Article 19 of the Executive Regulations. Exemption from the fee is not exemption from the license, nor from any other obligation.",
    type: "single",
    options: [
      { value: "b1", label: "1 to 100,000" },
      { value: "b2", label: "100,000 to 500,000" },
      { value: "b3", label: "500,000 to 1,000,000" },
      { value: "b4", label: "1,000,000 to 2,000,000" },
      { value: "b5", label: "2,000,000 to 3,000,000" },
      { value: "b6", label: "3,000,000 to 4,000,000" },
      { value: "b7", label: "4,000,000 to 5,000,000" },
      { value: "b8", label: "More than 5,000,000" },
      { value: "unknown", label: "Not known" },
    ],
  },
  {
    id: "Q3.2",
    group: 3,
    text: "Within your band, how many records?",
    note: "Why we ask: the license schedule (ER Article 19) is fee-exempt up to 100,000 records and then rises in fixed steps, whereas the permit schedule (ER Article 20) breaks at 25,000 and again at 250,000. Each of the first two bands therefore straddles two rows of the permit table; every other band maps to exactly one row. This question settles both cases.",
    type: "single",
    // The option set depends on Q3.1. Both sets live here; flow.ts renders the
    // applicable one. Codes are distinct across the two sets so a stored value
    // is unambiguous on its own.
    options: [
      { value: "u25k", label: "1 to 25,000" },
      { value: "25kTo100k", label: "More than 25,000 up to 100,000" },
      { value: "100kTo250k", label: "100,000 to 250,000" },
      { value: "250kTo500k", label: "More than 250,000 up to 500,000" },
      { value: "unknown", label: "Not known" },
    ],
  },

  // ---- Group 4 -----------------------------------------------------------
  {
    id: "Q4.1",
    group: 4,
    text: "Is your processing of personal data an ongoing and permanent part of your business, or is it temporary and for a defined purpose?",
    type: "single",
    options: [
      { value: "ongoing", label: "Ongoing and permanent" },
      { value: "temporary", label: "Temporary, for a defined purpose" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q4.2",
    group: 4,
    text: "If temporary, what duration do you expect?",
    type: "single",
    options: [
      { value: "d3", label: "Up to 3 months" },
      { value: "d6", label: "More than 3 months and up to 6 months" },
      { value: "d9", label: "More than 6 months and up to 9 months" },
      { value: "d12", label: "More than 9 months and up to 1 year" },
      { value: "over1y", label: "More than 1 year" },
      { value: "na", label: "Not applicable" },
    ],
  },

  // ---- Group 5 -----------------------------------------------------------
  {
    id: "Q5.1",
    group: 5,
    text: "Where is business data actually stored?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "inEgypt", label: "Servers inside Egypt" },
      { value: "cloud", label: "Global cloud services (Microsoft 365, Google Workspace, AWS, and the like)" },
      { value: "outsideEgypt", label: "Servers outside Egypt" },
      { value: "devices", label: "Employee devices" },
      { value: "unknown", label: "Not known", exclusive: true },
    ],
  },
  {
    id: "Q5.2",
    group: 5,
    text: "Do you know which country this data is stored in?",
    type: "single",
    options: [
      { value: "inEgypt", label: "Yes — inside Egypt" },
      { value: "outsideEgypt", label: "Yes — outside Egypt", freeText: "Country" },
      { value: "distributed", label: "Distributed across more than one country" },
      { value: "unknown", label: "Not known" },
    ],
  },
  {
    id: "Q5.3",
    group: 5,
    text: "Is data about individuals sent to, or made available to, any party outside Egypt?",
    helper: "Includes a parent company, branches, service providers, and cloud hosting",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q5.4",
    group: 5,
    text: "If the recipient is outside Egypt, is it within your group — a parent, sister company, or branch?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "independent", label: "No — an independent party" },
      { value: "both", label: "Both" },
      { value: "na", label: "Not applicable" },
    ],
  },

  // ---- Group 6 -----------------------------------------------------------
  {
    id: "Q6.1",
    group: 6,
    text: "Do you send promotional messages to individuals?",
    helper: "Email, SMS, WhatsApp, direct messages on social platforms, marketing calls",
    type: "single",
    options: [
      { value: "regularly", label: "Yes, regularly" },
      { value: "occasionally", label: "Occasionally" },
      { value: "no", label: "No" },
      { value: "planned", label: "We plan to" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q6.2",
    group: 6,
    text: "The marketing you send is:",
    type: "single",
    options: [
      { value: "self", label: "For our own products and services (own account)" },
      { value: "thirdParty", label: "On behalf of other clients (third party)" },
      { value: "both", label: "Both" },
      { value: "na", label: "Not applicable" },
    ],
  },
  {
    id: "Q6.3",
    group: 6,
    text: "How did you obtain the details of the people you send to?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "registered", label: "They registered with us or purchased from us" },
      { value: "publicSources", label: "We collected them from public sources or trade events" },
      { value: "purchased", label: "We purchased them or received them from a third party" },
      { value: "na", label: "Not applicable", exclusive: true },
      { value: "unsure", label: "Not sure", exclusive: true },
    ],
  },
  {
    id: "Q6.4",
    group: 6,
    text: "Does every marketing message identify its originator and sender, give a valid contact address, and state expressly that its purpose is marketing?",
    type: "single",
    options: [
      { value: "allThree", label: "Yes, all three" },
      { value: "some", label: "Some of them" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q6.5",
    group: 6,
    text: "Is there a clear and easily accessible mechanism to opt out or withdraw consent?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q6.6",
    group: 6,
    text: "Do you keep electronic records of consents and any changes to them?",
    type: "single",
    options: YES_NO_UNSURE,
  },

  // ---- Group 7 -----------------------------------------------------------
  {
    id: "Q7.1",
    group: 7,
    text: "Are there surveillance cameras at any of your sites inside Egypt?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q7.2",
    group: 7,
    text: "Where are they?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "publicAreas", label: "Areas the public enters (reception, branches, stores)" },
      { value: "staffAreas", label: "Internal staff-only areas" },
      { value: "perimeter", label: "External perimeter or parking" },
      { value: "na", label: "Not applicable", exclusive: true },
    ],
  },
  {
    id: "Q7.3",
    group: 7,
    text: "Are there clearly visible notices informing individuals that surveillance is in operation?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q7.4",
    group: 7,
    text: "Are facial recognition or similar identification technologies applied to these recordings?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q7.5",
    group: 7,
    text: "Are the recordings transferred, made available, or processed outside Egypt?",
    helper: "Includes storage on cloud infrastructure abroad",
    type: "single",
    options: YES_NO_UNSURE,
  },

  // ---- Group 8 -----------------------------------------------------------
  {
    id: "Q8.1",
    group: 8,
    text: "Direction one — data going out: Do you make data about individuals that you control — your employees or your customers — available to any external party that provides a service to you?",
    helper: "Cloud hosting, HR system, accounting firm, marketing agency, security company, courier, call center",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q8.2",
    group: 8,
    text: "Do your contracts with them contain data protection clauses or an addendum?",
    type: "single",
    options: [
      { value: "all", label: "Yes, in all of them" },
      { value: "some", label: "In some of them" },
      { value: "no", label: "No" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q8.3",
    group: 8,
    text: "Do you assess a vendor’s privacy and security risk before contracting?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q8.4",
    group: 8,
    text: "Direction two — data coming in: Do your clients entrust you with data about individuals that they control, for you to process on their behalf? If so, what governs the relationship?",
    type: "single",
    options: [
      { value: "contractWithClauses", label: "Yes, governed by a written contract that contains data protection clauses" },
      { value: "contractNoClauses", label: "Yes, governed by a written contract with no data protection clauses" },
      { value: "noContract", label: "Yes, with no written contract" },
      { value: "no", label: "No, nobody entrusts us with data about individuals" },
      { value: "unsure", label: "Not sure" },
    ],
  },

  // ---- Group 9 -----------------------------------------------------------
  {
    id: "Q9.1",
    group: 9,
    text: "Have you appointed a Data Protection Officer?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "informal", label: "Someone handles the matter without a formal appointment" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q9.2",
    group: 9,
    text: "Is that person registered in the PDPC register of Data Protection Officers and issued a DPO code?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
      { value: "inProgress", label: "Application in progress" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "Q9.3",
    group: 9,
    text: "In what capacity?",
    type: "single",
    options: [
      { value: "employee", label: "An employee within our staffing structure" },
      { value: "external", label: "An external service provider" },
      { value: "shared", label: "Serves more than one entity (shared)" },
      { value: "na", label: "Not applicable" },
    ],
  },

  // ---- Group 10 ----------------------------------------------------------
  {
    id: "Q10.1",
    group: 10,
    text: "Which of the following do you have?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "website", label: "A website" },
      { value: "app", label: "A mobile application" },
      { value: "form", label: "An online registration or booking form" },
      { value: "platform", label: "A learning or membership platform" },
      { value: "store", label: "An online store" },
      { value: "none", label: "None of the above", exclusive: true },
    ],
  },
  {
    id: "Q10.2",
    group: 10,
    text: "Is a privacy notice published on the website or application?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q10.3",
    group: 10,
    text: "Do you use analytics, tracking tools, or an advertising pixel?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q10.4",
    group: 10,
    text: "Is there a clear route on your website or application through which individuals can exercise their rights over their data?",
    helper:
      "Being informed of and accessing or obtaining their data; withdrawing prior consent; correction, amendment, erasure, addition, or updating; restricting processing to a defined scope; objecting to processing",
    type: "single",
    options: [
      { value: "dedicatedForm", label: "Yes — a dedicated form or page for individuals’ requests" },
      { value: "controlPanel", label: "Yes — a control panel inside the user’s account" },
      { value: "emailOnly", label: "There is a contact email address only" },
      { value: "none", label: "None of the above" },
      { value: "unsure", label: "Not sure" },
    ],
  },

  // ---- Group 11 ----------------------------------------------------------
  {
    id: "Q11.1",
    group: 11,
    text: "Which of the following do you already have in place?",
    helper: "Select all that apply",
    type: "multi",
    options: [
      { value: "policy", label: "A written data protection policy" },
      { value: "notice", label: "A published privacy notice" },
      { value: "ropa", label: "A record of processing activities (RoPA)" },
      { value: "dsrProc", label: "A documented procedure for handling individuals’ requests" },
      { value: "breachProc", label: "A documented procedure for handling security incidents and breaches" },
      { value: "retention", label: "A retention and erasure policy and schedule" },
      { value: "consentForms", label: "Written consent forms" },
      { value: "training", label: "A recurring staff training program" },
      { value: "none", label: "None of the above", exclusive: true },
    ],
  },
  {
    id: "Q11.2",
    group: 11,
    text: "Do you have a mechanism to receive individuals’ requests and respond within six working days?",
    type: "single",
    options: YES_NO_UNSURE,
  },
  {
    id: "Q11.3",
    group: 11,
    text: "Do you hold any current certifications (ISO 27001, ISO 27701, SOC 2, and the like)? What is their scope?",
    type: "single",
    options: [
      { value: "yes", label: "Yes", freeText: "Certification and scope" },
      { value: "no", label: "No" },
      { value: "inProgress", label: "In progress" },
    ],
  },
  {
    id: "Q11.4",
    group: 11,
    text: "Does your group hold privacy documentation prepared for GDPR compliance that could be adapted?",
    type: "single",
    options: YES_NO_UNSURE,
  },

  // ---- Group 12 ----------------------------------------------------------
  {
    id: "Q12.1",
    group: 12,
    text: "Do you provide — or plan to provide — data protection or privacy consultancy or services to clients in Egypt?",
    type: "single",
    options: [
      { value: "yes", label: "Yes" },
      { value: "planned", label: "We plan to" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "Q12.2",
    group: 12,
    text: "In what capacity?",
    type: "single",
    options: [
      { value: "legalPerson", label: "In the company’s name (legal person)" },
      { value: "individuals", label: "Individual consultants" },
      { value: "both", label: "Both" },
      { value: "na", label: "Not applicable" },
    ],
  },
];

export const QUESTIONS_BY_ID: { [id: string]: Question } = {};
QUESTIONS.forEach(function (q) {
  QUESTIONS_BY_ID[q.id] = q;
});

/** The answer values that route an item into "could not be determined". */
export const UNRESOLVED_VALUES = ["unsure", "unknown"];
