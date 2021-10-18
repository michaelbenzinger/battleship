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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: var(--grid-border-size);\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  background-color: var(--grid-color, white);\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,kCAAkC;EAClC,sCAAsC;EACtC,wBAAwB;EACxB,wBAAwB;EACxB,+BAA+B;EAC/B,kBAAkB;EAClB,kCAAkC;EAClC,yBAAyB;EACzB,mBAAmB;EACnB,0BAA0B;EAC1B,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,yCAAyC;AAC3C;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,kDAAkD;EAClD,oDAAoD;EACpD,gCAAgC;EAChC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,+DAA+D;EAC/D,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,4BAA4B;EAC5B,0EAA0E;EAC1E,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,WAAW;EACX,oBAAoB;EACpB,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,4DAA4D;AAC9D;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,gDAAgD;AAClD","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: var(--grid-border-size);\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  background-color: var(--grid-color, white);\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUdBLElBQU1LLE9BQU8sR0FBSSxZQUFNO0FBQ3JCLE1BQUlDLElBQUksR0FBRyxJQUFYO0FBQ0EsTUFBSUMsZUFBZSxHQUFHLElBQXRCO0FBRUEsTUFBTUMsZUFBZSxHQUFHLENBQ3RCLGFBRHNCLEVBRXRCLGtCQUZzQixFQUd0QixzQkFIc0IsRUFJdEIsMkJBSnNCLEVBS3RCLGlCQUxzQixFQU10QixzQkFOc0IsQ0FBeEI7O0FBUUEsTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBTTtBQUN2QixRQUFNQyxnQkFBZ0IsR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQXpCO0FBQ0FGLElBQUFBLGdCQUFnQixDQUFDRyxTQUFqQixDQUEyQkMsR0FBM0IsQ0FBK0IsY0FBL0IsRUFBK0Msb0JBQS9DO0FBQ0EsUUFBTUMsY0FBYyxHQUFHSixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBdkI7QUFDQUcsSUFBQUEsY0FBYyxDQUFDQyxTQUFmLEdBQTJCLE9BQTNCO0FBQ0EsUUFBTUMsU0FBUyxHQUFHTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEI7QUFDQUssSUFBQUEsU0FBUyxDQUFDSixTQUFWLENBQW9CQyxHQUFwQixDQUF3QixNQUF4QixFQUFnQyxZQUFoQztBQUNBLFFBQU1JLGlCQUFpQixHQUFHUCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBMUI7QUFDQU0sSUFBQUEsaUJBQWlCLENBQUNMLFNBQWxCLENBQTRCQyxHQUE1QixDQUFnQyxjQUFoQyxFQUFnRCxxQkFBaEQ7QUFDQSxRQUFNSyxlQUFlLEdBQUdSLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixJQUF2QixDQUF4QjtBQUNBTyxJQUFBQSxlQUFlLENBQUNILFNBQWhCLEdBQTRCLFFBQTVCO0FBQ0EsUUFBTUksVUFBVSxHQUFHVCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbkI7QUFDQVEsSUFBQUEsVUFBVSxDQUFDUCxTQUFYLENBQXFCQyxHQUFyQixDQUF5QixNQUF6QixFQUFpQyxhQUFqQztBQUVBLFFBQU1PLGFBQWEsR0FBR1YsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQXRCO0FBQ0FTLElBQUFBLGFBQWEsQ0FBQ0MsRUFBZCxHQUFtQixnQkFBbkI7QUFFQUQsSUFBQUEsYUFBYSxDQUFDRSxXQUFkLENBQTBCUixjQUExQjtBQUNBTSxJQUFBQSxhQUFhLENBQUNFLFdBQWQsQ0FBMEJiLGdCQUExQjtBQUNBQSxJQUFBQSxnQkFBZ0IsQ0FBQ2EsV0FBakIsQ0FBNkJOLFNBQTdCO0FBQ0FJLElBQUFBLGFBQWEsQ0FBQ0UsV0FBZCxDQUEwQkosZUFBMUI7QUFDQUUsSUFBQUEsYUFBYSxDQUFDRSxXQUFkLENBQTBCTCxpQkFBMUI7QUFDQUEsSUFBQUEsaUJBQWlCLENBQUNLLFdBQWxCLENBQThCSCxVQUE5QjtBQUVBLFFBQU1JLGFBQWEsR0FBR2IsUUFBUSxDQUFDYyxhQUFULENBQXVCLGlCQUF2QixDQUF0Qjs7QUFDQSxRQUFJRCxhQUFhLENBQUNFLGFBQWxCLEVBQWlDO0FBQy9CRixNQUFBQSxhQUFhLENBQUNHLFVBQWQsQ0FBeUJDLE9BQXpCLENBQWlDLFVBQUFDLEtBQUssRUFBSTtBQUN4Q0EsUUFBQUEsS0FBSyxDQUFDQyxNQUFOO0FBQ0QsT0FGRDtBQUdEOztBQUNEbkIsSUFBQUEsUUFBUSxDQUFDYyxhQUFULENBQXVCLGlCQUF2QixFQUEwQ0YsV0FBMUMsQ0FBc0RGLGFBQXREO0FBRUFWLElBQUFBLFFBQVEsQ0FBQ29CLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLFVBQUNDLENBQUQsRUFBTztBQUMxQyxVQUFJQSxDQUFDLENBQUNDLEdBQUYsS0FBVSxHQUFkLEVBQW1CO0FBQ2pCN0IsUUFBQUEsZ0VBQUE7QUFDQStCLFFBQUFBLFVBQVUsQ0FBQ3hCLFFBQVEsQ0FBQ2MsYUFBVCxDQUF1QixjQUF2QixDQUFELEVBQXlDakIsZUFBekMsQ0FBVjtBQUNBNEIsUUFBQUEsWUFBWTtBQUNiO0FBQ0YsS0FORDtBQU9ELEdBdkNEOztBQXlDQSxNQUFNQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxNQUFELEVBQVk7QUFDM0IsUUFBTUMsSUFBSSxHQUFHRCxNQUFNLENBQUNFLE9BQVAsRUFBYjtBQUNBLFFBQU1DLFNBQVMsR0FBR0gsTUFBTSxDQUFDSSxZQUFQLEVBQWxCOztBQUVBLFFBQUlILElBQUksS0FBSyxPQUFiLEVBQXNCO0FBQ3BCakMsTUFBQUEsSUFBSSxHQUFHSyxRQUFRLENBQUNjLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBUDtBQUNELEtBRkQsTUFFTyxJQUFJYyxJQUFJLEtBQUssUUFBYixFQUF1QjtBQUM1QmpDLE1BQUFBLElBQUksR0FBR0ssUUFBUSxDQUFDYyxhQUFULENBQXVCLGNBQXZCLENBQVA7QUFDRCxLQUZNLE1BRUE7QUFDTCxZQUFNLDZDQUFOO0FBQ0QsS0FWMEIsQ0FZM0I7OztBQVoyQiwrQkFhbEJrQixDQWJrQjtBQWN6QixVQUFNQyxJQUFJLEdBQUdqQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBYjtBQUNBZ0MsTUFBQUEsSUFBSSxDQUFDL0IsU0FBTCxDQUFlQyxHQUFmLENBQW1CLFdBQW5CO0FBQ0E4QixNQUFBQSxJQUFJLENBQUNDLE9BQUwsQ0FBYUMsTUFBYixHQUFzQkgsQ0FBdEI7QUFDQUMsTUFBQUEsSUFBSSxDQUFDQyxPQUFMLENBQWFQLE1BQWIsR0FBc0JDLElBQXRCO0FBQ0FqQyxNQUFBQSxJQUFJLENBQUNpQixXQUFMLENBQWlCcUIsSUFBakI7O0FBRUEsVUFBSUwsSUFBSSxLQUFLLFFBQWIsRUFBdUI7QUFDckJLLFFBQUFBLElBQUksQ0FBQ2IsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ0MsQ0FBRCxFQUFPO0FBQ3BDLGNBQUk1Qix5REFBQSxHQUFnQmtCLEVBQWhCLEtBQXVCLENBQTNCLEVBQThCO0FBQzVCO0FBQ0EsZ0JBQU0wQixXQUFXLEdBQUc1QyxvRUFBQSxFQUFwQjs7QUFDQSxnQkFBSTRCLENBQUMsQ0FBQ2tCLE1BQUYsQ0FBU3JDLFNBQVQsQ0FBbUJzQyxRQUFuQixDQUE0QixhQUE1QixDQUFKLEVBQWdEO0FBQzlDO0FBQ0FWLGNBQUFBLFNBQVMsQ0FBQ1csU0FBVixDQUNFO0FBQ0VDLGdCQUFBQSxNQUFNLEVBQUVMLFdBQVcsQ0FBQ007QUFEdEIsZUFERixFQUlFO0FBQ0VDLGdCQUFBQSxLQUFLLEVBQUVoRCxlQUFlLENBQUMsQ0FBRCxDQUR4QjtBQUVFaUQsZ0JBQUFBLEdBQUcsRUFBRXBELDZEQUFBO0FBRlAsZUFKRixFQUY4QyxDQVc5Qzs7QUFDQWdELGNBQUFBLFNBQVMsQ0FBQzdDLGVBQUQsRUFBa0JrQyxTQUFTLENBQUNpQixRQUFWLEVBQWxCLEVBQXdDMUIsQ0FBQyxDQUFDa0IsTUFBMUMsQ0FBVCxDQVo4QyxDQWE5Qzs7QUFDQSxrQkFBSTlDLHFFQUFBLE9BQWdDLENBQXBDLEVBQXVDO0FBQ3JDK0IsZ0JBQUFBLFVBQVUsQ0FBQ0gsQ0FBQyxDQUFDa0IsTUFBRixDQUFTVSxhQUFWLEVBQXlCcEQsZUFBekIsQ0FBVjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLFNBdkJEO0FBd0JELE9BekJELE1BeUJPO0FBQ0xvQyxRQUFBQSxJQUFJLENBQUNiLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUNDLENBQUQsRUFBTztBQUNwQyxjQUFJNUIseURBQUEsR0FBZ0I4QyxNQUFoQixLQUEyQixPQUEvQixFQUF3QztBQUN0QyxnQkFBTUssS0FBSyxHQUFHTSxRQUFRLENBQUNsQixDQUFELEVBQUlGLFNBQVMsQ0FBQ2lCLFFBQVYsRUFBSixDQUF0QjtBQUNBLGdCQUFNSSxLQUFLLEdBQUdyQixTQUFTLENBQUNzQixhQUFWLENBQXdCLENBQUNSLEtBQUssQ0FBQ1MsQ0FBUCxFQUFVVCxLQUFLLENBQUNVLENBQWhCLENBQXhCLENBQWQ7QUFDQUMsWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVk1QixJQUFJLEdBQUcsR0FBUCxHQUFhNkIsWUFBWSxDQUFDekIsQ0FBRCxFQUFJRixTQUFTLENBQUNpQixRQUFWLEVBQUosQ0FBekIsR0FDUixHQURRLElBQ0RJLEtBQUssR0FBRyxNQUFILEdBQVksUUFEaEIsQ0FBWjtBQUVBLGdCQUFJQSxLQUFKLEVBQVdsQixJQUFJLENBQUN5QixLQUFMLENBQVcsa0JBQVgsSUFBaUMsS0FBakM7QUFDWGpFLFlBQUFBLDZEQUFBO0FBQ0Q7QUFDRixTQVREO0FBVUQ7O0FBQUE7O0FBRUQsVUFBSW1DLElBQUksS0FBSyxRQUFiLEVBQXVCO0FBQ3JCSyxRQUFBQSxJQUFJLENBQUNiLGdCQUFMLENBQXNCLFdBQXRCLEVBQW1DLFVBQUNDLENBQUQsRUFBTztBQUN4QyxjQUFJNUIseURBQUEsR0FBZ0JrQixFQUFoQixLQUF1QixDQUEzQixFQUE4QjtBQUM1QmMsWUFBQUEsWUFBWSxDQUFDSixDQUFDLENBQUNrQixNQUFILEVBQVdaLE1BQVgsQ0FBWjtBQUNEO0FBQ0YsU0FKRDtBQU1BTSxRQUFBQSxJQUFJLENBQUNiLGdCQUFMLENBQXNCLFVBQXRCLEVBQWtDLFVBQUNDLENBQUQsRUFBTztBQUN2QyxjQUFJNUIseURBQUEsR0FBZ0JrQixFQUFoQixLQUF1QixDQUEzQixFQUE4QjtBQUM1QmEsWUFBQUEsVUFBVSxDQUFDSCxDQUFDLENBQUNrQixNQUFGLENBQVNVLGFBQVYsRUFBeUJwRCxlQUF6QixDQUFWO0FBQ0Q7QUFDRixTQUpEO0FBS0Q7QUF0RXdCOztBQWEzQixTQUFLLElBQUltQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRixTQUFTLENBQUNpQixRQUFWLEdBQXFCTCxNQUF6QyxFQUFpRFYsQ0FBQyxFQUFsRCxFQUF1RDtBQUFBLFlBQTlDQSxDQUE4QztBQTBEdEQ7O0FBRURyQyxJQUFBQSxJQUFJLENBQUMrRCxLQUFMLENBQVcsdUJBQVgscUJBQWdERSxJQUFJLENBQUNDLElBQUwsQ0FBVS9CLFNBQVMsQ0FDOURpQixRQURxRCxHQUMxQ0wsTUFEZ0MsQ0FBaEQ7QUFFRCxHQTNFRDs7QUE2RUEsTUFBTWpCLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNxQyxPQUFELEVBQVVuQyxNQUFWLEVBQXFCO0FBQ3hDLFFBQUltQyxPQUFPLEtBQUtDLFNBQWhCLEVBQTJCO0FBQ3pCLFVBQUlDLGFBQWEsR0FBR2hFLFFBQVEsQ0FBQ2lFLGdCQUFULENBQTBCLFFBQTFCLENBQXBCO0FBQ0FILE1BQUFBLE9BQU8sR0FBR0UsYUFBYSxDQUFDRSxJQUFkLENBQW1CRixhQUFhLENBQUN0QixNQUFkLEdBQXVCLENBQTFDLENBQVY7QUFDRDs7QUFDRCxRQUFJZixNQUFNLEtBQUtvQyxTQUFmLEVBQTBCO0FBQ3hCcEMsTUFBQUEsTUFBTSxHQUFHbEMsMkRBQUEsR0FBa0JrQyxNQUEzQjtBQUNEOztBQUVELFFBQU1HLFNBQVMsR0FBR0gsTUFBTSxDQUFDSSxZQUFQLEVBQWxCO0FBRUEsUUFBTXFDLFNBQVMsR0FBR2xCLFFBQVEsQ0FBQ1ksT0FBTyxDQUFDNUIsT0FBUixDQUFnQkMsTUFBakIsRUFBeUJMLFNBQVMsQ0FBQ2lCLFFBQVYsRUFBekIsQ0FBMUI7QUFDQSxRQUFNVixXQUFXLEdBQUc1QyxvRUFBQSxFQUFwQjtBQUNBLFFBQUk0RSxTQUFTLEdBQUcsSUFBaEIsQ0Fid0MsQ0FleEM7O0FBQ0FBLElBQUFBLFNBQVMsR0FBR2hGLG1GQUFBLENBQ1ZnRCxXQUFXLENBQUNNLElBREYsRUFFVjtBQUNFQyxNQUFBQSxLQUFLLEVBQUUsQ0FBQ3dCLFNBQVMsQ0FBQ2YsQ0FBWCxFQUFjZSxTQUFTLENBQUNkLENBQXhCLENBRFQ7QUFFRVQsTUFBQUEsR0FBRyxFQUFFcEQsNkRBQUE7QUFGUCxLQUZVLENBQVosQ0FoQndDLENBdUJ4Qzs7QUFDQTRFLElBQUFBLFNBQVMsR0FBR2hGLCtFQUFBLENBQTRCZ0YsU0FBNUIsRUFDVnZDLFNBQVMsQ0FBQ2lCLFFBQVYsRUFEVSxDQUFaLENBeEJ3QyxDQTJCeEM7O0FBQ0FuRCxJQUFBQSxlQUFlLEdBQUd5RSxTQUFsQixDQTVCd0MsQ0E4QnhDOztBQUNBLFFBQUlHLFlBQVksR0FBRyxFQUFuQjs7QUFDQSxRQUFJO0FBQ0ZuRixNQUFBQSw2RUFBQSxDQUEwQmdGLFNBQTFCLEVBQXFDdkMsU0FBUyxDQUFDaUIsUUFBVixFQUFyQztBQUNBeUIsTUFBQUEsWUFBWSxHQUFHLENBQUMsa0JBQUQsRUFBcUIsYUFBckIsQ0FBZjtBQUNELEtBSEQsQ0FJQSxPQUFPRSxLQUFQLEVBQWM7QUFDWm5CLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZa0IsS0FBWjs7QUFDQSxVQUFJQSxLQUFLLEtBQUssZUFBZCxFQUErQjtBQUM3QkYsUUFBQUEsWUFBWSxHQUFHLENBQUMsMkJBQUQsRUFDYixzQkFEYSxDQUFmO0FBRUQsT0FIRCxNQUdPLElBQUlFLEtBQUssS0FBSyxlQUFkLEVBQStCO0FBQ3BDRixRQUFBQSxZQUFZLEdBQUcsQ0FBQyxzQkFBRCxFQUNiLGlCQURhLENBQWY7QUFFRDtBQUNGOztBQUNESCxJQUFBQSxTQUFTLENBQUNwRCxPQUFWLENBQWtCLFVBQUEwRCxVQUFVLEVBQUk7QUFDOUIsVUFBTUMsU0FBUyxHQUFHdkYsbUZBQUEsQ0FDaEIsQ0FBQ3NGLFVBQVUsQ0FBQyxDQUFELENBQVgsRUFBZ0JBLFVBQVUsQ0FBQyxDQUFELENBQTFCLENBRGdCLEVBQ2dCN0MsU0FBUyxDQUFDaUIsUUFBVixFQURoQixDQUFsQjtBQUdBZSxNQUFBQSxPQUFPLENBQUNiLGFBQVIsQ0FBc0JqQyxVQUF0QixDQUFpQ2tELElBQWpDLENBQXNDVSxTQUF0QyxFQUNFMUUsU0FERixDQUNZQyxHQURaLENBQ2dCcUUsWUFBWSxDQUFDLENBQUQsQ0FENUI7QUFFRCxLQU5EO0FBT0FWLElBQUFBLE9BQU8sQ0FBQzVELFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCcUUsWUFBWSxDQUFDLENBQUQsQ0FBbEM7QUFDRCxHQXRERDs7QUF3REEsTUFBTWYsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ3FCLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUNyQyxRQUFNQyxRQUFRLEdBQUczRixtRkFBQSxDQUFnQ3lGLEtBQWhDLEVBQXVDQyxLQUF2QyxDQUFqQjtBQUNBLFFBQU1HLFNBQVMsY0FBT0YsUUFBUSxDQUFDM0IsQ0FBaEIsZUFBc0IyQixRQUFRLENBQUMxQixDQUEvQixNQUFmO0FBQ0EsV0FBTzRCLFNBQVA7QUFDRCxHQUpEOztBQU1BLE1BQU1oQyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDNEIsS0FBRCxFQUFRQyxLQUFSLEVBQWtCO0FBQ2pDLFFBQU1DLFFBQVEsR0FBRzNGLG1GQUFBLENBQWdDeUYsS0FBaEMsRUFBdUNDLEtBQXZDLENBQWpCO0FBQ0EsV0FBTztBQUNMMUIsTUFBQUEsQ0FBQyxFQUFFMkIsUUFBUSxDQUFDM0IsQ0FEUDtBQUVMQyxNQUFBQSxDQUFDLEVBQUUwQixRQUFRLENBQUMxQjtBQUZQLEtBQVA7QUFJRCxHQU5EOztBQVFBLE1BQU1iLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUM0QixTQUFELEVBQVlVLEtBQVosRUFBbUJqQixPQUFuQixFQUErQjtBQUMvQyxRQUFNcUIsTUFBTSxHQUFHckIsT0FBTyxDQUFDYixhQUF2QjtBQUNBb0IsSUFBQUEsU0FBUyxDQUFDcEQsT0FBVixDQUFrQixVQUFBMkIsS0FBSyxFQUFJO0FBQ3pCdUMsTUFBQUEsTUFBTSxDQUFDbkUsVUFBUCxDQUFrQjNCLG1GQUFBLENBQ2hCdUQsS0FEZ0IsRUFDVG1DLEtBRFMsQ0FBbEIsRUFFRzdFLFNBRkgsQ0FFYUMsR0FGYixDQUVpQixlQUZqQjtBQUdELEtBSkQ7QUFLRCxHQVBEOztBQVNBLE1BQU1xQixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDMkQsTUFBRCxFQUFTQyxTQUFULEVBQXVCO0FBQ3hDRCxJQUFBQSxNQUFNLENBQUNuRSxVQUFQLENBQWtCQyxPQUFsQixDQUEwQixVQUFBQyxLQUFLLEVBQUk7QUFBQTs7QUFDakMsVUFBSSxPQUFPa0UsU0FBUCxLQUFxQixRQUF6QixFQUNFbEUsS0FBSyxDQUFDaEIsU0FBTixDQUFnQmlCLE1BQWhCLENBQXVCaUUsU0FBdkIsRUFERixLQUdFLG9CQUFBbEUsS0FBSyxDQUFDaEIsU0FBTixFQUFnQmlCLE1BQWhCLDRDQUEwQmlFLFNBQTFCO0FBQ0gsS0FMRDtBQU1ELEdBUEQ7O0FBU0EsU0FBTztBQUNMdEYsSUFBQUEsVUFBVSxFQUFWQSxVQURLO0FBRUw0QixJQUFBQSxRQUFRLEVBQVJBO0FBRkssR0FBUDtBQUlELENBOU5lLEVBQWhCOztBQWdPQSxpRUFBZWhDLE9BQWY7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck9BO0FBRU8sSUFBTUgsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDOEYsTUFBRCxFQUFTQyxTQUFULEVBQXVCO0FBQ2xELE1BQU0xRCxJQUFJLEdBQUd5RCxNQUFiO0FBQ0EsTUFBTXZELFNBQVMsR0FBR3hDLGdCQUFnQixDQUFDZ0csU0FBRCxDQUFsQztBQUNBLE1BQU1DLGNBQWMsR0FBRyxFQUF2Qjs7QUFFQSxNQUFNeEQsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUFFLFdBQU9ELFNBQVA7QUFBbUIsR0FBaEQ7O0FBRUEsTUFBTUQsT0FBTyxHQUFHLFNBQVZBLE9BQVUsR0FBTTtBQUFFLFdBQU9ELElBQVA7QUFBYyxHQUF0Qzs7QUFFQSxNQUFNNEQsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQzVDLEtBQUQsRUFBUTZDLFdBQVIsRUFBd0I7QUFDckMsUUFBSUMsZUFBZSxHQUFHLEtBQXRCO0FBQ0FILElBQUFBLGNBQWMsQ0FBQ3RFLE9BQWYsQ0FBdUIsVUFBQWdCLElBQUksRUFBSTtBQUM3QixVQUFJNUMsaUZBQUEsQ0FBMEI0QyxJQUExQixFQUFnQ1csS0FBaEMsQ0FBSixFQUE0QztBQUMxQzhDLFFBQUFBLGVBQWUsR0FBRyxJQUFsQjtBQUNEO0FBQ0YsS0FKRDs7QUFLQSxRQUFJLENBQUNBLGVBQUwsRUFBc0I7QUFDcEIsVUFBSTtBQUNGRCxRQUFBQSxXQUFXLENBQUMxRCxZQUFaLEdBQTJCcUIsYUFBM0IsQ0FBeUNSLEtBQXpDO0FBQ0EyQyxRQUFBQSxjQUFjLENBQUNLLElBQWYsQ0FBb0JoRCxLQUFwQjtBQUNBLGVBQU8sSUFBUDtBQUNELE9BSkQsQ0FJRSxPQUFPdkIsQ0FBUCxFQUFVO0FBQ1YsY0FBT0EsQ0FBUDtBQUNEO0FBQ0YsS0FSRCxNQVFPO0FBQ0wsWUFBTSxrQkFBTjtBQUNEO0FBQ0YsR0FsQkQ7O0FBb0JBLFNBQU87QUFDTFUsSUFBQUEsWUFBWSxFQUFaQSxZQURLO0FBRUxGLElBQUFBLE9BQU8sRUFBUEEsT0FGSztBQUdMMkQsSUFBQUEsTUFBTSxFQUFOQTtBQUhLLEdBQVA7QUFLRCxDQWxDTSxFQW9DUDs7QUFDTyxJQUFNaEcsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3FHLEtBQUQsRUFBVztBQUNwQyxNQUFNbkQsTUFBTSxHQUFHbUQsS0FBSyxDQUFDbkQsTUFBckI7QUFDQSxNQUFNb0QsSUFBSSxHQUFHRCxLQUFLLENBQUNFLFdBQU4sSUFBcUIsRUFBbEM7O0FBRUEsTUFBTUMsR0FBRyxHQUFHLFNBQU5BLEdBQU0sQ0FBQ3BELEtBQUQsRUFBVztBQUNyQixRQUFJLENBQUNrRCxJQUFJLENBQUNHLFFBQUwsQ0FBY3JELEtBQWQsQ0FBTCxFQUEyQjtBQUN6QmtELE1BQUFBLElBQUksQ0FBQ0YsSUFBTCxDQUFVaEQsS0FBVjtBQUNBLGFBQU8sSUFBUDtBQUNELEtBSEQsTUFHTztBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0YsR0FQRDs7QUFTQSxNQUFNc0QsTUFBTSxHQUFHLFNBQVRBLE1BQVMsR0FBTTtBQUNuQixXQUFPSixJQUFJLENBQUNwRCxNQUFMLEtBQWdCQSxNQUF2QjtBQUNELEdBRkQ7O0FBSUEsU0FBTztBQUNMc0QsSUFBQUEsR0FBRyxFQUFIQSxHQURLO0FBRUxFLElBQUFBLE1BQU0sRUFBTkE7QUFGSyxHQUFQO0FBSUQsQ0FyQk07QUF1QkEsSUFBTTVHLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ3FELElBQUQsRUFBVTtBQUN4QyxNQUFJb0MsS0FBSyxHQUFHLEVBQVo7O0FBQ0EsTUFBTWpGLFVBQVUsR0FBSSxZQUFNO0FBQ3hCLFNBQUssSUFBSWtDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdXLElBQXBCLEVBQTBCWCxDQUFDLEVBQTNCLEVBQStCO0FBQzdCLFdBQUssSUFBSW1FLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd4RCxJQUFwQixFQUEwQndELENBQUMsRUFBM0IsRUFBK0I7QUFDN0JwQixRQUFBQSxLQUFLLENBQUNhLElBQU4sQ0FBVztBQUNUaEQsVUFBQUEsS0FBSyxFQUFFLENBQUN1RCxDQUFELEVBQUluRSxDQUFKLENBREU7QUFFVGdFLFVBQUFBLEdBQUcsRUFBRSxDQUZJO0FBR1RJLFVBQUFBLE1BQU0sRUFBRTtBQUhDLFNBQVg7QUFLRDtBQUNGO0FBQ0YsR0FWa0IsRUFBbkI7O0FBWUEsTUFBTUMsS0FBSyxHQUFHLEVBQWQ7O0FBRUEsTUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUN6QixRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUNBRixJQUFBQSxLQUFLLENBQUNwRixPQUFOLENBQWMsVUFBQXVGLElBQUksRUFBSTtBQUNwQixVQUFJLENBQUNBLElBQUksQ0FBQ04sTUFBTCxFQUFMLEVBQW9CSyxJQUFJLEdBQUcsS0FBUDtBQUNyQixLQUZEO0FBR0EsV0FBT0EsSUFBUDtBQUNELEdBTkQsQ0FoQndDLENBd0J4QztBQUNBOzs7QUFDQSxNQUFNOUQsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ2dFLFNBQUQsRUFBWUMsYUFBWixFQUE4QjtBQUM5QyxRQUFJQyxZQUFZLEdBQUcsSUFBbkI7QUFDQSxRQUFJQyxZQUFZLEdBQUc3QyxTQUFuQjs7QUFDQSxRQUFJO0FBQ0Y2QyxNQUFBQSxZQUFZLEdBQUd2SCxxRkFBQSxDQUNib0gsU0FBUyxDQUFDL0QsTUFERyxFQUNLZ0UsYUFETCxFQUNvQjNCLEtBRHBCLENBQWY7QUFFQTRCLE1BQUFBLFlBQVksR0FBR04sS0FBSyxDQUFDVCxJQUFOLENBQVdwRyxXQUFXLENBQUNpSCxTQUFELENBQXRCLElBQXFDLENBQXBEO0FBQ0ExQixNQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQytCLEdBQU4sQ0FBVSxVQUFBN0UsSUFBSSxFQUFJO0FBQ3hCLFlBQUk4RSxPQUFPLEdBQUc5RSxJQUFkO0FBQ0EyRSxRQUFBQSxZQUFZLENBQUMzRixPQUFiLENBQXFCLFVBQUEyQixLQUFLLEVBQUk7QUFDNUIsY0FBSXZELGlGQUFBLENBQTBCNEMsSUFBSSxDQUFDVyxLQUEvQixFQUFzQ0EsS0FBdEMsQ0FBSixFQUFrRDtBQUNoRG1FLFlBQUFBLE9BQU8sR0FBRztBQUNSbkUsY0FBQUEsS0FBSyxFQUFFQSxLQURDO0FBRVJvRCxjQUFBQSxHQUFHLEVBQUUsQ0FGRztBQUdSSSxjQUFBQSxNQUFNLEVBQUVPO0FBSEEsYUFBVjtBQUtEO0FBQ0YsU0FSRDtBQVNBLGVBQU9JLE9BQVA7QUFDRCxPQVpPLENBQVI7QUFhQSxhQUFPLElBQVA7QUFDRCxLQWxCRCxDQWtCRSxPQUFPMUYsQ0FBUCxFQUFVO0FBQ1YsWUFBT0EsQ0FBUDtBQUNEO0FBQ0YsR0F4QkQ7O0FBMEJBLE1BQU0rQixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNSLEtBQUQsRUFBVztBQUMvQixRQUFNa0MsS0FBSyxHQUFHekYsdUZBQUEsQ0FBZ0N1RCxLQUFoQyxFQUF1Q21DLEtBQXZDLENBQWQ7O0FBQ0EsUUFBSUEsS0FBSyxDQUFDRCxLQUFELENBQUwsQ0FBYWtCLEdBQWIsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsWUFBTSxhQUFOO0FBQ0Q7O0FBQ0QsUUFBTUksTUFBTSxHQUFHckIsS0FBSyxDQUFDRCxLQUFELENBQUwsQ0FBYXNCLE1BQTVCOztBQUNBLFFBQUlBLE1BQU0sS0FBSyxJQUFmLEVBQXFCO0FBQ25CckIsTUFBQUEsS0FBSyxDQUFDRCxLQUFELENBQUwsQ0FBYWtCLEdBQWIsR0FBbUIsQ0FBQyxDQUFwQjtBQUNBLGFBQU8sS0FBUDtBQUNELEtBSEQsTUFHTztBQUNMakIsTUFBQUEsS0FBSyxDQUFDRCxLQUFELENBQUwsQ0FBYWtCLEdBQWIsR0FBbUIsQ0FBbkI7QUFDQUssTUFBQUEsS0FBSyxDQUFDRCxNQUFELENBQUwsQ0FBY0osR0FBZCxDQUFrQnBELEtBQWxCO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRixHQWREOztBQWdCQSxNQUFNRyxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQUUsV0FBT2dDLEtBQVA7QUFBYyxHQUF2Qzs7QUFFQSxTQUFPO0FBQ0x1QixJQUFBQSxZQUFZLEVBQVpBLFlBREs7QUFFTDdELElBQUFBLFNBQVMsRUFBVEEsU0FGSztBQUdMVyxJQUFBQSxhQUFhLEVBQWJBLGFBSEs7QUFJTEwsSUFBQUEsUUFBUSxFQUFSQTtBQUpLLEdBQVA7QUFNRCxDQTVFTTs7Ozs7Ozs7Ozs7Ozs7OztBQzlEUDtBQUNBOztBQUVBLElBQU10RCxJQUFJLEdBQUksWUFBTTtBQUNsQixNQUFNdUgsTUFBTSxHQUFHLENBQ2I7QUFDRXJHLElBQUFBLEVBQUUsRUFBRSxDQUROO0FBRUU0QixJQUFBQSxNQUFNLEVBQUUsSUFGVjtBQUdFWCxJQUFBQSxJQUFJLEVBQUU7QUFIUixHQURhLEVBTWI7QUFDRWpCLElBQUFBLEVBQUUsRUFBRSxDQUROO0FBRUU0QixJQUFBQSxNQUFNLEVBQUUsT0FGVjtBQUdFWCxJQUFBQSxJQUFJLEVBQUU7QUFIUixHQU5hLEVBV2I7QUFDRWpCLElBQUFBLEVBQUUsRUFBRSxDQUROO0FBRUU0QixJQUFBQSxNQUFNLEVBQUUsUUFGVjtBQUdFWCxJQUFBQSxJQUFJLEVBQUU7QUFIUixHQVhhLEVBZ0JiO0FBQ0VqQixJQUFBQSxFQUFFLEVBQUUsQ0FETjtBQUVFNEIsSUFBQUEsTUFBTSxFQUFFLElBRlY7QUFHRVgsSUFBQUEsSUFBSSxFQUFFO0FBSFIsR0FoQmEsQ0FBZjtBQXNCQSxNQUFJcUYsb0JBQW9CLEdBQUcsSUFBM0I7QUFDQSxNQUFJQyxLQUFLLEdBQUdGLE1BQU0sQ0FBQyxDQUFELENBQWxCO0FBQ0EsTUFBTUcsUUFBUSxHQUFHLENBQ2Y7QUFBRXZGLElBQUFBLElBQUksRUFBRSxTQUFSO0FBQW1CZSxJQUFBQSxJQUFJLEVBQUU7QUFBekIsR0FEZSxFQUVmO0FBQUVmLElBQUFBLElBQUksRUFBRSxZQUFSO0FBQXNCZSxJQUFBQSxJQUFJLEVBQUU7QUFBNUIsR0FGZSxFQUdmO0FBQUVmLElBQUFBLElBQUksRUFBRSxXQUFSO0FBQXFCZSxJQUFBQSxJQUFJLEVBQUU7QUFBM0IsR0FIZSxFQUlmO0FBQUVmLElBQUFBLElBQUksRUFBRSxXQUFSO0FBQXFCZSxJQUFBQSxJQUFJLEVBQUU7QUFBM0IsR0FKZSxFQUtmO0FBQUVmLElBQUFBLElBQUksRUFBRSxhQUFSO0FBQXVCZSxJQUFBQSxJQUFJLEVBQUU7QUFBN0IsR0FMZSxDQUFqQjtBQU9BLE1BQUlOLFdBQVcsR0FBRyxDQUFsQjtBQUNBLE1BQUkrRSxTQUFTLEdBQUcsR0FBaEI7QUFDQSxNQUFJQyxPQUFPLEdBQUcsSUFBZDtBQUNBLE1BQUlDLE1BQU0sR0FBRyxJQUFiOztBQUVBLE1BQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFRLEdBQU07QUFDbEJGLElBQUFBLE9BQU8sR0FBRzlILGdFQUFhLENBQUMsUUFBRCxFQUFXLEVBQVgsQ0FBdkI7QUFDQStILElBQUFBLE1BQU0sR0FBRy9ILGdFQUFhLENBQUMsT0FBRCxFQUFVLEVBQVYsQ0FBdEI7QUFDQTBILElBQUFBLG9CQUFvQixHQUFHSSxPQUFPLENBQUN0RixZQUFSLEdBQXVCZ0IsUUFBdkIsRUFBdkI7QUFFQXJELElBQUFBLDREQUFBLENBQWlCMkgsT0FBakI7QUFDQTNILElBQUFBLDREQUFBLENBQWlCNEgsTUFBakI7QUFFQUUsSUFBQUEsZ0JBQWdCLENBQUNGLE1BQUQsQ0FBaEI7QUFDRCxHQVREOztBQVdBLE1BQU1oRixtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLEdBQU07QUFDaEMsV0FBTzZFLFFBQVEsQ0FBQzlFLFdBQUQsQ0FBZjtBQUNELEdBRkQ7O0FBSUEsTUFBTVcsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixHQUFNO0FBQ2pDLFFBQUlYLFdBQVcsR0FBRyxDQUFsQixFQUFxQjtBQUNuQkEsTUFBQUEsV0FBVztBQUNYLGFBQU8sQ0FBUDtBQUNELEtBSEQsTUFHTztBQUNMNkUsTUFBQUEsS0FBSyxHQUFHRixNQUFNLENBQUMsQ0FBRCxDQUFkO0FBQ0F6RCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWTBELEtBQUssQ0FBQ3RGLElBQWxCO0FBQ0EsYUFBTyxDQUFQO0FBQ0Q7QUFDRixHQVREOztBQVdBLE1BQU0rQixZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3pCLFFBQUkwRCxPQUFPLENBQUN0RixZQUFSLEdBQXVCdUUsWUFBdkIsRUFBSixFQUEyQztBQUN6Q21CLE1BQUFBLEtBQUssQ0FBQyxhQUFELENBQUw7QUFDQVAsTUFBQUEsS0FBSyxHQUFHRixNQUFNLENBQUMsQ0FBRCxDQUFkO0FBRUQsS0FKRCxNQUlPLElBQUlNLE1BQU0sQ0FBQ3ZGLFlBQVAsR0FBc0J1RSxZQUF0QixFQUFKLEVBQTBDO0FBQy9DbUIsTUFBQUEsS0FBSyxDQUFDLGNBQUQsQ0FBTDtBQUNBUCxNQUFBQSxLQUFLLEdBQUdGLE1BQU0sQ0FBQyxDQUFELENBQWQ7QUFDRCxLQUhNLE1BR0E7QUFDTCxVQUFJRSxLQUFLLENBQUN2RyxFQUFOLEtBQWEsQ0FBakIsRUFBb0I7QUFDbEJ1RyxRQUFBQSxLQUFLLEdBQUdGLE1BQU0sQ0FBQyxDQUFELENBQWQ7QUFDQVUsUUFBQUEsaUJBQWlCO0FBQ2xCLE9BSEQsTUFHTztBQUNMUixRQUFBQSxLQUFLLEdBQUdGLE1BQU0sQ0FBQyxDQUFELENBQWQ7QUFDRDtBQUNGOztBQUNEekQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkwRCxLQUFLLENBQUN0RixJQUFsQjtBQUNELEdBakJEOztBQW1CQSxNQUFNUSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxHQUFNO0FBQ3JCLFdBQU84RSxLQUFQO0FBQ0QsR0FGRDs7QUFJQSxNQUFNcEUsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUN6QixXQUFPc0UsU0FBUDtBQUNELEdBRkQ7O0FBSUEsTUFBTTdGLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtBQUM1QixRQUFJNkYsU0FBUyxLQUFLLEdBQWxCLEVBQXVCQSxTQUFTLEdBQUcsR0FBWixDQUF2QixLQUNLQSxTQUFTLEdBQUcsR0FBWjtBQUNOLEdBSEQ7O0FBS0EsTUFBTWpELFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07QUFDdkIsV0FBTztBQUNMeEMsTUFBQUEsTUFBTSxFQUFFMEYsT0FESDtBQUVMTSxNQUFBQSxLQUFLLEVBQUVMO0FBRkYsS0FBUDtBQUlELEdBTEQ7O0FBT0EsTUFBTUUsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUFDN0YsTUFBRCxFQUFZO0FBQ25DLFFBQU0yRCxTQUFTLEdBQUcxQixJQUFJLENBQUNDLElBQUwsQ0FBVWxDLE1BQU0sQ0FBQ0ksWUFBUCxHQUFzQmdCLFFBQXRCLEdBQWlDTCxNQUEzQyxDQUFsQjtBQUNBeUUsSUFBQUEsUUFBUSxDQUFDbEcsT0FBVCxDQUFpQixVQUFBdUYsSUFBSSxFQUFJO0FBQ3ZCLFVBQUlvQixPQUFPLEdBQUcsS0FBZDs7QUFDQSxhQUFPQSxPQUFPLEtBQUssS0FBbkIsRUFBMEI7QUFDeEIsWUFBSWhFLElBQUksQ0FBQ2lFLEtBQUwsQ0FBV2pFLElBQUksQ0FBQ2tFLE1BQUwsS0FBZ0IsQ0FBM0IsTUFBa0MsQ0FBdEMsRUFBeUN2RyxlQUFlO0FBQ3hELFlBQUl3RyxNQUFNLEdBQUcsSUFBYjtBQUNBLFlBQUlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLFlBQUlaLFNBQVMsS0FBSyxHQUFsQixFQUF1QjtBQUNyQlcsVUFBQUEsTUFBTSxHQUFHbkUsSUFBSSxDQUFDaUUsS0FBTCxDQUFXakUsSUFBSSxDQUFDa0UsTUFBTCxNQUFpQnhDLFNBQVMsSUFBSWtCLElBQUksQ0FBQzdELElBQUwsR0FBWSxDQUFoQixDQUExQixDQUFYLENBQVQ7QUFDQXFGLFVBQUFBLE1BQU0sR0FBR3BFLElBQUksQ0FBQ2lFLEtBQUwsQ0FBV2pFLElBQUksQ0FBQ2tFLE1BQUwsS0FBaUJ4QyxTQUE1QixDQUFUO0FBQ0QsU0FIRCxNQUdPO0FBQ0x5QyxVQUFBQSxNQUFNLEdBQUduRSxJQUFJLENBQUNpRSxLQUFMLENBQVdqRSxJQUFJLENBQUNrRSxNQUFMLEtBQWlCeEMsU0FBNUIsQ0FBVDtBQUNBMEMsVUFBQUEsTUFBTSxHQUFHcEUsSUFBSSxDQUFDaUUsS0FBTCxDQUFXakUsSUFBSSxDQUFDa0UsTUFBTCxNQUFpQnhDLFNBQVMsSUFBSWtCLElBQUksQ0FBQzdELElBQUwsR0FBWSxDQUFoQixDQUExQixDQUFYLENBQVQ7QUFDRDs7QUFDRCxZQUFJO0FBQ0YsY0FBSWhCLE1BQU0sQ0FBQ0ksWUFBUCxHQUFzQlUsU0FBdEIsQ0FDRjtBQUNFQyxZQUFBQSxNQUFNLEVBQUU4RCxJQUFJLENBQUM3RDtBQURmLFdBREUsRUFJRjtBQUNFQyxZQUFBQSxLQUFLLEVBQUUsQ0FBQ21GLE1BQUQsRUFBU0MsTUFBVCxDQURUO0FBRUVuRixZQUFBQSxHQUFHLEVBQUV1RTtBQUZQLFdBSkUsQ0FBSixFQVFHO0FBQ0RRLFlBQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0Q7QUFDRixTQVpELENBWUUsZ0JBQU07QUFDTnJFLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0Q7QUFDRjtBQUNGLEtBN0JEO0FBOEJELEdBaENEOztBQWtDQSxNQUFNa0UsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixHQUFNO0FBQzlCLFFBQU1PLFdBQVcsR0FBR3JFLElBQUksQ0FBQ2lFLEtBQUwsQ0FBV2pFLElBQUksQ0FBQ2tFLE1BQUwsS0FBZ0JiLG9CQUFvQixDQUFDdkUsTUFBaEQsQ0FBcEI7QUFDQSxRQUFNd0YsVUFBVSxHQUFHakIsb0JBQW9CLENBQUNrQixNQUFyQixDQUE0QkYsV0FBNUIsRUFBeUMsQ0FBekMsRUFBNEMsQ0FBNUMsQ0FBbkI7QUFDQVosSUFBQUEsT0FBTyxDQUFDdEYsWUFBUixHQUF1QnFCLGFBQXZCLENBQXFDOEUsVUFBVSxDQUFDdEYsS0FBaEQ7QUFDQWUsSUFBQUEsWUFBWTtBQUNiLEdBTEQ7O0FBT0EsU0FBTztBQUNMNEQsSUFBQUEsS0FBSyxFQUFMQSxLQURLO0FBRUxqRixJQUFBQSxtQkFBbUIsRUFBbkJBLG1CQUZLO0FBR0xVLElBQUFBLG9CQUFvQixFQUFwQkEsb0JBSEs7QUFJTFcsSUFBQUEsWUFBWSxFQUFaQSxZQUpLO0FBS0x2QixJQUFBQSxRQUFRLEVBQVJBLFFBTEs7QUFNTFUsSUFBQUEsWUFBWSxFQUFaQSxZQU5LO0FBT0x2QixJQUFBQSxlQUFlLEVBQWZBLGVBUEs7QUFRTDRDLElBQUFBLFVBQVUsRUFBVkE7QUFSSyxHQUFQO0FBVUQsQ0F6SlksRUFBYjs7QUEySkEsaUVBQWUxRSxJQUFmOzs7Ozs7Ozs7Ozs7OztBQzlKQSxJQUFNSixhQUFhLEdBQUksWUFBTTtBQUMzQixNQUFNc0csV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FBQ3lDLE1BQUQsRUFBU0MsTUFBVCxFQUFvQjtBQUN0QyxXQUFRQyxJQUFJLENBQUNDLFNBQUwsQ0FBZUgsTUFBZixNQUEyQkUsSUFBSSxDQUFDQyxTQUFMLENBQWVGLE1BQWYsQ0FBNUIsR0FDSCxJQURHLEdBQ0ksS0FEWDtBQUVELEdBSEQ7O0FBS0EsTUFBTTVELFdBQVcsR0FBRyxTQUFkQSxXQUFjLENBQUNKLFNBQUQsRUFBWVUsS0FBWixFQUFzQjtBQUN4QyxRQUFJeUQsTUFBTSxHQUFHLElBQWI7QUFDQW5FLElBQUFBLFNBQVMsQ0FBQ3BELE9BQVYsQ0FBa0IsVUFBQTJCLEtBQUssRUFBSTtBQUN6QixVQUFNNkYsU0FBUyxHQUFHMUQsS0FBSyxDQUFDRixpQkFBaUIsQ0FBQ2pDLEtBQUQsRUFBUW1DLEtBQVIsQ0FBbEIsQ0FBdkI7O0FBQ0EsVUFBSTBELFNBQVMsQ0FBQ3JDLE1BQVYsS0FBcUIsSUFBekIsRUFBK0I7QUFDN0JvQyxRQUFBQSxNQUFNLEdBQUcsS0FBVDtBQUNBLGNBQU0sZUFBTjtBQUNEO0FBQ0YsS0FORDtBQU9BLFdBQU9BLE1BQVA7QUFDRCxHQVZELENBTjJCLENBa0J6Qjs7O0FBQ0YsTUFBTTNCLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ25FLE1BQUQsRUFBU2dFLGFBQVQsRUFBd0IzQixLQUF4QixFQUFrQztBQUN4RCxRQUFNMkQsTUFBTSxHQUFHLEVBQWY7O0FBRHdELCtCQUUvQzFHLENBRitDO0FBR3RELFVBQUkyRyxPQUFPLEdBQUdqQyxhQUFhLENBQUM5RCxLQUFkLENBQW9CLENBQXBCLENBQWQ7QUFDQSxVQUFJZ0csT0FBTyxHQUFHbEMsYUFBYSxDQUFDOUQsS0FBZCxDQUFvQixDQUFwQixDQUFkO0FBQ0E4RCxNQUFBQSxhQUFhLENBQUM3RCxHQUFkLEtBQXNCLEdBQXRCLEdBQ0k4RixPQUFPLElBQUkzRyxDQURmLEdBRUk0RyxPQUFPLElBQUk1RyxDQUZmO0FBR0EsVUFBTTZHLFlBQVksR0FBRzlELEtBQUssQ0FBQytELElBQU4sQ0FBVyxVQUFBN0csSUFBSTtBQUFBLGVBQ2xDMEQsV0FBVyxDQUFDMUQsSUFBSSxDQUFDVyxLQUFOLEVBQWEsQ0FBQytGLE9BQUQsRUFBVUMsT0FBVixDQUFiLENBRHVCO0FBQUEsT0FBZixDQUFyQjtBQUlBLFVBQUksQ0FBQ0MsWUFBTCxFQUFtQixNQUFNLGVBQU4sQ0FBbkIsS0FDSyxJQUFJQSxZQUFZLENBQUN6QyxNQUFiLEtBQXdCLElBQTVCLEVBQWtDLE1BQU0sZUFBTixDQUFsQyxLQUNBO0FBQ0g7QUFDQXNDLFFBQUFBLE1BQU0sQ0FBQzlDLElBQVAsQ0FBWSxDQUFDK0MsT0FBRCxFQUFVQyxPQUFWLENBQVo7QUFDRDtBQWpCcUQ7O0FBRXhELFNBQUssSUFBSTVHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdVLE1BQXBCLEVBQTRCVixDQUFDLEVBQTdCLEVBQWlDO0FBQUEsWUFBeEJBLENBQXdCO0FBZ0JoQzs7QUFDRCxXQUFPMEcsTUFBUDtBQUNELEdBcEJEOztBQXNCQSxNQUFNcEUsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDNUIsTUFBRCxFQUFTZ0UsYUFBVCxFQUEyQjtBQUNuRCxRQUFJcUMsYUFBYSxHQUFHLElBQXBCO0FBQ0EsUUFBTWxHLEdBQUcsR0FBRzZELGFBQWEsQ0FBQzdELEdBQTFCOztBQUNBLFFBQUlBLEdBQUcsS0FBSyxHQUFaLEVBQWlCO0FBQ2ZrRyxNQUFBQSxhQUFhLEdBQUcsQ0FDZHJDLGFBQWEsQ0FBQzlELEtBQWQsQ0FBb0IsQ0FBcEIsSUFBeUJnQixJQUFJLENBQUNpRSxLQUFMLENBQVcsQ0FBQ25GLE1BQU0sR0FBRyxDQUFWLElBQWEsQ0FBeEIsQ0FEWCxFQUVkZ0UsYUFBYSxDQUFDOUQsS0FBZCxDQUFvQixDQUFwQixDQUZjLENBQWhCO0FBSUQsS0FMRCxNQUtPLElBQUlDLEdBQUcsS0FBSyxHQUFaLEVBQWlCO0FBQ3RCa0csTUFBQUEsYUFBYSxHQUFHLENBQ2RyQyxhQUFhLENBQUM5RCxLQUFkLENBQW9CLENBQXBCLENBRGMsRUFFZDhELGFBQWEsQ0FBQzlELEtBQWQsQ0FBb0IsQ0FBcEIsSUFBeUJnQixJQUFJLENBQUNpRSxLQUFMLENBQVcsQ0FBQ25GLE1BQU0sR0FBRyxDQUFWLElBQWEsQ0FBeEIsQ0FGWCxDQUFoQjtBQUlELEtBTE0sTUFLQTtBQUNMLFlBQU0scURBQU47QUFDRDs7QUFDRCxRQUFJc0csVUFBVSxHQUFHLEVBQWpCOztBQUNBLFNBQUssSUFBSWhILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdVLE1BQXBCLEVBQTRCVixDQUFDLEVBQTdCLEVBQWtDO0FBQ2hDLFVBQU0rRixNQUFNLEdBQUlsRixHQUFHLEtBQUssR0FBVCxHQUNYa0csYUFBYSxDQUFDLENBQUQsQ0FBYixHQUFtQi9HLENBRFIsR0FFWCtHLGFBQWEsQ0FBQyxDQUFELENBRmpCO0FBR0EsVUFBTWYsTUFBTSxHQUFJbkYsR0FBRyxLQUFLLEdBQVQsR0FDWGtHLGFBQWEsQ0FBQyxDQUFELENBQWIsR0FBbUIvRyxDQURSLEdBRVgrRyxhQUFhLENBQUMsQ0FBRCxDQUZqQjtBQUdBQyxNQUFBQSxVQUFVLENBQUNwRCxJQUFYLENBQWdCLENBQUNtQyxNQUFELEVBQVNDLE1BQVQsQ0FBaEI7QUFDRDs7QUFDRCxXQUFPZ0IsVUFBUDtBQUNELEdBM0JEOztBQTZCQSxNQUFNbkUsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDakMsS0FBRCxFQUFRbUMsS0FBUixFQUFrQjtBQUMxQyxRQUFNRCxLQUFLLEdBQUdsQyxLQUFLLENBQUMsQ0FBRCxDQUFMLEdBQVdnQixJQUFJLENBQUNDLElBQUwsQ0FBVWtCLEtBQUssQ0FBQ3JDLE1BQWhCLENBQVgsR0FBcUNFLEtBQUssQ0FBQyxDQUFELENBQXhEOztBQUNBLFFBQUlrQyxLQUFLLEdBQUdDLEtBQUssQ0FBQ3JDLE1BQU4sR0FBZSxDQUF2QixJQUE0Qm9DLEtBQUssR0FBRyxDQUF4QyxFQUEyQztBQUN6QyxZQUFNLDRCQUFOO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsYUFBT0EsS0FBUDtBQUNEO0FBQ0YsR0FQRDs7QUFTQSxNQUFNRyxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNILEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUMxQyxRQUFNcEMsSUFBSSxHQUFHaUIsSUFBSSxDQUFDQyxJQUFMLENBQVVrQixLQUFLLENBQUNyQyxNQUFoQixDQUFiO0FBQ0EsUUFBTVcsQ0FBQyxHQUFHeUIsS0FBSyxHQUFHbkMsSUFBbEI7QUFDQSxRQUFNVyxDQUFDLEdBQUdNLElBQUksQ0FBQ2lFLEtBQUwsQ0FBVy9DLEtBQUssR0FBR25DLElBQW5CLENBQVY7QUFFQSxXQUFPO0FBQUVVLE1BQUFBLENBQUMsRUFBRUEsQ0FBTDtBQUFRQyxNQUFBQSxDQUFDLEVBQUVBO0FBQVgsS0FBUDtBQUNELEdBTkQ7O0FBUUEsTUFBTTJGLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQzVFLFNBQUQsRUFBWTZFLE1BQVosRUFBdUIsQ0FFNUMsQ0FGRDs7QUFJQSxNQUFNM0UsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDRixTQUFELEVBQVlVLEtBQVosRUFBc0I7QUFDMUMsUUFBTW9FLFVBQVUsR0FBRzlFLFNBQVMsQ0FBQyxDQUFELENBQTVCO0FBQ0EsUUFBTStFLFNBQVMsR0FBRy9FLFNBQVMsQ0FBQ0EsU0FBUyxDQUFDM0IsTUFBVixHQUFtQixDQUFwQixDQUEzQjtBQUNBLFFBQUkyRyxPQUFPLEdBQUcsSUFBZCxDQUgwQyxDQUkxQzs7QUFDQSxRQUFNQyxhQUFhLEdBQUdGLFNBQVMsQ0FBQyxDQUFELENBQVQsSUFBZ0J4RixJQUFJLENBQUNDLElBQUwsQ0FBVWtCLEtBQUssQ0FBQ3JDLE1BQWhCLElBQTBCLENBQTFDLENBQXRCO0FBQ0EsUUFBTTZHLFlBQVksR0FBSSxDQUFDLENBQUQsR0FBS0osVUFBVSxDQUFDLENBQUQsQ0FBckM7QUFDQSxRQUFNSyxPQUFPLEdBQVMsQ0FBQyxDQUFELEdBQUtMLFVBQVUsQ0FBQyxDQUFELENBQXJDO0FBQ0EsUUFBTU0sVUFBVSxHQUFNTCxTQUFTLENBQUMsQ0FBRCxDQUFULElBQWdCeEYsSUFBSSxDQUFDQyxJQUFMLENBQVVrQixLQUFLLENBQUNyQyxNQUFoQixJQUEwQixDQUExQyxDQUF0Qjs7QUFDQSxRQUFJNEcsYUFBYSxHQUFHLENBQXBCLEVBQXVCO0FBQ3JCRCxNQUFBQSxPQUFPLEdBQUdoRixTQUFTLENBQUN5QyxHQUFWLENBQWMsVUFBQWxFLEtBQUssRUFBSTtBQUMvQixlQUFPLENBQUNBLEtBQUssQ0FBQyxDQUFELENBQUwsR0FBVzBHLGFBQVosRUFBMkIxRyxLQUFLLENBQUMsQ0FBRCxDQUFoQyxDQUFQO0FBQ0QsT0FGUyxDQUFWO0FBR0QsS0FKRCxNQUlPLElBQUkyRyxZQUFZLEdBQUcsQ0FBbkIsRUFBc0I7QUFDM0JGLE1BQUFBLE9BQU8sR0FBR2hGLFNBQVMsQ0FBQ3lDLEdBQVYsQ0FBYyxVQUFBbEUsS0FBSyxFQUFJO0FBQy9CLGVBQU8sQ0FBQ0EsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXMkcsWUFBWixFQUEwQjNHLEtBQUssQ0FBQyxDQUFELENBQS9CLENBQVA7QUFDRCxPQUZTLENBQVY7QUFHRCxLQUpNLE1BSUEsSUFBSTRHLE9BQU8sR0FBRyxDQUFkLEVBQWlCO0FBQ3RCSCxNQUFBQSxPQUFPLEdBQUdoRixTQUFTLENBQUN5QyxHQUFWLENBQWMsVUFBQWxFLEtBQUssRUFBSTtBQUMvQixlQUFPLENBQUNBLEtBQUssQ0FBQyxDQUFELENBQU4sRUFBV0EsS0FBSyxDQUFDLENBQUQsQ0FBTCxHQUFXNEcsT0FBdEIsQ0FBUDtBQUNELE9BRlMsQ0FBVjtBQUdELEtBSk0sTUFJQSxJQUFJQyxVQUFVLEdBQUcsQ0FBakIsRUFBb0I7QUFDekJKLE1BQUFBLE9BQU8sR0FBR2hGLFNBQVMsQ0FBQ3lDLEdBQVYsQ0FBYyxVQUFBbEUsS0FBSyxFQUFJO0FBQy9CLGVBQU8sQ0FBQ0EsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXQSxLQUFLLENBQUMsQ0FBRCxDQUFMLEdBQVc2RyxVQUF0QixDQUFQO0FBQ0QsT0FGUyxDQUFWO0FBR0QsS0FKTSxNQUlBO0FBQ0xKLE1BQUFBLE9BQU8sR0FBR2hGLFNBQVY7QUFDRDs7QUFDRCxXQUFPZ0YsT0FBUDtBQUNELEdBN0JEOztBQStCQSxTQUFPO0FBQ0wxRCxJQUFBQSxXQUFXLEVBQVhBLFdBREs7QUFFTGxCLElBQUFBLFdBQVcsRUFBWEEsV0FGSztBQUdMb0MsSUFBQUEsZUFBZSxFQUFmQSxlQUhLO0FBSUx2QyxJQUFBQSxpQkFBaUIsRUFBakJBLGlCQUpLO0FBS0xPLElBQUFBLGlCQUFpQixFQUFqQkEsaUJBTEs7QUFNTEksSUFBQUEsaUJBQWlCLEVBQWpCQSxpQkFOSztBQU9MZ0UsSUFBQUEsYUFBYSxFQUFiQSxhQVBLO0FBUUwxRSxJQUFBQSxhQUFhLEVBQWJBO0FBUkssR0FBUDtBQVVELENBcElxQixFQUF0Qjs7QUFzSUEsaUVBQWVsRixhQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0SUE7QUFDc0g7QUFDN0I7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLHdHQUFxQztBQUMvRjtBQUNBLCtvQkFBK29CLGNBQWMsZUFBZSxjQUFjLG9CQUFvQixrQkFBa0IsNkJBQTZCLEdBQUcsZ0pBQWdKLG1CQUFtQixHQUFHLFFBQVEsbUJBQW1CLEdBQUcsVUFBVSxxQkFBcUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsMkRBQTJELGdCQUFnQixrQkFBa0IsR0FBRyxTQUFTLDhCQUE4QixzQkFBc0IsR0FBRyxPQUFPLHVGQUF1RixNQUFNLGlCQUFpQixVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxNQUFNLFlBQVksT0FBTyxVQUFVLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLEtBQUssTUFBTSxVQUFVLFVBQVUsS0FBSyxLQUFLLFlBQVksYUFBYSwrbkJBQStuQixjQUFjLGVBQWUsY0FBYyxvQkFBb0Isa0JBQWtCLDZCQUE2QixHQUFHLGdKQUFnSixtQkFBbUIsR0FBRyxRQUFRLG1CQUFtQixHQUFHLFVBQVUscUJBQXFCLEdBQUcsaUJBQWlCLGlCQUFpQixHQUFHLDJEQUEyRCxnQkFBZ0Isa0JBQWtCLEdBQUcsU0FBUyw4QkFBOEIsc0JBQXNCLEdBQUcsbUJBQW1CO0FBQ2hyRjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUHZDO0FBQ3NIO0FBQzdCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyx3R0FBcUM7QUFDL0Y7QUFDQSxpREFBaUQsd0JBQXdCLHVDQUF1QywyQ0FBMkMsNkJBQTZCLDZCQUE2QixvQ0FBb0MsdUJBQXVCLHVDQUF1Qyw4QkFBOEIsd0JBQXdCLCtCQUErQiw0QkFBNEIsNEJBQTRCLEtBQUssVUFBVSw4Q0FBOEMsR0FBRyxNQUFNLHFCQUFxQixvQ0FBb0MsNkJBQTZCLEdBQUcsTUFBTSxxQkFBcUIsb0NBQW9DLDZCQUE2QixHQUFHLE1BQU0sb0NBQW9DLDZCQUE2QixHQUFHLE1BQU0sb0NBQW9DLDZCQUE2QixHQUFHLG1CQUFtQix1REFBdUQseURBQXlELHFDQUFxQyxrQkFBa0Isd0JBQXdCLDRCQUE0Qix3QkFBd0IsR0FBRyxtQkFBbUIsOEJBQThCLG9FQUFvRSxrQkFBa0IsMkJBQTJCLDRCQUE0QiwyQkFBMkIsR0FBRyxpQkFBaUIsdUJBQXVCLDRCQUE0QiwyQkFBMkIsR0FBRyxTQUFTLHFCQUFxQixvQkFBb0IsV0FBVyxZQUFZLGdCQUFnQixpQkFBaUIsdUJBQXVCLGlDQUFpQywrRUFBK0UsMkJBQTJCLEdBQUcsdUJBQXVCLGVBQWUsd0JBQXdCLHlCQUF5Qix1QkFBdUIsaUNBQWlDLEdBQUcsZUFBZSxzREFBc0QsR0FBRyx3QkFBd0IsZ0JBQWdCLHlCQUF5Qix1QkFBdUIsZ0NBQWdDLEdBQUcsZ0JBQWdCLHNEQUFzRCxHQUFHLGNBQWMsK0NBQStDLEdBQUcsZ0JBQWdCLGlFQUFpRSxHQUFHLHFCQUFxQixvREFBb0QsR0FBRyxvQkFBb0Isb0RBQW9ELEdBQUcseUJBQXlCLDRDQUE0QyxHQUFHLHlCQUF5QixrREFBa0QsR0FBRyw4QkFBOEIsOENBQThDLEdBQUcsa0JBQWtCLHFEQUFxRCxHQUFHLE9BQU8sZ0ZBQWdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGlDQUFpQyx3QkFBd0IsdUNBQXVDLDJDQUEyQyw2QkFBNkIsNkJBQTZCLG9DQUFvQyx1QkFBdUIsdUNBQXVDLDhCQUE4Qix3QkFBd0IsK0JBQStCLDRCQUE0Qiw0QkFBNEIsS0FBSyxVQUFVLDhDQUE4QyxHQUFHLE1BQU0scUJBQXFCLG9DQUFvQyw2QkFBNkIsR0FBRyxNQUFNLHFCQUFxQixvQ0FBb0MsNkJBQTZCLEdBQUcsTUFBTSxvQ0FBb0MsNkJBQTZCLEdBQUcsTUFBTSxvQ0FBb0MsNkJBQTZCLEdBQUcsbUJBQW1CLHVEQUF1RCx5REFBeUQscUNBQXFDLGtCQUFrQix3QkFBd0IsNEJBQTRCLHdCQUF3QixHQUFHLG1CQUFtQiw4QkFBOEIsb0VBQW9FLGtCQUFrQiwyQkFBMkIsNEJBQTRCLDJCQUEyQixHQUFHLGlCQUFpQix1QkFBdUIsNEJBQTRCLDJCQUEyQixHQUFHLFNBQVMscUJBQXFCLG9CQUFvQixXQUFXLFlBQVksZ0JBQWdCLGlCQUFpQix1QkFBdUIsaUNBQWlDLCtFQUErRSwyQkFBMkIsR0FBRyx1QkFBdUIsZUFBZSx3QkFBd0IseUJBQXlCLHVCQUF1QixpQ0FBaUMsR0FBRyxlQUFlLHNEQUFzRCxHQUFHLHdCQUF3QixnQkFBZ0IseUJBQXlCLHVCQUF1QixnQ0FBZ0MsR0FBRyxnQkFBZ0Isc0RBQXNELEdBQUcsY0FBYywrQ0FBK0MsR0FBRyxnQkFBZ0IsaUVBQWlFLEdBQUcscUJBQXFCLG9EQUFvRCxHQUFHLG9CQUFvQixvREFBb0QsR0FBRyx5QkFBeUIsNENBQTRDLEdBQUcseUJBQXlCLGtEQUFrRCxHQUFHLDhCQUE4Qiw4Q0FBOEMsR0FBRyxrQkFBa0IscURBQXFELEdBQUcsbUJBQW1CO0FBQzE5TTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNqRWE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsOEZBQThGLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUV2ZSxnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsMkZBQU87Ozs7QUFJa0Q7QUFDMUUsT0FBTyxpRUFBZSwyRkFBTyxJQUFJLGtHQUFjLEdBQUcsa0dBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBSyw4REFBQTtBQUNBRCxzREFBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvbWV5ZXJyZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzPzkyNGQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5cbmNvbnN0IGRpc3BsYXkgPSAoKCkgPT4ge1xuICBsZXQgZ3JpZCA9IG51bGw7XG4gIGxldCBzaGFyZWRDb29yZExpc3QgPSBudWxsO1xuXG4gIGNvbnN0IGFsbEhvdmVyQ2xhc3NlcyA9IFtcbiAgICAncGxhY2UtaG92ZXInLFxuICAgICdwbGFjZS1ob3Zlci1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnLFxuICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb29iJyxcbiAgICAncGxhY2UtaG92ZXItb29iLXNvbG8nXG4gIF07XG4gIGNvbnN0IGluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXlHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ2VuZW15LWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IGVuZW15R3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBlbmVteUdyaWRMYWJlbC5pbm5lclRleHQgPSAnRW5lbXknO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ2VuZW15LWdyaWQnKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdwbGF5ZXItZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwbGF5ZXJHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ1BsYXllcic7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcGxheWVyR3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ3BsYXllci1ncmlkJyk7XG5cbiAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUNvbnRhaW5lci5pZCA9ICdnYW1lLWNvbnRhaW5lcic7XG5cbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZExhYmVsKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZFdyYXBwZXIpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckdyaWRMYWJlbCk7XG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkV3JhcHBlcik7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZCk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKHBhZ2VDb250YWluZXIuaGFzQ2hpbGROb2Rlcykge1xuICAgICAgcGFnZUNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXInKS5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnLicpIHtcbiAgICAgICAgZ2FtZS50b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgY2xlYXJDbGFzcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKSwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgZGlzcGxheUhvdmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZHJhd0dyaWQgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBsYXllci5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdlbmVteScpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IG93bmVyIGFzIFwiZW5lbXlcIiBvciBcInBsYXllclwiJyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIGNlbGxzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRCb2FyZCgpLmxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsSWQgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBsYXllciA9IG5hbWU7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgc2hpcCBjYW4gYmUgcGxhY2VkXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxhY2UtaG92ZXInKSkge1xuICAgICAgICAgICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBjdXJyZW50U2hpcC5zaXplXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogc2hhcmVkQ29vcmRMaXN0WzBdLFxuICAgICAgICAgICAgICAgICAgZGlyOiBnYW1lLmdldERpcmVjdGlvbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAvLyBkaXNwbGF5IHBsYWNlZCBzaGlwXG4gICAgICAgICAgICAgIHBsYWNlU2hpcChzaGFyZWRDb29yZExpc3QsIGdhbWVib2FyZC5nZXRCb2FyZCgpLCBlLnRhcmdldCk7XG4gICAgICAgICAgICAgIC8vIGdhbWUuYWR2YW5jZVNoaXBQbGFjZW1lbnRcbiAgICAgICAgICAgICAgaWYgKGdhbWUuYWR2YW5jZVNoaXBQbGFjZW1lbnQoKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNsZWFyQ2xhc3MoZS50YXJnZXQucGFyZW50RWxlbWVudCwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLnRhcmdldCA9PT0gJ2VuZW15Jykge1xuICAgICAgICAgICAgY29uc3QgY29vcmQgPSBnZXRDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgICAgICAgICBjb25zdCBpc0hpdCA9IGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtjb29yZC54LCBjb29yZC55XSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuYW1lICsgJyAnICsgZGlzcGxheUNvb3JkKGksIGdhbWVib2FyZC5nZXRCb2FyZCgpKVxuICAgICAgICAgICAgICArICcgJyArIChpc0hpdCA/ICdoaXQhJyA6ICdtaXNzZWQnKSk7XG4gICAgICAgICAgICBpZiAoaXNIaXQpIGNlbGwuc3R5bGVbJ2JhY2tncm91bmQtY29sb3InXSA9ICdyZWQnO1xuICAgICAgICAgICAgZ2FtZS5hZHZhbmNlU3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICBkaXNwbGF5SG92ZXIoZS50YXJnZXQsIHBsYXllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBncmlkLnN0eWxlWydncmlkLXRlbXBsYXRlLWNvbHVtbnMnXSA9IGByZXBlYXQoJHtNYXRoLnNxcnQoZ2FtZWJvYXJkXG4gICAgICAgIC5nZXRCb2FyZCgpLmxlbmd0aCl9LCAxZnIpYDtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlIb3ZlciA9IChlbGVtZW50LCBwbGF5ZXIpID0+IHtcbiAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaG92ZXJOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJzpob3ZlcicpO1xuICAgICAgZWxlbWVudCA9IGhvdmVyTm9kZUxpc3QuaXRlbShob3Zlck5vZGVMaXN0Lmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBsYXllciA9IGdhbWUuZ2V0UGxheWVycygpLnBsYXllcjtcbiAgICB9XG5cbiAgICBjb25zdCBnYW1lYm9hcmQgPSBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBjZWxsQ29vcmQgPSBnZXRDb29yZChlbGVtZW50LmRhdGFzZXQuY2VsbElkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBnYW1lLmdldFNoaXBGb3JQbGFjZW1lbnQoKTtcbiAgICBsZXQgY29vcmRMaXN0ID0gbnVsbDtcblxuICAgIC8vIEdldCBjb29yZExpc3QgY2VudGVyZWQgYXJvdW5kIGhvdmVyZWQgY29vcmRpbmF0ZVxuICAgIGNvb3JkTGlzdCA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzQ2VudGVyZWQoXG4gICAgICBjdXJyZW50U2hpcC5zaXplLFxuICAgICAge1xuICAgICAgICBjb29yZDogW2NlbGxDb29yZC54LCBjZWxsQ29vcmQueV0sXG4gICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgfVxuICAgICk7XG4gICAgLy8gTnVkZ2UgdGhlIGNvb3JkTGlzdCBvbnRvIHRoZSBib2FyZCBpZiBuZWVkZWRcbiAgICBjb29yZExpc3QgPSBmYWN0b3J5SGVscGVyLm51ZGdlQ29vcmRzT24oY29vcmRMaXN0LFxuICAgICAgZ2FtZWJvYXJkLmdldEJvYXJkKCkpXG5cbiAgICAvLyBVcGRhdGUgc2hhcmVkIGNvb3JkaW5hdGUgbGlzdFxuICAgIHNoYXJlZENvb3JkTGlzdCA9IGNvb3JkTGlzdDtcblxuICAgIC8vIFNob3cgYXZhaWxhYmlsaXR5IHdpdGggaG92ZXIgY29sb3JzXG4gICAgbGV0IGhvdmVyQ2xhc3NlcyA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBmYWN0b3J5SGVscGVyLmNoZWNrSWZPcGVuKGNvb3JkTGlzdCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1zb2xvJywgJ3BsYWNlLWhvdmVyJ11cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBpZiAoZXJyb3IgPT09ICdjZWxsIG9jY3VwaWVkJykge1xuICAgICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8nLFxuICAgICAgICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZCddXG4gICAgICB9IGVsc2UgaWYgKGVycm9yID09PSAnb3V0IG9mIGJvdW5kcycpIHtcbiAgICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1vb2Itc29sbycsXG4gICAgICAgICAgJ3BsYWNlLWhvdmVyLW9vYiddO1xuICAgICAgfVxuICAgIH1cbiAgICBjb29yZExpc3QuZm9yRWFjaChob3ZlckNvb3JkID0+IHtcbiAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoXG4gICAgICAgIFtob3ZlckNvb3JkWzBdLCBob3ZlckNvb3JkWzFdXSwgZ2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICAgICk7XG4gICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlcy5pdGVtKGNlbGxJbmRleCkuXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoaG92ZXJDbGFzc2VzWzFdKTtcbiAgICB9KTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaG92ZXJDbGFzc2VzWzBdKTtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlDb29yZCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZE9iaiA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRGcm9tSW5kZXgoaW5kZXgsIGJvYXJkKTtcbiAgICBjb25zdCBjb29yZFRleHQgPSBgWyR7Y29vcmRPYmoueH0sICR7Y29vcmRPYmoueX1dYDtcbiAgICByZXR1cm4gY29vcmRUZXh0O1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmQgPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRPYmogPSBmYWN0b3J5SGVscGVyLmdldENvb3JkRnJvbUluZGV4KGluZGV4LCBib2FyZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNvb3JkT2JqLngsXG4gICAgICB5OiBjb29yZE9iai55LFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZExpc3QsIGJvYXJkLCBlbGVtZW50KSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIHBhcmVudC5jaGlsZE5vZGVzW2ZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoXG4gICAgICAgIGNvb3JkLCBib2FyZFxuICAgICAgKV0uY2xhc3NMaXN0LmFkZCgnc2hpcC1zdGFuZGluZycpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgY2xlYXJDbGFzcyA9IChwYXJlbnQsIGNsYXNzTmFtZSkgPT4ge1xuICAgIHBhcmVudC5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKVxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZSxcbiAgICBkcmF3R3JpZCxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheTsiLCJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcblxuZXhwb3J0IGNvbnN0IHBsYXllckZhY3RvcnkgPSAobXlOYW1lLCBib2FyZFNpemUpID0+IHtcbiAgY29uc3QgbmFtZSA9IG15TmFtZTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeShib2FyZFNpemUpO1xuICBjb25zdCBhdHRhY2tlZFNwYWNlcyA9IFtdO1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IHsgcmV0dXJuIGdhbWVib2FyZDsgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4geyByZXR1cm4gbmFtZTsgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoY29vcmQsIGVuZW15UGxheWVyKSA9PiB7XG4gICAgbGV0IGFscmVhZHlBdHRhY2tlZCA9IGZhbHNlO1xuICAgIGF0dGFja2VkU3BhY2VzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChjZWxsLCBjb29yZCkpIHtcbiAgICAgICAgYWxyZWFkeUF0dGFja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICghYWxyZWFkeUF0dGFja2VkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBlbmVteVBsYXllci5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICAgICAgYXR0YWNrZWRTcGFjZXMucHVzaChjb29yZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyAoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdhbHJlYWR5IGF0dGFja2VkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRHYW1lYm9hcmQsXG4gICAgZ2V0TmFtZSxcbiAgICBhdHRhY2ssXG4gIH1cbn1cblxuLy8gcHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgY29uc3QgaGl0cyA9IHByb3BzLmluaXRpYWxIaXRzIHx8IFtdO1xuXG4gIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xuICAgIGlmICghaGl0cy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gaGl0cy5sZW5ndGggPT09IGxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkRmFjdG9yeSA9IChzaXplKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuICBjb25zdCBpbml0aWFsaXplID0gKCgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgYm9hcmQucHVzaCh7XG4gICAgICAgICAgY29vcmQ6IFtqLCBpXSxcbiAgICAgICAgICBoaXQ6IDAsXG4gICAgICAgICAgc2hpcElkOiBudWxsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IHNoaXBzID0gW107XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzdW5rID0gdHJ1ZTtcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSBzdW5rID0gZmFsc2U7XG4gICAgfSlcbiAgICByZXR1cm4gc3VuaztcbiAgfVxuXG4gIC8vIHNoaXBQcm9wcyA9IHsgbGVuZ3RoLCBpbml0aWFsSGl0cyB9XG4gIC8vIGxvY2F0aW9uUHJvcHMgPSB7IGNvb3JkOiBbeCwgeV0sIGRpcjogKCdlJyB8fCAncycpIH1cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBQcm9wcywgbG9jYXRpb25Qcm9wcykgPT4ge1xuICAgIGxldCBwbGFjZWRTaGlwSWQgPSBudWxsO1xuICAgIGxldCBwbGFjZWRDb29yZHMgPSB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIHBsYWNlZENvb3JkcyA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzSWZPcGVuKFxuICAgICAgICBzaGlwUHJvcHMubGVuZ3RoLCBsb2NhdGlvblByb3BzLCBib2FyZCk7XG4gICAgICBwbGFjZWRTaGlwSWQgPSBzaGlwcy5wdXNoKHNoaXBGYWN0b3J5KHNoaXBQcm9wcykpIC0gMTtcbiAgICAgIGJvYXJkID0gYm9hcmQubWFwKGNlbGwgPT4ge1xuICAgICAgICBsZXQgbmV3Q2VsbCA9IGNlbGw7XG4gICAgICAgIHBsYWNlZENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChjZWxsLmNvb3JkLCBjb29yZCkpIHtcbiAgICAgICAgICAgIG5ld0NlbGwgPSB7XG4gICAgICAgICAgICAgIGNvb3JkOiBjb29yZCxcbiAgICAgICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgICAgICBzaGlwSWQ6IHBsYWNlZFNoaXBJZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3Q2VsbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgKGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpO1xuICAgIGlmIChib2FyZFtpbmRleF0uaGl0ICE9PSAwKSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBoaXQnKTtcbiAgICB9XG4gICAgY29uc3Qgc2hpcElkID0gYm9hcmRbaW5kZXhdLnNoaXBJZDtcbiAgICBpZiAoc2hpcElkID09PSBudWxsKSB7XG4gICAgICBib2FyZFtpbmRleF0uaGl0ID0gLTE7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAxO1xuICAgICAgc2hpcHNbc2hpcElkXS5oaXQoY29vcmQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiB7IHJldHVybiBib2FyZCB9O1xuXG4gIHJldHVybiB7XG4gICAgYWxsU2hpcHNTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldEJvYXJkLFxuICB9XG59IiwiaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5cbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBzdGF0ZXMgPSBbXG4gICAge1xuICAgICAgaWQ6IDAsXG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBuYW1lOiAnUGxhY2UgeW91ciBzaGlwcy4nXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIHRhcmdldDogJ2VuZW15JyxcbiAgICAgIG5hbWU6IFwiUGxheWVyJ3MgdHVybi5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICB0YXJnZXQ6ICdwbGF5ZXInLFxuICAgICAgbmFtZTogXCJFbmVteSdzIHR1cm4uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAzLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogXCJHYW1lIGZpbmlzaGVkLlwiXG4gICAgfVxuICBdO1xuICBsZXQgcG9zc2libGVFbmVteUF0dGFja3MgPSBudWxsO1xuICBsZXQgc3RhdGUgPSBzdGF0ZXNbMF07XG4gIGNvbnN0IHNoaXBMaXN0ID0gW1xuICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1IH0sXG4gICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQgfSxcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXG4gICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMyB9LFxuICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiB9XG4gIF07XG4gIGxldCBjdXJyZW50U2hpcCA9IDA7XG4gIGxldCBkaXJlY3Rpb24gPSAnZSc7XG4gIGxldCBwbGF5ZXIxID0gbnVsbDtcbiAgbGV0IGVuZW15MSA9IG51bGw7XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgcGxheWVyMSA9IHBsYXllckZhY3RvcnkoJ3BsYXllcicsIDEwKTtcbiAgICBlbmVteTEgPSBwbGF5ZXJGYWN0b3J5KCdlbmVteScsIDEwKTtcbiAgICBwb3NzaWJsZUVuZW15QXR0YWNrcyA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKTtcblxuICAgIGRpc3BsYXkuZHJhd0dyaWQocGxheWVyMSk7XG4gICAgZGlzcGxheS5kcmF3R3JpZChlbmVteTEpO1xuXG4gICAgcGxhY2VSYW5kb21TaGlwcyhlbmVteTEpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBGb3JQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMaXN0W2N1cnJlbnRTaGlwXTtcbiAgfVxuXG4gIGNvbnN0IGFkdmFuY2VTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIGlmIChjdXJyZW50U2hpcCA8IDQpIHtcbiAgICAgIGN1cnJlbnRTaGlwICsrO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzFdO1xuICAgICAgY29uc29sZS5sb2coc3RhdGUubmFtZSk7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZHZhbmNlU3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGFsZXJ0KCdFbmVteSB3aW5zIScpO1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbM107XG5cbiAgICB9IGVsc2UgaWYgKGVuZW15MS5nZXRHYW1lYm9hcmQoKS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgYWxlcnQoJ1BsYXllciB3aW5zIScpO1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5pZCA9PT0gMSkge1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1syXTtcbiAgICAgICAgZW5lbXlSYW5kb21BdHRhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlID0gc3RhdGVzWzFdO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzdGF0ZS5uYW1lKTtcbiAgfVxuXG4gIGNvbnN0IGdldFN0YXRlID0gKCkgPT4ge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IGdldERpcmVjdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGlyZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdlJykgZGlyZWN0aW9uID0gJ3MnO1xuICAgIGVsc2UgZGlyZWN0aW9uID0gJ2UnO1xuICB9XG5cbiAgY29uc3QgZ2V0UGxheWVycyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcGxheWVyOiBwbGF5ZXIxLFxuICAgICAgZW5lbXk6IGVuZW15MVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlUmFuZG9tU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgYm9hcmRTaXplID0gTWF0aC5zcXJ0KHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpLmxlbmd0aCk7XG4gICAgc2hpcExpc3QuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICB3aGlsZSAoc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwKSB0b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgbGV0IGNvb3JkWCA9IG51bGw7XG4gICAgICAgIGxldCBjb29yZFkgPSBudWxsO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2l6ZSAtIDEpKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb3JkWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgICBjb29yZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2l6ZSAtIDEpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAocGxheWVyLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGVuZ3RoOiBzaGlwLnNpemVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbY29vcmRYLCBjb29yZFldLFxuICAgICAgICAgICAgICBkaXI6IGRpcmVjdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBwbGFjZSBhIHNoaXAnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgZW5lbXlSYW5kb21BdHRhY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgYXR0YWNrSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZUVuZW15QXR0YWNrcy5sZW5ndGgpO1xuICAgIGNvbnN0IGF0dGFja0NlbGwgPSBwb3NzaWJsZUVuZW15QXR0YWNrcy5zcGxpY2UoYXR0YWNrSW5kZXgsIDEpWzBdO1xuICAgIHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhhdHRhY2tDZWxsLmNvb3JkKTtcbiAgICBhZHZhbmNlU3RhdGUoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc3RhcnQsXG4gICAgZ2V0U2hpcEZvclBsYWNlbWVudCxcbiAgICBhZHZhbmNlU2hpcFBsYWNlbWVudCxcbiAgICBhZHZhbmNlU3RhdGUsXG4gICAgZ2V0U3RhdGUsXG4gICAgZ2V0RGlyZWN0aW9uLFxuICAgIHRvZ2dsZURpcmVjdGlvbixcbiAgICBnZXRQbGF5ZXJzLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBnYW1lOyIsImNvbnN0IGZhY3RvcnlIZWxwZXIgPSAoKCkgPT4ge1xuICBjb25zdCBhcnJheXNNYXRjaCA9IChjb29yZDEsIGNvb3JkMikgPT4ge1xuICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkoY29vcmQxKSA9PT0gSlNPTi5zdHJpbmdpZnkoY29vcmQyKSlcbiAgICAgID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY2hlY2tJZk9wZW4gPSAoY29vcmRMaXN0LCBib2FyZCkgPT4ge1xuICAgIGxldCBpc09wZW4gPSB0cnVlO1xuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW2dldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBib2FyZCldO1xuICAgICAgaWYgKGJvYXJkQ2VsbC5zaGlwSWQgIT09IG51bGwpIHtcbiAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRocm93KCdjZWxsIG9jY3VwaWVkJyk7XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaXNPcGVuO1xuICB9XG5cbiAgICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogWzUsIDVdLCBkaXI6IChlIHx8IHMpIH1cbiAgY29uc3QgZ2V0Q29vcmRzSWZPcGVuID0gKGxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2VhcmNoWCA9IGxvY2F0aW9uUHJvcHMuY29vcmRbMF07XG4gICAgICBsZXQgc2VhcmNoWSA9IGxvY2F0aW9uUHJvcHMuY29vcmRbMV07XG4gICAgICBsb2NhdGlvblByb3BzLmRpciA9PT0gJ2UnXG4gICAgICAgID8gc2VhcmNoWCArPSBpXG4gICAgICAgIDogc2VhcmNoWSArPSBpO1xuICAgICAgY29uc3QgbWF0Y2hpbmdDZWxsID0gYm9hcmQuZmluZChjZWxsID0+IFxuICAgICAgICBhcnJheXNNYXRjaChjZWxsLmNvb3JkLCBbc2VhcmNoWCwgc2VhcmNoWV0pXG4gICAgICApO1xuICAgICAgXG4gICAgICBpZiAoIW1hdGNoaW5nQ2VsbCkgdGhyb3coJ291dCBvZiBib3VuZHMnKTtcbiAgICAgIGVsc2UgaWYgKG1hdGNoaW5nQ2VsbC5zaGlwSWQgIT09IG51bGwpIHRocm93KCdjZWxsIG9jY3VwaWVkJylcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBTdWNjZXNzXG4gICAgICAgIGNvb3Jkcy5wdXNoKFtzZWFyY2hYLCBzZWFyY2hZXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZHNDZW50ZXJlZCA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgc3RhcnRpbmdDb29yZCA9IG51bGw7XG4gICAgY29uc3QgZGlyID0gbG9jYXRpb25Qcm9wcy5kaXI7XG4gICAgaWYgKGRpciA9PT0gJ2UnKSB7XG4gICAgICBzdGFydGluZ0Nvb3JkID0gW1xuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzBdIC0gTWF0aC5mbG9vcigobGVuZ3RoIC0gMSkvMiksXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV1cbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdzJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSxcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFsxXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygncGxlYXNlIHNwZWNpZnkgZGlyZWN0aW9uIGJlZm9yZSBnZXR0aW5nIGNvb3JkaW5hdGVzJyk7XG4gICAgfVxuICAgIGxldCBjb29yZEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkWCA9IChkaXIgPT09ICdlJylcbiAgICAgICAgPyBzdGFydGluZ0Nvb3JkWzBdICsgaVxuICAgICAgICA6IHN0YXJ0aW5nQ29vcmRbMF07XG4gICAgICBjb25zdCBjb29yZFkgPSAoZGlyID09PSAncycpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFsxXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzFdO1xuICAgICAgY29vcmRBcnJheS5wdXNoKFtjb29yZFgsIGNvb3JkWV0pO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRBcnJheTtcbiAgfVxuXG4gIGNvbnN0IGdldEluZGV4RnJvbUNvb3JkID0gKGNvb3JkLCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gY29vcmRbMV0gKiBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSArIGNvb3JkWzBdO1xuICAgIGlmIChpbmRleCA+IGJvYXJkLmxlbmd0aCAtIDEgfHwgaW5kZXggPCAwKSB7XG4gICAgICB0aHJvdygnZ2V0SW5kZXguLi46IG91dCBvZiBib3VuZHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldENvb3JkRnJvbUluZGV4ID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IHNpemUgPSBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKTtcbiAgICBjb25zdCB4ID0gaW5kZXggJSBzaXplO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGluZGV4IC8gc2l6ZSk7XG4gICAgXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSB9XG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc0J5ID0gKGNvb3JkTGlzdCwgbnVtYmVyKSA9PiB7XG5cbiAgfVxuXG4gIGNvbnN0IG51ZGdlQ29vcmRzT24gPSAoY29vcmRMaXN0LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0Q29vcmQgPSBjb29yZExpc3RbMF07XG4gICAgY29uc3QgbGFzdENvb3JkID0gY29vcmRMaXN0W2Nvb3JkTGlzdC5sZW5ndGggLSAxXTtcbiAgICBsZXQgbmV3TGlzdCA9IG51bGw7XG4gICAgLy8gb2ZmIHRoZSByaWdodCBzaWRlXG4gICAgY29uc3QgcmlnaHRTaWRlSGFuZyA9IGxhc3RDb29yZFswXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGNvbnN0IGxlZnRTaWRlSGFuZyAgPSAtMSAqIGZpcnN0Q29vcmRbMF07XG4gICAgY29uc3QgdG9wSGFuZyAgICAgICA9IC0xICogZmlyc3RDb29yZFsxXTtcbiAgICBjb25zdCBib3R0b21IYW5nICAgID0gbGFzdENvb3JkWzFdIC0gKE1hdGguc3FydChib2FyZC5sZW5ndGgpIC0gMSk7XG4gICAgaWYgKHJpZ2h0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gLSByaWdodFNpZGVIYW5nLCBjb29yZFsxXV07XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGxlZnRTaWRlSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSArIGxlZnRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0b3BIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdLCBjb29yZFsxXSArIHRvcEhhbmddO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChib3R0b21IYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdLCBjb29yZFsxXSAtIGJvdHRvbUhhbmddO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3Q7XG4gICAgfVxuICAgIHJldHVybiBuZXdMaXN0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcnJheXNNYXRjaCxcbiAgICBjaGVja0lmT3BlbixcbiAgICBnZXRDb29yZHNJZk9wZW4sXG4gICAgZ2V0Q29vcmRzQ2VudGVyZWQsXG4gICAgZ2V0SW5kZXhGcm9tQ29vcmQsXG4gICAgZ2V0Q29vcmRGcm9tSW5kZXgsXG4gICAgbnVkZ2VDb29yZHNCeSxcbiAgICBudWRnZUNvb3Jkc09uLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmYWN0b3J5SGVscGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbWV5ZXJyZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tcGFnZS1tYXJnaW46IDFyZW07XFxuICAtLWdhbWUtYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcbiAgLS1ob3Zlci1saWdodC1ibHVlOiByZ2IoMTMxLCAxNzQsIDIzOCk7XFxuICAtLWhvdmVyLWJsdWU6IGRvZGdlckJsdWU7XFxuICAtLWhvdmVyLWNyaW1zb246IGNyaW1zb247XFxuICAtLWhvdmVyLXJlZDogcmdiKDI1NSwgMTEyLCAxMTIpO1xcbiAgLS1ob3Zlci1nb2xkOiBnb2xkO1xcbiAgLS1ob3Zlci15ZWxsb3c6IHJnYigyNTUsIDI1NSwgMTQ1KTtcXG4gIC0tc2hpcC1ncmVlbjogZm9yZXN0R3JlZW47XFxuICAtLWdyaWQtY29sb3I6IHdoaXRlO1xcbiAgLS1ncmlkLWJvcmRlci1jb2xvcjogYmxhY2s7XFxuICAtLWdyaWQtYm9yZGVyLXNpemU6IDFweDtcXG4gIC8qIC0tZ3JpZC1vZmZzZXQ6IDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgZm9udC1mYW1pbHk6IEhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWY7XFxufVxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IGNhbGMoMi44dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMiB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiBjYWxjKDIuM3ZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDMge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuOHZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDQge1xcbiAgZm9udC1zaXplOiBjYWxjKDEuNHZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuI3BhZ2UtY29udGFpbmVyIHtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2FtZS1iYWNrZ3JvdW5kLWNvbG9yLCBncmF5KTtcXG4gIG1hcmdpbjogdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbiNnYW1lLWNvbnRhaW5lciB7XFxuICB3aWR0aDogY2FsYygyMHJlbSArIDEwdncpO1xcbiAgbWF4LXdpZHRoOiBjYWxjKCgxMDB2aCAtICh2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKSkgLyAyLjUpO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5ncmlkLXdyYXBwZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZCB7XFxuICAvKiBtYXJnaW46IDJyZW07ICovXFxuICBkaXNwbGF5OiBncmlkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZ2FwOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplKTtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogODAlO1xcbiAgcGFkZGluZy1ib3R0b206IDgwJTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5ncmlkLWNlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1jb2xvciwgd2hpdGUpO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItbGlnaHQtYmx1ZSwgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1ibHVlLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jcmltc29uLCBjcmltc29uKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgcmVkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXllbGxvdywgeWVsbG93KTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItZ29sZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtZ3JlZW4sIGZvcmVzdEdyZWVuKTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQixrQ0FBa0M7RUFDbEMsc0NBQXNDO0VBQ3RDLHdCQUF3QjtFQUN4Qix3QkFBd0I7RUFDeEIsK0JBQStCO0VBQy9CLGtCQUFrQjtFQUNsQixrQ0FBa0M7RUFDbEMseUJBQXlCO0VBQ3pCLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFDMUIsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQiwrQkFBK0I7RUFDL0Isd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSwrQkFBK0I7RUFDL0Isd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSwrQkFBK0I7RUFDL0Isd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxrREFBa0Q7RUFDbEQsb0RBQW9EO0VBQ3BELGdDQUFnQztFQUNoQyxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QiwrREFBK0Q7RUFDL0QsYUFBYTtFQUNiLHNCQUFzQjtFQUN0Qix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QiwwRUFBMEU7RUFDMUUsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxVQUFVO0VBQ1YsbUJBQW1CO0VBQ25CLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsNEJBQTRCO0FBQzlCO0FBQ0E7RUFDRSxpREFBaUQ7QUFDbkQ7QUFDQTtFQUNFLFdBQVc7RUFDWCxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UsaURBQWlEO0FBQ25EO0FBQ0E7RUFDRSwwQ0FBMEM7QUFDNUM7QUFDQTtFQUNFLDREQUE0RDtBQUM5RDtBQUNBO0VBQ0UsK0NBQStDO0FBQ2pEO0FBQ0E7RUFDRSwrQ0FBK0M7QUFDakQ7QUFDQTtFQUNFLHVDQUF1QztBQUN6QztBQUNBO0VBQ0UsNkNBQTZDO0FBQy9DO0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7QUFDQTtFQUNFLGdEQUFnRDtBQUNsRFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1nYW1lLWJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG4gIC0taG92ZXItbGlnaHQtYmx1ZTogcmdiKDEzMSwgMTc0LCAyMzgpO1xcbiAgLS1ob3Zlci1ibHVlOiBkb2RnZXJCbHVlO1xcbiAgLS1ob3Zlci1jcmltc29uOiBjcmltc29uO1xcbiAgLS1ob3Zlci1yZWQ6IHJnYigyNTUsIDExMiwgMTEyKTtcXG4gIC0taG92ZXItZ29sZDogZ29sZDtcXG4gIC0taG92ZXIteWVsbG93OiByZ2IoMjU1LCAyNTUsIDE0NSk7XFxuICAtLXNoaXAtZ3JlZW46IGZvcmVzdEdyZWVuO1xcbiAgLS1ncmlkLWNvbG9yOiB3aGl0ZTtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiBjYWxjKDIuOHZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjN2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjR2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMjByZW0gKyAxMHZ3KTtcXG4gIG1heC13aWR0aDogY2FsYygoMTAwdmggLSAodmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMikpIC8gMi41KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQge1xcbiAgLyogbWFyZ2luOiAycmVtOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSk7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA4MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxLjV2aDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5lbmVteS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5wbGF5ZXItZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbn1cXG4uZ3JpZC1jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtY29sb3IsIHdoaXRlKTtcXG59XFxuLnBsYWNlLWhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWxpZ2h0LWJsdWUsIHJnYig5OCwgMTUxLCAyMzApKTtcXG59XFxuLnBsYWNlLWhvdmVyLXNvbG8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItYmx1ZSwgZG9kZ2VyQmx1ZSk7XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY3JpbXNvbiwgY3JpbXNvbik7XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Itc29sbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIHJlZCk7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci15ZWxsb3csIHllbGxvdyk7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWdvbGQsIGdvbGQpO1xcbn1cXG4uc2hpcC1zdGFuZGluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zaGlwLWdyZWVuLCBmb3Jlc3RHcmVlbik7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21leWVycmVzZXQuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cbmRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuZ2FtZS5zdGFydCgpOyJdLCJuYW1lcyI6WyJmYWN0b3J5SGVscGVyIiwiZ2FtZWJvYXJkRmFjdG9yeSIsInBsYXllckZhY3RvcnkiLCJzaGlwRmFjdG9yeSIsImdhbWUiLCJkaXNwbGF5IiwiZ3JpZCIsInNoYXJlZENvb3JkTGlzdCIsImFsbEhvdmVyQ2xhc3NlcyIsImluaXRpYWxpemUiLCJlbmVteUdyaWRXcmFwcGVyIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZW5lbXlHcmlkTGFiZWwiLCJpbm5lclRleHQiLCJlbmVteUdyaWQiLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWRMYWJlbCIsInBsYXllckdyaWQiLCJnYW1lQ29udGFpbmVyIiwiaWQiLCJhcHBlbmRDaGlsZCIsInBhZ2VDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiaGFzQ2hpbGROb2RlcyIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwiY2hpbGQiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleSIsInRvZ2dsZURpcmVjdGlvbiIsImNsZWFyQ2xhc3MiLCJkaXNwbGF5SG92ZXIiLCJkcmF3R3JpZCIsInBsYXllciIsIm5hbWUiLCJnZXROYW1lIiwiZ2FtZWJvYXJkIiwiZ2V0R2FtZWJvYXJkIiwiaSIsImNlbGwiLCJkYXRhc2V0IiwiY2VsbElkIiwiZ2V0U3RhdGUiLCJjdXJyZW50U2hpcCIsImdldFNoaXBGb3JQbGFjZW1lbnQiLCJ0YXJnZXQiLCJjb250YWlucyIsInBsYWNlU2hpcCIsImxlbmd0aCIsInNpemUiLCJjb29yZCIsImRpciIsImdldERpcmVjdGlvbiIsImdldEJvYXJkIiwiYWR2YW5jZVNoaXBQbGFjZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Q29vcmQiLCJpc0hpdCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsImNvbnNvbGUiLCJsb2ciLCJkaXNwbGF5Q29vcmQiLCJzdHlsZSIsImFkdmFuY2VTdGF0ZSIsIk1hdGgiLCJzcXJ0IiwiZWxlbWVudCIsInVuZGVmaW5lZCIsImhvdmVyTm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXRlbSIsImdldFBsYXllcnMiLCJjZWxsQ29vcmQiLCJjb29yZExpc3QiLCJnZXRDb29yZHNDZW50ZXJlZCIsIm51ZGdlQ29vcmRzT24iLCJob3ZlckNsYXNzZXMiLCJjaGVja0lmT3BlbiIsImVycm9yIiwiaG92ZXJDb29yZCIsImNlbGxJbmRleCIsImdldEluZGV4RnJvbUNvb3JkIiwiaW5kZXgiLCJib2FyZCIsImNvb3JkT2JqIiwiZ2V0Q29vcmRGcm9tSW5kZXgiLCJjb29yZFRleHQiLCJwYXJlbnQiLCJjbGFzc05hbWUiLCJteU5hbWUiLCJib2FyZFNpemUiLCJhdHRhY2tlZFNwYWNlcyIsImF0dGFjayIsImVuZW15UGxheWVyIiwiYWxyZWFkeUF0dGFja2VkIiwiYXJyYXlzTWF0Y2giLCJwdXNoIiwicHJvcHMiLCJoaXRzIiwiaW5pdGlhbEhpdHMiLCJoaXQiLCJpbmNsdWRlcyIsImlzU3VuayIsImoiLCJzaGlwSWQiLCJzaGlwcyIsImFsbFNoaXBzU3VuayIsInN1bmsiLCJzaGlwIiwic2hpcFByb3BzIiwibG9jYXRpb25Qcm9wcyIsInBsYWNlZFNoaXBJZCIsInBsYWNlZENvb3JkcyIsImdldENvb3Jkc0lmT3BlbiIsIm1hcCIsIm5ld0NlbGwiLCJzdGF0ZXMiLCJwb3NzaWJsZUVuZW15QXR0YWNrcyIsInN0YXRlIiwic2hpcExpc3QiLCJkaXJlY3Rpb24iLCJwbGF5ZXIxIiwiZW5lbXkxIiwic3RhcnQiLCJwbGFjZVJhbmRvbVNoaXBzIiwiYWxlcnQiLCJlbmVteVJhbmRvbUF0dGFjayIsImVuZW15Iiwic3VjY2VzcyIsImZsb29yIiwicmFuZG9tIiwiY29vcmRYIiwiY29vcmRZIiwiYXR0YWNrSW5kZXgiLCJhdHRhY2tDZWxsIiwic3BsaWNlIiwiY29vcmQxIiwiY29vcmQyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzT3BlbiIsImJvYXJkQ2VsbCIsImNvb3JkcyIsInNlYXJjaFgiLCJzZWFyY2hZIiwibWF0Y2hpbmdDZWxsIiwiZmluZCIsInN0YXJ0aW5nQ29vcmQiLCJjb29yZEFycmF5IiwibnVkZ2VDb29yZHNCeSIsIm51bWJlciIsImZpcnN0Q29vcmQiLCJsYXN0Q29vcmQiLCJuZXdMaXN0IiwicmlnaHRTaWRlSGFuZyIsImxlZnRTaWRlSGFuZyIsInRvcEhhbmciLCJib3R0b21IYW5nIl0sInNvdXJjZVJvb3QiOiIifQ==