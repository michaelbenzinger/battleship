/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/animate.js":
/*!************************!*\
  !*** ./src/animate.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./src/game.js");


var animate = function () {
  var flipCells = [];
  var animationRefresh = 0.9;
  var animationLength = 0.35;
  var flipping = false;

  var addToFlipCells = function addToFlipCells(element) {
    flipCells.push(element);
    element.classList.add('hit-flip');

    if (!flipping) {
      flipping = true;
      flipAll();
    }
  };

  var flipAll = function flipAll() {
    if (_game_js__WEBPACK_IMPORTED_MODULE_0__["default"].getState().id !== 3) {
      flipCells.forEach(function (cell) {
        cell.style.animation = 'none';
      });
      flipCells[0].offsetWidth;
      flipCells.forEach(function (cell) {
        cell.style.animation = "hitflip ".concat(animationLength, "s 1");
      });
      setTimeout(function () {
        flipAll();
      }, animationRefresh * 1000);
    }
  };

  return {
    addToFlipCells: addToFlipCells
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animate);

/***/ }),

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
/* harmony import */ var _animate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animate.js */ "./src/animate.js");
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
    var enemyArea = document.createElement('div');
    enemyArea.classList.add('enemy-area');
    var enemyGridWrapper = document.createElement('div');
    enemyGridWrapper.classList.add('grid-wrapper', 'enemy-grid-wrapper');
    var enemyGridLabel = document.createElement('h3');
    enemyGridLabel.classList.add('grid-label');
    enemyGridLabel.innerText = 'Enemy';
    var enemyDelayToggle = document.createElement('h4');
    enemyDelayToggle.classList.add('enemy-delay-toggle');
    enemyDelayToggle.innerText = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDelay();
    enemyDelayToggle.addEventListener('click', function (e) {
      e.target.innerText = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDelay();
    });
    var enemyGrid = document.createElement('div');
    enemyGrid.classList.add('grid', 'enemy-grid');
    var playerArea = document.createElement('div');
    playerArea.classList.add('player-area');
    var playerGridWrapper = document.createElement('div');
    playerGridWrapper.classList.add('grid-wrapper', 'player-grid-wrapper');
    var playerGridLabel = document.createElement('h2');
    playerGridLabel.classList.add('grid-label');
    playerGridLabel.innerText = 'Player';
    var playerGrid = document.createElement('div');
    playerGrid.classList.add('grid', 'player-grid');
    var boardsContainer = document.createElement('div');
    boardsContainer.classList.add('boards-container');
    var infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');
    var gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    var infoTitle = document.createElement('h1');
    infoTitle.classList.add('info-title');
    infoTitle.innerText = 'Battleships';
    var infoStateContainer = document.createElement('div');
    infoStateContainer.classList.add('info-state-container');
    var infoState = document.createElement('p');
    infoState.classList.add('info-state');
    infoState.innerText = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().name;
    var infoDetails = document.createElement('div');
    infoDetails.classList.add('info-details');
    var infoRemaining = document.createElement('div');
    infoRemaining.classList.add('info-remaining');
    var infoRemainingTitle = document.createElement('h3');
    infoRemainingTitle.classList.add('info-remaining-title');
    infoRemainingTitle.innerText = 'Remaining Enemy Ships';
    infoRemaining.appendChild(infoRemainingTitle); // enemyGrid.style['background-image'] =
    //   'url(https://source.unsplash.com/random?ocean)';
    // setTimeout(() => {
    //   playerGrid.style['background-image'] =
    //     'url(https://source.unsplash.com/random?boat,battleship)';
    // }, 5000);

    infoContainer.appendChild(infoTitle);
    infoStateContainer.appendChild(infoState);
    infoContainer.appendChild(infoStateContainer);
    infoContainer.appendChild(infoDetails);
    infoContainer.appendChild(infoRemaining);
    gameContainer.appendChild(boardsContainer);
    gameContainer.appendChild(infoContainer);
    boardsContainer.appendChild(enemyArea);
    enemyArea.appendChild(enemyGridLabel);
    enemyArea.appendChild(enemyDelayToggle);
    enemyArea.appendChild(enemyGridWrapper);
    enemyGridWrapper.appendChild(enemyGrid);
    boardsContainer.appendChild(playerArea);
    playerArea.appendChild(playerGridLabel);
    playerArea.appendChild(playerGridWrapper);
    playerGridWrapper.appendChild(playerGrid);
    var pageContainer = document.querySelector('#page-container');

    if (pageContainer.hasChildNodes) {
      pageContainer.childNodes.forEach(function (child) {
        child.remove();
      });
    }

    pageContainer.appendChild(gameContainer);
    document.addEventListener('keydown', function (e) {
      if (e.key === '.') {
        _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDirection();
        var horVer = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection() === 'e' ? 'horizontal' : 'vertical';
        logMessage('Rotated direction to ' + horVer);
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

            cell.classList.remove('grid-cell-unclicked');

            if (isHit > 0) {
              _animate_js__WEBPACK_IMPORTED_MODULE_3__["default"].addToFlipCells(e.target);
              cell.classList.add('hit', 'enemy-hit');
            } else {
              cell.classList.add('miss', 'enemy-miss');
            }

            if (isHit === 2) {
              logMessage(_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_0__["default"].sunkMessage(coord, gameboard, _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getState().target));
              logRemaining(player.getGameboard().getShips());
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

  var logMessage = function logMessage(msg) {
    var infoDetails = document.querySelector('.info-details');
    var currentMessage = infoDetails.firstChild;
    var message = document.createElement('p');
    message.classList.add('info-details-message');
    message.innerText = msg;

    if (currentMessage) {
      infoDetails.insertBefore(message, currentMessage);
    } else {
      infoDetails.appendChild(message);
    }
  };

  var logRemaining = function logRemaining(ships) {
    var infoContainer = document.querySelector('.info-container');
    var prevInfoRemaining = document.querySelector('.info-remaining');
    if (prevInfoRemaining) infoContainer.removeChild(prevInfoRemaining);
    var infoRemaining = document.createElement('div');
    infoRemaining.classList.add('info-remaining');
    infoContainer.appendChild(infoRemaining);
    var infoRemainingTitle = document.createElement('h3');
    infoRemainingTitle.classList.add('info-remaining-title');
    infoRemainingTitle.innerText = 'Remaining Enemy Ships';
    infoRemaining.appendChild(infoRemainingTitle);
    var infoRemainingList = document.createElement('div');
    infoRemainingList.classList.add('info-remaining-list');
    infoRemaining.appendChild(infoRemainingList);
    ships.forEach(function (ship) {
      if (!ship.isSunk()) {
        var remainingShip = document.createElement('div');
        remainingShip.classList.add('remaining-ship');
        remainingShip.innerText += " ".concat(ship.getName(), " (").concat(ship.getLength(), ")");
        infoRemainingList.appendChild(remainingShip);
      }
    }); // const listStr = infoRemainingList.innerText;
    // infoRemainingList.innerText = listStr.substring(0, listStr.length - 1);
  };

  var stateMessage = function stateMessage(msg) {
    var infoState = document.querySelector('.info-state');
    infoState.innerText = msg;
  };

  var displayRotateButton = function displayRotateButton() {
    var rotateButton = document.createElement('div');
    rotateButton.classList.add('rotate-button');
    var rotateButtonText = document.createElement('div');
    rotateButtonText.classList.add('rotate-button-text');
    rotateButtonText.innerText = 'Rotate';
    var rotateButtonIcon = document.createElement('div');
    rotateButtonIcon.classList.add('rotate-button-icon');
    rotateButtonIcon.innerText = '.';
    rotateButton.appendChild(rotateButtonText);
    rotateButton.appendChild(rotateButtonIcon);
    document.querySelector('.info-state-container').appendChild(rotateButton);
    rotateButton.addEventListener('click', function (e) {
      _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].toggleDirection();
      var horVer = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].getDirection() === 'e' ? 'horizontal' : 'vertical';
      logMessage('Rotated direction to ' + horVer);
    });
  };

  var removeRotateButton = function removeRotateButton() {
    document.querySelector('.rotate-button').remove();
  };

  var makeCellsUnclicked = function makeCellsUnclicked() {
    document.querySelector('.enemy-grid').childNodes.forEach(function (cell) {
      if (cell.classList.length === 1) {
        cell.classList.add('grid-cell-unclicked');
      }
    });
  };

  var removeCellsUnclicked = function removeCellsUnclicked() {
    document.querySelector('.enemy-grid').childNodes.forEach(function (cell) {
      cell.classList.remove('grid-cell-unclicked');
    });
  };

  return {
    initialize: initialize,
    drawGrid: drawGrid,
    logMessage: logMessage,
    stateMessage: stateMessage,
    logRemaining: logRemaining,
    displayRotateButton: displayRotateButton,
    removeRotateButton: removeRotateButton,
    makeCellsUnclicked: makeCellsUnclicked,
    removeCellsUnclicked: removeCellsUnclicked
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

  var getUnsunkShips = function getUnsunkShips() {
    var unsunkShips = [];
    ships.forEach(function (ship) {
      if (!ship.isSunk()) unsunkShips.push(ship);
    });
    return unsunkShips;
  };

  var getBoard = function getBoard() {
    return board;
  };

  return {
    allShipsSunk: allShipsSunk,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    getShips: getShips,
    getUnsunkShips: getUnsunkShips,
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
/* harmony import */ var _helpers_enemylogic_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/enemylogic.js */ "./src/helpers/enemylogic.js");





var game = function () {
  var enemyDelayMaxInitial = 2;
  var enemyDelayMax = 0;
  var states = [{
    id: 0,
    target: null,
    name: 'Place your ships'
  }, {
    id: 1,
    target: 'enemy',
    name: "Player's turn"
  }, {
    id: 2,
    target: 'player',
    name: "Enemy's turn"
  }, {
    id: 3,
    target: null,
    name: "Game finished"
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
    direction = 'e';
    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].displayRotateButton();
    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage('Place your ' + shipList[currentShip].name);
  };

  var getShipForPlacement = function getShipForPlacement() {
    return shipList[currentShip];
  };

  var advanceShipPlacement = function advanceShipPlacement() {
    if (currentShip < 4) {
      currentShip++;
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage('Place your ' + shipList[currentShip].name);
      return 0;
    } else {
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logRemaining(enemy1.getGameboard().getShips());
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeCellsUnclicked();
      advanceState();
      return 1;
    }
  };

  var advanceState = function advanceState() {
    if (player1.getGameboard().allShipsSunk()) {
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage('Enemy wins.');
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeCellsUnclicked();
      state = states[3];
    } else if (enemy1.getGameboard().allShipsSunk()) {
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage('You win!');
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeCellsUnclicked();
      state = states[3];
    } else {
      if (state.id === 0) {
        _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeRotateButton();
        state = states[1];
      } else if (state.id === 1) {
        _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeCellsUnclicked();
        state = states[2];
        var delayTime = enemyDelayMax / 4 + Math.random() * enemyDelayMax * 3 / 4;
        console.log('Delaying ' + delayTime + ' seconds');

        if (delayTime !== 0) {
          setTimeout(function () {
            enemyRandomAttack();
          }, 1000 * delayTime);
        } else {
          enemyRandomAttack();
        }
      } else {
        _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeCellsUnclicked();
        state = states[1];
      }
    }

    _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].stateMessage(state.name);
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
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage(_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_2__["default"].sunkMessage(attackCell.coord, player1.getGameboard(), game.getState().target));
    }

    advanceState();
  };

  var toggleDelay = function toggleDelay() {
    if (enemyDelayMax === 0) {
      enemyDelayMax = enemyDelayMaxInitial;
      return 'delay on';
    } else {
      enemyDelayMax = 0;
      return 'delay off';
    }
  };

  return {
    start: start,
    getShipForPlacement: getShipForPlacement,
    advanceShipPlacement: advanceShipPlacement,
    advanceState: advanceState,
    getState: getState,
    getDirection: getDirection,
    toggleDirection: toggleDirection,
    getPlayers: getPlayers,
    toggleDelay: toggleDelay
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);

/***/ }),

/***/ "./src/helpers/enemylogic.js":
/*!***********************************!*\
  !*** ./src/helpers/enemylogic.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../game.js */ "./src/game.js");


var enemyLogic = function () {
  var playerBoard = null;
  var activeHits = [];

  var processHit = function processHit(coord) {
    if (playerBoard === null) playerBoard = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayers().player.getGameboard();
  };

  var getMove = function getMove() {};

  return {
    processHit: processHit,
    getNextMove: getNextMove
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (enemyLogic);

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
    console.log({
      coord: coord,
      gameboard: gameboard,
      target: target
    });

    if (coord.x !== undefined) {
      coord = [coord.x, coord.y];
    }

    var index = getIndexFromCoord(coord, gameboard.getBoard());
    console.log(index);
    var shipId = gameboard.getBoard()[index].shipId;
    var attacker = target === 'enemy' ? 'You' : 'Enemy';
    var shipName = gameboard.getShips()[shipId].getName();
    var shipSize = gameboard.getShips()[shipId].getLength();
    return attacker + ' sunk the ' + shipName + '! (' + shipSize + ')';
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --grid-border-size: 0px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--light-2, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--light-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;;EAEvB,gBAAgB;EAChB,eAAe;EACf,6BAA6B;EAC7B,eAAe;EACf,yBAAyB;EACzB,yBAAyB;EACzB,yBAAyB;EACzB,0BAA0B;EAC1B,6BAA6B;EAC7B,4BAA4B;EAC5B,8BAA8B;EAC9B,6BAA6B;EAC7B,qBAAqB;;EAErB,+CAA+C;;EAE/C,sDAAsD;EACtD,0DAA0D;;EAE1D,0CAA0C;EAC1C,yCAAyC;EACzC,yCAAyC;EACzC,yCAAyC;;EAEzC,yBAAyB;AAC3B;;AAEA;EACE,wCAAwC;EACxC,4BAA4B;EAC5B,sCAAsC;AACxC;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,iCAAiC;AACnC;AACA;EACE,iDAAiD;EACjD,kDAAkD;EAClD,qCAAqC;EACrC,gCAAgC;AAClC;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,uBAAuB;EACvB,6BAA6B;EAC7B,cAAc;EACd,8BAA8B;AAChC;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,gEAAgE;EAChE,sBAAsB;AACxB;AACA;EACE,2CAA2C;EAC3C,oDAAoD;EACpD,qBAAqB;EACrB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,yCAAyC;EACzC,kDAAkD;EAClD,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,4BAA4B;AAC9B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,kBAAkB;AACpB;AACA;;AAEA;AACA;EACE,sCAAsC;EACtC,8DAA8D;EAC9D,sCAAsC;EACtC,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,kDAAkD;AACpD;AACA;EACE,eAAe;EACf,4CAA4C;EAC5C,wBAAwB;EACxB;oDACkD;EAClD,+CAA+C;EAC/C,kCAAkC;EAClC,UAAU;AACZ;AACA;EACE,oDAAoD;AACtD;AACA;EACE,eAAe;EACf,6CAA6C;AAC/C;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,eAAe;EACf,qBAAqB;AACvB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,eAAe;EACf,wCAAwC;AAC1C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,4BAA4B;AAC9B;AACA;EACE;IACE,wBAAwB;EAC1B;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;;AAEA;AACA;;AAEA;AACA;EACE,qCAAqC;EACrC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,2BAA2B;EAC3B,kCAAkC;EAClC,iDAAiD;EACjD,yCAAyC;AAC3C;AACA;EACE,4BAA4B;EAC5B,iCAAiC;EACjC,mBAAmB;AACrB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;EACrB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,iCAAiC;EACjC,oBAAoB;AACtB;AACA;EACE,2BAA2B;EAC3B,uCAAuC;EACvC,iCAAiC;EACjC,uBAAuB;EACvB,uBAAuB;EACvB,qBAAqB;AACvB;AACA;EACE,aAAa;EACb,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,uCAAuC;EACvC,2BAA2B;EAC3B,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE;IACE,mCAAmC;EACrC;EACA;IACE,YAAY;EACd;EACA;IACE,cAAc;IACd,iBAAiB;EACnB;EACA;IACE,uCAAuC;IACvC,gDAAgD;EAClD;EACA;IACE,yCAAyC;IACzC,kDAAkD;EACpD;EACA;IACE,8CAA8C;IAC9C,kBAAkB;EACpB;AACF","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --grid-border-size: 0px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--light-2, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--light-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sT0FBTyxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sZ0NBQWdDLHdCQUF3Qiw0QkFBNEIsdUJBQXVCLG9CQUFvQixrQ0FBa0Msb0JBQW9CLDhCQUE4Qiw4QkFBOEIsOEJBQThCLCtCQUErQixrQ0FBa0MsaUNBQWlDLG1DQUFtQyxrQ0FBa0MsMEJBQTBCLHNEQUFzRCwyREFBMkQsaUVBQWlFLGlEQUFpRCw4Q0FBOEMsOENBQThDLDhDQUE4Qyw4QkFBOEIsS0FBSyxVQUFVLDZDQUE2QyxpQ0FBaUMsMkNBQTJDLEdBQUcsTUFBTSxxQkFBcUIsc0NBQXNDLDZCQUE2QixHQUFHLE1BQU0scUJBQXFCLHNDQUFzQyw2QkFBNkIsR0FBRyxNQUFNLHFCQUFxQixzQ0FBc0MsNkJBQTZCLEdBQUcsTUFBTSxxQkFBcUIsb0NBQW9DLDZCQUE2QixHQUFHLEtBQUssc0NBQXNDLEdBQUcsbUJBQW1CLHNEQUFzRCx1REFBdUQsMENBQTBDLHFDQUFxQyxHQUFHLG1CQUFtQixrQkFBa0Isd0JBQXdCLG1DQUFtQyw0QkFBNEIsa0NBQWtDLG1CQUFtQixtQ0FBbUMsR0FBRyxxQkFBcUIsS0FBSyxpQkFBaUIsNEJBQTRCLEdBQUcsU0FBUyxrQkFBa0IsV0FBVyxZQUFZLGdCQUFnQixpQkFBaUIsdUJBQXVCLFdBQVcscUVBQXFFLDJCQUEyQixHQUFHLHVCQUF1QixnREFBZ0QseURBQXlELDBCQUEwQix1QkFBdUIsaUNBQWlDLEdBQUcsZUFBZSwwQ0FBMEMsMkJBQTJCLEdBQUcsd0JBQXdCLDhDQUE4Qyx1REFBdUQsdUJBQXVCLGdDQUFnQyxHQUFHLGdCQUFnQiwwQ0FBMEMsMkJBQTJCLEdBQUcsZUFBZSxxQkFBcUIsS0FBSywyQkFBMkIsMEJBQTBCLEdBQUcsdUJBQXVCLDBCQUEwQixzQ0FBc0MscUJBQXFCLHdCQUF3QixvQkFBb0IsaUNBQWlDLEdBQUcsNkJBQTZCLHFDQUFxQyxHQUFHLGVBQWUsdUJBQXVCLEdBQUcsZ0JBQWdCLEtBQUssY0FBYyx5Q0FBeUMscUVBQXFFLDJDQUEyQywyQkFBMkIsR0FBRyxvQ0FBb0MsMkJBQTJCLHVEQUF1RCxHQUFHLDBDQUEwQyxvQkFBb0IsaURBQWlELDJCQUEyQix3R0FBd0csc0RBQXNELHFDQUFxQyxpQkFBaUIsR0FBRyxnQkFBZ0IseURBQXlELEdBQUcscUJBQXFCLG9CQUFvQixrREFBa0QsR0FBRyxvQkFBb0IsOEJBQThCLEdBQUcseUJBQXlCLG9CQUFvQiwwQkFBMEIsR0FBRyx5QkFBeUIsNkNBQTZDLEdBQUcsOEJBQThCLG9CQUFvQiw2Q0FBNkMsR0FBRyxrQkFBa0IsNENBQTRDLEdBQUcsUUFBUSxpREFBaUQsR0FBRyxhQUFhLGlDQUFpQyxHQUFHLHNCQUFzQixRQUFRLCtCQUErQixLQUFLLFVBQVUsaUNBQWlDLEtBQUssR0FBRyxjQUFjLEtBQUssZUFBZSxPQUFPLFNBQVMsMENBQTBDLG1CQUFtQixLQUFLLGVBQWUsS0FBSyxlQUFlLCtDQUErQyxHQUFHLG1CQUFtQixnQ0FBZ0MsdUNBQXVDLHNEQUFzRCw4Q0FBOEMsR0FBRyxlQUFlLGlDQUFpQyxzQ0FBc0Msd0JBQXdCLEdBQUcseUJBQXlCLDBCQUEwQixHQUFHLGVBQWUsbUJBQW1CLGlDQUFpQywwQkFBMEIseUJBQXlCLHVCQUF1QixHQUFHLHNDQUFzQywwQkFBMEIsR0FBRyxrQkFBa0IsbUJBQW1CLGlDQUFpQywwQ0FBMEMsMkJBQTJCLDBCQUEwQixvQkFBb0Isc0JBQXNCLEdBQUcsd0JBQXdCLDBDQUEwQyxHQUFHLHlCQUF5Qiw0Q0FBNEMsR0FBRyx1QkFBdUIsc0NBQXNDLHlCQUF5QixHQUFHLHVCQUF1QixnQ0FBZ0MsNENBQTRDLHNDQUFzQyw0QkFBNEIsNEJBQTRCLDBCQUEwQixHQUFHLGlCQUFpQixrQkFBa0IsbUJBQW1CLDBCQUEwQixHQUFHLG1CQUFtQixpQkFBaUIsc0NBQXNDLGlDQUFpQywwQ0FBMEMsMkJBQTJCLDBCQUEwQixHQUFHLHlCQUF5QixzQ0FBc0MscUJBQXFCLEdBQUcsd0JBQXdCLEtBQUssbUJBQW1CLDBCQUEwQixzQ0FBc0MsNENBQTRDLGdDQUFnQywyQkFBMkIsOEJBQThCLDBCQUEwQixHQUFHLHlCQUF5QixzQ0FBc0MsaUNBQWlDLDBDQUEwQyw0QkFBNEIsMEJBQTBCLEdBQUcsK0JBQStCLFdBQVcsMENBQTBDLEtBQUsscUJBQXFCLG1CQUFtQixLQUFLLHFCQUFxQixxQkFBcUIsd0JBQXdCLEtBQUssMEJBQTBCLDhDQUE4Qyx1REFBdUQsS0FBSyx5QkFBeUIsZ0RBQWdELHlEQUF5RCxLQUFLLHFCQUFxQixxREFBcUQseUJBQXlCLEtBQUssR0FBRyxtQkFBbUI7QUFDbjdpQjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUNqRWE7O0FBRWIsa0NBQWtDOztBQUVsQyw4QkFBOEI7O0FBRTlCLGtEQUFrRCxnQkFBZ0IsZ0VBQWdFLHdEQUF3RCw2REFBNkQsc0RBQXNEOztBQUU3Uyx1Q0FBdUMsdURBQXVELHVDQUF1QyxTQUFTLE9BQU8sb0JBQW9COztBQUV6Syx5Q0FBeUMsOEZBQThGLHdCQUF3QixlQUFlLGVBQWUsZ0JBQWdCLFlBQVksTUFBTSx3QkFBd0IsK0JBQStCLGFBQWEscUJBQXFCLHVDQUF1QyxjQUFjLFdBQVcsWUFBWSxVQUFVLE1BQU0sbURBQW1ELFVBQVUsc0JBQXNCOztBQUV2ZSxnQ0FBZ0M7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbENBLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsMkZBQU87Ozs7QUFJa0Q7QUFDMUUsT0FBTyxpRUFBZSwyRkFBTyxJQUFJLGtHQUFjLEdBQUcsa0dBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCN0UsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBSSw4REFBQTtBQUNBeEIsc0RBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2FuaW1hdGUuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2VuZW15bG9naWMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9tZXllcnJlc2V0LmNzcz85MjRkIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5jb25zdCBhbmltYXRlID0gKCgpID0+IHtcbiAgY29uc3QgZmxpcENlbGxzID0gW107XG4gIGNvbnN0IGFuaW1hdGlvblJlZnJlc2ggPSAwLjk7XG4gIGNvbnN0IGFuaW1hdGlvbkxlbmd0aCA9IDAuMzU7XG4gIGxldCBmbGlwcGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0IGFkZFRvRmxpcENlbGxzID0gKGVsZW1lbnQpID0+IHtcbiAgICBmbGlwQ2VsbHMucHVzaChlbGVtZW50KTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpdC1mbGlwJyk7XG4gICAgaWYgKCFmbGlwcGluZykge1xuICAgICAgZmxpcHBpbmcgPSB0cnVlO1xuICAgICAgZmxpcEFsbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZsaXBBbGwgPSAoKSA9PiB7XG4gICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCAhPT0gMykge1xuICAgICAgZmxpcENlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNlbGwuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xuICAgICAgfSlcbiAgICAgIGZsaXBDZWxsc1swXS5vZmZzZXRXaWR0aDtcbiAgICAgIGZsaXBDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICBjZWxsLnN0eWxlLmFuaW1hdGlvbiA9IGBoaXRmbGlwICR7YW5pbWF0aW9uTGVuZ3RofXMgMWA7XG4gICAgICB9KVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZmxpcEFsbCgpO1xuICAgICAgfSwgYW5pbWF0aW9uUmVmcmVzaCAqIDEwMDApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYWRkVG9GbGlwQ2VsbHMsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFuaW1hdGU7IiwiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSwgcGxheWVyRmFjdG9yeSwgc2hpcEZhY3RvcnkgfSBmcm9tICcuLi9zcmMvZmFjdG9yaWVzLmpzJztcbmltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5pbXBvcnQgYW5pbWF0ZSBmcm9tICcuL2FuaW1hdGUuanMnO1xuXG5jb25zdCBkaXNwbGF5ID0gKCgpID0+IHtcbiAgbGV0IGdyaWQgPSBudWxsO1xuICBsZXQgc2hhcmVkQ29vcmRMaXN0ID0gbnVsbDtcblxuICBjb25zdCBhbGxIb3ZlckNsYXNzZXMgPSBbXG4gICAgJ3BsYWNlLWhvdmVyJyxcbiAgICAncGxhY2UtaG92ZXItc29sbycsXG4gICAgJ3BsYWNlLWhvdmVyLW9jY3VwaWVkJyxcbiAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbycsXG4gICAgJ3BsYWNlLWhvdmVyLW9vYicsXG4gICAgJ3BsYWNlLWhvdmVyLW9vYi1zb2xvJ1xuICBdO1xuICBjb25zdCBpbml0aWFsaXplID0gKCkgPT4ge1xuICAgIGNvbnN0IGVuZW15QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15QXJlYS5jbGFzc0xpc3QuYWRkKCdlbmVteS1hcmVhJyk7XG4gICAgY29uc3QgZW5lbXlHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ2VuZW15LWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IGVuZW15R3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBlbmVteUdyaWRMYWJlbC5jbGFzc0xpc3QuYWRkKCdncmlkLWxhYmVsJyk7XG4gICAgZW5lbXlHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ0VuZW15JztcbiAgICBjb25zdCBlbmVteURlbGF5VG9nZ2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDQnKTtcbiAgICBlbmVteURlbGF5VG9nZ2xlLmNsYXNzTGlzdC5hZGQoJ2VuZW15LWRlbGF5LXRvZ2dsZScpO1xuXG4gICAgZW5lbXlEZWxheVRvZ2dsZS5pbm5lclRleHQgPSBnYW1lLnRvZ2dsZURlbGF5KCk7XG4gICAgZW5lbXlEZWxheVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5pbm5lclRleHQgPSBnYW1lLnRvZ2dsZURlbGF5KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbmVteUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcsICdlbmVteS1ncmlkJyk7XG5cbiAgICBjb25zdCBwbGF5ZXJBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGxheWVyQXJlYS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItYXJlYScpO1xuICAgIGNvbnN0IHBsYXllckdyaWRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ3BsYXllci1ncmlkLXdyYXBwZXInKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHBsYXllckdyaWRMYWJlbC5jbGFzc0xpc3QuYWRkKCdncmlkLWxhYmVsJyk7XG4gICAgcGxheWVyR3JpZExhYmVsLmlubmVyVGV4dCA9ICdQbGF5ZXInO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHBsYXllckdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcsICdwbGF5ZXItZ3JpZCcpO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmZvLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBnYW1lQ29udGFpbmVyLmlkID0gJ2dhbWUtY29udGFpbmVyJztcblxuICAgIGNvbnN0IGluZm9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaW5mb1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2luZm8tdGl0bGUnKTtcbiAgICBpbmZvVGl0bGUuaW5uZXJUZXh0ID0gJ0JhdHRsZXNoaXBzJztcbiAgICBjb25zdCBpbmZvU3RhdGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvU3RhdGVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5mby1zdGF0ZS1jb250YWluZXInKTtcbiAgICBjb25zdCBpbmZvU3RhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgaW5mb1N0YXRlLmNsYXNzTGlzdC5hZGQoJ2luZm8tc3RhdGUnKTtcbiAgICBpbmZvU3RhdGUuaW5uZXJUZXh0ID0gZ2FtZS5nZXRTdGF0ZSgpLm5hbWU7XG4gICAgY29uc3QgaW5mb0RldGFpbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvRGV0YWlscy5jbGFzc0xpc3QuYWRkKCdpbmZvLWRldGFpbHMnKTtcbiAgICBjb25zdCBpbmZvUmVtYWluaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1JlbWFpbmluZy5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZycpO1xuXG4gICAgY29uc3QgaW5mb1JlbWFpbmluZ1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBpbmZvUmVtYWluaW5nVGl0bGUuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmctdGl0bGUnKTtcbiAgICBpbmZvUmVtYWluaW5nVGl0bGUuaW5uZXJUZXh0ID0gJ1JlbWFpbmluZyBFbmVteSBTaGlwcyc7XG4gICAgaW5mb1JlbWFpbmluZy5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nVGl0bGUpO1xuXG4gICAgLy8gZW5lbXlHcmlkLnN0eWxlWydiYWNrZ3JvdW5kLWltYWdlJ10gPVxuICAgIC8vICAgJ3VybChodHRwczovL3NvdXJjZS51bnNwbGFzaC5jb20vcmFuZG9tP29jZWFuKSc7XG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICBwbGF5ZXJHcmlkLnN0eWxlWydiYWNrZ3JvdW5kLWltYWdlJ10gPVxuICAgIC8vICAgICAndXJsKGh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS9yYW5kb20/Ym9hdCxiYXR0bGVzaGlwKSc7XG4gICAgLy8gfSwgNTAwMCk7XG5cbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9UaXRsZSk7XG4gICAgaW5mb1N0YXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9TdGF0ZSk7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvU3RhdGVDb250YWluZXIpO1xuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb0RldGFpbHMpO1xuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZyk7XG5cbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGJvYXJkc0NvbnRhaW5lcik7XG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvQ29udGFpbmVyKTtcblxuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbmVteUFyZWEpO1xuICAgIGVuZW15QXJlYS5hcHBlbmRDaGlsZChlbmVteUdyaWRMYWJlbCk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15RGVsYXlUb2dnbGUpO1xuICAgIGVuZW15QXJlYS5hcHBlbmRDaGlsZChlbmVteUdyaWRXcmFwcGVyKTtcbiAgICBlbmVteUdyaWRXcmFwcGVyLmFwcGVuZENoaWxkKGVuZW15R3JpZCk7XG5cbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQocGxheWVyQXJlYSk7XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkTGFiZWwpO1xuICAgIHBsYXllckFyZWEuYXBwZW5kQ2hpbGQocGxheWVyR3JpZFdyYXBwZXIpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmFwcGVuZENoaWxkKHBsYXllckdyaWQpO1xuXG4gICAgY29uc3QgcGFnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYWdlLWNvbnRhaW5lcicpO1xuICAgIGlmIChwYWdlQ29udGFpbmVyLmhhc0NoaWxkTm9kZXMpIHtcbiAgICAgIHBhZ2VDb250YWluZXIuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgY2hpbGQucmVtb3ZlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYWdlQ29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVDb250YWluZXIpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICcuJykge1xuICAgICAgICBnYW1lLnRvZ2dsZURpcmVjdGlvbigpO1xuICAgICAgICBjb25zdCBob3JWZXIgPSAoZ2FtZS5nZXREaXJlY3Rpb24oKSA9PT0gJ2UnXG4gICAgICAgICAgPyAnaG9yaXpvbnRhbCdcbiAgICAgICAgICA6ICd2ZXJ0aWNhbCcpO1xuICAgICAgICBsb2dNZXNzYWdlKCdSb3RhdGVkIGRpcmVjdGlvbiB0byAnICsgaG9yVmVyKTtcbiAgICAgICAgY2xlYXJDbGFzcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKSwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgZGlzcGxheUhvdmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZHJhd0dyaWQgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBsYXllci5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdlbmVteScpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IG93bmVyIGFzIFwiZW5lbXlcIiBvciBcInBsYXllclwiJyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIGNlbGxzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRCb2FyZCgpLmxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsSWQgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBsYXllciA9IG5hbWU7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgc2hpcCBjYW4gYmUgcGxhY2VkXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxhY2UtaG92ZXInKSkge1xuICAgICAgICAgICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBjdXJyZW50U2hpcC5zaXplLFxuICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFNoaXAubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IHNoYXJlZENvb3JkTGlzdFswXSxcbiAgICAgICAgICAgICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gZGlzcGxheSBwbGFjZWQgc2hpcFxuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hhcmVkQ29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSwgZS50YXJnZXQpO1xuICAgICAgICAgICAgICAvLyBnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50XG4gICAgICAgICAgICAgIGlmIChnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50KCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQgPT09ICdlbmVteScpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gZ2V0Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbY29vcmQueCwgY29vcmQueV0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSArICcgJyArIGRpc3BsYXlDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICAgICAgICAgIC8vICAgKyAnICcgKyAoaXNIaXQgPyAnaGl0IScgOiAnbWlzc2VkJykpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtdW5jbGlja2VkJyk7XG4gICAgICAgICAgICBpZiAoaXNIaXQgPiAwKSB7XG4gICAgICAgICAgICAgIGFuaW1hdGUuYWRkVG9GbGlwQ2VsbHMoZS50YXJnZXQpO1xuICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcsICdlbmVteS1oaXQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycsICdlbmVteS1taXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNIaXQgPT09IDIpIHtcbiAgICAgICAgICAgICAgbG9nTWVzc2FnZShmYWN0b3J5SGVscGVyLnN1bmtNZXNzYWdlKGNvb3JkLCBnYW1lYm9hcmQsIGdhbWUuZ2V0U3RhdGUoKS5cbiAgICAgICAgICAgICAgICB0YXJnZXQpKVxuICAgICAgICAgICAgICBsb2dSZW1haW5pbmcocGxheWVyLmdldEdhbWVib2FyZCgpLmdldFNoaXBzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2FtZS5hZHZhbmNlU3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICBkaXNwbGF5SG92ZXIoZS50YXJnZXQsIHBsYXllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBncmlkLnN0eWxlWydncmlkLXRlbXBsYXRlLWNvbHVtbnMnXSA9IGByZXBlYXQoJHtNYXRoLnNxcnQoZ2FtZWJvYXJkXG4gICAgICAgIC5nZXRCb2FyZCgpLmxlbmd0aCl9LCAxZnIpYDtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlIb3ZlciA9IChlbGVtZW50LCBwbGF5ZXIpID0+IHtcbiAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaG92ZXJOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJzpob3ZlcicpO1xuICAgICAgZWxlbWVudCA9IGhvdmVyTm9kZUxpc3QuaXRlbShob3Zlck5vZGVMaXN0Lmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBsYXllciA9IGdhbWUuZ2V0UGxheWVycygpLnBsYXllcjtcbiAgICB9XG5cbiAgICBjb25zdCBnYW1lYm9hcmQgPSBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBjZWxsQ29vcmQgPSBnZXRDb29yZChlbGVtZW50LmRhdGFzZXQuY2VsbElkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBnYW1lLmdldFNoaXBGb3JQbGFjZW1lbnQoKTtcbiAgICBsZXQgY29vcmRMaXN0ID0gbnVsbDtcblxuICAgIC8vIEdldCBjb29yZExpc3QgY2VudGVyZWQgYXJvdW5kIGhvdmVyZWQgY29vcmRpbmF0ZVxuICAgIGNvb3JkTGlzdCA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzQ2VudGVyZWQoXG4gICAgICBjdXJyZW50U2hpcC5zaXplLFxuICAgICAge1xuICAgICAgICBjb29yZDogW2NlbGxDb29yZC54LCBjZWxsQ29vcmQueV0sXG4gICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgfVxuICAgICk7XG4gICAgLy8gTnVkZ2UgdGhlIGNvb3JkTGlzdCBvbnRvIHRoZSBib2FyZCBpZiBuZWVkZWRcbiAgICBjb29yZExpc3QgPSBmYWN0b3J5SGVscGVyLm51ZGdlQ29vcmRzT24oY29vcmRMaXN0LFxuICAgICAgZ2FtZWJvYXJkLmdldEJvYXJkKCkpXG5cbiAgICAvLyBVcGRhdGUgc2hhcmVkIGNvb3JkaW5hdGUgbGlzdFxuICAgIHNoYXJlZENvb3JkTGlzdCA9IGNvb3JkTGlzdDtcblxuICAgIC8vIFNob3cgYXZhaWxhYmlsaXR5IHdpdGggaG92ZXIgY29sb3JzXG4gICAgbGV0IGhvdmVyQ2xhc3NlcyA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBmYWN0b3J5SGVscGVyLmNoZWNrSWZPcGVuKGNvb3JkTGlzdCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1zb2xvJywgJ3BsYWNlLWhvdmVyJ11cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBpZiAoZXJyb3IgPT09ICdjZWxsIG9jY3VwaWVkJykge1xuICAgICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8nLFxuICAgICAgICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZCddXG4gICAgICB9IGVsc2UgaWYgKGVycm9yID09PSAnb3V0IG9mIGJvdW5kcycpIHtcbiAgICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1vb2Itc29sbycsXG4gICAgICAgICAgJ3BsYWNlLWhvdmVyLW9vYiddO1xuICAgICAgfVxuICAgIH1cbiAgICBjb29yZExpc3QuZm9yRWFjaChob3ZlckNvb3JkID0+IHtcbiAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoXG4gICAgICAgIFtob3ZlckNvb3JkWzBdLCBob3ZlckNvb3JkWzFdXSwgZ2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICAgICk7XG4gICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlcy5pdGVtKGNlbGxJbmRleCkuXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoaG92ZXJDbGFzc2VzWzFdKTtcbiAgICB9KTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaG92ZXJDbGFzc2VzWzBdKTtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlDb29yZCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZE9iaiA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRGcm9tSW5kZXgoaW5kZXgsIGJvYXJkKTtcbiAgICBjb25zdCBjb29yZFRleHQgPSBgWyR7Y29vcmRPYmoueH0sICR7Y29vcmRPYmoueX1dYDtcbiAgICByZXR1cm4gY29vcmRUZXh0O1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmQgPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRPYmogPSBmYWN0b3J5SGVscGVyLmdldENvb3JkRnJvbUluZGV4KGluZGV4LCBib2FyZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNvb3JkT2JqLngsXG4gICAgICB5OiBjb29yZE9iai55LFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZExpc3QsIGJvYXJkLCBlbGVtZW50KSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIHBhcmVudC5jaGlsZE5vZGVzW2ZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoXG4gICAgICAgIGNvb3JkLCBib2FyZFxuICAgICAgKV0uY2xhc3NMaXN0LmFkZCgnc2hpcC1zdGFuZGluZycpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgY2xlYXJDbGFzcyA9IChwYXJlbnQsIGNsYXNzTmFtZSkgPT4ge1xuICAgIHBhcmVudC5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKVxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGxvZ01lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgY29uc3QgaW5mb0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kZXRhaWxzJyk7XG4gICAgY29uc3QgY3VycmVudE1lc3NhZ2UgPSBpbmZvRGV0YWlscy5maXJzdENoaWxkO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdpbmZvLWRldGFpbHMtbWVzc2FnZScpO1xuICAgIG1lc3NhZ2UuaW5uZXJUZXh0ID0gbXNnO1xuXG4gICAgaWYgKGN1cnJlbnRNZXNzYWdlKSB7XG4gICAgICBpbmZvRGV0YWlscy5pbnNlcnRCZWZvcmUobWVzc2FnZSwgY3VycmVudE1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvRGV0YWlscy5hcHBlbmRDaGlsZChtZXNzYWdlKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IGxvZ1JlbWFpbmluZyA9IChzaGlwcykgPT4ge1xuICAgIGNvbnN0IGluZm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1jb250YWluZXInKTtcbiAgICBjb25zdCBwcmV2SW5mb1JlbWFpbmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXJlbWFpbmluZycpO1xuICAgIGlmIChwcmV2SW5mb1JlbWFpbmluZykgaW5mb0NvbnRhaW5lci5yZW1vdmVDaGlsZChwcmV2SW5mb1JlbWFpbmluZyk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1JlbWFpbmluZy5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZycpO1xuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZyk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZy10aXRsZScpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5pbm5lclRleHQgPSAnUmVtYWluaW5nIEVuZW15IFNoaXBzJztcbiAgICBpbmZvUmVtYWluaW5nLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmdUaXRsZSk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9SZW1haW5pbmdMaXN0LmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nLWxpc3QnKTtcbiAgICBpbmZvUmVtYWluaW5nLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmdMaXN0KTtcblxuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc3QgcmVtYWluaW5nU2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByZW1haW5pbmdTaGlwLmNsYXNzTGlzdC5hZGQoJ3JlbWFpbmluZy1zaGlwJyk7XG4gICAgICAgIHJlbWFpbmluZ1NoaXAuaW5uZXJUZXh0ICs9IGAgJHtzaGlwLmdldE5hbWUoKX0gKCR7c2hpcC5nZXRMZW5ndGgoKX0pYDtcblxuICAgICAgICBpbmZvUmVtYWluaW5nTGlzdC5hcHBlbmRDaGlsZChyZW1haW5pbmdTaGlwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGNvbnN0IGxpc3RTdHIgPSBpbmZvUmVtYWluaW5nTGlzdC5pbm5lclRleHQ7XG4gICAgLy8gaW5mb1JlbWFpbmluZ0xpc3QuaW5uZXJUZXh0ID0gbGlzdFN0ci5zdWJzdHJpbmcoMCwgbGlzdFN0ci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlTWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBjb25zdCBpbmZvU3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1zdGF0ZScpO1xuICAgIGluZm9TdGF0ZS5pbm5lclRleHQgPSBtc2c7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5Um90YXRlQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdGF0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtYnV0dG9uJyk7XG5cbiAgICBjb25zdCByb3RhdGVCdXR0b25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm90YXRlQnV0dG9uVGV4dC5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtYnV0dG9uLXRleHQnKTtcbiAgICByb3RhdGVCdXR0b25UZXh0LmlubmVyVGV4dCA9ICdSb3RhdGUnO1xuXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdGF0ZUJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgncm90YXRlLWJ1dHRvbi1pY29uJyk7XG4gICAgcm90YXRlQnV0dG9uSWNvbi5pbm5lclRleHQgPSAnLic7XG5cbiAgICByb3RhdGVCdXR0b24uYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uVGV4dCk7XG4gICAgcm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbkljb24pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXN0YXRlLWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG5cbiAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZ2FtZS50b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgIGNvbnN0IGhvclZlciA9IChnYW1lLmdldERpcmVjdGlvbigpID09PSAnZSdcbiAgICAgICAgPyAnaG9yaXpvbnRhbCdcbiAgICAgICAgOiAndmVydGljYWwnKTtcbiAgICAgIGxvZ01lc3NhZ2UoJ1JvdGF0ZWQgZGlyZWN0aW9uIHRvICcgKyBob3JWZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcmVtb3ZlUm90YXRlQnV0dG9uID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUtYnV0dG9uJykucmVtb3ZlKCk7XG4gIH1cblxuICBjb25zdCBtYWtlQ2VsbHNVbmNsaWNrZWQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKS5jaGlsZE5vZGVzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAoY2VsbC5jbGFzc0xpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLXVuY2xpY2tlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcmVtb3ZlQ2VsbHNVbmNsaWNrZWQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKS5jaGlsZE5vZGVzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC11bmNsaWNrZWQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZSxcbiAgICBkcmF3R3JpZCxcbiAgICBsb2dNZXNzYWdlLFxuICAgIHN0YXRlTWVzc2FnZSxcbiAgICBsb2dSZW1haW5pbmcsXG4gICAgZGlzcGxheVJvdGF0ZUJ1dHRvbixcbiAgICByZW1vdmVSb3RhdGVCdXR0b24sXG4gICAgbWFrZUNlbGxzVW5jbGlja2VkLFxuICAgIHJlbW92ZUNlbGxzVW5jbGlja2VkLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5OyIsImltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMnO1xuXG5leHBvcnQgY29uc3QgcGxheWVyRmFjdG9yeSA9IChteU5hbWUsIGJvYXJkU2l6ZSkgPT4ge1xuICBjb25zdCBuYW1lID0gbXlOYW1lO1xuICBjb25zdCBnYW1lYm9hcmQgPSBnYW1lYm9hcmRGYWN0b3J5KGJvYXJkU2l6ZSk7XG4gIGNvbnN0IGF0dGFja2VkU3BhY2VzID0gW107XG5cbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKCkgPT4geyByZXR1cm4gZ2FtZWJvYXJkOyB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7IHJldHVybiBuYW1lOyB9O1xuXG4gIGNvbnN0IGF0dGFjayA9IChjb29yZCwgZW5lbXlQbGF5ZXIpID0+IHtcbiAgICBsZXQgYWxyZWFkeUF0dGFja2VkID0gZmFsc2U7XG4gICAgYXR0YWNrZWRTcGFjZXMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKGNlbGwsIGNvb3JkKSkge1xuICAgICAgICBhbHJlYWR5QXR0YWNrZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKCFhbHJlYWR5QXR0YWNrZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVuZW15UGxheWVyLmdldEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2soY29vcmQpO1xuICAgICAgICBhdHRhY2tlZFNwYWNlcy5wdXNoKGNvb3JkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHRocm93IChlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ2FscmVhZHkgYXR0YWNrZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEdhbWVib2FyZCxcbiAgICBnZXROYW1lLFxuICAgIGF0dGFjayxcbiAgfVxufVxuXG4vLyBwcm9wcyA9IHsgbGVuZ3RoLCBpbml0aWFsSGl0cywgbmFtZSB9XG5leHBvcnQgY29uc3Qgc2hpcEZhY3RvcnkgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuICBjb25zdCBoaXRzID0gcHJvcHMuaW5pdGlhbEhpdHMgfHwgW107XG4gIGNvbnN0IG5hbWUgPSBwcm9wcy5uYW1lO1xuXG4gIGNvbnN0IGhpdCA9IChjb29yZCkgPT4ge1xuICAgIGlmICghaGl0cy5pbmNsdWRlcyhjb29yZCkpIHtcbiAgICAgIGhpdHMucHVzaChjb29yZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IHtcbiAgICByZXR1cm4gaGl0cy5sZW5ndGggPT09IGxlbmd0aDtcbiAgfVxuXG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IHsgcmV0dXJuIGxlbmd0aCB9O1xuXG4gIGNvbnN0IGdldE5hbWUgPSAoKSA9PiB7IHJldHVybiBuYW1lIH07XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIGdldExlbmd0aCxcbiAgICBnZXROYW1lLFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnYW1lYm9hcmRGYWN0b3J5ID0gKHNpemUpID0+IHtcbiAgbGV0IGJvYXJkID0gW107XG4gIGNvbnN0IGluaXRpYWxpemUgPSAoKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNpemU7IGorKykge1xuICAgICAgICBib2FyZC5wdXNoKHtcbiAgICAgICAgICBjb29yZDogW2osIGldLFxuICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICBzaGlwSWQ6IG51bGxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgY29uc3Qgc2hpcHMgPSBbXTtcblxuICBjb25zdCBhbGxTaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgbGV0IHN1bmsgPSB0cnVlO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHN1bmsgPSBmYWxzZTtcbiAgICB9KVxuICAgIHJldHVybiBzdW5rO1xuICB9XG5cbiAgLy8gc2hpcFByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzIH1cbiAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFt4LCB5XSwgZGlyOiAoJ2UnIHx8ICdzJykgfVxuICBjb25zdCBwbGFjZVNoaXAgPSAoc2hpcFByb3BzLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHBsYWNlZFNoaXBJZCA9IG51bGw7XG4gICAgbGV0IHBsYWNlZENvb3JkcyA9IHVuZGVmaW5lZDtcbiAgICB0cnkge1xuICAgICAgcGxhY2VkQ29vcmRzID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZHNJZk9wZW4oXG4gICAgICAgIHNoaXBQcm9wcy5sZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKTtcbiAgICAgIHBsYWNlZFNoaXBJZCA9IHNoaXBzLnB1c2goc2hpcEZhY3Rvcnkoc2hpcFByb3BzKSkgLSAxO1xuICAgICAgYm9hcmQgPSBib2FyZC5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGxldCBuZXdDZWxsID0gY2VsbDtcbiAgICAgICAgcGxhY2VkQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKGNlbGwuY29vcmQsIGNvb3JkKSkge1xuICAgICAgICAgICAgbmV3Q2VsbCA9IHtcbiAgICAgICAgICAgICAgY29vcmQ6IGNvb3JkLFxuICAgICAgICAgICAgICBoaXQ6IDAsXG4gICAgICAgICAgICAgIHNoaXBJZDogcGxhY2VkU2hpcElkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXdDZWxsO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aHJvdyAoZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKGNvb3JkKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBib2FyZCk7XG4gICAgaWYgKGJvYXJkW2luZGV4XS5oaXQgIT09IDApIHtcbiAgICAgIHRocm93KCdhbHJlYWR5IGhpdCcpO1xuICAgIH1cbiAgICBjb25zdCBzaGlwSWQgPSBib2FyZFtpbmRleF0uc2hpcElkO1xuICAgIGlmIChzaGlwSWQgPT09IG51bGwpIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAtMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBib2FyZFtpbmRleF0uaGl0ID0gMTtcbiAgICAgIHNoaXBzW3NoaXBJZF0uaGl0KGNvb3JkKTtcbiAgICAgIGlmIChzaGlwc1tzaGlwSWRdLmlzU3VuaygpKSB7XG4gICAgICAgIHJldHVybiAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0U2hpcHMgPSAoKSA9PiB7IHJldHVybiBzaGlwcyB9O1xuXG4gIGNvbnN0IGdldFVuc3Vua1NoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vua1NoaXBzID0gW107XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgdW5zdW5rU2hpcHMucHVzaChzaGlwKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5zdW5rU2hpcHM7XG4gIH1cblxuICBjb25zdCBnZXRCb2FyZCA9ICgpID0+IHsgcmV0dXJuIGJvYXJkIH07XG5cbiAgcmV0dXJuIHtcbiAgICBhbGxTaGlwc1N1bmssXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgZ2V0U2hpcHMsXG4gICAgZ2V0VW5zdW5rU2hpcHMsXG4gICAgZ2V0Qm9hcmQsXG4gIH1cbn0iLCJpbXBvcnQgZGlzcGxheSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSwgcGxheWVyRmFjdG9yeSwgc2hpcEZhY3RvcnkgfSBmcm9tICcuLi9zcmMvZmFjdG9yaWVzLmpzJztcbmltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcbmltcG9ydCBsb2dpYyBmcm9tICcuL2hlbHBlcnMvZW5lbXlsb2dpYy5qcyc7XG5cbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBlbmVteURlbGF5TWF4SW5pdGlhbCA9IDI7XG4gIGxldCBlbmVteURlbGF5TWF4ID0gMDtcbiAgY29uc3Qgc3RhdGVzID0gW1xuICAgIHtcbiAgICAgIGlkOiAwLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogJ1BsYWNlIHlvdXIgc2hpcHMnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIHRhcmdldDogJ2VuZW15JyxcbiAgICAgIG5hbWU6IFwiUGxheWVyJ3MgdHVyblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMixcbiAgICAgIHRhcmdldDogJ3BsYXllcicsXG4gICAgICBuYW1lOiBcIkVuZW15J3MgdHVyblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMyxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIG5hbWU6IFwiR2FtZSBmaW5pc2hlZFwiXG4gICAgfVxuICBdO1xuICBsZXQgcG9zc2libGVFbmVteUF0dGFja3MgPSBudWxsO1xuICBsZXQgc3RhdGUgPSBzdGF0ZXNbMF07XG4gIGNvbnN0IHNoaXBMaXN0ID0gW1xuICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1IH0sXG4gICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQgfSxcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXG4gICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMyB9LFxuICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiB9XG4gIF07XG4gIGxldCBjdXJyZW50U2hpcCA9IDA7XG4gIGxldCBkaXJlY3Rpb24gPSAnZSc7XG4gIGxldCBwbGF5ZXIxID0gbnVsbDtcbiAgbGV0IGVuZW15MSA9IG51bGw7XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgcGxheWVyMSA9IHBsYXllckZhY3RvcnkoJ3BsYXllcicsIDEwKTtcbiAgICBlbmVteTEgPSBwbGF5ZXJGYWN0b3J5KCdlbmVteScsIDEwKTtcbiAgICBwb3NzaWJsZUVuZW15QXR0YWNrcyA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKTtcblxuICAgIGRpc3BsYXkuZHJhd0dyaWQocGxheWVyMSk7XG4gICAgZGlzcGxheS5kcmF3R3JpZChlbmVteTEpO1xuXG4gICAgcGxhY2VSYW5kb21TaGlwcyhlbmVteTEpO1xuICAgIGRpcmVjdGlvbiA9ICdlJztcbiAgICBkaXNwbGF5LmRpc3BsYXlSb3RhdGVCdXR0b24oKTtcbiAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoJ1BsYWNlIHlvdXIgJyArIHNoaXBMaXN0W2N1cnJlbnRTaGlwXS5uYW1lKTtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwRm9yUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGlzdFtjdXJyZW50U2hpcF07XG4gIH1cblxuICBjb25zdCBhZHZhbmNlU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFNoaXAgPCA0KSB7XG4gICAgICBjdXJyZW50U2hpcCArKztcbiAgICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnUGxhY2UgeW91ciAnICsgc2hpcExpc3RbY3VycmVudFNoaXBdLm5hbWUpO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXkubG9nUmVtYWluaW5nKGVuZW15MS5nZXRHYW1lYm9hcmQoKS5nZXRTaGlwcygpKTtcbiAgICAgIGRpc3BsYXkubWFrZUNlbGxzVW5jbGlja2VkKCk7XG4gICAgICBhZHZhbmNlU3RhdGUoKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFkdmFuY2VTdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyMS5nZXRHYW1lYm9hcmQoKS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKCdFbmVteSB3aW5zLicpO1xuICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbM107XG5cbiAgICB9IGVsc2UgaWYgKGVuZW15MS5nZXRHYW1lYm9hcmQoKS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKCdZb3Ugd2luIScpO1xuICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5pZCA9PT0gMCkge1xuICAgICAgICBkaXNwbGF5LnJlbW92ZVJvdGF0ZUJ1dHRvbigpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuaWQgPT09IDEpIHtcbiAgICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1syXTtcbiAgICAgICAgY29uc3QgZGVsYXlUaW1lID0gKGVuZW15RGVsYXlNYXggLyA0ICtcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogZW5lbXlEZWxheU1heCAqIDMgLyA0KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWxheWluZyAnICsgZGVsYXlUaW1lICsgJyBzZWNvbmRzJyk7XG4gICAgICAgIGlmIChkZWxheVRpbWUgIT09IDApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVuZW15UmFuZG9tQXR0YWNrKCk7XG4gICAgICAgICAgfSwgMTAwMCAqIGRlbGF5VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5lbXlSYW5kb21BdHRhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheS5tYWtlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGxheS5zdGF0ZU1lc3NhZ2Uoc3RhdGUubmFtZSk7XG4gIH1cblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBnZXREaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIGRpcmVjdGlvbiA9ICdzJztcbiAgICBlbHNlIGRpcmVjdGlvbiA9ICdlJztcbiAgfVxuXG4gIGNvbnN0IGdldFBsYXllcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjogcGxheWVyMSxcbiAgICAgIGVuZW15OiBlbmVteTFcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVJhbmRvbVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IE1hdGguc3FydChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKS5sZW5ndGgpO1xuICAgIHNoaXBMaXN0LmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgd2hpbGUgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCkgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGxldCBjb29yZFggPSBudWxsO1xuICAgICAgICBsZXQgY29vcmRZID0gbnVsbDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2UnKSB7XG4gICAgICAgICAgY29vcmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICAgIGNvb3JkWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHBsYXllci5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxlbmd0aDogc2hpcC5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBzaGlwLm5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbY29vcmRYLCBjb29yZFldLFxuICAgICAgICAgICAgICBkaXI6IGRpcmVjdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBwbGFjZSBhIHNoaXAsIHRyeWluZyBhZ2FpbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBlbmVteVJhbmRvbUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBhdHRhY2tJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlRW5lbXlBdHRhY2tzLmxlbmd0aCk7XG4gICAgY29uc3QgYXR0YWNrQ2VsbCA9IHBvc3NpYmxlRW5lbXlBdHRhY2tzLnNwbGljZShhdHRhY2tJbmRleCwgMSlbMF07XG4gICAgY29uc3QgZGlkSGl0ID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGF0dGFja0NlbGwuY29vcmQpO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICBjb25zdCBhdHRhY2tDZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKGF0dGFja0NlbGwuY29vcmQsIHBsYXllcjEuXG4gICAgICBnZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpKTtcbiAgICBpZiAoZGlkSGl0ID4gMCkge1xuICAgICAgcGxheWVyR3JpZC5jaGlsZE5vZGVzLml0ZW0oYXR0YWNrQ2VsbEluZGV4KS5jbGFzc0xpc3QuYWRkKCdoaXQnLCAncGxheWVyLWhpdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJHcmlkLmNoaWxkTm9kZXMuaXRlbShhdHRhY2tDZWxsSW5kZXgpLmNsYXNzTGlzdC5hZGQoJ21pc3MnLCAncGxheWVyLW1pc3MnKTtcbiAgICB9XG4gICAgaWYgKGRpZEhpdCA9PT0gMikge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKGZhY3RvcnlIZWxwZXIuc3Vua01lc3NhZ2UoYXR0YWNrQ2VsbC5jb29yZCxcbiAgICAgICAgcGxheWVyMS5nZXRHYW1lYm9hcmQoKSwgZ2FtZS5nZXRTdGF0ZSgpLnRhcmdldCkpXG4gICAgfVxuICAgIGFkdmFuY2VTdGF0ZSgpO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGVsYXkgPSAoKSA9PiB7XG4gICAgaWYgKGVuZW15RGVsYXlNYXggPT09IDApIHtcbiAgICAgIGVuZW15RGVsYXlNYXggPSBlbmVteURlbGF5TWF4SW5pdGlhbDtcbiAgICAgIHJldHVybiAnZGVsYXkgb24nO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmVteURlbGF5TWF4ID0gMDtcbiAgICAgIHJldHVybiAnZGVsYXkgb2ZmJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGdldFNoaXBGb3JQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVNoaXBQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVN0YXRlLFxuICAgIGdldFN0YXRlLFxuICAgIGdldERpcmVjdGlvbixcbiAgICB0b2dnbGVEaXJlY3Rpb24sXG4gICAgZ2V0UGxheWVycyxcbiAgICB0b2dnbGVEZWxheSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJpbXBvcnQgZ2FtZSBmcm9tICcuLi9nYW1lLmpzJztcblxuY29uc3QgZW5lbXlMb2dpYyA9ICgoKSA9PiB7XG4gIGxldCBwbGF5ZXJCb2FyZCA9IG51bGw7XG4gIGNvbnN0IGFjdGl2ZUhpdHMgPSBbXTtcblxuICBjb25zdCBwcm9jZXNzSGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKHBsYXllckJvYXJkID09PSBudWxsKSBwbGF5ZXJCb2FyZCA9IGdhbWUuZ2V0UGxheWVycygpLnBsYXllci5nZXRHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGNvbnN0IGdldE1vdmUgPSAoKSA9PiB7XG5cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvY2Vzc0hpdCxcbiAgICBnZXROZXh0TW92ZSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZW5lbXlMb2dpYzsiLCJjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgY29uc3QgYXJyYXlzTWF0Y2ggPSAoY29vcmQxLCBjb29yZDIpID0+IHtcbiAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KGNvb3JkMSkgPT09IEpTT04uc3RyaW5naWZ5KGNvb3JkMikpXG4gICAgICA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrSWZPcGVuID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBsZXQgaXNPcGVuID0gdHJ1ZTtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtnZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpXTtcbiAgICAgIGlmIChib2FyZENlbGwuc2hpcElkICE9PSBudWxsKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aHJvdygnY2VsbCBvY2N1cGllZCcpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gICAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFs1LCA1XSwgZGlyOiAoZSB8fCBzKSB9XG4gIGNvbnN0IGdldENvb3Jkc0lmT3BlbiA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNlYXJjaFggPSBsb2NhdGlvblByb3BzLmNvb3JkWzBdO1xuICAgICAgbGV0IHNlYXJjaFkgPSBsb2NhdGlvblByb3BzLmNvb3JkWzFdO1xuICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICA/IHNlYXJjaFggKz0gaVxuICAgICAgICA6IHNlYXJjaFkgKz0gaTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgW3NlYXJjaFgsIHNlYXJjaFldKVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgaWYgKCFtYXRjaGluZ0NlbGwpIHRocm93KCdvdXQgb2YgYm91bmRzJyk7XG4gICAgICBlbHNlIGlmIChtYXRjaGluZ0NlbGwuc2hpcElkICE9PSBudWxsKSB0aHJvdygnY2VsbCBvY2N1cGllZCcpXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gU3VjY2Vzc1xuICAgICAgICBjb29yZHMucHVzaChbc2VhcmNoWCwgc2VhcmNoWV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRzQ2VudGVyZWQgPSAobGVuZ3RoLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHN0YXJ0aW5nQ29vcmQgPSBudWxsO1xuICAgIGNvbnN0IGRpciA9IGxvY2F0aW9uUHJvcHMuZGlyO1xuICAgIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpLFxuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzFdXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAncycpIHtcbiAgICAgIHN0YXJ0aW5nQ29vcmQgPSBbXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMF0sXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV0gLSBNYXRoLmZsb29yKChsZW5ndGggLSAxKS8yKVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IGRpcmVjdGlvbiBiZWZvcmUgZ2V0dGluZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjb29yZFggPSAoZGlyID09PSAnZScpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFswXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzBdO1xuICAgICAgY29uc3QgY29vcmRZID0gKGRpciA9PT0gJ3MnKVxuICAgICAgICA/IHN0YXJ0aW5nQ29vcmRbMV0gKyBpXG4gICAgICAgIDogc3RhcnRpbmdDb29yZFsxXTtcbiAgICAgIGNvb3JkQXJyYXkucHVzaChbY29vcmRYLCBjb29yZFldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkQXJyYXk7XG4gIH1cblxuICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGNvb3JkWzFdICogTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgKyBjb29yZFswXTtcbiAgICBpZiAoaW5kZXggPiBib2FyZC5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgdGhyb3coJ2dldEluZGV4Li4uOiBvdXQgb2YgYm91bmRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCk7XG4gICAgY29uc3QgeCA9IGluZGV4ICUgc2l6ZTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgIFxuICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfVxuICB9XG5cbiAgY29uc3QgbnVkZ2VDb29yZHNCeSA9IChjb29yZExpc3QsIG51bWJlcikgPT4ge1xuXG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc09uID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBmaXJzdENvb3JkID0gY29vcmRMaXN0WzBdO1xuICAgIGNvbnN0IGxhc3RDb29yZCA9IGNvb3JkTGlzdFtjb29yZExpc3QubGVuZ3RoIC0gMV07XG4gICAgbGV0IG5ld0xpc3QgPSBudWxsO1xuICAgIC8vIG9mZiB0aGUgcmlnaHQgc2lkZVxuICAgIGNvbnN0IHJpZ2h0U2lkZUhhbmcgPSBsYXN0Q29vcmRbMF0gLSAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKTtcbiAgICBjb25zdCBsZWZ0U2lkZUhhbmcgID0gLTEgKiBmaXJzdENvb3JkWzBdO1xuICAgIGNvbnN0IHRvcEhhbmcgICAgICAgPSAtMSAqIGZpcnN0Q29vcmRbMV07XG4gICAgY29uc3QgYm90dG9tSGFuZyAgICA9IGxhc3RDb29yZFsxXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGlmIChyaWdodFNpZGVIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdIC0gcmlnaHRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChsZWZ0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gKyBsZWZ0U2lkZUhhbmcsIGNvb3JkWzFdXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodG9wSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gKyB0b3BIYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYm90dG9tSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gLSBib3R0b21IYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3TGlzdDtcbiAgfVxuXG4gIGNvbnN0IHN1bmtNZXNzYWdlID0gKGNvb3JkLCBnYW1lYm9hcmQsIHRhcmdldCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCB7Y29vcmQsIGdhbWVib2FyZCwgdGFyZ2V0IH0pO1xuICAgIGlmIChjb29yZC54ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvb3JkID0gW2Nvb3JkLngsIGNvb3JkLnldO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGdldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgIGNvbnN0IHNoaXBJZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpW2luZGV4XS5zaGlwSWQ7XG4gICAgY29uc3QgYXR0YWNrZXIgPSAodGFyZ2V0ID09PSAnZW5lbXknXG4gICAgICA/ICdZb3UnXG4gICAgICA6ICdFbmVteScpO1xuICAgIGNvbnN0IHNoaXBOYW1lID0gZ2FtZWJvYXJkLmdldFNoaXBzKClbc2hpcElkXS5nZXROYW1lKCk7XG4gICAgY29uc3Qgc2hpcFNpemUgPSBnYW1lYm9hcmQuZ2V0U2hpcHMoKVtzaGlwSWRdLmdldExlbmd0aCgpO1xuICAgIHJldHVybiBhdHRhY2tlciArICcgc3VuayB0aGUgJyArIHNoaXBOYW1lICsgJyEgKCcgKyBzaGlwU2l6ZSArICcpJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyYXlzTWF0Y2gsXG4gICAgY2hlY2tJZk9wZW4sXG4gICAgZ2V0Q29vcmRzSWZPcGVuLFxuICAgIGdldENvb3Jkc0NlbnRlcmVkLFxuICAgIGdldEluZGV4RnJvbUNvb3JkLFxuICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIG51ZGdlQ29vcmRzQnksXG4gICAgbnVkZ2VDb29yZHNPbixcbiAgICBzdW5rTWVzc2FnZSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFjdG9yeUhlbHBlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21leWVycmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAwcHg7XFxuXFxuICAtLWxpZ2h0LTE6IHdoaXRlO1xcbiAgLS1saWdodC0yOiAjRUVFO1xcbiAgLS1saWdodC0zOiByZ2IoMTMxLCAxNzQsIDIzOCk7XFxuICAtLWRhcmstMTogYmxhY2s7XFxuICAtLWRhcmstMjogcmdiKDIxLCAyMSwgMjIpO1xcbiAgLS1kYXJrLTM6IHJnYigzMiwgMzMsIDM3KTtcXG4gIC0tZGFyay00OiByZ2IoNTMsIDU1LCA2Nik7XFxuICAtLWRhcmstNTogcmdiKDcxLCA4NiwgMTA5KTtcXG4gIC0tYWNjZW50LTE6IHJnYig3NywgMTM5LCAyNTUpO1xcbiAgLS1hY2NlbnQtMjogcmdiKDQ1LCA5NiwgMjA0KTtcXG4gIC0tYWNjZW50LTM6IHJnYigxMzQsIDE1MCwgMTg0KTtcXG4gIC0taG92ZXItcmVkOiByZ2IoMTY3LCA5OSwgODIpO1xcbiAgLS1wbGF5ZXItaGl0OiAjYWQ3NzZiO1xcblxcbiAgLS1jb250YWluZXItd2lkdGg6IG1pbig5MHZ3LCBjYWxjKDQwcmVtICsgNXZ3KSk7XFxuXFxuICAvKiAtLWZvbnQtZmFjdG9yOiBtYXgoY2FsYygwLjh2dyArIDAuN3JlbSksIDEuMnJlbSk7ICovXFxuICAtLWZvbnQtZmFjdG9yOiBjbGFtcCgxLjNyZW0sIGNhbGMoMC41dncgKyAwLjdyZW0pLCAxLjVyZW0pO1xcblxcbiAgLS1mb250LWxnOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDEuMDUpO1xcbiAgLS1mb250LW1kOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuOSk7XFxuICAtLWZvbnQtc206IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC43KTtcXG4gIC0tZm9udC14czogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjYpO1xcblxcbiAgLyogLS1ncmlkLW9mZnNldDogMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogJ05vdG8gU2FucyBNb25vJywgbW9ub3NwYWNlO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogODAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LWxnLCAxLjhyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMiB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LW1kLCAxLjRyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oNCB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAxcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxucCB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxufVxcbiNnYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgd2lkdGg6IHZhcigtLWNvbnRhaW5lci13aWR0aCk7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmctdG9wOiBjYWxjKDE2dmggLSA0cmVtKTtcXG59XFxuI2JvYXJkcy1jb250YWluZXIge1xcblxcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplLCAxcHgpIHNvbGlkIHZhcigtLWxpZ2h0LTIsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNDI1KTtcXG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQyNSk7XFxuICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICByaWdodDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4uZW5lbXktZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICNFRUUpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNSk7XFxuICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC41KTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgI0VFRSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uZ3JpZC1sYWJlbCB7XFxuICAvKiBoZWlnaHQ6IDJyZW07ICovXFxufVxcbi5lbmVteS1hcmVhIC5ncmlkLWxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGU6aG92ZXIge1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC0yLCBkYXJrYmx1ZSk7XFxufVxcbi5lbmVteS1hcmVhIHtcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXG59XFxuLnBsYXllci1hcmVhIHtcXG5cXG59XFxuLmdyaWQtY2VsbCB7XFxuICAvKiB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMzsgKi9cXG4gIGJvcmRlcjogY2FsYyh2YXIoLS1ncmlkLWJvcmRlci1zaXplKSAvIDIpIHNvbGlkIHZhcigtLWxpZ2h0LTIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay01LCB3aGl0ZSk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZCB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMDhzLCBiYWNrZ3JvdW5kLWNvbG9yIDAuMXM7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCBsaWdodGdyYXkpO1xcbiAgLyogcG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbiAgLyogYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAwcHggMC41cHggYmxhY2ssXFxuICAgICAgICAgICAgICAwcHggMC4ycmVtIDAuM3JlbSAwIHJnYmEoMCwwLDAsMC4zKTsgKi9cXG4gIGJveC1zaGFkb3c6IDBweCAwLjJyZW0gMC42cmVtIDAgcmdiYSgwLDAsMCwwLjIpO1xcbiAgLyogdHJhbnNmb3JtOiBzY2FsZSgxLjI1LCAxLjI1KTsgKi9cXG4gIHotaW5kZXg6IDI7XFxufVxcbi5wbGFjZS1ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgZG9kZ2VyQmx1ZSk7XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogY3JpbXNvbjtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgZ29sZCk7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0xLCBibHVlKTtcXG59XFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0zLCBsaWdodGdyZWVuKTtcXG59XFxuLmhpdC1mbGlwIHtcXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcbkBrZXlmcmFtZXMgaGl0ZmxpcCB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcXG4gIH1cXG59XFxuLmVuZW15LWhpdCB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG4gIFxcbn1cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTIsICMxMTEpO1xcbiAgLyogb3BhY2l0eTogMDsgKi9cXG59XFxuLmVuZW15LW1pc3Mge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wbGF5ZXItaGl0LCBicm93bik7XFxufVxcbi5pbmZvLWNvbnRhaW5lciB7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBwYWRkaW5nOiAxcmVtIDAuNHJlbSAwLjZyZW0gMC40cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay01LCByZ2IoNzEsIDg2LCAxMDkpKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQpO1xcbn1cXG4uaW5mby10aXRsZSB7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LWxnLCAxLjRyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMDtcXG59XFxuLmluZm8tc3RhdGUtY29udGFpbmVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuLmluZm8tc3RhdGUge1xcbiAgaGVpZ2h0OiAxLjRyZW07XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XFxuICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcbi5yb3RhdGUtYnV0dG9uLCAucm90YXRlLWJ1dHRvbiBkaXYge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IDEuNHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC4xcmVtIDAuNnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTQsICMyMjIpO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTIsIGJsdWUpO1xcbn1cXG4ucm90YXRlLWJ1dHRvbi10ZXh0IHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIG1hcmdpbi1yaWdodDogMC40cmVtO1xcbn1cXG4ucm90YXRlLWJ1dHRvbi1pY29uIHtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTIsIHdoaXRlKTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIHBhZGRpbmc6IDAuMDVyZW0gMC4zcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxufVxcbi5pbmZvLWRldGFpbHMge1xcbiAgaGVpZ2h0OiAxNXJlbTtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogMC43cmVtO1xcbn1cXG4uaW5mby1yZW1haW5pbmcge1xcbiAgaGVpZ2h0OiA3cmVtO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjRyZW0gMC4zcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xcbn1cXG4uaW5mby1yZW1haW5pbmctdGl0bGUge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLmluZm8tcmVtYWluaW5nLWxpc3Qge1xcblxcbn1cXG4ucmVtYWluaW5nLXNoaXAge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMiwgd2hpdGUpO1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgcGFkZGluZzogMC4zcmVtIDAuMnJlbTtcXG4gIG1hcmdpbjogMCAwLjNyZW0gMC4ycmVtIDA7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxufVxcbi5pbmZvLWRldGFpbHMtbWVzc2FnZSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuNDVyZW0gMC4zcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIDpyb290IHtcXG4gICAgLS1jb250YWluZXItd2lkdGg6IG1pbig4MHZ3LCAyMHJlbSk7XFxuICB9XFxuICAjcGFnZS1jb250YWluZXIge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICB9XFxuICAjZ2FtZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZy10b3A6IDJyZW07XFxuICB9XFxuICAucGxheWVyLWdyaWQtd3JhcHBlciB7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxKTtcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDEpO1xcbiAgfVxcbiAgLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjkpO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC45KTtcXG4gIH1cXG4gIC5pbmZvLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxIC0gMXJlbSk7XFxuICAgIG1hcmdpbi10b3A6IDAuOHJlbTtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQix1QkFBdUI7O0VBRXZCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsNkJBQTZCO0VBQzdCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIsNkJBQTZCO0VBQzdCLDRCQUE0QjtFQUM1Qiw4QkFBOEI7RUFDOUIsNkJBQTZCO0VBQzdCLHFCQUFxQjs7RUFFckIsK0NBQStDOztFQUUvQyxzREFBc0Q7RUFDdEQsMERBQTBEOztFQUUxRCwwQ0FBMEM7RUFDMUMseUNBQXlDO0VBQ3pDLHlDQUF5QztFQUN6Qyx5Q0FBeUM7O0VBRXpDLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHdDQUF3QztFQUN4Qyw0QkFBNEI7RUFDNUIsc0NBQXNDO0FBQ3hDO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIsaUNBQWlDO0VBQ2pDLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlDQUFpQztFQUNqQyx3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGdCQUFnQjtFQUNo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QzNCLHVDQUF1QztFQUN2QyxpQ0FBaUM7RUFDakMsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osaUNBQWlDO0VBQ2pDLDRCQUE0QjtFQUM1QixxQ0FBcUM7RUFDckMsc0JBQXNCO0VBQ3RCLHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0UsaUNBQWlDO0VBQ2pDLGdCQUFnQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7RUFDRSxxQkFBcUI7RUFDckIsaUNBQWlDO0VBQ2pDLHVDQUF1QztFQUN2QywyQkFBMkI7RUFDM0Isc0JBQXNCO0VBQ3RCLHlCQUF5QjtFQUN6QixxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLGlDQUFpQztFQUNqQyw0QkFBNEI7RUFDNUIscUNBQXFDO0VBQ3JDLHVCQUF1QjtFQUN2QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRTtJQUNFLG1DQUFtQztFQUNyQztFQUNBO0lBQ0UsWUFBWTtFQUNkO0VBQ0E7SUFDRSxjQUFjO0lBQ2QsaUJBQWlCO0VBQ25CO0VBQ0E7SUFDRSx1Q0FBdUM7SUFDdkMsZ0RBQWdEO0VBQ2xEO0VBQ0E7SUFDRSx5Q0FBeUM7SUFDekMsa0RBQWtEO0VBQ3BEO0VBQ0E7SUFDRSw4Q0FBOEM7SUFDOUMsa0JBQWtCO0VBQ3BCO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgLS1wYWdlLW1hcmdpbjogMXJlbTtcXG4gIC0tZ3JpZC1ib3JkZXItc2l6ZTogMHB4O1xcblxcbiAgLS1saWdodC0xOiB3aGl0ZTtcXG4gIC0tbGlnaHQtMjogI0VFRTtcXG4gIC0tbGlnaHQtMzogcmdiKDEzMSwgMTc0LCAyMzgpO1xcbiAgLS1kYXJrLTE6IGJsYWNrO1xcbiAgLS1kYXJrLTI6IHJnYigyMSwgMjEsIDIyKTtcXG4gIC0tZGFyay0zOiByZ2IoMzIsIDMzLCAzNyk7XFxuICAtLWRhcmstNDogcmdiKDUzLCA1NSwgNjYpO1xcbiAgLS1kYXJrLTU6IHJnYig3MSwgODYsIDEwOSk7XFxuICAtLWFjY2VudC0xOiByZ2IoNzcsIDEzOSwgMjU1KTtcXG4gIC0tYWNjZW50LTI6IHJnYig0NSwgOTYsIDIwNCk7XFxuICAtLWFjY2VudC0zOiByZ2IoMTM0LCAxNTAsIDE4NCk7XFxuICAtLWhvdmVyLXJlZDogcmdiKDE2NywgOTksIDgyKTtcXG4gIC0tcGxheWVyLWhpdDogI2FkNzc2YjtcXG5cXG4gIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oOTB2dywgY2FsYyg0MHJlbSArIDV2dykpO1xcblxcbiAgLyogLS1mb250LWZhY3RvcjogbWF4KGNhbGMoMC44dncgKyAwLjdyZW0pLCAxLjJyZW0pOyAqL1xcbiAgLS1mb250LWZhY3RvcjogY2xhbXAoMS4zcmVtLCBjYWxjKDAuNXZ3ICsgMC43cmVtKSwgMS41cmVtKTtcXG5cXG4gIC0tZm9udC1sZzogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAxLjA1KTtcXG4gIC0tZm9udC1tZDogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjkpO1xcbiAgLS1mb250LXNtOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuNyk7XFxuICAtLWZvbnQteHM6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC42KTtcXG5cXG4gIC8qIC0tZ3JpZC1vZmZzZXQ6IDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgTW9ubycsIG1vbm9zcGFjZTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS44cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1tZCwgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDMge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDQge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMXJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbnAge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMTAwdncgLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCBncmF5KTtcXG4gIG1hcmdpbjogdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIHdpZHRoOiB2YXIoLS1jb250YWluZXItd2lkdGgpO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogY2FsYygxNnZoIC0gNHJlbSk7XFxufVxcbiNib2FyZHMtY29udGFpbmVyIHtcXG5cXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuLmdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1saWdodC0yLCBibGFjayk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQyNSk7XFxuICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40MjUpO1xcbiAgbWFyZ2luLWJvdHRvbTogMC44cmVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjRUVFKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjUpO1xcbiAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5wbGF5ZXItZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICNFRUUpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLmdyaWQtbGFiZWwge1xcbiAgLyogaGVpZ2h0OiAycmVtOyAqL1xcbn1cXG4uZW5lbXktYXJlYSAuZ3JpZC1sYWJlbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjb2xvcjogdmFyKC0tYWNjZW50LTEsIGJsdWUpO1xcbn1cXG4uZW5lbXktZGVsYXktdG9nZ2xlOmhvdmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtMiwgZGFya2JsdWUpO1xcbn1cXG4uZW5lbXktYXJlYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxufVxcbi5wbGF5ZXItYXJlYSB7XFxuXFxufVxcbi5ncmlkLWNlbGwge1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjM7ICovXFxuICBib3JkZXI6IGNhbGModmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSkgLyAyKSBzb2xpZCB2YXIoLS1saWdodC0yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNSwgd2hpdGUpO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQgLmdyaWQtY2VsbC11bmNsaWNrZWQge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjA4cywgYmFja2dyb3VuZC1jb2xvciAwLjFzO1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZDpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgbGlnaHRncmF5KTtcXG4gIC8qIHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cXG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDAuNXB4IGJsYWNrLFxcbiAgICAgICAgICAgICAgMHB4IDAuMnJlbSAwLjNyZW0gMCByZ2JhKDAsMCwwLDAuMyk7ICovXFxuICBib3gtc2hhZG93OiAwcHggMC4ycmVtIDAuNnJlbSAwIHJnYmEoMCwwLDAsMC4yKTtcXG4gIC8qIHRyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSk7ICovXFxuICB6LWluZGV4OiAyO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIHJnYig5OCwgMTUxLCAyMzApKTtcXG59XFxuLnBsYWNlLWhvdmVyLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIGRvZGdlckJsdWUpO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGNyaW1zb247XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Itc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIGdvbGQpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIGdvbGQpO1xcbn1cXG4uc2hpcC1zdGFuZGluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMywgbGlnaHRncmVlbik7XFxufVxcbi5oaXQtZmxpcCB7XFxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbn1cXG5Aa2V5ZnJhbWVzIGhpdGZsaXAge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XFxuICB9XFxufVxcbi5lbmVteS1oaXQge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuICBcXG59XFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0yLCAjMTExKTtcXG4gIC8qIG9wYWNpdHk6IDA7ICovXFxufVxcbi5lbmVteS1taXNzIHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGxheWVyLWhpdCwgYnJvd24pO1xcbn1cXG4uaW5mby1jb250YWluZXIge1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgcGFkZGluZzogMXJlbSAwLjRyZW0gMC42cmVtIDAuNHJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNSwgcmdiKDcxLCA4NiwgMTA5KSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40KTtcXG59XFxuLmluZm8tdGl0bGUge1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDA7XFxufVxcbi5pbmZvLXN0YXRlLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcbi5pbmZvLXN0YXRlIHtcXG4gIGhlaWdodDogMS40cmVtO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiwgLnJvdGF0ZS1idXR0b24gZGl2IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgaGVpZ2h0OiAxLjRyZW07XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuMXJlbSAwLjZyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnJvdGF0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay00LCAjMjIyKTtcXG59XFxuLnJvdGF0ZS1idXR0b246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0yLCBibHVlKTtcXG59XFxuLnJvdGF0ZS1idXR0b24tdGV4dCB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24taWNvbiB7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0yLCB3aGl0ZSk7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBwYWRkaW5nOiAwLjA1cmVtIDAuM3JlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzIHtcXG4gIGhlaWdodDogMTVyZW07XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbi1ib3R0b206IDAuN3JlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nIHtcXG4gIGhlaWdodDogN3JlbTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC40cmVtIDAuM3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5pbmZvLXJlbWFpbmluZy1saXN0IHtcXG5cXG59XFxuLnJlbWFpbmluZy1zaGlwIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTIsIHdoaXRlKTtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjJyZW07XFxuICBtYXJnaW46IDAgMC4zcmVtIDAuMnJlbSAwO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjQ1cmVtIDAuM3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oODB2dywgMjByZW0pO1xcbiAgfVxcbiAgI3BhZ2UtY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgI2dhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBhZGRpbmctdG9wOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSk7XFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxKTtcXG4gIH1cXG4gIC5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC45KTtcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuOSk7XFxuICB9XFxuICAuaW5mby1jb250YWluZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSAtIDFyZW0pO1xcbiAgICBtYXJnaW4tdG9wOiAwLjhyZW07XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21leWVycmVzZXQuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cbmRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuZ2FtZS5zdGFydCgpOyJdLCJuYW1lcyI6WyJnYW1lIiwiYW5pbWF0ZSIsImZsaXBDZWxscyIsImFuaW1hdGlvblJlZnJlc2giLCJhbmltYXRpb25MZW5ndGgiLCJmbGlwcGluZyIsImFkZFRvRmxpcENlbGxzIiwiZWxlbWVudCIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJmbGlwQWxsIiwiZ2V0U3RhdGUiLCJpZCIsImZvckVhY2giLCJjZWxsIiwic3R5bGUiLCJhbmltYXRpb24iLCJvZmZzZXRXaWR0aCIsInNldFRpbWVvdXQiLCJmYWN0b3J5SGVscGVyIiwiZ2FtZWJvYXJkRmFjdG9yeSIsInBsYXllckZhY3RvcnkiLCJzaGlwRmFjdG9yeSIsImRpc3BsYXkiLCJncmlkIiwic2hhcmVkQ29vcmRMaXN0IiwiYWxsSG92ZXJDbGFzc2VzIiwiaW5pdGlhbGl6ZSIsImVuZW15QXJlYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImVuZW15R3JpZFdyYXBwZXIiLCJlbmVteUdyaWRMYWJlbCIsImlubmVyVGV4dCIsImVuZW15RGVsYXlUb2dnbGUiLCJ0b2dnbGVEZWxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiZW5lbXlHcmlkIiwicGxheWVyQXJlYSIsInBsYXllckdyaWRXcmFwcGVyIiwicGxheWVyR3JpZExhYmVsIiwicGxheWVyR3JpZCIsImJvYXJkc0NvbnRhaW5lciIsImluZm9Db250YWluZXIiLCJnYW1lQ29udGFpbmVyIiwiaW5mb1RpdGxlIiwiaW5mb1N0YXRlQ29udGFpbmVyIiwiaW5mb1N0YXRlIiwibmFtZSIsImluZm9EZXRhaWxzIiwiaW5mb1JlbWFpbmluZyIsImluZm9SZW1haW5pbmdUaXRsZSIsImFwcGVuZENoaWxkIiwicGFnZUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiY2hpbGROb2RlcyIsImNoaWxkIiwicmVtb3ZlIiwia2V5IiwidG9nZ2xlRGlyZWN0aW9uIiwiaG9yVmVyIiwiZ2V0RGlyZWN0aW9uIiwibG9nTWVzc2FnZSIsImNsZWFyQ2xhc3MiLCJkaXNwbGF5SG92ZXIiLCJkcmF3R3JpZCIsInBsYXllciIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiZGF0YXNldCIsImNlbGxJZCIsImN1cnJlbnRTaGlwIiwiZ2V0U2hpcEZvclBsYWNlbWVudCIsImNvbnRhaW5zIiwicGxhY2VTaGlwIiwibGVuZ3RoIiwic2l6ZSIsImNvb3JkIiwiZGlyIiwiZ2V0Qm9hcmQiLCJhZHZhbmNlU2hpcFBsYWNlbWVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRDb29yZCIsImlzSGl0IiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5Iiwic3Vua01lc3NhZ2UiLCJsb2dSZW1haW5pbmciLCJnZXRTaGlwcyIsImFkdmFuY2VTdGF0ZSIsIk1hdGgiLCJzcXJ0IiwidW5kZWZpbmVkIiwiaG92ZXJOb2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtIiwiZ2V0UGxheWVycyIsImNlbGxDb29yZCIsImNvb3JkTGlzdCIsImdldENvb3Jkc0NlbnRlcmVkIiwibnVkZ2VDb29yZHNPbiIsImhvdmVyQ2xhc3NlcyIsImNoZWNrSWZPcGVuIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaG92ZXJDb29yZCIsImNlbGxJbmRleCIsImdldEluZGV4RnJvbUNvb3JkIiwiZGlzcGxheUNvb3JkIiwiaW5kZXgiLCJib2FyZCIsImNvb3JkT2JqIiwiZ2V0Q29vcmRGcm9tSW5kZXgiLCJjb29yZFRleHQiLCJwYXJlbnQiLCJjbGFzc05hbWUiLCJtc2ciLCJjdXJyZW50TWVzc2FnZSIsImZpcnN0Q2hpbGQiLCJtZXNzYWdlIiwiaW5zZXJ0QmVmb3JlIiwic2hpcHMiLCJwcmV2SW5mb1JlbWFpbmluZyIsInJlbW92ZUNoaWxkIiwiaW5mb1JlbWFpbmluZ0xpc3QiLCJzaGlwIiwiaXNTdW5rIiwicmVtYWluaW5nU2hpcCIsImdldExlbmd0aCIsInN0YXRlTWVzc2FnZSIsImRpc3BsYXlSb3RhdGVCdXR0b24iLCJyb3RhdGVCdXR0b24iLCJyb3RhdGVCdXR0b25UZXh0Iiwicm90YXRlQnV0dG9uSWNvbiIsInJlbW92ZVJvdGF0ZUJ1dHRvbiIsIm1ha2VDZWxsc1VuY2xpY2tlZCIsInJlbW92ZUNlbGxzVW5jbGlja2VkIiwibXlOYW1lIiwiYm9hcmRTaXplIiwiYXR0YWNrZWRTcGFjZXMiLCJhdHRhY2siLCJlbmVteVBsYXllciIsImFscmVhZHlBdHRhY2tlZCIsImFycmF5c01hdGNoIiwicHJvcHMiLCJoaXRzIiwiaW5pdGlhbEhpdHMiLCJoaXQiLCJpbmNsdWRlcyIsImoiLCJzaGlwSWQiLCJhbGxTaGlwc1N1bmsiLCJzdW5rIiwic2hpcFByb3BzIiwibG9jYXRpb25Qcm9wcyIsInBsYWNlZFNoaXBJZCIsInBsYWNlZENvb3JkcyIsImdldENvb3Jkc0lmT3BlbiIsIm1hcCIsIm5ld0NlbGwiLCJnZXRVbnN1bmtTaGlwcyIsInVuc3Vua1NoaXBzIiwibG9naWMiLCJlbmVteURlbGF5TWF4SW5pdGlhbCIsImVuZW15RGVsYXlNYXgiLCJzdGF0ZXMiLCJwb3NzaWJsZUVuZW15QXR0YWNrcyIsInN0YXRlIiwic2hpcExpc3QiLCJkaXJlY3Rpb24iLCJwbGF5ZXIxIiwiZW5lbXkxIiwic3RhcnQiLCJwbGFjZVJhbmRvbVNoaXBzIiwiZGVsYXlUaW1lIiwicmFuZG9tIiwiZW5lbXlSYW5kb21BdHRhY2siLCJlbmVteSIsInN1Y2Nlc3MiLCJmbG9vciIsImNvb3JkWCIsImNvb3JkWSIsImF0dGFja0luZGV4IiwiYXR0YWNrQ2VsbCIsInNwbGljZSIsImRpZEhpdCIsImF0dGFja0NlbGxJbmRleCIsImVuZW15TG9naWMiLCJwbGF5ZXJCb2FyZCIsImFjdGl2ZUhpdHMiLCJwcm9jZXNzSGl0IiwiZ2V0TW92ZSIsImdldE5leHRNb3ZlIiwiY29vcmQxIiwiY29vcmQyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzT3BlbiIsImJvYXJkQ2VsbCIsImNvb3JkcyIsInNlYXJjaFgiLCJzZWFyY2hZIiwibWF0Y2hpbmdDZWxsIiwiZmluZCIsInN0YXJ0aW5nQ29vcmQiLCJjb29yZEFycmF5IiwibnVkZ2VDb29yZHNCeSIsIm51bWJlciIsImZpcnN0Q29vcmQiLCJsYXN0Q29vcmQiLCJuZXdMaXN0IiwicmlnaHRTaWRlSGFuZyIsImxlZnRTaWRlSGFuZyIsInRvcEhhbmciLCJib3R0b21IYW5nIiwiYXR0YWNrZXIiLCJzaGlwTmFtZSIsInNoaXBTaXplIl0sInNvdXJjZVJvb3QiOiIifQ==