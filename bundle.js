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
                length: currentShip.size,
                name: currentShip.name
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
            var isHit = gameboard.receiveAttack([coord.x, coord.y]); // console.log(name + ' ' + displayCoord(i, gameboard.getBoard())
            //   + ' ' + (isHit ? 'hit!' : 'missed'));

            if (isHit > 0) {
              cell.classList.add('hit', 'enemy-hit');
            } else {
              cell.classList.add('miss', 'enemy-miss');
            }

            if (isHit === 2) {
              console.log(_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].sunkMessage(coord, gameboard, _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().target));
            }

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
}; // props = { length, initialHits, name }

var shipFactory = function shipFactory(props) {
  var length = props.length;
  var hits = props.initialHits || [];
  var name = props.name;

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

  var getLength = function getLength() {
    return length;
  };

  var getName = function getName() {
    return name;
  };

  return {
    hit: hit,
    isSunk: isSunk,
    getLength: getLength,
    getName: getName
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
      return 0;
    } else {
      board[index].hit = 1;
      ships[shipId].hit(coord);

      if (ships[shipId].isSunk()) {
        return 2;
      } else {
        return 1;
      }
    }
  };

  var getShips = function getShips() {
    return ships;
  };

  var getBoard = function getBoard() {
    return board;
  };

  return {
    allShipsSunk: allShipsSunk,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    getShips: getShips,
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
/* harmony import */ var _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/factoryhelper.js */ "./src/helpers/factoryhelper.js");




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
            length: ship.size,
            name: ship.name
          }, {
            coord: [coordX, coordY],
            dir: direction
          })) {
            success = true;
          }
        } catch (_unused) {
          console.log('Failed to place a ship, trying again');
        }
      }
    });
  };

  var enemyRandomAttack = function enemyRandomAttack() {
    var attackIndex = Math.floor(Math.random() * possibleEnemyAttacks.length);
    var attackCell = possibleEnemyAttacks.splice(attackIndex, 1)[0];
    var didHit = player1.getGameboard().receiveAttack(attackCell.coord);
    var playerGrid = document.querySelector('.player-grid');
    var attackCellIndex = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_2__["default"].getIndexFromCoord(attackCell.coord, player1.getGameboard().getBoard());

    if (didHit > 0) {
      playerGrid.childNodes.item(attackCellIndex).classList.add('hit', 'player-hit');
    } else {
      playerGrid.childNodes.item(attackCellIndex).classList.add('miss', 'player-miss');
    }

    if (didHit === 2) {
      console.log(_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_2__["default"].sunkMessage(attackCell.coord, player1.getGameboard(), state.target));
    }

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

  var sunkMessage = function sunkMessage(coord, gameboard, target) {
    if (coord.x) {
      coord = [coord.x, coord.y];
    }

    var index = getIndexFromCoord(coord, gameboard.getBoard());
    var shipId = gameboard.getBoard()[index].shipId;
    var attacker = target === 'enemy' ? 'You' : 'Enemy';
    var shipName = gameboard.getShips()[shipId].getName();
    var shipSize = gameboard.getShips()[shipId].getLength();
    return attacker + ' sunk the ' + shipName + '! (size: ' + shipSize + ')';
  };

  return {
    arraysMatch: arraysMatch,
    checkIfOpen: checkIfOpen,
    getCoordsIfOpen: getCoordsIfOpen,
    getCoordsCentered: getCoordsCentered,
    getIndexFromCoord: getIndexFromCoord,
    getCoordFromIndex: getCoordFromIndex,
    nudgeCoordsBy: nudgeCoordsBy,
    nudgeCoordsOn: nudgeCoordsOn,
    sunkMessage: sunkMessage
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--grid-border-color);\n  background-color: var(--grid-color, white);\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}\n.hit {\n  background-color: purple;\n}\n.enemy-hit {\n\n}\n.player-hit {\n\n}\n.miss {\n  background-color: black;\n}\n.enemy-miss {\n\n}\n.player-hit {\n\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,kCAAkC;EAClC,sCAAsC;EACtC,wBAAwB;EACxB,wBAAwB;EACxB,+BAA+B;EAC/B,kBAAkB;EAClB,kCAAkC;EAClC,yBAAyB;EACzB,mBAAmB;EACnB,0BAA0B;EAC1B,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,yCAAyC;AAC3C;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,kDAAkD;EAClD,oDAAoD;EACpD,gCAAgC;EAChC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,yBAAyB;EACzB,+DAA+D;EAC/D,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,sBAAsB;AACxB;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,0EAA0E;EAC1E,sBAAsB;AACxB;AACA;EACE,UAAU;EACV,mBAAmB;EACnB,oBAAoB;EACpB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,WAAW;EACX,oBAAoB;EACpB,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,sCAAsC;EACtC,wEAAwE;EACxE,0CAA0C;AAC5C;AACA;EACE,4DAA4D;AAC9D;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,gDAAgD;AAClD;AACA;EACE,wBAAwB;AAC1B;AACA;;AAEA;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;;AAEA;AACA;;AAEA","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-color: white;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  font-size: calc(2.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  font-size: calc(2.3vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-size: calc(1.8vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-size: calc(1.4vh + 0.3rem);\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n}\n#game-container {\n  width: calc(20rem + 10vw);\n  max-width: calc((100vh - (var(--page-margin, 2rem) * 2)) / 2.5);\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  box-sizing: border-box;\n}\n.grid-wrapper {\n  position: relative;\n  background-color: white;\n  box-sizing: border-box;\n}\n.grid {\n  /* margin: 2rem; */\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 80%;\n  padding-bottom: 80%;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 100%;\n  padding-bottom: 100%;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--grid-border-color);\n  background-color: var(--grid-color, white);\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}\n.hit {\n  background-color: purple;\n}\n.enemy-hit {\n\n}\n.player-hit {\n\n}\n.miss {\n  background-color: black;\n}\n.enemy-miss {\n\n}\n.player-hit {\n\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBSyw4REFBQTtBQUNBRCxzREFBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvbWV5ZXJyZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzPzkyNGQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5cbmNvbnN0IGRpc3BsYXkgPSAoKCkgPT4ge1xuICBsZXQgZ3JpZCA9IG51bGw7XG4gIGxldCBzaGFyZWRDb29yZExpc3QgPSBudWxsO1xuXG4gIGNvbnN0IGFsbEhvdmVyQ2xhc3NlcyA9IFtcbiAgICAncGxhY2UtaG92ZXInLFxuICAgICdwbGFjZS1ob3Zlci1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnLFxuICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb29iJyxcbiAgICAncGxhY2UtaG92ZXItb29iLXNvbG8nXG4gIF07XG4gIGNvbnN0IGluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXlHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ2VuZW15LWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IGVuZW15R3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBlbmVteUdyaWRMYWJlbC5pbm5lclRleHQgPSAnRW5lbXknO1xuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ2VuZW15LWdyaWQnKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdwbGF5ZXItZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwbGF5ZXJHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ1BsYXllcic7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcGxheWVyR3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ3BsYXllci1ncmlkJyk7XG5cbiAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUNvbnRhaW5lci5pZCA9ICdnYW1lLWNvbnRhaW5lcic7XG5cbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZExhYmVsKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15R3JpZFdyYXBwZXIpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckdyaWRMYWJlbCk7XG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkV3JhcHBlcik7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZCk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKHBhZ2VDb250YWluZXIuaGFzQ2hpbGROb2Rlcykge1xuICAgICAgcGFnZUNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXInKS5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnLicpIHtcbiAgICAgICAgZ2FtZS50b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgY2xlYXJDbGFzcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKSwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgZGlzcGxheUhvdmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZHJhd0dyaWQgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBsYXllci5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdlbmVteScpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IG93bmVyIGFzIFwiZW5lbXlcIiBvciBcInBsYXllclwiJyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIGNlbGxzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRCb2FyZCgpLmxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsSWQgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBsYXllciA9IG5hbWU7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgc2hpcCBjYW4gYmUgcGxhY2VkXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxhY2UtaG92ZXInKSkge1xuICAgICAgICAgICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBjdXJyZW50U2hpcC5zaXplLFxuICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFNoaXAubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IHNoYXJlZENvb3JkTGlzdFswXSxcbiAgICAgICAgICAgICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gZGlzcGxheSBwbGFjZWQgc2hpcFxuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hhcmVkQ29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSwgZS50YXJnZXQpO1xuICAgICAgICAgICAgICAvLyBnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50XG4gICAgICAgICAgICAgIGlmIChnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50KCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQgPT09ICdlbmVteScpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gZ2V0Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbY29vcmQueCwgY29vcmQueV0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSArICcgJyArIGRpc3BsYXlDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICAgICAgICAgIC8vICAgKyAnICcgKyAoaXNIaXQgPyAnaGl0IScgOiAnbWlzc2VkJykpO1xuICAgICAgICAgICAgaWYgKGlzSGl0ID4gMCkge1xuICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcsICdlbmVteS1oaXQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycsICdlbmVteS1taXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNIaXQgPT09IDIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZmFjdG9yeUhlbHBlci5zdW5rTWVzc2FnZShjb29yZCwgZ2FtZWJvYXJkLFxuICAgICAgICAgICAgICAgIGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdhbWUuYWR2YW5jZVN0YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChuYW1lID09PSAncGxheWVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgZGlzcGxheUhvdmVyKGUudGFyZ2V0LCBwbGF5ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJDbGFzcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LCBhbGxIb3ZlckNsYXNzZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ3JpZC5zdHlsZVsnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJ10gPSBgcmVwZWF0KCR7TWF0aC5zcXJ0KGdhbWVib2FyZFxuICAgICAgICAuZ2V0Qm9hcmQoKS5sZW5ndGgpfSwgMWZyKWA7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5SG92ZXIgPSAoZWxlbWVudCwgcGxheWVyKSA9PiB7XG4gICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGhvdmVyTm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCc6aG92ZXInKTtcbiAgICAgIGVsZW1lbnQgPSBob3Zlck5vZGVMaXN0Lml0ZW0oaG92ZXJOb2RlTGlzdC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgaWYgKHBsYXllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwbGF5ZXIgPSBnYW1lLmdldFBsYXllcnMoKS5wbGF5ZXI7XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgY2VsbENvb3JkID0gZ2V0Q29vcmQoZWxlbWVudC5kYXRhc2V0LmNlbGxJZCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZ2FtZS5nZXRTaGlwRm9yUGxhY2VtZW50KCk7XG4gICAgbGV0IGNvb3JkTGlzdCA9IG51bGw7XG5cbiAgICAvLyBHZXQgY29vcmRMaXN0IGNlbnRlcmVkIGFyb3VuZCBob3ZlcmVkIGNvb3JkaW5hdGVcbiAgICBjb29yZExpc3QgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0NlbnRlcmVkKFxuICAgICAgY3VycmVudFNoaXAuc2l6ZSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFtjZWxsQ29vcmQueCwgY2VsbENvb3JkLnldLFxuICAgICAgICBkaXI6IGdhbWUuZ2V0RGlyZWN0aW9uKClcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIE51ZGdlIHRoZSBjb29yZExpc3Qgb250byB0aGUgYm9hcmQgaWYgbmVlZGVkXG4gICAgY29vcmRMaXN0ID0gZmFjdG9yeUhlbHBlci5udWRnZUNvb3Jkc09uKGNvb3JkTGlzdCxcbiAgICAgIGdhbWVib2FyZC5nZXRCb2FyZCgpKVxuXG4gICAgLy8gVXBkYXRlIHNoYXJlZCBjb29yZGluYXRlIGxpc3RcbiAgICBzaGFyZWRDb29yZExpc3QgPSBjb29yZExpc3Q7XG5cbiAgICAvLyBTaG93IGF2YWlsYWJpbGl0eSB3aXRoIGhvdmVyIGNvbG9yc1xuICAgIGxldCBob3ZlckNsYXNzZXMgPSBbXTtcbiAgICB0cnkge1xuICAgICAgZmFjdG9yeUhlbHBlci5jaGVja0lmT3Blbihjb29yZExpc3QsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItc29sbycsICdwbGFjZS1ob3ZlciddXG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgaWYgKGVycm9yID09PSAnY2VsbCBvY2N1cGllZCcpIHtcbiAgICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAgICAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnXVxuICAgICAgfSBlbHNlIGlmIChlcnJvciA9PT0gJ291dCBvZiBib3VuZHMnKSB7XG4gICAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItb29iLXNvbG8nLFxuICAgICAgICAgICdwbGFjZS1ob3Zlci1vb2InXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29vcmRMaXN0LmZvckVhY2goaG92ZXJDb29yZCA9PiB7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKFxuICAgICAgICBbaG92ZXJDb29yZFswXSwgaG92ZXJDb29yZFsxXV0sIGdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICApO1xuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXMuaXRlbShjZWxsSW5kZXgpLlxuICAgICAgICBjbGFzc0xpc3QuYWRkKGhvdmVyQ2xhc3Nlc1sxXSk7XG4gICAgfSk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGhvdmVyQ2xhc3Nlc1swXSk7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5Q29vcmQgPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRPYmogPSBmYWN0b3J5SGVscGVyLmdldENvb3JkRnJvbUluZGV4KGluZGV4LCBib2FyZCk7XG4gICAgY29uc3QgY29vcmRUZXh0ID0gYFske2Nvb3JkT2JqLnh9LCAke2Nvb3JkT2JqLnl9XWA7XG4gICAgcmV0dXJuIGNvb3JkVGV4dDtcbiAgfVxuXG4gIGNvbnN0IGdldENvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjb29yZE9iai54LFxuICAgICAgeTogY29vcmRPYmoueSxcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRMaXN0LCBib2FyZCwgZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBwYXJlbnQuY2hpbGROb2Rlc1tmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKFxuICAgICAgICBjb29yZCwgYm9hcmRcbiAgICAgICldLmNsYXNzTGlzdC5hZGQoJ3NoaXAtc3RhbmRpbmcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQ2xhc3MgPSAocGFyZW50LCBjbGFzc05hbWUpID0+IHtcbiAgICBwYXJlbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJylcbiAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgZWxzZVxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXRpYWxpemUsXG4gICAgZHJhd0dyaWQsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7IiwiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi4vc3JjL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXJGYWN0b3J5ID0gKG15TmFtZSwgYm9hcmRTaXplKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBteU5hbWU7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoYm9hcmRTaXplKTtcbiAgY29uc3QgYXR0YWNrZWRTcGFjZXMgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiB7IHJldHVybiBnYW1lYm9hcmQ7IH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWU7IH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkLCBlbmVteVBsYXllcikgPT4ge1xuICAgIGxldCBhbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICBhdHRhY2tlZFNwYWNlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbCwgY29vcmQpKSB7XG4gICAgICAgIGFscmVhZHlBdHRhY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWFscmVhZHlBdHRhY2tlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5lbXlQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIGF0dGFja2VkU3BhY2VzLnB1c2goY29vcmQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBhdHRhY2tlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0R2FtZWJvYXJkLFxuICAgIGdldE5hbWUsXG4gICAgYXR0YWNrLFxuICB9XG59XG5cbi8vIHByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzLCBuYW1lIH1cbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChwcm9wcykgPT4ge1xuICBjb25zdCBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gIGNvbnN0IGhpdHMgPSBwcm9wcy5pbml0aWFsSGl0cyB8fCBbXTtcbiAgY29uc3QgbmFtZSA9IHByb3BzLm5hbWU7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKCFoaXRzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBoaXRzLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4geyByZXR1cm4gbGVuZ3RoIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWUgfTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldE5hbWUsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoc2l6ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgIGNvb3JkOiBbaiwgaV0sXG4gICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgIHNoaXBJZDogbnVsbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgc3VuayA9IGZhbHNlO1xuICAgIH0pXG4gICAgcmV0dXJuIHN1bms7XG4gIH1cblxuICAvLyBzaGlwUHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogW3gsIHldLCBkaXI6ICgnZScgfHwgJ3MnKSB9XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwUHJvcHMsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgcGxhY2VkU2hpcElkID0gbnVsbDtcbiAgICBsZXQgcGxhY2VkQ29vcmRzID0gdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICBwbGFjZWRDb29yZHMgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0lmT3BlbihcbiAgICAgICAgc2hpcFByb3BzLmxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpO1xuICAgICAgcGxhY2VkU2hpcElkID0gc2hpcHMucHVzaChzaGlwRmFjdG9yeShzaGlwUHJvcHMpKSAtIDE7XG4gICAgICBib2FyZCA9IGJvYXJkLm1hcChjZWxsID0+IHtcbiAgICAgICAgbGV0IG5ld0NlbGwgPSBjZWxsO1xuICAgICAgICBwbGFjZWRDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgY29vcmQpKSB7XG4gICAgICAgICAgICBuZXdDZWxsID0ge1xuICAgICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICAgICAgc2hpcElkOiBwbGFjZWRTaGlwSWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0NlbGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IChlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGJvYXJkKTtcbiAgICBpZiAoYm9hcmRbaW5kZXhdLmhpdCAhPT0gMCkge1xuICAgICAgdGhyb3coJ2FscmVhZHkgaGl0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNoaXBJZCA9IGJvYXJkW2luZGV4XS5zaGlwSWQ7XG4gICAgaWYgKHNoaXBJZCA9PT0gbnVsbCkge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IC0xO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAxO1xuICAgICAgc2hpcHNbc2hpcElkXS5oaXQoY29vcmQpO1xuICAgICAgaWYgKHNoaXBzW3NoaXBJZF0uaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHsgcmV0dXJuIHNoaXBzIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiB7IHJldHVybiBib2FyZCB9O1xuXG4gIHJldHVybiB7XG4gICAgYWxsU2hpcHNTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzLFxuICAgIGdldEJvYXJkLFxuICB9XG59IiwiaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBzdGF0ZXMgPSBbXG4gICAge1xuICAgICAgaWQ6IDAsXG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBuYW1lOiAnUGxhY2UgeW91ciBzaGlwcy4nXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIHRhcmdldDogJ2VuZW15JyxcbiAgICAgIG5hbWU6IFwiUGxheWVyJ3MgdHVybi5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICB0YXJnZXQ6ICdwbGF5ZXInLFxuICAgICAgbmFtZTogXCJFbmVteSdzIHR1cm4uXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAzLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogXCJHYW1lIGZpbmlzaGVkLlwiXG4gICAgfVxuICBdO1xuICBsZXQgcG9zc2libGVFbmVteUF0dGFja3MgPSBudWxsO1xuICBsZXQgc3RhdGUgPSBzdGF0ZXNbMF07XG4gIGNvbnN0IHNoaXBMaXN0ID0gW1xuICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1IH0sXG4gICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQgfSxcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXG4gICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMyB9LFxuICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiB9XG4gIF07XG4gIGxldCBjdXJyZW50U2hpcCA9IDA7XG4gIGxldCBkaXJlY3Rpb24gPSAnZSc7XG4gIGxldCBwbGF5ZXIxID0gbnVsbDtcbiAgbGV0IGVuZW15MSA9IG51bGw7XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgcGxheWVyMSA9IHBsYXllckZhY3RvcnkoJ3BsYXllcicsIDEwKTtcbiAgICBlbmVteTEgPSBwbGF5ZXJGYWN0b3J5KCdlbmVteScsIDEwKTtcbiAgICBwb3NzaWJsZUVuZW15QXR0YWNrcyA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKTtcblxuICAgIGRpc3BsYXkuZHJhd0dyaWQocGxheWVyMSk7XG4gICAgZGlzcGxheS5kcmF3R3JpZChlbmVteTEpO1xuXG4gICAgcGxhY2VSYW5kb21TaGlwcyhlbmVteTEpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBGb3JQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMaXN0W2N1cnJlbnRTaGlwXTtcbiAgfVxuXG4gIGNvbnN0IGFkdmFuY2VTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIGlmIChjdXJyZW50U2hpcCA8IDQpIHtcbiAgICAgIGN1cnJlbnRTaGlwICsrO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzFdO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWR2YW5jZVN0YXRlID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBhbGVydCgnRW5lbXkgd2lucyEnKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuXG4gICAgfSBlbHNlIGlmIChlbmVteTEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGFsZXJ0KCdQbGF5ZXIgd2lucyEnKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc3RhdGUuaWQgPT09IDEpIHtcbiAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMl07XG4gICAgICAgIGVuZW15UmFuZG9tQXR0YWNrKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBnZXREaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIGRpcmVjdGlvbiA9ICdzJztcbiAgICBlbHNlIGRpcmVjdGlvbiA9ICdlJztcbiAgfVxuXG4gIGNvbnN0IGdldFBsYXllcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjogcGxheWVyMSxcbiAgICAgIGVuZW15OiBlbmVteTFcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVJhbmRvbVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IE1hdGguc3FydChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKS5sZW5ndGgpO1xuICAgIHNoaXBMaXN0LmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgd2hpbGUgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCkgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGxldCBjb29yZFggPSBudWxsO1xuICAgICAgICBsZXQgY29vcmRZID0gbnVsbDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2UnKSB7XG4gICAgICAgICAgY29vcmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICAgIGNvb3JkWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHBsYXllci5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxlbmd0aDogc2hpcC5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBzaGlwLm5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbY29vcmRYLCBjb29yZFldLFxuICAgICAgICAgICAgICBkaXI6IGRpcmVjdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBwbGFjZSBhIHNoaXAsIHRyeWluZyBhZ2FpbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBlbmVteVJhbmRvbUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBhdHRhY2tJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlRW5lbXlBdHRhY2tzLmxlbmd0aCk7XG4gICAgY29uc3QgYXR0YWNrQ2VsbCA9IHBvc3NpYmxlRW5lbXlBdHRhY2tzLnNwbGljZShhdHRhY2tJbmRleCwgMSlbMF07XG4gICAgY29uc3QgZGlkSGl0ID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGF0dGFja0NlbGwuY29vcmQpO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICBjb25zdCBhdHRhY2tDZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKGF0dGFja0NlbGwuY29vcmQsIHBsYXllcjEuXG4gICAgICBnZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpKTtcbiAgICBpZiAoZGlkSGl0ID4gMCkge1xuICAgICAgcGxheWVyR3JpZC5jaGlsZE5vZGVzLml0ZW0oYXR0YWNrQ2VsbEluZGV4KS5jbGFzc0xpc3QuYWRkKCdoaXQnLCAncGxheWVyLWhpdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJHcmlkLmNoaWxkTm9kZXMuaXRlbShhdHRhY2tDZWxsSW5kZXgpLmNsYXNzTGlzdC5hZGQoJ21pc3MnLCAncGxheWVyLW1pc3MnKTtcbiAgICB9XG4gICAgaWYgKGRpZEhpdCA9PT0gMikge1xuICAgICAgY29uc29sZS5sb2coZmFjdG9yeUhlbHBlci5zdW5rTWVzc2FnZShhdHRhY2tDZWxsLmNvb3JkLCBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLFxuICAgICAgICBzdGF0ZS50YXJnZXQpKTtcbiAgICB9XG4gICAgYWR2YW5jZVN0YXRlKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGdldFNoaXBGb3JQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVNoaXBQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVN0YXRlLFxuICAgIGdldFN0YXRlLFxuICAgIGdldERpcmVjdGlvbixcbiAgICB0b2dnbGVEaXJlY3Rpb24sXG4gICAgZ2V0UGxheWVycyxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgY29uc3QgYXJyYXlzTWF0Y2ggPSAoY29vcmQxLCBjb29yZDIpID0+IHtcbiAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KGNvb3JkMSkgPT09IEpTT04uc3RyaW5naWZ5KGNvb3JkMikpXG4gICAgICA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrSWZPcGVuID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBsZXQgaXNPcGVuID0gdHJ1ZTtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtnZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpXTtcbiAgICAgIGlmIChib2FyZENlbGwuc2hpcElkICE9PSBudWxsKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aHJvdygnY2VsbCBvY2N1cGllZCcpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gICAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFs1LCA1XSwgZGlyOiAoZSB8fCBzKSB9XG4gIGNvbnN0IGdldENvb3Jkc0lmT3BlbiA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNlYXJjaFggPSBsb2NhdGlvblByb3BzLmNvb3JkWzBdO1xuICAgICAgbGV0IHNlYXJjaFkgPSBsb2NhdGlvblByb3BzLmNvb3JkWzFdO1xuICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICA/IHNlYXJjaFggKz0gaVxuICAgICAgICA6IHNlYXJjaFkgKz0gaTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgW3NlYXJjaFgsIHNlYXJjaFldKVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgaWYgKCFtYXRjaGluZ0NlbGwpIHRocm93KCdvdXQgb2YgYm91bmRzJyk7XG4gICAgICBlbHNlIGlmIChtYXRjaGluZ0NlbGwuc2hpcElkICE9PSBudWxsKSB0aHJvdygnY2VsbCBvY2N1cGllZCcpXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gU3VjY2Vzc1xuICAgICAgICBjb29yZHMucHVzaChbc2VhcmNoWCwgc2VhcmNoWV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRzQ2VudGVyZWQgPSAobGVuZ3RoLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHN0YXJ0aW5nQ29vcmQgPSBudWxsO1xuICAgIGNvbnN0IGRpciA9IGxvY2F0aW9uUHJvcHMuZGlyO1xuICAgIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpLFxuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzFdXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAncycpIHtcbiAgICAgIHN0YXJ0aW5nQ29vcmQgPSBbXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMF0sXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV0gLSBNYXRoLmZsb29yKChsZW5ndGggLSAxKS8yKVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IGRpcmVjdGlvbiBiZWZvcmUgZ2V0dGluZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjb29yZFggPSAoZGlyID09PSAnZScpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFswXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzBdO1xuICAgICAgY29uc3QgY29vcmRZID0gKGRpciA9PT0gJ3MnKVxuICAgICAgICA/IHN0YXJ0aW5nQ29vcmRbMV0gKyBpXG4gICAgICAgIDogc3RhcnRpbmdDb29yZFsxXTtcbiAgICAgIGNvb3JkQXJyYXkucHVzaChbY29vcmRYLCBjb29yZFldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkQXJyYXk7XG4gIH1cblxuICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGNvb3JkWzFdICogTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgKyBjb29yZFswXTtcbiAgICBpZiAoaW5kZXggPiBib2FyZC5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgdGhyb3coJ2dldEluZGV4Li4uOiBvdXQgb2YgYm91bmRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCk7XG4gICAgY29uc3QgeCA9IGluZGV4ICUgc2l6ZTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgIFxuICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfVxuICB9XG5cbiAgY29uc3QgbnVkZ2VDb29yZHNCeSA9IChjb29yZExpc3QsIG51bWJlcikgPT4ge1xuXG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc09uID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBmaXJzdENvb3JkID0gY29vcmRMaXN0WzBdO1xuICAgIGNvbnN0IGxhc3RDb29yZCA9IGNvb3JkTGlzdFtjb29yZExpc3QubGVuZ3RoIC0gMV07XG4gICAgbGV0IG5ld0xpc3QgPSBudWxsO1xuICAgIC8vIG9mZiB0aGUgcmlnaHQgc2lkZVxuICAgIGNvbnN0IHJpZ2h0U2lkZUhhbmcgPSBsYXN0Q29vcmRbMF0gLSAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKTtcbiAgICBjb25zdCBsZWZ0U2lkZUhhbmcgID0gLTEgKiBmaXJzdENvb3JkWzBdO1xuICAgIGNvbnN0IHRvcEhhbmcgICAgICAgPSAtMSAqIGZpcnN0Q29vcmRbMV07XG4gICAgY29uc3QgYm90dG9tSGFuZyAgICA9IGxhc3RDb29yZFsxXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGlmIChyaWdodFNpZGVIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdIC0gcmlnaHRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChsZWZ0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gKyBsZWZ0U2lkZUhhbmcsIGNvb3JkWzFdXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodG9wSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gKyB0b3BIYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYm90dG9tSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gLSBib3R0b21IYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3TGlzdDtcbiAgfVxuXG4gIGNvbnN0IHN1bmtNZXNzYWdlID0gKGNvb3JkLCBnYW1lYm9hcmQsIHRhcmdldCkgPT4ge1xuICAgIGlmIChjb29yZC54KSB7XG4gICAgICBjb29yZCA9IFtjb29yZC54LCBjb29yZC55XTtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBnZXRJbmRleEZyb21Db29yZChjb29yZCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnN0IHNoaXBJZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpW2luZGV4XS5zaGlwSWQ7XG4gICAgY29uc3QgYXR0YWNrZXIgPSAodGFyZ2V0ID09PSAnZW5lbXknXG4gICAgICA/ICdZb3UnXG4gICAgICA6ICdFbmVteScpO1xuICAgIGNvbnN0IHNoaXBOYW1lID0gZ2FtZWJvYXJkLmdldFNoaXBzKClbc2hpcElkXS5nZXROYW1lKCk7XG4gICAgY29uc3Qgc2hpcFNpemUgPSBnYW1lYm9hcmQuZ2V0U2hpcHMoKVtzaGlwSWRdLmdldExlbmd0aCgpO1xuICAgIHJldHVybiBhdHRhY2tlciArICcgc3VuayB0aGUgJyArIHNoaXBOYW1lICsgJyEgKHNpemU6ICcgKyBzaGlwU2l6ZSArICcpJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyYXlzTWF0Y2gsXG4gICAgY2hlY2tJZk9wZW4sXG4gICAgZ2V0Q29vcmRzSWZPcGVuLFxuICAgIGdldENvb3Jkc0NlbnRlcmVkLFxuICAgIGdldEluZGV4RnJvbUNvb3JkLFxuICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIG51ZGdlQ29vcmRzQnksXG4gICAgbnVkZ2VDb29yZHNPbixcbiAgICBzdW5rTWVzc2FnZSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFjdG9yeUhlbHBlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21leWVycmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1nYW1lLWJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXG4gIC0taG92ZXItbGlnaHQtYmx1ZTogcmdiKDEzMSwgMTc0LCAyMzgpO1xcbiAgLS1ob3Zlci1ibHVlOiBkb2RnZXJCbHVlO1xcbiAgLS1ob3Zlci1jcmltc29uOiBjcmltc29uO1xcbiAgLS1ob3Zlci1yZWQ6IHJnYigyNTUsIDExMiwgMTEyKTtcXG4gIC0taG92ZXItZ29sZDogZ29sZDtcXG4gIC0taG92ZXIteWVsbG93OiByZ2IoMjU1LCAyNTUsIDE0NSk7XFxuICAtLXNoaXAtZ3JlZW46IGZvcmVzdEdyZWVuO1xcbiAgLS1ncmlkLWNvbG9yOiB3aGl0ZTtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiBjYWxjKDIuOHZoICsgMC4zcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjN2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgzIHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIGZvbnQtc2l6ZTogY2FsYygxLjR2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMjByZW0gKyAxMHZ3KTtcXG4gIG1heC13aWR0aDogY2FsYygoMTAwdmggLSAodmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMikpIC8gMi41KTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQge1xcbiAgLyogbWFyZ2luOiAycmVtOyAqL1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogODAlO1xcbiAgcGFkZGluZy1ib3R0b206IDgwJTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwJTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5ncmlkLWNlbGwge1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjM7ICovXFxuICBib3JkZXI6IGNhbGModmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSkgLyAyKSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvcik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWNvbG9yLCB3aGl0ZSk7XFxufVxcbi5wbGFjZS1ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1saWdodC1ibHVlLCByZ2IoOTgsIDE1MSwgMjMwKSk7XFxufVxcbi5wbGFjZS1ob3Zlci1zb2xvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWJsdWUsIGRvZGdlckJsdWUpO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNyaW1zb24sIGNyaW1zb24pO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iLXNvbG8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCByZWQpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXIteWVsbG93LCB5ZWxsb3cpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1nb2xkLCBnb2xkKTtcXG59XFxuLnNoaXAtc3RhbmRpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcC1ncmVlbiwgZm9yZXN0R3JlZW4pO1xcbn1cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHB1cnBsZTtcXG59XFxuLmVuZW15LWhpdCB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG5cXG59XFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcbi5lbmVteS1taXNzIHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcblxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLGtDQUFrQztFQUNsQyxzQ0FBc0M7RUFDdEMsd0JBQXdCO0VBQ3hCLHdCQUF3QjtFQUN4QiwrQkFBK0I7RUFDL0Isa0JBQWtCO0VBQ2xCLGtDQUFrQztFQUNsQyx5QkFBeUI7RUFDekIsbUJBQW1CO0VBQ25CLDBCQUEwQjtFQUMxQix1QkFBdUI7RUFDdkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUNBQXlDO0FBQzNDO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsK0JBQStCO0VBQy9CLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLCtCQUErQjtFQUMvQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGtEQUFrRDtFQUNsRCxvREFBb0Q7RUFDcEQsZ0NBQWdDO0VBQ2hDLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLCtEQUErRDtFQUMvRCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLE1BQU07RUFDTixPQUFPO0VBQ1AsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLDBFQUEwRTtFQUMxRSxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQiw0QkFBNEI7QUFDOUI7QUFDQTtFQUNFLGlEQUFpRDtBQUNuRDtBQUNBO0VBQ0UsV0FBVztFQUNYLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxpREFBaUQ7QUFDbkQ7QUFDQTtFQUNFLHNDQUFzQztFQUN0Qyx3RUFBd0U7RUFDeEUsMENBQTBDO0FBQzVDO0FBQ0E7RUFDRSw0REFBNEQ7QUFDOUQ7QUFDQTtFQUNFLCtDQUErQztBQUNqRDtBQUNBO0VBQ0UsK0NBQStDO0FBQ2pEO0FBQ0E7RUFDRSx1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLDZDQUE2QztBQUMvQztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDO0FBQ0E7RUFDRSxnREFBZ0Q7QUFDbEQ7QUFDQTtFQUNFLHdCQUF3QjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtFQUNFLHVCQUF1QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgLS1wYWdlLW1hcmdpbjogMXJlbTtcXG4gIC0tZ2FtZS1iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XFxuICAtLWhvdmVyLWxpZ2h0LWJsdWU6IHJnYigxMzEsIDE3NCwgMjM4KTtcXG4gIC0taG92ZXItYmx1ZTogZG9kZ2VyQmx1ZTtcXG4gIC0taG92ZXItY3JpbXNvbjogY3JpbXNvbjtcXG4gIC0taG92ZXItcmVkOiByZ2IoMjU1LCAxMTIsIDExMik7XFxuICAtLWhvdmVyLWdvbGQ6IGdvbGQ7XFxuICAtLWhvdmVyLXllbGxvdzogcmdiKDI1NSwgMjU1LCAxNDUpO1xcbiAgLS1zaGlwLWdyZWVuOiBmb3Jlc3RHcmVlbjtcXG4gIC0tZ3JpZC1jb2xvcjogd2hpdGU7XFxuICAtLWdyaWQtYm9yZGVyLWNvbG9yOiBibGFjaztcXG4gIC0tZ3JpZC1ib3JkZXItc2l6ZTogMXB4O1xcbiAgLyogLS1ncmlkLW9mZnNldDogMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogY2FsYygyLjh2aCArIDAuM3JlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgyIHtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IGNhbGMoMi4zdmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICBmb250LXNpemU6IGNhbGMoMS44dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oNCB7XFxuICBmb250LXNpemU6IGNhbGMoMS40dmggKyAwLjNyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuI2dhbWUtY29udGFpbmVyIHtcXG4gIHdpZHRoOiBjYWxjKDIwcmVtICsgMTB2dyk7XFxuICBtYXgtd2lkdGg6IGNhbGMoKDEwMHZoIC0gKHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpKSAvIDIuNSk7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5ncmlkIHtcXG4gIC8qIG1hcmdpbjogMnJlbTsgKi9cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDgwJTtcXG4gIHBhZGRpbmctYm90dG9tOiA4MCU7XFxuICBtYXJnaW4tYm90dG9tOiAxLjV2aDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5lbmVteS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxufVxcbi5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZy1ib3R0b206IDEwMCU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5wbGF5ZXItZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWJvcmRlci1jb2xvciwgYmxhY2spO1xcbn1cXG4uZ3JpZC1jZWxsIHtcXG4gIC8qIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zOyAqL1xcbiAgYm9yZGVyOiBjYWxjKHZhcigtLWdyaWQtYm9yZGVyLXNpemUpIC8gMikgc29saWQgdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1jb2xvciwgd2hpdGUpO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItbGlnaHQtYmx1ZSwgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1ibHVlLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jcmltc29uLCBjcmltc29uKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgcmVkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXllbGxvdywgeWVsbG93KTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItZ29sZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtZ3JlZW4sIGZvcmVzdEdyZWVuKTtcXG59XFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwdXJwbGU7XFxufVxcbi5lbmVteS1oaXQge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuXFxufVxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uZW5lbXktbWlzcyB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG5cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciAmJiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdKTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJyZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vbWV5ZXJyZXNldC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcblxuZGlzcGxheS5pbml0aWFsaXplKCk7XG5nYW1lLnN0YXJ0KCk7Il0sIm5hbWVzIjpbImZhY3RvcnlIZWxwZXIiLCJnYW1lYm9hcmRGYWN0b3J5IiwicGxheWVyRmFjdG9yeSIsInNoaXBGYWN0b3J5IiwiZ2FtZSIsImRpc3BsYXkiLCJncmlkIiwic2hhcmVkQ29vcmRMaXN0IiwiYWxsSG92ZXJDbGFzc2VzIiwiaW5pdGlhbGl6ZSIsImVuZW15R3JpZFdyYXBwZXIiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJlbmVteUdyaWRMYWJlbCIsImlubmVyVGV4dCIsImVuZW15R3JpZCIsInBsYXllckdyaWRXcmFwcGVyIiwicGxheWVyR3JpZExhYmVsIiwicGxheWVyR3JpZCIsImdhbWVDb250YWluZXIiLCJpZCIsImFwcGVuZENoaWxkIiwicGFnZUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJjaGlsZCIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5IiwidG9nZ2xlRGlyZWN0aW9uIiwiY2xlYXJDbGFzcyIsImRpc3BsYXlIb3ZlciIsImRyYXdHcmlkIiwicGxheWVyIiwibmFtZSIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJjZWxsSWQiLCJnZXRTdGF0ZSIsImN1cnJlbnRTaGlwIiwiZ2V0U2hpcEZvclBsYWNlbWVudCIsInRhcmdldCIsImNvbnRhaW5zIiwicGxhY2VTaGlwIiwibGVuZ3RoIiwic2l6ZSIsImNvb3JkIiwiZGlyIiwiZ2V0RGlyZWN0aW9uIiwiZ2V0Qm9hcmQiLCJhZHZhbmNlU2hpcFBsYWNlbWVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRDb29yZCIsImlzSGl0IiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5IiwiY29uc29sZSIsImxvZyIsInN1bmtNZXNzYWdlIiwiYWR2YW5jZVN0YXRlIiwic3R5bGUiLCJNYXRoIiwic3FydCIsImVsZW1lbnQiLCJ1bmRlZmluZWQiLCJob3Zlck5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsIml0ZW0iLCJnZXRQbGF5ZXJzIiwiY2VsbENvb3JkIiwiY29vcmRMaXN0IiwiZ2V0Q29vcmRzQ2VudGVyZWQiLCJudWRnZUNvb3Jkc09uIiwiaG92ZXJDbGFzc2VzIiwiY2hlY2tJZk9wZW4iLCJlcnJvciIsImhvdmVyQ29vcmQiLCJjZWxsSW5kZXgiLCJnZXRJbmRleEZyb21Db29yZCIsImRpc3BsYXlDb29yZCIsImluZGV4IiwiYm9hcmQiLCJjb29yZE9iaiIsImdldENvb3JkRnJvbUluZGV4IiwiY29vcmRUZXh0IiwicGFyZW50IiwiY2xhc3NOYW1lIiwibXlOYW1lIiwiYm9hcmRTaXplIiwiYXR0YWNrZWRTcGFjZXMiLCJhdHRhY2siLCJlbmVteVBsYXllciIsImFscmVhZHlBdHRhY2tlZCIsImFycmF5c01hdGNoIiwicHVzaCIsInByb3BzIiwiaGl0cyIsImluaXRpYWxIaXRzIiwiaGl0IiwiaW5jbHVkZXMiLCJpc1N1bmsiLCJnZXRMZW5ndGgiLCJqIiwic2hpcElkIiwic2hpcHMiLCJhbGxTaGlwc1N1bmsiLCJzdW5rIiwic2hpcCIsInNoaXBQcm9wcyIsImxvY2F0aW9uUHJvcHMiLCJwbGFjZWRTaGlwSWQiLCJwbGFjZWRDb29yZHMiLCJnZXRDb29yZHNJZk9wZW4iLCJtYXAiLCJuZXdDZWxsIiwiZ2V0U2hpcHMiLCJzdGF0ZXMiLCJwb3NzaWJsZUVuZW15QXR0YWNrcyIsInN0YXRlIiwic2hpcExpc3QiLCJkaXJlY3Rpb24iLCJwbGF5ZXIxIiwiZW5lbXkxIiwic3RhcnQiLCJwbGFjZVJhbmRvbVNoaXBzIiwiYWxlcnQiLCJlbmVteVJhbmRvbUF0dGFjayIsImVuZW15Iiwic3VjY2VzcyIsImZsb29yIiwicmFuZG9tIiwiY29vcmRYIiwiY29vcmRZIiwiYXR0YWNrSW5kZXgiLCJhdHRhY2tDZWxsIiwic3BsaWNlIiwiZGlkSGl0IiwiYXR0YWNrQ2VsbEluZGV4IiwiY29vcmQxIiwiY29vcmQyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzT3BlbiIsImJvYXJkQ2VsbCIsImNvb3JkcyIsInNlYXJjaFgiLCJzZWFyY2hZIiwibWF0Y2hpbmdDZWxsIiwiZmluZCIsInN0YXJ0aW5nQ29vcmQiLCJjb29yZEFycmF5IiwibnVkZ2VDb29yZHNCeSIsIm51bWJlciIsImZpcnN0Q29vcmQiLCJsYXN0Q29vcmQiLCJuZXdMaXN0IiwicmlnaHRTaWRlSGFuZyIsImxlZnRTaWRlSGFuZyIsInRvcEhhbmciLCJib3R0b21IYW5nIiwiYXR0YWNrZXIiLCJzaGlwTmFtZSIsInNoaXBTaXplIl0sInNvdXJjZVJvb3QiOiIifQ==