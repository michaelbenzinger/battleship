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
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var display = function () {
  var grid = null;
  var sharedCoordList = null;
  var allHoverClasses = ['place-hover', 'place-hover-solo', 'place-hover-occupied', 'place-hover-occupied-solo', 'place-hover-oob', 'place-hover-oob-solo'];

  var initialize = function initialize() {
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
    document.addEventListener('keydown', function (e) {
      if (e.key === '.') {
        _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDirection();
        clearClass(document.querySelector('.player-grid'), allHoverClasses);
        displayHover();
      }
    });
  };

  var drawGrid = function drawGrid(player) {
    var name = player.getName();
    var gameboard = player.getGameboard();

    if (name === 'enemy') {
      grid = document.querySelector('.enemy-grid');
    } else if (name === 'player') {
      grid = document.querySelector('.player-grid');
    } else {
      throw 'please specify owner as "enemy" or "player"';
    } // Adding cells and event listeners


    var _loop = function _loop(i) {
      var cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.cellId = i;
      cell.dataset.player = name;
      grid.appendChild(cell);

      if (name === 'player') {
        cell.addEventListener('click', function (e) {
          if (_game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().id === 0) {
            // if ship can be placed
            var currentShip = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getShipForPlacement();

            if (e.target.classList.contains('place-hover')) {
              // place ship
              gameboard.placeShip({
                length: currentShip.size
              }, {
                coord: sharedCoordList[0],
                dir: _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection()
              }); // display placed ship

              placeShip(sharedCoordList, gameboard.getBoard(), e.target); // game.advanceShipPlacement

              if (_game_js__WEBPACK_IMPORTED_MODULE_2__["default"].advanceShipPlacement() === 1) {
                clearClass(e.target.parentElement, allHoverClasses);
              }
            }
          }
        });
      } else {
        cell.addEventListener('click', function (e) {
          if (_game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().target === 'enemy') {
            var coord = getCoord(i, gameboard.getBoard());
            var isHit = gameboard.receiveAttack([coord.x, coord.y]);
            console.log(name + ' ' + displayCoord(i, gameboard.getBoard()) + ' ' + (isHit ? 'hit!' : 'missed'));
            if (isHit) cell.style['background-color'] = 'red';
            _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].advanceState();
          }
        });
      }

      ;

      if (name === 'player') {
        cell.addEventListener('mouseover', function (e) {
          if (_game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().id === 0) {
            displayHover(e.target, player);
          }
        });
        cell.addEventListener('mouseout', function (e) {
          if (_game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().id === 0) {
            clearClass(e.target.parentElement, allHoverClasses);
          }
        });
      }
    };

    for (var i = 0; i < gameboard.getBoard().length; i++) {
      _loop(i);
    }

    grid.style['grid-template-columns'] = "repeat(".concat(Math.sqrt(gameboard.getBoard().length), ", 1fr)");
  };

  var displayHover = function displayHover(element, player) {
    if (element === undefined) {
      var hoverNodeList = document.querySelectorAll(':hover');
      element = hoverNodeList.item(hoverNodeList.length - 1);
    }

    if (player === undefined) {
      player = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getPlayers().player;
    }

    var gameboard = player.getGameboard();
    var cellCoord = getCoord(element.dataset.cellId, gameboard.getBoard());
    var currentShip = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getShipForPlacement();
    var coordList = null; // Get coordList centered around hovered coordinate

    coordList = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getCoordsCentered(currentShip.size, {
      coord: [cellCoord.x, cellCoord.y],
      dir: _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection()
    }); // Nudge the coordList onto the board if needed

    coordList = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].nudgeCoordsOn(coordList, gameboard.getBoard()); // Update shared coordinate list

    sharedCoordList = coordList; // Show availability with hover colors

    var hoverClasses = [];

    try {
      _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfOpen(coordList, gameboard.getBoard());
      hoverClasses = ['place-hover-solo', 'place-hover'];
    } catch (error) {
      console.log(error);

      if (error === 'cell occupied') {
        hoverClasses = ['place-hover-occupied-solo', 'place-hover-occupied'];
      } else if (error === 'out of bounds') {
        hoverClasses = ['place-hover-oob-solo', 'place-hover-oob'];
      }
    }

    coordList.forEach(function (hoverCoord) {
      var cellIndex = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getIndexFromCoord([hoverCoord[0], hoverCoord[1]], gameboard.getBoard());
      element.parentElement.childNodes.item(cellIndex).classList.add(hoverClasses[1]);
    });
    element.classList.add(hoverClasses[0]);
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

  var placeShip = function placeShip(coordList, board, element) {
    var parent = element.parentElement;
    coordList.forEach(function (coord) {
      parent.childNodes[_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].getIndexFromCoord(coord, board)].classList.add('ship-standing');
    });
  };

  var clearClass = function clearClass(parent, className) {
    parent.childNodes.forEach(function (child) {
      var _child$classList;

      if (typeof className === 'string') child.classList.remove(className);else (_child$classList = child.classList).remove.apply(_child$classList, _toConsumableArray(className));
    });
  };

  return {
    initialize: initialize,
    drawGrid: drawGrid
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
  var possibleEnemyAttacks = null;
  var state = states[0];
  var shipList = [{
    name: 'Carrier',
    size: 5
  }, {
    name: 'Battleship',
    size: 4
  }, {
    name: 'Destroyer',
    size: 3
  }, {
    name: 'Submarine',
    size: 3
  }, {
    name: 'Patrol Boat',
    size: 2
  }];
  var currentShip = 0;
  var direction = 'e';
  var player1 = null;
  var enemy1 = null;

  var start = function start() {
    player1 = (0,_src_factories_js__WEBPACK_IMPORTED_MODULE_1__.playerFactory)('player', 10);
    enemy1 = (0,_src_factories_js__WEBPACK_IMPORTED_MODULE_1__.playerFactory)('enemy', 10);
    possibleEnemyAttacks = player1.getGameboard().getBoard();
    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawGrid(player1);
    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].drawGrid(enemy1);
    placeRandomShips(enemy1);
  };

  var getShipForPlacement = function getShipForPlacement() {
    return shipList[currentShip];
  };

  var advanceShipPlacement = function advanceShipPlacement() {
    if (currentShip < 4) {
      currentShip++;
      return 0;
    } else {
      state = states[1];
      console.log(state.name);
      return 1;
    }
  };

  var advanceState = function advanceState() {
    if (player1.getGameboard().allShipsSunk()) {
      alert('Enemy wins!');
      state = states[3];
    } else if (enemy1.getGameboard().allShipsSunk()) {
      alert('Player wins!');
      state = states[3];
    } else {
      if (state.id === 1) {
        state = states[2];
        enemyRandomAttack();
      } else {
        state = states[1];
      }
    }

    console.log(state.name);
  };

  var getState = function getState() {
    return state;
  };

  var getDirection = function getDirection() {
    return direction;
  };

  var toggleDirection = function toggleDirection() {
    if (direction === 'e') direction = 's';else direction = 'e';
  };

  var getPlayers = function getPlayers() {
    return {
      player: player1,
      enemy: enemy1
    };
  };

  var placeRandomShips = function placeRandomShips(player) {
    var boardSize = Math.sqrt(player.getGameboard().getBoard().length);
    shipList.forEach(function (ship) {
      var success = false;

      while (success === false) {
        if (Math.floor(Math.random() * 2) === 0) toggleDirection();
        var coordX = null;
        var coordY = null;

        if (direction === 'e') {
          coordX = Math.floor(Math.random() * (boardSize - (ship.size - 1)));
          coordY = Math.floor(Math.random() * boardSize);
        } else {
          coordX = Math.floor(Math.random() * boardSize);
          coordY = Math.floor(Math.random() * (boardSize - (ship.size - 1)));
        }

        try {
          if (player.getGameboard().placeShip({
            length: ship.size
          }, {
            coord: [coordX, coordY],
            dir: direction
          })) {
            success = true;
          }
        } catch (_unused) {
          console.log('Failed to place a ship');
        }
      }
    });
  };

  var enemyRandomAttack = function enemyRandomAttack() {
    var attackIndex = Math.floor(Math.random() * possibleEnemyAttacks.length);
    var attackCell = possibleEnemyAttacks.splice(attackIndex, 1)[0];
    player1.getGameboard().receiveAttack(attackCell.coord);
    advanceState();
  };

  return {
    start: start,
    getShipForPlacement: getShipForPlacement,
    advanceShipPlacement: advanceShipPlacement,
    advanceState: advanceState,
    getState: getState,
    getDirection: getDirection,
    toggleDirection: toggleDirection,
    getPlayers: getPlayers
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
var factoryHelper = function () {
  var arraysMatch = function arraysMatch(coord1, coord2) {
    return JSON.stringify(coord1) === JSON.stringify(coord2) ? true : false;
  };

  var checkIfOpen = function checkIfOpen(coordList, board) {
    var isOpen = true;
    coordList.forEach(function (coord) {
      var boardCell = board[getIndexFromCoord(coord, board)];

      if (boardCell.shipId !== null) {
        isOpen = false;
        throw 'cell occupied';
      }
    });
    return isOpen;
  }; // locationProps = { coord: [5, 5], dir: (e || s) }


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

  var getCoordsCentered = function getCoordsCentered(length, locationProps) {
    var startingCoord = null;
    var dir = locationProps.dir;

    if (dir === 'e') {
      startingCoord = [locationProps.coord[0] - Math.floor((length - 1) / 2), locationProps.coord[1]];
    } else if (dir === 's') {
      startingCoord = [locationProps.coord[0], locationProps.coord[1] - Math.floor((length - 1) / 2)];
    } else {
      throw 'please specify direction before getting coordinates';
    }

    var coordArray = [];

    for (var i = 0; i < length; i++) {
      var coordX = dir === 'e' ? startingCoord[0] + i : startingCoord[0];
      var coordY = dir === 's' ? startingCoord[1] + i : startingCoord[1];
      coordArray.push([coordX, coordY]);
    }

    return coordArray;
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

  var nudgeCoordsBy = function nudgeCoordsBy(coordList, number) {};

  var nudgeCoordsOn = function nudgeCoordsOn(coordList, board) {
    var firstCoord = coordList[0];
    var lastCoord = coordList[coordList.length - 1];
    var newList = null; // off the right side

    var rightSideHang = lastCoord[0] - (Math.sqrt(board.length) - 1);
    var leftSideHang = -1 * firstCoord[0];
    var topHang = -1 * firstCoord[1];
    var bottomHang = lastCoord[1] - (Math.sqrt(board.length) - 1);

    if (rightSideHang > 0) {
      newList = coordList.map(function (coord) {
        return [coord[0] - rightSideHang, coord[1]];
      });
    } else if (leftSideHang > 0) {
      newList = coordList.map(function (coord) {
        return [coord[0] + leftSideHang, coord[1]];
      });
    } else if (topHang > 0) {
      newList = coordList.map(function (coord) {
        return [coord[0], coord[1] + topHang];
      });
    } else if (bottomHang > 0) {
      newList = coordList.map(function (coord) {
        return [coord[0], coord[1] - bottomHang];
      });
    } else {
      newList = coordList;
    }

    return newList;
  };

  return {
    arraysMatch: arraysMatch,
    checkIfOpen: checkIfOpen,
    getCoordsIfOpen: getCoordsIfOpen,
    getCoordsCentered: getCoordsCentered,
    getIndexFromCoord: getIndexFromCoord,
    getCoordFromIndex: getCoordFromIndex,
    nudgeCoordsBy: nudgeCoordsBy,
    nudgeCoordsOn: nudgeCoordsOn
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--grid-border-color);\n  background-color: var(--grid-color, white);\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,kCAAkC;EAClC,sCAAsC;EACtC,wBAAwB;EACxB,wBAAwB;EACxB,+BAA+B;EAC/B,kBAAkB;EAClB,kCAAkC;EAClC,yBAAyB;EACzB,mBAAmB;EACnB,0BAA0B;EAC1B,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,yCAAyC;AAC3C;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,kDAAkD;EAClD,oDAAoD;EACpD,gCAAgC;EAChC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,+DAA+D;EAC/D,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,0EAA0E;EAC1E,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,WAAW;EACX,oBAAoB;EACpB,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,sCAAsC;EACtC,wEAAwE;EACxE,0CAA0C;AAC5C;AACA;EACE,4DAA4D;AAC9D;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,gDAAgD;AAClD","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--grid-border-color);\n  background-color: var(--grid-color, white);\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFFQUssOERBQUE7QUFDQUQsc0RBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZmFjdG9yaWVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9tZXllcnJlc2V0LmNzcz85MjRkIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcblxuXG5jb25zdCBkaXNwbGF5ID0gKCgpID0+IHtcbiAgbGV0IGdyaWQgPSBudWxsO1xuICBsZXQgc2hhcmVkQ29vcmRMaXN0ID0gbnVsbDtcblxuICBjb25zdCBhbGxIb3ZlckNsYXNzZXMgPSBbXG4gICAgJ3BsYWNlLWhvdmVyJyxcbiAgICAncGxhY2UtaG92ZXItc29sbycsXG4gICAgJ3BsYWNlLWhvdmVyLW9jY3VwaWVkJyxcbiAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbycsXG4gICAgJ3BsYWNlLWhvdmVyLW9vYicsXG4gICAgJ3BsYWNlLWhvdmVyLW9vYi1zb2xvJ1xuICBdO1xuICBjb25zdCBpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15R3JpZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdlbmVteS1ncmlkLXdyYXBwZXInKTtcbiAgICBjb25zdCBlbmVteUdyaWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgZW5lbXlHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ0VuZW15JztcbiAgICBjb25zdCBlbmVteUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcsICdlbmVteS1ncmlkJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJHcmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdncmlkLXdyYXBwZXInLCAncGxheWVyLWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IHBsYXllckdyaWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgcGxheWVyR3JpZExhYmVsLmlubmVyVGV4dCA9ICdQbGF5ZXInO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHBsYXllckdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcsICdwbGF5ZXItZ3JpZCcpO1xuXG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbWVDb250YWluZXIuaWQgPSAnZ2FtZS1jb250YWluZXInO1xuXG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWRMYWJlbCk7XG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUdyaWRXcmFwcGVyKTtcbiAgICBlbmVteUdyaWRXcmFwcGVyLmFwcGVuZENoaWxkKGVuZW15R3JpZCk7XG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkTGFiZWwpO1xuICAgIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZFdyYXBwZXIpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmFwcGVuZENoaWxkKHBsYXllckdyaWQpO1xuXG4gICAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlLWNvbnRhaW5lcicpO1xuICAgIGlmIChwYWdlQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMpIHtcbiAgICAgIHBhZ2VDb250YWluZXIuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQoZ2FtZUNvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJy4nKSB7XG4gICAgICAgIGdhbWUudG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGNsZWFyQ2xhc3MoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1ncmlkJyksIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgIGRpc3BsYXlIb3ZlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRyYXdHcmlkID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwbGF5ZXIuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IHBsYXllci5nZXRHYW1lYm9hcmQoKTtcblxuICAgIGlmIChuYW1lID09PSAnZW5lbXknKSB7XG4gICAgICBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1ncmlkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdwbGVhc2Ugc3BlY2lmeSBvd25lciBhcyBcImVuZW15XCIgb3IgXCJwbGF5ZXJcIicpO1xuICAgIH1cblxuICAgIC8vIEFkZGluZyBjZWxscyBhbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKS5sZW5ndGg7IGkgKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbElkID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC5wbGF5ZXIgPSBuYW1lO1xuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIFxuICAgICAgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHNoaXAgY2FuIGJlIHBsYWNlZFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBnYW1lLmdldFNoaXBGb3JQbGFjZW1lbnQoKTtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYWNlLWhvdmVyJykpIHtcbiAgICAgICAgICAgICAgLy8gcGxhY2Ugc2hpcFxuICAgICAgICAgICAgICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxlbmd0aDogY3VycmVudFNoaXAuc2l6ZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IHNoYXJlZENvb3JkTGlzdFswXSxcbiAgICAgICAgICAgICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gZGlzcGxheSBwbGFjZWQgc2hpcFxuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hhcmVkQ29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSwgZS50YXJnZXQpO1xuICAgICAgICAgICAgICAvLyBnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50XG4gICAgICAgICAgICAgIGlmIChnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50KCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQgPT09ICdlbmVteScpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gZ2V0Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbY29vcmQueCwgY29vcmQueV0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobmFtZSArICcgJyArIGRpc3BsYXlDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICAgICAgICAgICAgKyAnICcgKyAoaXNIaXQgPyAnaGl0IScgOiAnbWlzc2VkJykpO1xuICAgICAgICAgICAgaWYgKGlzSGl0KSBjZWxsLnN0eWxlWydiYWNrZ3JvdW5kLWNvbG9yJ10gPSAncmVkJztcbiAgICAgICAgICAgIGdhbWUuYWR2YW5jZVN0YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChuYW1lID09PSAncGxheWVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgZGlzcGxheUhvdmVyKGUudGFyZ2V0LCBwbGF5ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJDbGFzcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LCBhbGxIb3ZlckNsYXNzZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ3JpZC5zdHlsZVsnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJ10gPSBgcmVwZWF0KCR7TWF0aC5zcXJ0KGdhbWVib2FyZFxuICAgICAgICAuZ2V0Qm9hcmQoKS5sZW5ndGgpfSwgMWZyKWA7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5SG92ZXIgPSAoZWxlbWVudCwgcGxheWVyKSA9PiB7XG4gICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGhvdmVyTm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCc6aG92ZXInKTtcbiAgICAgIGVsZW1lbnQgPSBob3Zlck5vZGVMaXN0Lml0ZW0oaG92ZXJOb2RlTGlzdC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgaWYgKHBsYXllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwbGF5ZXIgPSBnYW1lLmdldFBsYXllcnMoKS5wbGF5ZXI7XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgY2VsbENvb3JkID0gZ2V0Q29vcmQoZWxlbWVudC5kYXRhc2V0LmNlbGxJZCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZ2FtZS5nZXRTaGlwRm9yUGxhY2VtZW50KCk7XG4gICAgbGV0IGNvb3JkTGlzdCA9IG51bGw7XG5cbiAgICAvLyBHZXQgY29vcmRMaXN0IGNlbnRlcmVkIGFyb3VuZCBob3ZlcmVkIGNvb3JkaW5hdGVcbiAgICBjb29yZExpc3QgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0NlbnRlcmVkKFxuICAgICAgY3VycmVudFNoaXAuc2l6ZSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFtjZWxsQ29vcmQueCwgY2VsbENvb3JkLnldLFxuICAgICAgICBkaXI6IGdhbWUuZ2V0RGlyZWN0aW9uKClcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIE51ZGdlIHRoZSBjb29yZExpc3Qgb250byB0aGUgYm9hcmQgaWYgbmVlZGVkXG4gICAgY29vcmRMaXN0ID0gZmFjdG9yeUhlbHBlci5udWRnZUNvb3Jkc09uKGNvb3JkTGlzdCxcbiAgICAgIGdhbWVib2FyZC5nZXRCb2FyZCgpKVxuXG4gICAgLy8gVXBkYXRlIHNoYXJlZCBjb29yZGluYXRlIGxpc3RcbiAgICBzaGFyZWRDb29yZExpc3QgPSBjb29yZExpc3Q7XG5cbiAgICAvLyBTaG93IGF2YWlsYWJpbGl0eSB3aXRoIGhvdmVyIGNvbG9yc1xuICAgIGxldCBob3ZlckNsYXNzZXMgPSBbXTtcbiAgICB0cnkge1xuICAgICAgZmFjdG9yeUhlbHBlci5jaGVja0lmT3Blbihjb29yZExpc3QsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItc29sbycsICdwbGFjZS1ob3ZlciddXG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgaWYgKGVycm9yID09PSAnY2VsbCBvY2N1cGllZCcpIHtcbiAgICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAgICAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnXVxuICAgICAgfSBlbHNlIGlmIChlcnJvciA9PT0gJ291dCBvZiBib3VuZHMnKSB7XG4gICAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItb29iLXNvbG8nLFxuICAgICAgICAgICdwbGFjZS1ob3Zlci1vb2InXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29vcmRMaXN0LmZvckVhY2goaG92ZXJDb29yZCA9PiB7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKFxuICAgICAgICBbaG92ZXJDb29yZFswXSwgaG92ZXJDb29yZFsxXV0sIGdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICApO1xuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXMuaXRlbShjZWxsSW5kZXgpLlxuICAgICAgICBjbGFzc0xpc3QuYWRkKGhvdmVyQ2xhc3Nlc1sxXSk7XG4gICAgfSk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGhvdmVyQ2xhc3Nlc1swXSk7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5Q29vcmQgPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRPYmogPSBmYWN0b3J5SGVscGVyLmdldENvb3JkRnJvbUluZGV4KGluZGV4LCBib2FyZCk7XG4gICAgY29uc3QgY29vcmRUZXh0ID0gYFske2Nvb3JkT2JqLnh9LCAke2Nvb3JkT2JqLnl9XWA7XG4gICAgcmV0dXJuIGNvb3JkVGV4dDtcbiAgfVxuXG4gIGNvbnN0IGdldENvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjb29yZE9iai54LFxuICAgICAgeTogY29vcmRPYmoueSxcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRMaXN0LCBib2FyZCwgZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBwYXJlbnQuY2hpbGROb2Rlc1tmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKFxuICAgICAgICBjb29yZCwgYm9hcmRcbiAgICAgICldLmNsYXNzTGlzdC5hZGQoJ3NoaXAtc3RhbmRpbmcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQ2xhc3MgPSAocGFyZW50LCBjbGFzc05hbWUpID0+IHtcbiAgICBwYXJlbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJylcbiAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgZWxzZVxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gICAgZHJhd0dyaWQsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7IiwiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi4vc3JjL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXJGYWN0b3J5ID0gKG15TmFtZSwgYm9hcmRTaXplKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBteU5hbWU7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoYm9hcmRTaXplKTtcbiAgY29uc3QgYXR0YWNrZWRTcGFjZXMgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiB7IHJldHVybiBnYW1lYm9hcmQ7IH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWU7IH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkLCBlbmVteVBsYXllcikgPT4ge1xuICAgIGxldCBhbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICBhdHRhY2tlZFNwYWNlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbCwgY29vcmQpKSB7XG4gICAgICAgIGFscmVhZHlBdHRhY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWFscmVhZHlBdHRhY2tlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5lbXlQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIGF0dGFja2VkU3BhY2VzLnB1c2goY29vcmQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBhdHRhY2tlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0R2FtZWJvYXJkLFxuICAgIGdldE5hbWUsXG4gICAgYXR0YWNrLFxuICB9XG59XG5cbi8vIHByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzIH1cbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChwcm9wcykgPT4ge1xuICBjb25zdCBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gIGNvbnN0IGhpdHMgPSBwcm9wcy5pbml0aWFsSGl0cyB8fCBbXTtcblxuICBjb25zdCBoaXQgPSAoY29vcmQpID0+IHtcbiAgICBpZiAoIWhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGhpdHMubGVuZ3RoID09PSBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoc2l6ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgIGNvb3JkOiBbaiwgaV0sXG4gICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgIHNoaXBJZDogbnVsbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgc3VuayA9IGZhbHNlO1xuICAgIH0pXG4gICAgcmV0dXJuIHN1bms7XG4gIH1cblxuICAvLyBzaGlwUHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogW3gsIHldLCBkaXI6ICgnZScgfHwgJ3MnKSB9XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwUHJvcHMsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgcGxhY2VkU2hpcElkID0gbnVsbDtcbiAgICBsZXQgcGxhY2VkQ29vcmRzID0gdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICBwbGFjZWRDb29yZHMgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0lmT3BlbihcbiAgICAgICAgc2hpcFByb3BzLmxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpO1xuICAgICAgcGxhY2VkU2hpcElkID0gc2hpcHMucHVzaChzaGlwRmFjdG9yeShzaGlwUHJvcHMpKSAtIDE7XG4gICAgICBib2FyZCA9IGJvYXJkLm1hcChjZWxsID0+IHtcbiAgICAgICAgbGV0IG5ld0NlbGwgPSBjZWxsO1xuICAgICAgICBwbGFjZWRDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgY29vcmQpKSB7XG4gICAgICAgICAgICBuZXdDZWxsID0ge1xuICAgICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICAgICAgc2hpcElkOiBwbGFjZWRTaGlwSWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0NlbGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IChlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGJvYXJkKTtcbiAgICBpZiAoYm9hcmRbaW5kZXhdLmhpdCAhPT0gMCkge1xuICAgICAgdGhyb3coJ2FscmVhZHkgaGl0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNoaXBJZCA9IGJvYXJkW2luZGV4XS5zaGlwSWQ7XG4gICAgaWYgKHNoaXBJZCA9PT0gbnVsbCkge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IC0xO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2FyZFtpbmRleF0uaGl0ID0gMTtcbiAgICAgIHNoaXBzW3NoaXBJZF0uaGl0KGNvb3JkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4geyByZXR1cm4gYm9hcmQgfTtcblxuICByZXR1cm4ge1xuICAgIGFsbFNoaXBzU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRCb2FyZCxcbiAgfVxufSIsImltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuXG5jb25zdCBnYW1lID0gKCgpID0+IHtcbiAgY29uc3Qgc3RhdGVzID0gW1xuICAgIHtcbiAgICAgIGlkOiAwLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogJ1BsYWNlIHlvdXIgc2hpcHMuJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDEsXG4gICAgICB0YXJnZXQ6ICdlbmVteScsXG4gICAgICBuYW1lOiBcIlBsYXllcidzIHR1cm4uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAyLFxuICAgICAgdGFyZ2V0OiAncGxheWVyJyxcbiAgICAgIG5hbWU6IFwiRW5lbXkncyB0dXJuLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMyxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIG5hbWU6IFwiR2FtZSBmaW5pc2hlZC5cIlxuICAgIH1cbiAgXTtcbiAgbGV0IHBvc3NpYmxlRW5lbXlBdHRhY2tzID0gbnVsbDtcbiAgbGV0IHN0YXRlID0gc3RhdGVzWzBdO1xuICBjb25zdCBzaGlwTGlzdCA9IFtcbiAgICB7IG5hbWU6ICdDYXJyaWVyJywgc2l6ZTogNSB9LFxuICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0IH0sXG4gICAgeyBuYW1lOiAnRGVzdHJveWVyJywgc2l6ZTogMyB9LFxuICAgIHsgbmFtZTogJ1N1Ym1hcmluZScsIHNpemU6IDMgfSxcbiAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIgfVxuICBdO1xuICBsZXQgY3VycmVudFNoaXAgPSAwO1xuICBsZXQgZGlyZWN0aW9uID0gJ2UnO1xuICBsZXQgcGxheWVyMSA9IG51bGw7XG4gIGxldCBlbmVteTEgPSBudWxsO1xuXG4gIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgIHBsYXllcjEgPSBwbGF5ZXJGYWN0b3J5KCdwbGF5ZXInLCAxMCk7XG4gICAgZW5lbXkxID0gcGxheWVyRmFjdG9yeSgnZW5lbXknLCAxMCk7XG4gICAgcG9zc2libGVFbmVteUF0dGFja3MgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmdldEJvYXJkKCk7XG5cbiAgICBkaXNwbGF5LmRyYXdHcmlkKHBsYXllcjEpO1xuICAgIGRpc3BsYXkuZHJhd0dyaWQoZW5lbXkxKTtcblxuICAgIHBsYWNlUmFuZG9tU2hpcHMoZW5lbXkxKTtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwRm9yUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGlzdFtjdXJyZW50U2hpcF07XG4gIH1cblxuICBjb25zdCBhZHZhbmNlU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFNoaXAgPCA0KSB7XG4gICAgICBjdXJyZW50U2hpcCArKztcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIGNvbnNvbGUubG9nKHN0YXRlLm5hbWUpO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWR2YW5jZVN0YXRlID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBhbGVydCgnRW5lbXkgd2lucyEnKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuXG4gICAgfSBlbHNlIGlmIChlbmVteTEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGFsZXJ0KCdQbGF5ZXIgd2lucyEnKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RhdGUuaWQgPT09IDEpIHtcbiAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMl07XG4gICAgICAgIGVuZW15UmFuZG9tQXR0YWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coc3RhdGUubmFtZSk7XG4gIH1cblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBnZXREaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIGRpcmVjdGlvbiA9ICdzJztcbiAgICBlbHNlIGRpcmVjdGlvbiA9ICdlJztcbiAgfVxuXG4gIGNvbnN0IGdldFBsYXllcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjogcGxheWVyMSxcbiAgICAgIGVuZW15OiBlbmVteTFcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVJhbmRvbVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IE1hdGguc3FydChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKS5sZW5ndGgpO1xuICAgIHNoaXBMaXN0LmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgd2hpbGUgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCkgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGxldCBjb29yZFggPSBudWxsO1xuICAgICAgICBsZXQgY29vcmRZID0gbnVsbDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2UnKSB7XG4gICAgICAgICAgY29vcmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICAgIGNvb3JkWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHBsYXllci5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxlbmd0aDogc2hpcC5zaXplXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb29yZDogW2Nvb3JkWCwgY29vcmRZXSxcbiAgICAgICAgICAgICAgZGlyOiBkaXJlY3Rpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgICApKSB7XG4gICAgICAgICAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdGYWlsZWQgdG8gcGxhY2UgYSBzaGlwJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGVuZW15UmFuZG9tQXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGF0dGFja0luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVFbmVteUF0dGFja3MubGVuZ3RoKTtcbiAgICBjb25zdCBhdHRhY2tDZWxsID0gcG9zc2libGVFbmVteUF0dGFja3Muc3BsaWNlKGF0dGFja0luZGV4LCAxKVswXTtcbiAgICBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2soYXR0YWNrQ2VsbC5jb29yZCk7XG4gICAgYWR2YW5jZVN0YXRlKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGdldFNoaXBGb3JQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVNoaXBQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVN0YXRlLFxuICAgIGdldFN0YXRlLFxuICAgIGdldERpcmVjdGlvbixcbiAgICB0b2dnbGVEaXJlY3Rpb24sXG4gICAgZ2V0UGxheWVycyxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgY29uc3QgYXJyYXlzTWF0Y2ggPSAoY29vcmQxLCBjb29yZDIpID0+IHtcbiAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KGNvb3JkMSkgPT09IEpTT04uc3RyaW5naWZ5KGNvb3JkMikpXG4gICAgICA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrSWZPcGVuID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBsZXQgaXNPcGVuID0gdHJ1ZTtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtnZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpXTtcbiAgICAgIGlmIChib2FyZENlbGwuc2hpcElkICE9PSBudWxsKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aHJvdygnY2VsbCBvY2N1cGllZCcpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gICAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFs1LCA1XSwgZGlyOiAoZSB8fCBzKSB9XG4gIGNvbnN0IGdldENvb3Jkc0lmT3BlbiA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNlYXJjaFggPSBsb2NhdGlvblByb3BzLmNvb3JkWzBdO1xuICAgICAgbGV0IHNlYXJjaFkgPSBsb2NhdGlvblByb3BzLmNvb3JkWzFdO1xuICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICA/IHNlYXJjaFggKz0gaVxuICAgICAgICA6IHNlYXJjaFkgKz0gaTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgW3NlYXJjaFgsIHNlYXJjaFldKVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgaWYgKCFtYXRjaGluZ0NlbGwpIHRocm93KCdvdXQgb2YgYm91bmRzJyk7XG4gICAgICBlbHNlIGlmIChtYXRjaGluZ0NlbGwuc2hpcElkICE9PSBudWxsKSB0aHJvdygnY2VsbCBvY2N1cGllZCcpXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gU3VjY2Vzc1xuICAgICAgICBjb29yZHMucHVzaChbc2VhcmNoWCwgc2VhcmNoWV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRzQ2VudGVyZWQgPSAobGVuZ3RoLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHN0YXJ0aW5nQ29vcmQgPSBudWxsO1xuICAgIGNvbnN0IGRpciA9IGxvY2F0aW9uUHJvcHMuZGlyO1xuICAgIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpLFxuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzFdXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAncycpIHtcbiAgICAgIHN0YXJ0aW5nQ29vcmQgPSBbXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMF0sXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV0gLSBNYXRoLmZsb29yKChsZW5ndGggLSAxKS8yKVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IGRpcmVjdGlvbiBiZWZvcmUgZ2V0dGluZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjb29yZFggPSAoZGlyID09PSAnZScpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFswXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzBdO1xuICAgICAgY29uc3QgY29vcmRZID0gKGRpciA9PT0gJ3MnKVxuICAgICAgICA/IHN0YXJ0aW5nQ29vcmRbMV0gKyBpXG4gICAgICAgIDogc3RhcnRpbmdDb29yZFsxXTtcbiAgICAgIGNvb3JkQXJyYXkucHVzaChbY29vcmRYLCBjb29yZFldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkQXJyYXk7XG4gIH1cblxuICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGNvb3JkWzFdICogTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgKyBjb29yZFswXTtcbiAgICBpZiAoaW5kZXggPiBib2FyZC5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgdGhyb3coJ2dldEluZGV4Li4uOiBvdXQgb2YgYm91bmRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCk7XG4gICAgY29uc3QgeCA9IGluZGV4ICUgc2l6ZTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgIFxuICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfVxuICB9XG5cbiAgY29uc3QgbnVkZ2VDb29yZHNCeSA9IChjb29yZExpc3QsIG51bWJlcikgPT4ge1xuXG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc09uID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBmaXJzdENvb3JkID0gY29vcmRMaXN0WzBdO1xuICAgIGNvbnN0IGxhc3RDb29yZCA9IGNvb3JkTGlzdFtjb29yZExpc3QubGVuZ3RoIC0gMV07XG4gICAgbGV0IG5ld0xpc3QgPSBudWxsO1xuICAgIC8vIG9mZiB0aGUgcmlnaHQgc2lkZVxuICAgIGNvbnN0IHJpZ2h0U2lkZUhhbmcgPSBsYXN0Q29vcmRbMF0gLSAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKTtcbiAgICBjb25zdCBsZWZ0U2lkZUhhbmcgID0gLTEgKiBmaXJzdENvb3JkWzBdO1xuICAgIGNvbnN0IHRvcEhhbmcgICAgICAgPSAtMSAqIGZpcnN0Q29vcmRbMV07XG4gICAgY29uc3QgYm90dG9tSGFuZyAgICA9IGxhc3RDb29yZFsxXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGlmIChyaWdodFNpZGVIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdIC0gcmlnaHRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChsZWZ0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gKyBsZWZ0U2lkZUhhbmcsIGNvb3JkWzFdXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodG9wSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gKyB0b3BIYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYm90dG9tSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gLSBib3R0b21IYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3TGlzdDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyYXlzTWF0Y2gsXG4gICAgY2hlY2tJZk9wZW4sXG4gICAgZ2V0Q29vcmRzSWZPcGVuLFxuICAgIGdldENvb3Jkc0NlbnRlcmVkLFxuICAgIGdldEluZGV4RnJvbUNvb3JkLFxuICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIG51ZGdlQ29vcmRzQnksXG4gICAgbnVkZ2VDb29yZHNPbixcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFjdG9yeUhlbHBlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21leWVycmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1nYW1lLWJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG4gIC0taG92ZXItbGlnaHQtYmx1ZTogcmdiKDEzMSwgMTc0LCAyMzgpO1xcbiAgLS1ob3Zlci1ibHVlOiBkb2RnZXJCbHVlO1xcbiAgLS1ob3Zlci1jcmltc29uOiBjcmltc29uO1xcbiAgLS1ob3Zlci1yZWQ6IHJnYigyNTUsIDExMiwgMTEyKTtcXG4gIC0taG92ZXItZ29sZDogZ29sZDtcXG4gIC0taG92ZXIteWVsbG93OiByZ2IoMjU1LCAyNTUsIDE0NSk7XFxuICAtLXNoaXAtZ3JlZW46IGZvcmVzdEdyZWVuO1xcbiAgLS1ncmlkLWNvbG9yOiB3aGl0ZTtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiBjYWxjKDIuOHZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjN2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjR2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMjByZW0gKyAxMHZ3KTtcXG4gIG1heC13aWR0aDogY2FsYygoMTAwdmggLSAodmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMikpIC8gMi41KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQge1xcbiAgLyogbWFyZ2luOiAycmVtOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogODAlO1xcbiAgcGFkZGluZy1ib3R0b206IDgwJTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5ncmlkLWNlbGwge1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjM7ICovXFxuICBib3JkZXI6IGNhbGModmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSkgLyAyKSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvcik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWNvbG9yLCB3aGl0ZSk7XFxufVxcbi5wbGFjZS1ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1saWdodC1ibHVlLCByZ2IoOTgsIDE1MSwgMjMwKSk7XFxufVxcbi5wbGFjZS1ob3Zlci1zb2xvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWJsdWUsIGRvZGdlckJsdWUpO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNyaW1zb24sIGNyaW1zb24pO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iLXNvbG8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCByZWQpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXIteWVsbG93LCB5ZWxsb3cpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1nb2xkLCBnb2xkKTtcXG59XFxuLnNoaXAtc3RhbmRpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcC1ncmVlbiwgZm9yZXN0R3JlZW4pO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGtDQUFrQztFQUNsQyxzQ0FBc0M7RUFDdEMsd0JBQXdCO0VBQ3hCLHdCQUF3QjtFQUN4QiwrQkFBK0I7RUFDL0Isa0JBQWtCO0VBQ2xCLGtDQUFrQztFQUNsQyx5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsK0JBQStCO0VBQy9CLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGtEQUFrRDtFQUNsRCxvREFBb0Q7RUFDcEQsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLCtEQUErRDtFQUMvRCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLDBFQUEwRTtFQUMxRSxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQiw0QkFBNEI7QUFDOUI7QUFDQTtFQUNFLGlEQUFpRDtBQUNuRDtBQUNBO0VBQ0UsV0FBVztFQUNYLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxpREFBaUQ7QUFDbkQ7QUFDQTtFQUNFLHNDQUFzQztFQUN0Qyx3RUFBd0U7RUFDeEUsMENBQTBDO0FBQzVDO0FBQ0E7RUFDRSw0REFBNEQ7QUFDOUQ7QUFDQTtFQUNFLCtDQUErQztBQUNqRDtBQUNBO0VBQ0UsK0NBQStDO0FBQ2pEO0FBQ0E7RUFDRSx1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLDZDQUE2QztBQUMvQztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDO0FBQ0E7RUFDRSxnREFBZ0Q7QUFDbERcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgLS1wYWdlLW1hcmdpbjogMXJlbTtcXG4gIC0tZ2FtZS1iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XFxuICAtLWhvdmVyLWxpZ2h0LWJsdWU6IHJnYigxMzEsIDE3NCwgMjM4KTtcXG4gIC0taG92ZXItYmx1ZTogZG9kZ2VyQmx1ZTtcXG4gIC0taG92ZXItY3JpbXNvbjogY3JpbXNvbjtcXG4gIC0taG92ZXItcmVkOiByZ2IoMjU1LCAxMTIsIDExMik7XFxuICAtLWhvdmVyLWdvbGQ6IGdvbGQ7XFxuICAtLWhvdmVyLXllbGxvdzogcmdiKDI1NSwgMjU1LCAxNDUpO1xcbiAgLS1zaGlwLWdyZWVuOiBmb3Jlc3RHcmVlbjtcXG4gIC0tZ3JpZC1jb2xvcjogd2hpdGU7XFxuICAtLWdyaWQtYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gIC0tZ3JpZC1ib3JkZXItc2l6ZTogMXB4O1xcbiAgLyogLS1ncmlkLW9mZnNldDogMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IGNhbGMoMi4zdmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICBmb250LXNpemU6IGNhbGMoMS44dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oNCB7XFxuICBmb250LXNpemU6IGNhbGMoMS40dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuI2dhbWUtY29udGFpbmVyIHtcXG4gIHdpZHRoOiBjYWxjKDIwcmVtICsgMTB2dyk7XFxuICBtYXgtd2lkdGg6IGNhbGMoKDEwMHZoIC0gKHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpKSAvIDIuNSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5ncmlkIHtcXG4gIC8qIG1hcmdpbjogMnJlbTsgKi9cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA4MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxLjV2aDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5lbmVteS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5wbGF5ZXItZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbn1cXG4uZ3JpZC1jZWxsIHtcXG4gIC8qIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zOyAqL1xcbiAgYm9yZGVyOiBjYWxjKHZhcigtLWdyaWQtYm9yZGVyLXNpemUpIC8gMikgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1jb2xvciwgd2hpdGUpO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItbGlnaHQtYmx1ZSwgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1ibHVlLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jcmltc29uLCBjcmltc29uKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgcmVkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXllbGxvdywgeWVsbG93KTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItZ29sZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtZ3JlZW4sIGZvcmVzdEdyZWVuKTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciAmJiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdKTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJyZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vbWV5ZXJyZXNldC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcblxuZGlzcGxheS5pbml0aWFsaXplKCk7XG5nYW1lLnN0YXJ0KCk7Il0sIm5hbWVzIjpbImZhY3RvcnlIZWxwZXIiLCJnYW1lYm9hcmRGYWN0b3J5IiwicGxheWVyRmFjdG9yeSIsInNoaXBGYWN0b3J5IiwiZ2FtZSIsImRpc3BsYXkiLCJncmlkIiwic2hhcmVkQ29vcmRMaXN0IiwiYWxsSG92ZXJDbGFzc2VzIiwiaW5pdGlhbGl6ZSIsImVuZW15R3JpZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJlbmVteUdyaWRMYWJlbCIsImlubmVyVGV4dCIsImVuZW15R3JpZCIsInBsYXllckdyaWRXcmFwcGVyIiwicGxheWVyR3JpZExhYmVsIiwicGxheWVyR3JpZCIsImdhbWVDb250YWluZXIiLCJpZCIsImFwcGVuZENoaWxkIiwicGFnZUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJjaGlsZCIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwidG9nZ2xlRGlyZWN0aW9uIiwiY2xlYXJDbGFzcyIsImRpc3BsYXlIb3ZlciIsImRyYXdHcmlkIiwicGxheWVyIiwibmFtZSIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJjZWxsSWQiLCJnZXRTdGF0ZSIsImN1cnJlbnRTaGlwIiwiZ2V0U2hpcEZvclBsYWNlbWVudCIsInRhcmdldCIsImNvbnRhaW5zIiwicGxhY2VTaGlwIiwibGVuZ3RoIiwic2l6ZSIsImNvb3JkIiwiZGlyIiwiZ2V0RGlyZWN0aW9uIiwiZ2V0Qm9hcmQiLCJhZHZhbmNlU2hpcFBsYWNlbWVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRDb29yZCIsImlzSGl0IiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5IiwiY29uc29sZSIsImxvZyIsImRpc3BsYXlDb29yZCIsInN0eWxlIiwiYWR2YW5jZVN0YXRlIiwiTWF0aCIsInNxcnQiLCJlbGVtZW50IiwidW5kZWZpbmVkIiwiaG92ZXJOb2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtIiwiZ2V0UGxheWVycyIsImNlbGxDb29yZCIsImNvb3JkTGlzdCIsImdldENvb3Jkc0NlbnRlcmVkIiwibnVkZ2VDb29yZHNPbiIsImhvdmVyQ2xhc3NlcyIsImNoZWNrSWZPcGVuIiwiZXJyb3IiLCJob3ZlckNvb3JkIiwiY2VsbEluZGV4IiwiZ2V0SW5kZXhGcm9tQ29vcmQiLCJpbmRleCIsImJvYXJkIiwiY29vcmRPYmoiLCJnZXRDb29yZEZyb21JbmRleCIsImNvb3JkVGV4dCIsInBhcmVudCIsImNsYXNzTmFtZSIsIm15TmFtZSIsImJvYXJkU2l6ZSIsImF0dGFja2VkU3BhY2VzIiwiYXR0YWNrIiwiZW5lbXlQbGF5ZXIiLCJhbHJlYWR5QXR0YWNrZWQiLCJhcnJheXNNYXRjaCIsInB1c2giLCJwcm9wcyIsImhpdHMiLCJpbml0aWFsSGl0cyIsImhpdCIsImluY2x1ZGVzIiwiaXNTdW5rIiwiaiIsInNoaXBJZCIsInNoaXBzIiwiYWxsU2hpcHNTdW5rIiwic3VuayIsInNoaXAiLCJzaGlwUHJvcHMiLCJsb2NhdGlvblByb3BzIiwicGxhY2VkU2hpcElkIiwicGxhY2VkQ29vcmRzIiwiZ2V0Q29vcmRzSWZPcGVuIiwibWFwIiwibmV3Q2VsbCIsInN0YXRlcyIsInBvc3NpYmxlRW5lbXlBdHRhY2tzIiwic3RhdGUiLCJzaGlwTGlzdCIsImRpcmVjdGlvbiIsInBsYXllcjEiLCJlbmVteTEiLCJzdGFydCIsInBsYWNlUmFuZG9tU2hpcHMiLCJhbGVydCIsImVuZW15UmFuZG9tQXR0YWNrIiwiZW5lbXkiLCJzdWNjZXNzIiwiZmxvb3IiLCJyYW5kb20iLCJjb29yZFgiLCJjb29yZFkiLCJhdHRhY2tJbmRleCIsImF0dGFja0NlbGwiLCJzcGxpY2UiLCJjb29yZDEiLCJjb29yZDIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNPcGVuIiwiYm9hcmRDZWxsIiwiY29vcmRzIiwic2VhcmNoWCIsInNlYXJjaFkiLCJtYXRjaGluZ0NlbGwiLCJmaW5kIiwic3RhcnRpbmdDb29yZCIsImNvb3JkQXJyYXkiLCJudWRnZUNvb3Jkc0J5IiwibnVtYmVyIiwiZmlyc3RDb29yZCIsImxhc3RDb29yZCIsIm5ld0xpc3QiLCJyaWdodFNpZGVIYW5nIiwibGVmdFNpZGVIYW5nIiwidG9wSGFuZyIsImJvdHRvbUhhbmciXSwic291cmNlUm9vdCI6IiJ9