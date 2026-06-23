import { PageFlip } from "page-flip";
import { getAllServiceData } from "../../core/utils/fb_api";
import { manualSplashScreen } from "../../core/utils/global-init";


document.addEventListener("DOMContentLoaded", () => {
  let imagePage = (imgeLink, title) => `
  <div class="page">
        <div class="page-content">
          <div
            id="servicePage_image"
            class="d-flex flex-column justify-content-center align-items-center"
            style="
              height: 100%; 
              padding: 30px; 
              overflow: auto;
              background: url('${imgeLink}') no-repeat center center; 
              background-size: cover;
              filter: grayscale(1);

            "
          >
            <div
              class="d-flex flex-column align-items-center"
              style="
                position: fixed;
                bottom: 5%;
                padding: 8px;
                margin: 16px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 8px;
                width: 95%;
              "
            >
              <h3
                id="servicePage_title"
                style="
                  margin-bottom: 0px;
                  text-align: center;
                  color: rgb(255, 255, 255);
                  font-family: Amiri, serif;
                "
              >
                ${title}
              </h3>
              <div style="height: 4px; width: 10%; background: #b38f54"></div>
            </div>
          </div>
        </div>
      </div>
  `;

  let descriptionPage = (description) => `
          <div class="page">
            <div class="page-content">
              <div
                class="d-flex flex-column justify-content-start align-items-center"
                style="height: 100%;background: #1f1f63; padding: 8px; overflow: auto;color: rgb(255, 255, 255);"
              >
                <p
                  id="servicePage_description"
                  style="
                    width: 100%;
                    color: rgb(255, 255, 255);
                    margin-bottom: 0px;
                    font-family: 'Bai Jamjuree', sans-serif;
                    text-align: justify;
                  "
                >
                  ${description}
                </p>
              </div>
            </div>
          </div>
  `;

  getAllServiceData((data) => {
    data.forEach((service) => {
      $("#Service_Container").append(imagePage(service.image, service.name));
      $("#Service_Container").append(descriptionPage(service.description));
    });
    new FullscreenPageFlip();
    manualSplashScreen()
  });
});

let firstFlip = true;
class FullscreenPageFlip {
  constructor() {
    this.pageFlip = null;
    this.isMobile = window.innerWidth < 768;
    this.init();
    this.handleResize();
  }

  init() {
    const width = window.innerWidth;
    const height = window.innerHeight - (this.isMobile ? 150 : 70); // 70px هو ارتفاع الـ navbar

    this.isMobile = width < 768;

    const pageWidth = this.isMobile ? width : Math.floor(width / 2);
    const pageHeight = height;

    this.pageFlip = new PageFlip(document.getElementById("book"), {
      width: pageWidth,
      height: pageHeight,
      size: "fixed",
      minWidth: 315,
      maxWidth: 2000,
      minHeight: 420,
      maxHeight: 2000,
      maxShadowOpacity: 0.5,
      showCover: true,
      mobileScrollSupport: false,
      swipeDistance: this.isMobile ? 0 : 30,
      clickEventForward: this.isMobile ? false : true,
      usePortrait: this.isMobile,
      startPage: 0,
      drawShadow: true,
      flippingTime: 1000,
      useMouseEvents: this.isMobile ? false : true,
      autoSize: false,
    });

    this.pageFlip.loadFromHTML(document.querySelectorAll(".page"));

    this.addEventListeners();
  }

  addEventListeners() {
    if (this.isMobile) {
      const flipBtnPrev = document.getElementById("flipBtnPrev");
      const flipBtnNext = document.getElementById("flipBtnNext");

      if (flipBtnPrev) {
        flipBtnPrev.addEventListener("click", () => {
          this.pageFlip.flipNext();
        });
      }

      if (flipBtnNext) {
        flipBtnNext.addEventListener("click", () => {
          this.pageFlip.flipPrev();
        });
      }
      window.scrollTo(0, 1);
    } else {
      document
        .getElementById("book-container")
        .addEventListener("click", (e) => {
          if (firstFlip) {
            hidePulseHint();
            firstFlip = false;
          }
        });
      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          if (e.key === "ArrowRight") {
            this.pageFlip.flipPrev();
          } else {
            this.pageFlip.flipNext();
          }
        }
      });
    }
  }

  handleResize() {
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        location.reload();
      }, 250);
    });
  }
}

function hidePulseHint() {
  const pulseContainer = document.querySelector(".pulse-hint-container");
  if (pulseContainer) {
    pulseContainer.style.transition = "opacity 0.5s ease-out";
    pulseContainer.style.opacity = "0";
    setTimeout(() => {
      pulseContainer.style.display = "none";
    }, 500);
  }
}
