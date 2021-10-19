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
    infoRemaining.appendChild(infoRemainingTitle);
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

            cell.classList.remove('grid-cell-unclicked');

            if (isHit > 0) {
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --info-area-background: white;\n  --grid-color: white;\n  --game-box: #EEE;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  --ui-text-dark: rgb(14, 35, 129);\n  --ui-text-med: rgb(56, 81, 163);\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  /* font-size: calc(2.8vh + 0.3rem); */\n  font-size: 1.8rem;\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  /* font-size: calc(2.3vh + 0.3rem); */\n  font-size: 1.4rem;\n  margin-block-end: 0.3rem;\n}\nh3 {\n  /* font-size: calc(1.8vh + 0.3rem); */\n  font-size: 1.1rem;\n  margin-block-end: 0.3rem;\n}\nh4 {\n  /* font-size: calc(1.4vh + 0.3rem); */\n  font-size: 1rem;\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 40rem;\n  margin: 0 auto;\n  padding-top: 5rem;\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 17rem;\n  padding-bottom: 17rem;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 20rem;\n  padding-bottom: 20rem;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: 0.9rem;\n  font-weight: 700;\n  margin-left: 0.8rem;\n  cursor: pointer;\n  color: var(--ui-text-dark, darkblue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--ui-text-med, blue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--grid-border-color);\n  background-color: var(--grid-color, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.06s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  /* background-color: var(--game-background-color, lightgray); */\n  position: relative;\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3);\n  transform: scale(1.25, 1.25);\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}\n.hit {\n  background-color: purple;\n}\n.enemy-hit {\n\n}\n.player-hit {\n\n}\n.miss {\n  background-color: black;\n}\n.enemy-miss {\n\n}\n.player-hit {\n\n}\n.info-container {\n  padding: 0.5rem;\n  background-color: white;\n  width: 16rem;\n}\n.info-title {\n  font-size: 1.6rem;\n  margin-block-end: 0;\n}\n.info-state-container {\n  height: 2rem;\n}\n.info-state {\n  display: inline-block;\n  margin: 0.3rem 0 0.7rem 0;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  margin-left: 0.5rem;\n  background-color: var(--game-box, #EEE);\n  padding: 0.1rem 0.4rem;\n  border-radius: 0.3rem;\n  position: absolute;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--game-background-color, lightgray);\n}\n.rotate-button:active {\n  background-color: var(--info-area-background, white);\n}\n.rotate-button-text {\n  font-size: 0.9em;\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  background-color: var(--info-area-background, white);\n  font-size: 1.1rem;\n  padding: 0.05rem 0.5rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.3rem;\n}\n.info-remaining {\n  height: 6rem;\n  font-size: 0.9rem;\n  background-color: var(--game-box, #EEE);\n  padding: 0.3rem 0.2rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: 1rem;\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: 0.9rem;\n  background-color: var(--info-area-background, white);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n}\n.info-details-message {\n  font-size: 0.9rem;\n  background-color: var(--game-box, #EEE);\n  padding: 0.3rem 0.2rem;\n  margin-bottom: 0.1rem;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,6BAA6B;EAC7B,mBAAmB;EACnB,gBAAgB;EAChB,kCAAkC;EAClC,sCAAsC;EACtC,wBAAwB;EACxB,wBAAwB;EACxB,+BAA+B;EAC/B,kBAAkB;EAClB,kCAAkC;EAClC,yBAAyB;EACzB,0BAA0B;EAC1B,uBAAuB;EACvB,gCAAgC;EAChC,+BAA+B;EAC/B,yBAAyB;AAC3B;;AAEA;EACE,yCAAyC;AAC3C;AACA;EACE,gBAAgB;EAChB,qCAAqC;EACrC,iBAAiB;EACjB,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,qCAAqC;EACrC,iBAAiB;EACjB,wBAAwB;AAC1B;AACA;EACE,qCAAqC;EACrC,iBAAiB;EACjB,wBAAwB;AAC1B;AACA;EACE,qCAAqC;EACrC,eAAe;EACf,wBAAwB;AAC1B;AACA;EACE,iDAAiD;EACjD,kDAAkD;EAClD,oDAAoD;EACpD,gCAAgC;AAClC;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,uBAAuB;EACvB,YAAY;EACZ,cAAc;EACd,iBAAiB;AACnB;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,0EAA0E;EAC1E,sBAAsB;AACxB;AACA;EACE,YAAY;EACZ,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,YAAY;EACZ,qBAAqB;EACrB,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,iDAAiD;AACnD;AACA;EACE,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,oCAAoC;AACtC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,kBAAkB;AACpB;AACA;;AAEA;AACA;EACE,sCAAsC;EACtC,wEAAwE;EACxE,0CAA0C;EAC1C,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,kDAAkD;AACpD;AACA;EACE,eAAe;EACf,+DAA+D;EAC/D,kBAAkB;EAClB;oDACkD;EAClD,+CAA+C;EAC/C,4BAA4B;EAC5B,UAAU;AACZ;AACA;EACE,4DAA4D;AAC9D;AACA;EACE,eAAe;EACf,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,eAAe;EACf,uCAAuC;AACzC;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,eAAe;EACf,yCAAyC;AAC3C;AACA;EACE,gDAAgD;AAClD;AACA;EACE,wBAAwB;AAC1B;AACA;;AAEA;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;;AAEA;AACA;;AAEA;AACA;EACE,eAAe;EACf,uBAAuB;EACvB,YAAY;AACd;AACA;EACE,iBAAiB;EACjB,mBAAmB;AACrB;AACA;EACE,YAAY;AACd;AACA;EACE,qBAAqB;EACrB,yBAAyB;AAC3B;AACA;EACE,qBAAqB;AACvB;AACA;EACE,mBAAmB;EACnB,uCAAuC;EACvC,sBAAsB;EACtB,qBAAqB;EACrB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,oDAAoD;AACtD;AACA;EACE,gBAAgB;EAChB,oBAAoB;AACtB;AACA;EACE,oDAAoD;EACpD,iBAAiB;EACjB,uBAAuB;EACvB,uBAAuB;EACvB,qBAAqB;AACvB;AACA;EACE,aAAa;EACb,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,iBAAiB;EACjB,uCAAuC;EACvC,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,eAAe;EACf,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,qBAAqB;EACrB,iBAAiB;EACjB,oDAAoD;EACpD,sBAAsB;EACtB,yBAAyB;AAC3B;AACA;EACE,iBAAiB;EACjB,uCAAuC;EACvC,sBAAsB;EACtB,qBAAqB;AACvB","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --info-area-background: white;\n  --grid-color: white;\n  --game-box: #EEE;\n  --game-background-color: lightgray;\n  --hover-light-blue: rgb(131, 174, 238);\n  --hover-blue: dodgerBlue;\n  --hover-crimson: crimson;\n  --hover-red: rgb(255, 112, 112);\n  --hover-gold: gold;\n  --hover-yellow: rgb(255, 255, 145);\n  --ship-green: forestGreen;\n  --grid-border-color: black;\n  --grid-border-size: 1px;\n  --ui-text-dark: rgb(14, 35, 129);\n  --ui-text-med: rgb(56, 81, 163);\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: Helvetica, Arial, sans-serif;\n}\nh1 {\n  font-weight: 700;\n  /* font-size: calc(2.8vh + 0.3rem); */\n  font-size: 1.8rem;\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 700;\n  /* font-size: calc(2.3vh + 0.3rem); */\n  font-size: 1.4rem;\n  margin-block-end: 0.3rem;\n}\nh3 {\n  /* font-size: calc(1.8vh + 0.3rem); */\n  font-size: 1.1rem;\n  margin-block-end: 0.3rem;\n}\nh4 {\n  /* font-size: calc(1.4vh + 0.3rem); */\n  font-size: 1rem;\n  margin-block-end: 0.3rem;\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--game-background-color, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 40rem;\n  margin: 0 auto;\n  padding-top: 5rem;\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--grid-border-color, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: 17rem;\n  padding-bottom: 17rem;\n  margin-bottom: 1.5vh;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--grid-border-color, black);\n}\n.player-grid-wrapper {\n  width: 20rem;\n  padding-bottom: 20rem;\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--grid-border-color, black);\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: 0.9rem;\n  font-weight: 700;\n  margin-left: 0.8rem;\n  cursor: pointer;\n  color: var(--ui-text-dark, darkblue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--ui-text-med, blue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--grid-border-color);\n  background-color: var(--grid-color, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.06s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  /* background-color: var(--game-background-color, lightgray); */\n  position: relative;\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3);\n  transform: scale(1.25, 1.25);\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--hover-light-blue, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--hover-blue, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: var(--hover-crimson, crimson);\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, red);\n}\n.place-hover-occupied {\n  background-color: var(--hover-yellow, yellow);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-gold, gold);\n}\n.ship-standing {\n  background-color: var(--ship-green, forestGreen);\n}\n.hit {\n  background-color: purple;\n}\n.enemy-hit {\n\n}\n.player-hit {\n\n}\n.miss {\n  background-color: black;\n}\n.enemy-miss {\n\n}\n.player-hit {\n\n}\n.info-container {\n  padding: 0.5rem;\n  background-color: white;\n  width: 16rem;\n}\n.info-title {\n  font-size: 1.6rem;\n  margin-block-end: 0;\n}\n.info-state-container {\n  height: 2rem;\n}\n.info-state {\n  display: inline-block;\n  margin: 0.3rem 0 0.7rem 0;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  margin-left: 0.5rem;\n  background-color: var(--game-box, #EEE);\n  padding: 0.1rem 0.4rem;\n  border-radius: 0.3rem;\n  position: absolute;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--game-background-color, lightgray);\n}\n.rotate-button:active {\n  background-color: var(--info-area-background, white);\n}\n.rotate-button-text {\n  font-size: 0.9em;\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  background-color: var(--info-area-background, white);\n  font-size: 1.1rem;\n  padding: 0.05rem 0.5rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.3rem;\n}\n.info-remaining {\n  height: 6rem;\n  font-size: 0.9rem;\n  background-color: var(--game-box, #EEE);\n  padding: 0.3rem 0.2rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: 1rem;\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: 0.9rem;\n  background-color: var(--info-area-background, white);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n}\n.info-details-message {\n  font-size: 0.9rem;\n  background-color: var(--game-box, #EEE);\n  padding: 0.3rem 0.2rem;\n  margin-bottom: 0.1rem;\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sT0FBTyxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLE1BQU0sS0FBSyxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLE1BQU0sS0FBSyxLQUFLLFVBQVUsWUFBWSxXQUFXLEtBQUssS0FBSyxZQUFZLGFBQWEsTUFBTSxL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QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBRUFLLDhEQUFBO0FBQ0FELHNEQUFBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2ZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9tZXllcnJlc2V0LmNzcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvbWV5ZXJyZXNldC5jc3M/OTI0ZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMnO1xuaW1wb3J0IHsgZ2FtZWJvYXJkRmFjdG9yeSwgcGxheWVyRmFjdG9yeSwgc2hpcEZhY3RvcnkgfSBmcm9tICcuLi9zcmMvZmFjdG9yaWVzLmpzJztcbmltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cblxuY29uc3QgZGlzcGxheSA9ICgoKSA9PiB7XG4gIGxldCBncmlkID0gbnVsbDtcbiAgbGV0IHNoYXJlZENvb3JkTGlzdCA9IG51bGw7XG5cbiAgY29uc3QgYWxsSG92ZXJDbGFzc2VzID0gW1xuICAgICdwbGFjZS1ob3ZlcicsXG4gICAgJ3BsYWNlLWhvdmVyLXNvbG8nLFxuICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZCcsXG4gICAgJ3BsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8nLFxuICAgICdwbGFjZS1ob3Zlci1vb2InLFxuICAgICdwbGFjZS1ob3Zlci1vb2Itc29sbydcbiAgXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICBjb25zdCBlbmVteUFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUFyZWEuY2xhc3NMaXN0LmFkZCgnZW5lbXktYXJlYScpO1xuICAgIGNvbnN0IGVuZW15R3JpZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdlbmVteS1ncmlkLXdyYXBwZXInKTtcbiAgICBjb25zdCBlbmVteUdyaWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgZW5lbXlHcmlkTGFiZWwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1sYWJlbCcpO1xuICAgIGVuZW15R3JpZExhYmVsLmlubmVyVGV4dCA9ICdFbmVteSc7XG4gICAgY29uc3QgZW5lbXlEZWxheVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgZW5lbXlEZWxheVRvZ2dsZS5jbGFzc0xpc3QuYWRkKCdlbmVteS1kZWxheS10b2dnbGUnKTtcblxuICAgIGVuZW15RGVsYXlUb2dnbGUuaW5uZXJUZXh0ID0gZ2FtZS50b2dnbGVEZWxheSgpO1xuICAgIGVuZW15RGVsYXlUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS50YXJnZXQuaW5uZXJUZXh0ID0gZ2FtZS50b2dnbGVEZWxheSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZW5lbXlHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW5lbXlHcmlkLmNsYXNzTGlzdC5hZGQoJ2dyaWQnLCAnZW5lbXktZ3JpZCcpO1xuXG4gICAgY29uc3QgcGxheWVyQXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckFyZWEuY2xhc3NMaXN0LmFkZCgncGxheWVyLWFyZWEnKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsYXllckdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdwbGF5ZXItZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICBwbGF5ZXJHcmlkTGFiZWwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1sYWJlbCcpO1xuICAgIHBsYXllckdyaWRMYWJlbC5pbm5lclRleHQgPSAnUGxheWVyJztcbiAgICBjb25zdCBwbGF5ZXJHcmlkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBwbGF5ZXJHcmlkLmNsYXNzTGlzdC5hZGQoJ2dyaWQnLCAncGxheWVyLWdyaWQnKTtcblxuICAgIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGJvYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdib2FyZHMtY29udGFpbmVyJyk7XG4gICAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnaW5mby1jb250YWluZXInKTtcbiAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZ2FtZUNvbnRhaW5lci5pZCA9ICdnYW1lLWNvbnRhaW5lcic7XG5cbiAgICBjb25zdCBpbmZvVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGluZm9UaXRsZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXRpdGxlJyk7XG4gICAgaW5mb1RpdGxlLmlubmVyVGV4dCA9ICdCYXR0bGVzaGlwcyc7XG4gICAgY29uc3QgaW5mb1N0YXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1N0YXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luZm8tc3RhdGUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgaW5mb1N0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGluZm9TdGF0ZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXN0YXRlJyk7XG4gICAgaW5mb1N0YXRlLmlubmVyVGV4dCA9IGdhbWUuZ2V0U3RhdGUoKS5uYW1lO1xuICAgIGNvbnN0IGluZm9EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb0RldGFpbHMuY2xhc3NMaXN0LmFkZCgnaW5mby1kZXRhaWxzJyk7XG4gICAgY29uc3QgaW5mb1JlbWFpbmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9SZW1haW5pbmcuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmcnKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nLXRpdGxlJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmlubmVyVGV4dCA9ICdSZW1haW5pbmcgRW5lbXkgU2hpcHMnO1xuICAgIGluZm9SZW1haW5pbmcuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZ1RpdGxlKTtcblxuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1RpdGxlKTtcbiAgICBpbmZvU3RhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1N0YXRlKTtcbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9TdGF0ZUNvbnRhaW5lcik7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvRGV0YWlscyk7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nKTtcblxuICAgIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRzQ29udGFpbmVyKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9Db250YWluZXIpO1xuXG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15QXJlYSk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15R3JpZExhYmVsKTtcbiAgICBlbmVteUFyZWEuYXBwZW5kQ2hpbGQoZW5lbXlEZWxheVRvZ2dsZSk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15R3JpZFdyYXBwZXIpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcblxuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJBcmVhKTtcbiAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKHBsYXllckdyaWRMYWJlbCk7XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkV3JhcHBlcik7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZCk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKHBhZ2VDb250YWluZXIuaGFzQ2hpbGROb2Rlcykge1xuICAgICAgcGFnZUNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXInKS5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnLicpIHtcbiAgICAgICAgZ2FtZS50b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgY2xlYXJDbGFzcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKSwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgZGlzcGxheUhvdmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZHJhd0dyaWQgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBsYXllci5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdlbmVteScpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IG93bmVyIGFzIFwiZW5lbXlcIiBvciBcInBsYXllclwiJyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIGNlbGxzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRCb2FyZCgpLmxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsSWQgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBsYXllciA9IG5hbWU7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgc2hpcCBjYW4gYmUgcGxhY2VkXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxhY2UtaG92ZXInKSkge1xuICAgICAgICAgICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBjdXJyZW50U2hpcC5zaXplLFxuICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFNoaXAubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IHNoYXJlZENvb3JkTGlzdFswXSxcbiAgICAgICAgICAgICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gZGlzcGxheSBwbGFjZWQgc2hpcFxuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hhcmVkQ29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSwgZS50YXJnZXQpO1xuICAgICAgICAgICAgICAvLyBnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50XG4gICAgICAgICAgICAgIGlmIChnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50KCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQgPT09ICdlbmVteScpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gZ2V0Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbY29vcmQueCwgY29vcmQueV0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSArICcgJyArIGRpc3BsYXlDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICAgICAgICAgIC8vICAgKyAnICcgKyAoaXNIaXQgPyAnaGl0IScgOiAnbWlzc2VkJykpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtdW5jbGlja2VkJyk7XG4gICAgICAgICAgICBpZiAoaXNIaXQgPiAwKSB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0JywgJ2VuZW15LWhpdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJywgJ2VuZW15LW1pc3MnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0hpdCA9PT0gMikge1xuICAgICAgICAgICAgICBsb2dNZXNzYWdlKGZhY3RvcnlIZWxwZXIuc3Vua01lc3NhZ2UoY29vcmQsIGdhbWVib2FyZCwgZ2FtZS5nZXRTdGF0ZSgpLlxuICAgICAgICAgICAgICAgIHRhcmdldCkpXG4gICAgICAgICAgICAgIGxvZ1JlbWFpbmluZyhwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0U2hpcHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnYW1lLmFkdmFuY2VTdGF0ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgPT09IDApIHtcbiAgICAgICAgICAgIGRpc3BsYXlIb3ZlcihlLnRhcmdldCwgcGxheWVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgPT09IDApIHtcbiAgICAgICAgICAgIGNsZWFyQ2xhc3MoZS50YXJnZXQucGFyZW50RWxlbWVudCwgYWxsSG92ZXJDbGFzc2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdyaWQuc3R5bGVbJ2dyaWQtdGVtcGxhdGUtY29sdW1ucyddID0gYHJlcGVhdCgke01hdGguc3FydChnYW1lYm9hcmRcbiAgICAgICAgLmdldEJvYXJkKCkubGVuZ3RoKX0sIDFmcilgO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUhvdmVyID0gKGVsZW1lbnQsIHBsYXllcikgPT4ge1xuICAgIGlmIChlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBob3Zlck5vZGVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnOmhvdmVyJyk7XG4gICAgICBlbGVtZW50ID0gaG92ZXJOb2RlTGlzdC5pdGVtKGhvdmVyTm9kZUxpc3QubGVuZ3RoIC0gMSk7XG4gICAgfVxuICAgIGlmIChwbGF5ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcGxheWVyID0gZ2FtZS5nZXRQbGF5ZXJzKCkucGxheWVyO1xuICAgIH1cblxuICAgIGNvbnN0IGdhbWVib2FyZCA9IHBsYXllci5nZXRHYW1lYm9hcmQoKTtcblxuICAgIGNvbnN0IGNlbGxDb29yZCA9IGdldENvb3JkKGVsZW1lbnQuZGF0YXNldC5jZWxsSWQsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgIGxldCBjb29yZExpc3QgPSBudWxsO1xuXG4gICAgLy8gR2V0IGNvb3JkTGlzdCBjZW50ZXJlZCBhcm91bmQgaG92ZXJlZCBjb29yZGluYXRlXG4gICAgY29vcmRMaXN0ID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZHNDZW50ZXJlZChcbiAgICAgIGN1cnJlbnRTaGlwLnNpemUsXG4gICAgICB7XG4gICAgICAgIGNvb3JkOiBbY2VsbENvb3JkLngsIGNlbGxDb29yZC55XSxcbiAgICAgICAgZGlyOiBnYW1lLmdldERpcmVjdGlvbigpXG4gICAgICB9XG4gICAgKTtcbiAgICAvLyBOdWRnZSB0aGUgY29vcmRMaXN0IG9udG8gdGhlIGJvYXJkIGlmIG5lZWRlZFxuICAgIGNvb3JkTGlzdCA9IGZhY3RvcnlIZWxwZXIubnVkZ2VDb29yZHNPbihjb29yZExpc3QsXG4gICAgICBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcblxuICAgIC8vIFVwZGF0ZSBzaGFyZWQgY29vcmRpbmF0ZSBsaXN0XG4gICAgc2hhcmVkQ29vcmRMaXN0ID0gY29vcmRMaXN0O1xuXG4gICAgLy8gU2hvdyBhdmFpbGFiaWxpdHkgd2l0aCBob3ZlciBjb2xvcnNcbiAgICBsZXQgaG92ZXJDbGFzc2VzID0gW107XG4gICAgdHJ5IHtcbiAgICAgIGZhY3RvcnlIZWxwZXIuY2hlY2tJZk9wZW4oY29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLXNvbG8nLCAncGxhY2UtaG92ZXInXVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIGlmIChlcnJvciA9PT0gJ2NlbGwgb2NjdXBpZWQnKSB7XG4gICAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbycsXG4gICAgICAgICAgJ3BsYWNlLWhvdmVyLW9jY3VwaWVkJ11cbiAgICAgIH0gZWxzZSBpZiAoZXJyb3IgPT09ICdvdXQgb2YgYm91bmRzJykge1xuICAgICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLW9vYi1zb2xvJyxcbiAgICAgICAgICAncGxhY2UtaG92ZXItb29iJ107XG4gICAgICB9XG4gICAgfVxuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGhvdmVyQ29vcmQgPT4ge1xuICAgICAgY29uc3QgY2VsbEluZGV4ID0gZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChcbiAgICAgICAgW2hvdmVyQ29vcmRbMF0sIGhvdmVyQ29vcmRbMV1dLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgICAgKTtcbiAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5jaGlsZE5vZGVzLml0ZW0oY2VsbEluZGV4KS5cbiAgICAgICAgY2xhc3NMaXN0LmFkZChob3ZlckNsYXNzZXNbMV0pO1xuICAgIH0pO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChob3ZlckNsYXNzZXNbMF0pO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheUNvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIGNvbnN0IGNvb3JkVGV4dCA9IGBbJHtjb29yZE9iai54fSwgJHtjb29yZE9iai55fV1gO1xuICAgIHJldHVybiBjb29yZFRleHQ7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZE9iaiA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRGcm9tSW5kZXgoaW5kZXgsIGJvYXJkKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogY29vcmRPYmoueCxcbiAgICAgIHk6IGNvb3JkT2JqLnksXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcGxhY2VTaGlwID0gKGNvb3JkTGlzdCwgYm9hcmQsIGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBwYXJlbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgY29vcmRMaXN0LmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgcGFyZW50LmNoaWxkTm9kZXNbZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChcbiAgICAgICAgY29vcmQsIGJvYXJkXG4gICAgICApXS5jbGFzc0xpc3QuYWRkKCdzaGlwLXN0YW5kaW5nJyk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBjbGVhckNsYXNzID0gKHBhcmVudCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgcGFyZW50LmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNsYXNzTmFtZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgIGVsc2VcbiAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc05hbWUpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbG9nTWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBjb25zdCBpbmZvRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWRldGFpbHMnKTtcbiAgICBjb25zdCBjdXJyZW50TWVzc2FnZSA9IGluZm9EZXRhaWxzLmZpcnN0Q2hpbGQ7XG4gICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2luZm8tZGV0YWlscy1tZXNzYWdlJyk7XG4gICAgbWVzc2FnZS5pbm5lclRleHQgPSBtc2c7XG5cbiAgICBpZiAoY3VycmVudE1lc3NhZ2UpIHtcbiAgICAgIGluZm9EZXRhaWxzLmluc2VydEJlZm9yZShtZXNzYWdlLCBjdXJyZW50TWVzc2FnZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm9EZXRhaWxzLmFwcGVuZENoaWxkKG1lc3NhZ2UpO1xuICAgIH1cblxuICB9XG5cbiAgY29uc3QgbG9nUmVtYWluaW5nID0gKHNoaXBzKSA9PiB7XG4gICAgY29uc3QgaW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IHByZXZJbmZvUmVtYWluaW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tcmVtYWluaW5nJyk7XG4gICAgaWYgKHByZXZJbmZvUmVtYWluaW5nKSBpbmZvQ29udGFpbmVyLnJlbW92ZUNoaWxkKHByZXZJbmZvUmVtYWluaW5nKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvUmVtYWluaW5nLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nJyk7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nLXRpdGxlJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmlubmVyVGV4dCA9ICdSZW1haW5pbmcgRW5lbXkgU2hpcHMnO1xuICAgIGluZm9SZW1haW5pbmcuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZ1RpdGxlKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1JlbWFpbmluZ0xpc3QuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmctbGlzdCcpO1xuICAgIGluZm9SZW1haW5pbmcuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZ0xpc3QpO1xuXG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBjb25zdCByZW1haW5pbmdTaGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJlbWFpbmluZ1NoaXAuY2xhc3NMaXN0LmFkZCgncmVtYWluaW5nLXNoaXAnKTtcbiAgICAgICAgcmVtYWluaW5nU2hpcC5pbm5lclRleHQgKz0gYCAke3NoaXAuZ2V0TmFtZSgpfSAoJHtzaGlwLmdldExlbmd0aCgpfSlgO1xuXG4gICAgICAgIGluZm9SZW1haW5pbmdMaXN0LmFwcGVuZENoaWxkKHJlbWFpbmluZ1NoaXApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gY29uc3QgbGlzdFN0ciA9IGluZm9SZW1haW5pbmdMaXN0LmlubmVyVGV4dDtcbiAgICAvLyBpbmZvUmVtYWluaW5nTGlzdC5pbm5lclRleHQgPSBsaXN0U3RyLnN1YnN0cmluZygwLCBsaXN0U3RyLmxlbmd0aCAtIDEpO1xuICB9XG5cbiAgY29uc3Qgc3RhdGVNZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGNvbnN0IGluZm9TdGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXN0YXRlJyk7XG4gICAgaW5mb1N0YXRlLmlubmVyVGV4dCA9IG1zZztcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlSb3RhdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgY29uc3Qgcm90YXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm90YXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS1idXR0b24nKTtcblxuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvblRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3RhdGVCdXR0b25UZXh0LmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS1idXR0b24tdGV4dCcpO1xuICAgIHJvdGF0ZUJ1dHRvblRleHQuaW5uZXJUZXh0ID0gJ1JvdGF0ZSc7XG5cbiAgICBjb25zdCByb3RhdGVCdXR0b25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm90YXRlQnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtYnV0dG9uLWljb24nKTtcbiAgICByb3RhdGVCdXR0b25JY29uLmlubmVyVGV4dCA9ICcuJztcblxuICAgIHJvdGF0ZUJ1dHRvbi5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b25UZXh0KTtcbiAgICByb3RhdGVCdXR0b24uYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uSWNvbik7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tc3RhdGUtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uKTtcblxuICAgIHJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBnYW1lLnRvZ2dsZURpcmVjdGlvbigpO1xuICAgICAgY29uc3QgaG9yVmVyID0gKGdhbWUuZ2V0RGlyZWN0aW9uKCkgPT09ICdlJ1xuICAgICAgICA/ICdob3Jpem9udGFsJ1xuICAgICAgICA6ICd2ZXJ0aWNhbCcpO1xuICAgICAgbG9nTWVzc2FnZSgnUm90YXRlZCBkaXJlY3Rpb24gdG8gJyArIGhvclZlcik7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCByZW1vdmVSb3RhdGVCdXR0b24gPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvdGF0ZS1idXR0b24nKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGNvbnN0IG1ha2VDZWxsc1VuY2xpY2tlZCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpLmNoaWxkTm9kZXMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmIChjZWxsLmNsYXNzTGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwtdW5jbGlja2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCByZW1vdmVDZWxsc1VuY2xpY2tlZCA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpLmNoaWxkTm9kZXMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLXVuY2xpY2tlZCcpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplLFxuICAgIGRyYXdHcmlkLFxuICAgIGxvZ01lc3NhZ2UsXG4gICAgc3RhdGVNZXNzYWdlLFxuICAgIGxvZ1JlbWFpbmluZyxcbiAgICBkaXNwbGF5Um90YXRlQnV0dG9uLFxuICAgIHJlbW92ZVJvdGF0ZUJ1dHRvbixcbiAgICBtYWtlQ2VsbHNVbmNsaWNrZWQsXG4gICAgcmVtb3ZlQ2VsbHNVbmNsaWNrZWQsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7IiwiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi4vc3JjL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXJGYWN0b3J5ID0gKG15TmFtZSwgYm9hcmRTaXplKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBteU5hbWU7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoYm9hcmRTaXplKTtcbiAgY29uc3QgYXR0YWNrZWRTcGFjZXMgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiB7IHJldHVybiBnYW1lYm9hcmQ7IH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWU7IH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkLCBlbmVteVBsYXllcikgPT4ge1xuICAgIGxldCBhbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICBhdHRhY2tlZFNwYWNlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbCwgY29vcmQpKSB7XG4gICAgICAgIGFscmVhZHlBdHRhY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWFscmVhZHlBdHRhY2tlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5lbXlQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIGF0dGFja2VkU3BhY2VzLnB1c2goY29vcmQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBhdHRhY2tlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0R2FtZWJvYXJkLFxuICAgIGdldE5hbWUsXG4gICAgYXR0YWNrLFxuICB9XG59XG5cbi8vIHByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzLCBuYW1lIH1cbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChwcm9wcykgPT4ge1xuICBjb25zdCBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gIGNvbnN0IGhpdHMgPSBwcm9wcy5pbml0aWFsSGl0cyB8fCBbXTtcbiAgY29uc3QgbmFtZSA9IHByb3BzLm5hbWU7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKCFoaXRzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBoaXRzLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4geyByZXR1cm4gbGVuZ3RoIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWUgfTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldE5hbWUsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoc2l6ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgIGNvb3JkOiBbaiwgaV0sXG4gICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgIHNoaXBJZDogbnVsbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgc3VuayA9IGZhbHNlO1xuICAgIH0pXG4gICAgcmV0dXJuIHN1bms7XG4gIH1cblxuICAvLyBzaGlwUHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogW3gsIHldLCBkaXI6ICgnZScgfHwgJ3MnKSB9XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwUHJvcHMsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgcGxhY2VkU2hpcElkID0gbnVsbDtcbiAgICBsZXQgcGxhY2VkQ29vcmRzID0gdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICBwbGFjZWRDb29yZHMgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0lmT3BlbihcbiAgICAgICAgc2hpcFByb3BzLmxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpO1xuICAgICAgcGxhY2VkU2hpcElkID0gc2hpcHMucHVzaChzaGlwRmFjdG9yeShzaGlwUHJvcHMpKSAtIDE7XG4gICAgICBib2FyZCA9IGJvYXJkLm1hcChjZWxsID0+IHtcbiAgICAgICAgbGV0IG5ld0NlbGwgPSBjZWxsO1xuICAgICAgICBwbGFjZWRDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgY29vcmQpKSB7XG4gICAgICAgICAgICBuZXdDZWxsID0ge1xuICAgICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICAgICAgc2hpcElkOiBwbGFjZWRTaGlwSWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0NlbGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IChlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGJvYXJkKTtcbiAgICBpZiAoYm9hcmRbaW5kZXhdLmhpdCAhPT0gMCkge1xuICAgICAgdGhyb3coJ2FscmVhZHkgaGl0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNoaXBJZCA9IGJvYXJkW2luZGV4XS5zaGlwSWQ7XG4gICAgaWYgKHNoaXBJZCA9PT0gbnVsbCkge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IC0xO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAxO1xuICAgICAgc2hpcHNbc2hpcElkXS5oaXQoY29vcmQpO1xuICAgICAgaWYgKHNoaXBzW3NoaXBJZF0uaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHsgcmV0dXJuIHNoaXBzIH07XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiB7IHJldHVybiBib2FyZCB9O1xuXG4gIHJldHVybiB7XG4gICAgYWxsU2hpcHNTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzLFxuICAgIGdldEJvYXJkLFxuICB9XG59IiwiaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBlbmVteURlbGF5TWF4SW5pdGlhbCA9IDI7XG4gIGxldCBlbmVteURlbGF5TWF4ID0gMDtcbiAgY29uc3Qgc3RhdGVzID0gW1xuICAgIHtcbiAgICAgIGlkOiAwLFxuICAgICAgdGFyZ2V0OiBudWxsLFxuICAgICAgbmFtZTogJ1BsYWNlIHlvdXIgc2hpcHMnXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMSxcbiAgICAgIHRhcmdldDogJ2VuZW15JyxcbiAgICAgIG5hbWU6IFwiUGxheWVyJ3MgdHVyblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMixcbiAgICAgIHRhcmdldDogJ3BsYXllcicsXG4gICAgICBuYW1lOiBcIkVuZW15J3MgdHVyblwiXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMyxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIG5hbWU6IFwiR2FtZSBmaW5pc2hlZFwiXG4gICAgfVxuICBdO1xuICBsZXQgcG9zc2libGVFbmVteUF0dGFja3MgPSBudWxsO1xuICBsZXQgc3RhdGUgPSBzdGF0ZXNbMF07XG4gIGNvbnN0IHNoaXBMaXN0ID0gW1xuICAgIHsgbmFtZTogJ0NhcnJpZXInLCBzaXplOiA1IH0sXG4gICAgeyBuYW1lOiAnQmF0dGxlc2hpcCcsIHNpemU6IDQgfSxcbiAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXG4gICAgeyBuYW1lOiAnU3VibWFyaW5lJywgc2l6ZTogMyB9LFxuICAgIHsgbmFtZTogJ1BhdHJvbCBCb2F0Jywgc2l6ZTogMiB9XG4gIF07XG4gIGxldCBjdXJyZW50U2hpcCA9IDA7XG4gIGxldCBkaXJlY3Rpb24gPSAnZSc7XG4gIGxldCBwbGF5ZXIxID0gbnVsbDtcbiAgbGV0IGVuZW15MSA9IG51bGw7XG5cbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgcGxheWVyMSA9IHBsYXllckZhY3RvcnkoJ3BsYXllcicsIDEwKTtcbiAgICBlbmVteTEgPSBwbGF5ZXJGYWN0b3J5KCdlbmVteScsIDEwKTtcbiAgICBwb3NzaWJsZUVuZW15QXR0YWNrcyA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKTtcblxuICAgIGRpc3BsYXkuZHJhd0dyaWQocGxheWVyMSk7XG4gICAgZGlzcGxheS5kcmF3R3JpZChlbmVteTEpO1xuXG4gICAgcGxhY2VSYW5kb21TaGlwcyhlbmVteTEpO1xuICAgIGRpcmVjdGlvbiA9ICdlJztcbiAgICBkaXNwbGF5LmRpc3BsYXlSb3RhdGVCdXR0b24oKTtcbiAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoJ1BsYWNlIHlvdXIgJyArIHNoaXBMaXN0W2N1cnJlbnRTaGlwXS5uYW1lKTtcbiAgfTtcblxuICBjb25zdCBnZXRTaGlwRm9yUGxhY2VtZW50ID0gKCkgPT4ge1xuICAgIHJldHVybiBzaGlwTGlzdFtjdXJyZW50U2hpcF07XG4gIH1cblxuICBjb25zdCBhZHZhbmNlU2hpcFBsYWNlbWVudCA9ICgpID0+IHtcbiAgICBpZiAoY3VycmVudFNoaXAgPCA0KSB7XG4gICAgICBjdXJyZW50U2hpcCArKztcbiAgICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnUGxhY2UgeW91ciAnICsgc2hpcExpc3RbY3VycmVudFNoaXBdLm5hbWUpO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpc3BsYXkubG9nUmVtYWluaW5nKGVuZW15MS5nZXRHYW1lYm9hcmQoKS5nZXRTaGlwcygpKTtcbiAgICAgIGRpc3BsYXkubWFrZUNlbGxzVW5jbGlja2VkKCk7XG4gICAgICBhZHZhbmNlU3RhdGUoKTtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFkdmFuY2VTdGF0ZSA9ICgpID0+IHtcbiAgICBpZiAocGxheWVyMS5nZXRHYW1lYm9hcmQoKS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKCdFbmVteSB3aW5zLicpO1xuICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbM107XG5cbiAgICB9IGVsc2UgaWYgKGVuZW15MS5nZXRHYW1lYm9hcmQoKS5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKCdZb3Ugd2luIScpO1xuICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgc3RhdGUgPSBzdGF0ZXNbM107XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5pZCA9PT0gMCkge1xuICAgICAgICBkaXNwbGF5LnJlbW92ZVJvdGF0ZUJ1dHRvbigpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuaWQgPT09IDEpIHtcbiAgICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1syXTtcbiAgICAgICAgY29uc3QgZGVsYXlUaW1lID0gKGVuZW15RGVsYXlNYXggLyA0ICtcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogZW5lbXlEZWxheU1heCAqIDMgLyA0KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWxheWluZyAnICsgZGVsYXlUaW1lICsgJyBzZWNvbmRzJyk7XG4gICAgICAgIGlmIChkZWxheVRpbWUgIT09IDApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVuZW15UmFuZG9tQXR0YWNrKCk7XG4gICAgICAgICAgfSwgMTAwMCAqIGRlbGF5VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5lbXlSYW5kb21BdHRhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheS5tYWtlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGxheS5zdGF0ZU1lc3NhZ2Uoc3RhdGUubmFtZSk7XG4gIH1cblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBnZXREaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIGRpcmVjdGlvbiA9ICdzJztcbiAgICBlbHNlIGRpcmVjdGlvbiA9ICdlJztcbiAgfVxuXG4gIGNvbnN0IGdldFBsYXllcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjogcGxheWVyMSxcbiAgICAgIGVuZW15OiBlbmVteTFcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVJhbmRvbVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IE1hdGguc3FydChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKS5sZW5ndGgpO1xuICAgIHNoaXBMaXN0LmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgd2hpbGUgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCkgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGxldCBjb29yZFggPSBudWxsO1xuICAgICAgICBsZXQgY29vcmRZID0gbnVsbDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2UnKSB7XG4gICAgICAgICAgY29vcmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICAgIGNvb3JkWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHBsYXllci5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxlbmd0aDogc2hpcC5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBzaGlwLm5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbY29vcmRYLCBjb29yZFldLFxuICAgICAgICAgICAgICBkaXI6IGRpcmVjdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBwbGFjZSBhIHNoaXAsIHRyeWluZyBhZ2FpbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBlbmVteVJhbmRvbUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBhdHRhY2tJbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlRW5lbXlBdHRhY2tzLmxlbmd0aCk7XG4gICAgY29uc3QgYXR0YWNrQ2VsbCA9IHBvc3NpYmxlRW5lbXlBdHRhY2tzLnNwbGljZShhdHRhY2tJbmRleCwgMSlbMF07XG4gICAgY29uc3QgZGlkSGl0ID0gcGxheWVyMS5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGF0dGFja0NlbGwuY29vcmQpO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICBjb25zdCBhdHRhY2tDZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKGF0dGFja0NlbGwuY29vcmQsIHBsYXllcjEuXG4gICAgICBnZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpKTtcbiAgICBpZiAoZGlkSGl0ID4gMCkge1xuICAgICAgcGxheWVyR3JpZC5jaGlsZE5vZGVzLml0ZW0oYXR0YWNrQ2VsbEluZGV4KS5jbGFzc0xpc3QuYWRkKCdoaXQnLCAncGxheWVyLWhpdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJHcmlkLmNoaWxkTm9kZXMuaXRlbShhdHRhY2tDZWxsSW5kZXgpLmNsYXNzTGlzdC5hZGQoJ21pc3MnLCAncGxheWVyLW1pc3MnKTtcbiAgICB9XG4gICAgaWYgKGRpZEhpdCA9PT0gMikge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKGZhY3RvcnlIZWxwZXIuc3Vua01lc3NhZ2UoYXR0YWNrQ2VsbC5jb29yZCxcbiAgICAgICAgcGxheWVyMS5nZXRHYW1lYm9hcmQoKSwgZ2FtZS5nZXRTdGF0ZSgpLnRhcmdldCkpXG4gICAgfVxuICAgIGFkdmFuY2VTdGF0ZSgpO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGVsYXkgPSAoKSA9PiB7XG4gICAgaWYgKGVuZW15RGVsYXlNYXggPT09IDApIHtcbiAgICAgIGVuZW15RGVsYXlNYXggPSBlbmVteURlbGF5TWF4SW5pdGlhbDtcbiAgICAgIHJldHVybiAnZGVsYXkgb24nO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmVteURlbGF5TWF4ID0gMDtcbiAgICAgIHJldHVybiAnZGVsYXkgb2ZmJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGdldFNoaXBGb3JQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVNoaXBQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVN0YXRlLFxuICAgIGdldFN0YXRlLFxuICAgIGdldERpcmVjdGlvbixcbiAgICB0b2dnbGVEaXJlY3Rpb24sXG4gICAgZ2V0UGxheWVycyxcbiAgICB0b2dnbGVEZWxheSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJjb25zdCBmYWN0b3J5SGVscGVyID0gKCgpID0+IHtcbiAgY29uc3QgYXJyYXlzTWF0Y2ggPSAoY29vcmQxLCBjb29yZDIpID0+IHtcbiAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KGNvb3JkMSkgPT09IEpTT04uc3RyaW5naWZ5KGNvb3JkMikpXG4gICAgICA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGNoZWNrSWZPcGVuID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBsZXQgaXNPcGVuID0gdHJ1ZTtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBjb25zdCBib2FyZENlbGwgPSBib2FyZFtnZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpXTtcbiAgICAgIGlmIChib2FyZENlbGwuc2hpcElkICE9PSBudWxsKSB7XG4gICAgICAgIGlzT3BlbiA9IGZhbHNlO1xuICAgICAgICB0aHJvdygnY2VsbCBvY2N1cGllZCcpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGlzT3BlbjtcbiAgfVxuXG4gICAgLy8gbG9jYXRpb25Qcm9wcyA9IHsgY29vcmQ6IFs1LCA1XSwgZGlyOiAoZSB8fCBzKSB9XG4gIGNvbnN0IGdldENvb3Jkc0lmT3BlbiA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHNlYXJjaFggPSBsb2NhdGlvblByb3BzLmNvb3JkWzBdO1xuICAgICAgbGV0IHNlYXJjaFkgPSBsb2NhdGlvblByb3BzLmNvb3JkWzFdO1xuICAgICAgbG9jYXRpb25Qcm9wcy5kaXIgPT09ICdlJ1xuICAgICAgICA/IHNlYXJjaFggKz0gaVxuICAgICAgICA6IHNlYXJjaFkgKz0gaTtcbiAgICAgIGNvbnN0IG1hdGNoaW5nQ2VsbCA9IGJvYXJkLmZpbmQoY2VsbCA9PiBcbiAgICAgICAgYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgW3NlYXJjaFgsIHNlYXJjaFldKVxuICAgICAgKTtcbiAgICAgIFxuICAgICAgaWYgKCFtYXRjaGluZ0NlbGwpIHRocm93KCdvdXQgb2YgYm91bmRzJyk7XG4gICAgICBlbHNlIGlmIChtYXRjaGluZ0NlbGwuc2hpcElkICE9PSBudWxsKSB0aHJvdygnY2VsbCBvY2N1cGllZCcpXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gU3VjY2Vzc1xuICAgICAgICBjb29yZHMucHVzaChbc2VhcmNoWCwgc2VhcmNoWV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29vcmRzO1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRzQ2VudGVyZWQgPSAobGVuZ3RoLCBsb2NhdGlvblByb3BzKSA9PiB7XG4gICAgbGV0IHN0YXJ0aW5nQ29vcmQgPSBudWxsO1xuICAgIGNvbnN0IGRpciA9IGxvY2F0aW9uUHJvcHMuZGlyO1xuICAgIGlmIChkaXIgPT09ICdlJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpLFxuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzFdXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoZGlyID09PSAncycpIHtcbiAgICAgIHN0YXJ0aW5nQ29vcmQgPSBbXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMF0sXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV0gLSBNYXRoLmZsb29yKChsZW5ndGggLSAxKS8yKVxuICAgICAgXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IGRpcmVjdGlvbiBiZWZvcmUgZ2V0dGluZyBjb29yZGluYXRlcycpO1xuICAgIH1cbiAgICBsZXQgY29vcmRBcnJheSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICsrKSB7XG4gICAgICBjb25zdCBjb29yZFggPSAoZGlyID09PSAnZScpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFswXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzBdO1xuICAgICAgY29uc3QgY29vcmRZID0gKGRpciA9PT0gJ3MnKVxuICAgICAgICA/IHN0YXJ0aW5nQ29vcmRbMV0gKyBpXG4gICAgICAgIDogc3RhcnRpbmdDb29yZFsxXTtcbiAgICAgIGNvb3JkQXJyYXkucHVzaChbY29vcmRYLCBjb29yZFldKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkQXJyYXk7XG4gIH1cblxuICBjb25zdCBnZXRJbmRleEZyb21Db29yZCA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGNvb3JkWzFdICogTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgKyBjb29yZFswXTtcbiAgICBpZiAoaW5kZXggPiBib2FyZC5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgdGhyb3coJ2dldEluZGV4Li4uOiBvdXQgb2YgYm91bmRzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCk7XG4gICAgY29uc3QgeCA9IGluZGV4ICUgc2l6ZTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgIFxuICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfVxuICB9XG5cbiAgY29uc3QgbnVkZ2VDb29yZHNCeSA9IChjb29yZExpc3QsIG51bWJlcikgPT4ge1xuXG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc09uID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBmaXJzdENvb3JkID0gY29vcmRMaXN0WzBdO1xuICAgIGNvbnN0IGxhc3RDb29yZCA9IGNvb3JkTGlzdFtjb29yZExpc3QubGVuZ3RoIC0gMV07XG4gICAgbGV0IG5ld0xpc3QgPSBudWxsO1xuICAgIC8vIG9mZiB0aGUgcmlnaHQgc2lkZVxuICAgIGNvbnN0IHJpZ2h0U2lkZUhhbmcgPSBsYXN0Q29vcmRbMF0gLSAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKTtcbiAgICBjb25zdCBsZWZ0U2lkZUhhbmcgID0gLTEgKiBmaXJzdENvb3JkWzBdO1xuICAgIGNvbnN0IHRvcEhhbmcgICAgICAgPSAtMSAqIGZpcnN0Q29vcmRbMV07XG4gICAgY29uc3QgYm90dG9tSGFuZyAgICA9IGxhc3RDb29yZFsxXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGlmIChyaWdodFNpZGVIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdIC0gcmlnaHRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChsZWZ0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gKyBsZWZ0U2lkZUhhbmcsIGNvb3JkWzFdXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodG9wSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gKyB0b3BIYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYm90dG9tSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gLSBib3R0b21IYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3TGlzdDtcbiAgfVxuXG4gIGNvbnN0IHN1bmtNZXNzYWdlID0gKGNvb3JkLCBnYW1lYm9hcmQsIHRhcmdldCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCB7Y29vcmQsIGdhbWVib2FyZCwgdGFyZ2V0IH0pO1xuICAgIGlmIChjb29yZC54ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvb3JkID0gW2Nvb3JkLngsIGNvb3JkLnldO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGdldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgIGNvbnN0IHNoaXBJZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpW2luZGV4XS5zaGlwSWQ7XG4gICAgY29uc3QgYXR0YWNrZXIgPSAodGFyZ2V0ID09PSAnZW5lbXknXG4gICAgICA/ICdZb3UnXG4gICAgICA6ICdFbmVteScpO1xuICAgIGNvbnN0IHNoaXBOYW1lID0gZ2FtZWJvYXJkLmdldFNoaXBzKClbc2hpcElkXS5nZXROYW1lKCk7XG4gICAgY29uc3Qgc2hpcFNpemUgPSBnYW1lYm9hcmQuZ2V0U2hpcHMoKVtzaGlwSWRdLmdldExlbmd0aCgpO1xuICAgIHJldHVybiBhdHRhY2tlciArICcgc3VuayB0aGUgJyArIHNoaXBOYW1lICsgJyEgKHNpemU6ICcgKyBzaGlwU2l6ZSArICcpJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyYXlzTWF0Y2gsXG4gICAgY2hlY2tJZk9wZW4sXG4gICAgZ2V0Q29vcmRzSWZPcGVuLFxuICAgIGdldENvb3Jkc0NlbnRlcmVkLFxuICAgIGdldEluZGV4RnJvbUNvb3JkLFxuICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIG51ZGdlQ29vcmRzQnksXG4gICAgbnVkZ2VDb29yZHNPbixcbiAgICBzdW5rTWVzc2FnZSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFjdG9yeUhlbHBlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21leWVycmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1pbmZvLWFyZWEtYmFja2dyb3VuZDogd2hpdGU7XFxuICAtLWdyaWQtY29sb3I6IHdoaXRlO1xcbiAgLS1nYW1lLWJveDogI0VFRTtcXG4gIC0tZ2FtZS1iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XFxuICAtLWhvdmVyLWxpZ2h0LWJsdWU6IHJnYigxMzEsIDE3NCwgMjM4KTtcXG4gIC0taG92ZXItYmx1ZTogZG9kZ2VyQmx1ZTtcXG4gIC0taG92ZXItY3JpbXNvbjogY3JpbXNvbjtcXG4gIC0taG92ZXItcmVkOiByZ2IoMjU1LCAxMTIsIDExMik7XFxuICAtLWhvdmVyLWdvbGQ6IGdvbGQ7XFxuICAtLWhvdmVyLXllbGxvdzogcmdiKDI1NSwgMjU1LCAxNDUpO1xcbiAgLS1zaGlwLWdyZWVuOiBmb3Jlc3RHcmVlbjtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuICAtLXVpLXRleHQtZGFyazogcmdiKDE0LCAzNSwgMTI5KTtcXG4gIC0tdWktdGV4dC1tZWQ6IHJnYig1NiwgODEsIDE2Myk7XFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgLyogZm9udC1zaXplOiBjYWxjKDIuOHZoICsgMC4zcmVtKTsgKi9cXG4gIGZvbnQtc2l6ZTogMS44cmVtO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMiB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgLyogZm9udC1zaXplOiBjYWxjKDIuM3ZoICsgMC4zcmVtKTsgKi9cXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICAvKiBmb250LXNpemU6IGNhbGMoMS44dmggKyAwLjNyZW0pOyAqL1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIC8qIGZvbnQtc2l6ZTogY2FsYygxLjR2aCArIDAuM3JlbSk7ICovXFxuICBmb250LXNpemU6IDFyZW07XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxufVxcbiNnYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgd2lkdGg6IDQwcmVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogNXJlbTtcXG59XFxuI2JvYXJkcy1jb250YWluZXIge1xcblxcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplLCAxcHgpIHNvbGlkIHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiAxN3JlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAxN3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDIwcmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDIwcmVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4ucGxheWVyLWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLmdyaWQtbGFiZWwge1xcbiAgLyogaGVpZ2h0OiAycmVtOyAqL1xcbn1cXG4uZW5lbXktYXJlYSAuZ3JpZC1sYWJlbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuOHJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB2YXIoLS11aS10ZXh0LWRhcmssIGRhcmtibHVlKTtcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZTpob3ZlciB7XFxuICBjb2xvcjogdmFyKC0tdWktdGV4dC1tZWQsIGJsdWUpO1xcbn1cXG4uZW5lbXktYXJlYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxufVxcbi5wbGF5ZXItYXJlYSB7XFxuXFxufVxcbi5ncmlkLWNlbGwge1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjM7ICovXFxuICBib3JkZXI6IGNhbGModmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSkgLyAyKSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvcik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWNvbG9yLCB3aGl0ZSk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZCB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMDZzLCBiYWNrZ3JvdW5kLWNvbG9yIDAuMXM7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgbGlnaHRncmF5KTsgKi9cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDAuNXB4IGJsYWNrLFxcbiAgICAgICAgICAgICAgMHB4IDAuMnJlbSAwLjNyZW0gMCByZ2JhKDAsMCwwLDAuMyk7ICovXFxuICBib3gtc2hhZG93OiAwcHggMC4ycmVtIDAuM3JlbSAwIHJnYmEoMCwwLDAsMC4zKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSk7XFxuICB6LWluZGV4OiAyO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItbGlnaHQtYmx1ZSwgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1ibHVlLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jcmltc29uLCBjcmltc29uKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgcmVkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXllbGxvdywgeWVsbG93KTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItZ29sZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtZ3JlZW4sIGZvcmVzdEdyZWVuKTtcXG59XFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwdXJwbGU7XFxufVxcbi5lbmVteS1oaXQge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuXFxufVxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uZW5lbXktbWlzcyB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG5cXG59XFxuLmluZm8tY29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDE2cmVtO1xcbn1cXG4uaW5mby10aXRsZSB7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDA7XFxufVxcbi5pbmZvLXN0YXRlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDJyZW07XFxufVxcbi5pbmZvLXN0YXRlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbjogMC4zcmVtIDAgMC43cmVtIDA7XFxufVxcbi5yb3RhdGUtYnV0dG9uLCAucm90YXRlLWJ1dHRvbiBkaXYge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2FtZS1ib3gsICNFRUUpO1xcbiAgcGFkZGluZzogMC4xcmVtIDAuNHJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGxpZ2h0Z3JheSk7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWFyZWEtYmFja2dyb3VuZCwgd2hpdGUpO1xcbn1cXG4ucm90YXRlLWJ1dHRvbi10ZXh0IHtcXG4gIGZvbnQtc2l6ZTogMC45ZW07XFxuICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24taWNvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWFyZWEtYmFja2dyb3VuZCwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBwYWRkaW5nOiAwLjA1cmVtIDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzIHtcXG4gIGhlaWdodDogMTVyZW07XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbi1ib3R0b206IDAuM3JlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nIHtcXG4gIGhlaWdodDogNnJlbTtcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2FtZS1ib3gsICNFRUUpO1xcbiAgcGFkZGluZzogMC4zcmVtIDAuMnJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5pbmZvLXJlbWFpbmluZy1saXN0IHtcXG5cXG59XFxuLnJlbWFpbmluZy1zaGlwIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1hcmVhLWJhY2tncm91bmQsIHdoaXRlKTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjJyZW07XFxuICBtYXJnaW46IDAgMC4zcmVtIDAuMnJlbSAwO1xcbn1cXG4uaW5mby1kZXRhaWxzLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJveCwgI0VFRSk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMC4ycmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsbUJBQW1CO0VBQ25CLDZCQUE2QjtFQUM3QixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLGtDQUFrQztFQUNsQyxzQ0FBc0M7RUFDdEMsd0JBQXdCO0VBQ3hCLHdCQUF3QjtFQUN4QiwrQkFBK0I7RUFDL0Isa0JBQWtCO0VBQ2xCLGtDQUFrQztFQUNsQyx5QkFBeUI7RUFDekIsMEJBQTBCO0VBQzFCLHVCQUF1QjtFQUN2QixnQ0FBZ0M7RUFDaEMsK0JBQStCO0VBQy9CLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQztBQUNBO0VBQ0UsZ0JBQWdCO0VBQ2hCLHFDQUFxQztFQUNyQyxpQkFBaUI7RUFDakIsd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxnQkFBZ0I7RUFDaEIscUNBQXFDO0VBQ3JDLGlCQUFpQjtFQUNqQix3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLHFDQUFxQztFQUNyQyxpQkFBaUI7RUFDakIsd0JBQXdCO0FBQzFCO0FBQ0E7RUFDRSxxQ0FBcUM7RUFDckMsZUFBZTtFQUNmLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsaURBQWlEO0VBQ2pELGtEQUFrRDtFQUNsRCxvREFBb0Q7RUFDcEQsZ0NBQWdDO0FBQ2xDO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLDhCQUE4QjtFQUM5Qix1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0VBQ0UsdUJBQXVCO0FBQ3pCO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsTUFBTTtFQUNOLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sMEVBQTBFO0VBQzFFLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsWUFBWTtFQUNaLHFCQUFxQjtFQUNyQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0UsaURBQWlEO0FBQ25EO0FBQ0E7RUFDRSxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQiwyQkFBMkI7QUFDN0I7QUFDQTtFQUNFLGlEQUFpRDtBQUNuRDtBQUNBO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysb0NBQW9DO0FBQ3RDO0FBQ0E7RUFDRSwrQkFBK0I7QUFDakM7QUFDQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUNBOztBQUVBO0FBQ0E7RUFDRSxzQ0FBc0M7RUFDdEMsd0VBQXdFO0VBQ3hFLDBDQUEwQztFQUMxQyxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLHNCQUFzQjtFQUN0QixrREFBa0Q7QUFDcEQ7QUFDQTtFQUNFLGVBQWU7RUFDZiwrREFBK0Q7RUFDL0Qsa0JBQWtCO0VBQ2xCO29EQUNrRDtFQUNsRCwrQ0FBK0M7RUFDL0MsNEJBQTRCO0VBQzVCLFVBQVU7QUFDWjtBQUNBO0VBQ0UsNERBQTREO0FBQzlEO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsK0NBQStDO0FBQ2pEO0FBQ0E7RUFDRSwrQ0FBK0M7QUFDakQ7QUFDQTtFQUNFLGVBQWU7RUFDZix1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLDZDQUE2QztBQUMvQztBQUNBO0VBQ0UsZUFBZTtFQUNmLHlDQUF5QztBQUMzQztBQUNBO0VBQ0UsZ0RBQWdEO0FBQ2xEO0FBQ0E7RUFDRSx3QkFBd0I7QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7RUFDRSx1QkFBdUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxxQkFBcUI7RUFDckIseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSxxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLG1CQUFtQjtFQUNuQix1Q0FBdUM7RUFDdkMsc0JBQXNCO0VBQ3RCLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLGlCQUFpQjtBQUNuQjtBQUNBO0VBQ0UseURBQXlEO0FBQzNEO0FBQ0E7RUFDRSxvREFBb0Q7QUFDdEQ7QUFDQTtFQUNFLGdCQUFnQjtFQUNoQixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLG9EQUFvRDtFQUNwRCxpQkFBaUI7RUFDakIsdUJBQXVCO0VBQ3ZCLHVCQUF1QjtFQUN2QixxQkFBcUI7QUFDdkI7QUFDQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2QscUJBQXFCO0FBQ3ZCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLHVDQUF1QztFQUN2QyxzQkFBc0I7RUFDdEIscUJBQXFCO0FBQ3ZCO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtFQUNFLHFCQUFxQjtFQUNyQixpQkFBaUI7RUFDakIsb0RBQW9EO0VBQ3BELHNCQUFzQjtFQUN0Qix5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQix1Q0FBdUM7RUFDdkMsc0JBQXNCO0VBQ3RCLHFCQUFxQjtBQUN2QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1pbmZvLWFyZWEtYmFja2dyb3VuZDogd2hpdGU7XFxuICAtLWdyaWQtY29sb3I6IHdoaXRlO1xcbiAgLS1nYW1lLWJveDogI0VFRTtcXG4gIC0tZ2FtZS1iYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyYXk7XFxuICAtLWhvdmVyLWxpZ2h0LWJsdWU6IHJnYigxMzEsIDE3NCwgMjM4KTtcXG4gIC0taG92ZXItYmx1ZTogZG9kZ2VyQmx1ZTtcXG4gIC0taG92ZXItY3JpbXNvbjogY3JpbXNvbjtcXG4gIC0taG92ZXItcmVkOiByZ2IoMjU1LCAxMTIsIDExMik7XFxuICAtLWhvdmVyLWdvbGQ6IGdvbGQ7XFxuICAtLWhvdmVyLXllbGxvdzogcmdiKDI1NSwgMjU1LCAxNDUpO1xcbiAgLS1zaGlwLWdyZWVuOiBmb3Jlc3RHcmVlbjtcXG4gIC0tZ3JpZC1ib3JkZXItY29sb3I6IGJsYWNrO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuICAtLXVpLXRleHQtZGFyazogcmdiKDE0LCAzNSwgMTI5KTtcXG4gIC0tdWktdGV4dC1tZWQ6IHJnYig1NiwgODEsIDE2Myk7XFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xcbn1cXG5oMSB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgLyogZm9udC1zaXplOiBjYWxjKDIuOHZoICsgMC4zcmVtKTsgKi9cXG4gIGZvbnQtc2l6ZTogMS44cmVtO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMiB7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgLyogZm9udC1zaXplOiBjYWxjKDIuM3ZoICsgMC4zcmVtKTsgKi9cXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5oMyB7XFxuICAvKiBmb250LXNpemU6IGNhbGMoMS44dmggKyAwLjNyZW0pOyAqL1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIC8qIGZvbnQtc2l6ZTogY2FsYygxLjR2aCArIDAuM3JlbSk7ICovXFxuICBmb250LXNpemU6IDFyZW07XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxufVxcbiNnYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgd2lkdGg6IDQwcmVtO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogNXJlbTtcXG59XFxuI2JvYXJkcy1jb250YWluZXIge1xcblxcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplLCAxcHgpIHNvbGlkIHZhcigtLWdyaWQtYm9yZGVyLWNvbG9yLCBibGFjayk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiAxN3JlbTtcXG4gIHBhZGRpbmctYm90dG9tOiAxN3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IDIwcmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDIwcmVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4ucGxheWVyLWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1ib3JkZXItY29sb3IsIGJsYWNrKTtcXG59XFxuLmdyaWQtbGFiZWwge1xcbiAgLyogaGVpZ2h0OiAycmVtOyAqL1xcbn1cXG4uZW5lbXktYXJlYSAuZ3JpZC1sYWJlbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuOHJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB2YXIoLS11aS10ZXh0LWRhcmssIGRhcmtibHVlKTtcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZTpob3ZlciB7XFxuICBjb2xvcjogdmFyKC0tdWktdGV4dC1tZWQsIGJsdWUpO1xcbn1cXG4uZW5lbXktYXJlYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxufVxcbi5wbGF5ZXItYXJlYSB7XFxuXFxufVxcbi5ncmlkLWNlbGwge1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjM7ICovXFxuICBib3JkZXI6IGNhbGModmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSkgLyAyKSBzb2xpZCB2YXIoLS1ncmlkLWJvcmRlci1jb2xvcik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWNvbG9yLCB3aGl0ZSk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZCB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMDZzLCBiYWNrZ3JvdW5kLWNvbG9yIDAuMXM7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdhbWUtYmFja2dyb3VuZC1jb2xvciwgbGlnaHRncmF5KTsgKi9cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDAuNXB4IGJsYWNrLFxcbiAgICAgICAgICAgICAgMHB4IDAuMnJlbSAwLjNyZW0gMCByZ2JhKDAsMCwwLDAuMyk7ICovXFxuICBib3gtc2hhZG93OiAwcHggMC4ycmVtIDAuM3JlbSAwIHJnYmEoMCwwLDAsMC4zKTtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSk7XFxuICB6LWluZGV4OiAyO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItbGlnaHQtYmx1ZSwgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1ibHVlLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jcmltc29uLCBjcmltc29uKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgcmVkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXllbGxvdywgeWVsbG93KTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItZ29sZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtZ3JlZW4sIGZvcmVzdEdyZWVuKTtcXG59XFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBwdXJwbGU7XFxufVxcbi5lbmVteS1oaXQge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuXFxufVxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG4uZW5lbXktbWlzcyB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG5cXG59XFxuLmluZm8tY29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDE2cmVtO1xcbn1cXG4uaW5mby10aXRsZSB7XFxuICBmb250LXNpemU6IDEuNnJlbTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDA7XFxufVxcbi5pbmZvLXN0YXRlLWNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDJyZW07XFxufVxcbi5pbmZvLXN0YXRlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbjogMC4zcmVtIDAgMC43cmVtIDA7XFxufVxcbi5yb3RhdGUtYnV0dG9uLCAucm90YXRlLWJ1dHRvbiBkaXYge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2FtZS1ib3gsICNFRUUpO1xcbiAgcGFkZGluZzogMC4xcmVtIDAuNHJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJhY2tncm91bmQtY29sb3IsIGxpZ2h0Z3JheSk7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWFyZWEtYmFja2dyb3VuZCwgd2hpdGUpO1xcbn1cXG4ucm90YXRlLWJ1dHRvbi10ZXh0IHtcXG4gIGZvbnQtc2l6ZTogMC45ZW07XFxuICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24taWNvbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWFyZWEtYmFja2dyb3VuZCwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBwYWRkaW5nOiAwLjA1cmVtIDAuNXJlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzIHtcXG4gIGhlaWdodDogMTVyZW07XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbi1ib3R0b206IDAuM3JlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nIHtcXG4gIGhlaWdodDogNnJlbTtcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ2FtZS1ib3gsICNFRUUpO1xcbiAgcGFkZGluZzogMC4zcmVtIDAuMnJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5pbmZvLXJlbWFpbmluZy1saXN0IHtcXG5cXG59XFxuLnJlbWFpbmluZy1zaGlwIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1hcmVhLWJhY2tncm91bmQsIHdoaXRlKTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjJyZW07XFxuICBtYXJnaW46IDAgMC4zcmVtIDAuMnJlbSAwO1xcbn1cXG4uaW5mby1kZXRhaWxzLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1nYW1lLWJveCwgI0VFRSk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMC4ycmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyICYmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl0pOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJyZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9tZXllcnJlc2V0LmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5kaXNwbGF5LmluaXRpYWxpemUoKTtcbmdhbWUuc3RhcnQoKTsiXSwibmFtZXMiOlsiZmFjdG9yeUhlbHBlciIsImdhbWVib2FyZEZhY3RvcnkiLCJwbGF5ZXJGYWN0b3J5Iiwic2hpcEZhY3RvcnkiLCJnYW1lIiwiZGlzcGxheSIsImdyaWQiLCJzaGFyZWRDb29yZExpc3QiLCJhbGxIb3ZlckNsYXNzZXMiLCJpbml0aWFsaXplIiwiZW5lbXlBcmVhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZW5lbXlHcmlkV3JhcHBlciIsImVuZW15R3JpZExhYmVsIiwiaW5uZXJUZXh0IiwiZW5lbXlEZWxheVRvZ2dsZSIsInRvZ2dsZURlbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJlbmVteUdyaWQiLCJwbGF5ZXJBcmVhIiwicGxheWVyR3JpZFdyYXBwZXIiLCJwbGF5ZXJHcmlkTGFiZWwiLCJwbGF5ZXJHcmlkIiwiYm9hcmRzQ29udGFpbmVyIiwiaW5mb0NvbnRhaW5lciIsImdhbWVDb250YWluZXIiLCJpZCIsImluZm9UaXRsZSIsImluZm9TdGF0ZUNvbnRhaW5lciIsImluZm9TdGF0ZSIsImdldFN0YXRlIiwibmFtZSIsImluZm9EZXRhaWxzIiwiaW5mb1JlbWFpbmluZyIsImluZm9SZW1haW5pbmdUaXRsZSIsImFwcGVuZENoaWxkIiwicGFnZUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJjaGlsZCIsInJlbW92ZSIsImtleSIsInRvZ2dsZURpcmVjdGlvbiIsImNsZWFyQ2xhc3MiLCJkaXNwbGF5SG92ZXIiLCJkcmF3R3JpZCIsInBsYXllciIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiY2VsbCIsImRhdGFzZXQiLCJjZWxsSWQiLCJjdXJyZW50U2hpcCIsImdldFNoaXBGb3JQbGFjZW1lbnQiLCJjb250YWlucyIsInBsYWNlU2hpcCIsImxlbmd0aCIsInNpemUiLCJjb29yZCIsImRpciIsImdldERpcmVjdGlvbiIsImdldEJvYXJkIiwiYWR2YW5jZVNoaXBQbGFjZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Q29vcmQiLCJpc0hpdCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsImxvZ01lc3NhZ2UiLCJzdW5rTWVzc2FnZSIsImxvZ1JlbWFpbmluZyIsImdldFNoaXBzIiwiYWR2YW5jZVN0YXRlIiwic3R5bGUiLCJNYXRoIiwic3FydCIsImVsZW1lbnQiLCJ1bmRlZmluZWQiLCJob3Zlck5vZGVMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsIml0ZW0iLCJnZXRQbGF5ZXJzIiwiY2VsbENvb3JkIiwiY29vcmRMaXN0IiwiZ2V0Q29vcmRzQ2VudGVyZWQiLCJudWRnZUNvb3Jkc09uIiwiaG92ZXJDbGFzc2VzIiwiY2hlY2tJZk9wZW4iLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJob3ZlckNvb3JkIiwiY2VsbEluZGV4IiwiZ2V0SW5kZXhGcm9tQ29vcmQiLCJkaXNwbGF5Q29vcmQiLCJpbmRleCIsImJvYXJkIiwiY29vcmRPYmoiLCJnZXRDb29yZEZyb21JbmRleCIsImNvb3JkVGV4dCIsInBhcmVudCIsImNsYXNzTmFtZSIsIm1zZyIsImN1cnJlbnRNZXNzYWdlIiwiZmlyc3RDaGlsZCIsIm1lc3NhZ2UiLCJpbnNlcnRCZWZvcmUiLCJzaGlwcyIsInByZXZJbmZvUmVtYWluaW5nIiwicmVtb3ZlQ2hpbGQiLCJpbmZvUmVtYWluaW5nTGlzdCIsInNoaXAiLCJpc1N1bmsiLCJyZW1haW5pbmdTaGlwIiwiZ2V0TGVuZ3RoIiwic3RhdGVNZXNzYWdlIiwiZGlzcGxheVJvdGF0ZUJ1dHRvbiIsInJvdGF0ZUJ1dHRvbiIsInJvdGF0ZUJ1dHRvblRleHQiLCJyb3RhdGVCdXR0b25JY29uIiwiaG9yVmVyIiwicmVtb3ZlUm90YXRlQnV0dG9uIiwibWFrZUNlbGxzVW5jbGlja2VkIiwicmVtb3ZlQ2VsbHNVbmNsaWNrZWQiLCJteU5hbWUiLCJib2FyZFNpemUiLCJhdHRhY2tlZFNwYWNlcyIsImF0dGFjayIsImVuZW15UGxheWVyIiwiYWxyZWFkeUF0dGFja2VkIiwiYXJyYXlzTWF0Y2giLCJwdXNoIiwicHJvcHMiLCJoaXRzIiwiaW5pdGlhbEhpdHMiLCJoaXQiLCJpbmNsdWRlcyIsImoiLCJzaGlwSWQiLCJhbGxTaGlwc1N1bmsiLCJzdW5rIiwic2hpcFByb3BzIiwibG9jYXRpb25Qcm9wcyIsInBsYWNlZFNoaXBJZCIsInBsYWNlZENvb3JkcyIsImdldENvb3Jkc0lmT3BlbiIsIm1hcCIsIm5ld0NlbGwiLCJlbmVteURlbGF5TWF4SW5pdGlhbCIsImVuZW15RGVsYXlNYXgiLCJzdGF0ZXMiLCJwb3NzaWJsZUVuZW15QXR0YWNrcyIsInN0YXRlIiwic2hpcExpc3QiLCJkaXJlY3Rpb24iLCJwbGF5ZXIxIiwiZW5lbXkxIiwic3RhcnQiLCJwbGFjZVJhbmRvbVNoaXBzIiwiZGVsYXlUaW1lIiwicmFuZG9tIiwic2V0VGltZW91dCIsImVuZW15UmFuZG9tQXR0YWNrIiwiZW5lbXkiLCJzdWNjZXNzIiwiZmxvb3IiLCJjb29yZFgiLCJjb29yZFkiLCJhdHRhY2tJbmRleCIsImF0dGFja0NlbGwiLCJzcGxpY2UiLCJkaWRIaXQiLCJhdHRhY2tDZWxsSW5kZXgiLCJjb29yZDEiLCJjb29yZDIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNPcGVuIiwiYm9hcmRDZWxsIiwiY29vcmRzIiwic2VhcmNoWCIsInNlYXJjaFkiLCJtYXRjaGluZ0NlbGwiLCJmaW5kIiwic3RhcnRpbmdDb29yZCIsImNvb3JkQXJyYXkiLCJudWRnZUNvb3Jkc0J5IiwibnVtYmVyIiwiZmlyc3RDb29yZCIsImxhc3RDb29yZCIsIm5ld0xpc3QiLCJyaWdodFNpZGVIYW5nIiwibGVmdFNpZGVIYW5nIiwidG9wSGFuZyIsImJvdHRvbUhhbmciLCJhdHRhY2tlciIsInNoaXBOYW1lIiwic2hpcFNpemUiXSwic291cmNlUm9vdCI6IiJ9