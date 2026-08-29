import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCfKtqAL5qSjjO9DEB1AqogdkALqtW8_Ys",
  authDomain: "hamza-lawfirm.firebaseapp.com",
  projectId: "hamza-lawfirm",
  storageBucket: "hamza-lawfirm.firebasestorage.app",
  messagingSenderId: "565049954514",
  appId: "1:565049954514:web:e8182fb2e7923d1fd41d0b",
  measurementId: "G-TJH0LMLYQQ",
};

let app = initializeApp(firebaseConfig);
// getAnalytics(app);
const auth = getAuth();
const database = getDatabase();
let currentScrollDepth = 0;
const SESSION_START_TIME = Date.now();

function getTsysUID(): Promise<string> {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
      } else {
        signInAnonymously(auth)
          .then((credential) => {
            resolve(credential.user.uid);
          })
          .catch(() => {
            reject("AUTH_FAILED");
          });
      }
    });
  });
}

// getTsysUID().then((userUID) => {
//   sendMainData(userUID);
//   window.addEventListener("beforeunload", () => {
//     sendBeaconData(userUID);
//   });
// });

document.addEventListener("scroll", () => {
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = window.scrollY;
  const scrolledPersent = Math.min(
    100,
    Math.round((scrolled / docHeight) * 100)
  );
  if (docHeight > 0 && currentScrollDepth < scrolledPersent) {
    currentScrollDepth = scrolledPersent;
  }
});

function sendMainData(userUID: string) {
  const tDataRef = ref(database, `vistors/${userUID}/${SESSION_START_TIME}`);
  set(tDataRef, {
    pageUrl: window.location.href,
    referrer: document.referrer || "direct",
    userAgent: navigator.userAgent,
    userLanguage: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}

function sendBeaconData(userUID: string) {
  const timeSpentMs = Date.now() - SESSION_START_TIME;
  const timeSpentSeconds = Math.round(timeSpentMs / 1000);
  const payloadJson = JSON.stringify({
    timeSpentSeconds: timeSpentSeconds,
    scrollDepthPercent: currentScrollDepth,
  });
  const FIREBASE_REST_ENDPOINT = `https://hamza-lawfirm-default-rtdb.firebaseio.com/vistors/${userUID}/${SESSION_START_TIME}.json`;
  fetch(FIREBASE_REST_ENDPOINT, {
    method: "PATCH",
    body: payloadJson,
    keepalive: true,
    headers: { "Content-Type": "application/json" },
  }).catch((e) => console.error("Tsys fetch failed:", e));
}
