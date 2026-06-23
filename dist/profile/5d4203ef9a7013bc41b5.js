/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 3140:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzE0MC5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYW16YWxhd2Zpcm0vLi9zcmMvcGFnZXMvcHJvZmlsZS9wcm9maWxlLmNzcz83ODE2Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3140\n\n}");

/***/ }),

/***/ 3821:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var page_flip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6508);\n/* harmony import */ var page_flip__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(page_flip__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _core_utils_fb_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6677);\n/* harmony import */ var _core_utils_global_init__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3932);\n/* provided dependency */ var $ = __webpack_require__(2726);\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  let imagePage = (imgeLink, title) => `\n  <div class=\"page\">\n        <div class=\"page-content\">\n          <div\n            id=\"servicePage_image\"\n            class=\"d-flex flex-column justify-content-center align-items-center\"\n            style=\"\n              height: 100%; \n              padding: 30px; \n              overflow: auto;\n              background: url('${imgeLink}') no-repeat center center; \n              background-size: cover;\n              filter: grayscale(1);\n\n            \"\n          >\n            <div\n              class=\"d-flex flex-column align-items-center\"\n              style=\"\n                position: fixed;\n                bottom: 5%;\n                padding: 8px;\n                margin: 16px;\n                background: rgba(0, 0, 0, 0.8);\n                border-radius: 8px;\n                width: 95%;\n              \"\n            >\n              <h3\n                id=\"servicePage_title\"\n                style=\"\n                  margin-bottom: 0px;\n                  text-align: center;\n                  color: rgb(255, 255, 255);\n                  font-family: Amiri, serif;\n                \"\n              >\n                ${title}\n              </h3>\n              <div style=\"height: 4px; width: 10%; background: #b38f54\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n  `;\n\n  let descriptionPage = (description) => `\n          <div class=\"page\">\n            <div class=\"page-content\">\n              <div\n                class=\"d-flex flex-column justify-content-start align-items-center\"\n                style=\"height: 100%;background: #1f1f63; padding: 8px; overflow: auto;color: rgb(255, 255, 255);\"\n              >\n                <p\n                  id=\"servicePage_description\"\n                  style=\"\n                    width: 100%;\n                    color: rgb(255, 255, 255);\n                    margin-bottom: 0px;\n                    font-family: 'Bai Jamjuree', sans-serif;\n                    text-align: justify;\n                  \"\n                >\n                  ${description}\n                </p>\n              </div>\n            </div>\n          </div>\n  `;\n\n  (0,_core_utils_fb_api__WEBPACK_IMPORTED_MODULE_1__.getAllServiceData)((data) => {\n    data.forEach((service) => {\n      $(\"#Service_Container\").append(imagePage(service.image, service.name));\n      $(\"#Service_Container\").append(descriptionPage(service.description));\n    });\n    new FullscreenPageFlip();\n    (0,_core_utils_global_init__WEBPACK_IMPORTED_MODULE_2__.manualSplashScreen)()\n  });\n});\n\nlet firstFlip = true;\nclass FullscreenPageFlip {\n  constructor() {\n    this.pageFlip = null;\n    this.isMobile = window.innerWidth < 768;\n    this.init();\n    this.handleResize();\n  }\n\n  init() {\n    const width = window.innerWidth;\n    const height = window.innerHeight - (this.isMobile ? 150 : 70); // 70px هو ارتفاع الـ navbar\n\n    this.isMobile = width < 768;\n\n    const pageWidth = this.isMobile ? width : Math.floor(width / 2);\n    const pageHeight = height;\n\n    this.pageFlip = new page_flip__WEBPACK_IMPORTED_MODULE_0__.PageFlip(document.getElementById(\"book\"), {\n      width: pageWidth,\n      height: pageHeight,\n      size: \"fixed\",\n      minWidth: 315,\n      maxWidth: 2000,\n      minHeight: 420,\n      maxHeight: 2000,\n      maxShadowOpacity: 0.5,\n      showCover: true,\n      mobileScrollSupport: false,\n      swipeDistance: this.isMobile ? 0 : 30,\n      clickEventForward: this.isMobile ? false : true,\n      usePortrait: this.isMobile,\n      startPage: 0,\n      drawShadow: true,\n      flippingTime: 1000,\n      useMouseEvents: this.isMobile ? false : true,\n      autoSize: false,\n    });\n\n    this.pageFlip.loadFromHTML(document.querySelectorAll(\".page\"));\n\n    this.addEventListeners();\n  }\n\n  addEventListeners() {\n    if (this.isMobile) {\n      const flipBtnPrev = document.getElementById(\"flipBtnPrev\");\n      const flipBtnNext = document.getElementById(\"flipBtnNext\");\n\n      if (flipBtnPrev) {\n        flipBtnPrev.addEventListener(\"click\", () => {\n          this.pageFlip.flipNext();\n        });\n      }\n\n      if (flipBtnNext) {\n        flipBtnNext.addEventListener(\"click\", () => {\n          this.pageFlip.flipPrev();\n        });\n      }\n      window.scrollTo(0, 1);\n    } else {\n      document\n        .getElementById(\"book-container\")\n        .addEventListener(\"click\", (e) => {\n          if (firstFlip) {\n            hidePulseHint();\n            firstFlip = false;\n          }\n        });\n      document.addEventListener(\"keydown\", (e) => {\n        if (e.key === \"ArrowLeft\" || e.key === \"ArrowRight\") {\n          if (e.key === \"ArrowRight\") {\n            this.pageFlip.flipPrev();\n          } else {\n            this.pageFlip.flipNext();\n          }\n        }\n      });\n    }\n  }\n\n  handleResize() {\n    let resizeTimer;\n    window.addEventListener(\"resize\", () => {\n      clearTimeout(resizeTimer);\n      resizeTimer = setTimeout(() => {\n        location.reload();\n      }, 250);\n    });\n  }\n}\n\nfunction hidePulseHint() {\n  const pulseContainer = document.querySelector(\".pulse-hint-container\");\n  if (pulseContainer) {\n    pulseContainer.style.transition = \"opacity 0.5s ease-out\";\n    pulseContainer.style.opacity = \"0\";\n    setTimeout(() => {\n      pulseContainer.style.display = \"none\";\n    }, 500);\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMzgyMS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBcUM7QUFDdUI7QUFDTTs7O0FBR2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsU0FBUztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSx1Q0FBdUMsWUFBWTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MscUJBQXFCLGNBQWMsZUFBZSwwQkFBMEI7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUscUVBQWlCO0FBQ25CO0FBQ0EsTUFBTSxDQUFDO0FBQ1AsTUFBTSxDQUFDO0FBQ1AsS0FBSztBQUNMO0FBQ0EsSUFBSSwyRUFBa0I7QUFDdEIsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0VBQW9FOztBQUVwRTs7QUFFQTtBQUNBOztBQUVBLHdCQUF3QiwrQ0FBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaGFtemFsYXdmaXJtLy4vc3JjL3BhZ2VzL3Byb2ZpbGUvanNQcm9maWxlLmpzPzAyMjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFnZUZsaXAgfSBmcm9tIFwicGFnZS1mbGlwXCI7XG5pbXBvcnQgeyBnZXRBbGxTZXJ2aWNlRGF0YSB9IGZyb20gXCIuLi8uLi9jb3JlL3V0aWxzL2ZiX2FwaVwiO1xuaW1wb3J0IHsgbWFudWFsU3BsYXNoU2NyZWVuIH0gZnJvbSBcIi4uLy4uL2NvcmUvdXRpbHMvZ2xvYmFsLWluaXRcIjtcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGxldCBpbWFnZVBhZ2UgPSAoaW1nZUxpbmssIHRpdGxlKSA9PiBgXG4gIDxkaXYgY2xhc3M9XCJwYWdlXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBpZD1cInNlcnZpY2VQYWdlX2ltYWdlXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZC1mbGV4IGZsZXgtY29sdW1uIGp1c3RpZnktY29udGVudC1jZW50ZXIgYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgICAgIGhlaWdodDogMTAwJTsgXG4gICAgICAgICAgICAgIHBhZGRpbmc6IDMwcHg7IFxuICAgICAgICAgICAgICBvdmVyZmxvdzogYXV0bztcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogdXJsKCcke2ltZ2VMaW5rfScpIG5vLXJlcGVhdCBjZW50ZXIgY2VudGVyOyBcbiAgICAgICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgICAgICAgICAgZmlsdGVyOiBncmF5c2NhbGUoMSk7XG5cbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1jZW50ZXJcIlxuICAgICAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICAgICAgICAgICAgICBib3R0b206IDUlO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDhweDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDE2cHg7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgICAgICAgICB3aWR0aDogOTUlO1xuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aDNcbiAgICAgICAgICAgICAgICBpZD1cInNlcnZpY2VQYWdlX3RpdGxlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMHB4O1xuICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcbiAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBBbWlyaSwgc2VyaWY7XG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICR7dGl0bGV9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDRweDsgd2lkdGg6IDEwJTsgYmFja2dyb3VuZDogI2IzOGY1NFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gIGA7XG5cbiAgbGV0IGRlc2NyaXB0aW9uUGFnZSA9IChkZXNjcmlwdGlvbikgPT4gYFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFnZS1jb250ZW50XCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cImQtZmxleCBmbGV4LWNvbHVtbiBqdXN0aWZ5LWNvbnRlbnQtc3RhcnQgYWxpZ24taXRlbXMtY2VudGVyXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDogMTAwJTtiYWNrZ3JvdW5kOiAjMWYxZjYzOyBwYWRkaW5nOiA4cHg7IG92ZXJmbG93OiBhdXRvO2NvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICBpZD1cInNlcnZpY2VQYWdlX2Rlc2NyaXB0aW9uXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPVwiXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnQmFpIEphbWp1cmVlJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgJHtkZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gIGA7XG5cbiAgZ2V0QWxsU2VydmljZURhdGEoKGRhdGEpID0+IHtcbiAgICBkYXRhLmZvckVhY2goKHNlcnZpY2UpID0+IHtcbiAgICAgICQoXCIjU2VydmljZV9Db250YWluZXJcIikuYXBwZW5kKGltYWdlUGFnZShzZXJ2aWNlLmltYWdlLCBzZXJ2aWNlLm5hbWUpKTtcbiAgICAgICQoXCIjU2VydmljZV9Db250YWluZXJcIikuYXBwZW5kKGRlc2NyaXB0aW9uUGFnZShzZXJ2aWNlLmRlc2NyaXB0aW9uKSk7XG4gICAgfSk7XG4gICAgbmV3IEZ1bGxzY3JlZW5QYWdlRmxpcCgpO1xuICAgIG1hbnVhbFNwbGFzaFNjcmVlbigpXG4gIH0pO1xufSk7XG5cbmxldCBmaXJzdEZsaXAgPSB0cnVlO1xuY2xhc3MgRnVsbHNjcmVlblBhZ2VGbGlwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wYWdlRmxpcCA9IG51bGw7XG4gICAgdGhpcy5pc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4O1xuICAgIHRoaXMuaW5pdCgpO1xuICAgIHRoaXMuaGFuZGxlUmVzaXplKCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gKHRoaXMuaXNNb2JpbGUgPyAxNTAgOiA3MCk7IC8vIDcwcHgg2YfZiCDYp9ix2KrZgdin2Lkg2KfZhNmAIG5hdmJhclxuXG4gICAgdGhpcy5pc01vYmlsZSA9IHdpZHRoIDwgNzY4O1xuXG4gICAgY29uc3QgcGFnZVdpZHRoID0gdGhpcy5pc01vYmlsZSA/IHdpZHRoIDogTWF0aC5mbG9vcih3aWR0aCAvIDIpO1xuICAgIGNvbnN0IHBhZ2VIZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB0aGlzLnBhZ2VGbGlwID0gbmV3IFBhZ2VGbGlwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9va1wiKSwge1xuICAgICAgd2lkdGg6IHBhZ2VXaWR0aCxcbiAgICAgIGhlaWdodDogcGFnZUhlaWdodCxcbiAgICAgIHNpemU6IFwiZml4ZWRcIixcbiAgICAgIG1pbldpZHRoOiAzMTUsXG4gICAgICBtYXhXaWR0aDogMjAwMCxcbiAgICAgIG1pbkhlaWdodDogNDIwLFxuICAgICAgbWF4SGVpZ2h0OiAyMDAwLFxuICAgICAgbWF4U2hhZG93T3BhY2l0eTogMC41LFxuICAgICAgc2hvd0NvdmVyOiB0cnVlLFxuICAgICAgbW9iaWxlU2Nyb2xsU3VwcG9ydDogZmFsc2UsXG4gICAgICBzd2lwZURpc3RhbmNlOiB0aGlzLmlzTW9iaWxlID8gMCA6IDMwLFxuICAgICAgY2xpY2tFdmVudEZvcndhcmQ6IHRoaXMuaXNNb2JpbGUgPyBmYWxzZSA6IHRydWUsXG4gICAgICB1c2VQb3J0cmFpdDogdGhpcy5pc01vYmlsZSxcbiAgICAgIHN0YXJ0UGFnZTogMCxcbiAgICAgIGRyYXdTaGFkb3c6IHRydWUsXG4gICAgICBmbGlwcGluZ1RpbWU6IDEwMDAsXG4gICAgICB1c2VNb3VzZUV2ZW50czogdGhpcy5pc01vYmlsZSA/IGZhbHNlIDogdHJ1ZSxcbiAgICAgIGF1dG9TaXplOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRoaXMucGFnZUZsaXAubG9hZEZyb21IVE1MKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucGFnZVwiKSk7XG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICBpZiAodGhpcy5pc01vYmlsZSkge1xuICAgICAgY29uc3QgZmxpcEJ0blByZXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsaXBCdG5QcmV2XCIpO1xuICAgICAgY29uc3QgZmxpcEJ0bk5leHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsaXBCdG5OZXh0XCIpO1xuXG4gICAgICBpZiAoZmxpcEJ0blByZXYpIHtcbiAgICAgICAgZmxpcEJ0blByZXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhZ2VGbGlwLmZsaXBOZXh0KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmxpcEJ0bk5leHQpIHtcbiAgICAgICAgZmxpcEJ0bk5leHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICB0aGlzLnBhZ2VGbGlwLmZsaXBQcmV2KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudFxuICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJib29rLWNvbnRhaW5lclwiKVxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGZpcnN0RmxpcCkge1xuICAgICAgICAgICAgaGlkZVB1bHNlSGludCgpO1xuICAgICAgICAgICAgZmlyc3RGbGlwID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gXCJBcnJvd0xlZnRcIiB8fCBlLmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpIHtcbiAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICB0aGlzLnBhZ2VGbGlwLmZsaXBQcmV2KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFnZUZsaXAuZmxpcE5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSgpIHtcbiAgICBsZXQgcmVzaXplVGltZXI7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHJlc2l6ZVRpbWVyKTtcbiAgICAgIHJlc2l6ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSwgMjUwKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoaWRlUHVsc2VIaW50KCkge1xuICBjb25zdCBwdWxzZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHVsc2UtaGludC1jb250YWluZXJcIik7XG4gIGlmIChwdWxzZUNvbnRhaW5lcikge1xuICAgIHB1bHNlQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBcIm9wYWNpdHkgMC41cyBlYXNlLW91dFwiO1xuICAgIHB1bHNlQ29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHB1bHNlQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9LCA1MDApO1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///3821\n\n}");

/***/ }),

/***/ 9032:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{var __webpack_unused_export__;\n\n__webpack_unused_export__ = ({ value: true });\n// Main Imports\n__webpack_require__(6957);\n__webpack_require__(8006);\nvar global_init_1 = __webpack_require__(3932);\nvar sideMenu_1 = __webpack_require__(168);\n// Custom imports\n__webpack_require__(3140);\n__webpack_require__(3821);\n(0, global_init_1.initAos)();\n(0, sideMenu_1.initializeSideMenu)();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTAzMi5qcyIsIm1hcHBpbmdzIjoiOzs7QUFBQSxlQUFlO0FBQ2YsMEJBQWdDO0FBQ2hDLDBCQUFnQztBQUNoQyw4Q0FBdUQ7QUFDdkQsMENBQXdFO0FBRXhFLGlCQUFpQjtBQUNqQiwwQkFBdUI7QUFDdkIsMEJBQXdCO0FBRXhCLHlCQUFPLEdBQUU7QUFDVCxpQ0FBa0IsR0FBRSIsInNvdXJjZXMiOlsid2VicGFjazovL2hhbXphbGF3ZmlybS8uL3NyYy9wYWdlcy9wcm9maWxlL3Byb2ZpbGUudHM/YTNkMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNYWluIEltcG9ydHNcbmltcG9ydCBcIi4uLy4uL3N0eWxlcy9tYWluLnNjc3NcIjtcbmltcG9ydCBcIi4uLy4uL2NvcmUvdXRpbHMvVF9zeXNcIjtcbmltcG9ydCB7IGluaXRBb3MgfSBmcm9tIFwiLi4vLi4vY29yZS91dGlscy9nbG9iYWwtaW5pdFwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVNpZGVNZW51IH0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvc2lkZU1lbnUvc2lkZU1lbnVcIjtcblxuLy8gQ3VzdG9tIGltcG9ydHNcbmltcG9ydCBcIi4vcHJvZmlsZS5jc3NcIjtcbmltcG9ydCBcIi4vanNQcm9maWxlLmpzXCI7XG5cbmluaXRBb3MoKVxuaW5pdGlhbGl6ZVNpZGVNZW51KClcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///9032\n\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/runtimeId */
/******/ 	(() => {
/******/ 		__webpack_require__.j = 138;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			138: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkhamzalawfirm"] = self["webpackChunkhamzalawfirm"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [96,76], () => (__webpack_require__(9032)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;