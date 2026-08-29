import { getDatabase, ref, set, push, onValue } from "firebase/database";
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

export function getServiceDetails(
  serviceName: string,
  requestedData: (data: serviceData) => void
) {
  const starCountRef = ref(db, "serviceData/" + serviceName);
  onValue(starCountRef, (snapshot) => {
    const descripton = snapshot.child("description").val();
    const image = snapshot.child("image").val();
    const tages: string = snapshot.child("tages").val();
    requestedData({
      name: serviceName,
      description: descripton,
      image: image,
      tages: tages,
    });
  });
}

export function getAllServiceData(
  requestedData: (data: serviceData[]) => void
) {
  const starCountRef = ref(db, "serviceData/");
  let data: serviceData[] = [];
  onValue(starCountRef, (snapshot) => {
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