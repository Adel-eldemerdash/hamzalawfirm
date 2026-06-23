// Main Imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";
import { handleSplashScreen, initAos } from "../../core/utils/global-init";

// Component Imports
import { dialog_confirm, dialog_progress } from "../../core/utils/dialog";
import { sentContactData } from "../../core/utils/fb_api";
import "../../styles/components/buttons/dialogButton.css";
import "../../styles/components/buttons/mainButton.css";
import "../../styles/components/inputs/mainInput.css";

// Custom imports
import "./clientsAnimation.css";
import "./sectionOne.css";
import "./sectionTwo.css";
import "./sectionThree.css";
import "./sectionFour.css";
import "./sectionFive.css";
import "./imageSlider.css";
import "./imgSlider.js";

handleSplashScreen();
initAos();
initializeSideMenu();

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNum: string): boolean {
  if (!phoneNum) {
    return false;
  }
  const cleanedNum = phoneNum.replace(/[\s()\-]/g, "");
  const phoneRegex = /^\+?\d{7,15}$/;

  if (!phoneRegex.test(cleanedNum)) {
    return false;
  }
  return true;
}

$("#submitContact_btn").on("click", (event) => {
  const name = $("#submitContact_name_input").val() as string;
  const phone = $("#submitContact_phone_input").val() as string;
  const email = $("#submitContact_email_input").val() as string;
  const subject = $("#submitContact_subject_input").val() as string;
  const message = $("#submitContact_message_input").val() as string;

  let errorMessage = "";

  if (!name.trim()) {
    errorMessage = "Please enter your full name.";
  } else if (!phone.trim()) {
    errorMessage = "Please enter your phone number";
  } else if (!email.trim()) {
    errorMessage = "Please enter your email address";
  } else if (!subject.trim()) {
    errorMessage = "Please enter a message subject";
  } else if (!message.trim()) {
    errorMessage = "Please enter message text";
  } else if (!isValidEmail(email)) {
    errorMessage = "Please enter a valid email address";
  } else if (!isValidPhoneNumber(phone)) {
    errorMessage = "Please enter a valid phone number";
  }

  if (errorMessage) {
    alert(errorMessage);
    return;
  }

  dialog_progress.show();

  sentContactData(name, email, message, subject, phone)
    .then(() => {
      dialog_progress.dialog!.hide();
      dialog_confirm.show("Message Sent Successfully");
      $("#submitContact_name_input").val("");
      $("#submitContact_phone_input").val("");
      $("#submitContact_email_input").val("");
      $("#submitContact_subject_input").val("");
      $("#submitContact_message_input").val("");
    })
    .catch(() => {
      dialog_progress.dialog!.hide();
      dialog_confirm.show(
        "An error occurred while submitting. Please try again"
      );
    });
});
