# Codebase and Performance Audit

**Repository:** `hamzalawfirm 23-06-2026`
**Live site:** https://www.hamzalawfirm.com
**Date:** August 29, 2026
**Scope:** Workstream 1 of `00-WEBSITE-READINESS-BRIEF.md`
**Status:** Report only. No site source file was modified.

---

## 1. Summary

The platform is sound in structure but is shipping a production build with its
JavaScript minifier switched off, no caching headers, and a routing
configuration that does not run on the server the domain actually points to.
All fifteen service detail pages have been returning HTTP 500 since
June 24, 2026.

The three highest-value corrections are each small and independent:

| # | Correction | Measured effect | Effort |
|---|---|---|---|
| 1 | Restore Terser in `optimization.minimizer` | Vendor bundle 1,795 KB to 556 KB, a **69% reduction** | One line |
| 2 | Add caching and compression directives to `.htaccess` | Repeat visits stop refetching every asset | One file |
| 3 | Fix `ErrorDocument` and add the service rewrite | Restores 15 dead pages | One file |

---

## 2. Method

- Lighthouse 12, headless Chrome, five routes, mobile and desktop, categories
  performance, accessibility, best practices, and SEO.
- Direct HTTP measurement of every subresource on each route: wire bytes,
  content encoding, and caching headers.
- Byte attribution inside the deployed vendor bundle by decoding its source map.
- Terser run against the deployed bundle, to measure the minification gain
  rather than estimate it.
- Read-only probes of the Realtime Database. No write was attempted and no
  personal data was retrieved.

**Limitation.** Lighthouse ran from the auditor network location, so absolute
timings carry that network distance. Byte weights, layout shift scores, and
root-cause attribution are independent of location and stand as measured.

---

## 3. Hosting: the domain is not on Firebase

`www.hamzalawfirm.com` and the apex both respond with `Server: Apache` and the
header `host-header: c2hhcmVkLmJsdWVob3N0LmNvbQ==`, which decodes to
`shared.bluehost.com`. The root carries `Last-Modified: Wed, 24 Jun 2026`,
matching `dist.zip` in the repository: the build was zipped and uploaded by hand.

A Firebase Hosting deployment exists at `hamza-lawfirm.web.app`, serves
different content, and has no custom domain pointing at it.

**Consequence.** `firebase.json` is never read in production. Its `rewrites`
have no effect, and any redirect written there would have none either. The
decision of August 29, 2026 is to remain on Bluehost, so rewrites, redirects,
caching, and compression all belong in `.htaccess`.

Because deployment is a manual upload, `.htaccess` must be committed to this
repository and copied into `dist/` by `CopyPlugin` at build time. Otherwise it
is lost or diverges on the next upload.

---

## 4. Production is partly down

| Request | Response |
|---|---|
| `/`, `/ourFirm`, `/services`, `/profile` | 200 |
| `/services/Litigation` | **500** |
| `/services/Capital%20Markets` | **500** |
| any path that does not exist | **500** |
| `/assets/` | 403, directory exists and listing is denied |

The error body states that a 500 was encountered while trying to use an
`ErrorDocument` to handle the request. The server has an `ErrorDocument`
directive pointing at a target that itself fails, so every 404 escalates to a
500. There is no working 404 page.

Three independent defects stack here, and all three must be fixed:

1. Apache never reads `firebase.json`, so no service rewrite exists at all.
2. The rewrite in `firebase.json` targets `/serviceDetails/serviceDetails.html`.
   Webpack emits `serviceDetails/index.html`. The target does not exist, which
   is why the same routes also return 404 on `hamza-lawfirm.web.app`.
3. The rewrite pattern `[\w-&]+` excludes commas, so comma-bearing service
   names could never match even if the first two were corrected.

These pages are linked from the footer of every page on the site.

---

## 5. Performance

### 5.1 Lighthouse scores

| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| index — mobile | 57 | 88 | 100 | 92 | 2.0s | 6.4s | 559ms | 0.033 | 2.31 MB |
| index — desktop | 73 | 87 | 100 | 92 | 1.2s | 3.2s | 40ms | 0.003 | 2.60 MB |
| ourFirm — mobile | 58 | 85 | 96 | 100 | 1.8s | 4.4s | 838ms | 0.069 | 1.53 MB |
| ourFirm — desktop | 55 | 85 | 96 | 100 | 1.3s | 2.7s | 46ms | **0.479** | 1.40 MB |
| services — mobile | 71 | 88 | 96 | 100 | 1.9s | 4.3s | 345ms | 0.020 | 1.31 MB |
| services — desktop | 77 | 88 | 96 | 100 | 1.5s | 2.4s | 0ms | 0.005 | 1.18 MB |
| **profile — mobile** | **36** | 89 | 89 | 92 | 2.4s | **7.0s** | 388ms | **2.404** | **8.77 MB** |
| profile — desktop | 79 | 89 | 93 | 92 | 1.6s | 2.3s | 30ms | 0.042 | 2.77 MB |
| serviceDetails — mobile | 74 | 82 | 96 | 92 | 1.8s | 3.8s | 450ms | 0.045 | 1.04 MB |
| serviceDetails — desktop | 84 | 82 | 96 | 92 | 1.2s | 2.1s | 0ms | 0.032 | 0.91 MB |

### 5.2 The minifier is switched off

`webpack.config.js:131` sets:

```js
optimization: {
  minimize: true,
  minimizer: [ new ImageMinimizerPlugin({ ... }) ],
}
```

Assigning `minimizer` **replaces** the webpack default minimizers rather than
adding to them, so Terser never runs. `terser-webpack-plugin` is listed in
`package.json` but is not referenced anywhere in the webpack configuration.

Evidence in the deployed bundle `dist/vendors/c7892b756c6d36142c15.js`:
50,227 lines, average line length 35 characters, 3,469 comment lines, intact
license headers, and original function names.

Measured by running Terser against that exact file:

| | Uncompressed | gzip -9 |
|---|---|---|
| As deployed | 1,795 KB | 374 KB |
| With Terser enabled | 556 KB | 158 KB |
| **Reduction** | **69.0%** | **57.6%** |

Lighthouse independently reports `unminified-javascript` savings of 315 KB on
every route.

**Fix.** Preserve the defaults by including the `"..."` placeholder:

```js
minimizer: ["...", new ImageMinimizerPlugin({ ... })],
```

### 5.3 Every page ships code it does not use

The `vendor` cache group has a fixed name and no `minChunks`, so the whole of
`node_modules` collapses into a single chunk that every entry loads.

Relative shares inside the bundle, from source map attribution. These are
proportions of the 235 KB the map could attribute, not absolute sizes:

| Share | Package | Note |
|---|---|---|
| 21.9% | `jquery` | `resolve.alias` points at `jquery/src/jquery`, the unbuilt source |
| 18.8% | `@firebase/auth` | Loaded on all five pages for telemetry that is disabled |
| 18.3% | `page-flip` | Used only by `src/pages/profile/jsProfile.js` |
| 12.2% | `@popperjs/core` | Pulled in wholesale by Bootstrap |
| 11.1% | `@firebase/database` | |
| 6.0% | `aos` | |
| 5.8% | `bootstrap` | |

Firebase tree shaking is working correctly: only `app`, `auth`, `component`,
`database`, `logger`, and `util` are bundled. Analytics, Firestore, and Storage
are absent despite the unused `getAnalytics` import.

All five entry points import `src/core/utils/T_sys.ts`, which calls `getAuth()`
at module scope. Firebase Auth therefore loads on every page for a telemetry
system whose call site is commented out.

Lighthouse reports `unused-javascript` of 348 KB to 429 KB depending on route.

### 5.4 No caching headers anywhere

The vendor bundle, the CSS, the images, and `index.html` all return with no
`Cache-Control`, no `Expires`, and no `ETag`. Only `Last-Modified` is present.

Asset filenames already carry a content hash, so they can safely be cached for
a year. Every returning visitor currently revalidates every asset.

Assets served with no `Cache-Control`, by route: index 28 of 33, ourFirm 21 of
27, services 24 of 29, profile 41 of 47, serviceDetails 9 of 14.

### 5.5 Compression is weak and Brotli is absent

| Request | Result |
|---|---|
| `Accept-Encoding: identity` | 1,838,061 B |
| `Accept-Encoding: gzip` | 652,149 B, a 35.5% ratio |
| `Accept-Encoding: br` | 1,838,061 B, uncompressed |

Local `gzip -9` on the same file produces 374 KB, so the server is compressing
at a low level. Both the level and Brotli support are worth pursuing in
`.htaccess`, subject to what the shared host permits.

### 5.6 Layout shift

| Route | Element | Shift scores |
|---|---|---|
| profile — mobile | `div#book-container > div#book` | 0.850, 0.818, 0.818 |
| ourFirm — mobile | `p.ourFirmAboutUsParagraph` | 0.038 |
| index, ourFirm | `div#splash-screen > div.slide-top` | 0.020, 0.009 |

The `profile` CLS of 2.404 is caused almost entirely by the page-flip component
initializing without reserved dimensions.

**On the splash screen**, which the brief asked to be quantified: it contributes
a small but real and entirely self-inflicted shift on two routes. It also holds
`body { overflow: hidden }` until `window.load` with a ten-second timeout
fallback, which delays interactivity for the slowest visitors by exactly the
amount the rest of this report is trying to remove.

### 5.7 Images

Lighthouse reports 190 KB to 225 KB recoverable from correctly sized images,
and 55 KB from replacing an animated GIF with video. WebP minification through
`image-minimizer-webpack-plugin` is running; the issue is intrinsic dimensions,
not format.

---

## 6. Third-party requests

Every route makes render-blocking third-party requests:

| Host | Purpose | Where |
|---|---|---|
| `fonts.googleapis.com` | Abril Fatface, Archivo, Bai Jamjuree, Alexandria, four separate requests | all routes |
| `fonts.cdnfonts.com` | Coda Caption | `/profile` |
| `unpkg.com` | Ionicons 7.1.0, both module and nomodule | all routes |
| `cdn.jsdelivr.net` | Uploadcare file uploader | `/ourFirm` |

Self-hosting the fonts and the icon set removes four DNS lookups and four TLS
handshakes from the critical path of every page load, and stops disclosing the
IP address of every visitor to three additional parties.

---

## 7. Data protection observations

These are recorded because they concern personal data, not because they are
web performance issues. They are referred to the firm rather than resolved here.

### 7.1 Database read access is correctly closed

Read probes returned `Permission denied` (401) on `contactReq/`, `hiringReq/`,
`vistors/`, and the database root. There is no live public exposure of the
names, email addresses, phone numbers, or CV links held there.

`serviceData/` is world-readable, which is correct: it is public site content.

Write rules could not be tested without writing to the production database,
which was not done. They must be exported from the console and reviewed.

### 7.2 The database is in the United States

The Firebase configuration in `T_sys.ts` contains no `databaseURL`, so the SDK
derives the default host. Probing confirms it:

| Endpoint | Response |
|---|---|
| `hamza-lawfirm-default-rtdb.firebaseio.com` | 401, exists |
| `...europe-west1.firebasedatabase.app` | 404 |
| `...asia-southeast1.firebasedatabase.app` | 404 |

The instance is in `us-central1`. This resolves `[FIREBASE_REGION]` in
`01-TOOL-SPEC.md` section 8.1: **the United States**.

### 7.3 CV uploads go to a third-party processor

`src/pages/ourFirm/ourFirm.html:695` and `:697` load the Uploadcare file
uploader from `cdn.jsdelivr.net`. Applicant CVs are uploaded to Uploadcare and
only the resulting URL is stored in `hiringReq/`.

The firm is a controller in respect of that data, Uploadcare is a processor,
and the data leaves Egypt. No processing agreement or privacy notice covering
this was found in the repository. No uploaded file was accessed during this
audit.

---

## 8. Code quality and configuration

| Item | Finding |
|---|---|
| `database.rules.json` | Absent. Rules are console-managed, unversioned, unreviewed |
| SEO metadata | All five pages ship `description: "Test Description"` and `keywords: "Test Keywords"` |
| Sitemap | `paths` contains the placeholder `{ path: "/service/TEST" }` |
| Telemetry | `T_sys.ts` sends nothing; the call site is commented out, as is `getAnalytics(app)`. Ship it or delete it |
| TypeScript | `strict: true`, `target: "es5"`. Raising the target would shrink output |
| Broken links | `services.html:310` links to `Real Estate`; `services.html:342` links to `Cybercrime`. Neither key exists. The database holds `Real Estate Sector` and `Cybercrimes` |

### 8.1 Service data, for the slug refactor

The database holds **15** keys under `serviceData/`. Every one is linked from
the site, and **no two produce the same slug**, so a single shared slug utility
is sufficient and no collision handling is required.

---

## 9. Recommendations, in order

**Immediate, and small**

1. Restore Terser in `webpack.config.js`, one line.
2. Commit an `.htaccess` that fixes `ErrorDocument`, rewrites `/services/<slug>`
   to `/serviceDetails/index.html`, sets long cache lifetimes on hashed assets,
   raises the compression level, and issues the 301 redirects. Copy it into
   `dist/` at build time.
3. Correct the two broken service links.

**Next**

4. Give the `vendor` cache group a `minChunks` threshold, or split per entry, so
   `page-flip` stops loading on all five pages.
5. Point `resolve.alias.jquery` at the built distribution, or begin removing
   jQuery.
6. Move `T_sys.ts` behind a dynamic import so Firebase Auth is not on the
   critical path of pages that do not use it.
7. Reserve dimensions for `#book-container` on `/profile`.
8. Self-host the fonts and Ionicons.
9. Replace the placeholder SEO metadata and remove `/service/TEST`.

**Before the assessment tool ships**

10. Export, commit, and reference `database.rules.json`.
11. Enable Anonymous authentication and confirm it in the console.

**Referred to the firm**

12. The Uploadcare arrangement in section 7.3.

---

## 10. Not done

- No site source file was modified. The only changes on this branch are this
  report, the Git scaffolding, and the removal of the stale specification copy.
- Database write rules were not tested, because testing them means writing to
  the production database.
- Lighthouse was not run against the service detail routes, because they
  return 500.
