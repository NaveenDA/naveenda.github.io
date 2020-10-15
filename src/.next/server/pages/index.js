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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _data_projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/projects */ \"./data/projects.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"next/head\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/Volumes/Official/oss/naveenda.github.io/src/pages/index.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\nfunction Home() {\n  const getTheme = theme => {\n    return theme;\n  };\n\n  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 9\n    }\n  }, \"Naveen DA Portfolio | Home\")), __jsx(\"div\", {\n    className: \"homepage\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 7\n    }\n  }, __jsx(\"main\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 9\n    }\n  }, __jsx(\"div\", {\n    className: \"container\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 16,\n      columnNumber: 11\n    }\n  }, __jsx(\"div\", {\n    className: \"row\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 17,\n      columnNumber: 13\n    }\n  }, __jsx(\"div\", {\n    className: \"col\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 18,\n      columnNumber: 15\n    }\n  }, __jsx(\"div\", {\n    className: \"profile-image\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 19,\n      columnNumber: 17\n    }\n  }, __jsx(\"img\", {\n    src: \"/naveen-da-profile.png\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 20,\n      columnNumber: 19\n    }\n  })), __jsx(\"h1\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 17\n    }\n  }, \"Hi,\"), __jsx(\"h1\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 23,\n      columnNumber: 17\n    }\n  }, \"I'm Naveen DA\"), __jsx(\"p\", {\n    className: \"info\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 24,\n      columnNumber: 17\n    }\n  }, \"I develop an application with high concern about design and UX, sometimes I do an over-engineering process for doing a simple job\"), __jsx(\"p\", {\n    className: \"icons\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 29,\n      columnNumber: 17\n    }\n  }, __jsx(\"a\", {\n    href: \"https://stackoverflow.com/users/6335029/naveenda\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-stack-overflow\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 31,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://github.com/NaveenDA\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 33,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-github\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 34,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://twitter.com/NaveenDA_\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-twitter\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 37,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://dribbble.com/naveenda\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 39,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-dribbble\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 40,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"http://medium.com/@NaveenDA\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 42,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-medium\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 43,\n      columnNumber: 21\n    }\n  })), __jsx(\"a\", {\n    href: \"https://www.linkedin.com/in/naveenda/\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 45,\n      columnNumber: 19\n    }\n  }, __jsx(\"i\", {\n    className: \"fa fa-linkedin-square\",\n    \"aria-hidden\": \"true\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 46,\n      columnNumber: 21\n    }\n  })))), __jsx(\"div\", {\n    className: \"col\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 51,\n      columnNumber: 15\n    }\n  }, __jsx(\"div\", {\n    className: \"projects\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 52,\n      columnNumber: 17\n    }\n  }, _data_projects__WEBPACK_IMPORTED_MODULE_1__[\"projects\"].map(item => __jsx(\"a\", {\n    href: item.repo,\n    className: \"card\",\n    key: item.name,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 55,\n      columnNumber: 21\n    }\n  }, __jsx(\"div\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 56,\n      columnNumber: 23\n    }\n  }, __jsx(\"div\", {\n    className: \"name\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 57,\n      columnNumber: 25\n    }\n  }, item.name), __jsx(\"div\", {\n    className: \"info\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 58,\n      columnNumber: 25\n    }\n  }, item.description), item.tags.map(tag => __jsx(\"div\", {\n    key: tag,\n    className: \"tag\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 27\n    }\n  }, tag))))))))))));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkhvbWUiLCJnZXRUaGVtZSIsInRoZW1lIiwicHJvamVjdHMiLCJtYXAiLCJpdGVtIiwicmVwbyIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInRhZ3MiLCJ0YWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRWUsU0FBU0EsSUFBVCxHQUFnQjtBQUM3QixRQUFNQyxRQUFRLEdBQUlDLEtBQUQsSUFBVztBQUMxQixXQUFPQSxLQUFQO0FBQ0QsR0FGRDs7QUFJQSxTQUNFLG1FQUNFLE1BQUMsZ0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0NBREYsQ0FERixFQUlFO0FBQUssYUFBUyxFQUFDLFVBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBQyxXQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBQyxLQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBQyxLQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLGFBQVMsRUFBQyxlQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFLLE9BQUcsRUFBQyx3QkFBVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FERixFQUlFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FKRixFQUtFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBTEYsRUFNRTtBQUFH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ZnJvbSBcIi4uL2RhdGEvcHJvamVjdHNcIjtcbmltcG9ydCBIZWFkIGZyb20gXCJuZXh0L2hlYWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgZ2V0VGhlbWUgPSAodGhlbWUpID0+IHtcbiAgICByZXR1cm4gdGhlbWU7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5OYXZlZW4gREEgUG9ydGZvbGlvIHwgSG9tZTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImhvbWVwYWdlXCI+XG4gICAgICAgIDxtYWluPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvZmlsZS1pbWFnZVwiPlxuICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvbmF2ZWVuLWRhLXByb2ZpbGUucG5nXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDE+SGksPC9oMT5cbiAgICAgICAgICAgICAgICA8aDE+SSdtIE5hdmVlbiBEQTwvaDE+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgSSBkZXZlbG9wIGFuIGFwcGxpY2F0aW9uIHdpdGggaGlnaCBjb25jZXJuIGFib3V0IGRlc2lnbiBhbmRcbiAgICAgICAgICAgICAgICAgIFVYLCBzb21ldGltZXMgSSBkbyBhbiBvdmVyLWVuZ2luZWVyaW5nIHByb2Nlc3MgZm9yIGRvaW5nIGFcbiAgICAgICAgICAgICAgICAgIHNpbXBsZSBqb2JcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiaWNvbnNcIj5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3VzZXJzLzYzMzUwMjkvbmF2ZWVuZGFcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtc3RhY2stb3ZlcmZsb3dcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL05hdmVlbkRBXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWdpdGh1YlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3R3aXR0ZXIuY29tL05hdmVlbkRBX1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS10d2l0dGVyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZHJpYmJibGUuY29tL25hdmVlbmRhXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWRyaWJiYmxlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cImh0dHA6Ly9tZWRpdW0uY29tL0BOYXZlZW5EQVwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1tZWRpdW1cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL25hdmVlbmRhL1wiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1saW5rZWRpbi1zcXVhcmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJvamVjdHNcIj5cbiAgICAgICAgICAgICAgICAgIHtwcm9qZWN0cy5tYXAoKGl0ZW0pID0+IChcblxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXtpdGVtLnJlcG99IGNsYXNzTmFtZT1cImNhcmRcIiBrZXk9e2l0ZW0ubmFtZX0+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibmFtZVwiPntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm9cIj57aXRlbS5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRhZ3MubWFwKCh0YWcpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e3RhZ30gY2xhc3NOYW1lPVwidGFnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWFpbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

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