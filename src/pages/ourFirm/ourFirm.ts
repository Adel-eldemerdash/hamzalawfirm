// Main Imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { handleSplashScreen, initAos } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";

// Component Imports
import { dialog_confirm, dialog_progress } from "../../core/utils/dialog";
import { sendHiringRequest } from "../../core/utils/fb_api";
import { isValidEmail, isValidPhoneNumber } from "../../core/utils/validation";
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
  const name = ($("#hiring_name_input").val() as string).trim();
  const phone = ($("#hiring_phone_input").val() as string).trim();
  const email = ($("#hiring_email_input").val() as string).trim();
  // Filled by the Uploadcare widget with the uploaded file URLs, joined by
  // commas when more than one file is uploaded.
  const cv = ($("#hiring_cv_input").val() as string).trim();

  // Every check runs before the progress dialog opens. The previous handler
  // opened it first and then sent the application whether or not a CV was
  // attached, so incomplete applications were stored.
  let errorMessage = "";

  if (!name) {
    errorMessage = "Please enter your full name.";
  } else if (name.length > 120) {
    errorMessage = "Please shorten your name to 120 characters or fewer.";
  } else if (!phone) {
    errorMessage = "Please enter your phone number.";
  } else if (!isValidPhoneNumber(phone)) {
    errorMessage = "Please enter a valid phone number.";
  } else if (!email) {
    errorMessage = "Please enter your email address.";
  } else if (!isValidEmail(email)) {
    errorMessage = "Please enter a valid email address.";
  } else if (!cv) {
    errorMessage = "Please upload your CV.";
  } else if (cv.length > 500) {
    errorMessage = "Please upload a single file for your CV.";
  }

  if (errorMessage) {
    dialog_confirm.show(errorMessage);
    return;
  }

  dialog_progress.show();

  sendHiringRequest(name, email, phone, cv)
    .then(() => {
      dialog_progress.dialog!.hide();
      dialog_confirm.show("Hiring Request Sent Successfully");
    })
    .catch(() => {
      dialog_progress.dialog!.hide();
      dialog_confirm.show("Something Went Wrong");
    });
});
