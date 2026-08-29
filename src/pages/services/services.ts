// Main Imports
import "../../styles/main.scss";
import "../../core/utils/T_sys";
import { handleSplashScreen, initAos } from "../../core/utils/global-init";
import { initializeSideMenu } from "../../components/sideMenu/sideMenu";

// Components imports
import "../../styles/components/buttons/mainButton.css";
import "../../styles/components/inputs/mainInput.css";

// Custom imports
import "./services.css"

handleSplashScreen()
initAos()
initializeSideMenu()