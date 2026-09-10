// Main imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { manualSplashScreen } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";
import "../../styles/components/buttons/mainButton.css";
import "../../styles/components/inputs/mainInput.css";
import "./pdpl-checklist.css";

import { getTsysUID } from "../../core/utils/T_sys";
import { track } from "../../core/utils/analytics";
import { saveAssessment, AssessmentRecord } from "../../core/utils/fb_api";
import { Question, Option, QUESTION_SET_VERSION, GROUPS } from "./questions";
import {
  Answers,
  screens,
  optionsFor,
  progress,
  pruneUnreachable,
  screenComplete,
} from "./flow";
import { infer, screen as screenExclusion, RULE_SET_VERSION } from "./rules";
import { privacyNoticeHtml, wirePrivacyTabs } from "./privacy";
import { renderResult, disclaimerHtml } from "./result";
import { t, setLang, getLang, isArabic, applyDirection, onLangChange, Lang } from "./i18n";
import { qText, qHelper, qNote, oLabel, oExample, oFreeText, groupTitle, groupIntro, exclusionText } from "./resolve";

initializeSideMenu();
manualSplashScreen();

/**
 * State lives in memory for the session only. A half-finished compliance
 * self-assessment left in a shared browser is a liability, so neither
 * localStorage nor sessionStorage is used.
 */
let answers: Answers = {};
let screenIndex = 0;

/** Exposed for diagnostics only; never read by the page. */
let lastStorageError: unknown = null;

/** Kept so the screens can be redrawn when the language changes. */
let lastExclusion: { code: string; title: string; body: string } | null = null;
let lastResult: { result: ReturnType<typeof infer>; contact: { company: string; fullName: string; email: string; phone: string } } | null = null;

const RETENTION_MONTHS = 24;
const CONSENT_RETENTION_YEARS = 3;

function $(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error("missing element: " + id);
  return el;
}

function show(id: string) {
  ["pdplLanding", "pdplQuestions", "pdplExit", "pdplContact", "pdplResult"].forEach(
    function (s) {
      ($(s) as HTMLElement).hidden = s !== id;
    }
  );
  window.scrollTo({ top: 0, behavior: "auto" });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Question rendering
// ---------------------------------------------------------------------------

function optionHtml(q: Question, o: Option, idx: number): string {
  const inputType = q.type === "single" ? "radio" : "checkbox";
  const id = "opt_" + q.id.replace(".", "_") + "_" + idx;
  const current = answers[q.id];
  const selected = Array.isArray(current)
    ? current.indexOf(o.value) !== -1
    : current === o.value;

  // The whole highlighted block is the label, so the entire area that lights
  // up on hover is also the area that toggles the choice.
  let html =
    '<div class="pdpl__option">' +
    '<label class="pdpl__optionmain" for="' + id + '">' +
    '<input type="' + inputType + '" id="' + id + '" name="' + q.id + '" value="' + o.value + '"' +
    (selected ? " checked" : "") +
    (o.exclusive ? ' data-exclusive="true"' : "") +
    " />" +
    '<span class="pdpl__optiontext">' + oLabel(q, o) +
    (oExample(q, o) ? '<span class="pdpl__example">' + oExample(q, o) + "</span>" : "") +
    "</span></label>";

  const freeText = oFreeText(q, o);
  if (freeText) {
    const ftId = id + "_text";
    const stored = answers[q.id + ":" + o.value];
    html +=
      '<input type="text" class="pdpl__freetext" id="' + ftId + '" ' +
      'data-for="' + q.id + ':' + o.value + '" maxlength="160" ' +
      'placeholder="' + escapeHtml(freeText) + '" ' +
      'aria-label="' + escapeHtml(freeText) + '" ' +
      (selected ? "" : "hidden ") +
      'value="' + escapeHtml(typeof stored === "string" ? stored : "") + '" />';
  }

  return html + "</div>";
}

function questionHtml(q: Question): string {
  const opts = optionsFor(q, answers);
  return (
    '<fieldset class="pdpl__question" data-qid="' + q.id + '">' +
    "<legend>" + qText(q) + "</legend>" +
    (qHelper(q) ? '<p class="pdpl__helper">' + qHelper(q) + "</p>" : "") +
    '<div class="pdpl__options">' +
    opts.map(function (o, i) { return optionHtml(q, o, i); }).join("") +
    "</div>" +
    (qNote(q) ? '<p class="pdpl__qnote">' + qNote(q) + "</p>" : "") +
    '<p class="pdpl__error" data-error-for="' + q.id + '" hidden>' + t("chooseAnswer") + "</p>" +
    "</fieldset>"
  );
}

function renderScreen() {
  const list = screens(answers);
  if (screenIndex >= list.length) {
    show("pdplContact");
    return;
  }

  const current = list[screenIndex];
  const group = GROUPS[current.group];

  $("pdplGroupTitle").textContent = groupTitle(current.group, group.title);
  const intro = $("pdplGroupIntro");
  const introText = groupIntro(current.group, group.intro || "");
  intro.textContent = introText;
  intro.hidden = !introText;

  $("pdplFields").innerHTML = current.questions.map(questionHtml).join("");
  ($("pdplScreenError") as HTMLElement).hidden = true;
  ($("pdplBack") as HTMLButtonElement).disabled = screenIndex === 0;

  updateProgress();
  wireFields();
  show("pdplQuestions");

  const firstInput = $("pdplFields").querySelector("input") as HTMLInputElement | null;
  if (firstInput) firstInput.focus();
}

function updateProgress() {
  const p = progress(answers);
  ($("pdplProgressFill") as HTMLElement).style.width = p.percent + "%";
  $("pdplProgressText").textContent =
    t("progress", { n: Math.min(p.answered + 1, p.total), total: p.total });
}

function wireFields() {
  const container = $("pdplFields");

  container.querySelectorAll("input[type=radio], input[type=checkbox]").forEach(function (node) {
    node.addEventListener("change", function () {
      const input = node as HTMLInputElement;
      const qid = input.name;

      if (input.type === "radio") {
        answers[qid] = input.value;
      } else {
        const boxes = Array.prototype.slice.call(
          container.querySelectorAll('input[name="' + qid + '"]')
        ) as HTMLInputElement[];

        // "None of the above" and "Not sure" clear every other choice, and
        // choosing anything else clears them.
        if (input.checked && input.getAttribute("data-exclusive") === "true") {
          boxes.forEach(function (b) { if (b !== input) b.checked = false; });
        } else if (input.checked) {
          boxes.forEach(function (b) {
            if (b.getAttribute("data-exclusive") === "true") b.checked = false;
          });
        }

        answers[qid] = boxes
          .filter(function (b) { return b.checked; })
          .map(function (b) { return b.value; });
      }

      syncFreeText(container, qid);
      const err = container.querySelector('[data-error-for="' + qid + '"]') as HTMLElement | null;
      if (err) err.hidden = true;
      updateProgress();
      refreshIfRevealed();
    });
  });

  container.querySelectorAll(".pdpl__freetext").forEach(function (node) {
    node.addEventListener("input", function () {
      const input = node as HTMLInputElement;
      const key = input.getAttribute("data-for");
      if (key) answers[key] = input.value;
    });
  });
}

/**
 * Every question-level condition in the spec reveals a question inside the
 * group it already belongs to: Q2.3 within group 2, Q3.2 within 3, Q4.2 within
 * 4, Q5.4 within 5, Q12.2 within 12. Answering the question that opens one of
 * them therefore changes the current screen, and without this the new question
 * would never be drawn while validation still demanded an answer for it —
 * trapping the visitor on the screen.
 *
 * Only the field list is redrawn, and only when the set actually changes, so
 * the page does not jump under someone mid-answer.
 */
function refreshIfRevealed() {
  const list = screens(answers);
  const current = list[screenIndex];
  if (!current) return;

  const wanted = current.questions.map(function (q) { return q.id; }).join(",");
  const drawn = Array.prototype.slice
    .call($("pdplFields").querySelectorAll(".pdpl__question"))
    .map(function (el) { return (el as HTMLElement).getAttribute("data-qid"); })
    .join(",");

  if (wanted === drawn) return;

  const active = document.activeElement as HTMLElement | null;
  const activeId = active ? active.id : "";
  $("pdplFields").innerHTML = current.questions.map(questionHtml).join("");
  wireFields();
  if (activeId) {
    const again = document.getElementById(activeId);
    if (again) again.focus();
  }
}

/** Show the free-text box only while its own option is selected. */
function syncFreeText(container: HTMLElement, qid: string) {
  container.querySelectorAll(".pdpl__freetext").forEach(function (node) {
    const input = node as HTMLInputElement;
    const key = input.getAttribute("data-for") || "";
    if (key.indexOf(qid + ":") !== 0) return;
    const value = key.split(":")[1];
    const own = container.querySelector(
      'input[name="' + qid + '"][value="' + value + '"]'
    ) as HTMLInputElement | null;
    const on = !!own && own.checked;
    input.hidden = !on;
    if (!on) delete answers[key];
  });
}

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

// Analytics events carry codes and positions only. The answers and the
// contact details stay in this page and in the database; see analytics.ts.

$("pdplStart").addEventListener("click", function () {
  screenIndex = 0;
  renderScreen();
  track("pdpl_assessment_start", { assessment_language: getLang() });
});

$("pdplBack").addEventListener("click", function () {
  if (screenIndex > 0) {
    screenIndex--;
    renderScreen();
  }
});

($("pdplForm") as HTMLFormElement).addEventListener("submit", function (e) {
  e.preventDefault();
  const list = screens(answers);
  const current = list[screenIndex];
  if (!current) return;

  if (!screenComplete(current.questions, answers)) {
    let firstMissing: HTMLElement | null = null;
    current.questions.forEach(function (q) {
      const v = answers[q.id];
      const empty = v === undefined || (Array.isArray(v) && v.length === 0);
      const err = $("pdplFields").querySelector(
        '[data-error-for="' + q.id + '"]'
      ) as HTMLElement | null;
      if (err) err.hidden = !empty;
      if (empty && !firstMissing) {
        firstMissing = $("pdplFields").querySelector(
          '[data-qid="' + q.id + '"]'
        ) as HTMLElement | null;
      }
    });
    const banner = $("pdplScreenError");
    banner.textContent = t("screenError");
    banner.hidden = false;
    if (firstMissing) (firstMissing as HTMLElement).scrollIntoView({ block: "center" });
    return;
  }

  // Group 0 can end the assessment. Nothing is gated and nothing is stored.
  if (current.group === 0) {
    const exclusion = screenExclusion(answers);
    if (exclusion) {
      lastExclusion = exclusion;
      const copy = exclusionText(exclusion.code, exclusion);
      $("pdplExitTitle").textContent = copy.title;
      $("pdplExitBody").textContent = copy.body;
      $("pdplDisclaimerExit").innerHTML = disclaimerHtml();
      show("pdplExit");
      track("pdpl_screening_exit", { exit_code: exclusion.code, assessment_language: getLang() });
      return;
    }
  }

  answers = pruneUnreachable(answers);
  screenIndex++;
  renderScreen();

  // One event per screen reached, so the funnel shows where visitors stop.
  // The group number is stable; the step number varies with the path taken.
  const next = screens(answers);
  if (screenIndex < next.length) {
    track("pdpl_assessment_step", {
      step_number: screenIndex + 1,
      step_group: next[screenIndex].group,
      assessment_language: getLang(),
    });
  } else {
    track("pdpl_contact_gate", { assessment_language: getLang() });
  }
});

$("pdplContactBack").addEventListener("click", function () {
  screenIndex = screens(answers).length - 1;
  renderScreen();
});

// ---------------------------------------------------------------------------
// Contact gate
// ---------------------------------------------------------------------------

interface FieldSpec {
  input: string;
  error: string;
  messageKey: string;
  test: (v: string) => boolean;
}

const CONTACT_FIELDS: FieldSpec[] = [
  { input: "pdplCompany", error: "pdplCompanyError", messageKey: "errCompany", test: function (v) { return v.length >= 2 && v.length <= 120; } },
  { input: "pdplName", error: "pdplNameError", messageKey: "errName", test: function (v) { return v.length >= 2 && v.length <= 120; } },
  { input: "pdplEmail", error: "pdplEmailError", messageKey: "errEmail", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 160; } },
  { input: "pdplPhone", error: "pdplPhoneError", messageKey: "errPhone", test: function (v) { return /^\+?[0-9\s-]{8,20}$/.test(v); } },
];

function validateContact(): boolean {
  let ok = true;
  let firstBad: HTMLElement | null = null;
  CONTACT_FIELDS.forEach(function (f) {
    const input = $(f.input) as HTMLInputElement;
    const err = $(f.error);
    const good = f.test(input.value.trim());
    err.textContent = good ? "" : t(f.messageKey);
    err.hidden = good;
    input.setAttribute("aria-invalid", good ? "false" : "true");
    if (good) {
      input.removeAttribute("aria-describedby");
    } else {
      input.setAttribute("aria-describedby", f.error);
      ok = false;
      if (!firstBad) firstBad = input;
    }
  });
  if (firstBad) (firstBad as HTMLInputElement).focus();
  return ok;
}

($("pdplContactForm") as HTMLFormElement).addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateContact()) return;

  const submit = $("pdplSubmit") as HTMLButtonElement;
  submit.disabled = true;
  submit.textContent = t("submitting");

  const result = infer(answers);
  const consent = ($("pdplConsent") as HTMLInputElement).checked;
  const contact = {
    company: ($("pdplCompany") as HTMLInputElement).value.trim(),
    fullName: ($("pdplName") as HTMLInputElement).value.trim(),
    email: ($("pdplEmail") as HTMLInputElement).value.trim(),
    phone: ($("pdplPhone") as HTMLInputElement).value.trim(),
  };
  const now = Date.now();
  const retention = new Date(now);
  retention.setMonth(retention.getMonth() + RETENTION_MONTHS);
  const consentRetention = new Date(now);
  consentRetention.setFullYear(consentRetention.getFullYear() + CONSENT_RETENTION_YEARS);

  // The result is rendered from local state, so a failed write never costs the
  // visitor the answer they came for.
  lastResult = { result: result, contact: contact };
  renderResult($("pdplResultBody"), result, answers, contact);
  show("pdplResult");

  track("generate_lead", {
    lead_source: "pdpl_checklist",
    assessment_role: result.role,
    assessment_primary: result.primary,
    marketing_consent: consent,
    assessment_language: getLang(),
  });

  getTsysUID()
    .then(function (uid) {
      const record: AssessmentRecord = {
        submittedAt: now,
        uid: uid,
        locale: "en",
        contact: contact,
        marketingConsent: consent,
        consentRecord: {
          givenAt: now,
          method: "web-form",
          noticeVersion: NOTICE_VERSION,
          retentionUntil: consent ? consentRetention.getTime() : null,
        },
        questionSetVersion: QUESTION_SET_VERSION,
        ruleSetVersion: RULE_SET_VERSION,
        answers: answers,
        result: {
          role: result.role,
          primary: result.primary,
          supplementary: result.supplementary,
          registrations: result.registrations,
          documents: result.documents,
          unresolved: result.unresolved,
        },
        retentionUntil: retention.getTime(),
      };
      return saveAssessment(record);
    })
    .then(function () {
      lastStorageError = null;
      (window as unknown as { __pdplStored?: boolean }).__pdplStored = true;
    })
    .catch(function (error) {
      // Silent to the visitor — the result is already on screen and a storage
      // failure is ours to solve, not theirs. Not silent to us: swallowing
      // this entirely is how a write that never succeeded went unnoticed.
      console.error("PDPL assessment was not stored:", error);
      lastStorageError = error;
      (window as unknown as { __pdplStored?: boolean; __pdplError?: string }).__pdplStored = false;
      (window as unknown as { __pdplError?: string }).__pdplError = String(error);
    });
});

// The consultation button is a mailto: link, which Google's automatic
// outbound-click tracking does not report. The result is redrawn on a
// language change, so the listener sits on the container, not the link.
$("pdplResultBody").addEventListener("click", function (e) {
  const target = e.target as Element | null;
  const link = target && target.closest ? target.closest('a[href^="mailto:"]') : null;
  if (!link || !lastResult) return;
  track("pdpl_consultation_click", {
    assessment_role: lastResult.result.role,
    assessment_primary: lastResult.result.primary,
    assessment_language: getLang(),
  });
});

// ---------------------------------------------------------------------------
// Static copy
// ---------------------------------------------------------------------------

import { NOTICE_VERSION } from "./content";

/** Rewrites every element carrying a data-i18n hook. */
function applyStaticCopy() {
  document.querySelectorAll("[data-i18n]").forEach(function (node) {
    const key = node.getAttribute("data-i18n");
    if (key) node.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-html]").forEach(function (node) {
    const key = node.getAttribute("data-i18n-html");
    if (key) node.innerHTML = t(key);
  });
  $("pdplDisclaimerTop").innerHTML = disclaimerHtml();
  $("pdplDisclaimerExit").innerHTML = disclaimerHtml();
  $("pdplPrivacy").innerHTML = privacyNoticeHtml();
  wirePrivacyTabs(document);
}

/**
 * A language change redraws whichever screen is showing. Answers, the current
 * position, and the computed result are all held in memory and untouched: the
 * engine works in codes, so nothing has to be recomputed and nothing already
 * stored changes meaning.
 */
function redrawForLanguage() {
  applyStaticCopy();

  if (!$("pdplQuestions").hidden) {
    renderScreen();
  } else if (!$("pdplExit").hidden && lastExclusion) {
    const copy = exclusionText(lastExclusion.code, lastExclusion);
    $("pdplExitTitle").textContent = copy.title;
    $("pdplExitBody").textContent = copy.body;
  } else if (!$("pdplResult").hidden && lastResult) {
    renderResult($("pdplResultBody"), lastResult.result, answers, lastResult.contact);
  }
}

function selectLanguage(lang: Lang) {
  setLang(lang);
  const en = $("pdplLangEn");
  const ar = $("pdplLangAr");
  en.setAttribute("aria-pressed", String(lang === "en"));
  ar.setAttribute("aria-pressed", String(lang === "ar"));
  en.className = "pdpl__switchbtn" + (lang === "en" ? " pdpl__switchbtn--active" : "");
  ar.className = "pdpl__switchbtn" + (lang === "ar" ? " pdpl__switchbtn--active" : "");
}

$("pdplLangEn").addEventListener("click", function () { selectLanguage("en"); });
$("pdplLangAr").addEventListener("click", function () { selectLanguage("ar"); });
onLangChange(redrawForLanguage);

applyDirection();
applyStaticCopy();
