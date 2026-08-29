# Website Readiness Brief — Work Required Before the PDPL Assessment Tool Is Built

**Repository:** `website/hamzalawfirm 23-06-2026`
**Target site:** https://www.hamzalawfirm.com
**Prepared:** August 24, 2026
**Audience:** the engineer implementing the PDPL Assessment Tool

---

## 0. Read this first

This brief covers **preparatory work only**. Complete it, report back, and obtain sign-off **before** implementing the assessment tool described in `01-TOOL-SPEC.md`.

There are three workstreams, in this order:

1. **Codebase and performance audit** — establish that the platform is sound before adding to it.
2. **URL slug refactor** — remove `%20` from every route across the site.
3. **Readiness checks** for the new page (routing, security rules, authentication).

Do not begin the assessment tool until items 1 and 2 are complete and approved.

---

## 1. Codebase and performance audit

### 1.1 Current stack, as observed

| Layer | Implementation |
|---|---|
| Build | Webpack 5, one entry per page, `ts-loader`, `HtmlWebpackPlugin` per page |
| Language | TypeScript 5.8 |
| UI | Bootstrap 5.3 (SCSS source), jQuery 3.7, AOS 2.3, Ionicons via CDN `<script type="module">` |
| Fonts | Google Fonts, three separate `<link>` requests per page |
| Backend | Firebase 12 — Realtime Database, Anonymous Auth (present but disabled), Analytics (present but commented out) |
| Hosting | Firebase Hosting, `public: "dist"` |
| Assets | `image-minimizer-webpack-plugin` with `imagemin-webp` at quality 80 |
| SEO | `sitemap-webpack-plugin`, shared `base-seo.html` injected into every page |

### 1.2 What the audit must cover

Produce a written report — do not change anything yet — covering at minimum:

**Performance**
- Run Lighthouse against the deployed production site for **every** route, on mobile and desktop. Record LCP, CLS, INP, TBT, and total transferred bytes per route.
- Identify the largest contributors to bundle size. `splitChunks` is configured with `vendor` and `common` groups; confirm the split is actually effective and that no page ships code it does not use.
- Assess the three separate Google Fonts requests and the CDN Ionicons module. Both are render-blocking third-party requests on every page. Recommend self-hosting, subsetting, or `font-display` strategy.
- Assess the splash-screen mechanism in `src/core/utils/global-init.ts`. It hides on `window.load` with a 10-second `setTimeout` fallback and sets `body { overflow: hidden }` until then. Quantify its effect on perceived load and on CLS.
- Confirm whether image optimization is actually running in production builds and what the output sizes are.

**Dependency health**
- jQuery is a hard dependency used for DOM work throughout. Assess whether it can be removed incrementally in favor of native DOM APIs, and quantify the byte saving.
- Bootstrap is imported wholesale via `@import "bootstrap/scss/bootstrap"` in `src/styles/main.scss`. Assess importing only the used components.
- Report any packages that are unused, duplicated, or superseded.

**Code quality**
- `src/core/utils/T_sys.ts` contains a telemetry system whose initialization is commented out, and `getAnalytics(app)` is likewise commented out. Determine whether this code is intended to ship. Dead code that touches analytics and authentication should not be left ambiguous.
- The Firebase config in `T_sys.ts` is committed in plain source. This is normal for Firebase web clients, but it makes **database security rules the only access control**. See section 3.2.
- Report on TypeScript strictness settings and any `any` usage that undermines type safety.

### 1.3 Recommending a stack change

If the audit shows that the current stack materially limits performance or maintainability, **propose the change with evidence** — measured numbers, migration effort, and risk — and wait for approval. Do not migrate unilaterally.

Constraints that any proposal must respect:

- Firebase Hosting and the existing Realtime Database must remain; the project is `hamza-lawfirm`.
- Existing public URLs must keep working, via redirects if the structure changes.
- The site must remain statically hosted; no server runtime is available and no Cloud Functions are provisioned.
- Total rebuild is out of scope unless the measured gain is substantial and you state it plainly.

---

## 2. URL slug refactor — required

### 2.1 The problem

Service detail URLs currently carry raw spaces, URL-encoded as `%20`:

```
https://www.hamzalawfirm.com/services/Mediation,%20Arbitration,%20and%20Dispute%20Resolution
```

This comes from `firebase.json`:

```json
"rewrites": [
  {
    "regex": "^/services/([\\w-&]+(?:%20[\\w-&]+)*)$",
    "destination": "/serviceDetails/serviceDetails.html?service=$1"
  }
]
```

The service name is used directly as both the URL segment and the Realtime Database key under `serviceData/`.

### 2.2 The requirement

**No route anywhere on the site may contain a space, an encoded space, or a comma.** Words are separated by a single hyphen (`-`). This applies to every existing route and to every route added in the future, including the assessment tool.

Target form:

```
https://www.hamzalawfirm.com/services/mediation-arbitration-and-dispute-resolution
```

### 2.3 Implementation requirements

1. **Slug function.** Write a single shared utility — one source of truth — that converts a display name to a slug: lowercase; strip commas, periods, ampersands, and any other punctuation; collapse whitespace runs to a single hyphen; collapse repeated hyphens; trim leading and trailing hyphens. Handle Arabic characters safely if any service name contains them.

2. **Slug-to-name resolution.** The database is keyed by display name. Do **not** rename database keys as part of this task. Instead, resolve in the client: read the `serviceData/` index, compute the slug of each key, and match the requested slug against it. If two names produce the same slug, fail loudly at build or load time rather than serving the wrong service.

3. **Rewrite rule.** Update the `firebase.json` rewrite to match slugs:
   ```
   ^/services/([a-z0-9]+(?:-[a-z0-9]+)*)$
   ```

4. **Redirects — mandatory for SEO.** Add Firebase Hosting `redirects` with HTTP **301** from every old `%20` URL to its new slug URL. Enumerate the existing service names from the database and generate the list. Losing the existing indexed URLs is not acceptable.

5. **Internal links.** Update every place that constructs a service URL so it emits slugs. Search the codebase for link construction in `src/pages/services/services.ts` and `src/pages/serviceDetails/serviceDetails.ts`.

6. **Sitemap.** The `paths` array in `webpack.config.js` currently contains a placeholder entry `path: "/service/TEST"`. Replace it with the real, slugged service routes, and remove the placeholder.

7. **Canonical tags.** `headerInjection()` in `webpack.config.js` builds the canonical URL as `https://www.hamzalawfirm.com/${targetPage}` from the page folder name. Verify that every canonical emitted matches the final public URL exactly, including the service detail pages.

8. **Verification.** After deployment, confirm: every old URL returns 301 to the new one; every new URL returns 200 and renders the correct service; the sitemap contains only slugged URLs; no internal link produces a `%20`.

### 2.4 Naming convention going forward

Page folders under `src/pages/` currently use camelCase (`ourFirm`, `serviceDetails`), and `headerInjection(targetPage)` derives both the template path and the canonical URL from that folder name. Because the canonical URL is derived from the folder name, **the folder name must equal the desired public slug**.

For the assessment tool the folder, the webpack entry, and the public route are all:

```
pdpl-checklist
```

This deliberately departs from the existing camelCase convention, and it is the correct choice: it keeps `canonical` accurate without special-casing. Where practical, propose renaming `ourFirm` and `serviceDetails` to `our-firm` and `service-details` with 301 redirects, as a separate change with its own approval.

---

## 3. Readiness checks for the new page

### 3.1 Routing and registration

The new page requires all of the following, and the assessment tool cannot ship without them:

- `src/pages/pdpl-checklist/pdpl-checklist.html` and `src/pages/pdpl-checklist/pdpl-checklist.ts`
- A new entry in `module.exports.entry` in `webpack.config.js`
- A new `HtmlWebpackPlugin` instance with `filename: "./pdpl-checklist/index.html"` and `chunks: ["pdpl-checklist"]`, following the pattern of the existing five
- An entry in the sitemap `paths` array: `{ path: "/pdpl-checklist" }`
- A navigation link in `src/core/nav/nav.html`
- Real `title`, `description`, and `keywords` values. Note that the five existing pages ship `description: "Test Description"` and `keywords: "Test Keywords"` — placeholder text in production. Flag this; fixing it is a small, worthwhile win, but treat it as a separate change.

### 3.2 Database security rules — blocking issue

There is **no `database.rules.json` in the repository** and no reference to one in `firebase.json`. Rules are therefore managed only in the Firebase console, unversioned and unreviewed.

The assessment tool will write real contact details and business answers. Before it ships:

1. Export the current rules from the console and commit them as `database.rules.json`.
2. Reference the file from `firebase.json` under `"database": { "rules": "database.rules.json" }`.
3. Review the existing `contactReq/` and `hiringReq/` nodes. If they are world-readable, that is a live exposure of names, email addresses, phone numbers, and CV links, and it must be fixed regardless of this project.
4. Write rules for the new node such that:
   - **Read is denied to clients entirely.** Nothing written by the tool is ever read back by the browser.
   - **Write is create-only**: a client may create a new child under the collection but may not modify or delete an existing one.
   - **Shape is validated**: required fields present, types correct, string lengths bounded, no arbitrary extra keys.
   - **Writes require an authenticated principal** — see 3.3.

Propose the rules as part of the implementation and have them reviewed before deployment.

### 3.3 Anonymous authentication

`src/core/utils/T_sys.ts` already implements `getTsysUID()` using `signInAnonymously`, but the call site is commented out.

**Enable it for the assessment tool.** The reason is specific and not cosmetic: without an authenticated principal the database rules cannot express `auth != null`, which leaves the write path open to anyone who reads the Firebase config out of the shipped bundle. Anonymous auth gives every submission a stable UID, which allows create-only rules, rate limiting per principal, and a means of correlating a submission with a later deletion request from the same person.

Confirm Anonymous sign-in is enabled in the Firebase console for project `hamza-lawfirm`.

### 3.4 What is not available

For the avoidance of doubt, and confirmed against the repository:

- **No Cloud Functions** are provisioned — there is no server-side code path and no way to send email from the backend.
- **No Firestore** — the project uses Realtime Database.
- The assessment result is therefore rendered **on the page** and persisted to the database. Nothing is emailed. Do not design around email delivery.

---

## 4. Deliverables for this brief

1. A written audit report covering section 1, with measured numbers.
2. Any stack-change proposal, with evidence, submitted for approval before work begins.
3. The completed URL slug refactor of section 2, deployed and verified.
4. A committed `database.rules.json` and a proposed rule set for the new collection.
5. Written confirmation that the routing prerequisites in 3.1 are understood and that Anonymous authentication is enabled.

Once these are signed off, proceed to `01-TOOL-SPEC.md`.
