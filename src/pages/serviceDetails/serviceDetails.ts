// Main Imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { manualSplashScreen, initAos } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";

// Components imports
import { dialog_progress } from "../../core/utils/dialog";
import { getServiceBySlug } from "../../core/utils/fb_api";
import "../../styles/components/buttons/mainButton.css";
import "../../styles/components/inputs/mainInput.css";

initAos();
initializeSideMenu();

function setTages(tages: string) {
  try {
    const tages_array = tages.split(",");
    $("#serviceDetailsTagsContainer").empty();
    for (let i = 0; i < tages_array.length; i++) {
      const element = tages_array[i];
      $("#serviceDetailsTagsContainer").append(
        `<div class="articleTagContainer"><p>${element}</p></div>`
      );
    }
  } catch (error) {
    $("#serviceDetailsTagsTitle").hide();
    $("#serviceDetailsTagsContainer").hide();
  }
}

const requestedSlug = decodeURIComponent(
  window.location.pathname.split("/")[2] || ""
).trim();

/**
 * `headerInjection` builds the canonical URL from the page folder name, which
 * would emit /serviceDetails for every service. The real public URL is
 * /services/<slug>, so it is corrected here.
 */
function setCanonical(slug: string) {
  const href = "https://www.hamzalawfirm.com/services/" + slug;
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

function showNotFound() {
  // The rewrite lists the live slugs, so an unknown one should already have
  // been answered with a 404 by the server. This covers the case where a slug
  // is still routed but its record has gone from the database.
  const robots = document.createElement("meta");
  robots.name = "robots";
  robots.content = "noindex, follow";
  document.head.appendChild(robots);

  document.title = "Service not found | Hamza & Partners Law Firm";
  $("#serviceName_paragraph").text("Service not found");
  $("#serviceDetails_paragraph").html(
    'We could not find that service. Please see <a href="/services">our services</a>.'
  );
  $("#serviceDetails_img").hide();
  $("#serviceDetailsTagsTitle").hide();
  $("#serviceDetailsTagsContainer").hide();
  $("#container").fadeIn();
  $("#footer").fadeIn();
  manualSplashScreen();
}

getServiceBySlug(requestedSlug)
  .then((data) => {
    if (!data) {
      showNotFound();
      return;
    }
    document.title = "Hamza & Partners Law Firm | " + data.name;
    setCanonical(requestedSlug);
    $("#serviceName_paragraph").text(data.name);
    $("#serviceDetails_paragraph").html(data.description);
    $("#serviceDetails_img").attr("src", data.image);
    setTages(data.tages);
    $("#container").fadeIn();
    $("#footer").fadeIn();
    manualSplashScreen();
  })
  .catch(() => {
    showNotFound();
  });