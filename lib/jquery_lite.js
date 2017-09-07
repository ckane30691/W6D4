/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(selector) {
  if (selector instanceof HTMLElement) {
    const selectArr = Array.from(selector);
    const selectDNC = new DOMNodeCollection(selectArr);
    return selectDNC;
  }
  else {
    const select = document.querySelectorAll(selector);
    const selectArr = Array.from(select);
    const selectDNC = new DOMNodeCollection(selectArr);
    return selectDNC;
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(arr) {
    this.arr = arr;
  }

  html(str) {
    if (str !== undefined) {
      this.arr.forEach( (el) => {
        el.innerHTML = str;
      });
      return str;
    } else {
      return this.arr[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(el) {
    if (el instanceof Array) {
      const $elDOM = new DOMNodeCollection(el);
      $elDOM.arr.forEach( (innerNode) => {
        this.arr.forEach( (outerNode) => {
          outerNode.innerHTML += innerNode;
        });
      });
    }
    else {
      this.arr[0].innerHTML += el;
    }
  }

  attr() {
    return this.arr[0].attributes;
  }

  addClass(str) {
    this.arr[0].className = str;
  }

  removeClass() {
    this.arr[0].removeAttribute('class');
  }

  children() {
    const children = [];

    this.arr.forEach( (node) => {
      for (let i = 0; i < node.children.length; i++) {
        children.push(node.children.item(i));
      }
    });
    const result = new DOMNodeCollection(children);
    return result;
  }

  parent() {
    const parents = [];

    this.arr.forEach( node => {
      if (!parents.includes(node.parentElement)) {
        parents.push(node.parentElement);
      }
    });

    const result = new DOMNodeCollection(parents);
    return result;
  }

  find(selector) {
    const matches = [];

    this.arr.forEach( node => {
      let query = node.querySelectorAll(selector);
      if (!matches.includes(query))
      matches.push(query);
    });

    const result = new DOMNodeCollection(matches);
    return result;
  }

  remove() {
    this.empty();
    this.arr = [];
  }
}

module.exports = DOMNodeCollection;

// animals = ["<li>horses</li>", "<li>donkeys</li>"]


/***/ })
/******/ ]);