// Main Imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { manualSplashScreen, initAos } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";

// Components imports
import { dialog_progress } from "../../core/utils/dialog";
import { getServiceDetails } from "../../core/utils/fb_api";
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

let requestedService = decodeURIComponent(
  window.location.pathname.split("/")[2] || ""
).trim();

getServiceDetails(requestedService, (data) => {
  $("#serviceName_paragraph").text(requestedService);
  $("#serviceDetails_paragraph").html(data.description);
  $("#serviceDetails_img").attr("src", data.image);
  setTages(data.tages);
  $("#container").fadeIn();
  $("#footer").fadeIn();
  manualSplashScreen();
});