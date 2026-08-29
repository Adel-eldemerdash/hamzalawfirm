// Main Imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { handleSplashScreen, initAos } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";

// Component Imports
import { dialog_confirm, dialog_progress } from "../../core/utils/dialog";
import { sendHiringRequest } from "../../core/utils/fb_api";
import "../../styles/components/buttons/dialogButton.css";
import "../../styles/components/buttons/mainButton.css";

// Custom imports
import "./ourMissionSection.css";
import "./ourPolicySection.css";
import "./ourValuesSection.css";
import "./ourVisionSection.css";
import "./ourTeamSection.css";
import "./cards.css";

initAos()
handleSplashScreen()
initializeSideMenu()


$("#hiring_btn").on("click", () => {
  dialog_progress.show();
  const name = $("#hiring_name_input").val() as string;
  const phone = $("#hiring_phone_input").val() as string;
  const email = $("#hiring_email_input").val() as string;
  const cv = $("#hiring_cv_input").val() as string;
  if (cv == "") {
    dialog_confirm.show("Please Upload Your CV");
  }
  {
    sendHiringRequest(name, email, phone, cv)
      .then(() => {
        dialog_progress.dialog!.hide();
        dialog_confirm.show("Hiring Request Sent Successfully");
      })
      .catch(() => {
        dialog_progress.dialog!.hide();
        dialog_confirm.show("Something Went Wrong");
      });
  }
});
