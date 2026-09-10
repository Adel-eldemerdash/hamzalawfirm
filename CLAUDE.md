# Repository Guide — hamzalawfirm.com

Working reference for any agent or engineer operating in this repository. Read it before making changes.

---

## 1. What this is

The public website of **Hamza & Partners Law Firm** (Cairo, Egypt), served at `https://www.hamzalawfirm.com`.

| Layer | Implementation |
|---|---|
| Build | Webpack 5 — one entry per page, `ts-loader`, one `HtmlWebpackPlugin` per page |
| Language | TypeScript 5.8 |
| UI | Bootstrap 5.3 (SCSS), jQuery 3.7, AOS 2.3, Ionicons via CDN |
| Backend | Firebase 12 — Realtime Database, Anonymous Auth |
| Analytics | Google Analytics 4 (`G-TJH0LMLYQQ`) via the Google tag, injected into every page by production builds only; events in `src/core/utils/analytics.ts` |
| Hosting | Firebase Hosting, project `hamza-lawfirm`, serving `dist/` |

Pages live in `src/pages/<name>/` as `<name>.html` + `<name>.ts`. Shared markup is injected at build time by `headerInjection()` in `webpack.config.js`: SEO head, splash screen, nav, footer.

---

## 2. Hard rules

### 2.1 Routes never contain spaces

No route may contain a space, an encoded space (`%20`), a comma, or any punctuation. Words are separated by a **single hyphen**, lowercase.

```
✅  /services/mediation-arbitration-and-dispute-resolution
❌  /services/Mediation,%20Arbitration,%20and%20Dispute%20Resolution
```

This applies to every existing route and every route added in future. Slug generation goes through **one shared utility** — never inline a second implementation.

### 2.2 The page folder name is the public URL

`headerInjection(targetPage)` reads `src/pages/${targetPage}/${targetPage}.html` and emits `canonical = https://www.hamzalawfirm.com/${targetPage}`. The canonical tag is derived from the folder name, so **the folder name must equal the intended public slug**. New pages use kebab-case for this reason, even though `ourFirm` and `serviceDetails` predate the rule.

### 2.3 Adding a page requires five edits

Miss one and the page ships broken or invisible:

1. `src/pages/<slug>/<slug>.html` and `<slug>.ts`
2. an entry in `module.exports.entry` in `webpack.config.js`
3. a `HtmlWebpackPlugin` instance with `filename: "./<slug>/index.html"` and `chunks: ["<slug>"]`
4. an entry in the `paths` array in `webpack.config.js`, for the sitemap
5. a link in `src/core/nav/nav.html`

### 2.4 Never break an existing URL

Any change to a route requires an HTTP **301** redirect in `firebase.json` from the old URL. The site is indexed; losing URLs loses rankings.

### 2.5 Database security rules are the only access control

The Firebase config in `src/core/utils/T_sys.ts` is public by design, as it is for every Firebase web client. That means **the database rules are the entire security boundary**.

- Rules must live in `database.rules.json`, committed to this repository and referenced from `firebase.json`.
- Any node holding personal data — `contactReq/`, `hiringReq/`, `pdplAssessments/` — must be **write-only from the client**, create-only, shape-validated, and gated on `auth != null`.
- Never widen a rule to make a feature work. Fix the feature.

### 2.6 Never commit secrets

Service account keys, admin credentials, and API keys other than the public Firebase web config do not belong in this repository. Check `.gitignore` before adding anything under `.firebase/` or `.idx/`.

---

## 3. Commands

```bash
npm start           # dev server, opens browser
npm run build:dev   # development build
npm run build:prod  # production build
npm run deployfirebase
```

**Do not run `npm run deployAll`.** It chains a production build, `git add . && git commit -m "automated commit" && git push origin main`, and a Firebase deploy in a single step — committing everything in the tree with a generic message straight to `main`, then publishing it. Run the three stages separately so each can be reviewed.

**Work on a branch.** Never commit directly to `main`. Open a pull request and let a human read the diff before it reaches production.

---

## 4. The PDPL Assessment Tool

A new page at `/pdpl-checklist` implementing a self-assessment questionnaire on Egypt's Personal Data Protection Law. Its specification lives **outside this repository**:

```
D:\Hamza & Prtners Law firm\Marketing\PDPL Campaign\stage (2)\handoff-EN\
  00-WEBSITE-READINESS-BRIEF.md   ← do this first, get sign-off
  01-TOOL-SPEC.md
  02-QUESTION-BANK.md
  03-INFERENCE-RULES.md
```

### 4.1 Question and rule content is not yours to change

`02-QUESTION-BANK.md` and `03-INFERENCE-RULES.md` are legal work product. Every question, answer option, inference rule, and fee figure is traceable to a specific article of the law, the Executive Regulations, or a Personal Data Protection Center guideline, and to decisions recorded by the firm.

- **Question identifiers (`Q0.1`, `Q6.2`, …) are permanent.** They are database keys and rule operands. Never renumber them.
- **Output codes (`BAS-L-CP`, `SUP-XB`, `DOC-ROPA`, …) are permanent** for the same reason.
- If a question is ambiguous, an option is missing, or a rule appears contradictory, **stop and report it**. Do not fix it in code. The correction is made in the Arabic source of record first, then flows back into these files.

### 4.2 Legal copy renders verbatim

The disclaimer in `01-TOOL-SPEC.md` §7 and the privacy notice content in §8 are approved text. Do not paraphrase, shorten, or "improve" them.

### 4.3 The marketing consent checkbox

Separate from the mandatory contact fields, never pre-checked, and never a condition of seeing the result. This is a legal requirement under PDPL Art. 17 and ER Art. 18, not a design preference. Do not let a UX refactor collapse it into the submit action.

---

## 5. Language

**All code, comments, commit messages, variable names, console output, and documentation in this repository are in English.** The site's user-facing copy is English. The single exception is the privacy notice block on `/pdpl-checklist`, which ships in English and Arabic; the Arabic block carries `dir="rtl"` scoped to itself and must not change the document direction.

---

## 6. Known issues — flag, do not silently fix

| Issue | Note |
|---|---|
| All five pages ship `description: "Test Description"` and `keywords: "Test Keywords"` | Placeholder text live in production. Worth fixing, as its own reviewed change |
| `paths` array contains `{ path: "/service/TEST" }` | Placeholder route in the sitemap |
| Telemetry in `T_sys.ts` (the `vistors/` writer) is commented out | Decide whether this ships; do not leave it ambiguous. Google Analytics is separate and live |
| Google Analytics runs without a consent banner | The firm's decision of September 10, 2026, during the compliance period, while the privacy and cookie policy is prepared. The checklist's own `W4-cookie` item tells visitors analytics needs consent, so a banner with Consent Mode is expected to follow |
| No `database.rules.json` in the repository | Rules are console-managed, unversioned, unreviewed. Export and commit them |
| Three separate Google Fonts requests plus a CDN Ionicons module on every page | Render-blocking third-party requests |
| Splash screen sets `body { overflow: hidden }` until `window.load`, with a 10-second fallback | Measure its effect on perceived load and CLS |

---

## 7. Before you deploy

- [ ] Production build succeeds with no TypeScript or ESLint errors
- [ ] Every route returns 200; every changed route has a 301 from its old URL
- [ ] No route contains `%20`, a space, or a comma
- [ ] Sitemap lists only live, slugged URLs
- [ ] `canonical` on every page matches its actual public URL
- [ ] Database rules reviewed and committed
- [ ] No secrets added to the tree
- [ ] Lighthouse run on the changed routes, mobile and desktop, and the numbers recorded
- [ ] Diff reviewed by a human
