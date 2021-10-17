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
/* harmony import */ var _src_factories_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/factories.js */ "./src/factories.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./src/game.js");




var display = function () {
  var initialize = function initialize() {
    console.log('initializing display');
    var enemyGridWrapper = document.createElement('div');
    enemyGridWrapper.classList.add('grid-wrapper', 'enemy-grid-wrapper');
    var enemyGridLabel = document.createElement('h3');
    enemyGridLabel.innerText = 'Enemy';
    var enemyGrid = document.createElement('div');
    enemyGrid.classList.add('grid', 'enemy-grid');
    var playerGridWrapper = document.createElement('div');
    playerGridWrapper.classList.add('grid-wrapper', 'player-grid-wrapper');
    var playerGridLabel = document.createElement('h2');
    playerGridLabel.innerText = 'Player';
    var playerGrid = document.createElement('div');
    playerGrid.classList.add('grid', 'player-grid');
    var gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    gameContainer.appendChild(enemyGridLabel);
    gameContainer.appendChild(enemyGridWrapper);
    enemyGridWrapper.appendChild(enemyGrid);
    gameContainer.appendChild(playerGridLabel);
    gameContainer.appendChild(playerGridWrapper);
    playerGridWrapper.appendChild(playerGrid);
    var pageContainer = document.querySelector('#page-container');

    if (pageContainer.hasChildNodes) {
      pageContainer.childNodes.forEach(function (child) {
        child.remove();
      });
    }

    document.querySelector('#page-container').appendChild(gameContainer);
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
      grid.appendChild(cell); // Test: displays all ship coordinates
      // const coordTest = getCoord(i, gameboard.getBoard());
      // const isHitTest = gameboard.receiveAttack([coordTest.x, coordTest.y]);
      // console.log(coordTest);
      // console.log(isHitTest);
      // if (isHitTest) {
      //   cell.style['background-color'] = 'red';
      // }

      cell.addEventListener('click', function (e) {
        if (_game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().target === name) {
          var coord = getCoord(i, gameboard.getBoard());
          var isHit = gameboard.receiveAttack([coord.x, coord.y]);
          console.log(name + ' ' + displayCoord(i, gameboard.getBoard()) + ' ' + (isHit ? 'hit!' : 'missed'));
          if (isHit) cell.style['background-color'] = 'red';
          _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].advanceState();
        }
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
    return coordText;
  };

  var getCoord = function getCoord(index, board) {
    var coordObj = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCoordFromIndex(index, board);
    return {
      x: coordObj.x,
      y: coordObj.y
    };
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

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _display_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display.js */ "./src/display.js");
/* harmony import */ var _src_factories_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/factories.js */ "./src/factories.js");



var game = function () {
  var states = [{
    id: 0,
    target: null,
    name: 'Place your ships.'
  }, {
    id: 1,
    target: 'enemy',
    name: "Player's turn."
  }, {
    id: 2,
    target: 'player',
    name: "Enemy's turn."
  }, {
    id: 3,
    target: null,
    name: "Game finished."
  }];
  var state = states[0];
  var player1 = null;
  var enemy1 = null;

  var start = function start() {
    player1 = (0,_src_factories_js__WEBPACK_IMPORTED_MODULE_1__.playerFactory)('player', 10);
    enemy1 = (0,_src_factories_js__WEBPACK_IMPORTED_MODULE_1__.playerFactory)('enemy', 10);
    player1.getGameboard().placeShip({
      length: 3
    }, {
      coord: [1, 1],
      dir: 's'
    });
    player1.getGameboard().placeShip({
      length: 2
    }, {
      coord: [3, 1],
      dir: 's'
    });
    player1.getGameboard().placeShip({
      length: 5
    }, {
      coord: [5, 1],
      dir: 's'
    });
    enemy1.getGameboard().placeShip({
      length: 2
    }, {
      coord: [1, 2],
      dir: 'e'
    });
    enemy1.getGameboard().placeShip({
      length: 5
    }, {
      coord: [1, 4],
      dir: 'e'
    });
    enemy1.getGameboard().placeShip({
      length: 3
    }, {
      coord: [1, 6],
      dir: 'e'
    });
    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].populateGrid(player1);
    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].populateGrid(enemy1); // Place boards here after populating grid

    state = states[1];
    console.log(state.name);
  };

  var advanceState = function advanceState() {
    if (player1.getGameboard().allShipsSunk()) {
      alert('Enemy wins!');
      state = states[3];
    } else if (enemy1.getGameboard().allShipsSunk()) {
      alert('Player wins!');
      state = states[3];
    } else {
      if (state.id === 1) state = states[2];else state = states[1];
    }

    console.log(state.name);
  };

  var getState = function getState() {
    return state;
  };

  return {
    start: start,
    advanceState: advanceState,
    getState: getState
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);

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
      var searchY = locationProps.coord[1];
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: var(--grid-border-size);\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  background-color: var(--grid-color, white);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,kCAAkC;EAClC,mBAAmB;EACnB,0BAA0B;EAC1B,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,yCAAyC;AAC3C;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,kDAAkD;EAClD,oDAAoD;EACpD,gCAAgC;EAChC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,+DAA+D;EAC/D,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,4BAA4B;EAC5B,0EAA0E;EAC1E,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,WAAW;EACX,oBAAoB;EACpB,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,0CAA0C;AAC5C","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: var(--grid-border-size);\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  background-color: var(--grid-color, white);\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game.js */ "./src/game.js");




_display_js__WEBPACK_IMPORTED_MODULE_2__["default"].initialize();
_game_js__WEBPACK_IMPORTED_MODULE_3__["default"].start();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBSyw4REFBQTtBQUNBRCxzREFBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvbWV5ZXJyZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzPzkyNGQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5cbmNvbnN0IGRpc3BsYXkgPSAoKCkgPT4ge1xuICBjb25zdCBpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdpbml0aWFsaXppbmcgZGlzcGxheScpO1xuXG4gICAgY29uc3QgZW5lbXlHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ2VuZW15LWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IGVuZW15R3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBlbmVteUdyaWRMYWJlbC5pbm5lclRleHQgPSAnRW5lbXknO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ2VuZW15LWdyaWQnKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdwbGF5ZXItZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwbGF5ZXJHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ1BsYXllcic7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcGxheWVyR3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ3BsYXllci1ncmlkJyk7XG5cbiAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUNvbnRhaW5lci5pZCA9ICdnYW1lLWNvbnRhaW5lcic7XG5cbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZExhYmVsKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZFdyYXBwZXIpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckdyaWRMYWJlbCk7XG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkV3JhcHBlcik7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZCk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKHBhZ2VDb250YWluZXIuaGFzQ2hpbGROb2Rlcykge1xuICAgICAgcGFnZUNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXInKS5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcbiAgfTtcblxuICBjb25zdCBwb3B1bGF0ZUdyaWQgPSAocGxheWVyKSA9PiB7XG4gICAgbGV0IGdyaWQgPSBudWxsO1xuICAgIGNvbnN0IG5hbWUgPSBwbGF5ZXIuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IHBsYXllci5nZXRHYW1lYm9hcmQoKTtcbiAgICBpZiAobmFtZSA9PT0gJ2VuZW15Jykge1xuICAgICAgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmVteS1ncmlkJyk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAncGxheWVyJykge1xuICAgICAgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ3JpZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygncGxlYXNlIHNwZWNpZnkgb3duZXIgYXMgXCJlbmVteVwiIG9yIFwicGxheWVyXCInKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRCb2FyZCgpLmxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsSWQgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBsYXllciA9IG5hbWU7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuXG4gICAgICAvLyBUZXN0OiBkaXNwbGF5cyBhbGwgc2hpcCBjb29yZGluYXRlc1xuICAgIFxuICAgICAgLy8gY29uc3QgY29vcmRUZXN0ID0gZ2V0Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgLy8gY29uc3QgaXNIaXRUZXN0ID0gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW2Nvb3JkVGVzdC54LCBjb29yZFRlc3QueV0pO1xuICAgICAgLy8gY29uc29sZS5sb2coY29vcmRUZXN0KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGlzSGl0VGVzdCk7XG4gICAgICAvLyBpZiAoaXNIaXRUZXN0KSB7XG4gICAgICAvLyAgIGNlbGwuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9ICdyZWQnO1xuICAgICAgLy8gfVxuICAgICAgXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQgPT09IG5hbWUpIHtcbiAgICAgICAgICBjb25zdCBjb29yZCA9IGdldENvb3JkKGksIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICAgICAgICBjb25zdCBpc0hpdCA9IGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtjb29yZC54LCBjb29yZC55XSk7XG4gICAgICAgICAgY29uc29sZS5sb2cobmFtZSArICcgJyArIGRpc3BsYXlDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICAgICAgICAgICsgJyAnICsgKGlzSGl0ID8gJ2hpdCEnIDogJ21pc3NlZCcpKTtcbiAgICAgICAgICBpZiAoaXNIaXQpIGNlbGwuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9ICdyZWQnO1xuICAgICAgICAgIGdhbWUuYWR2YW5jZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGdyaWQuc3R5bGVbJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyddID0gYHJlcGVhdCgke01hdGguc3FydChnYW1lYm9hcmRcbiAgICAgICAgLmdldEJvYXJkKCkubGVuZ3RoKX0sIDFmcilgO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUNvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIGNvbnN0IGNvb3JkVGV4dCA9IGBbJHtjb29yZE9iai54fSwgJHtjb29yZE9iai55fV1gO1xuICAgIHJldHVybiBjb29yZFRleHQ7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZE9iaiA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRGcm9tSW5kZXgoaW5kZXgsIGJvYXJkKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogY29vcmRPYmoueCxcbiAgICAgIHk6IGNvb3JkT2JqLnksXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplLFxuICAgIHBvcHVsYXRlR3JpZCxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheTsiLCJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcblxuZXhwb3J0IGNvbnN0IHBsYXllckZhY3RvcnkgPSAobXlOYW1lLCBib2FyZFNpemUpID0+IHtcbiAgY29uc3QgbmFtZSA9IG15TmFtZTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeShib2FyZFNpemUpO1xuICBjb25zdCBhdHRhY2tlZFNwYWNlcyA9IFtdO1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IHsgcmV0dXJuIGdhbWVib2FyZDsgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4geyByZXR1cm4gbmFtZTsgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoY29vcmQsIGVuZW15UGxheWVyKSA9PiB7XG4gICAgbGV0IGFscmVhZHlBdHRhY2tlZCA9IGZhbHNlO1xuICAgIGF0dGFja2VkU3BhY2VzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChjZWxsLCBjb29yZCkpIHtcbiAgICAgICAgYWxyZWFkeUF0dGFja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICghYWxyZWFkeUF0dGFja2VkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBlbmVteVBsYXllci5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICAgICAgYXR0YWNrZWRTcGFjZXMucHVzaChjb29yZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyAoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdhbHJlYWR5IGF0dGFja2VkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRHYW1lYm9hcmQsXG4gICAgZ2V0TmFtZSxcbiAgICBhdHRhY2ssXG4gIH1cbn1cblxuLy8gcHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgY29uc3QgaGl0cyA9IHByb3BzLmluaXRpYWxIaXRzIHx8IFtdO1xuXG4gIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xuICAgIGlmICghaGl0cy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gaGl0cy5sZW5ndGggPT09IGxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkRmFjdG9yeSA9IChzaXplKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuICBjb25zdCBpbml0aWFsaXplID0gKCgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgYm9hcmQucHVzaCh7XG4gICAgICAgICAgY29vcmQ6IFtqLCBpXSxcbiAgICAgICAgICBoaXQ6IDAsXG4gICAgICAgICAgc2hpcElkOiBudWxsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IHNoaXBzID0gW107XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzdW5rID0gdHJ1ZTtcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSBzdW5rID0gZmFsc2U7XG4gICAgfSlcbiAgICByZXR1cm4gc3VuaztcbiAgfVxuXG4gIC8vIHNoaXBQcm9wcyA9IHsgbGVuZ3RoLCBpbml0aWFsSGl0cyB9XG4gIC8vIGxvY2F0aW9uUHJvcHMgPSB7IGNvb3JkOiBbeCwgeV0sIGRpcjogKCdlJyB8fCAncycpIH1cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBQcm9wcywgbG9jYXRpb25Qcm9wcykgPT4ge1xuICAgIGxldCBwbGFjZWRTaGlwSWQgPSBudWxsO1xuICAgIGxldCBwbGFjZWRDb29yZHMgPSB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIHBsYWNlZENvb3JkcyA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzSWZPcGVuKFxuICAgICAgICBzaGlwUHJvcHMubGVuZ3RoLCBsb2NhdGlvblByb3BzLCBib2FyZCk7XG4gICAgICBwbGFjZWRTaGlwSWQgPSBzaGlwcy5wdXNoKHNoaXBGYWN0b3J5KHNoaXBQcm9wcykpIC0gMTtcbiAgICAgIGJvYXJkID0gYm9hcmQubWFwKGNlbGwgPT4ge1xuICAgICAgICBsZXQgbmV3Q2VsbCA9IGNlbGw7XG4gICAgICAgIHBsYWNlZENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChjZWxsLmNvb3JkLCBjb29yZCkpIHtcbiAgICAgICAgICAgIG5ld0NlbGwgPSB7XG4gICAgICAgICAgICAgIGNvb3JkOiBjb29yZCxcbiAgICAgICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgICAgICBzaGlwSWQ6IHBsYWNlZFNoaXBJZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3Q2VsbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgKGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpO1xuICAgIGlmIChib2FyZFtpbmRleF0uaGl0ICE9PSAwKSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBoaXQnKTtcbiAgICB9XG4gICAgY29uc3Qgc2hpcElkID0gYm9hcmRbaW5kZXhdLnNoaXBJZDtcbiAgICBpZiAoc2hpcElkID09PSBudWxsKSB7XG4gICAgICBib2FyZFtpbmRleF0uaGl0ID0gLTE7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAxO1xuICAgICAgc2hpcHNbc2hpcElkXS5oaXQoY29vcmQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiB7IHJldHVybiBib2FyZCB9O1xuXG4gIHJldHVybiB7XG4gICAgYWxsU2hpcHNTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldEJvYXJkLFxuICB9XG59IiwiaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5cbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBzdGF0ZXMgPSBbXG4gICAge1xuICAgICAgaWQ6IDAsXG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBuYW1lOiAnUGxhY2UgeW91ciBzaGlwcy4nXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIHRhcmdldDogJ2VuZW15JyxcbiAgICAgIG5hbWU6IFwiUGxheWVyJ3MgdHVybi5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICB0YXJnZXQ6ICdwbGF5ZXInLFxuICAgICAgbmFtZTogXCJFbmVteSdzIHR1cm4uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAzLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogXCJHYW1lIGZpbmlzaGVkLlwiXG4gICAgfVxuICBdO1xuICBsZXQgc3RhdGUgPSBzdGF0ZXNbMF07XG4gIGxldCBwbGF5ZXIxID0gbnVsbDtcbiAgbGV0IGVuZW15MSA9IG51bGw7XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgcGxheWVyMSA9IHBsYXllckZhY3RvcnkoJ3BsYXllcicsIDEwKTtcbiAgICBlbmVteTEgPSBwbGF5ZXJGYWN0b3J5KCdlbmVteScsIDEwKTtcbiAgICBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChcbiAgICAgIHtcbiAgICAgICAgbGVuZ3RoOiAzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb29yZDogWzEsIDFdLFxuICAgICAgICBkaXI6ICdzJ1xuICAgICAgfVxuICAgICk7XG4gICAgcGxheWVyMS5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICB7XG4gICAgICAgIGxlbmd0aDogMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFszLCAxXSxcbiAgICAgICAgZGlyOiAncydcbiAgICAgIH1cbiAgICApO1xuICAgIHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkucGxhY2VTaGlwKFxuICAgICAge1xuICAgICAgICBsZW5ndGg6IDVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGNvb3JkOiBbNSwgMV0sXG4gICAgICAgIGRpcjogJ3MnXG4gICAgICB9XG4gICAgKTtcblxuICAgIGVuZW15MS5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICB7XG4gICAgICAgIGxlbmd0aDogMlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFsxLCAyXSxcbiAgICAgICAgZGlyOiAnZSdcbiAgICAgIH1cbiAgICApO1xuICAgIGVuZW15MS5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICB7XG4gICAgICAgIGxlbmd0aDogNVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFsxLCA0XSxcbiAgICAgICAgZGlyOiAnZSdcbiAgICAgIH1cbiAgICApO1xuICAgIGVuZW15MS5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICB7XG4gICAgICAgIGxlbmd0aDogM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFsxLCA2XSxcbiAgICAgICAgZGlyOiAnZSdcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZGlzcGxheS5wb3B1bGF0ZUdyaWQocGxheWVyMSk7XG4gICAgZGlzcGxheS5wb3B1bGF0ZUdyaWQoZW5lbXkxKTtcblxuICAgIC8vIFBsYWNlIGJvYXJkcyBoZXJlIGFmdGVyIHBvcHVsYXRpbmcgZ3JpZFxuXG4gICAgc3RhdGUgPSBzdGF0ZXNbMV07XG4gICAgY29uc29sZS5sb2coc3RhdGUubmFtZSk7XG4gIH07XG5cbiAgY29uc3QgYWR2YW5jZVN0YXRlID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBhbGVydCgnRW5lbXkgd2lucyEnKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuXG4gICAgfSBlbHNlIGlmIChlbmVteTEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGFsZXJ0KCdQbGF5ZXIgd2lucyEnKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RhdGUuaWQgPT09IDEpIHN0YXRlID0gc3RhdGVzWzJdO1xuICAgICAgZWxzZSBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coc3RhdGUubmFtZSk7XG4gIH1cblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGFkdmFuY2VTdGF0ZSxcbiAgICBnZXRTdGF0ZSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCIgIC8vIGxvY2F0aW9uUHJvcHMgPSB7IGNvb3JkOiBbNSwgNV0sIGRpcjogKGUgfHwgcykgfVxuICBjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgICBjb25zdCBhcnJheXNNYXRjaCA9IChjb29yZDEsIGNvb3JkMikgPT4ge1xuICAgICAgcmV0dXJuIChKU09OLnN0cmluZ2lmeShjb29yZDEpID09PSBKU09OLnN0cmluZ2lmeShjb29yZDIpKVxuICAgICAgICA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgY29uc3QgZ2V0Q29vcmRzSWZPcGVuID0gKGxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgc2VhcmNoWCA9IGxvY2F0aW9uUHJvcHMuY29vcmRbMF07XG4gICAgICAgIGxldCBzZWFyY2hZID0gbG9jYXRpb25Qcm9wcy5jb29yZFsxXTtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICAgID8gc2VhcmNoWCArPSBpXG4gICAgICAgICAgOiBzZWFyY2hZICs9IGk7XG4gICAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgICBhcnJheXNNYXRjaChjZWxsLmNvb3JkLCBbc2VhcmNoWCwgc2VhcmNoWV0pXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1hdGNoaW5nQ2VsbCkgdGhyb3coJ291dCBvZiBib3VuZHMnKTtcbiAgICAgICAgZWxzZSBpZiAobWF0Y2hpbmdDZWxsLnNoaXBJZCAhPT0gbnVsbCkgdGhyb3coJ2NlbGwgb2NjdXBpZWQnKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyBTdWNjZXNzXG4gICAgICAgICAgY29vcmRzLnB1c2goW3NlYXJjaFgsIHNlYXJjaFldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvb3JkcztcbiAgICB9XG5cbiAgICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29vcmRbMV0gKiBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSArIGNvb3JkWzBdO1xuICAgICAgXG4gICAgICBpZiAoaW5kZXggPiBib2FyZC5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgICB0aHJvdygnZ2V0SW5kZXguLi46IG91dCBvZiBib3VuZHMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICAgIGNvbnN0IHNpemUgPSBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKTtcbiAgICAgIGNvbnN0IHggPSBpbmRleCAlIHNpemU7XG4gICAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgICAgXG4gICAgICByZXR1cm4geyB4OiB4LCB5OiB5IH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYXJyYXlzTWF0Y2gsXG4gICAgICBnZXRDb29yZHNJZk9wZW4sXG4gICAgICBnZXRJbmRleEZyb21Db29yZCxcbiAgICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIH1cbiAgfSkoKTtcblxuICBleHBvcnQgZGVmYXVsdCBmYWN0b3J5SGVscGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbWV5ZXJyZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tcGFnZS1tYXJnaW46IDFyZW07XFxuICAtLWdhbWUtYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbiAgLS1ncmlkLWNvbG9yOiB3aGl0ZTtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiBjYWxjKDIuOHZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjN2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjR2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMjByZW0gKyAxMHZ3KTtcXG4gIG1heC13aWR0aDogY2FsYygoMTAwdmggLSAodmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMikpIC8gMi41KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQge1xcbiAgLyogbWFyZ2luOiAycmVtOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSk7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA4MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxLjV2aDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5lbmVteS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5wbGF5ZXItZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbn1cXG4uZ3JpZC1jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtY29sb3IsIHdoaXRlKTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQixrQ0FBa0M7RUFDbEMsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsK0JBQStCO0VBQy9CLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGtEQUFrRDtFQUNsRCxvREFBb0Q7RUFDcEQsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLCtEQUErRDtFQUMvRCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsNEJBQTRCO0VBQzVCLDBFQUEwRTtFQUMxRSxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQiw0QkFBNEI7QUFDOUI7QUFDQTtFQUNFLGlEQUFpRDtBQUNuRDtBQUNBO0VBQ0UsV0FBVztFQUNYLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxpREFBaUQ7QUFDbkQ7QUFDQTtFQUNFLDBDQUEwQztBQUM1Q1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1nYW1lLWJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG4gIC0tZ3JpZC1jb2xvcjogd2hpdGU7XFxuICAtLWdyaWQtYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gIC0tZ3JpZC1ib3JkZXItc2l6ZTogMXB4O1xcbiAgLyogLS1ncmlkLW9mZnNldDogMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IGNhbGMoMi4zdmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICBmb250LXNpemU6IGNhbGMoMS44dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oNCB7XFxuICBmb250LXNpemU6IGNhbGMoMS40dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuI2dhbWUtY29udGFpbmVyIHtcXG4gIHdpZHRoOiBjYWxjKDIwcmVtICsgMTB2dyk7XFxuICBtYXgtd2lkdGg6IGNhbGMoKDEwMHZoIC0gKHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpKSAvIDIuNSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5ncmlkIHtcXG4gIC8qIG1hcmdpbjogMnJlbTsgKi9cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBnYXA6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUpO1xcbiAgYm9yZGVyOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplLCAxcHgpIHNvbGlkIHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiA4MCU7XFxuICBwYWRkaW5nLWJvdHRvbTogODAlO1xcbiAgbWFyZ2luLWJvdHRvbTogMS41dmg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICByaWdodDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4uZW5lbXktZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbn1cXG4ucGxheWVyLWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHBhZGRpbmctYm90dG9tOiAxMDAlO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4ucGxheWVyLWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLmdyaWQtY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWNvbG9yLCB3aGl0ZSk7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21leWVycmVzZXQuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cbmRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuZ2FtZS5zdGFydCgpOyJdLCJuYW1lcyI6WyJmYWN0b3J5SGVscGVyIiwiZ2FtZWJvYXJkRmFjdG9yeSIsInBsYXllckZhY3RvcnkiLCJzaGlwRmFjdG9yeSIsImdhbWUiLCJkaXNwbGF5IiwiaW5pdGlhbGl6ZSIsImNvbnNvbGUiLCJsb2ciLCJlbmVteUdyaWRXcmFwcGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZW5lbXlHcmlkTGFiZWwiLCJpbm5lclRleHQiLCJlbmVteUdyaWQiLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWRMYWJlbCIsInBsYXllckdyaWQiLCJnYW1lQ29udGFpbmVyIiwiaWQiLCJhcHBlbmRDaGlsZCIsInBhZ2VDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiaGFzQ2hpbGROb2RlcyIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwiY2hpbGQiLCJyZW1vdmUiLCJwb3B1bGF0ZUdyaWQiLCJwbGF5ZXIiLCJncmlkIiwibmFtZSIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJjZWxsSWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImdldFN0YXRlIiwidGFyZ2V0IiwiY29vcmQiLCJnZXRDb29yZCIsImdldEJvYXJkIiwiaXNIaXQiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJkaXNwbGF5Q29vcmQiLCJzdHlsZSIsImFkdmFuY2VTdGF0ZSIsImxlbmd0aCIsIk1hdGgiLCJzcXJ0IiwiaW5kZXgiLCJib2FyZCIsImNvb3JkT2JqIiwiZ2V0Q29vcmRGcm9tSW5kZXgiLCJjb29yZFRleHQiLCJteU5hbWUiLCJib2FyZFNpemUiLCJhdHRhY2tlZFNwYWNlcyIsImF0dGFjayIsImVuZW15UGxheWVyIiwiYWxyZWFkeUF0dGFja2VkIiwiYXJyYXlzTWF0Y2giLCJwdXNoIiwicHJvcHMiLCJoaXRzIiwiaW5pdGlhbEhpdHMiLCJoaXQiLCJpbmNsdWRlcyIsImlzU3VuayIsInNpemUiLCJqIiwic2hpcElkIiwic2hpcHMiLCJhbGxTaGlwc1N1bmsiLCJzdW5rIiwic2hpcCIsInBsYWNlU2hpcCIsInNoaXBQcm9wcyIsImxvY2F0aW9uUHJvcHMiLCJwbGFjZWRTaGlwSWQiLCJwbGFjZWRDb29yZHMiLCJ1bmRlZmluZWQiLCJnZXRDb29yZHNJZk9wZW4iLCJtYXAiLCJuZXdDZWxsIiwiZ2V0SW5kZXhGcm9tQ29vcmQiLCJzdGF0ZXMiLCJzdGF0ZSIsInBsYXllcjEiLCJlbmVteTEiLCJzdGFydCIsImRpciIsImFsZXJ0IiwiY29vcmQxIiwiY29vcmQyIiwiSlNPTiIsInN0cmluZ2lmeSIsImNvb3JkcyIsInNlYXJjaFgiLCJzZWFyY2hZIiwibWF0Y2hpbmdDZWxsIiwiZmluZCIsImZsb29yIl0sInNvdXJjZVJvb3QiOiIifQ==