/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/cjs/scheduler.development.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/cjs/scheduler.development.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("{/**\n * @license React\n * scheduler.development.js\n *\n * Copyright (c) Meta Platforms, Inc. and affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n true &&\n  (function () {\n    function performWorkUntilDeadline() {\n      needsPaint = !1;\n      if (isMessageLoopRunning) {\n        var currentTime = exports.unstable_now();\n        startTime = currentTime;\n        var hasMoreWork = !0;\n        try {\n          a: {\n            isHostCallbackScheduled = !1;\n            isHostTimeoutScheduled &&\n              ((isHostTimeoutScheduled = !1),\n              localClearTimeout(taskTimeoutID),\n              (taskTimeoutID = -1));\n            isPerformingWork = !0;\n            var previousPriorityLevel = currentPriorityLevel;\n            try {\n              b: {\n                advanceTimers(currentTime);\n                for (\n                  currentTask = peek(taskQueue);\n                  null !== currentTask &&\n                  !(\n                    currentTask.expirationTime > currentTime &&\n                    shouldYieldToHost()\n                  );\n\n                ) {\n                  var callback = currentTask.callback;\n                  if (\"function\" === typeof callback) {\n                    currentTask.callback = null;\n                    currentPriorityLevel = currentTask.priorityLevel;\n                    var continuationCallback = callback(\n                      currentTask.expirationTime <= currentTime\n                    );\n                    currentTime = exports.unstable_now();\n                    if (\"function\" === typeof continuationCallback) {\n                      currentTask.callback = continuationCallback;\n                      advanceTimers(currentTime);\n                      hasMoreWork = !0;\n                      break b;\n                    }\n                    currentTask === peek(taskQueue) && pop(taskQueue);\n                    advanceTimers(currentTime);\n                  } else pop(taskQueue);\n                  currentTask = peek(taskQueue);\n                }\n                if (null !== currentTask) hasMoreWork = !0;\n                else {\n                  var firstTimer = peek(timerQueue);\n                  null !== firstTimer &&\n                    requestHostTimeout(\n                      handleTimeout,\n                      firstTimer.startTime - currentTime\n                    );\n                  hasMoreWork = !1;\n                }\n              }\n              break a;\n            } finally {\n              (currentTask = null),\n                (currentPriorityLevel = previousPriorityLevel),\n                (isPerformingWork = !1);\n            }\n            hasMoreWork = void 0;\n          }\n        } finally {\n          hasMoreWork\n            ? schedulePerformWorkUntilDeadline()\n            : (isMessageLoopRunning = !1);\n        }\n      }\n    }\n    function push(heap, node) {\n      var index = heap.length;\n      heap.push(node);\n      a: for (; 0 < index; ) {\n        var parentIndex = (index - 1) >>> 1,\n          parent = heap[parentIndex];\n        if (0 < compare(parent, node))\n          (heap[parentIndex] = node),\n            (heap[index] = parent),\n            (index = parentIndex);\n        else break a;\n      }\n    }\n    function peek(heap) {\n      return 0 === heap.length ? null : heap[0];\n    }\n    function pop(heap) {\n      if (0 === heap.length) return null;\n      var first = heap[0],\n        last = heap.pop();\n      if (last !== first) {\n        heap[0] = last;\n        a: for (\n          var index = 0, length = heap.length, halfLength = length >>> 1;\n          index < halfLength;\n\n        ) {\n          var leftIndex = 2 * (index + 1) - 1,\n            left = heap[leftIndex],\n            rightIndex = leftIndex + 1,\n            right = heap[rightIndex];\n          if (0 > compare(left, last))\n            rightIndex < length && 0 > compare(right, left)\n              ? ((heap[index] = right),\n                (heap[rightIndex] = last),\n                (index = rightIndex))\n              : ((heap[index] = left),\n                (heap[leftIndex] = last),\n                (index = leftIndex));\n          else if (rightIndex < length && 0 > compare(right, last))\n            (heap[index] = right),\n              (heap[rightIndex] = last),\n              (index = rightIndex);\n          else break a;\n        }\n      }\n      return first;\n    }\n    function compare(a, b) {\n      var diff = a.sortIndex - b.sortIndex;\n      return 0 !== diff ? diff : a.id - b.id;\n    }\n    function advanceTimers(currentTime) {\n      for (var timer = peek(timerQueue); null !== timer; ) {\n        if (null === timer.callback) pop(timerQueue);\n        else if (timer.startTime <= currentTime)\n          pop(timerQueue),\n            (timer.sortIndex = timer.expirationTime),\n            push(taskQueue, timer);\n        else break;\n        timer = peek(timerQueue);\n      }\n    }\n    function handleTimeout(currentTime) {\n      isHostTimeoutScheduled = !1;\n      advanceTimers(currentTime);\n      if (!isHostCallbackScheduled)\n        if (null !== peek(taskQueue))\n          (isHostCallbackScheduled = !0),\n            isMessageLoopRunning ||\n              ((isMessageLoopRunning = !0), schedulePerformWorkUntilDeadline());\n        else {\n          var firstTimer = peek(timerQueue);\n          null !== firstTimer &&\n            requestHostTimeout(\n              handleTimeout,\n              firstTimer.startTime - currentTime\n            );\n        }\n    }\n    function shouldYieldToHost() {\n      return needsPaint\n        ? !0\n        : exports.unstable_now() - startTime < frameInterval\n          ? !1\n          : !0;\n    }\n    function requestHostTimeout(callback, ms) {\n      taskTimeoutID = localSetTimeout(function () {\n        callback(exports.unstable_now());\n      }, ms);\n    }\n    \"undefined\" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&\n      \"function\" ===\n        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&\n      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());\n    exports.unstable_now = void 0;\n    if (\n      \"object\" === typeof performance &&\n      \"function\" === typeof performance.now\n    ) {\n      var localPerformance = performance;\n      exports.unstable_now = function () {\n        return localPerformance.now();\n      };\n    } else {\n      var localDate = Date,\n        initialTime = localDate.now();\n      exports.unstable_now = function () {\n        return localDate.now() - initialTime;\n      };\n    }\n    var taskQueue = [],\n      timerQueue = [],\n      taskIdCounter = 1,\n      currentTask = null,\n      currentPriorityLevel = 3,\n      isPerformingWork = !1,\n      isHostCallbackScheduled = !1,\n      isHostTimeoutScheduled = !1,\n      needsPaint = !1,\n      localSetTimeout = \"function\" === typeof setTimeout ? setTimeout : null,\n      localClearTimeout =\n        \"function\" === typeof clearTimeout ? clearTimeout : null,\n      localSetImmediate =\n        \"undefined\" !== typeof setImmediate ? setImmediate : null,\n      isMessageLoopRunning = !1,\n      taskTimeoutID = -1,\n      frameInterval = 5,\n      startTime = -1;\n    if (\"function\" === typeof localSetImmediate)\n      var schedulePerformWorkUntilDeadline = function () {\n        localSetImmediate(performWorkUntilDeadline);\n      };\n    else if (\"undefined\" !== typeof MessageChannel) {\n      var channel = new MessageChannel(),\n        port = channel.port2;\n      channel.port1.onmessage = performWorkUntilDeadline;\n      schedulePerformWorkUntilDeadline = function () {\n        port.postMessage(null);\n      };\n    } else\n      schedulePerformWorkUntilDeadline = function () {\n        localSetTimeout(performWorkUntilDeadline, 0);\n      };\n    exports.unstable_IdlePriority = 5;\n    exports.unstable_ImmediatePriority = 1;\n    exports.unstable_LowPriority = 4;\n    exports.unstable_NormalPriority = 3;\n    exports.unstable_Profiling = null;\n    exports.unstable_UserBlockingPriority = 2;\n    exports.unstable_cancelCallback = function (task) {\n      task.callback = null;\n    };\n    exports.unstable_forceFrameRate = function (fps) {\n      0 > fps || 125 < fps\n        ? console.error(\n            \"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported\"\n          )\n        : (frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5);\n    };\n    exports.unstable_getCurrentPriorityLevel = function () {\n      return currentPriorityLevel;\n    };\n    exports.unstable_next = function (eventHandler) {\n      switch (currentPriorityLevel) {\n        case 1:\n        case 2:\n        case 3:\n          var priorityLevel = 3;\n          break;\n        default:\n          priorityLevel = currentPriorityLevel;\n      }\n      var previousPriorityLevel = currentPriorityLevel;\n      currentPriorityLevel = priorityLevel;\n      try {\n        return eventHandler();\n      } finally {\n        currentPriorityLevel = previousPriorityLevel;\n      }\n    };\n    exports.unstable_requestPaint = function () {\n      needsPaint = !0;\n    };\n    exports.unstable_runWithPriority = function (priorityLevel, eventHandler) {\n      switch (priorityLevel) {\n        case 1:\n        case 2:\n        case 3:\n        case 4:\n        case 5:\n          break;\n        default:\n          priorityLevel = 3;\n      }\n      var previousPriorityLevel = currentPriorityLevel;\n      currentPriorityLevel = priorityLevel;\n      try {\n        return eventHandler();\n      } finally {\n        currentPriorityLevel = previousPriorityLevel;\n      }\n    };\n    exports.unstable_scheduleCallback = function (\n      priorityLevel,\n      callback,\n      options\n    ) {\n      var currentTime = exports.unstable_now();\n      \"object\" === typeof options && null !== options\n        ? ((options = options.delay),\n          (options =\n            \"number\" === typeof options && 0 < options\n              ? currentTime + options\n              : currentTime))\n        : (options = currentTime);\n      switch (priorityLevel) {\n        case 1:\n          var timeout = -1;\n          break;\n        case 2:\n          timeout = 250;\n          break;\n        case 5:\n          timeout = 1073741823;\n          break;\n        case 4:\n          timeout = 1e4;\n          break;\n        default:\n          timeout = 5e3;\n      }\n      timeout = options + timeout;\n      priorityLevel = {\n        id: taskIdCounter++,\n        callback: callback,\n        priorityLevel: priorityLevel,\n        startTime: options,\n        expirationTime: timeout,\n        sortIndex: -1\n      };\n      options > currentTime\n        ? ((priorityLevel.sortIndex = options),\n          push(timerQueue, priorityLevel),\n          null === peek(taskQueue) &&\n            priorityLevel === peek(timerQueue) &&\n            (isHostTimeoutScheduled\n              ? (localClearTimeout(taskTimeoutID), (taskTimeoutID = -1))\n              : (isHostTimeoutScheduled = !0),\n            requestHostTimeout(handleTimeout, options - currentTime)))\n        : ((priorityLevel.sortIndex = timeout),\n          push(taskQueue, priorityLevel),\n          isHostCallbackScheduled ||\n            isPerformingWork ||\n            ((isHostCallbackScheduled = !0),\n            isMessageLoopRunning ||\n              ((isMessageLoopRunning = !0),\n              schedulePerformWorkUntilDeadline())));\n      return priorityLevel;\n    };\n    exports.unstable_shouldYield = shouldYieldToHost;\n    exports.unstable_wrapCallback = function (callback) {\n      var parentPriorityLevel = currentPriorityLevel;\n      return function () {\n        var previousPriorityLevel = currentPriorityLevel;\n        currentPriorityLevel = parentPriorityLevel;\n        try {\n          return callback.apply(this, arguments);\n        } finally {\n          currentPriorityLevel = previousPriorityLevel;\n        }\n      };\n    };\n    \"undefined\" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&\n      \"function\" ===\n        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&\n      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());\n  })();\n\n\n//# sourceURL=webpack://deep-webpack/./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/cjs/scheduler.development.js?\n}");

/***/ }),

/***/ "./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/index.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("{\n\nif (false) // removed by dead control flow\n{} else {\n  module.exports = __webpack_require__(/*! ./cjs/scheduler.development.js */ \"./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/cjs/scheduler.development.js\");\n}\n\n\n//# sourceURL=webpack://deep-webpack/./node_modules/.pnpm/scheduler@0.26.0/node_modules/scheduler/index.js?\n}");

/***/ }),

/***/ "./src/hello.tsx":
/*!***********************!*\
  !*** ./src/hello.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("{/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/.pnpm/react@19.1.1/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _images_avatar_webp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/avatar.webp */ \"./src/images/avatar.webp\");\n/* harmony import */ var _images_book_webp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/book.webp */ \"./src/images/book.webp\");\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math */ \"./src/math.js\");\n/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_math__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst Hello = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, \"\\u5440~\\u54C8\\u55BD\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _images_book_webp__WEBPACK_IMPORTED_MODULE_2__,\n    alt: \"\"\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"img\", {\n    src: _images_avatar_webp__WEBPACK_IMPORTED_MODULE_1__,\n    alt: \"\"\n  }), (0,_math__WEBPACK_IMPORTED_MODULE_3__.add)(1, 2));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hello);\n\n//# sourceURL=webpack://deep-webpack/./src/hello.tsx?\n}");

/***/ }),

/***/ "./src/images/avatar.webp":
/*!********************************!*\
  !*** ./src/images/avatar.webp ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("{module.exports = __webpack_require__.p + \"assets/images/avatar..webp\";\n\n//# sourceURL=webpack://deep-webpack/./src/images/avatar.webp?\n}");

/***/ }),

/***/ "./src/images/book.webp":
/*!******************************!*\
  !*** ./src/images/book.webp ***!
  \******************************/
/***/ ((module) => {

"use strict";
eval("{module.exports = \"data:image/webp;base64,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\";\n\n//# sourceURL=webpack://deep-webpack/./src/images/book.webp?\n}");

/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ (() => {

"use strict";
eval("{// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://deep-webpack/./src/main.css?\n}");

/***/ }),

/***/ "./src/main.tsx":
/*!**********************!*\
  !*** ./src/main.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
eval("{/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/.pnpm/react@19.1.1/node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/.pnpm/react-dom@19.1.1_react@19.1.1/node_modules/react-dom/client.js\");\n/* harmony import */ var _hello_tsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hello.tsx */ \"./src/hello.tsx\");\n/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.css */ \"./src/main.css\");\n\n\n\n\n(0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(document.getElementById('app')).render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_hello_tsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null));\n\n//# sourceURL=webpack://deep-webpack/./src/main.tsx?\n}");

/***/ }),

/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/***/ (() => {

eval("{throw new Error(\"Module parse failed: 'import' and 'export' may appear only with 'sourceType: module' (1:0)\\nFile was processed with these loaders:\\n * ./node_modules/.pnpm/babel-loader@10.0.0_@babel+core@7.28.3_webpack@5.101.3/node_modules/babel-loader/lib/index.js\\nYou may need an additional loader to handle the result of these loaders.\\n> export const add = (a, b) => a + b;\\n| export const subtract = (a, b) => a - b;\\n| export const multiply = (a, b) => a * b;\");\n\n//# sourceURL=webpack://deep-webpack/./src/math.js?\n}");

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
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
/******/ 			"main": 0
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
/******/ 		var chunkLoadingGlobal = self["webpackChunkdeep_webpack"] = self["webpackChunkdeep_webpack"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors"], () => (__webpack_require__("./src/main.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;