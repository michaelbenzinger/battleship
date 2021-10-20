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
    var attackCoord = _helpers_enemylogic_js__WEBPACK_IMPORTED_MODULE_3__["default"].getMove(possibleEnemyAttacks);
    console.log('COORD: ');
    console.log({
      attackCoord: attackCoord
    });
    var didHit = player1.getGameboard().receiveAttack(attackCoord);
    var playerGrid = document.querySelector('.player-grid');
    var attackCellIndex = _helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_2__["default"].getIndexFromCoord(attackCoord, player1.getGameboard().getBoard());

    if (didHit > 0) {
      playerGrid.childNodes.item(attackCellIndex).classList.add('hit', 'player-hit');
      _helpers_enemylogic_js__WEBPACK_IMPORTED_MODULE_3__["default"].processHit(attackCoord);
    } else {
      playerGrid.childNodes.item(attackCellIndex).classList.add('miss', 'player-miss');
      _helpers_enemylogic_js__WEBPACK_IMPORTED_MODULE_3__["default"].processMiss(attackCoord);
    }

    if (didHit === 2) {
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage(_helpers_factoryhelper_js__WEBPACK_IMPORTED_MODULE_2__["default"].sunkMessage(attackCoord, player1.getGameboard(), game.getState().target));
      _helpers_enemylogic_js__WEBPACK_IMPORTED_MODULE_3__["default"].processSunk(attackCoord);
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
/* harmony import */ var _factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factoryhelper.js */ "./src/helpers/factoryhelper.js");



var enemyLogic = function () {
  var playerGameboard = null;
  var activeHits = []; // { coords, nextMoves, dAxis }

  var activeShips = [];

  var processHit = function processHit(coord) {
    activeHits.push(coord); // Update or create ship in activeShips

    if (activeShips.length > 0) {
      console.log('BB updating active ship');
      updateActiveShip({
        coord: coord
      });
    } else if (activeHits.length === 2) {
      console.log('BB creating active ship');
      var newShip = {
        coords: [activeHits[0], activeHits[1]]
      };
      activeShips.push(newShip);
      newShip.dAxis = newShip.coords[0][0] === newShip.coords[1][0] ? 's' : 'e';
      console.log(activeShips[0]);
    }
  };

  var processMiss = function processMiss(coord) {
    if (activeShips.length > 0) {
      getNextMoves(activeShips[0]);
    } else if (activeHits.length > 0) {
      if (getAdjacentData(activeHits[0]).empty.length === 0) {
        activeHits.splice(0, 1);
        console.log('exhausted hit, removing');
        console.log(activeHits);
      }
    }
  };

  var processSunk = function processSunk(coord) {
    var sunkShipCoords = _factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].getCoordsOfShip(_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].getShipIdAtCoord(coord, playerGameboard), playerGameboard);
    console.log('sunkShipCoords: ');
    console.log(sunkShipCoords); // Delete all matching hits

    console.log('BB deleting matching hits');

    var _loop = function _loop(i) {
      sunkShipCoords.forEach(function (coord) {
        if (_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].arraysMatch(activeHits[i], coord)) {
          activeHits.splice(i, 1);
        }
      });
    };

    for (var i = activeHits.length - 1; i >= 0; i--) {
      _loop(i);
    } // Delete matching ship


    console.log('BB deleting matching ship'); // Add the sunk hit to ship memory

    if (activeShips.length > 0) {
      console.log('THERE ARE MULTIPLE ACTIVE SHIPS!');
    }

    activeShips[0].coords.push(coord);
    var spliceShip = null;

    var _loop2 = function _loop2(_i) {
      sunkShipCoords.forEach(function (coord) {
        activeShips[_i].coords.forEach(function (aCoord) {
          if (_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].arraysMatch(aCoord, coord)) {
            spliceShip = _i;
          }
        });
      });
    };

    for (var _i = 0; _i < activeShips.length; _i++) {
      _loop2(_i);
    }

    if (spliceShip !== null) {
      console.log('splicing...');
      activeShips.splice(spliceShip, 1);
    } else {
      throw "Didn't find ship to splice";
    }

    console.log('activeHits and activeShips:');
    console.log(activeHits);
    console.log(activeShips);
  };

  var getMove = function getMove(possibleEnemyAttacks) {
    // Get playerGameboard once
    if (playerGameboard === null) playerGameboard = _game_js__WEBPACK_IMPORTED_MODULE_0__["default"].getPlayers().player.getGameboard();

    if (activeShips.length > 0) {
      // There is a ship. Splice nextMove from ship and return it.
      console.log('BB getting nextmove from activeship');
      var ship = activeShips[0];

      if (!ship.nextMoves || !ship.nextMoves.length > 0) {
        getNextMoves(ship);
      }

      var randomNext = Math.floor(Math.random() * ship.nextMoves.length);
      spliceCoordFromPEA(ship.nextMoves[randomNext], possibleEnemyAttacks);
      return ship.nextMoves.splice(randomNext, 1)[0];
    } else if (activeHits.length > 0) {
      console.log('BB adjacent move from hit'); // No ships, but there are hits. Try adjacent.

      var adjacentEmpty = getAdjacentData(activeHits[0]).empty;
      var randomAdjacent = Math.floor(Math.random() * adjacentEmpty.length);
      spliceCoordFromPEA(adjacentEmpty[randomAdjacent], possibleEnemyAttacks);
      return adjacentEmpty.splice(randomAdjacent, 1)[0];
    } else {
      console.log('BB getting random'); // No ships or hits, return any random.

      var random = Math.floor(Math.random() * possibleEnemyAttacks.length);
      console.log('splicing random');
      var randomAttack = possibleEnemyAttacks.splice(random, 1);
      return randomAttack[0].coord;
    }
  }; // Update current active ship's nextMoves to the next open spots along dAxis
  // If there aren't any more available moves, flip all coords to new ships.


  var updateActiveShip = function updateActiveShip(_ref) {
    var coord = _ref.coord,
        flipDAxis = _ref.flipDAxis;
    var ship = activeShips[0];
    ship.coords.push(coord);

    if (flipDAxis) {
      ship.dAxis = ship.dAxis === 'e' ? 's' : 'e';
    } else if (ship.dAxis === null) {
      ship.dAxis = ship.coords[0][0] === ship.coords[1][0] ? 's' : 'e';
    }

    var shipId = _factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].getShipIdAtCoord(coord, playerGameboard);
    var shipFromBoard = playerGameboard.getShips()[shipId];

    if (!shipFromBoard.isSunk()) {
      getNextMoves(ship);
    }
  };

  var getNextMoves = function getNextMoves(ship) {
    console.log('getting next moves');
    console.log(activeShips);
    var min = ship.coords[0];
    var max = ship.coords[0];
    var dirMod = ship.dAxis === 'e' ? 0 : 1;

    if (ship.coords.length > 1) {
      for (var i = 1; i < ship.coords.length; i++) {
        console.log('checking coordinates for min-max...');
        console.log('dAxis: ' + ship.dAxis);

        if (ship.coords[i][dirMod] < min[dirMod]) {
          min = ship.coords[i];
        } else if (ship.coords[i][dirMod] > max[dirMod]) {
          max = ship.coords[i];
        }
      }
    }

    console.log("min: [".concat(min[0], ", ").concat(min[1], "]"));
    console.log("max: [".concat(max[0], ", ").concat(max[1], "]")); // clear nextMoves
    // For each spot to the side of min or max, if it's open add it to nextMoves

    ship.nextMoves = [];
    var minNext = ship.dAxis === 'e' ? [min[0] - 1, min[1]] : [min[0], min[1] - 1];
    var minNextCell = null;
    var maxNext = ship.dAxis === 'e' ? [max[0] + 1, max[1]] : [max[0], max[1] + 1];
    var maxNextCell = null;
    console.log("minNext: [".concat(minNext[0], ", ").concat(minNext[1], "]"));
    console.log("maxNext: [".concat(maxNext[0], ", ").concat(maxNext[1], "]"));

    if (!_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].isWithinBoundary(minNext, playerGameboard.getBoard())) {
      minNext = null;
    }

    if (!_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].isWithinBoundary(maxNext, playerGameboard.getBoard())) {
      maxNext = null;
    }

    try {
      if (minNext !== null) {
        minNextCell = playerGameboard.getBoard()[_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].getIndexFromCoord(minNext, playerGameboard.getBoard())];
      }
    } catch (_unused) {
      return;
    }

    if (minNextCell && minNextCell.hit === 0) {
      ship.nextMoves.push(minNext);
    }

    try {
      if (maxNext !== null) {
        maxNextCell = playerGameboard.getBoard()[_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].getIndexFromCoord(maxNext, playerGameboard.getBoard())];
      }
    } catch (_unused2) {
      return;
    }

    if (maxNextCell && maxNextCell.hit === 0) {
      ship.nextMoves.push(maxNext);
    } // If neither are open, do the flip


    if (ship.nextMoves.length === 0) {
      console.log('doing the flip');
      activeShips.splice(0, 1);
      ship.coords.forEach(function (coord) {
        var thisShip = {
          coords: [coord],
          dAxis: ship.dAxis === 'e' ? 's' : 'e'
        };
        activeShips.push(thisShip);
        getNextMoves(thisShip);
      });
    }

    console.log(ship.nextMoves);
  };

  var getAdjacentData = function getAdjacentData(coord) {
    var searchArrays = [[coord[0], coord[1] - 1], [coord[0], coord[1] + 1], [coord[0] - 1, coord[1]], [coord[0] + 1, coord[1]]];
    var adjHits = [];
    var adjEmpty = [];
    var adjMisses = [];

    for (var i = 0; i < 4; i++) {
      try {
        var searchCoord = searchArrays[i];
        var board = playerGameboard.getBoard();
        var index = _factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].getIndexFromCoord(searchCoord, board);

        if (index !== null) {
          if (board[index].hit === 1) {
            adjHits.push(searchCoord);
          } else if (board[index].hit === 0) {
            adjEmpty.push(searchCoord);
          } else if (board[index].hit === -1) {
            adjMisses.push(searchCoord);
          }
        }
      } catch (_unused3) {
        console.log('out of bounds');
      }
    }

    console.log({
      adjHits: adjHits,
      adjMisses: adjMisses,
      adjEmpty: adjEmpty
    });
    return {
      hits: adjHits,
      misses: adjMisses,
      empty: adjEmpty
    };
  };

  var spliceCoordFromPEA = function spliceCoordFromPEA(coord, possibleEnemyAttacks) {
    var index = null;

    for (var i = 0; i < possibleEnemyAttacks.length; i++) {
      if (_factoryhelper_js__WEBPACK_IMPORTED_MODULE_1__["default"].arraysMatch(possibleEnemyAttacks[i].coord, coord)) {
        index = i;
      }
    }

    console.log('splicing ');
    console.log('index: ' + index);
    console.log(possibleEnemyAttacks[index]);
    possibleEnemyAttacks.splice(index, 1);
  };

  return {
    processHit: processHit,
    processMiss: processMiss,
    processSunk: processSunk,
    getMove: getMove
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
    if (coord[0] < 0 || coord[0] > Math.sqrt(board.length) - 1) {
      throw 'getIndex...: [0] is out of bounds';
    } else if (coord[1] < 0 || coord[1] > Math.sqrt(board.length) - 1) {
      throw 'getIndex...: [1] is out of bounds';
    } else {
      var index = coord[1] * Math.sqrt(board.length) + coord[0];
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

  var getShipIdAtCoord = function getShipIdAtCoord(coord, gameboard) {
    var index = getIndexFromCoord(coord, gameboard.getBoard());
    var shipId = gameboard.getBoard()[index].shipId;
    return shipId;
  };

  var getCoordsOfShip = function getCoordsOfShip(shipId, gameboard) {
    var board = gameboard.getBoard();
    var shipCoords = [];
    board.forEach(function (cell) {
      if (cell.shipId === shipId) {
        console.log('pushing ');
        console.log(cell.coord);
        shipCoords.push(cell.coord);
      }
    });
    return shipCoords;
  };

  var isWithinBoundary = function isWithinBoundary(coord, board) {
    if (coord[0] >= 0 && coord[0] < Math.sqrt(board.length)) {
      if (coord[1] >= 0 && coord[1] < Math.sqrt(board.length)) {
        return true;
      }
    }

    return false;
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
    sunkMessage: sunkMessage,
    getShipIdAtCoord: getShipIdAtCoord,
    getCoordsOfShip: getCoordsOfShip,
    isWithinBoundary: isWithinBoundary
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --grid-border-size: 1px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--dark-1, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--dark-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;;EAEvB,gBAAgB;EAChB,eAAe;EACf,6BAA6B;EAC7B,eAAe;EACf,yBAAyB;EACzB,yBAAyB;EACzB,yBAAyB;EACzB,0BAA0B;EAC1B,6BAA6B;EAC7B,4BAA4B;EAC5B,8BAA8B;EAC9B,6BAA6B;EAC7B,qBAAqB;;EAErB,+CAA+C;;EAE/C,sDAAsD;EACtD,0DAA0D;;EAE1D,0CAA0C;EAC1C,yCAAyC;EACzC,yCAAyC;EACzC,yCAAyC;;EAEzC,yBAAyB;AAC3B;;AAEA;EACE,wCAAwC;EACxC,4BAA4B;EAC5B,sCAAsC;AACxC;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,iCAAiC;AACnC;AACA;EACE,iDAAiD;EACjD,kDAAkD;EAClD,qCAAqC;EACrC,gCAAgC;AAClC;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,uBAAuB;EACvB,6BAA6B;EAC7B,cAAc;EACd,8BAA8B;AAChC;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,+DAA+D;EAC/D,sBAAsB;AACxB;AACA;EACE,2CAA2C;EAC3C,oDAAoD;EACpD,qBAAqB;EACrB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,yCAAyC;EACzC,kDAAkD;EAClD,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,4BAA4B;AAC9B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,kBAAkB;AACpB;AACA;;AAEA;AACA;EACE,sCAAsC;EACtC,6DAA6D;EAC7D,sCAAsC;EACtC,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,kDAAkD;AACpD;AACA;EACE,eAAe;EACf,4CAA4C;EAC5C,wBAAwB;EACxB;oDACkD;EAClD,+CAA+C;EAC/C,kCAAkC;EAClC,UAAU;AACZ;AACA;EACE,oDAAoD;AACtD;AACA;EACE,eAAe;EACf,6CAA6C;AAC/C;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,eAAe;EACf,qBAAqB;AACvB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,eAAe;EACf,wCAAwC;AAC1C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,4BAA4B;AAC9B;AACA;EACE;IACE,wBAAwB;EAC1B;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;;AAEA;AACA;;AAEA;AACA;EACE,qCAAqC;EACrC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,2BAA2B;EAC3B,kCAAkC;EAClC,iDAAiD;EACjD,yCAAyC;AAC3C;AACA;EACE,4BAA4B;EAC5B,iCAAiC;EACjC,mBAAmB;AACrB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;EACrB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,iCAAiC;EACjC,oBAAoB;AACtB;AACA;EACE,2BAA2B;EAC3B,uCAAuC;EACvC,iCAAiC;EACjC,uBAAuB;EACvB,uBAAuB;EACvB,qBAAqB;AACvB;AACA;EACE,aAAa;EACb,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,uCAAuC;EACvC,2BAA2B;EAC3B,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE;IACE,mCAAmC;EACrC;EACA;IACE,YAAY;EACd;EACA;IACE,cAAc;IACd,iBAAiB;EACnB;EACA;IACE,uCAAuC;IACvC,gDAAgD;EAClD;EACA;IACE,yCAAyC;IACzC,kDAAkD;EACpD;EACA;IACE,8CAA8C;IAC9C,kBAAkB;EACpB;AACF","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --grid-border-size: 1px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--dark-1, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--dark-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Syx5QkFBeUIsZ0RBQWdELHlEQUF5RCxLQUFLLHFCQUFxQixxREFBcUQseUJBQXlCLEtBQUssR0FBRyxPQUFPLGdGQUFnRixZQUFZLGNBQWMsYUFBYSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxjQUFjLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsTUFBTSxPQUFPLGFBQWEsYUFBYSxXQUFXLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZ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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBRUFJLDhEQUFBO0FBQ0F4QixzREFBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvYW5pbWF0ZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2ZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2hlbHBlcnMvZW5lbXlsb2dpYy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvbWV5ZXJyZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzPzkyNGQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cbmNvbnN0IGFuaW1hdGUgPSAoKCkgPT4ge1xuICBjb25zdCBmbGlwQ2VsbHMgPSBbXTtcbiAgY29uc3QgYW5pbWF0aW9uUmVmcmVzaCA9IDAuOTtcbiAgY29uc3QgYW5pbWF0aW9uTGVuZ3RoID0gMC4zNTtcbiAgbGV0IGZsaXBwaW5nID0gZmFsc2U7XG5cbiAgY29uc3QgYWRkVG9GbGlwQ2VsbHMgPSAoZWxlbWVudCkgPT4ge1xuICAgIGZsaXBDZWxscy5wdXNoKGVsZW1lbnQpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGl0LWZsaXAnKTtcbiAgICBpZiAoIWZsaXBwaW5nKSB7XG4gICAgICBmbGlwcGluZyA9IHRydWU7XG4gICAgICBmbGlwQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZmxpcEFsbCA9ICgpID0+IHtcbiAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkICE9PSAzKSB7XG4gICAgICBmbGlwQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgY2VsbC5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XG4gICAgICB9KVxuICAgICAgZmxpcENlbGxzWzBdLm9mZnNldFdpZHRoO1xuICAgICAgZmxpcENlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNlbGwuc3R5bGUuYW5pbWF0aW9uID0gYGhpdGZsaXAgJHthbmltYXRpb25MZW5ndGh9cyAxYDtcbiAgICAgIH0pXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBmbGlwQWxsKCk7XG4gICAgICB9LCBhbmltYXRpb25SZWZyZXNoICogMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRUb0ZsaXBDZWxscyxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0ZTsiLCJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCBhbmltYXRlIGZyb20gJy4vYW5pbWF0ZS5qcyc7XG5cbmNvbnN0IGRpc3BsYXkgPSAoKCkgPT4ge1xuICBsZXQgZ3JpZCA9IG51bGw7XG4gIGxldCBzaGFyZWRDb29yZExpc3QgPSBudWxsO1xuXG4gIGNvbnN0IGFsbEhvdmVyQ2xhc3NlcyA9IFtcbiAgICAncGxhY2UtaG92ZXInLFxuICAgICdwbGFjZS1ob3Zlci1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnLFxuICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb29iJyxcbiAgICAncGxhY2UtaG92ZXItb29iLXNvbG8nXG4gIF07XG4gIGNvbnN0IGluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgY29uc3QgZW5lbXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW5lbXlBcmVhLmNsYXNzTGlzdC5hZGQoJ2VuZW15LWFyZWEnKTtcbiAgICBjb25zdCBlbmVteUdyaWRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW5lbXlHcmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdncmlkLXdyYXBwZXInLCAnZW5lbXktZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgZW5lbXlHcmlkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGVuZW15R3JpZExhYmVsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtbGFiZWwnKTtcbiAgICBlbmVteUdyaWRMYWJlbC5pbm5lclRleHQgPSAnRW5lbXknO1xuICAgIGNvbnN0IGVuZW15RGVsYXlUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgIGVuZW15RGVsYXlUb2dnbGUuY2xhc3NMaXN0LmFkZCgnZW5lbXktZGVsYXktdG9nZ2xlJyk7XG5cbiAgICBlbmVteURlbGF5VG9nZ2xlLmlubmVyVGV4dCA9IGdhbWUudG9nZ2xlRGVsYXkoKTtcbiAgICBlbmVteURlbGF5VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9IGdhbWUudG9nZ2xlRGVsYXkoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ2VuZW15LWdyaWQnKTtcblxuICAgIGNvbnN0IHBsYXllckFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJBcmVhLmNsYXNzTGlzdC5hZGQoJ3BsYXllci1hcmVhJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJHcmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdncmlkLXdyYXBwZXInLCAncGxheWVyLWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IHBsYXllckdyaWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgcGxheWVyR3JpZExhYmVsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtbGFiZWwnKTtcbiAgICBwbGF5ZXJHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ1BsYXllcic7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcGxheWVyR3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ3BsYXllci1ncmlkJyk7XG5cbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luZm8tY29udGFpbmVyJyk7XG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbWVDb250YWluZXIuaWQgPSAnZ2FtZS1jb250YWluZXInO1xuXG4gICAgY29uc3QgaW5mb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBpbmZvVGl0bGUuY2xhc3NMaXN0LmFkZCgnaW5mby10aXRsZScpO1xuICAgIGluZm9UaXRsZS5pbm5lclRleHQgPSAnQmF0dGxlc2hpcHMnO1xuICAgIGNvbnN0IGluZm9TdGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9TdGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmZvLXN0YXRlLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGluZm9TdGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbmZvU3RhdGUuY2xhc3NMaXN0LmFkZCgnaW5mby1zdGF0ZScpO1xuICAgIGluZm9TdGF0ZS5pbm5lclRleHQgPSBnYW1lLmdldFN0YXRlKCkubmFtZTtcbiAgICBjb25zdCBpbmZvRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9EZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2luZm8tZGV0YWlscycpO1xuICAgIGNvbnN0IGluZm9SZW1haW5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvUmVtYWluaW5nLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nJyk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZy10aXRsZScpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5pbm5lclRleHQgPSAnUmVtYWluaW5nIEVuZW15IFNoaXBzJztcbiAgICBpbmZvUmVtYWluaW5nLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmdUaXRsZSk7XG5cbiAgICAvLyBlbmVteUdyaWQuc3R5bGVbJ2JhY2tncm91bmQtaW1hZ2UnXSA9XG4gICAgLy8gICAndXJsKGh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS9yYW5kb20/b2NlYW4pJztcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgIHBsYXllckdyaWQuc3R5bGVbJ2JhY2tncm91bmQtaW1hZ2UnXSA9XG4gICAgLy8gICAgICd1cmwoaHR0cHM6Ly9zb3VyY2UudW5zcGxhc2guY29tL3JhbmRvbT9ib2F0LGJhdHRsZXNoaXApJztcbiAgICAvLyB9LCA1MDAwKTtcblxuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1RpdGxlKTtcbiAgICBpbmZvU3RhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1N0YXRlKTtcbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9TdGF0ZUNvbnRhaW5lcik7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvRGV0YWlscyk7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nKTtcblxuICAgIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRzQ29udGFpbmVyKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9Db250YWluZXIpO1xuXG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15QXJlYSk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15R3JpZExhYmVsKTtcbiAgICBlbmVteUFyZWEuYXBwZW5kQ2hpbGQoZW5lbXlEZWxheVRvZ2dsZSk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15R3JpZFdyYXBwZXIpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcblxuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJBcmVhKTtcbiAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKHBsYXllckdyaWRMYWJlbCk7XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkV3JhcHBlcik7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZCk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKHBhZ2VDb250YWluZXIuaGFzQ2hpbGROb2Rlcykge1xuICAgICAgcGFnZUNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUNvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJy4nKSB7XG4gICAgICAgIGdhbWUudG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGhvclZlciA9IChnYW1lLmdldERpcmVjdGlvbigpID09PSAnZSdcbiAgICAgICAgICA/ICdob3Jpem9udGFsJ1xuICAgICAgICAgIDogJ3ZlcnRpY2FsJyk7XG4gICAgICAgIGxvZ01lc3NhZ2UoJ1JvdGF0ZWQgZGlyZWN0aW9uIHRvICcgKyBob3JWZXIpO1xuICAgICAgICBjbGVhckNsYXNzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ3JpZCcpLCBhbGxIb3ZlckNsYXNzZXMpO1xuICAgICAgICBkaXNwbGF5SG92ZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkcmF3R3JpZCA9IChwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBuYW1lID0gcGxheWVyLmdldE5hbWUoKTtcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCk7XG5cbiAgICBpZiAobmFtZSA9PT0gJ2VuZW15Jykge1xuICAgICAgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmVteS1ncmlkJyk7XG4gICAgfSBlbHNlIGlmIChuYW1lID09PSAncGxheWVyJykge1xuICAgICAgZ3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ3JpZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygncGxlYXNlIHNwZWNpZnkgb3duZXIgYXMgXCJlbmVteVwiIG9yIFwicGxheWVyXCInKTtcbiAgICB9XG5cbiAgICAvLyBBZGRpbmcgY2VsbHMgYW5kIGV2ZW50IGxpc3RlbmVyc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2FtZWJvYXJkLmdldEJvYXJkKCkubGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbCcpO1xuICAgICAgY2VsbC5kYXRhc2V0LmNlbGxJZCA9IGk7XG4gICAgICBjZWxsLmRhdGFzZXQucGxheWVyID0gbmFtZTtcbiAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICBcbiAgICAgIGlmIChuYW1lID09PSAncGxheWVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICAvLyBpZiBzaGlwIGNhbiBiZSBwbGFjZWRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZ2FtZS5nZXRTaGlwRm9yUGxhY2VtZW50KCk7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGFjZS1ob3ZlcicpKSB7XG4gICAgICAgICAgICAgIC8vIHBsYWNlIHNoaXBcbiAgICAgICAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBsZW5ndGg6IGN1cnJlbnRTaGlwLnNpemUsXG4gICAgICAgICAgICAgICAgICBuYW1lOiBjdXJyZW50U2hpcC5uYW1lXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogc2hhcmVkQ29vcmRMaXN0WzBdLFxuICAgICAgICAgICAgICAgICAgZGlyOiBnYW1lLmdldERpcmVjdGlvbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAvLyBkaXNwbGF5IHBsYWNlZCBzaGlwXG4gICAgICAgICAgICAgIHBsYWNlU2hpcChzaGFyZWRDb29yZExpc3QsIGdhbWVib2FyZC5nZXRCb2FyZCgpLCBlLnRhcmdldCk7XG4gICAgICAgICAgICAgIC8vIGdhbWUuYWR2YW5jZVNoaXBQbGFjZW1lbnRcbiAgICAgICAgICAgICAgaWYgKGdhbWUuYWR2YW5jZVNoaXBQbGFjZW1lbnQoKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGNsZWFyQ2xhc3MoZS50YXJnZXQucGFyZW50RWxlbWVudCwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLnRhcmdldCA9PT0gJ2VuZW15Jykge1xuICAgICAgICAgICAgY29uc3QgY29vcmQgPSBnZXRDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgICAgICAgICBjb25zdCBpc0hpdCA9IGdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKFtjb29yZC54LCBjb29yZC55XSk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhuYW1lICsgJyAnICsgZGlzcGxheUNvb3JkKGksIGdhbWVib2FyZC5nZXRCb2FyZCgpKVxuICAgICAgICAgICAgLy8gICArICcgJyArIChpc0hpdCA/ICdoaXQhJyA6ICdtaXNzZWQnKSk7XG4gICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC11bmNsaWNrZWQnKTtcbiAgICAgICAgICAgIGlmIChpc0hpdCA+IDApIHtcbiAgICAgICAgICAgICAgYW5pbWF0ZS5hZGRUb0ZsaXBDZWxscyhlLnRhcmdldCk7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0JywgJ2VuZW15LWhpdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJywgJ2VuZW15LW1pc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0hpdCA9PT0gMikge1xuICAgICAgICAgICAgICBsb2dNZXNzYWdlKGZhY3RvcnlIZWxwZXIuc3Vua01lc3NhZ2UoY29vcmQsIGdhbWVib2FyZCwgZ2FtZS5nZXRTdGF0ZSgpLlxuICAgICAgICAgICAgICAgIHRhcmdldCkpXG4gICAgICAgICAgICAgIGxvZ1JlbWFpbmluZyhwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0U2hpcHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnYW1lLmFkdmFuY2VTdGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgPT09IDApIHtcbiAgICAgICAgICAgIGRpc3BsYXlIb3ZlcihlLnRhcmdldCwgcGxheWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgPT09IDApIHtcbiAgICAgICAgICAgIGNsZWFyQ2xhc3MoZS50YXJnZXQucGFyZW50RWxlbWVudCwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdyaWQuc3R5bGVbJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyddID0gYHJlcGVhdCgke01hdGguc3FydChnYW1lYm9hcmRcbiAgICAgICAgLmdldEJvYXJkKCkubGVuZ3RoKX0sIDFmcilgO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUhvdmVyID0gKGVsZW1lbnQsIHBsYXllcikgPT4ge1xuICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBob3Zlck5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnOmhvdmVyJyk7XG4gICAgICBlbGVtZW50ID0gaG92ZXJOb2RlTGlzdC5pdGVtKGhvdmVyTm9kZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGlmIChwbGF5ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGxheWVyID0gZ2FtZS5nZXRQbGF5ZXJzKCkucGxheWVyO1xuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZCA9IHBsYXllci5nZXRHYW1lYm9hcmQoKTtcblxuICAgIGNvbnN0IGNlbGxDb29yZCA9IGdldENvb3JkKGVsZW1lbnQuZGF0YXNldC5jZWxsSWQsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgIGxldCBjb29yZExpc3QgPSBudWxsO1xuXG4gICAgLy8gR2V0IGNvb3JkTGlzdCBjZW50ZXJlZCBhcm91bmQgaG92ZXJlZCBjb29yZGluYXRlXG4gICAgY29vcmRMaXN0ID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZHNDZW50ZXJlZChcbiAgICAgIGN1cnJlbnRTaGlwLnNpemUsXG4gICAgICB7XG4gICAgICAgIGNvb3JkOiBbY2VsbENvb3JkLngsIGNlbGxDb29yZC55XSxcbiAgICAgICAgZGlyOiBnYW1lLmdldERpcmVjdGlvbigpXG4gICAgICB9XG4gICAgKTtcbiAgICAvLyBOdWRnZSB0aGUgY29vcmRMaXN0IG9udG8gdGhlIGJvYXJkIGlmIG5lZWRlZFxuICAgIGNvb3JkTGlzdCA9IGZhY3RvcnlIZWxwZXIubnVkZ2VDb29yZHNPbihjb29yZExpc3QsXG4gICAgICBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcblxuICAgIC8vIFVwZGF0ZSBzaGFyZWQgY29vcmRpbmF0ZSBsaXN0XG4gICAgc2hhcmVkQ29vcmRMaXN0ID0gY29vcmRMaXN0O1xuXG4gICAgLy8gU2hvdyBhdmFpbGFiaWxpdHkgd2l0aCBob3ZlciBjb2xvcnNcbiAgICBsZXQgaG92ZXJDbGFzc2VzID0gW107XG4gICAgdHJ5IHtcbiAgICAgIGZhY3RvcnlIZWxwZXIuY2hlY2tJZk9wZW4oY29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLXNvbG8nLCAncGxhY2UtaG92ZXInXVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIGlmIChlcnJvciA9PT0gJ2NlbGwgb2NjdXBpZWQnKSB7XG4gICAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbycsXG4gICAgICAgICAgJ3BsYWNlLWhvdmVyLW9jY3VwaWVkJ11cbiAgICAgIH0gZWxzZSBpZiAoZXJyb3IgPT09ICdvdXQgb2YgYm91bmRzJykge1xuICAgICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLW9vYi1zb2xvJyxcbiAgICAgICAgICAncGxhY2UtaG92ZXItb29iJ107XG4gICAgICB9XG4gICAgfVxuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGhvdmVyQ29vcmQgPT4ge1xuICAgICAgY29uc3QgY2VsbEluZGV4ID0gZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChcbiAgICAgICAgW2hvdmVyQ29vcmRbMF0sIGhvdmVyQ29vcmRbMV1dLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgICAgKTtcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzLml0ZW0oY2VsbEluZGV4KS5cbiAgICAgICAgY2xhc3NMaXN0LmFkZChob3ZlckNsYXNzZXNbMV0pO1xuICAgIH0pO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3ZlckNsYXNzZXNbMF0pO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUNvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIGNvbnN0IGNvb3JkVGV4dCA9IGBbJHtjb29yZE9iai54fSwgJHtjb29yZE9iai55fV1gO1xuICAgIHJldHVybiBjb29yZFRleHQ7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZE9iaiA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRGcm9tSW5kZXgoaW5kZXgsIGJvYXJkKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogY29vcmRPYmoueCxcbiAgICAgIHk6IGNvb3JkT2JqLnksXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkTGlzdCwgYm9hcmQsIGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgY29vcmRMaXN0LmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgcGFyZW50LmNoaWxkTm9kZXNbZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChcbiAgICAgICAgY29vcmQsIGJvYXJkXG4gICAgICApXS5jbGFzc0xpc3QuYWRkKCdzaGlwLXN0YW5kaW5nJyk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBjbGVhckNsYXNzID0gKHBhcmVudCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgcGFyZW50LmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIGVsc2VcbiAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc05hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbG9nTWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBjb25zdCBpbmZvRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWRldGFpbHMnKTtcbiAgICBjb25zdCBjdXJyZW50TWVzc2FnZSA9IGluZm9EZXRhaWxzLmZpcnN0Q2hpbGQ7XG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2luZm8tZGV0YWlscy1tZXNzYWdlJyk7XG4gICAgbWVzc2FnZS5pbm5lclRleHQgPSBtc2c7XG5cbiAgICBpZiAoY3VycmVudE1lc3NhZ2UpIHtcbiAgICAgIGluZm9EZXRhaWxzLmluc2VydEJlZm9yZShtZXNzYWdlLCBjdXJyZW50TWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm9EZXRhaWxzLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgbG9nUmVtYWluaW5nID0gKHNoaXBzKSA9PiB7XG4gICAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHByZXZJbmZvUmVtYWluaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tcmVtYWluaW5nJyk7XG4gICAgaWYgKHByZXZJbmZvUmVtYWluaW5nKSBpbmZvQ29udGFpbmVyLnJlbW92ZUNoaWxkKHByZXZJbmZvUmVtYWluaW5nKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvUmVtYWluaW5nLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nJyk7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nLXRpdGxlJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmlubmVyVGV4dCA9ICdSZW1haW5pbmcgRW5lbXkgU2hpcHMnO1xuICAgIGluZm9SZW1haW5pbmcuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZ1RpdGxlKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1JlbWFpbmluZ0xpc3QuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmctbGlzdCcpO1xuICAgIGluZm9SZW1haW5pbmcuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZ0xpc3QpO1xuXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBjb25zdCByZW1haW5pbmdTaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJlbWFpbmluZ1NoaXAuY2xhc3NMaXN0LmFkZCgncmVtYWluaW5nLXNoaXAnKTtcbiAgICAgICAgcmVtYWluaW5nU2hpcC5pbm5lclRleHQgKz0gYCAke3NoaXAuZ2V0TmFtZSgpfSAoJHtzaGlwLmdldExlbmd0aCgpfSlgO1xuXG4gICAgICAgIGluZm9SZW1haW5pbmdMaXN0LmFwcGVuZENoaWxkKHJlbWFpbmluZ1NoaXApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY29uc3QgbGlzdFN0ciA9IGluZm9SZW1haW5pbmdMaXN0LmlubmVyVGV4dDtcbiAgICAvLyBpbmZvUmVtYWluaW5nTGlzdC5pbm5lclRleHQgPSBsaXN0U3RyLnN1YnN0cmluZygwLCBsaXN0U3RyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgY29uc3Qgc3RhdGVNZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGNvbnN0IGluZm9TdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXN0YXRlJyk7XG4gICAgaW5mb1N0YXRlLmlubmVyVGV4dCA9IG1zZztcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlSb3RhdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS1idXR0b24nKTtcblxuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3RhdGVCdXR0b25UZXh0LmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS1idXR0b24tdGV4dCcpO1xuICAgIHJvdGF0ZUJ1dHRvblRleHQuaW5uZXJUZXh0ID0gJ1JvdGF0ZSc7XG5cbiAgICBjb25zdCByb3RhdGVCdXR0b25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm90YXRlQnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtYnV0dG9uLWljb24nKTtcbiAgICByb3RhdGVCdXR0b25JY29uLmlubmVyVGV4dCA9ICcuJztcblxuICAgIHJvdGF0ZUJ1dHRvbi5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b25UZXh0KTtcbiAgICByb3RhdGVCdXR0b24uYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uSWNvbik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tc3RhdGUtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcblxuICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBnYW1lLnRvZ2dsZURpcmVjdGlvbigpO1xuICAgICAgY29uc3QgaG9yVmVyID0gKGdhbWUuZ2V0RGlyZWN0aW9uKCkgPT09ICdlJ1xuICAgICAgICA/ICdob3Jpem9udGFsJ1xuICAgICAgICA6ICd2ZXJ0aWNhbCcpO1xuICAgICAgbG9nTWVzc2FnZSgnUm90YXRlZCBkaXJlY3Rpb24gdG8gJyArIGhvclZlcik7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCByZW1vdmVSb3RhdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZS1idXR0b24nKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGNvbnN0IG1ha2VDZWxsc1VuY2xpY2tlZCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpLmNoaWxkTm9kZXMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtdW5jbGlja2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCByZW1vdmVDZWxsc1VuY2xpY2tlZCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpLmNoaWxkTm9kZXMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLXVuY2xpY2tlZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplLFxuICAgIGRyYXdHcmlkLFxuICAgIGxvZ01lc3NhZ2UsXG4gICAgc3RhdGVNZXNzYWdlLFxuICAgIGxvZ1JlbWFpbmluZyxcbiAgICBkaXNwbGF5Um90YXRlQnV0dG9uLFxuICAgIHJlbW92ZVJvdGF0ZUJ1dHRvbixcbiAgICBtYWtlQ2VsbHNVbmNsaWNrZWQsXG4gICAgcmVtb3ZlQ2VsbHNVbmNsaWNrZWQsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7IiwiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi4vc3JjL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXJGYWN0b3J5ID0gKG15TmFtZSwgYm9hcmRTaXplKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBteU5hbWU7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoYm9hcmRTaXplKTtcbiAgY29uc3QgYXR0YWNrZWRTcGFjZXMgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiB7IHJldHVybiBnYW1lYm9hcmQ7IH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWU7IH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkLCBlbmVteVBsYXllcikgPT4ge1xuICAgIGxldCBhbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICBhdHRhY2tlZFNwYWNlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbCwgY29vcmQpKSB7XG4gICAgICAgIGFscmVhZHlBdHRhY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWFscmVhZHlBdHRhY2tlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5lbXlQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIGF0dGFja2VkU3BhY2VzLnB1c2goY29vcmQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBhdHRhY2tlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0R2FtZWJvYXJkLFxuICAgIGdldE5hbWUsXG4gICAgYXR0YWNrLFxuICB9XG59XG5cbi8vIHByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzLCBuYW1lIH1cbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChwcm9wcykgPT4ge1xuICBjb25zdCBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gIGNvbnN0IGhpdHMgPSBwcm9wcy5pbml0aWFsSGl0cyB8fCBbXTtcbiAgY29uc3QgbmFtZSA9IHByb3BzLm5hbWU7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKCFoaXRzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBoaXRzLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4geyByZXR1cm4gbGVuZ3RoIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWUgfTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldE5hbWUsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoc2l6ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgIGNvb3JkOiBbaiwgaV0sXG4gICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgIHNoaXBJZDogbnVsbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgc3VuayA9IGZhbHNlO1xuICAgIH0pXG4gICAgcmV0dXJuIHN1bms7XG4gIH1cblxuICAvLyBzaGlwUHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogW3gsIHldLCBkaXI6ICgnZScgfHwgJ3MnKSB9XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwUHJvcHMsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgcGxhY2VkU2hpcElkID0gbnVsbDtcbiAgICBsZXQgcGxhY2VkQ29vcmRzID0gdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICBwbGFjZWRDb29yZHMgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0lmT3BlbihcbiAgICAgICAgc2hpcFByb3BzLmxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpO1xuICAgICAgcGxhY2VkU2hpcElkID0gc2hpcHMucHVzaChzaGlwRmFjdG9yeShzaGlwUHJvcHMpKSAtIDE7XG4gICAgICBib2FyZCA9IGJvYXJkLm1hcChjZWxsID0+IHtcbiAgICAgICAgbGV0IG5ld0NlbGwgPSBjZWxsO1xuICAgICAgICBwbGFjZWRDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgY29vcmQpKSB7XG4gICAgICAgICAgICBuZXdDZWxsID0ge1xuICAgICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICAgICAgc2hpcElkOiBwbGFjZWRTaGlwSWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0NlbGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IChlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGJvYXJkKTtcbiAgICBpZiAoYm9hcmRbaW5kZXhdLmhpdCAhPT0gMCkge1xuICAgICAgdGhyb3coJ2FscmVhZHkgaGl0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNoaXBJZCA9IGJvYXJkW2luZGV4XS5zaGlwSWQ7XG4gICAgaWYgKHNoaXBJZCA9PT0gbnVsbCkge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IC0xO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAxO1xuICAgICAgc2hpcHNbc2hpcElkXS5oaXQoY29vcmQpO1xuICAgICAgaWYgKHNoaXBzW3NoaXBJZF0uaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHsgcmV0dXJuIHNoaXBzIH07XG5cbiAgY29uc3QgZ2V0VW5zdW5rU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgdW5zdW5rU2hpcHMgPSBbXTtcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB1bnN1bmtTaGlwcy5wdXNoKHNoaXApO1xuICAgIH0pO1xuICAgIHJldHVybiB1bnN1bmtTaGlwcztcbiAgfVxuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4geyByZXR1cm4gYm9hcmQgfTtcblxuICByZXR1cm4ge1xuICAgIGFsbFNoaXBzU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTaGlwcyxcbiAgICBnZXRVbnN1bmtTaGlwcyxcbiAgICBnZXRCb2FyZCxcbiAgfVxufSIsImltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMnO1xuaW1wb3J0IGxvZ2ljIGZyb20gJy4vaGVscGVycy9lbmVteWxvZ2ljLmpzJztcblxuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IGVuZW15RGVsYXlNYXhJbml0aWFsID0gMjtcbiAgbGV0IGVuZW15RGVsYXlNYXggPSAwO1xuICBjb25zdCBzdGF0ZXMgPSBbXG4gICAge1xuICAgICAgaWQ6IDAsXG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBuYW1lOiAnUGxhY2UgeW91ciBzaGlwcydcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAxLFxuICAgICAgdGFyZ2V0OiAnZW5lbXknLFxuICAgICAgbmFtZTogXCJQbGF5ZXIncyB0dXJuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAyLFxuICAgICAgdGFyZ2V0OiAncGxheWVyJyxcbiAgICAgIG5hbWU6IFwiRW5lbXkncyB0dXJuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAzLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogXCJHYW1lIGZpbmlzaGVkXCJcbiAgICB9XG4gIF07XG4gIGxldCBwb3NzaWJsZUVuZW15QXR0YWNrcyA9IG51bGw7XG4gIGxldCBzdGF0ZSA9IHN0YXRlc1swXTtcbiAgY29uc3Qgc2hpcExpc3QgPSBbXG4gICAgeyBuYW1lOiAnQ2FycmllcicsIHNpemU6IDUgfSxcbiAgICB7IG5hbWU6ICdCYXR0bGVzaGlwJywgc2l6ZTogNCB9LFxuICAgIHsgbmFtZTogJ0Rlc3Ryb3llcicsIHNpemU6IDMgfSxcbiAgICB7IG5hbWU6ICdTdWJtYXJpbmUnLCBzaXplOiAzIH0sXG4gICAgeyBuYW1lOiAnUGF0cm9sIEJvYXQnLCBzaXplOiAyIH1cbiAgXTtcbiAgbGV0IGN1cnJlbnRTaGlwID0gMDtcbiAgbGV0IGRpcmVjdGlvbiA9ICdlJztcbiAgbGV0IHBsYXllcjEgPSBudWxsO1xuICBsZXQgZW5lbXkxID0gbnVsbDtcblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBwbGF5ZXIxID0gcGxheWVyRmFjdG9yeSgncGxheWVyJywgMTApO1xuICAgIGVuZW15MSA9IHBsYXllckZhY3RvcnkoJ2VuZW15JywgMTApO1xuICAgIHBvc3NpYmxlRW5lbXlBdHRhY2tzID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpO1xuXG4gICAgZGlzcGxheS5kcmF3R3JpZChwbGF5ZXIxKTtcbiAgICBkaXNwbGF5LmRyYXdHcmlkKGVuZW15MSk7XG5cbiAgICBwbGFjZVJhbmRvbVNoaXBzKGVuZW15MSk7XG4gICAgZGlyZWN0aW9uID0gJ2UnO1xuICAgIGRpc3BsYXkuZGlzcGxheVJvdGF0ZUJ1dHRvbigpO1xuICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnUGxhY2UgeW91ciAnICsgc2hpcExpc3RbY3VycmVudFNoaXBdLm5hbWUpO1xuICB9O1xuXG4gIGNvbnN0IGdldFNoaXBGb3JQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNoaXBMaXN0W2N1cnJlbnRTaGlwXTtcbiAgfVxuXG4gIGNvbnN0IGFkdmFuY2VTaGlwUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIGlmIChjdXJyZW50U2hpcCA8IDQpIHtcbiAgICAgIGN1cnJlbnRTaGlwICsrO1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKCdQbGFjZSB5b3VyICcgKyBzaGlwTGlzdFtjdXJyZW50U2hpcF0ubmFtZSk7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlzcGxheS5sb2dSZW1haW5pbmcoZW5lbXkxLmdldEdhbWVib2FyZCgpLmdldFNoaXBzKCkpO1xuICAgICAgZGlzcGxheS5tYWtlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgIGFkdmFuY2VTdGF0ZSgpO1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWR2YW5jZVN0YXRlID0gKCkgPT4ge1xuICAgIGlmIChwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoJ0VuZW15IHdpbnMuJyk7XG4gICAgICBkaXNwbGF5LnJlbW92ZUNlbGxzVW5jbGlja2VkKCk7XG4gICAgICBzdGF0ZSA9IHN0YXRlc1szXTtcblxuICAgIH0gZWxzZSBpZiAoZW5lbXkxLmdldEdhbWVib2FyZCgpLmFsbFNoaXBzU3VuaygpKSB7XG4gICAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoJ1lvdSB3aW4hJyk7XG4gICAgICBkaXNwbGF5LnJlbW92ZUNlbGxzVW5jbGlja2VkKCk7XG4gICAgICBzdGF0ZSA9IHN0YXRlc1szXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHN0YXRlLmlkID09PSAwKSB7XG4gICAgICAgIGRpc3BsYXkucmVtb3ZlUm90YXRlQnV0dG9uKCk7XG4gICAgICAgIHN0YXRlID0gc3RhdGVzWzFdO1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZS5pZCA9PT0gMSkge1xuICAgICAgICBkaXNwbGF5LnJlbW92ZUNlbGxzVW5jbGlja2VkKCk7XG4gICAgICAgIHN0YXRlID0gc3RhdGVzWzJdO1xuICAgICAgICBjb25zdCBkZWxheVRpbWUgPSAoZW5lbXlEZWxheU1heCAvIDQgK1xuICAgICAgICAgICAgKE1hdGgucmFuZG9tKCkgKiBlbmVteURlbGF5TWF4ICogMyAvIDQpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGF5aW5nICcgKyBkZWxheVRpbWUgKyAnIHNlY29uZHMnKTtcbiAgICAgICAgaWYgKGRlbGF5VGltZSAhPT0gMCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZW5lbXlSYW5kb21BdHRhY2soKTtcbiAgICAgICAgICB9LCAxMDAwICogZGVsYXlUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmVteVJhbmRvbUF0dGFjaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwbGF5Lm1ha2VDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwbGF5LnN0YXRlTWVzc2FnZShzdGF0ZS5uYW1lKTtcbiAgfVxuXG4gIGNvbnN0IGdldFN0YXRlID0gKCkgPT4ge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IGdldERpcmVjdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGlyZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdlJykgZGlyZWN0aW9uID0gJ3MnO1xuICAgIGVsc2UgZGlyZWN0aW9uID0gJ2UnO1xuICB9XG5cbiAgY29uc3QgZ2V0UGxheWVycyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcGxheWVyOiBwbGF5ZXIxLFxuICAgICAgZW5lbXk6IGVuZW15MVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlUmFuZG9tU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgYm9hcmRTaXplID0gTWF0aC5zcXJ0KHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpLmxlbmd0aCk7XG4gICAgc2hpcExpc3QuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICB3aGlsZSAoc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwKSB0b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgbGV0IGNvb3JkWCA9IG51bGw7XG4gICAgICAgIGxldCBjb29yZFkgPSBudWxsO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2l6ZSAtIDEpKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb3JkWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgICBjb29yZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2l6ZSAtIDEpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAocGxheWVyLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGVuZ3RoOiBzaGlwLnNpemUsXG4gICAgICAgICAgICAgIG5hbWU6IHNoaXAubmFtZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFtjb29yZFgsIGNvb3JkWV0sXG4gICAgICAgICAgICAgIGRpcjogZGlyZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSkge1xuICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHBsYWNlIGEgc2hpcCwgdHJ5aW5nIGFnYWluJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGVuZW15UmFuZG9tQXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGF0dGFja0Nvb3JkID0gbG9naWMuZ2V0TW92ZShwb3NzaWJsZUVuZW15QXR0YWNrcyk7XG4gICAgY29uc29sZS5sb2coJ0NPT1JEOiAnKTtcbiAgICBjb25zb2xlLmxvZyh7IGF0dGFja0Nvb3JkIH0pO1xuICAgIGNvbnN0IGRpZEhpdCA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ3JpZCcpO1xuICAgIGNvbnN0IGF0dGFja0NlbGxJbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoYXR0YWNrQ29vcmQsIHBsYXllcjEuXG4gICAgICBnZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpKTtcbiAgICBpZiAoZGlkSGl0ID4gMCkge1xuICAgICAgcGxheWVyR3JpZC5jaGlsZE5vZGVzLml0ZW0oYXR0YWNrQ2VsbEluZGV4KS5jbGFzc0xpc3QuYWRkKCdoaXQnLCAncGxheWVyLWhpdCcpO1xuICAgICAgbG9naWMucHJvY2Vzc0hpdChhdHRhY2tDb29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllckdyaWQuY2hpbGROb2Rlcy5pdGVtKGF0dGFja0NlbGxJbmRleCkuY2xhc3NMaXN0LmFkZCgnbWlzcycsICdwbGF5ZXItbWlzcycpO1xuICAgICAgbG9naWMucHJvY2Vzc01pc3MoYXR0YWNrQ29vcmQpO1xuICAgIH1cbiAgICBpZiAoZGlkSGl0ID09PSAyKSB7XG4gICAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoZmFjdG9yeUhlbHBlci5zdW5rTWVzc2FnZShhdHRhY2tDb29yZCxcbiAgICAgICAgcGxheWVyMS5nZXRHYW1lYm9hcmQoKSwgZ2FtZS5nZXRTdGF0ZSgpLnRhcmdldCkpXG4gICAgICBsb2dpYy5wcm9jZXNzU3VuayhhdHRhY2tDb29yZCk7XG4gICAgfVxuICAgIGFkdmFuY2VTdGF0ZSgpO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGVsYXkgPSAoKSA9PiB7XG4gICAgaWYgKGVuZW15RGVsYXlNYXggPT09IDApIHtcbiAgICAgIGVuZW15RGVsYXlNYXggPSBlbmVteURlbGF5TWF4SW5pdGlhbDtcbiAgICAgIHJldHVybiAnZGVsYXkgb24nO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmVteURlbGF5TWF4ID0gMDtcbiAgICAgIHJldHVybiAnZGVsYXkgb2ZmJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGdldFNoaXBGb3JQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVNoaXBQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVN0YXRlLFxuICAgIGdldFN0YXRlLFxuICAgIGdldERpcmVjdGlvbixcbiAgICB0b2dnbGVEaXJlY3Rpb24sXG4gICAgZ2V0UGxheWVycyxcbiAgICB0b2dnbGVEZWxheSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJpbXBvcnQgZ2FtZSBmcm9tICcuLi9nYW1lLmpzJztcbmltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vZmFjdG9yeWhlbHBlci5qcyc7XG5cbmNvbnN0IGVuZW15TG9naWMgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyR2FtZWJvYXJkID0gbnVsbDtcbiAgbGV0IGFjdGl2ZUhpdHMgPSBbXTtcbiAgLy8geyBjb29yZHMsIG5leHRNb3ZlcywgZEF4aXMgfVxuICBsZXQgYWN0aXZlU2hpcHMgPSBbXTtcblxuICBjb25zdCBwcm9jZXNzSGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgYWN0aXZlSGl0cy5wdXNoKGNvb3JkKTtcblxuICAgIC8vIFVwZGF0ZSBvciBjcmVhdGUgc2hpcCBpbiBhY3RpdmVTaGlwc1xuICAgIGlmIChhY3RpdmVTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnQkIgdXBkYXRpbmcgYWN0aXZlIHNoaXAnKTtcbiAgICAgIHVwZGF0ZUFjdGl2ZVNoaXAoeyBjb29yZDogY29vcmQgfSk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVIaXRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgY29uc29sZS5sb2coJ0JCIGNyZWF0aW5nIGFjdGl2ZSBzaGlwJyk7XG4gICAgICBjb25zdCBuZXdTaGlwID0ge1xuICAgICAgICBjb29yZHM6IFthY3RpdmVIaXRzWzBdLCBhY3RpdmVIaXRzWzFdXVxuICAgICAgfVxuICAgICAgYWN0aXZlU2hpcHMucHVzaChuZXdTaGlwKTtcbiAgICAgIG5ld1NoaXAuZEF4aXMgPSAobmV3U2hpcC5jb29yZHNbMF1bMF0gPT09IG5ld1NoaXAuY29vcmRzWzFdWzBdKSA/ICdzJyA6ICdlJztcbiAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZVNoaXBzWzBdKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9jZXNzTWlzcyA9IChjb29yZCkgPT4ge1xuICAgIGlmIChhY3RpdmVTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICBnZXROZXh0TW92ZXMoYWN0aXZlU2hpcHNbMF0pO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlSGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoZ2V0QWRqYWNlbnREYXRhKGFjdGl2ZUhpdHNbMF0pLmVtcHR5Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBhY3RpdmVIaXRzLnNwbGljZSgwLCAxKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2V4aGF1c3RlZCBoaXQsIHJlbW92aW5nJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGFjdGl2ZUhpdHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2Nlc3NTdW5rID0gKGNvb3JkKSA9PiB7XG4gICAgY29uc3Qgc3Vua1NoaXBDb29yZHMgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc09mU2hpcChmYWN0b3J5SGVscGVyLlxuICAgICAgZ2V0U2hpcElkQXRDb29yZChjb29yZCwgcGxheWVyR2FtZWJvYXJkKSwgcGxheWVyR2FtZWJvYXJkKTtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnc3Vua1NoaXBDb29yZHM6ICcpO1xuICAgIGNvbnNvbGUubG9nKHN1bmtTaGlwQ29vcmRzKTtcblxuICAgIC8vIERlbGV0ZSBhbGwgbWF0Y2hpbmcgaGl0c1xuICAgIGNvbnNvbGUubG9nKCdCQiBkZWxldGluZyBtYXRjaGluZyBoaXRzJyk7XG4gICAgZm9yIChsZXQgaSA9IGFjdGl2ZUhpdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHN1bmtTaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChhY3RpdmVIaXRzW2ldLCBjb29yZCkpIHtcbiAgICAgICAgICBhY3RpdmVIaXRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gRGVsZXRlIG1hdGNoaW5nIHNoaXBcbiAgICBjb25zb2xlLmxvZygnQkIgZGVsZXRpbmcgbWF0Y2hpbmcgc2hpcCcpO1xuICAgIC8vIEFkZCB0aGUgc3VuayBoaXQgdG8gc2hpcCBtZW1vcnlcbiAgICBpZiAoYWN0aXZlU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5sb2coJ1RIRVJFIEFSRSBNVUxUSVBMRSBBQ1RJVkUgU0hJUFMhJyk7XG4gICAgfVxuICAgIGFjdGl2ZVNoaXBzWzBdLmNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICBsZXQgc3BsaWNlU2hpcCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3RpdmVTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3Vua1NoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgIGFjdGl2ZVNoaXBzW2ldLmNvb3Jkcy5mb3JFYWNoKGFDb29yZCA9PiB7XG4gICAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goYUNvb3JkLCBjb29yZCkpIHtcbiAgICAgICAgICAgIHNwbGljZVNoaXAgPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc3BsaWNlU2hpcCAhPT0gbnVsbCkge1xuICAgICAgY29uc29sZS5sb2coJ3NwbGljaW5nLi4uJyk7XG4gICAgICBhY3RpdmVTaGlwcy5zcGxpY2Uoc3BsaWNlU2hpcCwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IChcIkRpZG4ndCBmaW5kIHNoaXAgdG8gc3BsaWNlXCIpO1xuICAgIH1cblxuXG4gICAgY29uc29sZS5sb2coJ2FjdGl2ZUhpdHMgYW5kIGFjdGl2ZVNoaXBzOicpO1xuICAgIGNvbnNvbGUubG9nKGFjdGl2ZUhpdHMpO1xuICAgIGNvbnNvbGUubG9nKGFjdGl2ZVNoaXBzKTtcbiAgfVxuXG4gIGNvbnN0IGdldE1vdmUgPSAocG9zc2libGVFbmVteUF0dGFja3MpID0+IHtcbiAgICAvLyBHZXQgcGxheWVyR2FtZWJvYXJkIG9uY2VcbiAgICBpZiAocGxheWVyR2FtZWJvYXJkID09PSBudWxsKSBwbGF5ZXJHYW1lYm9hcmQgPSBnYW1lLmdldFBsYXllcnMoKS5wbGF5ZXIuZ2V0R2FtZWJvYXJkKCk7XG5cbiAgICBpZiAoYWN0aXZlU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gVGhlcmUgaXMgYSBzaGlwLiBTcGxpY2UgbmV4dE1vdmUgZnJvbSBzaGlwIGFuZCByZXR1cm4gaXQuXG4gICAgICBjb25zb2xlLmxvZygnQkIgZ2V0dGluZyBuZXh0bW92ZSBmcm9tIGFjdGl2ZXNoaXAnKTtcbiAgICAgIGxldCBzaGlwID0gYWN0aXZlU2hpcHNbMF07XG4gICAgICBpZiAoIXNoaXAubmV4dE1vdmVzIHx8ICFzaGlwLm5leHRNb3Zlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGdldE5leHRNb3ZlcyhzaGlwKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJhbmRvbU5leHQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLm5leHRNb3Zlcy5sZW5ndGgpO1xuXG4gICAgICBzcGxpY2VDb29yZEZyb21QRUEoc2hpcC5uZXh0TW92ZXNbcmFuZG9tTmV4dF0sIHBvc3NpYmxlRW5lbXlBdHRhY2tzKTtcbiAgICAgIHJldHVybiBzaGlwLm5leHRNb3Zlcy5zcGxpY2UocmFuZG9tTmV4dCwgMSlbMF07XG4gICAgfSBlbHNlIGlmIChhY3RpdmVIaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCQiBhZGphY2VudCBtb3ZlIGZyb20gaGl0Jyk7XG4gICAgICAvLyBObyBzaGlwcywgYnV0IHRoZXJlIGFyZSBoaXRzLiBUcnkgYWRqYWNlbnQuXG4gICAgICBjb25zdCBhZGphY2VudEVtcHR5ID0gZ2V0QWRqYWNlbnREYXRhKGFjdGl2ZUhpdHNbMF0pLmVtcHR5O1xuICAgICAgY29uc3QgcmFuZG9tQWRqYWNlbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhZGphY2VudEVtcHR5Lmxlbmd0aCk7XG5cbiAgICAgIHNwbGljZUNvb3JkRnJvbVBFQShhZGphY2VudEVtcHR5W3JhbmRvbUFkamFjZW50XSwgcG9zc2libGVFbmVteUF0dGFja3MpO1xuICAgICAgcmV0dXJuIGFkamFjZW50RW1wdHkuc3BsaWNlKHJhbmRvbUFkamFjZW50LCAxKVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ0JCIGdldHRpbmcgcmFuZG9tJyk7XG4gICAgICAvLyBObyBzaGlwcyBvciBoaXRzLCByZXR1cm4gYW55IHJhbmRvbS5cbiAgICAgIGNvbnN0IHJhbmRvbSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlRW5lbXlBdHRhY2tzLmxlbmd0aCk7XG4gICAgICBjb25zb2xlLmxvZygnc3BsaWNpbmcgcmFuZG9tJyk7XG4gICAgICBjb25zdCByYW5kb21BdHRhY2sgPSBwb3NzaWJsZUVuZW15QXR0YWNrcy5zcGxpY2UocmFuZG9tLCAxKTtcbiAgICAgIHJldHVybiByYW5kb21BdHRhY2tbMF0uY29vcmQ7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIGN1cnJlbnQgYWN0aXZlIHNoaXAncyBuZXh0TW92ZXMgdG8gdGhlIG5leHQgb3BlbiBzcG90cyBhbG9uZyBkQXhpc1xuICAvLyBJZiB0aGVyZSBhcmVuJ3QgYW55IG1vcmUgYXZhaWxhYmxlIG1vdmVzLCBmbGlwIGFsbCBjb29yZHMgdG8gbmV3IHNoaXBzLlxuICBjb25zdCB1cGRhdGVBY3RpdmVTaGlwID0gKHsgY29vcmQsIGZsaXBEQXhpcyB9KSA9PiB7XG4gICAgbGV0IHNoaXAgPSBhY3RpdmVTaGlwc1swXTtcbiAgICBzaGlwLmNvb3Jkcy5wdXNoKGNvb3JkKTtcbiAgICBpZiAoZmxpcERBeGlzKSB7XG4gICAgICBzaGlwLmRBeGlzID0gKHNoaXAuZEF4aXMgPT09ICdlJykgPyAncycgOiAnZSc7XG4gICAgfSBlbHNlIGlmIChzaGlwLmRBeGlzID09PSBudWxsKSB7XG4gICAgICBzaGlwLmRBeGlzID0gKHNoaXAuY29vcmRzWzBdWzBdID09PSBzaGlwLmNvb3Jkc1sxXVswXSkgPyAncycgOiAnZSc7XG4gICAgfVxuICAgIGxldCBzaGlwSWQgPSBmYWN0b3J5SGVscGVyLmdldFNoaXBJZEF0Q29vcmQoY29vcmQsIHBsYXllckdhbWVib2FyZCk7XG4gICAgbGV0IHNoaXBGcm9tQm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0U2hpcHMoKVtzaGlwSWRdO1xuICAgIGlmICghc2hpcEZyb21Cb2FyZC5pc1N1bmsoKSkge1xuICAgICAgZ2V0TmV4dE1vdmVzKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldE5leHRNb3ZlcyA9IChzaGlwKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2dldHRpbmcgbmV4dCBtb3ZlcycpO1xuICAgIGNvbnNvbGUubG9nKGFjdGl2ZVNoaXBzKTtcbiAgICBsZXQgbWluID0gc2hpcC5jb29yZHNbMF07XG4gICAgbGV0IG1heCA9IHNoaXAuY29vcmRzWzBdO1xuICAgIGxldCBkaXJNb2QgPSAoc2hpcC5kQXhpcyA9PT0gJ2UnKSA/IDAgOiAxO1xuICAgIGlmIChzaGlwLmNvb3Jkcy5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IHNoaXAuY29vcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja2luZyBjb29yZGluYXRlcyBmb3IgbWluLW1heC4uLicpO1xuICAgICAgICBjb25zb2xlLmxvZygnZEF4aXM6ICcgKyBzaGlwLmRBeGlzKTtcbiAgICAgICAgaWYgKHNoaXAuY29vcmRzW2ldW2Rpck1vZF0gPCBtaW5bZGlyTW9kXSkge1xuICAgICAgICAgIG1pbiA9IHNoaXAuY29vcmRzW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKHNoaXAuY29vcmRzW2ldW2Rpck1vZF0gPiBtYXhbZGlyTW9kXSkge1xuICAgICAgICAgIG1heCA9IHNoaXAuY29vcmRzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGBtaW46IFske21pblswXX0sICR7bWluWzFdfV1gKTtcbiAgICBjb25zb2xlLmxvZyhgbWF4OiBbJHttYXhbMF19LCAke21heFsxXX1dYCk7XG4gICAgLy8gY2xlYXIgbmV4dE1vdmVzXG4gICAgLy8gRm9yIGVhY2ggc3BvdCB0byB0aGUgc2lkZSBvZiBtaW4gb3IgbWF4LCBpZiBpdCdzIG9wZW4gYWRkIGl0IHRvIG5leHRNb3Zlc1xuICAgIHNoaXAubmV4dE1vdmVzID0gW107XG5cbiAgICBsZXQgbWluTmV4dCA9IChzaGlwLmRBeGlzID09PSAnZScpXG4gICAgICA/IFttaW5bMF0gLSAxLCBtaW5bMV1dXG4gICAgICA6IFttaW5bMF0sIG1pblsxXSAtIDFdO1xuICAgIGxldCBtaW5OZXh0Q2VsbCA9IG51bGw7XG4gICAgbGV0IG1heE5leHQgPSAoc2hpcC5kQXhpcyA9PT0gJ2UnKVxuICAgICAgPyBbbWF4WzBdICsgMSwgbWF4WzFdXVxuICAgICAgOiBbbWF4WzBdLCBtYXhbMV0gKyAxXTtcbiAgICBsZXQgbWF4TmV4dENlbGwgPSBudWxsO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKGBtaW5OZXh0OiBbJHttaW5OZXh0WzBdfSwgJHttaW5OZXh0WzFdfV1gKTtcbiAgICBjb25zb2xlLmxvZyhgbWF4TmV4dDogWyR7bWF4TmV4dFswXX0sICR7bWF4TmV4dFsxXX1dYCk7XG5cbiAgICBpZiAoIWZhY3RvcnlIZWxwZXIuaXNXaXRoaW5Cb3VuZGFyeShtaW5OZXh0LCBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKSkpIHtcbiAgICAgIG1pbk5leHQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoIWZhY3RvcnlIZWxwZXIuaXNXaXRoaW5Cb3VuZGFyeShtYXhOZXh0LCBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKSkpIHtcbiAgICAgIG1heE5leHQgPSBudWxsO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAobWluTmV4dCAhPT0gbnVsbCkge1xuICAgICAgICBtaW5OZXh0Q2VsbCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpW2ZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQobWluTmV4dCxcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKSldO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIDtcbiAgICB9XG4gICAgaWYgKG1pbk5leHRDZWxsICYmIG1pbk5leHRDZWxsLmhpdCA9PT0gMCkge1xuICAgICAgc2hpcC5uZXh0TW92ZXMucHVzaChtaW5OZXh0KTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGlmIChtYXhOZXh0ICE9PSBudWxsKSB7XG4gICAgICAgIG1heE5leHRDZWxsID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKClbZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChtYXhOZXh0LFxuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpKV07XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gO1xuICAgIH1cbiAgICBpZiAobWF4TmV4dENlbGwgJiYgbWF4TmV4dENlbGwuaGl0ID09PSAwKSB7XG4gICAgICBzaGlwLm5leHRNb3Zlcy5wdXNoKG1heE5leHQpO1xuICAgIH1cblxuICAgIC8vIElmIG5laXRoZXIgYXJlIG9wZW4sIGRvIHRoZSBmbGlwXG4gICAgaWYgKHNoaXAubmV4dE1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ2RvaW5nIHRoZSBmbGlwJyk7XG4gICAgICBhY3RpdmVTaGlwcy5zcGxpY2UoMCwgMSk7XG4gICAgICBzaGlwLmNvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgbGV0IHRoaXNTaGlwID0ge1xuICAgICAgICAgIGNvb3JkczogW2Nvb3JkXSxcbiAgICAgICAgICBkQXhpczogKHNoaXAuZEF4aXMgPT09ICdlJykgPyAncycgOiAnZSdcbiAgICAgICAgfVxuICAgICAgICBhY3RpdmVTaGlwcy5wdXNoKHRoaXNTaGlwKTtcbiAgICAgICAgZ2V0TmV4dE1vdmVzKHRoaXNTaGlwKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyggc2hpcC5uZXh0TW92ZXMgKTtcbiAgfVxuICBcbiAgY29uc3QgZ2V0QWRqYWNlbnREYXRhID0gKGNvb3JkKSA9PiB7XG4gICAgbGV0IHNlYXJjaEFycmF5cyA9IFtcbiAgICAgIFtjb29yZFswXSwgY29vcmRbMV0gLSAxXSxcbiAgICAgIFtjb29yZFswXSwgY29vcmRbMV0gKyAxXSxcbiAgICAgIFtjb29yZFswXSAtIDEsIGNvb3JkWzFdXSxcbiAgICAgIFtjb29yZFswXSArIDEsIGNvb3JkWzFdXSxcbiAgICBdXG4gICAgbGV0IGFkakhpdHMgPSBbXTtcbiAgICBsZXQgYWRqRW1wdHkgPSBbXTtcbiAgICBsZXQgYWRqTWlzc2VzID0gW107XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaENvb3JkID0gc2VhcmNoQXJyYXlzW2ldO1xuICAgICAgICBjb25zdCBib2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICAgIGxldCBpbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoc2VhcmNoQ29vcmQsIGJvYXJkKTtcbiAgICAgICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGJvYXJkW2luZGV4XS5oaXQgPT09IDEpIHtcbiAgICAgICAgICAgIGFkakhpdHMucHVzaChzZWFyY2hDb29yZCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpbmRleF0uaGl0ID09PSAwKSB7XG4gICAgICAgICAgICBhZGpFbXB0eS5wdXNoKHNlYXJjaENvb3JkKVxuICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaW5kZXhdLmhpdCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGFkak1pc3Nlcy5wdXNoKHNlYXJjaENvb3JkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7IFxuICAgICAgICBjb25zb2xlLmxvZygnb3V0IG9mIGJvdW5kcycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKCB7YWRqSGl0cywgYWRqTWlzc2VzLCBhZGpFbXB0eX0pO1xuICAgIHJldHVybiB7XG4gICAgICBoaXRzOiBhZGpIaXRzLFxuICAgICAgbWlzc2VzOiBhZGpNaXNzZXMsXG4gICAgICBlbXB0eTogYWRqRW1wdHlcbiAgICB9O1xuICB9XG5cbiAgY29uc3Qgc3BsaWNlQ29vcmRGcm9tUEVBID0gKGNvb3JkLCBwb3NzaWJsZUVuZW15QXR0YWNrcykgPT4ge1xuICAgIGxldCBpbmRleCA9IG51bGw7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NzaWJsZUVuZW15QXR0YWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2gocG9zc2libGVFbmVteUF0dGFja3NbaV0uY29vcmQsIGNvb3JkKSkge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdzcGxpY2luZyAnKVxuICAgIGNvbnNvbGUubG9nKCdpbmRleDogJyArIGluZGV4KTtcbiAgICBjb25zb2xlLmxvZyhwb3NzaWJsZUVuZW15QXR0YWNrc1tpbmRleF0pO1xuICAgIHBvc3NpYmxlRW5lbXlBdHRhY2tzLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb2Nlc3NIaXQsXG4gICAgcHJvY2Vzc01pc3MsXG4gICAgcHJvY2Vzc1N1bmssXG4gICAgZ2V0TW92ZSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZW5lbXlMb2dpYzsiLCJjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgY29uc3QgYXJyYXlzTWF0Y2ggPSAoY29vcmQxLCBjb29yZDIpID0+IHtcbiAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KGNvb3JkMSkgPT09IEpTT04uc3RyaW5naWZ5KGNvb3JkMikpXG4gICAgICA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrSWZPcGVuID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBsZXQgaXNPcGVuID0gdHJ1ZTtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtnZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpXTtcbiAgICAgIGlmIChib2FyZENlbGwuc2hpcElkICE9PSBudWxsKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aHJvdygnY2VsbCBvY2N1cGllZCcpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gICAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFs1LCA1XSwgZGlyOiAoZSB8fCBzKSB9XG4gIGNvbnN0IGdldENvb3Jkc0lmT3BlbiA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNlYXJjaFggPSBsb2NhdGlvblByb3BzLmNvb3JkWzBdO1xuICAgICAgbGV0IHNlYXJjaFkgPSBsb2NhdGlvblByb3BzLmNvb3JkWzFdO1xuICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICA/IHNlYXJjaFggKz0gaVxuICAgICAgICA6IHNlYXJjaFkgKz0gaTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgW3NlYXJjaFgsIHNlYXJjaFldKVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgaWYgKCFtYXRjaGluZ0NlbGwpIHRocm93KCdvdXQgb2YgYm91bmRzJyk7XG4gICAgICBlbHNlIGlmIChtYXRjaGluZ0NlbGwuc2hpcElkICE9PSBudWxsKSB0aHJvdygnY2VsbCBvY2N1cGllZCcpXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gU3VjY2Vzc1xuICAgICAgICBjb29yZHMucHVzaChbc2VhcmNoWCwgc2VhcmNoWV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRzQ2VudGVyZWQgPSAobGVuZ3RoLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHN0YXJ0aW5nQ29vcmQgPSBudWxsO1xuICAgIGNvbnN0IGRpciA9IGxvY2F0aW9uUHJvcHMuZGlyO1xuICAgIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpLFxuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzFdXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAncycpIHtcbiAgICAgIHN0YXJ0aW5nQ29vcmQgPSBbXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMF0sXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV0gLSBNYXRoLmZsb29yKChsZW5ndGggLSAxKS8yKVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IGRpcmVjdGlvbiBiZWZvcmUgZ2V0dGluZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjb29yZFggPSAoZGlyID09PSAnZScpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFswXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzBdO1xuICAgICAgY29uc3QgY29vcmRZID0gKGRpciA9PT0gJ3MnKVxuICAgICAgICA/IHN0YXJ0aW5nQ29vcmRbMV0gKyBpXG4gICAgICAgIDogc3RhcnRpbmdDb29yZFsxXTtcbiAgICAgIGNvb3JkQXJyYXkucHVzaChbY29vcmRYLCBjb29yZFldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkQXJyYXk7XG4gIH1cblxuICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICBpZiAoY29vcmRbMF0gPCAwIHx8IGNvb3JkWzBdID4gKE1hdGguc3FydChib2FyZC5sZW5ndGgpIC0gMSkpIHtcbiAgICAgIHRocm93KCdnZXRJbmRleC4uLjogWzBdIGlzIG91dCBvZiBib3VuZHMnKTtcbiAgICB9IGVsc2UgaWYgKGNvb3JkWzFdIDwgMCB8fCBjb29yZFsxXSA+IChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpKSB7XG4gICAgICB0aHJvdygnZ2V0SW5kZXguLi46IFsxXSBpcyBvdXQgb2YgYm91bmRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gY29vcmRbMV0gKiBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSArIGNvb3JkWzBdO1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldENvb3JkRnJvbUluZGV4ID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IHNpemUgPSBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKTtcbiAgICBjb25zdCB4ID0gaW5kZXggJSBzaXplO1xuICAgIGNvbnN0IHkgPSBNYXRoLmZsb29yKGluZGV4IC8gc2l6ZSk7XG4gICAgXG4gICAgcmV0dXJuIHsgeDogeCwgeTogeSB9XG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc0J5ID0gKGNvb3JkTGlzdCwgbnVtYmVyKSA9PiB7XG5cbiAgfVxuXG4gIGNvbnN0IG51ZGdlQ29vcmRzT24gPSAoY29vcmRMaXN0LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGZpcnN0Q29vcmQgPSBjb29yZExpc3RbMF07XG4gICAgY29uc3QgbGFzdENvb3JkID0gY29vcmRMaXN0W2Nvb3JkTGlzdC5sZW5ndGggLSAxXTtcbiAgICBsZXQgbmV3TGlzdCA9IG51bGw7XG4gICAgLy8gb2ZmIHRoZSByaWdodCBzaWRlXG4gICAgY29uc3QgcmlnaHRTaWRlSGFuZyA9IGxhc3RDb29yZFswXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGNvbnN0IGxlZnRTaWRlSGFuZyAgPSAtMSAqIGZpcnN0Q29vcmRbMF07XG4gICAgY29uc3QgdG9wSGFuZyAgICAgICA9IC0xICogZmlyc3RDb29yZFsxXTtcbiAgICBjb25zdCBib3R0b21IYW5nICAgID0gbGFzdENvb3JkWzFdIC0gKE1hdGguc3FydChib2FyZC5sZW5ndGgpIC0gMSk7XG4gICAgaWYgKHJpZ2h0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gLSByaWdodFNpZGVIYW5nLCBjb29yZFsxXV07XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGxlZnRTaWRlSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSArIGxlZnRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0b3BIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdLCBjb29yZFsxXSArIHRvcEhhbmddO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChib3R0b21IYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdLCBjb29yZFsxXSAtIGJvdHRvbUhhbmddO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3Q7XG4gICAgfVxuICAgIHJldHVybiBuZXdMaXN0O1xuICB9XG5cbiAgY29uc3Qgc3Vua01lc3NhZ2UgPSAoY29vcmQsIGdhbWVib2FyZCwgdGFyZ2V0KSA9PiB7XG4gICAgY29uc29sZS5sb2coIHtjb29yZCwgZ2FtZWJvYXJkLCB0YXJnZXQgfSk7XG4gICAgaWYgKGNvb3JkLnggIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29vcmQgPSBbY29vcmQueCwgY29vcmQueV07XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICBjb25zb2xlLmxvZyhpbmRleCk7XG4gICAgY29uc3Qgc2hpcElkID0gZ2FtZWJvYXJkLmdldEJvYXJkKClbaW5kZXhdLnNoaXBJZDtcbiAgICBjb25zdCBhdHRhY2tlciA9ICh0YXJnZXQgPT09ICdlbmVteSdcbiAgICAgID8gJ1lvdSdcbiAgICAgIDogJ0VuZW15Jyk7XG4gICAgY29uc3Qgc2hpcE5hbWUgPSBnYW1lYm9hcmQuZ2V0U2hpcHMoKVtzaGlwSWRdLmdldE5hbWUoKTtcbiAgICBjb25zdCBzaGlwU2l6ZSA9IGdhbWVib2FyZC5nZXRTaGlwcygpW3NoaXBJZF0uZ2V0TGVuZ3RoKCk7XG4gICAgcmV0dXJuIGF0dGFja2VyICsgJyBzdW5rIHRoZSAnICsgc2hpcE5hbWUgKyAnISAoJyArIHNoaXBTaXplICsgJyknO1xuICB9XG5cbiAgY29uc3QgZ2V0U2hpcElkQXRDb29yZCA9IChjb29yZCwgZ2FtZWJvYXJkKSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBnZXRJbmRleEZyb21Db29yZChjb29yZCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnN0IHNoaXBJZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpW2luZGV4XS5zaGlwSWQ7XG4gICAgcmV0dXJuIHNoaXBJZDtcbiAgfVxuXG4gIGNvbnN0IGdldENvb3Jkc09mU2hpcCA9IChzaGlwSWQsIGdhbWVib2FyZCkgPT4ge1xuICAgIGNvbnN0IGJvYXJkID0gZ2FtZWJvYXJkLmdldEJvYXJkKCk7XG4gICAgbGV0IHNoaXBDb29yZHMgPSBbXTtcbiAgICBib2FyZC5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGNlbGwuc2hpcElkID09PSBzaGlwSWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3B1c2hpbmcgJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNlbGwuY29vcmQpO1xuICAgICAgICBzaGlwQ29vcmRzLnB1c2goY2VsbC5jb29yZCk7XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gc2hpcENvb3JkcztcbiAgfVxuXG4gIGNvbnN0IGlzV2l0aGluQm91bmRhcnkgPSAoY29vcmQsIGJvYXJkKSA9PiB7XG4gICAgaWYgKGNvb3JkWzBdID49IDAgJiYgY29vcmRbMF0gPCBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSkge1xuICAgICAgaWYgKGNvb3JkWzFdID49IDAgJiYgY29vcmRbMV0gPCBNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhcnJheXNNYXRjaCxcbiAgICBjaGVja0lmT3BlbixcbiAgICBnZXRDb29yZHNJZk9wZW4sXG4gICAgZ2V0Q29vcmRzQ2VudGVyZWQsXG4gICAgZ2V0SW5kZXhGcm9tQ29vcmQsXG4gICAgZ2V0Q29vcmRGcm9tSW5kZXgsXG4gICAgbnVkZ2VDb29yZHNCeSxcbiAgICBudWRnZUNvb3Jkc09uLFxuICAgIHN1bmtNZXNzYWdlLFxuICAgIGdldFNoaXBJZEF0Q29vcmQsXG4gICAgZ2V0Q29vcmRzT2ZTaGlwLFxuICAgIGlzV2l0aGluQm91bmRhcnksXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGZhY3RvcnlIZWxwZXI7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9tZXllcnJlc2V0LmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7O0NBR0M7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxTQUFTO0NBQ1QsVUFBVTtDQUNWLFNBQVM7Q0FDVCxlQUFlO0NBQ2YsYUFBYTtDQUNiLHdCQUF3QjtBQUN6QjtBQUNBLGdEQUFnRDtBQUNoRDs7Q0FFQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsZ0JBQWdCO0FBQ2pCO0FBQ0E7Q0FDQyxZQUFZO0FBQ2I7QUFDQTs7Q0FFQyxXQUFXO0NBQ1gsYUFBYTtBQUNkO0FBQ0E7Q0FDQyx5QkFBeUI7Q0FDekIsaUJBQWlCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS1wYWdlLW1hcmdpbjogMXJlbTtcXG4gIC0tZ3JpZC1ib3JkZXItc2l6ZTogMXB4O1xcblxcbiAgLS1saWdodC0xOiB3aGl0ZTtcXG4gIC0tbGlnaHQtMjogI0VFRTtcXG4gIC0tbGlnaHQtMzogcmdiKDEzMSwgMTc0LCAyMzgpO1xcbiAgLS1kYXJrLTE6IGJsYWNrO1xcbiAgLS1kYXJrLTI6IHJnYigyMSwgMjEsIDIyKTtcXG4gIC0tZGFyay0zOiByZ2IoMzIsIDMzLCAzNyk7XFxuICAtLWRhcmstNDogcmdiKDUzLCA1NSwgNjYpO1xcbiAgLS1kYXJrLTU6IHJnYig3MSwgODYsIDEwOSk7XFxuICAtLWFjY2VudC0xOiByZ2IoNzcsIDEzOSwgMjU1KTtcXG4gIC0tYWNjZW50LTI6IHJnYig0NSwgOTYsIDIwNCk7XFxuICAtLWFjY2VudC0zOiByZ2IoMTM0LCAxNTAsIDE4NCk7XFxuICAtLWhvdmVyLXJlZDogcmdiKDE2NywgOTksIDgyKTtcXG4gIC0tcGxheWVyLWhpdDogI2FkNzc2YjtcXG5cXG4gIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oOTB2dywgY2FsYyg0MHJlbSArIDV2dykpO1xcblxcbiAgLyogLS1mb250LWZhY3RvcjogbWF4KGNhbGMoMC44dncgKyAwLjdyZW0pLCAxLjJyZW0pOyAqL1xcbiAgLS1mb250LWZhY3RvcjogY2xhbXAoMS4zcmVtLCBjYWxjKDAuNXZ3ICsgMC43cmVtKSwgMS41cmVtKTtcXG5cXG4gIC0tZm9udC1sZzogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAxLjA1KTtcXG4gIC0tZm9udC1tZDogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjkpO1xcbiAgLS1mb250LXNtOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuNyk7XFxuICAtLWZvbnQteHM6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC42KTtcXG5cXG4gIC8qIC0tZ3JpZC1vZmZzZXQ6IDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgTW9ubycsIG1vbm9zcGFjZTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS44cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1tZCwgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDMge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDQge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMXJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbnAge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMTAwdncgLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCBncmF5KTtcXG4gIG1hcmdpbjogdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIHdpZHRoOiB2YXIoLS1jb250YWluZXItd2lkdGgpO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogY2FsYygxNnZoIC0gNHJlbSk7XFxufVxcbiNib2FyZHMtY29udGFpbmVyIHtcXG5cXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuLmdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1kYXJrLTEsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNDI1KTtcXG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQyNSk7XFxuICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICByaWdodDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4uZW5lbXktZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICNFRUUpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNSk7XFxuICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC41KTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgI0VFRSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uZ3JpZC1sYWJlbCB7XFxuICAvKiBoZWlnaHQ6IDJyZW07ICovXFxufVxcbi5lbmVteS1hcmVhIC5ncmlkLWxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGU6aG92ZXIge1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC0yLCBkYXJrYmx1ZSk7XFxufVxcbi5lbmVteS1hcmVhIHtcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXG59XFxuLnBsYXllci1hcmVhIHtcXG5cXG59XFxuLmdyaWQtY2VsbCB7XFxuICAvKiB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMzsgKi9cXG4gIGJvcmRlcjogY2FsYyh2YXIoLS1ncmlkLWJvcmRlci1zaXplKSAvIDIpIHNvbGlkIHZhcigtLWRhcmstMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTUsIHdoaXRlKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4wOHMsIGJhY2tncm91bmQtY29sb3IgMC4xcztcXG59XFxuLmVuZW15LWdyaWQgLmdyaWQtY2VsbC11bmNsaWNrZWQ6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIGxpZ2h0Z3JheSk7XFxuICAvKiBwb3NpdGlvbjogcmVsYXRpdmU7ICovXFxuICAvKiBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDBweCAwLjVweCBibGFjayxcXG4gICAgICAgICAgICAgIDBweCAwLjJyZW0gMC4zcmVtIDAgcmdiYSgwLDAsMCwwLjMpOyAqL1xcbiAgYm94LXNoYWRvdzogMHB4IDAuMnJlbSAwLjZyZW0gMCByZ2JhKDAsMCwwLDAuMik7XFxuICAvKiB0cmFuc2Zvcm06IHNjYWxlKDEuMjUsIDEuMjUpOyAqL1xcbiAgei1pbmRleDogMjtcXG59XFxuLnBsYWNlLWhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCByZ2IoOTgsIDE1MSwgMjMwKSk7XFxufVxcbi5wbGFjZS1ob3Zlci1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjcmltc29uO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCBnb2xkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCBnb2xkKTtcXG59XFxuLnNoaXAtc3RhbmRpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTEsIGJsdWUpO1xcbn1cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTMsIGxpZ2h0Z3JlZW4pO1xcbn1cXG4uaGl0LWZsaXAge1xcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuQGtleWZyYW1lcyBoaXRmbGlwIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xcbiAgfVxcbn1cXG4uZW5lbXktaGl0IHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcbiAgXFxufVxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMiwgIzExMSk7XFxuICAvKiBvcGFjaXR5OiAwOyAqL1xcbn1cXG4uZW5lbXktbWlzcyB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllci1oaXQsIGJyb3duKTtcXG59XFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDFyZW0gMC40cmVtIDAuNnJlbSAwLjRyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTUsIHJnYig3MSwgODYsIDEwOSkpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNCk7XFxufVxcbi5pbmZvLXRpdGxlIHtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbGcsIDEuNHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwO1xcbn1cXG4uaW5mby1zdGF0ZS1jb250YWluZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG4uaW5mby1zdGF0ZSB7XFxuICBoZWlnaHQ6IDEuNHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24sIC5yb3RhdGUtYnV0dG9uIGRpdiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGhlaWdodDogMS40cmVtO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjFyZW0gMC42cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNCwgIzIyMik7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMiwgYmx1ZSk7XFxufVxcbi5yb3RhdGUtYnV0dG9uLXRleHQge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjRyZW07XFxufVxcbi5yb3RhdGUtYnV0dG9uLWljb24ge1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMiwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgcGFkZGluZzogMC4wNXJlbSAwLjNyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLmluZm8tZGV0YWlscyB7XFxuICBoZWlnaHQ6IDE1cmVtO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBtYXJnaW4tYm90dG9tOiAwLjdyZW07XFxufVxcbi5pbmZvLXJlbWFpbmluZyB7XFxuICBoZWlnaHQ6IDdyZW07XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuNHJlbSAwLjNyZW07XFxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcbi5pbmZvLXJlbWFpbmluZy10aXRsZSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4uaW5mby1yZW1haW5pbmctbGlzdCB7XFxuXFxufVxcbi5yZW1haW5pbmctc2hpcCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0yLCB3aGl0ZSk7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMC4ycmVtO1xcbiAgbWFyZ2luOiAwIDAuM3JlbSAwLjJyZW0gMDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLmluZm8tZGV0YWlscy1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC40NXJlbSAwLjNyZW07XFxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLWNvbnRhaW5lci13aWR0aDogbWluKDgwdncsIDIwcmVtKTtcXG4gIH1cXG4gICNwYWdlLWNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogYXV0bztcXG4gIH1cXG4gICNnYW1lLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nLXRvcDogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gICAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDEpO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSk7XFxuICB9XFxuICAuZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gICAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuOSk7XFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjkpO1xcbiAgfVxcbiAgLmluZm8tY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDEgLSAxcmVtKTtcXG4gICAgbWFyZ2luLXRvcDogMC44cmVtO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLHVCQUF1Qjs7RUFFdkIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZiw2QkFBNkI7RUFDN0IsZUFBZTtFQUNmLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIseUJBQXlCO0VBQ3pCLDBCQUEwQjtFQUMxQiw2QkFBNkI7RUFDN0IsNEJBQTRCO0VBQzVCLDhCQUE4QjtFQUM5Qiw2QkFBNkI7RUFDN0IscUJBQXFCOztFQUVyQiwrQ0FBK0M7O0VBRS9DLHNEQUFz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dCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuXFxuICAtLWxpZ2h0LTE6IHdoaXRlO1xcbiAgLS1saWdodC0yOiAjRUVFO1xcbiAgLS1saWdodC0zOiByZ2IoMTMxLCAxNzQsIDIzOCk7XFxuICAtLWRhcmstMTogYmxhY2s7XFxuICAtLWRhcmstMjogcmdiKDIxLCAyMSwgMjIpO1xcbiAgLS1kYXJrLTM6IHJnYigzMiwgMzMsIDM3KTtcXG4gIC0tZGFyay00OiByZ2IoNTMsIDU1LCA2Nik7XFxuICAtLWRhcmstNTogcmdiKDcxLCA4NiwgMTA5KTtcXG4gIC0tYWNjZW50LTE6IHJnYig3NywgMTM5LCAyNTUpO1xcbiAgLS1hY2NlbnQtMjogcmdiKDQ1LCA5NiwgMjA0KTtcXG4gIC0tYWNjZW50LTM6IHJnYigxMzQsIDE1MCwgMTg0KTtcXG4gIC0taG92ZXItcmVkOiByZ2IoMTY3LCA5OSwgODIpO1xcbiAgLS1wbGF5ZXItaGl0OiAjYWQ3NzZiO1xcblxcbiAgLS1jb250YWluZXItd2lkdGg6IG1pbig5MHZ3LCBjYWxjKDQwcmVtICsgNXZ3KSk7XFxuXFxuICAvKiAtLWZvbnQtZmFjdG9yOiBtYXgoY2FsYygwLjh2dyArIDAuN3JlbSksIDEuMnJlbSk7ICovXFxuICAtLWZvbnQtZmFjdG9yOiBjbGFtcCgxLjNyZW0sIGNhbGMoMC41dncgKyAwLjdyZW0pLCAxLjVyZW0pO1xcblxcbiAgLS1mb250LWxnOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDEuMDUpO1xcbiAgLS1mb250LW1kOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuOSk7XFxuICAtLWZvbnQtc206IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC43KTtcXG4gIC0tZm9udC14czogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjYpO1xcblxcbiAgLyogLS1ncmlkLW9mZnNldDogMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICBmb250LWZhbWlseTogJ05vdG8gU2FucyBNb25vJywgbW9ub3NwYWNlO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogODAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LWxnLCAxLjhyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMiB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LW1kLCAxLjRyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oNCB7XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAxcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxucCB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxufVxcbiNnYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgd2lkdGg6IHZhcigtLWNvbnRhaW5lci13aWR0aCk7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmctdG9wOiBjYWxjKDE2dmggLSA0cmVtKTtcXG59XFxuI2JvYXJkcy1jb250YWluZXIge1xcblxcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplLCAxcHgpIHNvbGlkIHZhcigtLWRhcmstMSwgYmxhY2spO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40MjUpO1xcbiAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNDI1KTtcXG4gIG1hcmdpbi1ib3R0b206IDAuOHJlbTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5lbmVteS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgI0VFRSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4ucGxheWVyLWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC41KTtcXG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4ucGxheWVyLWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjRUVFKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5ncmlkLWxhYmVsIHtcXG4gIC8qIGhlaWdodDogMnJlbTsgKi9cXG59XFxuLmVuZW15LWFyZWEgLmdyaWQtbGFiZWwge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4uZW5lbXktZGVsYXktdG9nZ2xlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC0xLCBibHVlKTtcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZTpob3ZlciB7XFxuICBjb2xvcjogdmFyKC0tYWNjZW50LTIsIGRhcmtibHVlKTtcXG59XFxuLmVuZW15LWFyZWEge1xcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcbn1cXG4ucGxheWVyLWFyZWEge1xcblxcbn1cXG4uZ3JpZC1jZWxsIHtcXG4gIC8qIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zOyAqL1xcbiAgYm9yZGVyOiBjYWxjKHZhcigtLWdyaWQtYm9yZGVyLXNpemUpIC8gMikgc29saWQgdmFyKC0tZGFyay0yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNSwgd2hpdGUpO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQgLmdyaWQtY2VsbC11bmNsaWNrZWQge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjA4cywgYmFja2dyb3VuZC1jb2xvciAwLjFzO1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZDpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgbGlnaHRncmF5KTtcXG4gIC8qIHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cXG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDAuNXB4IGJsYWNrLFxcbiAgICAgICAgICAgICAgMHB4IDAuMnJlbSAwLjNyZW0gMCByZ2JhKDAsMCwwLDAuMyk7ICovXFxuICBib3gtc2hhZG93OiAwcHggMC4ycmVtIDAuNnJlbSAwIHJnYmEoMCwwLDAsMC4yKTtcXG4gIC8qIHRyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSk7ICovXFxuICB6LWluZGV4OiAyO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIHJnYig5OCwgMTUxLCAyMzApKTtcXG59XFxuLnBsYWNlLWhvdmVyLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIGRvZGdlckJsdWUpO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGNyaW1zb247XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Itc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIGdvbGQpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIGdvbGQpO1xcbn1cXG4uc2hpcC1zdGFuZGluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMywgbGlnaHRncmVlbik7XFxufVxcbi5oaXQtZmxpcCB7XFxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbn1cXG5Aa2V5ZnJhbWVzIGhpdGZsaXAge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XFxuICB9XFxufVxcbi5lbmVteS1oaXQge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuICBcXG59XFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0yLCAjMTExKTtcXG4gIC8qIG9wYWNpdHk6IDA7ICovXFxufVxcbi5lbmVteS1taXNzIHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGxheWVyLWhpdCwgYnJvd24pO1xcbn1cXG4uaW5mby1jb250YWluZXIge1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgcGFkZGluZzogMXJlbSAwLjRyZW0gMC42cmVtIDAuNHJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNSwgcmdiKDcxLCA4NiwgMTA5KSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40KTtcXG59XFxuLmluZm8tdGl0bGUge1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDA7XFxufVxcbi5pbmZvLXN0YXRlLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcbi5pbmZvLXN0YXRlIHtcXG4gIGhlaWdodDogMS40cmVtO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiwgLnJvdGF0ZS1idXR0b24gZGl2IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgaGVpZ2h0OiAxLjRyZW07XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuMXJlbSAwLjZyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnJvdGF0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay00LCAjMjIyKTtcXG59XFxuLnJvdGF0ZS1idXR0b246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0yLCBibHVlKTtcXG59XFxuLnJvdGF0ZS1idXR0b24tdGV4dCB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24taWNvbiB7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0yLCB3aGl0ZSk7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBwYWRkaW5nOiAwLjA1cmVtIDAuM3JlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzIHtcXG4gIGhlaWdodDogMTVyZW07XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbi1ib3R0b206IDAuN3JlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nIHtcXG4gIGhlaWdodDogN3JlbTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC40cmVtIDAuM3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5pbmZvLXJlbWFpbmluZy1saXN0IHtcXG5cXG59XFxuLnJlbWFpbmluZy1zaGlwIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTIsIHdoaXRlKTtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjJyZW07XFxuICBtYXJnaW46IDAgMC4zcmVtIDAuMnJlbSAwO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjQ1cmVtIDAuM3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oODB2dywgMjByZW0pO1xcbiAgfVxcbiAgI3BhZ2UtY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgI2dhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBhZGRpbmctdG9wOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSk7XFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxKTtcXG4gIH1cXG4gIC5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC45KTtcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuOSk7XFxuICB9XFxuICAuaW5mby1jb250YWluZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSAtIDFyZW0pO1xcbiAgICBtYXJnaW4tdG9wOiAwLjhyZW07XFxuICB9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGNvbnRlbnQsIFwifVwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5LCBkZWR1cGUpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG4gICAgICAgIHZhciBpZCA9IHRoaXNbaV1bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbW9kdWxlcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2ldKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhUXVlcnk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsyXSA9IFwiXCIuY29uY2F0KG1lZGlhUXVlcnksIFwiIGFuZCBcIikuY29uY2F0KGl0ZW1bMl0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfc2xpY2VkVG9BcnJheShhcnIsIGkpIHsgcmV0dXJuIF9hcnJheVdpdGhIb2xlcyhhcnIpIHx8IF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHx8IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShhcnIsIGkpIHx8IF9ub25JdGVyYWJsZVJlc3QoKTsgfVxuXG5mdW5jdGlvbiBfbm9uSXRlcmFibGVSZXN0KCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpOyB9XG5cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHsgaWYgKCFvKSByZXR1cm47IGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTsgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTsgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7IGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgfVxuXG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikgeyBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH1cblxuZnVuY3Rpb24gX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgeyB2YXIgX2kgPSBhcnIgJiYgKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXSk7IGlmIChfaSA9PSBudWxsKSByZXR1cm47IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX3MsIF9lOyB0cnkgeyBmb3IgKF9pID0gX2kuY2FsbChhcnIpOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSAhPSBudWxsKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH1cblxuZnVuY3Rpb24gX2FycmF5V2l0aEhvbGVzKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSByZXR1cm4gYXJyOyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKSB7XG4gIHZhciBfaXRlbSA9IF9zbGljZWRUb0FycmF5KGl0ZW0sIDQpLFxuICAgICAgY29udGVudCA9IF9pdGVtWzFdLFxuICAgICAgY3NzTWFwcGluZyA9IF9pdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL21leWVycmVzZXQuY3NzJztcbmltcG9ydCAnLi9zdHlsZS5jc3MnO1xuaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cbmRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuZ2FtZS5zdGFydCgpOyJdLCJuYW1lcyI6WyJnYW1lIiwiYW5pbWF0ZSIsImZsaXBDZWxscyIsImFuaW1hdGlvblJlZnJlc2giLCJhbmltYXRpb25MZW5ndGgiLCJmbGlwcGluZyIsImFkZFRvRmxpcENlbGxzIiwiZWxlbWVudCIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJmbGlwQWxsIiwiZ2V0U3RhdGUiLCJpZCIsImZvckVhY2giLCJjZWxsIiwic3R5bGUiLCJhbmltYXRpb24iLCJvZmZzZXRXaWR0aCIsInNldFRpbWVvdXQiLCJmYWN0b3J5SGVscGVyIiwiZ2FtZWJvYXJkRmFjdG9yeSIsInBsYXllckZhY3RvcnkiLCJzaGlwRmFjdG9yeSIsImRpc3BsYXkiLCJncmlkIiwic2hhcmVkQ29vcmRMaXN0IiwiYWxsSG92ZXJDbGFzc2VzIiwiaW5pdGlhbGl6ZSIsImVuZW15QXJlYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImVuZW15R3JpZFdyYXBwZXIiLCJlbmVteUdyaWRMYWJlbCIsImlubmVyVGV4dCIsImVuZW15RGVsYXlUb2dnbGUiLCJ0b2dnbGVEZWxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiZW5lbXlHcmlkIiwicGxheWVyQXJlYSIsInBsYXllckdyaWRXcmFwcGVyIiwicGxheWVyR3JpZExhYmVsIiwicGxheWVyR3JpZCIsImJvYXJkc0NvbnRhaW5lciIsImluZm9Db250YWluZXIiLCJnYW1lQ29udGFpbmVyIiwiaW5mb1RpdGxlIiwiaW5mb1N0YXRlQ29udGFpbmVyIiwiaW5mb1N0YXRlIiwibmFtZSIsImluZm9EZXRhaWxzIiwiaW5mb1JlbWFpbmluZyIsImluZm9SZW1haW5pbmdUaXRsZSIsImFwcGVuZENoaWxkIiwicGFnZUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiY2hpbGROb2RlcyIsImNoaWxkIiwicmVtb3ZlIiwia2V5IiwidG9nZ2xlRGlyZWN0aW9uIiwiaG9yVmVyIiwiZ2V0RGlyZWN0aW9uIiwibG9nTWVzc2FnZSIsImNsZWFyQ2xhc3MiLCJkaXNwbGF5SG92ZXIiLCJkcmF3R3JpZCIsInBsYXllciIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiZGF0YXNldCIsImNlbGxJZCIsImN1cnJlbnRTaGlwIiwiZ2V0U2hpcEZvclBsYWNlbWVudCIsImNvbnRhaW5zIiwicGxhY2VTaGlwIiwibGVuZ3RoIiwic2l6ZSIsImNvb3JkIiwiZGlyIiwiZ2V0Qm9hcmQiLCJhZHZhbmNlU2hpcFBsYWNlbWVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRDb29yZCIsImlzSGl0IiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5Iiwic3Vua01lc3NhZ2UiLCJsb2dSZW1haW5pbmciLCJnZXRTaGlwcyIsImFkdmFuY2VTdGF0ZSIsIk1hdGgiLCJzcXJ0IiwidW5kZWZpbmVkIiwiaG92ZXJOb2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtIiwiZ2V0UGxheWVycyIsImNlbGxDb29yZCIsImNvb3JkTGlzdCIsImdldENvb3Jkc0NlbnRlcmVkIiwibnVkZ2VDb29yZHNPbiIsImhvdmVyQ2xhc3NlcyIsImNoZWNrSWZPcGVuIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaG92ZXJDb29yZCIsImNlbGxJbmRleCIsImdldEluZGV4RnJvbUNvb3JkIiwiZGlzcGxheUNvb3JkIiwiaW5kZXgiLCJib2FyZCIsImNvb3JkT2JqIiwiZ2V0Q29vcmRGcm9tSW5kZXgiLCJjb29yZFRleHQiLCJwYXJlbnQiLCJjbGFzc05hbWUiLCJtc2ciLCJjdXJyZW50TWVzc2FnZSIsImZpcnN0Q2hpbGQiLCJtZXNzYWdlIiwiaW5zZXJ0QmVmb3JlIiwic2hpcHMiLCJwcmV2SW5mb1JlbWFpbmluZyIsInJlbW92ZUNoaWxkIiwiaW5mb1JlbWFpbmluZ0xpc3QiLCJzaGlwIiwiaXNTdW5rIiwicmVtYWluaW5nU2hpcCIsImdldExlbmd0aCIsInN0YXRlTWVzc2FnZSIsImRpc3BsYXlSb3RhdGVCdXR0b24iLCJyb3RhdGVCdXR0b24iLCJyb3RhdGVCdXR0b25UZXh0Iiwicm90YXRlQnV0dG9uSWNvbiIsInJlbW92ZVJvdGF0ZUJ1dHRvbiIsIm1ha2VDZWxsc1VuY2xpY2tlZCIsInJlbW92ZUNlbGxzVW5jbGlja2VkIiwibXlOYW1lIiwiYm9hcmRTaXplIiwiYXR0YWNrZWRTcGFjZXMiLCJhdHRhY2siLCJlbmVteVBsYXllciIsImFscmVhZHlBdHRhY2tlZCIsImFycmF5c01hdGNoIiwicHJvcHMiLCJoaXRzIiwiaW5pdGlhbEhpdHMiLCJoaXQiLCJpbmNsdWRlcyIsImoiLCJzaGlwSWQiLCJhbGxTaGlwc1N1bmsiLCJzdW5rIiwic2hpcFByb3BzIiwibG9jYXRpb25Qcm9wcyIsInBsYWNlZFNoaXBJZCIsInBsYWNlZENvb3JkcyIsImdldENvb3Jkc0lmT3BlbiIsIm1hcCIsIm5ld0NlbGwiLCJnZXRVbnN1bmtTaGlwcyIsInVuc3Vua1NoaXBzIiwibG9naWMiLCJlbmVteURlbGF5TWF4SW5pdGlhbCIsImVuZW15RGVsYXlNYXgiLCJzdGF0ZXMiLCJwb3NzaWJsZUVuZW15QXR0YWNrcyIsInN0YXRlIiwic2hpcExpc3QiLCJkaXJlY3Rpb24iLCJwbGF5ZXIxIiwiZW5lbXkxIiwic3RhcnQiLCJwbGFjZVJhbmRvbVNoaXBzIiwiZGVsYXlUaW1lIiwicmFuZG9tIiwiZW5lbXlSYW5kb21BdHRhY2siLCJlbmVteSIsInN1Y2Nlc3MiLCJmbG9vciIsImNvb3JkWCIsImNvb3JkWSIsImF0dGFja0Nvb3JkIiwiZ2V0TW92ZSIsImRpZEhpdCIsImF0dGFja0NlbGxJbmRleCIsInByb2Nlc3NIaXQiLCJwcm9jZXNzTWlzcyIsInByb2Nlc3NTdW5rIiwiZW5lbXlMb2dpYyIsInBsYXllckdhbWVib2FyZCIsImFjdGl2ZUhpdHMiLCJhY3RpdmVTaGlwcyIsInVwZGF0ZUFjdGl2ZVNoaXAiLCJuZXdTaGlwIiwiY29vcmRzIiwiZEF4aXMiLCJnZXROZXh0TW92ZXMiLCJnZXRBZGphY2VudERhdGEiLCJlbXB0eSIsInNwbGljZSIsInN1bmtTaGlwQ29vcmRzIiwiZ2V0Q29vcmRzT2ZTaGlwIiwiZ2V0U2hpcElkQXRDb29yZCIsInNwbGljZVNoaXAiLCJhQ29vcmQiLCJuZXh0TW92ZXMiLCJyYW5kb21OZXh0Iiwic3BsaWNlQ29vcmRGcm9tUEVBIiwiYWRqYWNlbnRFbXB0eSIsInJhbmRvbUFkamFjZW50IiwicmFuZG9tQXR0YWNrIiwiZmxpcERBeGlzIiwic2hpcEZyb21Cb2FyZCIsIm1pbiIsIm1heCIsImRpck1vZCIsIm1pbk5leHQiLCJtaW5OZXh0Q2VsbCIsIm1heE5leHQiLCJtYXhOZXh0Q2VsbCIsImlzV2l0aGluQm91bmRhcnkiLCJ0aGlzU2hpcCIsInNlYXJjaEFycmF5cyIsImFkakhpdHMiLCJhZGpFbXB0eSIsImFkak1pc3NlcyIsInNlYXJjaENvb3JkIiwibWlzc2VzIiwiY29vcmQxIiwiY29vcmQyIiwiSlNPTiIsInN0cmluZ2lmeSIsImlzT3BlbiIsImJvYXJkQ2VsbCIsInNlYXJjaFgiLCJzZWFyY2hZIiwibWF0Y2hpbmdDZWxsIiwiZmluZCIsInN0YXJ0aW5nQ29vcmQiLCJjb29yZEFycmF5IiwibnVkZ2VDb29yZHNCeSIsIm51bWJlciIsImZpcnN0Q29vcmQiLCJsYXN0Q29vcmQiLCJuZXdMaXN0IiwicmlnaHRTaWRlSGFuZyIsImxlZnRTaWRlSGFuZyIsInRvcEhhbmciLCJib3R0b21IYW5nIiwiYXR0YWNrZXIiLCJzaGlwTmFtZSIsInNoaXBTaXplIiwic2hpcENvb3JkcyJdLCJzb3VyY2VSb290IjoiIn0=