# PDPL Assessment Tool — Inference Rules and Fee Tables

Every rule is `condition → output`. Outputs are the codes defined in section 1; the engine emits codes, and the presentation layer turns codes into prose. **No output may be produced that is not defined in section 1.**

Citations: "PDPL Art. x" is Law No. 151 of 2020; "ER Art. x" is the Executive Regulations issued by Decree No. 816 of 2025. Where an article is cited as `x(First)(2)` the reference is to the numbered paragraph within that article.

---

## 1. Output codes

### 1.1 Legal role

| Code | Meaning |
|---|---|
| `ROLE-C` | Controller |
| `ROLE-P` | Processor |
| `ROLE-CP` | Controller and processor |

### 1.2 Primary license or permit — exactly one is emitted

| Code | Meaning |
|---|---|
| `BAS-L-CP` | Combined controller/processor license — legal persons |
| `BAS-L-C` | Controller-only license — legal persons — **half the fee** |
| `BAS-L-P` | Processor-only license — legal persons — **half the fee** |
| `BAS-P` | Controller and/or processor permit — defined, temporary purpose not exceeding one calendar year |
| `BAS-SPECIAL` | Special fee schedule: associations and clubs |

**Eligibility.** A **legal person** may hold a license or a permit. A **natural person** may hold a **permit only** and may not hold a license. Source: Licenses and Permits Guideline, item 3; ER Arts. 20 and 22.

**Mutual exclusivity.** The primary license and the primary permit are alternatives and are never held together. A license, once issued, covers processing operations "whatever their nature or scope."

### 1.3 Sensitive personal data

| Code | Meaning |
|---|---|
| `SENS` | License **or permit** to handle sensitive personal data, according to the applicant's capacity |
| `SENS-CONSENT` | Written, explicit consent — on paper or electronic |
| `SENS-REG` | Secured electronic records of consents and of erasure, amendment, and suspension requests |

Source: PDPL Arts. 12 and 26(6); ER Arts. 14 and 19–22. PDPL Art. 26(6) empowers the PDPC to issue "licenses **or permits** relating to the control and processing of sensitive personal data," which settles the wording of Art. 12.

### 1.4 Supplementary licenses and permits

Nothing supplementary may issue, or remain valid, without a valid primary instrument.

| Code | Meaning | Fee |
|---|---|---|
| `SUP-XB` | Cross-border transfer of personal data — covers transfer, storage, sharing, processing, and making data available outside Egypt, including cloud hosting on foreign servers and making data available to another controller or processor within the group | **50%** of the primary fee |
| `SUP-MKT-SELF` | Direct electronic marketing — **own account** | **10%** of the primary fee |
| `SUP-MKT-3P` | Direct electronic marketing — **third party** | **25%** of the primary fee |
| `SUP-CCTV` | Visual surveillance in public places | License: **EGP 1,000 per three years**. Permit: **EGP 500 per year** |

> **Making data available is not a separate instrument.** The Licenses and Permits Guideline, item 2.2, lists only one supplementary instrument for cross-border movement, and ER Art. 27 prices only that one. PDPL Art. 16 and ER Art. 17 add **substantive conditions** to the same instrument, not a new one.
>
> **A wording difference worth flagging:** PDPL Art. 14 and ER Art. 23 say "license **or permit**," whereas PDPL Art. 16 and ER Art. 17 say "**license**" alone for making data available. A holder eligible only for a permit may therefore not be eligible for intra-group availability.

### 1.5 Registrations and accreditations

| Code | Meaning | Source |
|---|---|---|
| `REG-DPO` | Registration of a Data Protection Officer in the PDPC register and issuance of a **DPO code** | PDPL Art. 8; ER Arts. 7–12 |
| `DPO-A` | Category **A — Lead DPO**: 2,000,000 records and above | DPOC Guideline, Section I |
| `DPO-B` | Category **B — Advanced DPO**: 100,000 up to 2,000,000 records | DPOC Guideline, Section I |
| `DPO-C` | Category **C — Entry-Level DPO**: 1 up to 100,000 records | DPOC Guideline, Section I |
| `DPO-SHARED` | Shared DPO — binding contractual agreement defining scope and accountability, subject to the PDPC's prior review and acceptance | ER Art. 11; DPOC Guideline, Section II |
| `REG-REP` | Appointment of a PDPC-approved representative inside Egypt, for a foreign entity with no branch or representative office | ER Arts. 3(First)(6) and 4(First)(5) |
| `ACC-NAT` | Data protection consultancy accreditation — natural person: **EGP 5,000 per year** | ER Arts. 32 and 34 |
| `ACC-LEG` | Data protection consultancy accreditation — legal person: **EGP 50,000 per year** | ER Arts. 33 and 34 |
| `APP-MECH` | PDPC approval of the data collection and consent mechanisms, including parental consent for children's data | ER Art. 2(First)(3) |
| `APP-MECH-DSR` | PDPC approval of the mechanism enabling data subjects to exercise their rights | PDPL Art. 2; ER Art. 3(First)(5) |

### 1.6 Documents and obligations

| Code | Document or obligation | Source |
|---|---|---|
| `DOC-POLICY` | Data protection policy, in two parts: **(a) governance** — principles, roles and responsibilities, oversight body, segregation of duties, privacy risk management process; **(b) operations** — staff instructions on collecting, using, retaining, and sharing data | Binding: PDPL Arts. 4 and 5; ER Arts. 3 and 4. Interpretive for part (a): PDPC Compliance Plan Checklist, Section II/8, *Governance and Accountability* |
| `DOC-WEBPRIV` | Website and application privacy notice | PDPL Art. 3; ER Art. 2 |
| `DOC-COOKIE` | Cookie policy | PDPL Art. 6; ER Art. 2 |
| `DOC-CONSENT` | Consent management guidelines and mechanisms | PDPL Art. 6; ER Art. 2 |
| `DOC-CONS-EMP` | Employee consent form | PDPL Art. 6; ER Art. 2 |
| `DOC-CONS-CAND` | Job applicant consent form | PDPL Art. 6; ER Art. 2 |
| `DOC-CONS-CHILD` | Parental consent mechanism and forms | PDPL Art. 12; ER Art. 15 |
| `DOC-VISITOR` | Visitor privacy notice, including visual surveillance | ER Arts. 2, 3, and 31 |
| `DOC-ROPA` | Record of processing activities | PDPL Art. 4; ER Art. 21(2) |
| `DOC-PROCREC` | Processor's record of processing operations | ER Art. 4(Second)(3) |
| `DOC-DSR` | Data subject request procedure, forms, and logs | PDPL Arts. 2 and 32; ER Art. 3(First)(5) |
| `DOC-COMPLAINT` | Complaint policy, form, and log | PDPL Art. 33 |
| `DOC-BREACH` | Breach management procedure, incident register, and regulator notification form | PDPL Art. 7; ER Arts. 5 and 6 |
| `DOC-RETENTION` | Retention and erasure policy and schedule | PDPL Art. 3; ER Art. 3(First)(4) |
| `DOC-DPA` | Data processing agreement and vendor risk management policy | PDPL Arts. 4 and 5 |
| `DOC-TRAIN` | Training and awareness program | PDPL Art. 13; ER Art. 12 |
| `DOC-DPO-CHART` | DPO charter, compliance monitoring procedure, and annual report | PDPL Art. 9; ER Art. 12(1) |
| `DOC-MKT-REC` | Marketing consent records — **three years from the date of the last message** | PDPL Art. 18; ER Art. 18(Second)(4) |
| `DOC-DPIA` | Data protection impact assessment methodology and template | **Interpretive** — no express provision; inferred from ER Art. 3 |
| `DOC-TIA` | Transfer impact assessment | **Interpretive** — PDPC Compliance Plan Checklist, Section VI(h) |
| `DOC-AI` | Controls on using personal data to train artificial intelligence and emerging technologies | ER Art. 4(First)(7) |

---

## 2. Scope rules — evaluated first; a firing exclusion ends the assessment

| # | Rule | Source |
|---|---|---|
| N1 | `Q0.1 = No — entirely on paper` → **the PDPL does not apply to this data**, with a note that any later digitization brings it into scope. **Terminates the flow.** | Promulgation Art. 1; PDPC Checklist, Section I (interpretive) |
| N2 | `Q0.2` includes *bank or entity under CBE supervision* **and not** *money transfer or currency exchange* → **excluded** from the scope of the annexed law; the Central Bank's own rules apply. **Terminates the flow.** | Promulgation Art. 3(6) |
| N3 | `Q0.2` includes *money transfer or currency exchange company* → **in scope**, by the express carve-out from the exclusion, **with dual subjection**: the rules laid down by the Central Bank on handling personal data are also to be observed in their regard | Promulgation Art. 3(6) |
| N4 | `Q0.2` includes *press or media entity* **and** processing is exclusively for that purpose → excluded, conditional on accuracy and on the data not being used for any other purpose. **Terminates the flow.** | Promulgation Art. 3(3) |
| N5 | `Q0.2` includes *association* or *club* → `BAS-SPECIAL` with its own fee schedule | ER Art. 19 |
| N6 | Any selection in `Q0.3` **or** `Q0.4` other than *Not sure* → within territorial scope | Promulgation Arts. 1 and 2; PDPC Checklist, Section I, items 3–7 (interpretive) |
| N6a | `Q0.4` includes *Egyptian nationals residing outside Egypt* **or** *foreign nationals residing inside Egypt* → notice that scope extends to that data even where the processing occurs outside Egypt | Promulgation Art. 2; PDPC Checklist, Section I, items 6 and 7 (interpretive) |
| N7 | `Q0.3` includes *foreign entity with no branch or representative office* → `REG-REP` | ER Arts. 3(First)(6) and 4(First)(5) |

---

## 3. Role rules

| # | Rule |
|---|---|
| R1 | `Q2.1` includes any category of data subject → `ROLE-C` |
| R2 | `Q1.1 = Yes` **or** `Q1.2 = Yes` → `ROLE-P` |
| R3 | R1 and R2 both satisfied → `ROLE-CP` |
| R4 | `Q1.1 = Not sure` **and** no other indicator of processor status → present as: *"You are a controller. Whether you are also a processor requires examination."* |

> Anyone with employees in Egypt is a controller as to their data. `ROLE-C` therefore fires in nearly every case, and the live question is whether `ROLE-P` attaches alongside it.

---

## 4. Primary instrument rules

| # | Rule | Source |
|---|---|---|
| B1 | `Q0.2` includes *sole trader or individual professional practice* → `BAS-P` only; a natural person may not hold a license | Licenses Guideline, item 3; ER Arts. 20 and 22 |
| B2 | `Q0.2` does **not** include *sole trader* (i.e. a legal person) **and** `Q4.1 = Ongoing` **and** `ROLE-CP` → `BAS-L-CP` | ER Art. 19 |
| B3 | legal person **and** `Q4.1 = Ongoing` **and** `ROLE-C` only → `BAS-L-C` (**half the fee**) | ER Art. 19 |
| B4 | legal person **and** `Q4.1 = Ongoing` **and** `ROLE-P` only → `BAS-L-P` (**half the fee**) | ER Art. 19 |
| B5 | `Q4.1 = Temporary` **and** `Q4.2 ≤ 1 year` → `BAS-P`. The fee is the **intersection** of the record band with the duration band in the table at 7.2. The record band comes from `Q3.1`; where it falls in *1 to 100,000*, refine it with `Q3.2`, because the permit schedule breaks at **25,000**, not 100,000 | ER Art. 20 |
| B5a | `Q3.2 = 1 to 25,000` **and** `BAS-P` → **exempt from permit fees** for any duration. `Q3.2 = More than 25,000 up to 100,000` **and** `BAS-P` → payable (EGP 10,000–25,000 by duration) — unlike the license, which exempts the whole band up to 100,000 | ER Arts. 19 and 20 |
| B5b | `Q4.2 = More than 1 year` → a permit may not exceed one calendar year; present the result as a **license**, not a permit | ER Art. 20; PDPL Art. 1 (definition of permit) |
| B6 | `Q4.1 = Not sure` → present `BAS-L-*` as the more likely outcome, stating that the license and the permit are **alternatives that are not held together**, and that an organization processing its employees' or customers' data in the ordinary course is ongoing by nature | ER Arts. 19 and 20; Licenses Guideline, item 2 |
| B7 | **Unconditional footnote** on the primary result: *"If you already hold a valid license or permit from the PDPC, what is required is a review of whether its scope covers your actual activity and data volume — not a new application. You may apply to amend it when the nature of the activity, the scope of processing, or the data volume changes."* | PDPL Art. 28; Licenses Guideline, item 5.2 |

---

## 5. Sensitive data rules

| # | Rule | Source |
|---|---|---|
| S1 | Any selection in `Q2.2` other than *None of the above* → `SENS` + `SENS-CONSENT` + `SENS-REG` | PDPL Arts. 12 and 26(6); ER Art. 14 |
| S2 | `Q2.2` includes children's data **and** `Q2.3 = Under 15` → `DOC-CONS-CHILD`, requiring **written explicit consent from the guardian before collection**, stating the period for which it is given | ER Art. 15 |
| S3 | `Q2.3 = 15 to 18` → the child or the guardian, as the case may be, must furnish the guardian's consent | ER Art. 15 |
| S4 | `Q2.2` includes children's data → **unconditional** notice: it is prohibited to collect more than is necessary for participation in a game, competition, or other activity, and to use children's data for profiling, tracking, or behavioral monitoring | PDPL Art. 12; ER Art. 14(5) |
| S5 | `Q2.4 = Yes` → `DOC-DPIA` (interpretive) + notice on the lawful basis for profiling | — |
| S6 | `Q2.5 = Yes` or `We plan to` → `DOC-AI` | ER Art. 4(First)(7) |

---

## 6. Cross-border rules

| # | Rule | Source |
|---|---|---|
| X1 | `Q5.1` includes global cloud services or servers outside Egypt, **or** `Q5.2 = outside Egypt / distributed`, **or** `Q5.3 = Yes` → `SUP-XB` (**50%**) | PDPL Art. 14; ER Arts. 23–27; Licenses Guideline, item 2.2(a) |
| X2 | `Q5.4 = Yes (within the group)` → **the same** `SUP-XB`, not an additional instrument, with the availability conditions added: the group's activities must be of a shared or integrated nature; there must be a legitimate interest; and the protection afforded by the recipient must be no less than that applied in Egypt. This includes a colleague abroad **merely viewing** data about Egyptians, viewing being a form of making available | PDPL Art. 16; ER Art. 17 |
| X3 | X2 satisfied **and** `BAS-P` (permit, not license) → surface the wording difference between "license or permit" for transfer and "license" alone for making available (see 1.4) | PDPL Arts. 14 and 16 |
| X4 | `SUP-XB` satisfied → `DOC-TIA` (interpretive) + notice that **the data subject's consent is a separate condition** alongside the license | ER Art. 16(First)(2) |
| X5 | `Q5.2 = Not known` → present as *"likely — the hosting location must be established first"* | — |
| X6 | `SUP-XB` satisfied → notice of the obligation to **update** the license when further countries are added during its term | ER Art. 16(First)(4) |

---

## 7. Direct electronic marketing rules

| # | Rule | Source |
|---|---|---|
| M1 | `Q6.1 ≠ No` **and** `Q6.2 = own account` → `SUP-MKT-SELF` (**10%**) | ER Art. 29 |
| M2 | `Q6.2 = third party` → `SUP-MKT-3P` (**25%**) | ER Art. 29 |
| M3 | `Q6.2 = Both` → both categories | ER Art. 29 |
| M4 | Any `SUP-MKT-*` satisfied → **unconditional** notice: prior explicit consent from the data subject is a separate condition that the license does not displace, and it must precede the first marketing contact | PDPL Art. 17; ER Art. 18(First)(2) |
| M5 | `Q6.3` includes *public sources* or *purchased* → notice: a marketing intermediary must verify that consent was obtained and retain evidence of its source, failing which it must **immediately cease** using the data | ER Art. 18(Second)(3) |
| M6 | `Q6.4 ≠ Yes, all three` → notice of the message-content requirements | PDPL Art. 17; ER Art. 18(Second)(2) |
| M7 | `Q6.5 = No` → notice of the requirement for a clear and easily accessible refusal and withdrawal mechanism | PDPL Art. 17 |
| M8 | `Q6.6 = No` → `DOC-MKT-REC`, three years from the date of the last message | PDPL Art. 18; ER Art. 18(Second)(4) |
| M9 | Any `SUP-MKT-*` satisfied → **unconditional** notice of the obligation to **erase** in two cases: withdrawal of consent, or expiry of the retention period or the marketing purpose ceasing, whichever is earlier | ER Art. 18(First)(3) |

---

## 8. Visual surveillance rules

| # | Rule | Source |
|---|---|---|
| V1 | `Q7.1 = Yes` **and** `Q7.2` includes areas the public enters, or external perimeter or parking → `SUP-CCTV` | ER Art. 31 |
| V2 | `Q7.2 = Residential units only` → excluded, provided the cameras do not exceed the boundaries of the premises | ER Art. 31, final paragraph |
| V3 | `Q7.3 = No` → `DOC-VISITOR` + notice of the requirement to display notices in visible locations | ER Art. 31(2) |
| V4 | `Q7.4 = Yes` → notice of the prohibition except in cases prescribed by law or with the data subject's explicit consent | ER Art. 31(4) |
| V5 | `Q7.5 = Yes` → notice of the prohibition on transferring recordings outside Egypt except for reasons prescribed by law — **a stricter prohibition than the general transfer rule** | ER Art. 31(3) |
| V6 | `Q7.2` includes internal staff-only areas → notice of the requirement to inform employees; no license is required where the area is not a public place | ER Art. 31, by implication |

> **"Public places" is not defined** in the PDPL, the ER, or any PDPC guideline. The classification adopted here — public areas, external perimeter, and parking are public places; internal staff areas are not; residential units are excluded by express text — is an **interpretation approved by the firm on August 24, 2026**. Present the outcome as definite on that basis.

---

## 9. Data Protection Officer rules

| # | Rule | Source |
|---|---|---|
| D1 | Legal person → `REG-DPO` **always, whatever the scale of processing** | PDPL Art. 8; DPO Guideline, item 3.1 |
| D2 | Natural person → may appoint a DPO or assume the obligations personally | PDPL Art. 8; DPO Guideline, item 3.1 |
| D3 | `Q9.1 = No` **or** `Q9.2 ≠ Yes` → `REG-DPO` as an open gap + `DOC-DPO-CHART` | — |
| D4 | `Q9.3 = External service provider` → notice: PDPL Art. 8 requires the legal representative of a legal person to appoint, **within its legal entity and staffing structure, a competent employee** responsible for personal data protection, to register that person in the PDPC register, and to disclose the appointment publicly | PDPL Art. 8 |
| D5 | `Q9.3 = Shared` → `DPO-SHARED`: consent of every entity, the PDPC's prior review and acceptance, a separate system, a binding contractual agreement defining scope and accountability, and direct reporting to the highest level of management **in each entity** | ER Arts. 11 and 12(5); DPOC Guideline, Section II |
| D6 | **Unconditional footnote** on the DPO result — position and independence: the role must not conflict with any other assignment that would prejudice data protection; the position must sit at a sufficiently senior level; the DPO must report directly to the highest level of management; and the DPO must be protected against dismissal or disciplinary action for performing the role | ER Art. 12(4) (binding); PDPC Checklist, Section IV, *Position and Independence* (interpretive) |
| D7 | **Unconditional footnote**: contact details for the DPO must be made available and easily accessible to data subjects, the DPO being their point of contact and the point of contact with the PDPC | DPO Guideline, item 1; PDPC Checklist, Section IV, *Enabling Data Subject Rights* (interpretive) |
| D8 | `SENS` satisfied → notice that the DPO **code** must cover the nature and volume of the data handled | ER Art. 9 |
| D9 | `Q3.1` is **2,000,000 or above** (bands: 2–3M, 3–4M, 4–5M, more than 5M) → `DPO-A` | DPOC Guideline, Section I |
| D10 | `Q3.1` is **100,000 up to 2,000,000** (bands: 100–500K, 500K–1M, 1M–2M) → `DPO-B` | DPOC Guideline, Section I |
| D11 | `Q3.1 = 1 to 100,000` → `DPO-C` | DPOC Guideline, Section I |
| D12 | `DPO-A` or `DPO-B` satisfied → display the qualifying requirements: **A** — pass above 80%, two international certifications (or 50 documented training credit hours), 3–5 years' experience; **B** — pass above 70%, one certification (or 30 hours), 2–3 years | DPOC Guideline, Section I |
| D13 | **Always** → present the category as the **likely** one, not as settled, noting that final classification is at the PDPC's discretion and that it may conduct an assessment interview and reassign | DPOC Guideline, Important Note at the end of Section I |
| D14 | `REG-DPO` satisfied → notice that accreditation is subject to comprehensive reassessment **every three years**, and that the PDPC may initiate reassessment at any time | DPOC Guideline, Section III(B) |

---

## 10. Document and obligation rules

| # | Rule |
|---|---|
| W1 | **Always** → `DOC-POLICY` + `DOC-CONSENT` + `DOC-RETENTION` + `DOC-DSR` + `DOC-BREACH` + `DOC-TRAIN` + `DOC-COMPLAINT` |
| W2 | `ROLE-C` → `DOC-ROPA` ‖ `ROLE-P` → `DOC-PROCREC` ‖ `ROLE-CP` → both |
| W3 | `Q2.1` includes employees → `DOC-CONS-EMP` ‖ includes job applicants → `DOC-CONS-CAND` ‖ includes visitors to premises → `DOC-VISITOR` |
| W4 | `Q10.1` includes a website or application → `DOC-WEBPRIV` ‖ **and** `Q10.2 = Yes` → mark the item **"already in place"** and convert it to *"review whether the existing notice meets ER Art. 2"* rather than producing one anew ‖ `Q10.3 = Yes` → `DOC-COOKIE` + notice of the requirement for a consent mechanism that allows refusal as readily as acceptance |
| W5 | `Q8.1 = Yes` → `DOC-DPA` (controller side) — a processing agreement with every vendor that accesses data about individuals ‖ **and** `Q8.2 ≠ Yes, in all of them` → raise the item to a **priority gap** |
| W5a | `Q8.4` = any *Yes* answer → confirm `ROLE-P` ‖ **and** `Q8.4 ≠ Yes, governed by a written contract that contains data protection clauses` → `DOC-DPA` (processor side); a processor may not process except under a written contract and written instructions, and a copy of the processing contract is a required part of the processor's record |
| W5b | `Q8.3 = No` → raise the **vendor risk management policy** as a live gap: vendor selection criteria, privacy and security risk assessment before contracting, and monitoring thereafter |
| W6 | `Q11.1` — every item ticked is **deducted** from the gap list and displayed marked *"already in place"* |
| W7 | **Unconditional** notice of breach timelines: notify the PDPC within **72 hours** of becoming aware (and **immediately** where the breach touches national security considerations); notify the data subject within **three working days** of notifying the PDPC; and record the event in a secured electronic register. `DOC-BREACH` is deducted if ticked in `Q11.1` |
| W8 | `Q11.2 = No` → `DOC-DSR` at high priority — six working days, PDPL Art. 32 |
| W8a | `Q10.4 ≠ dedicated form or page / control panel` → `DOC-DSR` + **`APP-MECH-DSR`**: establish a mechanism **approved by the PDPC** enabling the data subject to request knowledge of and access to their data, withdraw consent, obtain correction or amendment, restrict processing to a defined scope, or object to processing |
| W9 | `Q11.3 = Yes` → note that certifications may cover part of the technical controls but do not displace the license or the legal documentation |
| W10 | **Always** → `APP-MECH` — PDPC approval of the collection and consent mechanisms |
| W11 | `Q11.4 = Yes` → **scope reduction** note: a substantial part of GDPR compliance documentation — records of processing, privacy notices, data protection addenda in vendor contracts, data subject request procedures, impact assessments — can be adapted to Egyptian requirements rather than created anew, and this is the single largest factor reducing scope, duration, and cost. It does **not** displace the license or permit, the DPO registration, or PDPC approval of the mechanisms |

---

## 11. Consultancy accreditation rules

| # | Rule | Source |
|---|---|---|
| A1 | `Q12.1 ≠ No` **and** `Q12.2` includes *in the company's name* → `ACC-LEG` — **EGP 50,000 per year**; the certificate is valid for three years | ER Arts. 33 and 34 |
| A2 | `Q12.2` includes *individual consultants* → `ACC-NAT` — **EGP 5,000 per year** per consultant | ER Arts. 32 and 34 |
| A3 | `ACC-LEG` → notice that a legal person's accreditation requires its personnel to hold PDPC accreditation and a valid permit to practice | ER Art. 33(3) |

---

## 12. "Not sure" handling

A *Not sure* answer neither produces nor suppresses an output. It routes the item into a dedicated result section — *"Items we could not determine from your answers"* — naming the question that produced it. This is more honest than guessing, and it makes the case for a professional review more persuasively than a marketing claim would.

---

## 13. Fee tables

Display **both bounds** of every band. Never display an upper bound alone.

### 13.1 Primary license — legal persons (ER Art. 19, annual values, EGP)

| Record band | Controller/processor license fee |
|---|---|
| 1 – 100,000 | **Exempt from license fees** |
| 101,000 – 1,000,000 | 200 to 1,000 (rising 100 per 100,000) |
| 1,000,001 – 2,000,000 | 5,000 to 50,000 (5,000 per 100,000) |
| 2,000,001 – 3,000,000 | 60,000 to 150,000 (10,000 per 100,000) |
| 3,000,001 – 4,000,000 | 165,000 to 300,000 (15,000 per 100,000) |
| 4,000,001 – 5,000,000 | 320,000 to 500,000 (20,000 per 100,000) |
| More than 5,000,000 | **666,666 per year** — the statutory maximum, totaling **2,000,000** across the three-year term |

- A **controller-only** or **processor-only** license is **half** the figures above.
- Associations: 5,000. Clubs with fewer than 50,000 member records: 20,000. Clubs with more than 50,000: 50,000.
- The statutory ceilings are set by PDPL Art. 26: **EGP 2,000,000 for a license** and **EGP 500,000 for a permit or accreditation**.

### 13.2 Permit (ER Art. 20, EGP)

| Record band | 1–3 months | >3–6 months | >6–9 months | >9–12 months |
|---|---|---|---|---|
| 1 – 25,000 | Exempt | Exempt | Exempt | Exempt |
| >25,000 – 250,000 | 10,000 | 15,000 | 20,000 | 25,000 |
| >250,000 – 500,000 | 12,500 | 25,000 | 37,500 | 50,000 |
| >500,000 – 1,000,000 | 25,000 | 50,000 | 75,000 | 100,000 |
| >1,000,000 – 2,000,000 | 50,000 | 100,000 | 150,000 | 200,000 |
| >2,000,000 – 3,000,000 | 75,000 | 150,000 | 225,000 | 300,000 |
| >3,000,000 – 4,000,000 | 100,000 | 200,000 | 300,000 | 400,000 |
| >4,000,000 – 5,000,000 | 125,000 | 250,000 | 375,000 | 500,000 |
| More than 5,000,000 | **500,000** — the statutory maximum for any period (PDPL Art. 26) | | | |

A **controller-only** or **processor-only** permit is **half** the figures above.

### 13.3 Supplementary

| Instrument | Fee |
|---|---|
| Cross-border transfer | 50% of the primary fee |
| Direct electronic marketing — own account | 10% of the primary fee |
| Direct electronic marketing — third party | 25% of the primary fee |
| Visual surveillance — license | EGP 1,000 per three years |
| Visual surveillance — permit | EGP 500 per year |

---

## 14. Statutory timelines displayed with the result

| Item | Period | Source |
|---|---|---|
| Decision on a license or permit application | **90 working days** from completion of the information and documents; **no response is a refusal** | ER Art. 36 |
| Decision on a cross-border transfer application | 90 working days from completion; no response is a refusal | ER Art. 26 |
| License term | Three years; renewal at least three months before expiry | Licenses Guideline, item 4.1 |
| Permit term | Not exceeding one year; renewal at least one month before expiry | Licenses Guideline, item 4.2 |
| Decision on DPO registration | 30 working days; 15 days after documents are completed | ER Art. 8 |
| Breach notification to the PDPC | 72 hours from becoming aware; immediately where national security is engaged | ER Art. 5 |
| Breach notification to the data subject | Three working days from notifying the PDPC | ER Art. 5 |
| Response to a data subject request | Six working days | PDPL Art. 32 |
| Decision on a complaint before the PDPC | 30 working days; the respondent implements within 7 working days of notification | PDPL Art. 33 |
| Compliance grace period | Ends **November 1, 2026** | Promulgation Art. 6; Decree No. 816 of 2025 published November 1, 2025 |

---

## 15. Traceability

The Arabic source of record, which carries the legal authority, the reasoning, and the firm's recorded decisions behind every rule above, is:

`Marketing/PDPL Campaign/stage (2)/PDPL-Website-Checklist-Questions-DRAFT-AR.md`

Where this document and the Arabic source diverge, the Arabic source governs and must be corrected first.
