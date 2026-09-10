import { getDatabase, ref, set, push, onValue, get, serverTimestamp } from "firebase/database";
import { findNameBySlug } from "./slug";
import { getTsysUID } from "./T_sys";
const db = getDatabase();

/**
 * Every write to a node holding personal data signs in anonymously first.
 *
 * The database rules on contactReq/, hiringReq/, and pdplAssessments/ require
 * `auth != null`. Without an authenticated principal those rules cannot be
 * expressed at all, which would leave the write path open to anyone who reads
 * the Firebase config out of the shipped bundle. Reads of public content —
 * serviceData/ — do not go through this.
 */
function authenticatedWrite(path: string, value: object): Promise<void> {
  return getTsysUID().then(function () {
    const id = push(ref(db, path)).key;
    return set(ref(db, path + id), value);
  });
}

/**
 * The current moment in Cairo time, written out for a person to read, e.g.
 * "September 10, 2026 at 8:15 PM GMT+3". It comes from the visitor's clock.
 */
function cairoTime(): string {
  try {
    return new Date().toLocaleString("en-US", {
      timeZone: "Africa/Cairo",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch (e) {
    return new Date().toISOString();
  }
}

/**
 * A message is stored with the time it was sent, in two forms.
 *
 * `sentAt` is stamped by the database server, so a wrong clock on the
 * visitor's device cannot skew it. It is milliseconds since 1970, for sorting
 * and filtering. `sentAtCairo` is the same moment written out, so the firm can
 * read it in the Firebase console without converting. If the two disagree,
 * `sentAt` is the one to trust.
 */
export function sentContactData(
  name: string,
  email: string,
  message: string,
  subject: string,
  phone: string
) {
  return authenticatedWrite("contactReq/", {
    name: name,
    email: email,
    message: message,
    subject: subject,
    phone: phone,
    sentAt: serverTimestamp(),
    sentAtCairo: cairoTime(),
  });
}

export function sendHiringRequest(
  name: string,
  email: string,
  phone: string,
  cv: string
) {
  return authenticatedWrite("hiringReq/", {
    name: name,
    email: email,
    phone: phone,
    cv: cv,
  });
}

export interface AssessmentRecord {
  submittedAt: number;
  uid: string;
  locale: string;
  contact: { company: string; fullName: string; email: string; phone: string };
  marketingConsent: boolean;
  consentRecord: {
    givenAt: number;
    method: string;
    noticeVersion: string;
    /**
     * Three years from the last message, per PDPL Art. 18. Separate from the
     * 24-month retention on the submission itself: a person who gave no
     * marketing consent has no purpose served by keeping their data longer
     * than the assessment, and PDPL Art. 3 requires erasure once the purpose
     * has been served.
     */
    retentionUntil: number | null;
  };
  questionSetVersion: string;
  ruleSetVersion: string;
  answers: { [questionId: string]: string | string[] };
  result: {
    role: string;
    primary: string;
    supplementary: string[];
    registrations: string[];
    documents: string[];
    unresolved: string[];
  };
  retentionUntil: number;
}

/**
 * Realtime Database keys may not contain `.`, `#`, `$`, `/`, `[`, or `]`.
 * Every question identifier contains a period — Q0.1, Q12.2 — so using them
 * as keys makes the whole write fail before it reaches the network.
 *
 * The period becomes an underscore. The transformation is total and
 * reversible: Q0.1 <-> Q0_1. A free-text answer keeps its `:option` suffix,
 * because a colon is a legal key character.
 */
export function encodeAnswerKey(questionId: string): string {
  return questionId.replace(/\./g, "_");
}

export function decodeAnswerKey(key: string): string {
  return key.replace(/_/g, ".");
}

/**
 * Write-only from the client. Nothing here is ever read back by the browser.
 * The caller has already signed in, because the record carries that uid.
 */
export function saveAssessment(record: AssessmentRecord) {
  const answers: { [key: string]: string | string[] } = {};
  Object.keys(record.answers).forEach(function (questionId) {
    answers[encodeAnswerKey(questionId)] = record.answers[questionId];
  });

  const stored = {
    submittedAt: record.submittedAt,
    uid: record.uid,
    locale: record.locale,
    contact: record.contact,
    marketingConsent: record.marketingConsent,
    consentRecord: record.consentRecord,
    questionSetVersion: record.questionSetVersion,
    ruleSetVersion: record.ruleSetVersion,
    answers: answers,
    result: record.result,
    retentionUntil: record.retentionUntil,
  };

  const id = push(ref(db, "pdplAssessments/")).key;
  return set(ref(db, "pdplAssessments/" + id), stored);
}

interface serviceData {
  name: string;
  description: string;
  image: string;
  tages: string;
}

export function getAllServiceData(
  requestedData: (data: serviceData[]) => void
) {
  const starCountRef = ref(db, "serviceData/");
  onValue(starCountRef, (snapshot) => {
    // Built fresh on every snapshot. Hoisting this out of the callback made
    // each subsequent fire append a second copy of every service.
    const data: serviceData[] = [];
    snapshot.forEach((childSnapshot) => {
      const serviceName = childSnapshot.key;
      const serviceDescription = childSnapshot.child("description").val();
      const serviceImage = childSnapshot.child("image").val();
      const serviceTages = childSnapshot.child("tages").val();
      data.push({
        name: serviceName,
        description: serviceDescription,
        image: serviceImage,
        tages: serviceTages,
      });
    });
    requestedData(data);
  });
}

/**
 * Resolves a URL slug to a service.
 *
 * The database is keyed by display name, and those keys are not being renamed.
 * So the index is read once, each key is slugged, and the requested slug is
 * matched against the result. A slug that matches nothing yields null, which
 * the caller renders as a not-found state rather than an empty page.
 *
 * A one-shot `get` is used rather than `onValue`: this runs once on page load
 * and must not re-render behind the visitor.
 */
export function getServiceBySlug(slug: string): Promise<serviceData | null> {
  return get(ref(db, "serviceData/")).then((snapshot) => {
    const names: string[] = [];
    snapshot.forEach((child) => {
      if (child.key) {
        names.push(child.key);
      }
    });

    const name = findNameBySlug(slug, names);
    if (!name) {
      return null;
    }

    const service = snapshot.child(name);
    return {
      name: name,
      description: service.child("description").val(),
      image: service.child("image").val(),
      tages: service.child("tages").val(),
    };
  });
}