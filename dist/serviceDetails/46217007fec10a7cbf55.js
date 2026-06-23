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

/***/ 988
(__unused_webpack_module, exports, __webpack_require__) {

eval("{var __webpack_unused_export__;\n/* provided dependency */ var $ = __webpack_require__(2726);\n\n__webpack_unused_export__ = ({ value: true });\n// Main Imports\n__webpack_require__(8450);\n__webpack_require__(8006);\nvar global_init_1 = __webpack_require__(3932);\nvar sideMenu_1 = __webpack_require__(168);\nvar fb_api_1 = __webpack_require__(6677);\n__webpack_require__(4678);\n__webpack_require__(416);\n(0, global_init_1.initAos)();\n(0, sideMenu_1.initializeSideMenu)();\nfunction setTages(tages) {\n    try {\n        var tages_array = tages.split(\",\");\n        $(\"#serviceDetailsTagsContainer\").empty();\n        for (var i = 0; i < tages_array.length; i++) {\n            var element = tages_array[i];\n            $(\"#serviceDetailsTagsContainer\").append(\"<div class=\\\"articleTagContainer\\\"><p>\".concat(element, \"</p></div>\"));\n        }\n    }\n    catch (error) {\n        $(\"#serviceDetailsTagsTitle\").hide();\n        $(\"#serviceDetailsTagsContainer\").hide();\n    }\n}\nvar requestedService = decodeURIComponent(window.location.pathname.split(\"/\")[2] || \"\").trim();\n(0, fb_api_1.getServiceDetails)(requestedService, function (data) {\n    $(\"#serviceName_paragraph\").text(requestedService);\n    $(\"#serviceDetails_paragraph\").html(data.description);\n    $(\"#serviceDetails_img\").attr(\"src\", data.image);\n    setTages(data.tages);\n    $(\"#container\").fadeIn();\n    $(\"#footer\").fadeIn();\n    (0, global_init_1.manualSplashScreen)();\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTg4LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxlQUFlO0FBQ2YsMEJBQWdDO0FBQ2hDLDBCQUFnQztBQUNoQyw4Q0FBMkU7QUFDM0UsMENBQXdFO0FBSXhFLHlDQUE0RDtBQUM1RCwwQkFBd0Q7QUFDeEQseUJBQXNEO0FBRXRELHlCQUFPLEdBQUUsQ0FBQztBQUNWLGlDQUFrQixHQUFFLENBQUM7QUFFckIsU0FBUyxRQUFRLENBQUMsS0FBYTtJQUM3QixJQUFJLENBQUM7UUFDSCxJQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUMsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE1BQU0sQ0FDdEMsZ0RBQXVDLE9BQU8sZUFBWSxDQUMzRCxDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckMsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0MsQ0FBQztBQUNILENBQUM7QUFFRCxJQUFJLGdCQUFnQixHQUFHLGtCQUFrQixDQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUM3QyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRVQsOEJBQWlCLEVBQUMsZ0JBQWdCLEVBQUUsVUFBQyxJQUFJO0lBQ3ZDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEQsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLG9DQUFrQixHQUFFLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYW16YWxhd2Zpcm0vLi9zcmMvcGFnZXMvc2VydmljZURldGFpbHMvc2VydmljZURldGFpbHMudHM/NzZjOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNYWluIEltcG9ydHNcbmltcG9ydCBcIi4uLy4uL3N0eWxlcy9tYWluLnNjc3NcIjtcbmltcG9ydCBcIi4uLy4uL2NvcmUvdXRpbHMvVF9zeXNcIjtcbmltcG9ydCB7IG1hbnVhbFNwbGFzaFNjcmVlbiwgaW5pdEFvcyB9IGZyb20gXCIuLi8uLi9jb3JlL3V0aWxzL2dsb2JhbC1pbml0XCI7XG5pbXBvcnQgeyBpbml0aWFsaXplU2lkZU1lbnUgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9zaWRlTWVudS9zaWRlTWVudVwiO1xuXG4vLyBDb21wb25lbnRzIGltcG9ydHNcbmltcG9ydCB7IGRpYWxvZ19wcm9ncmVzcyB9IGZyb20gXCIuLi8uLi9jb3JlL3V0aWxzL2RpYWxvZ1wiO1xuaW1wb3J0IHsgZ2V0U2VydmljZURldGFpbHMgfSBmcm9tIFwiLi4vLi4vY29yZS91dGlscy9mYl9hcGlcIjtcbmltcG9ydCBcIi4uLy4uL3N0eWxlcy9jb21wb25lbnRzL2J1dHRvbnMvbWFpbkJ1dHRvbi5jc3NcIjtcbmltcG9ydCBcIi4uLy4uL3N0eWxlcy9jb21wb25lbnRzL2lucHV0cy9tYWluSW5wdXQuY3NzXCI7XG5cbmluaXRBb3MoKTtcbmluaXRpYWxpemVTaWRlTWVudSgpO1xuXG5mdW5jdGlvbiBzZXRUYWdlcyh0YWdlczogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdGFnZXNfYXJyYXkgPSB0YWdlcy5zcGxpdChcIixcIik7XG4gICAgJChcIiNzZXJ2aWNlRGV0YWlsc1RhZ3NDb250YWluZXJcIikuZW1wdHkoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRhZ2VzX2FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGFnZXNfYXJyYXlbaV07XG4gICAgICAkKFwiI3NlcnZpY2VEZXRhaWxzVGFnc0NvbnRhaW5lclwiKS5hcHBlbmQoXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiYXJ0aWNsZVRhZ0NvbnRhaW5lclwiPjxwPiR7ZWxlbWVudH08L3A+PC9kaXY+YFxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgJChcIiNzZXJ2aWNlRGV0YWlsc1RhZ3NUaXRsZVwiKS5oaWRlKCk7XG4gICAgJChcIiNzZXJ2aWNlRGV0YWlsc1RhZ3NDb250YWluZXJcIikuaGlkZSgpO1xuICB9XG59XG5cbmxldCByZXF1ZXN0ZWRTZXJ2aWNlID0gZGVjb2RlVVJJQ29tcG9uZW50KFxuICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoXCIvXCIpWzJdIHx8IFwiXCJcbikudHJpbSgpO1xuXG5nZXRTZXJ2aWNlRGV0YWlscyhyZXF1ZXN0ZWRTZXJ2aWNlLCAoZGF0YSkgPT4ge1xuICAkKFwiI3NlcnZpY2VOYW1lX3BhcmFncmFwaFwiKS50ZXh0KHJlcXVlc3RlZFNlcnZpY2UpO1xuICAkKFwiI3NlcnZpY2VEZXRhaWxzX3BhcmFncmFwaFwiKS5odG1sKGRhdGEuZGVzY3JpcHRpb24pO1xuICAkKFwiI3NlcnZpY2VEZXRhaWxzX2ltZ1wiKS5hdHRyKFwic3JjXCIsIGRhdGEuaW1hZ2UpO1xuICBzZXRUYWdlcyhkYXRhLnRhZ2VzKTtcbiAgJChcIiNjb250YWluZXJcIikuZmFkZUluKCk7XG4gICQoXCIjZm9vdGVyXCIpLmZhZGVJbigpO1xuICBtYW51YWxTcGxhc2hTY3JlZW4oKTtcbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///988\n\n}");

/***/ }

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
/******/ 		__webpack_require__.j = 750;
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
/******/ 			750: 0
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [96,76], () => (__webpack_require__(988)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;