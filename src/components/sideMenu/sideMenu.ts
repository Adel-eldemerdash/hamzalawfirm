import "./sideMenu.css"

export function initializeSideMenu() {
  $("#sideMenu_btn").on("click", () => {
    $("#mySidenav").width("100%");
  });

  $("#closeSideMenu_btn").on("click", () => {
    $("#mySidenav").width("0");
  });
}
