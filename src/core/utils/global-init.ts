import Aos = require("aos");
import "aos/dist/aos.css";

export function handleSplashScreen() {
  const $splashScreen = $("#splash-screen");
  $(window).on("load", function () {
    if ($splashScreen.length) {
      $splashScreen.remove();
    }
    $("body").css("overflow-y", "auto");
  });
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
