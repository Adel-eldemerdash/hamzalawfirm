/**
 * The result page.
 *
 * Section order follows 01-TOOL-SPEC.md section 6.1. Layers 1 and 4 — the
 * legal characterization and the gap map — carry the visual weight, because
 * the PDPC portal already answers layers 2 and 3 and those two are where the
 * firm's work shows.
 */

import { Result } from "./rules";
import { Answers } from "./flow";
import { QUESTIONS_BY_ID } from "./questions";
import {
  ROLES,
  ROLE_QUALIFIER,
  PRIMARY,
  PRIMARY_EXCLUSIVITY,
  SUPPLEMENTARY,
  SUPPLEMENTARY_PREREQUISITE,
  REGISTRATIONS,
  DOCUMENTS,
  NOTICES,
  TIMELINES,
  DISCLAIMER_PARAGRAPHS,
  FEE_CEILINGS,
  primaryFee,
  Item,
} from "./content";

export function disclaimerHtml(): string {
  return (
    '<div class="pdpl__disclaimerbox"><p class="pdpl__label">Disclaimer</p>' +
    DISCLAIMER_PARAGRAPHS.map(function (p) { return "<p>" + p + "</p>"; }).join("") +
    "</div>"
  );
}

function card(item: Item, extraClass?: string): string {
  return (
    '<article class="pdpl__card' + (extraClass ? " " + extraClass : "") + '">' +
    "<h3>" + item.title + "</h3>" +
    (item.body ? "<p>" + item.body + "</p>" : "") +
    (item.source ? '<p class="pdpl__source">' + item.source + "</p>" : "") +
    "</article>"
  );
}

/** Route a notice to the section it belongs under, by its rule prefix. */
function noticesFor(codes: string[], prefixes: string[]): string[] {
  return codes.filter(function (c) {
    return prefixes.some(function (p) { return c.indexOf(p) === 0; });
  });
}

function noticeBlock(codes: string[], heading: string): string {
  const items = codes
    .map(function (c) { return NOTICES[c]; })
    .filter(function (i) { return !!i; });
  if (!items.length) return "";
  return (
    '<div class="pdpl__notices"><p class="pdpl__noticesheading">' + heading + "</p>" +
    items.map(function (i) {
      return (
        '<div class="pdpl__notice"><strong>' + i.title + "</strong>" +
        (i.body ? "<p>" + i.body + "</p>" : "") +
        (i.source ? '<p class="pdpl__source">' + i.source + "</p>" : "") +
        "</div>"
      );
    }).join("") +
    "</div>"
  );
}

function list(codes: string[], table: { [k: string]: Item }, cls?: string): string {
  const items = codes.map(function (c) { return table[c]; }).filter(function (i) { return !!i; });
  if (!items.length) return "";
  return '<div class="pdpl__cards">' + items.map(function (i) { return card(i, cls); }).join("") + "</div>";
}

export function renderResult(root: HTMLElement, r: Result, answers: Answers): string {
  const band = (typeof answers["Q3.1"] === "string" ? answers["Q3.1"] : "") as string;
  const q32 = (typeof answers["Q3.2"] === "string" ? answers["Q3.2"] : "") as string;
  const fee = primaryFee(r.primary, band, q32);
  const role = ROLES[r.role];
  const primary = PRIMARY[r.primary];

  let html = '<h1 class="pdpl__title">Your assessment</h1>';

  // 1 — role
  html +=
    '<section class="pdpl__section pdpl__section--feature">' +
    '<h2 class="pdpl__h2">1. Your role under the PDPL</h2>' +
    '<p class="pdpl__headline">' + (r.roleQualified ? ROLE_QUALIFIER : (role ? role.title : "")) + "</p>" +
    (role && role.body ? "<p>" + role.body + "</p>" : "") +
    (role && role.source ? '<p class="pdpl__source">' + role.source + "</p>" : "") +
    "</section>";

  // 2 — primary instrument
  if (primary) {
    html +=
      '<section class="pdpl__section">' +
      '<h2 class="pdpl__h2">2. The primary license or permit you need</h2>' +
      (r.primaryHedged ? '<p class="pdpl__hedge">On the information given, this is the likely outcome rather than a settled one.</p>' : "") +
      '<p class="pdpl__headline">' + primary.title + "</p>" +
      "<p>" + primary.body + "</p>" +
      '<div class="pdpl__fee' + (fee.unresolved ? " pdpl__fee--unresolved" : "") + '">' +
      "<p class=\"pdpl__label\">Official fee</p><p>" + fee.amount + "</p>" +
      (fee.qualifier ? '<p class="pdpl__hedge">' + fee.qualifier + "</p>" : "") +
      (band === "b1" && r.primary.indexOf("BAS-L") === 0
        ? "<p>Exemption from the fee is not exemption from the license, nor from any other obligation.</p>"
        : "") +
      '<p class="pdpl__source">' + FEE_CEILINGS + "</p>" +
      "</div>" +
      '<p class="pdpl__source">' + PRIMARY_EXCLUSIVITY + "</p>" +
      noticeBlock(noticesFor(r.notices, ["B", "N3", "N6a"]), "Notes on this result") +
      "</section>";
  }

  // 3 — supplementary
  if (r.supplementary.length) {
    html +=
      '<section class="pdpl__section">' +
      '<h2 class="pdpl__h2">3. Supplementary licenses and permits</h2>' +
      '<p class="pdpl__source">' + SUPPLEMENTARY_PREREQUISITE + "</p>" +
      list(r.supplementary, SUPPLEMENTARY) +
      noticeBlock(noticesFor(r.notices, ["X", "M", "V", "S"]), "Conditions that attach") +
      "</section>";
  }

  // 4 — registrations
  if (r.registrations.length) {
    html +=
      '<section class="pdpl__section">' +
      '<h2 class="pdpl__h2">4. Registrations and accreditations</h2>' +
      list(r.registrations, REGISTRATIONS) +
      noticeBlock(noticesFor(r.notices, ["D", "A3"]), "Notes on the Data Protection Officer") +
      "</section>";
  }

  // 5 — document and obligation map
  html +=
    '<section class="pdpl__section pdpl__section--feature">' +
    '<h2 class="pdpl__h2">5. Your document and obligation map</h2>' +
    '<p class="pdpl__label">Required</p>' +
    (r.documents.length ? list(r.documents, DOCUMENTS) : "<p>Nothing further identified.</p>");

  if (r.alreadyInPlace.length) {
    html +=
      '<p class="pdpl__label">Already in place</p>' +
      '<p class="pdpl__source">Deducted from the scope of work on your answers. What remains is to review each against the requirements, not to produce it anew.</p>' +
      list(r.alreadyInPlace, DOCUMENTS, "pdpl__card--done");
  }

  html += noticeBlock(noticesFor(r.notices, ["W"]), "Obligations to note") + "</section>";

  // 6 — unresolved
  if (r.unresolved.length) {
    html +=
      '<section class="pdpl__section pdpl__section--unresolved">' +
      '<h2 class="pdpl__h2">6. Items we could not determine from your answers</h2>' +
      "<p>Each of these follows from an answer of “Not sure” or “Not known”. Nothing has been assumed in their place.</p>" +
      "<ul class=\"pdpl__list\">" +
      r.unresolved.map(function (id) {
        const q = QUESTIONS_BY_ID[id];
        return "<li><strong>" + id + "</strong> — " + (q ? q.text : "") + "</li>";
      }).join("") +
      "</ul></section>";
  }

  // 7 — timeline
  html +=
    '<section class="pdpl__section">' +
    '<h2 class="pdpl__h2">7. Statutory timelines</h2>' +
    '<div class="pdpl__tablewrap"><table class="pdpl__table">' +
    "<thead><tr><th>Item</th><th>Period</th><th>Source</th></tr></thead><tbody>" +
    TIMELINES.map(function (t) {
      return "<tr><td>" + t.label + "</td><td>" + t.period + "</td><td>" + t.source + "</td></tr>";
    }).join("") +
    "</tbody></table></div></section>";

  // 8 — call to action
  html +=
    '<section class="pdpl__section pdpl__section--cta">' +
    '<h2 class="pdpl__h2">Discuss this result with us</h2>' +
    "<p>A professional review establishes what this assessment could not, and turns the map above into a plan with a scope and a sequence. The first consultation is free.</p>" +
    '<p><a class="pdpl__btn pdpl__btn--primary" href="mailto:dpo@hamzalawfirm.com?subject=PDPL%20assessment%20result">Request a consultation</a></p>' +
    '<p class="pdpl__source">Hamza &amp; Partners Law Firm — 48 Fareed Semeika Street, Hegaz Square, Nozha, Cairo. +20 100 170 7074.</p>' +
    "</section>";

  // 9 — disclaimer, always visible and never behind a toggle
  html += disclaimerHtml();

  root.innerHTML = html;
  return html;
}
