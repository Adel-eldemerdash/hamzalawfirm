# PDPL Assessment Tool — Implementation Specification

**Route:** `https://www.hamzalawfirm.com/pdpl-checklist`
**Owner:** Hamza & Partners Law Firm — Public Relations and Marketing
**Prepared:** August 24, 2026
**Prerequisite:** `00-WEBSITE-READINESS-BRIEF.md` must be complete and signed off.

---

## 1. What this tool is

A self-assessment questionnaire that tells an Egyptian organization, on the basis of its own answers, what the Personal Data Protection Law No. 151 of 2020 ("PDPL") and its Executive Regulations issued by Minister of Communications and Information Technology Decree No. 816 of 2025 ("ER") require of it.

The visitor answers **factual** questions. No legal knowledge is required and none is asked for. The tool performs the legal characterization itself.

### 1.1 The four output layers

| Layer | Output |
|---|---|
| 1 | The organization's legal role: **controller**, **processor**, or **both** |
| 2 | The single **primary license or permit** it requires, its category, and its official fee band |
| 3 | Every **supplementary license or permit** that applies, with the fee percentage for each |
| 4 | The **obligations and documents** it must produce — DPO registration, notices, consents, records, procedures |

### 1.2 Where the value is

The Personal Data Protection Center ("PDPC") portal already offers a "Company Journey" service that identifies which license a data user needs. Layers 2 and 3 therefore exist elsewhere. **The firm's differentiation is layers 1 and 4** — the legal characterization and the gap map. Design the result page so those two layers carry the visual weight.

---

## 2. Language

**The tool ships in English only.** The site is `<html lang="en">` throughout with no right-to-left infrastructure and no internationalization layer, and adding one for a single page is not justified.

**One exception:** the privacy notice section (section 8) ships in **both English and Arabic**, because it is addressed to the data subject whose data is being collected and must be intelligible to that person. Implement it as a two-tab or two-column block inside the tool page. The Arabic block requires `dir="rtl"` scoped to that block only — do not switch the document direction.

All English copy in this handoff and in `02-QUESTION-BANK.md` is **American** legal English. Do not introduce British spellings. Before any copy ships, scan the full text for `-ise`, `-isation`, `-our`, `licence`, `programme`, `centre`, `defence`, and correct them. Dates render as `November 1, 2026`.

---

## 3. Page flow

```
[1] Landing / intro
      ↓
[2] Question flow  ── screening exit ──→  [2a] "The PDPL does not apply" result
      ↓
[3] Contact gate  (mandatory)
      ↓
[4] Result page  (rendered on screen)
      ↓
      persisted to Realtime Database
```

### 3.1 Landing

One screen. States what the tool does, how long it takes ("about 5 minutes"), that the result appears immediately on screen, and that contact details are required in order to produce it. Carries the disclaimer of section 7 above the fold or one click away.

### 3.2 Question flow

- **One question group per screen**, with a progress indicator.
- Because groups are conditionally skipped, the progress indicator must be computed from the **currently reachable** set of questions, not from the full bank. Recompute on every answer.
- Back navigation must preserve answers. Forward navigation must not skip validation.
- No question is optional. Every question offers an explicit "Not sure" or "Not applicable" option so the visitor is never forced to guess — see section 6.4.
- State lives in memory for the session. Do not use `localStorage` or `sessionStorage`; a half-finished compliance self-assessment left in a shared browser is a liability.

### 3.3 Screening exit

Group 0 can terminate the flow early. When rule `N1`, `N2`, or `N4` fires (see `03-INFERENCE-RULES.md`), stop and render the exclusion result. **The contact gate is not shown on this path and nothing is persisted** — there is no commercial reason to gate a "this does not apply to you" answer, and gating it would damage the credibility the screening buys.

### 3.4 Contact gate

Shown after the last reachable question and before the result. See section 5.

### 3.5 Result

See section 6.

---

## 4. Conditional branching

The bank holds **47 questions in 13 groups**. A given visitor should see **20 to 25**. Branching is what makes the difference; implement it exactly.

| Group | Shown when |
|---|---|
| **G0** — Scope | Always |
| **G1** — Role | Always |
| **G2** — Data subjects and data types | Always |
| **G3** — Record volume | Always |
| **G4** — Nature and duration | Always |
| **G5** — Location and cross-border | Always |
| **G6** — Direct electronic marketing | Always show `Q6.1`. Show `Q6.2`–`Q6.6` only if `Q6.1 ≠ No` |
| **G7** — Visual surveillance | Always show `Q7.1`. Show `Q7.2`–`Q7.5` only if `Q7.1 = Yes` |
| **G8** — Vendors and clients | Always show `Q8.1` and `Q8.4`. Show `Q8.2`–`Q8.3` only if `Q8.1 = Yes` |
| **G9** — DPO | Always show `Q9.1`. Show `Q9.2`–`Q9.3` only if `Q9.1 ≠ No` |
| **G10** — Digital channels | Always show `Q10.1`. Show `Q10.2`–`Q10.4` only if `Q10.1 ≠ None of the above` |
| **G11** — Existing governance | Always |
| **G12** — Consultancy accreditation | Always |

**Question-level conditions**

| Question | Shown when |
|---|---|
| `Q2.3` (children's age band) | `Q2.2` includes "Children's data" |
| `Q3.2` (finer record band) | `Q4.1 = Temporary` **and** `Q3.1 = 1 to 100,000` |
| `Q4.2` (expected duration) | `Q4.1 = Temporary` |
| `Q5.4` (recipient within group) | `Q5.3 = Yes` |
| `Q12.2` (capacity) | `Q12.1 ≠ No` |

`Q3.2` depends on an answer given in a **later** group. Either move Group 4 ahead of Group 3 in presentation order, or present `Q3.2` as a follow-up after `Q4.1` is answered. Presentation order is yours to choose; the identifiers in the question bank are stable and must not be renumbered.

---

## 5. Contact gate

### 5.1 Fields — all mandatory

| Field | Type | Validation |
|---|---|---|
| Company name | text | required, 2–120 characters |
| Full name and job title | text | required, 2–120 characters |
| Work email | email | required, valid format |
| Phone number | tel | required, digits and `+` only, 8–20 characters |

State the purpose plainly next to the fields: *"We use these details to produce and deliver your assessment result."*

### 5.2 Marketing consent — separate, optional, unchecked

**This is a legal requirement, not a preference.** A single unchecked checkbox, visually separated from the mandatory fields:

> ☐ I agree to receive occasional communications from Hamza & Partners Law Firm about Egypt's Personal Data Protection Law and related services. Your result will be shown whether or not you check this box.

Rules the implementation must honor:

- The box is **never** pre-checked.
- The submit button is **never** disabled on account of this box.
- The result renders identically whether it is checked or not.
- The boolean is persisted as its own field.

The basis: PDPL Article 17 requires prior explicit consent for direct electronic marketing; ER Article 18(First)(2) repeats it; and the PDPC *Data Protection Compliance Plan Checklist*, Section VII, *Data Subject Rights and Preferences*, item (b), asks whether the data subject "is not compelled to consent to receiving electronic marketing communications as a condition for accessing a service." Requiring contact details to deliver the result is legitimate, because delivering the result is the service. Requiring marketing consent to deliver the result is not.

---

## 6. Result page

### 6.1 Structure, in order

1. **Your role under the PDPL** — controller, processor, or both, in one sentence, with the article cited.
2. **The primary license or permit you need** — type, category, and fee band. If the band is fee-exempt, say so and immediately add that exemption from the fee is not exemption from the license.
3. **Supplementary licenses and permits** — one card each, with the fee percentage and what triggers it.
4. **Registrations and accreditations** — DPO registration and category, in-country representative, consultancy accreditation.
5. **Your document and obligation map** — grouped as *Required*, *Already in place* (deducted via `Q11.1`), and *Needs verification* (the "Not sure" bucket).
6. **Items requiring examination before a firm conclusion** — every "Not sure" answer, naming the question that produced it.
7. **Timeline** — statutory deadlines that apply to the visitor.
8. **Call to action** — free consultation or a booked online meeting.
9. **Disclaimer** — section 7, always visible, never behind a toggle.

### 6.2 Fees

Official fee bands are displayed with **both bounds**, taken from the tables in `03-INFERENCE-RULES.md`. Never display an upper bound alone. Never display any figure representing the firm's own professional fees — the tool quotes PDPC fees only, and the disclaimer says so.

### 6.3 Hedged outputs

Where a rule marks an output as *probable* rather than definite — DPO category is the main case — the copy must say so. Use "likely" or "on the information given," never a bare assertion.

### 6.4 "Not sure" answers

A "Not sure" answer never silently drops an output and never fabricates one. It routes the item into section 6 of the result under a heading such as *"Items we could not determine from your answers."* Each entry names the question. This is more honest than guessing and it makes the case for a professional review better than any marketing line would.

---

## 7. Disclaimer — approved text

Render verbatim:

> This tool is provided for awareness and preliminary scoping purposes only. The result is based on the answers you provide, without independent verification, and does not constitute legal advice or a legal opinion. Use of this tool does not create an attorney-client relationship between you and Hamza & Partners Law Firm. A definitive assessment of your position requires a professional review of your processing activities.
>
> The fees shown are taken from the financial schedules of the Executive Regulations of the Personal Data Protection Law. They are **official fees payable to the Personal Data Protection Center** and do not include professional fees.

---

## 8. Privacy notice section — English and Arabic

The tool collects personal data. The firm is a **controller** in respect of it. A privacy notice must appear on the page itself, in both languages, before the contact fields are submitted.

Required content, per PDPL Article 3 and ER Article 2(Second)(1):

- Identity and contact details of the controller: Hamza & Partners Law Firm, 48 Fareed Semeika Street, Hegaz Square, Nozha, Cairo, Egypt; +20 100 170 7074; dpo@hamzalawfirm.com
- Categories of data collected: the contact details of section 5.1 and the answers given
- Purpose: producing and delivering the assessment result, and — only where consent is given — subsequent marketing communications
- **That the data is stored on Firebase infrastructure located outside the Arab Republic of Egypt**, and that submitting constitutes consent to that transfer
- Retention period
- The data subject's rights under PDPL Article 2, and that requests are sent to dpo@hamzalawfirm.com and answered within six working days (PDPL Article 32)
- How to withdraw consent

### 8.1 Two open inputs

Two values are still outstanding and the notice cannot be finalized without them. Implement with clearly marked placeholders and do not invent values:

- `[RETENTION_PERIOD]` — how long submissions are kept
- `[FIREBASE_REGION]` — the country in which the Realtime Database instance is provisioned; determine it from the Firebase console and report it

---

## 9. Data model — Realtime Database

Follow the existing convention in `src/core/utils/fb_api.ts`: `push()` for the key, then `set()`.

**Collection:** `pdplAssessments/`

```
pdplAssessments/{pushId}
  submittedAt        : number     // Date.now()
  uid                : string     // anonymous auth UID
  locale             : string     // "en"
  contact
    company          : string
    fullName         : string
    email            : string
    phone            : string
  marketingConsent    : boolean
  consentRecord
    givenAt          : number
    method           : string     // "web-form"
    noticeVersion    : string     // version of the privacy notice shown
  questionSetVersion : string     // version of 02-QUESTION-BANK.md in force
  ruleSetVersion     : string     // version of 03-INFERENCE-RULES.md in force
  answers            : { [questionId: string]: string | string[] }
  result
    role             : string     // "controller" | "processor" | "both"
    primary          : string     // output code, e.g. "BAS-L-CP"
    supplementary    : string[]   // e.g. ["SUP-XB","SUP-MKT-SELF"]
    registrations    : string[]
    documents        : string[]
    unresolved       : string[]   // question ids answered "Not sure"
  retentionUntil     : number     // submittedAt + [RETENTION_PERIOD]
```

Notes:

- `answers` is keyed by the **stable question identifiers** from `02-QUESTION-BANK.md`. Never key by question text.
- `result` stores **output codes**, never rendered prose. Prose changes; the codes are the record.
- `consentRecord` and `noticeVersion` exist so that the firm can later prove what the person was shown and when. ER Article 2(Second)(3) requires an electronic record of consent, its date, and the form it took.
- `retentionUntil` is written from day one even though the deletion job does not exist yet. Adding the field later to historical records is far harder than writing it now.
- `questionSetVersion` and `ruleSetVersion` are essential. The questions and rules will change as the PDPC issues further guidance. Without them, a stored `answers` object becomes uninterpretable the first time a question is added or an option reworded, and a stored `result` cannot be explained after a rule changes. Bump the version string whenever either document changes, and never reuse one.

---

## 10. Security rules

Commit as `database.rules.json` and reference it from `firebase.json`. For the new collection:

- **Read: denied to all clients.** The browser never reads this data back.
- **Write: create-only.** A client may create a new child. It may not update or delete an existing one.
- **Authenticated:** `auth != null` — anonymous sign-in supplies the principal.
- **Validated:** required fields present; correct types; bounded string lengths; `submittedAt` within a sane window of server time; no keys outside the documented shape.

Submit the proposed rules for review before deployment. Also review `contactReq/` and `hiringReq/` while you are there — see `00-WEBSITE-READINESS-BRIEF.md` section 3.2.

---

## 11. Accessibility and responsive behavior

- Every input has a programmatically associated `<label>`. Placeholder text is not a label.
- Full keyboard operability; visible focus states; logical tab order.
- Validation errors are announced to assistive technology and are tied to their field, not shown only as color.
- The flow is usable at 320 px width. Fee tables scroll horizontally inside their own container; the page body never scrolls horizontally.
- Contrast meets WCAG 2.1 AA.
- Respect `prefers-reduced-motion`; AOS animations must not be required to reveal content.

---

## 12. Out of scope

Do not build these. They were considered and excluded:

- Email delivery of the result. No Cloud Functions exist and none are being provisioned.
- Saving and resuming a partially completed assessment.
- User accounts beyond anonymous authentication.
- An Arabic version of the questionnaire. Only the privacy notice is bilingual.
- Any integration with the campaign suppression lists. Deferred by decision of August 24, 2026.

---

## 13. Companion documents

| File | Contents |
|---|---|
| `00-WEBSITE-READINESS-BRIEF.md` | Prerequisite audit and URL refactor |
| `02-QUESTION-BANK.md` | All 47 questions and answer options, verbatim, with identifiers |
| `03-INFERENCE-RULES.md` | Every inference rule, output code, and fee table |

The Arabic source of record, carrying the legal authority for every rule, is `Marketing/PDPL Campaign/stage (2)/PDPL-Website-Checklist-Questions-DRAFT-AR.md`. It is the firm's internal reference and is not part of the implementation.
