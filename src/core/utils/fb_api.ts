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