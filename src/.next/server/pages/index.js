module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/utils.js":
/*!*****************************!*\
  !*** ./components/utils.js ***!
  \*****************************/
/*! exports provided: cdnImage, shuffle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cdnImage\", function() { return cdnImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shuffle\", function() { return shuffle; });\n// prettier-ignore\nconst cdnImage = (name, placeholder, folder = '/photography') => {\n  if (false) {} else {\n    return folder + \"/\" + name;\n  }\n};\nconst shuffle = array => {\n  array = [...array];\n  var currentIndex = array.length,\n      temporaryValue,\n      randomIndex; // While there remain elements to shuffle...\n\n  while (0 !== currentIndex) {\n    // Pick a remaining element...\n    randomIndex = Math.floor(Math.random() * currentIndex);\n    currentIndex -= 1; // And swap it with the current element.\n\n    temporaryValue = array[currentIndex];\n    array[currentIndex] = array[randomIndex];\n    array[randomIndex] = temporaryValue;\n  }\n\n  return array;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3V0aWxzLmpzPzdlNjkiXSwibmFtZXMiOlsiY2RuSW1hZ2UiLCJuYW1lIiwicGxhY2Vob2xkZXIiLCJmb2xkZXIiLCJzaHVmZmxlIiwiYXJyYXkiLCJjdXJyZW50SW5kZXgiLCJsZW5ndGgiLCJ0ZW1wb3JhcnlWYWx1ZSIsInJhbmRvbUluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNPLE1BQU1BLFFBQVEsR0FBRyxDQUFDQyxJQUFELEVBQU9DLFdBQVAsRUFBbUJDLE1BQU0sR0FBQyxjQUExQixLQUE2QztBQUNuRSxhQUEyQyxFQUEzQyxNQU1PO0FBQ0wsV0FBT0EsTUFBTSxHQUFDLEdBQVAsR0FBYUYsSUFBcEI7QUFDRDtBQUNGLENBVk07QUFZQSxNQUFNRyxPQUFPLEdBQUlDLEtBQUQsSUFBVztBQUNoQ0EsT0FBSyxHQUFHLENBQUMsR0FBR0EsS0FBSixDQUFSO0FBQ0EsTUFBSUMsWUFBWSxHQUFHRCxLQUFLLENBQUNFLE1BQXpCO0FBQUEsTUFDRUMsY0FERjtBQUFBLE1BRUVDLFdBRkYsQ0FGZ0MsQ0FNaEM7O0FBQ0EsU0FBTyxNQUFNSCxZQUFiLEVBQTJCO0FBQ3pCO0FBQ0FHLGVBQVcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQk4sWUFBM0IsQ0FBZDtBQUNBQSxnQkFBWSxJQUFJLENBQWhCLENBSHlCLENBS3pCOztBQUNBRSxrQkFBYyxHQUFHSCxLQUFLLENBQUNDLFlBQUQsQ0FBdEI7QUFDQUQsU0FBSyxDQUFDQyxZQUFELENBQUwsR0FBc0JELEtBQUssQ0FBQ0ksV0FBRCxDQUEzQjtBQUNBSixTQUFLLENBQUNJLFdBQUQsQ0FBTCxHQUFxQkQsY0FBckI7QUFDRDs7QUFFRCxTQUFPSCxLQUFQO0FBQ0QsQ0FuQk0iLCJmaWxlIjoiLi9jb21wb25lbnRzL3V0aWxzLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcHJldHRpZXItaWdub3JlXG5leHBvcnQgY29uc3QgY2RuSW1hZ2UgPSAobmFtZSwgcGxhY2Vob2xkZXIsZm9sZGVyPScvcGhvdG9ncmFwaHknKSA9PiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgIHJldHVybiBcImh0dHBzOi8vY2RuLnN0YXRpY2FsbHkuaW8vaW1nL25hdmVlbmRhLmdpdGh1Yi5pb1wiK2ZvbGRlcitcIi9oPTEwMC9cIituYW1lO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXCJodHRwczovL2Nkbi5zdGF0aWNhbGx5LmlvL2ltZy9uYXZlZW5kYS5naXRodWIuaW8vZj1hdXRvL1wiK2ZvbGRlcitcIi9cIituYW1lO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZm9sZGVyK1wiL1wiICsgbmFtZTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHNodWZmbGUgPSAoYXJyYXkpID0+IHtcbiAgYXJyYXkgPSBbLi4uYXJyYXldO1xuICB2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLFxuICAgIHRlbXBvcmFyeVZhbHVlLFxuICAgIHJhbmRvbUluZGV4O1xuXG4gIC8vIFdoaWxlIHRoZXJlIHJlbWFpbiBlbGVtZW50cyB0byBzaHVmZmxlLi4uXG4gIHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcbiAgICAvLyBQaWNrIGEgcmVtYWluaW5nIGVsZW1lbnQuLi5cbiAgICByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG4gICAgY3VycmVudEluZGV4IC09IDE7XG5cbiAgICAvLyBBbmQgc3dhcCBpdCB3aXRoIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgdGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuICAgIGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG4gICAgYXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG4gIH1cblxuICByZXR1cm4gYXJyYXk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/utils.js\n");

/***/ }),

/***/ "./data/projects.js":
/*!**************************!*\
  !*** ./data/projects.js ***!
  \**************************/
/*! exports provided: projects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projects\", function() { return projects; });\nconst projects = [{\n  name: \"Optime\",\n  description: \"A CSS framework optimised for better readability 📖.\",\n  repo: \"https://github.com/NaveenDA/optime\",\n  tags: [\"CSS\"]\n}, {\n  name: \"tablenavigator\",\n  description: \"A jQuery plugin that enables navigate a table via keyboard\",\n  repo: \"\",\n  tags: [\"JavaScript\", \"jQuery\"]\n}, {\n  name: \"express-routes-catalogue\",\n  description: \"An express.js Plugin that listout all the registed routes\",\n  repo: \"https://github.com/NaveenDA/express-routes-catalogue\",\n  tags: [\"Typescript\"]\n}, {\n  name: \"Drafti\",\n  description: \"Note-taking application based on Markdown with Offline support.\",\n  repo: \"https://github.com/NaveenDA/drafti\",\n  tags: [\"markdown\", \"react\", \"editor\", \"Typescript\"]\n}, {\n  name: \"react-rerender-test\",\n  description: \"A simple react component help to test the component re-render or not\",\n  repo: \"https://github.com/NaveenDA/react-rerender-test\",\n  tags: [\"Typescript\", \"react\", \"testing\"]\n}, {\n  name: \"nice-pie\",\n  description: \"A awesome pie chart based on the d3\",\n  repo: \"https://github.com/dotcodes/nice-pie\",\n  tags: [\"d3\", \"typescript\", \"chart\"]\n}];//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9kYXRhL3Byb2plY3RzLmpzPzJhZmUiXSwibmFtZXMiOlsicHJvamVjdHMiLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJyZXBvIiwidGFncyJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFBQTtBQUFPLE1BQU1BLFFBQVEsR0FBRyxDQUNwQjtBQUNFQyxNQUFJLEVBQUUsUUFEUjtBQUVFQyxhQUFXLEVBQUUsc0RBRmY7QUFHRUMsTUFBSSxFQUFFLG9DQUhSO0FBSUVDLE1BQUksRUFBRSxDQUFDLEtBQUQ7QUFKUixDQURvQixFQU9wQjtBQUNFSCxNQUFJLEVBQUUsZ0JBRFI7QUFFRUMsYUFBVyxFQUFFLDREQUZmO0FBR0VDLE1BQUksRUFBRSxFQUhSO0FBSUVDLE1BQUksRUFBRSxDQUFDLFlBQUQsRUFBZSxRQUFmO0FBSlIsQ0FQb0IsRUFhcEI7QUFDRUgsTUFBSSxFQUFFLDBCQURSO0FBRUVDLGFBQVcsRUFBRSwyREFGZjtBQUdFQyxNQUFJLEVBQUUsc0RBSFI7QUFJRUMsTUFBSSxFQUFFLENBQUMsWUFBRDtBQUpSLENBYm9CLEVBbUJwQjtBQUNFSCxNQUFJLEVBQUUsUUFEUjtBQUVFQyxhQUFXLEVBQ1QsaUVBSEo7QUFJRUMsTUFBSSxFQUFFLG9DQUpSO0FBS0VDLE1BQUksRUFBRSxDQUFDLFVBQUQsRUFBYSxPQUFiLEVBQXNCLFFBQXRCLEVBQWdDLFlBQWhDO0FBTFIsQ0FuQm9CLEVBMEJwQjtBQUNFSCxNQUFJLEVBQUUscUJBRFI7QUFFRUMsYUFBVyxFQUNULHNFQUhKO0FBSUVDLE1BQUksRUFBRSxpREFKUjtBQUtFQyxNQUFJLEVBQUUsQ0FBQyxZQUFELEVBQWUsT0FBZixFQUF3QixTQUF4QjtBQUxSLENBMUJvQixFQWlDcEI7QUFDRUgsTUFBSSxFQUFFLFVBRFI7QUFFRUMsYUFBVyxFQUFFLHFDQUZmO0FBR0VDLE1BQUksRUFBRSxzQ0FIUjtBQUlFQyxNQUFJLEVBQUUsQ0FBQyxJQUFELEVBQU8sWUFBUCxFQUFxQixPQUFyQjtBQUpSLENBakNvQixDQUFqQiIsImZpbGUiOiIuL2RhdGEvcHJvamVjdHMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBjb25zdCBwcm9qZWN0cyA9IFtcbiAgICB7XG4gICAgICBuYW1lOiBcIk9wdGltZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiQSBDU1MgZnJhbWV3b3JrIG9wdGltaXNlZCBmb3IgYmV0dGVyIHJlYWRhYmlsaXR5IPCfk5YuXCIsXG4gICAgICByZXBvOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9OYXZlZW5EQS9vcHRpbWVcIixcbiAgICAgIHRhZ3M6IFtcIkNTU1wiXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwidGFibGVuYXZpZ2F0b3JcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkEgalF1ZXJ5IHBsdWdpbiB0aGF0IGVuYWJsZXMgbmF2aWdhdGUgYSB0YWJsZSB2aWEga2V5Ym9hcmRcIixcbiAgICAgIHJlcG86IFwiXCIsXG4gICAgICB0YWdzOiBbXCJKYXZhU2NyaXB0XCIsIFwialF1ZXJ5XCJdLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJleHByZXNzLXJvdXRlcy1jYXRhbG9ndWVcIixcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkFuIGV4cHJlc3MuanMgUGx1Z2luIHRoYXQgbGlzdG91dCBhbGwgdGhlIHJlZ2lzdGVkIHJvdXRlc1wiLFxuICAgICAgcmVwbzogXCJodHRwczovL2dpdGh1Yi5jb20vTmF2ZWVuREEvZXhwcmVzcy1yb3V0ZXMtY2F0YWxvZ3VlXCIsXG4gICAgICB0YWdzOiBbXCJUeXBlc2NyaXB0XCJdLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJEcmFmdGlcIixcbiAgICAgIGRlc2NyaXB0aW9uOlxuICAgICAgICBcIk5vdGUtdGFraW5nIGFwcGxpY2F0aW9uIGJhc2VkIG9uIE1hcmtkb3duIHdpdGggT2ZmbGluZSBzdXBwb3J0LlwiLFxuICAgICAgcmVwbzogXCJodHRwczovL2dpdGh1Yi5jb20vTmF2ZWVuREEvZHJhZnRpXCIsXG4gICAgICB0YWdzOiBbXCJtYXJrZG93blwiLCBcInJlYWN0XCIsIFwiZWRpdG9yXCIsIFwiVHlwZXNjcmlwdFwiXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwicmVhY3QtcmVyZW5kZXItdGVzdFwiLFxuICAgICAgZGVzY3JpcHRpb246XG4gICAgICAgIFwiQSBzaW1wbGUgcmVhY3QgY29tcG9uZW50IGhlbHAgdG8gdGVzdCB0aGUgY29tcG9uZW50IHJlLXJlbmRlciBvciBub3RcIixcbiAgICAgIHJlcG86IFwiaHR0cHM6Ly9naXRodWIuY29tL05hdmVlbkRBL3JlYWN0LXJlcmVuZGVyLXRlc3RcIixcbiAgICAgIHRhZ3M6IFtcIlR5cGVzY3JpcHRcIiwgXCJyZWFjdFwiLCBcInRlc3RpbmdcIl0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIm5pY2UtcGllXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBIGF3ZXNvbWUgcGllIGNoYXJ0IGJhc2VkIG9uIHRoZSBkM1wiLFxuICAgICAgcmVwbzogXCJodHRwczovL2dpdGh1Yi5jb20vZG90Y29kZXMvbmljZS1waWVcIixcbiAgICAgIHRhZ3M6IFtcImQzXCIsIFwidHlwZXNjcmlwdFwiLCBcImNoYXJ0XCJdLFxuICAgIH0sXG4gIF07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./data/projects.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _data_projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/projects */ \"./data/projects.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _components_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/utils */ \"./components/utils.js\");\nvar _jsxFileName = \"/Volumes/Official/oss/naveenda.github.io/src/pages/index.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\nfunction Home() {\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 8,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 9\n    }\n  }, \"Naveen DA Portfolio \")), __jsx(\"div\", {\n    className: \"homepage\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }\n  }, __jsx(\"main\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 9\n    }\n  }, __jsx(\"div\", {\n    className: \"container\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"row\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 13\n    }\n  }, __jsx(\"div\", {\n    className: \"col\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 15\n    }\n  }, __jsx(\"div\", {\n    className: \"profile-image\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 17\n    }\n  }, __jsx(\"img\", {\n    src: Object(_components_utils__WEBPACK_IMPORTED_MODULE_3__[\"cdnImage\"])(\"naveen-da-profile.png\", false, \"\"),\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 19\n    }\n  })), __jsx(\"h1\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 19,\n      columnNumber: 17\n    }\n  }, \"Hi,\"), __jsx(\"h1\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 20,\n      columnNumber: 17\n    }\n  }, \"I'm Naveen DA\"), __jsx(\"p\", {\n    className: \"info\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 17\n    }\n  }, \"I develop an application with high concern about design and UX, sometimes I do an over-engineering process for doing a simple job\"), __jsx(\"p\", {\n    className: \"icons\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 26,\n      columnNumber: 17\n    }\n  }, __jsx(\"a\", {\n    href: \"https://stackoverflow.com/users/6335029/naveenda\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 27,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-stack-overflow\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 28,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://github.com/NaveenDA\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-github\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://twitter.com/NaveenDA_\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-twitter\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 34,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://dribbble.com/naveenda\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-dribbble\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"http://medium.com/@NaveenDA\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-medium\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://www.linkedin.com/in/naveenda/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-linkedin-square\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 21\n    }\n  })))), __jsx(\"div\", {\n    className: \"col\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 48,\n      columnNumber: 15\n    }\n  }, __jsx(\"div\", {\n    className: \"projects\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 49,\n      columnNumber: 17\n    }\n  }, _data_projects__WEBPACK_IMPORTED_MODULE_1__[\"projects\"].map(item => __jsx(\"a\", {\n    href: item.repo,\n    className: \"card\",\n    key: item.name,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 51,\n      columnNumber: 21\n    }\n  }, __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 52,\n      columnNumber: 23\n    }\n  }, __jsx(\"div\", {\n    className: \"name\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 53,\n      columnNumber: 25\n    }\n  }, item.name), __jsx(\"div\", {\n    className: \"info\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 54,\n      columnNumber: 25\n    }\n  }, item.description), item.tags.map(tag => __jsx(\"div\", {\n    key: tag,\n    className: \"tag\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 56,\n      columnNumber: 27\n    }\n  }, tag))))))))))));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkhvbWUiLCJjZG5JbWFnZSIsInByb2plY3RzIiwibWFwIiwiaXRlbSIsInJlcG8iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJ0YWdzIiwidGFnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVlLFNBQVNBLElBQVQsR0FBZ0I7QUFDN0IsU0FDRSxtRUFDRSxNQUFDLGdEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDRCQURGLENBREYsRUFJRTtBQUFLLGFBQVMsRUFBQyxVQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsV0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsS0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsS0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUMsZUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxPQUFHLEVBQUVDLGtFQUFRLENBQUMsdUJBQUQsRUFBMEIsS0FBMUIsRUFBaUMsRUFBakMsQ0FBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLENBREYsRUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBSkYsRUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUxGLEVBTUU7QUFBRyxhQUFTLEVBQUMsTUFBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHlJQU5GLEVBV0U7QUFBRyxhQUFTLEVBQUMsT0FBYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBRyxRQUFJLEVBQUMsa0RBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUcsYUFBUyxFQUFDLHNCQUFiO0FBQW9DLG1CQUFZLE1BQWhEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQURGLEVBSUU7QUFBRyxRQUFJLEVBQUMsNkJBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUcsYUFBUyxFQUFDLGNBQWI7QUFBNEIsbUJBQVksTUFBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURGLENBSkYsRUFPRTtBQUFHLFFBQUksRUFBQywrQkFBUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBRyxhQUFTLEVBQUMsZUFBYjtBQUE2QixtQkFBWSxNQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FQRixFQVVFO0FBQUcsUUFBSSxFQUFDLCtCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFHLGFBQVMsRUFBQyxnQkFBYjtBQUE4QixtQkFBWSxNQUExQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FWRixFQWFFO0FBQUcsUUFBSSxFQUFDLDZCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFHLGFBQVMsRUFBQyxjQUFiO0FBQTRCLG1CQUFZLE1BQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQWJGLEVBZ0JFO0FBQUcsUUFBSSxFQUFDLHVDQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFHLGFBQVMsRUFBQyx1QkFBYjtBQUFxQyxtQkFBWSxNQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FoQkYsQ0FYRixDQURGLEVBa0NFO0FBQUssYUFBUyxFQUFDLEtBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUssYUFBUyxFQUFDLFVBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHQyx1REFBUSxDQUFDQyxHQUFULENBQWNDLElBQUQsSUFDWjtBQUFHLFFBQUksRUFBRUEsSUFBSSxDQUFDQyxJQUFkO0FBQW9CLGFBQVMsRUFBQyxNQUE5QjtBQUFxQyxPQUFHLEVBQUVELElBQUksQ0FBQ0UsSUFBL0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBQyxNQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBdUJGLElBQUksQ0FBQ0UsSUFBNUIsQ0FERixFQUVFO0FBQUssYUFBUyxFQUFDLE1BQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF1QkYsSUFBSSxDQUFDRyxXQUE1QixDQUZGLEVBR0dILElBQUksQ0FBQ0ksSUFBTCxDQUFVTCxHQUFWLENBQWVNLEdBQUQsSUFDYjtBQUFLLE9BQUcsRUFBRUEsR0FBVjtBQUFlLGFBQVMsRUFBQyxLQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0dBLEdBREgsQ0FERCxDQUhILENBREYsQ0FERCxDQURILENBREYsQ0FsQ0YsQ0FERixDQURGLENBREYsQ0FKRixDQURGO0FBaUVEIiwiZmlsZSI6Ii4vcGFnZXMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuLi9kYXRhL3Byb2plY3RzXCI7XG5pbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgeyBjZG5JbWFnZSB9IGZyb20gXCIuLi9jb21wb25lbnRzL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+TmF2ZWVuIERBIFBvcnRmb2xpbyA8L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJob21lcGFnZVwiPlxuICAgICAgICA8bWFpbj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2ZpbGUtaW1hZ2VcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtjZG5JbWFnZShcIm5hdmVlbi1kYS1wcm9maWxlLnBuZ1wiLCBmYWxzZSwgXCJcIil9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGgxPkhpLDwvaDE+XG4gICAgICAgICAgICAgICAgPGgxPkknbSBOYXZlZW4gREE8L2gxPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImluZm9cIj5cbiAgICAgICAgICAgICAgICAgIEkgZGV2ZWxvcCBhbiBhcHBsaWNhdGlvbiB3aXRoIGhpZ2ggY29uY2VybiBhYm91dCBkZXNpZ24gYW5kXG4gICAgICAgICAgICAgICAgICBVWCwgc29tZXRpbWVzIEkgZG8gYW4gb3Zlci1lbmdpbmVlcmluZyBwcm9jZXNzIGZvciBkb2luZyBhXG4gICAgICAgICAgICAgICAgICBzaW1wbGUgam9iXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImljb25zXCI+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS91c2Vycy82MzM1MDI5L25hdmVlbmRhXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLXN0YWNrLW92ZXJmbG93XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9OYXZlZW5EQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1naXRodWJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly90d2l0dGVyLmNvbS9OYXZlZW5EQV9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtdHdpdHRlclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2RyaWJiYmxlLmNvbS9uYXZlZW5kYVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1kcmliYmJsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwOi8vbWVkaXVtLmNvbS9ATmF2ZWVuREFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbWVkaXVtXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9uYXZlZW5kYS9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtbGlua2VkaW4tc3F1YXJlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByb2plY3RzXCI+XG4gICAgICAgICAgICAgICAgICB7cHJvamVjdHMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9e2l0ZW0ucmVwb30gY2xhc3NOYW1lPVwiY2FyZFwiIGtleT17aXRlbS5uYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJuYW1lXCI+e2l0ZW0ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1wiPntpdGVtLmRlc2NyaXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udGFncy5tYXAoKHRhZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17dGFnfSBjbGFzc05hbWU9XCJ0YWdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tYWluPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/head\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L2hlYWRcIj81ZWYyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQvaGVhZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvaGVhZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next/head\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ })

/******/ });