import { getDatabase, ref, set, push, onValue, get } from "firebase/database";
import { findNameBySlug } from "./slug";
const db = getDatabase();

export function sentContactData(
  name: string,
  email: string,
  message: string,
  subject: string,
  phone: string
) {
  const uninqeID = push(ref(db, "contactReq/")).key;
  return set(ref(db, "contactReq/" + uninqeID), {
    name: name,
    email: email,
    message: message,
    subject: subject,
    phone: phone,
  });
}

export function sendHiringRequest(
  name: string,
  email: string,
  phone: string,
  cv: string
) {
  const uninqeID = push(ref(db, "hiringReq/")).key;
  return set(ref(db, "hiringReq/" + uninqeID), {
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

/** Write-only from the client. Nothing here is ever read back by the browser. */
export function saveAssessment(record: AssessmentRecord) {
  const id = push(ref(db, "pdplAssessments/")).key;
  return set(ref(db, "pdplAssessments/" + id), record);
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