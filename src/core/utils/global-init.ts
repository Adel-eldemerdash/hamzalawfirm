import Aos = require("aos");
import "aos/dist/aos.css";

export function handleSplashScreen() {
  const $splashScreen = $("#splash-screen");

  const hideSplash = () => {
    if ($splashScreen.length) {
      $splashScreen.remove();
    }
    $("body").css("overflow-y", "auto");
  };

  $(window).on("load", hideSplash);

  // Fallback: force-remove splash after 10 seconds in case window "load"
  // never fires (e.g. a critical asset returns a 500 error on the host).
  setTimeout(hideSplash, 10000);
}

export function manualSplashScreen() {
  const $splashScreen = $("#splash-screen");
  if ($splashScreen.length) {
    $splashScreen.remove();
  }
  $("body").css("overflow-y", "auto");
}

export function initAos() {
  Aos.init({
    duration: 1000,
    once: true,
  });
}
