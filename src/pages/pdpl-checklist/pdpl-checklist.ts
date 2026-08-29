// Main imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { manualSplashScreen } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";
import "../../styles/components/buttons/mainButton.css";
import "../../styles/components/inputs/mainInput.css";
import "./pdpl-checklist.css";

import { getTsysUID } from "../../core/utils/T_sys";
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
    '<span class="pdpl__optiontext">' + o.label +
    (o.example ? '<span class="pdpl__example">' + o.example + "</span>" : "") +
    "</span></label>";

  if (o.freeText) {
    const ftId = id + "_text";
    const stored = answers[q.id + ":" + o.value];
    html +=
      '<input type="text" class="pdpl__freetext" id="' + ftId + '" ' +
      'data-for="' + q.id + ':' + o.value + '" maxlength="160" ' +
      'placeholder="' + escapeHtml(o.freeText) + '" ' +
      'aria-label="' + escapeHtml(o.freeText) + '" ' +
      (selected ? "" : "hidden ") +
      'value="' + escapeHtml(typeof stored === "string" ? stored : "") + '" />';
  }

  return html + "</div>";
}

function questionHtml(q: Question): string {
  const opts = optionsFor(q, answers);
  return (
    '<fieldset class="pdpl__question" data-qid="' + q.id + '">' +
    "<legend>" + q.text + "</legend>" +
    (q.helper ? '<p class="pdpl__helper">' + q.helper + "</p>" : "") +
    '<div class="pdpl__options">' +
    opts.map(function (o, i) { return optionHtml(q, o, i); }).join("") +
    "</div>" +
    (q.note ? '<p class="pdpl__qnote">' + q.note + "</p>" : "") +
    '<p class="pdpl__error" data-error-for="' + q.id + '" hidden>Please choose an answer to continue.</p>' +
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

  $("pdplGroupTitle").textContent = group.title;
  const intro = $("pdplGroupIntro");
  if (group.intro) {
    intro.textContent = group.intro;
    intro.hidden = false;
  } else {
    intro.hidden = true;
  }

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
    "Question " + Math.min(p.answered + 1, p.total) + " of about " + p.total;
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

$("pdplStart").addEventListener("click", function () {
  screenIndex = 0;
  renderScreen();
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
    banner.textContent = "Every question on this page needs an answer.";
    banner.hidden = false;
    if (firstMissing) (firstMissing as HTMLElement).scrollIntoView({ block: "center" });
    return;
  }

  // Group 0 can end the assessment. Nothing is gated and nothing is stored.
  if (current.group === 0) {
    const exclusion = screenExclusion(answers);
    if (exclusion) {
      $("pdplExitTitle").textContent = exclusion.title;
      $("pdplExitBody").textContent = exclusion.body;
      $("pdplDisclaimerExit").innerHTML = disclaimerHtml();
      show("pdplExit");
      return;
    }
  }

  answers = pruneUnreachable(answers);
  screenIndex++;
  renderScreen();
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
  message: string;
  test: (v: string) => boolean;
}

const CONTACT_FIELDS: FieldSpec[] = [
  { input: "pdplCompany", error: "pdplCompanyError", message: "Please enter your company name, 2 to 120 characters.", test: function (v) { return v.length >= 2 && v.length <= 120; } },
  { input: "pdplName", error: "pdplNameError", message: "Please enter your full name and job title, 2 to 120 characters.", test: function (v) { return v.length >= 2 && v.length <= 120; } },
  { input: "pdplEmail", error: "pdplEmailError", message: "Please enter a valid work email address.", test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) && v.length <= 160; } },
  { input: "pdplPhone", error: "pdplPhoneError", message: "Please enter a phone number, 8 to 20 characters, digits and + only.", test: function (v) { return /^\+?[0-9\s-]{8,20}$/.test(v); } },
];

function validateContact(): boolean {
  let ok = true;
  let firstBad: HTMLElement | null = null;
  CONTACT_FIELDS.forEach(function (f) {
    const input = $(f.input) as HTMLInputElement;
    const err = $(f.error);
    const good = f.test(input.value.trim());
    err.textContent = good ? "" : f.message;
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
  submit.textContent = "Preparing your result…";

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
  renderResult($("pdplResultBody"), result, answers, contact);
  show("pdplResult");

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
      // eslint-disable-next-line no-console
      console.error("PDPL assessment was not stored:", error);
      lastStorageError = error;
      (window as unknown as { __pdplStored?: boolean; __pdplError?: string }).__pdplStored = false;
      (window as unknown as { __pdplError?: string }).__pdplError = String(error);
    });
});

// ---------------------------------------------------------------------------
// Static copy
// ---------------------------------------------------------------------------

import { NOTICE_VERSION } from "./content";

$("pdplDisclaimerTop").innerHTML = disclaimerHtml();
$("pdplPrivacy").innerHTML = privacyNoticeHtml();
wirePrivacyTabs(document);
