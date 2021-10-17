/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/display.js":
/*!************************!*\
  !*** ./src/display.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/factoryhelper.js */ "./src/helpers/factoryhelper.js");


var display = function () {
  var initialize = function initialize() {
    console.log('initializing display');
    var enemyGridWrapper = document.createElement('div');
    enemyGridWrapper.classList.add('grid-wrapper', 'enemy-grid-wrapper');
    var enemyGrid = document.createElement('div');
    enemyGrid.classList.add('grid', 'enemy-grid');
    var playerGridWrapper = document.createElement('div');
    playerGridWrapper.classList.add('grid-wrapper', 'player-grid-wrapper');
    var playerGrid = document.createElement('div');
    playerGrid.classList.add('grid', 'player-grid');
    document.querySelector('#game-container').appendChild(enemyGridWrapper);
    enemyGridWrapper.appendChild(enemyGrid);
    document.querySelector('#game-container').appendChild(playerGridWrapper);
    playerGridWrapper.appendChild(playerGrid);
  };

  var populateGrid = function populateGrid(player) {
    var grid = null;
    var name = player.getName();
    var gameboard = player.getGameboard();

    if (name === 'enemy') {
      grid = document.querySelector('.enemy-grid');
    } else if (name === 'player') {
      grid = document.querySelector('.player-grid');
    } else {
      throw 'please specify owner as "enemy" or "player"';
    }

    var _loop = function _loop(i) {
      var cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.cellId = i;
      cell.dataset.player = name;
      grid.appendChild(cell);
      cell.addEventListener('click', function (e) {
        displayCoord(i, gameboard.getBoard());
        console.log(name);
      });
    };

    for (var i = 0; i < gameboard.getBoard().length; i++) {
      _loop(i);
    }

    grid.style['grid-template-columns'] = "repeat(".concat(Math.sqrt(gameboard.getBoard().length), ", 1fr)");
  };

  var displayCoord = function displayCoord(index, board) {
    var coordObj = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCoordFromIndex(index, board);
    var coordText = "[".concat(coordObj.x, ", ").concat(coordObj.y, "]");
    console.log(coordText);
  };

  return {
    initialize: initialize,
    populateGrid: populateGrid
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (display);

/***/ }),

/***/ "./src/factories.js":
/*!**************************!*\
  !*** ./src/factories.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "playerFactory": () => (/* binding */ playerFactory),
/* harmony export */   "shipFactory": () => (/* binding */ shipFactory),
/* harmony export */   "gameboardFactory": () => (/* binding */ gameboardFactory)
/* harmony export */ });
/* harmony import */ var _src_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/helpers/factoryhelper.js */ "./src/helpers/factoryhelper.js");

var playerFactory = function playerFactory(myName, boardSize) {
  var name = myName;
  var gameboard = gameboardFactory(boardSize);
  var attackedSpaces = [];

  var getGameboard = function getGameboard() {
    return gameboard;
  };

  var getName = function getName() {
    return name;
  };

  var attack = function attack(coord, enemyPlayer) {
    var alreadyAttacked = false;
    attackedSpaces.forEach(function (cell) {
      if (_src_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].arraysMatch(cell, coord)) {
        alreadyAttacked = true;
      }
    });

    if (!alreadyAttacked) {
      try {
        enemyPlayer.getGameboard().receiveAttack(coord);
        attackedSpaces.push(coord);
        return true;
      } catch (e) {
        throw e;
      }
    } else {
      throw 'already attacked';
    }
  };

  return {
    getGameboard: getGameboard,
    getName: getName,
    attack: attack
  };
}; // props = { length, initialHits }

var shipFactory = function shipFactory(props) {
  var length = props.length;
  var hits = props.initialHits || [];

  var hit = function hit(coord) {
    if (!hits.includes(coord)) {
      hits.push(coord);
      return true;
    } else {
      return false;
    }
  };

  var isSunk = function isSunk() {
    return hits.length === length;
  };

  return {
    hit: hit,
    isSunk: isSunk
  };
};
var gameboardFactory = function gameboardFactory(size) {
  var board = [];

  var initialize = function () {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        board.push({
          coord: [j, i],
          hit: 0,
          shipId: null
        });
      }
    }
  }();

  var ships = [];

  var allShipsSunk = function allShipsSunk() {
    var sunk = true;
    ships.forEach(function (ship) {
      if (!ship.isSunk()) sunk = false;
    });
    return sunk;
  }; // shipProps = { length, initialHits }
  // locationProps = { coord: [x, y], dir: ('e' || 's') }


  var placeShip = function placeShip(shipProps, locationProps) {
    var placedShipId = null;
    var placedCoords = undefined;

    try {
      placedCoords = _src_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCoordsIfOpen(shipProps.length, locationProps, board);
      placedShipId = ships.push(shipFactory(shipProps)) - 1;
      board = board.map(function (cell) {
        var newCell = cell;
        placedCoords.forEach(function (coord) {
          if (_src_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].arraysMatch(cell.coord, coord)) {
            newCell = {
              coord: coord,
              hit: 0,
              shipId: placedShipId
            };
          }
        });
        return newCell;
      });
      return true;
    } catch (e) {
      throw e;
    }
  };

  var receiveAttack = function receiveAttack(coord) {
    var index = _src_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getIndexFromCoord(coord, board);

    if (board[index].hit !== 0) {
      throw 'already hit';
    }

    var shipId = board[index].shipId;

    if (shipId === null) {
      board[index].hit = -1;
      return false;
    } else {
      board[index].hit = 1;
      ships[shipId].hit(coord);
      return true;
    }
  };

  var getBoard = function getBoard() {
    return board;
  };

  return {
    allShipsSunk: allShipsSunk,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    getBoard: getBoard
  };
};

/***/ }),

/***/ "./src/helpers/factoryhelper.js":
/*!**************************************!*\
  !*** ./src/helpers/factoryhelper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// locationProps = { coord: [5, 5], dir: (e || s) }
var factoryHelper = function () {
  var arraysMatch = function arraysMatch(coord1, coord2) {
    return JSON.stringify(coord1) === JSON.stringify(coord2) ? true : false;
  };

  var getCoordsIfOpen = function getCoordsIfOpen(length, locationProps, board) {
    var coords = [];

    var _loop = function _loop(i) {
      var searchX = locationProps.coord[0];
      var searchY = locationProps.coord[0];
      locationProps.dir === 'e' ? searchX += i : searchY += i;
      var matchingCell = board.find(function (cell) {
        return arraysMatch(cell.coord, [searchX, searchY]);
      });
      if (!matchingCell) throw 'out of bounds';else if (matchingCell.shipId !== null) throw 'cell occupied';else {
        // Success
        coords.push([searchX, searchY]);
      }
    };

    for (var i = 0; i < length; i++) {
      _loop(i);
    }

    return coords;
  };

  var getIndexFromCoord = function getIndexFromCoord(coord, board) {
    var index = coord[1] * Math.sqrt(board.length) + coord[0];

    if (index > board.length - 1 || index < 0) {
      throw 'getIndex...: out of bounds';
    } else {
      return index;
    }
  };

  var getCoordFromIndex = function getCoordFromIndex(index, board) {
    var size = Math.sqrt(board.length);
    var x = index % size;
    var y = Math.floor(index / size);
    return {
      x: x,
      y: y
    };
  };

  return {
    arraysMatch: arraysMatch,
    getCoordsIfOpen: getCoordsIfOpen,
    getIndexFromCoord: getIndexFromCoord,
    getCoordFromIndex: getCoordFromIndex
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (factoryHelper);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/meyerreset.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/meyerreset.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}", "",{"version":3,"sources":["webpack://./src/meyerreset.css"],"names":[],"mappings":"AAAA;;;CAGC;;AAED;;;;;;;;;;;;;CAaC,SAAS;CACT,UAAU;CACV,SAAS;CACT,eAAe;CACf,aAAa;CACb,wBAAwB;AACzB;AACA,gDAAgD;AAChD;;CAEC,cAAc;AACf;AACA;CACC,cAAc;AACf;AACA;CACC,gBAAgB;AACjB;AACA;CACC,YAAY;AACb;AACA;;CAEC,WAAW;CACX,aAAa;AACd;AACA;CACC,yBAAyB;CACzB,iBAAiB;AAClB","sourcesContent":["/* http://meyerweb.com/eric/tools/css/reset/ \n   v2.0 | 20110126\n   License: none (public domain)\n*/\n\nhtml, body, div, span, applet, object, iframe,\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\na, abbr, acronym, address, big, cite, code,\ndel, dfn, em, img, ins, kbd, q, s, samp,\nsmall, strike, strong, sub, sup, tt, var,\nb, u, i, center,\ndl, dt, dd, ol, ul, li,\nfieldset, form, label, legend,\ntable, caption, tbody, tfoot, thead, tr, th, td,\narticle, aside, canvas, details, embed, \nfigure, figcaption, footer, header, hgroup, \nmenu, nav, output, ruby, section, summary,\ntime, mark, audio, video {\n\tmargin: 0;\n\tpadding: 0;\n\tborder: 0;\n\tfont-size: 100%;\n\tfont: inherit;\n\tvertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle, aside, details, figcaption, figure, \nfooter, header, hgroup, menu, nav, section {\n\tdisplay: block;\n}\nbody {\n\tline-height: 1;\n}\nol, ul {\n\tlist-style: none;\n}\nblockquote, q {\n\tquotes: none;\n}\nblockquote:before, blockquote:after,\nq:before, q:after {\n\tcontent: '';\n\tcontent: none;\n}\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n}\n\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: var(--grid-border-size);\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  background-color: var(--grid-color, white);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,kCAAkC;EAClC,mBAAmB;EACnB,0BAA0B;EAC1B,uBAAuB;AACzB;;AAEA;EACE,kDAAkD;EAClD,oDAAoD;EACpD,gCAAgC;EAChC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,+DAA+D;EAC/D,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,4BAA4B;EAC5B,0EAA0E;EAC1E,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;AACtB;AACA;EACE,iDAAiD;AACnD;AACA;EACE,WAAW;EACX,oBAAoB;AACtB;AACA;EACE,iDAAiD;AACnD;AACA;EACE,0CAA0C;AAC5C","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n}\n\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: var(--grid-border-size);\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  background-color: var(--grid-color, white);\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/meyerreset.css":
/*!****************************!*\
  !*** ./src/meyerreset.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_meyerreset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./meyerreset.css */ "./node_modules/css-loader/dist/cjs.js!./src/meyerreset.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_meyerreset_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_meyerreset_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_meyerreset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_meyerreset_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

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
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _meyerreset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./meyerreset.css */ "./src/meyerreset.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./display.js */ "./src/display.js");
/* harmony import */ var _src_factories_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/factories.js */ "./src/factories.js");




_display_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialize();
var player1 = (0,_src_factories_js__WEBPACK_IMPORTED_MODULE_3__.playerFactory)('player', 10);
var enemy1 = (0,_src_factories_js__WEBPACK_IMPORTED_MODULE_3__.playerFactory)('enemy', 10);
_display_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateGrid(player1);
_display_js__WEBPACK_IMPORTED_MODULE_2__["default"].populateGrid(enemy1);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBR0FDLDhEQUFBO0FBRUEsSUFBTXdGLE9BQU8sR0FBR2hELGdFQUFhLENBQUMsUUFBRCxFQUFXLEVBQVgsQ0FBN0I7QUFDQSxJQUFNaUQsTUFBTSxHQUFHakQsZ0VBQWEsQ0FBQyxPQUFELEVBQVUsRUFBVixDQUE1QjtBQUVBeEMsZ0VBQUEsQ0FBcUJ3RixPQUFyQjtBQUNBeEYsZ0VBQUEsQ0FBcUJ5RixNQUFyQixFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9tZXllcnJlc2V0LmNzcz85MjRkIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmNvbnN0IGRpc3BsYXkgPSAoKCkgPT4ge1xuICBjb25zdCBpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXppbmcgZGlzcGxheScpO1xuXG4gICAgY29uc3QgZW5lbXlHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ2VuZW15LWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ2VuZW15LWdyaWQnKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdwbGF5ZXItZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcGxheWVyR3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ3BsYXllci1ncmlkJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZ2FtZS1jb250YWluZXInKS5hcHBlbmRDaGlsZChlbmVteUdyaWRXcmFwcGVyKTtcbiAgICBlbmVteUdyaWRXcmFwcGVyLmFwcGVuZENoaWxkKGVuZW15R3JpZCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocGxheWVyR3JpZFdyYXBwZXIpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmFwcGVuZENoaWxkKHBsYXllckdyaWQpO1xuICB9O1xuXG4gIGNvbnN0IHBvcHVsYXRlR3JpZCA9IChwbGF5ZXIpID0+IHtcbiAgICBsZXQgZ3JpZCA9IG51bGw7XG4gICAgY29uc3QgbmFtZSA9IHBsYXllci5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuICAgIGlmIChuYW1lID09PSAnZW5lbXknKSB7XG4gICAgICBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1ncmlkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdwbGVhc2Ugc3BlY2lmeSBvd25lciBhcyBcImVuZW15XCIgb3IgXCJwbGF5ZXJcIicpO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEJvYXJkKCkubGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcpO1xuICAgICAgY2VsbC5kYXRhc2V0LmNlbGxJZCA9IGk7XG4gICAgICBjZWxsLmRhdGFzZXQucGxheWVyID0gbmFtZTtcbiAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbCk7XG5cbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBkaXNwbGF5Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdyaWQuc3R5bGVbJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyddID0gYHJlcGVhdCgke01hdGguc3FydChnYW1lYm9hcmRcbiAgICAgICAgLmdldEJvYXJkKCkubGVuZ3RoKX0sIDFmcilgO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUNvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIGNvbnN0IGNvb3JkVGV4dCA9IGBbJHtjb29yZE9iai54fSwgJHtjb29yZE9iai55fV1gO1xuICAgIGNvbnNvbGUubG9nKGNvb3JkVGV4dCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gICAgcG9wdWxhdGVHcmlkLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5OyIsImltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMnO1xuXG5leHBvcnQgY29uc3QgcGxheWVyRmFjdG9yeSA9IChteU5hbWUsIGJvYXJkU2l6ZSkgPT4ge1xuICBjb25zdCBuYW1lID0gbXlOYW1lO1xuICBjb25zdCBnYW1lYm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KGJvYXJkU2l6ZSk7XG4gIGNvbnN0IGF0dGFja2VkU3BhY2VzID0gW107XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4geyByZXR1cm4gZ2FtZWJvYXJkOyB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7IHJldHVybiBuYW1lOyB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZCwgZW5lbXlQbGF5ZXIpID0+IHtcbiAgICBsZXQgYWxyZWFkeUF0dGFja2VkID0gZmFsc2U7XG4gICAgYXR0YWNrZWRTcGFjZXMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKGNlbGwsIGNvb3JkKSkge1xuICAgICAgICBhbHJlYWR5QXR0YWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKCFhbHJlYWR5QXR0YWNrZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVuZW15UGxheWVyLmdldEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICAgICAgICBhdHRhY2tlZFNwYWNlcy5wdXNoKGNvb3JkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ2FscmVhZHkgYXR0YWNrZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEdhbWVib2FyZCxcbiAgICBnZXROYW1lLFxuICAgIGF0dGFjayxcbiAgfVxufVxuXG4vLyBwcm9wcyA9IHsgbGVuZ3RoLCBpbml0aWFsSGl0cyB9XG5leHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICBjb25zdCBoaXRzID0gcHJvcHMuaW5pdGlhbEhpdHMgfHwgW107XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKCFoaXRzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBoaXRzLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnYW1lYm9hcmRGYWN0b3J5ID0gKHNpemUpID0+IHtcbiAgbGV0IGJvYXJkID0gW107XG4gIGNvbnN0IGluaXRpYWxpemUgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgICBjb29yZDogW2osIGldLFxuICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICBzaGlwSWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHN1bmsgPSB0cnVlO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHN1bmsgPSBmYWxzZTtcbiAgICB9KVxuICAgIHJldHVybiBzdW5rO1xuICB9XG5cbiAgLy8gc2hpcFByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzIH1cbiAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFt4LCB5XSwgZGlyOiAoJ2UnIHx8ICdzJykgfVxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcFByb3BzLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHBsYWNlZFNoaXBJZCA9IG51bGw7XG4gICAgbGV0IHBsYWNlZENvb3JkcyA9IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgcGxhY2VkQ29vcmRzID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZHNJZk9wZW4oXG4gICAgICAgIHNoaXBQcm9wcy5sZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKTtcbiAgICAgIHBsYWNlZFNoaXBJZCA9IHNoaXBzLnB1c2goc2hpcEZhY3Rvcnkoc2hpcFByb3BzKSkgLSAxO1xuICAgICAgYm9hcmQgPSBib2FyZC5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGxldCBuZXdDZWxsID0gY2VsbDtcbiAgICAgICAgcGxhY2VkQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKGNlbGwuY29vcmQsIGNvb3JkKSkge1xuICAgICAgICAgICAgbmV3Q2VsbCA9IHtcbiAgICAgICAgICAgICAgY29vcmQ6IGNvb3JkLFxuICAgICAgICAgICAgICBoaXQ6IDAsXG4gICAgICAgICAgICAgIHNoaXBJZDogcGxhY2VkU2hpcElkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdDZWxsO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyAoZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBib2FyZCk7XG4gICAgaWYgKGJvYXJkW2luZGV4XS5oaXQgIT09IDApIHtcbiAgICAgIHRocm93KCdhbHJlYWR5IGhpdCcpO1xuICAgIH1cbiAgICBjb25zdCBzaGlwSWQgPSBib2FyZFtpbmRleF0uc2hpcElkO1xuICAgIGlmIChzaGlwSWQgPT09IG51bGwpIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAtMTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IDE7XG4gICAgICBzaGlwc1tzaGlwSWRdLmhpdChjb29yZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IHsgcmV0dXJuIGJvYXJkIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhbGxTaGlwc1N1bmssXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0Qm9hcmQsXG4gIH1cbn0iLCIgIC8vIGxvY2F0aW9uUHJvcHMgPSB7IGNvb3JkOiBbNSwgNV0sIGRpcjogKGUgfHwgcykgfVxuICBjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgICBjb25zdCBhcnJheXNNYXRjaCA9IChjb29yZDEsIGNvb3JkMikgPT4ge1xuICAgICAgcmV0dXJuIChKU09OLnN0cmluZ2lmeShjb29yZDEpID09PSBKU09OLnN0cmluZ2lmeShjb29yZDIpKVxuICAgICAgICA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZ2V0Q29vcmRzSWZPcGVuID0gKGxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc2VhcmNoWCA9IGxvY2F0aW9uUHJvcHMuY29vcmRbMF07XG4gICAgICAgIGxldCBzZWFyY2hZID0gbG9jYXRpb25Qcm9wcy5jb29yZFswXTtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICAgID8gc2VhcmNoWCArPSBpXG4gICAgICAgICAgOiBzZWFyY2hZICs9IGk7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgICBhcnJheXNNYXRjaChjZWxsLmNvb3JkLCBbc2VhcmNoWCwgc2VhcmNoWV0pXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1hdGNoaW5nQ2VsbCkgdGhyb3coJ291dCBvZiBib3VuZHMnKTtcbiAgICAgICAgZWxzZSBpZiAobWF0Y2hpbmdDZWxsLnNoaXBJZCAhPT0gbnVsbCkgdGhyb3coJ2NlbGwgb2NjdXBpZWQnKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBTdWNjZXNzXG4gICAgICAgICAgY29vcmRzLnB1c2goW3NlYXJjaFgsIHNlYXJjaFldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG5cbiAgICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29vcmRbMV0gKiBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSArIGNvb3JkWzBdO1xuICAgICAgXG4gICAgICBpZiAoaW5kZXggPiBib2FyZC5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICB0aHJvdygnZ2V0SW5kZXguLi46IG91dCBvZiBib3VuZHMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHggPSBpbmRleCAlIHNpemU7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgICAgXG4gICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYXJyYXlzTWF0Y2gsXG4gICAgICBnZXRDb29yZHNJZk9wZW4sXG4gICAgICBnZXRJbmRleEZyb21Db29yZCxcbiAgICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIH1cbiAgfSkoKTtcblxuICBleHBvcnQgZGVmYXVsdCBmYWN0b3J5SGVscGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbWV5ZXJyZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tcGFnZS1tYXJnaW46IDFyZW07XFxuICAtLWdhbWUtYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbiAgLS1ncmlkLWNvbG9yOiB3aGl0ZTtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxufVxcblxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMjByZW0gKyAxMHZ3KTtcXG4gIG1heC13aWR0aDogY2FsYygoMTAwdmggLSAodmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMikpIC8gMi41KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQge1xcbiAgLyogbWFyZ2luOiAycmVtOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSk7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA4MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxLjV2aDtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5ncmlkLWNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1jb2xvciwgd2hpdGUpO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGtDQUFrQztFQUNsQyxtQkFBbUI7RUFDbkIsMEJBQTBCO0VBQzFCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtEQUFrRDtFQUNsRCxvREFBb0Q7RUFDcEQsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLCtEQUErRDtFQUMvRCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsNEJBQTRCO0VBQzVCLDBFQUEwRTtFQUMxRSxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxpREFBaUQ7QUFDbkQ7QUFDQTtFQUNFLFdBQVc7RUFDWCxvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLGlEQUFpRDtBQUNuRDtBQUNBO0VBQ0UsMENBQTBDO0FBQzVDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0tcGFnZS1tYXJnaW46IDFyZW07XFxuICAtLWdhbWUtYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbiAgLS1ncmlkLWNvbG9yOiB3aGl0ZTtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxufVxcblxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMjByZW0gKyAxMHZ3KTtcXG4gIG1heC13aWR0aDogY2FsYygoMTAwdmggLSAodmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMikpIC8gMi41KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQge1xcbiAgLyogbWFyZ2luOiAycmVtOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSk7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA4MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxLjV2aDtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5ncmlkLWNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1jb2xvciwgd2hpdGUpO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyICYmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl0pOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJyZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9tZXllcnJlc2V0LmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuXG5cbmRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuXG5jb25zdCBwbGF5ZXIxID0gcGxheWVyRmFjdG9yeSgncGxheWVyJywgMTApO1xuY29uc3QgZW5lbXkxID0gcGxheWVyRmFjdG9yeSgnZW5lbXknLCAxMCk7XG5cbmRpc3BsYXkucG9wdWxhdGVHcmlkKHBsYXllcjEpO1xuZGlzcGxheS5wb3B1bGF0ZUdyaWQoZW5lbXkxKTsiXSwibmFtZXMiOlsiZmFjdG9yeUhlbHBlciIsImRpc3BsYXkiLCJpbml0aWFsaXplIiwiY29uc29sZSIsImxvZyIsImVuZW15R3JpZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJlbmVteUdyaWQiLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWQiLCJxdWVyeVNlbGVjdG9yIiwiYXBwZW5kQ2hpbGQiLCJwb3B1bGF0ZUdyaWQiLCJwbGF5ZXIiLCJncmlkIiwibmFtZSIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJjZWxsSWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImRpc3BsYXlDb29yZCIsImdldEJvYXJkIiwibGVuZ3RoIiwic3R5bGUiLCJNYXRoIiwic3FydCIsImluZGV4IiwiYm9hcmQiLCJjb29yZE9iaiIsImdldENvb3JkRnJvbUluZGV4IiwiY29vcmRUZXh0IiwieCIsInkiLCJwbGF5ZXJGYWN0b3J5IiwibXlOYW1lIiwiYm9hcmRTaXplIiwiZ2FtZWJvYXJkRmFjdG9yeSIsImF0dGFja2VkU3BhY2VzIiwiYXR0YWNrIiwiY29vcmQiLCJlbmVteVBsYXllciIsImFscmVhZHlBdHRhY2tlZCIsImZvckVhY2giLCJhcnJheXNNYXRjaCIsInJlY2VpdmVBdHRhY2siLCJwdXNoIiwic2hpcEZhY3RvcnkiLCJwcm9wcyIsImhpdHMiLCJpbml0aWFsSGl0cyIsImhpdCIsImluY2x1ZGVzIiwiaXNTdW5rIiwic2l6ZSIsImoiLCJzaGlwSWQiLCJzaGlwcyIsImFsbFNoaXBzU3VuayIsInN1bmsiLCJzaGlwIiwicGxhY2VTaGlwIiwic2hpcFByb3BzIiwibG9jYXRpb25Qcm9wcyIsInBsYWNlZFNoaXBJZCIsInBsYWNlZENvb3JkcyIsInVuZGVmaW5lZCIsImdldENvb3Jkc0lmT3BlbiIsIm1hcCIsIm5ld0NlbGwiLCJnZXRJbmRleEZyb21Db29yZCIsImNvb3JkMSIsImNvb3JkMiIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb29yZHMiLCJzZWFyY2hYIiwic2VhcmNoWSIsImRpciIsIm1hdGNoaW5nQ2VsbCIsImZpbmQiLCJmbG9vciIsInBsYXllcjEiLCJlbmVteTEiXSwic291cmNlUm9vdCI6IiJ9