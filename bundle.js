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

  var reset = function reset() {
    flipCells = [];
    flipping = false;
  };

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
    reset: reset,
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
    clearDisplay();
    _animate_js__WEBPACK_IMPORTED_MODULE_3__["default"].reset();
    var enemyArea = document.createElement('div');
    enemyArea.classList.add('enemy-area');
    var enemyGridWrapper = document.createElement('div');
    enemyGridWrapper.classList.add('grid-wrapper', 'enemy-grid-wrapper');
    var enemyGridLabel = document.createElement('h3');
    enemyGridLabel.classList.add('grid-label');
    enemyGridLabel.innerText = 'Enemy';
    var enemyDelayToggle = document.createElement('h4');
    enemyDelayToggle.classList.add('enemy-delay-toggle'); // enemyDelayToggle.innerText = game.toggleDelay();

    enemyDelayToggle.innerText = 'delay on';
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
    infoTitle.innerText = 'Battleship';
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

  var clearDisplay = function clearDisplay() {
    var gameContainer = document.querySelector('#game-container');

    if (gameContainer) {
      gameContainer.remove();
    }
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
  }; // options = { title, description, buttonText, hideButtonText, callback }


  var makeModal = function makeModal(options) {
    var body = document.querySelector('body');
    var pageContainer = document.querySelector('#page-container');
    var gameContainer = document.querySelector('#game-container');
    var modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');
    var modal = document.createElement('div');
    modal.classList.add('modal');
    var modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = options.title;
    var modalDescription = document.createElement('h3');
    modalDescription.classList.add('modal-description');
    modalDescription.innerText = options.description;
    var modalButton = document.createElement('button');
    modalButton.classList.add('modal-button');
    modalButton.innerText = options.buttonText;
    var hideModalButton = document.createElement('button');
    hideModalButton.classList.add('hide-modal-button');
    hideModalButton.innerText = options.hideButtonText;
    modalContainer.appendChild(modal);
    modalContainer.appendChild(hideModalButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalDescription);
    modal.appendChild(modalButton);
    body.insertBefore(modalContainer, pageContainer);
    modalButton.addEventListener('click', function (e) {
      options.callback();
      modalContainer.remove();
    });
    hideModalButton.addEventListener('click', function (e) {
      if (modal.classList.contains('modal-hidden')) {
        modal.classList.remove('modal-hidden');
        hideModalButton.classList.remove('modal-mostly-hidden');
      } else {
        modal.classList.add('modal-hidden');
        hideModalButton.classList.add('modal-mostly-hidden');
      }
    });
  };

  return {
    initialize: initialize,
    clearDisplay: clearDisplay,
    drawGrid: drawGrid,
    logMessage: logMessage,
    stateMessage: stateMessage,
    logRemaining: logRemaining,
    displayRotateButton: displayRotateButton,
    removeRotateButton: removeRotateButton,
    makeCellsUnclicked: makeCellsUnclicked,
    removeCellsUnclicked: removeCellsUnclicked,
    makeModal: makeModal
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
  var shipList;
  var currentShip;
  var direction;
  var player1 = null;
  var enemy1 = null;

  var start = function start() {
    _helpers_enemylogic_js__WEBPACK_IMPORTED_MODULE_3__["default"].reset();
    enemyDelayMax = enemyDelayMaxInitial;
    state = states[0];
    shipList = [{
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
    currentShip = 0;
    direction = 'e';
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
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeModal({
        title: 'Enemy wins.',
        description: 'Better luck next time.',
        buttonText: 'Play again',
        hideButtonText: 'Hide',
        callback: function callback() {
          _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialize();
          game.start();
          console.log("You've clicked the button");
        }
      });
    } else if (enemy1.getGameboard().allShipsSunk()) {
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].logMessage('You win!');
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeCellsUnclicked();
      state = states[3];
      _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].makeModal({
        title: 'You win!',
        description: "You sunk all the enemy's battleships.",
        buttonText: 'Play again',
        hideButtonText: 'Hide',
        callback: function callback() {
          _display_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialize();
          game.start();
          console.log("You've clicked the button");
        }
      });
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

  var reset = function reset() {
    playerGameboard = null;
    activeHits = [];
    activeShips = [];
  };

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
    reset: reset,
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --grid-border-size: 1px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --modal-background: rgba(21, 21, 22, 0.8);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\nbutton {\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--dark-1, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--dark-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n.modal-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  z-index: 5;\n}\n.modal {\n  padding: 5rem 5rem 4rem 5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--modal-background, rgba(30, 30, 30, 0.7));\n  transition: opacity 0.3s;\n  border-radius: 2rem;\n}\n.modal-title {\n  font-size: calc(var(--font-factor, 1.4rem) * 1.15);\n  margin-bottom: 0.7rem;\n}\n.modal-description {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.75);\n  margin-bottom: 2rem;\n}\n.modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.7);\n  padding: 0.3rem 1rem;\n  border-radius: 0.6rem;\n  box-sizing: border-box;\n}\n.hide-modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.65);\n  padding: 0.3rem 0.8rem;\n  border-radius: 0.6rem;\n  position: relative;\n  box-sizing: border-box;\n  transition: opacity 0.3s;\n  top: 2rem;\n}\n.modal-hidden {\n  opacity: 0;\n  pointer-events: none;\n}\n.modal-mostly-hidden {\n  opacity: 0.25;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;;EAEvB,gBAAgB;EAChB,eAAe;EACf,6BAA6B;EAC7B,eAAe;EACf,yBAAyB;EACzB,yBAAyB;EACzB,yBAAyB;EACzB,0BAA0B;EAC1B,yCAAyC;EACzC,6BAA6B;EAC7B,4BAA4B;EAC5B,8BAA8B;EAC9B,6BAA6B;EAC7B,qBAAqB;;EAErB,+CAA+C;;EAE/C,sDAAsD;EACtD,0DAA0D;;EAE1D,0CAA0C;EAC1C,yCAAyC;EACzC,yCAAyC;EACzC,yCAAyC;;EAEzC,yBAAyB;AAC3B;;AAEA;EACE,wCAAwC;EACxC,4BAA4B;EAC5B,sCAAsC;AACxC;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,iCAAiC;AACnC;AACA;EACE,qBAAqB;EACrB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,iDAAiD;EACjD,kDAAkD;EAClD,qCAAqC;EACrC,gCAAgC;AAClC;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,uBAAuB;EACvB,6BAA6B;EAC7B,cAAc;EACd,8BAA8B;AAChC;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,+DAA+D;EAC/D,sBAAsB;AACxB;AACA;EACE,2CAA2C;EAC3C,oDAAoD;EACpD,qBAAqB;EACrB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,yCAAyC;EACzC,kDAAkD;EAClD,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,4BAA4B;AAC9B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,kBAAkB;AACpB;AACA;;AAEA;AACA;EACE,sCAAsC;EACtC,6DAA6D;EAC7D,sCAAsC;EACtC,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,kDAAkD;AACpD;AACA;EACE,eAAe;EACf,4CAA4C;EAC5C,wBAAwB;EACxB;oDACkD;EAClD,+CAA+C;EAC/C,kCAAkC;EAClC,UAAU;AACZ;AACA;EACE,oDAAoD;AACtD;AACA;EACE,eAAe;EACf,6CAA6C;AAC/C;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,eAAe;EACf,qBAAqB;AACvB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,eAAe;EACf,wCAAwC;AAC1C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,4BAA4B;AAC9B;AACA;EACE;IACE,wBAAwB;EAC1B;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;;AAEA;AACA;;AAEA;AACA;EACE,qCAAqC;EACrC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,2BAA2B;EAC3B,kCAAkC;EAClC,iDAAiD;EACjD,yCAAyC;AAC3C;AACA;EACE,4BAA4B;EAC5B,iCAAiC;EACjC,mBAAmB;AACrB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;EACrB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,iCAAiC;EACjC,oBAAoB;AACtB;AACA;EACE,2BAA2B;EAC3B,uCAAuC;EACvC,iCAAiC;EACjC,uBAAuB;EACvB,uBAAuB;EACvB,qBAAqB;AACvB;AACA;EACE,aAAa;EACb,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,uCAAuC;EACvC,2BAA2B;EAC3B,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;EACT,UAAU;AACZ;AACA;EACE,4BAA4B;EAC5B,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,gEAAgE;EAChE,wBAAwB;EACxB,mBAAmB;AACrB;AACA;EACE,kDAAkD;EAClD,qBAAqB;AACvB;AACA;EACE,kDAAkD;EAClD,mBAAmB;AACrB;AACA;EACE,iDAAiD;EACjD,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,kDAAkD;EAClD,sBAAsB;EACtB,qBAAqB;EACrB,kBAAkB;EAClB,sBAAsB;EACtB,wBAAwB;EACxB,SAAS;AACX;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;AACA;EACE,aAAa;AACf;;AAEA;EACE;IACE,mCAAmC;EACrC;EACA;IACE,YAAY;EACd;EACA;IACE,cAAc;IACd,iBAAiB;EACnB;EACA;IACE,uCAAuC;IACvC,gDAAgD;EAClD;EACA;IACE,yCAAyC;IACzC,kDAAkD;EACpD;EACA;IACE,8CAA8C;IAC9C,kBAAkB;EACpB;AACF","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --grid-border-size: 1px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --modal-background: rgba(21, 21, 22, 0.8);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\nbutton {\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--dark-1, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--dark-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n.modal-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  z-index: 5;\n}\n.modal {\n  padding: 5rem 5rem 4rem 5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--modal-background, rgba(30, 30, 30, 0.7));\n  transition: opacity 0.3s;\n  border-radius: 2rem;\n}\n.modal-title {\n  font-size: calc(var(--font-factor, 1.4rem) * 1.15);\n  margin-bottom: 0.7rem;\n}\n.modal-description {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.75);\n  margin-bottom: 2rem;\n}\n.modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.7);\n  padding: 0.3rem 1rem;\n  border-radius: 0.6rem;\n  box-sizing: border-box;\n}\n.hide-modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.65);\n  padding: 0.3rem 0.8rem;\n  border-radius: 0.6rem;\n  position: relative;\n  box-sizing: border-box;\n  transition: opacity 0.3s;\n  top: 2rem;\n}\n.modal-hidden {\n  opacity: 0;\n  pointer-events: none;\n}\n.modal-mostly-hidden {\n  opacity: 0.25;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdEQUFnRCx5REFBeUQsS0FBSyxxQkFBcUIscURBQXFELHlCQUF5QixLQUFLLEdBQUcsT0FBTyxnRkFBZ0YsWUFBWSxjQUFjLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxjQUFjLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxjQUFjLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sT0FBTyxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFVB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V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBRUFJLDhEQUFBO0FBQ0F6QixzREFBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvYW5pbWF0ZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9kaXNwbGF5LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2ZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2hlbHBlcnMvZW5lbXlsb2dpYy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvbWV5ZXJyZXNldC5jc3MiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzPzkyNGQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnYW1lIGZyb20gJy4vZ2FtZS5qcyc7XG5cbmNvbnN0IGFuaW1hdGUgPSAoKCkgPT4ge1xuICBsZXQgZmxpcENlbGxzID0gW107XG4gIGNvbnN0IGFuaW1hdGlvblJlZnJlc2ggPSAwLjk7XG4gIGNvbnN0IGFuaW1hdGlvbkxlbmd0aCA9IDAuMzU7XG4gIGxldCBmbGlwcGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIGZsaXBDZWxscyA9IFtdO1xuICAgIGZsaXBwaW5nID0gZmFsc2U7XG4gIH1cblxuICBjb25zdCBhZGRUb0ZsaXBDZWxscyA9IChlbGVtZW50KSA9PiB7XG4gICAgZmxpcENlbGxzLnB1c2goZWxlbWVudCk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaXQtZmxpcCcpO1xuICAgIGlmICghZmxpcHBpbmcpIHtcbiAgICAgIGZsaXBwaW5nID0gdHJ1ZTtcbiAgICAgIGZsaXBBbGwoKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmbGlwQWxsID0gKCkgPT4ge1xuICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgIT09IDMpIHtcbiAgICAgIGZsaXBDZWxscy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgICBjZWxsLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJztcbiAgICAgIH0pXG4gICAgICBmbGlwQ2VsbHNbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICBmbGlwQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgY2VsbC5zdHlsZS5hbmltYXRpb24gPSBgaGl0ZmxpcCAke2FuaW1hdGlvbkxlbmd0aH1zIDFgO1xuICAgICAgfSlcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGZsaXBBbGwoKTtcbiAgICAgIH0sIGFuaW1hdGlvblJlZnJlc2ggKiAxMDAwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlc2V0LFxuICAgIGFkZFRvRmxpcENlbGxzLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBhbmltYXRlOyIsImltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuaW1wb3J0IGFuaW1hdGUgZnJvbSAnLi9hbmltYXRlLmpzJztcblxuY29uc3QgZGlzcGxheSA9ICgoKSA9PiB7XG4gIGxldCBncmlkID0gbnVsbDtcbiAgbGV0IHNoYXJlZENvb3JkTGlzdCA9IG51bGw7XG5cbiAgY29uc3QgYWxsSG92ZXJDbGFzc2VzID0gW1xuICAgICdwbGFjZS1ob3ZlcicsXG4gICAgJ3BsYWNlLWhvdmVyLXNvbG8nLFxuICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZCcsXG4gICAgJ3BsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8nLFxuICAgICdwbGFjZS1ob3Zlci1vb2InLFxuICAgICdwbGFjZS1ob3Zlci1vb2Itc29sbydcbiAgXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgpID0+IHtcbiAgICBjbGVhckRpc3BsYXkoKTtcbiAgICBhbmltYXRlLnJlc2V0KCk7XG5cbiAgICBjb25zdCBlbmVteUFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUFyZWEuY2xhc3NMaXN0LmFkZCgnZW5lbXktYXJlYScpO1xuICAgIGNvbnN0IGVuZW15R3JpZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUdyaWRXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2dyaWQtd3JhcHBlcicsICdlbmVteS1ncmlkLXdyYXBwZXInKTtcbiAgICBjb25zdCBlbmVteUdyaWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgZW5lbXlHcmlkTGFiZWwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1sYWJlbCcpO1xuICAgIGVuZW15R3JpZExhYmVsLmlubmVyVGV4dCA9ICdFbmVteSc7XG4gICAgY29uc3QgZW5lbXlEZWxheVRvZ2dsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2g0Jyk7XG4gICAgZW5lbXlEZWxheVRvZ2dsZS5jbGFzc0xpc3QuYWRkKCdlbmVteS1kZWxheS10b2dnbGUnKTtcblxuICAgIC8vIGVuZW15RGVsYXlUb2dnbGUuaW5uZXJUZXh0ID0gZ2FtZS50b2dnbGVEZWxheSgpO1xuICAgIGVuZW15RGVsYXlUb2dnbGUuaW5uZXJUZXh0ID0gJ2RlbGF5IG9uJztcbiAgICBlbmVteURlbGF5VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9IGdhbWUudG9nZ2xlRGVsYXkoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGVuZW15R3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVuZW15R3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ2VuZW15LWdyaWQnKTtcblxuICAgIGNvbnN0IHBsYXllckFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJBcmVhLmNsYXNzTGlzdC5hZGQoJ3BsYXllci1hcmVhJyk7XG4gICAgY29uc3QgcGxheWVyR3JpZFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJHcmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdncmlkLXdyYXBwZXInLCAncGxheWVyLWdyaWQtd3JhcHBlcicpO1xuICAgIGNvbnN0IHBsYXllckdyaWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgcGxheWVyR3JpZExhYmVsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtbGFiZWwnKTtcbiAgICBwbGF5ZXJHcmlkTGFiZWwuaW5uZXJUZXh0ID0gJ1BsYXllcic7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgcGxheWVyR3JpZC5jbGFzc0xpc3QuYWRkKCdncmlkJywgJ3BsYXllci1ncmlkJyk7XG5cbiAgICBjb25zdCBib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBib2FyZHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luZm8tY29udGFpbmVyJyk7XG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbWVDb250YWluZXIuaWQgPSAnZ2FtZS1jb250YWluZXInO1xuXG4gICAgY29uc3QgaW5mb1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBpbmZvVGl0bGUuY2xhc3NMaXN0LmFkZCgnaW5mby10aXRsZScpO1xuICAgIGluZm9UaXRsZS5pbm5lclRleHQgPSAnQmF0dGxlc2hpcCc7XG4gICAgY29uc3QgaW5mb1N0YXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1N0YXRlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2luZm8tc3RhdGUtY29udGFpbmVyJyk7XG4gICAgY29uc3QgaW5mb1N0YXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGluZm9TdGF0ZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXN0YXRlJyk7XG4gICAgaW5mb1N0YXRlLmlubmVyVGV4dCA9IGdhbWUuZ2V0U3RhdGUoKS5uYW1lO1xuICAgIGNvbnN0IGluZm9EZXRhaWxzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb0RldGFpbHMuY2xhc3NMaXN0LmFkZCgnaW5mby1kZXRhaWxzJyk7XG4gICAgY29uc3QgaW5mb1JlbWFpbmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9SZW1haW5pbmcuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmcnKTtcblxuICAgIGNvbnN0IGluZm9SZW1haW5pbmdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nLXRpdGxlJyk7XG4gICAgaW5mb1JlbWFpbmluZ1RpdGxlLmlubmVyVGV4dCA9ICdSZW1haW5pbmcgRW5lbXkgU2hpcHMnO1xuICAgIGluZm9SZW1haW5pbmcuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZ1RpdGxlKTtcblxuICAgIC8vIGVuZW15R3JpZC5zdHlsZVsnYmFja2dyb3VuZC1pbWFnZSddID1cbiAgICAvLyAgICd1cmwoaHR0cHM6Ly9zb3VyY2UudW5zcGxhc2guY29tL3JhbmRvbT9vY2VhbiknO1xuICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vICAgcGxheWVyR3JpZC5zdHlsZVsnYmFja2dyb3VuZC1pbWFnZSddID1cbiAgICAvLyAgICAgJ3VybChodHRwczovL3NvdXJjZS51bnNwbGFzaC5jb20vcmFuZG9tP2JvYXQsYmF0dGxlc2hpcCknO1xuICAgIC8vIH0sIDUwMDApO1xuXG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvVGl0bGUpO1xuICAgIGluZm9TdGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvU3RhdGUpO1xuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1N0YXRlQ29udGFpbmVyKTtcbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9EZXRhaWxzKTtcbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmcpO1xuXG4gICAgZ2FtZUNvbnRhaW5lci5hcHBlbmRDaGlsZChib2FyZHNDb250YWluZXIpO1xuICAgIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb0NvbnRhaW5lcik7XG5cbiAgICBib2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZW5lbXlBcmVhKTtcbiAgICBlbmVteUFyZWEuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkTGFiZWwpO1xuICAgIGVuZW15QXJlYS5hcHBlbmRDaGlsZChlbmVteURlbGF5VG9nZ2xlKTtcbiAgICBlbmVteUFyZWEuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkV3JhcHBlcik7XG4gICAgZW5lbXlHcmlkV3JhcHBlci5hcHBlbmRDaGlsZChlbmVteUdyaWQpO1xuXG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckFyZWEpO1xuICAgIHBsYXllckFyZWEuYXBwZW5kQ2hpbGQocGxheWVyR3JpZExhYmVsKTtcbiAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKHBsYXllckdyaWRXcmFwcGVyKTtcbiAgICBwbGF5ZXJHcmlkV3JhcHBlci5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkKTtcblxuICAgIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXInKTtcbiAgICBpZiAocGFnZUNvbnRhaW5lci5oYXNDaGlsZE5vZGVzKSB7XG4gICAgICBwYWdlQ29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGNoaWxkLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcGFnZUNvbnRhaW5lci5hcHBlbmRDaGlsZChnYW1lQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgaWYgKGUua2V5ID09PSAnLicpIHtcbiAgICAgICAgZ2FtZS50b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgY29uc3QgaG9yVmVyID0gKGdhbWUuZ2V0RGlyZWN0aW9uKCkgPT09ICdlJ1xuICAgICAgICAgID8gJ2hvcml6b250YWwnXG4gICAgICAgICAgOiAndmVydGljYWwnKTtcbiAgICAgICAgbG9nTWVzc2FnZSgnUm90YXRlZCBkaXJlY3Rpb24gdG8gJyArIGhvclZlcik7XG4gICAgICAgIGNsZWFyQ2xhc3MoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1ncmlkJyksIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgIGRpc3BsYXlIb3ZlcigpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGNsZWFyRGlzcGxheSA9ICgpID0+IHtcbiAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtY29udGFpbmVyJyk7XG4gICAgaWYgKGdhbWVDb250YWluZXIpIHtcbiAgICAgIGdhbWVDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZHJhd0dyaWQgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IHBsYXllci5nZXROYW1lKCk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdlbmVteScpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5lbXktZ3JpZCcpO1xuICAgIH0gZWxzZSBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3coJ3BsZWFzZSBzcGVjaWZ5IG93bmVyIGFzIFwiZW5lbXlcIiBvciBcInBsYXllclwiJyk7XG4gICAgfVxuXG4gICAgLy8gQWRkaW5nIGNlbGxzIGFuZCBldmVudCBsaXN0ZW5lcnNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdhbWVib2FyZC5nZXRCb2FyZCgpLmxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkLWNlbGwnKTtcbiAgICAgIGNlbGwuZGF0YXNldC5jZWxsSWQgPSBpO1xuICAgICAgY2VsbC5kYXRhc2V0LnBsYXllciA9IG5hbWU7XG4gICAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgXG4gICAgICBpZiAobmFtZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gaWYgc2hpcCBjYW4gYmUgcGxhY2VkXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGdhbWUuZ2V0U2hpcEZvclBsYWNlbWVudCgpO1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxhY2UtaG92ZXInKSkge1xuICAgICAgICAgICAgICAvLyBwbGFjZSBzaGlwXG4gICAgICAgICAgICAgIGdhbWVib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBjdXJyZW50U2hpcC5zaXplLFxuICAgICAgICAgICAgICAgICAgbmFtZTogY3VycmVudFNoaXAubmFtZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IHNoYXJlZENvb3JkTGlzdFswXSxcbiAgICAgICAgICAgICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgLy8gZGlzcGxheSBwbGFjZWQgc2hpcFxuICAgICAgICAgICAgICBwbGFjZVNoaXAoc2hhcmVkQ29vcmRMaXN0LCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSwgZS50YXJnZXQpO1xuICAgICAgICAgICAgICAvLyBnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50XG4gICAgICAgICAgICAgIGlmIChnYW1lLmFkdmFuY2VTaGlwUGxhY2VtZW50KCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQgPT09ICdlbmVteScpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvb3JkID0gZ2V0Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgICAgICAgY29uc3QgaXNIaXQgPSBnYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhbY29vcmQueCwgY29vcmQueV0pO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobmFtZSArICcgJyArIGRpc3BsYXlDb29yZChpLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSlcbiAgICAgICAgICAgIC8vICAgKyAnICcgKyAoaXNIaXQgPyAnaGl0IScgOiAnbWlzc2VkJykpO1xuICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtdW5jbGlja2VkJyk7XG4gICAgICAgICAgICBpZiAoaXNIaXQgPiAwKSB7XG4gICAgICAgICAgICAgIGFuaW1hdGUuYWRkVG9GbGlwQ2VsbHMoZS50YXJnZXQpO1xuICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcsICdlbmVteS1oaXQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycsICdlbmVteS1taXNzJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNIaXQgPT09IDIpIHtcbiAgICAgICAgICAgICAgbG9nTWVzc2FnZShmYWN0b3J5SGVscGVyLnN1bmtNZXNzYWdlKGNvb3JkLCBnYW1lYm9hcmQsIGdhbWUuZ2V0U3RhdGUoKS5cbiAgICAgICAgICAgICAgICB0YXJnZXQpKVxuICAgICAgICAgICAgICBsb2dSZW1haW5pbmcocGxheWVyLmdldEdhbWVib2FyZCgpLmdldFNoaXBzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2FtZS5hZHZhbmNlU3RhdGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICBkaXNwbGF5SG92ZXIoZS50YXJnZXQsIHBsYXllcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGUpID0+IHtcbiAgICAgICAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkID09PSAwKSB7XG4gICAgICAgICAgICBjbGVhckNsYXNzKGUudGFyZ2V0LnBhcmVudEVsZW1lbnQsIGFsbEhvdmVyQ2xhc3Nlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBncmlkLnN0eWxlWydncmlkLXRlbXBsYXRlLWNvbHVtbnMnXSA9IGByZXBlYXQoJHtNYXRoLnNxcnQoZ2FtZWJvYXJkXG4gICAgICAgIC5nZXRCb2FyZCgpLmxlbmd0aCl9LCAxZnIpYDtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlIb3ZlciA9IChlbGVtZW50LCBwbGF5ZXIpID0+IHtcbiAgICBpZiAoZWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsZXQgaG92ZXJOb2RlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJzpob3ZlcicpO1xuICAgICAgZWxlbWVudCA9IGhvdmVyTm9kZUxpc3QuaXRlbShob3Zlck5vZGVMaXN0Lmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBpZiAocGxheWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHBsYXllciA9IGdhbWUuZ2V0UGxheWVycygpLnBsYXllcjtcbiAgICB9XG5cbiAgICBjb25zdCBnYW1lYm9hcmQgPSBwbGF5ZXIuZ2V0R2FtZWJvYXJkKCk7XG5cbiAgICBjb25zdCBjZWxsQ29vcmQgPSBnZXRDb29yZChlbGVtZW50LmRhdGFzZXQuY2VsbElkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc3QgY3VycmVudFNoaXAgPSBnYW1lLmdldFNoaXBGb3JQbGFjZW1lbnQoKTtcbiAgICBsZXQgY29vcmRMaXN0ID0gbnVsbDtcblxuICAgIC8vIEdldCBjb29yZExpc3QgY2VudGVyZWQgYXJvdW5kIGhvdmVyZWQgY29vcmRpbmF0ZVxuICAgIGNvb3JkTGlzdCA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzQ2VudGVyZWQoXG4gICAgICBjdXJyZW50U2hpcC5zaXplLFxuICAgICAge1xuICAgICAgICBjb29yZDogW2NlbGxDb29yZC54LCBjZWxsQ29vcmQueV0sXG4gICAgICAgIGRpcjogZ2FtZS5nZXREaXJlY3Rpb24oKVxuICAgICAgfVxuICAgICk7XG4gICAgLy8gTnVkZ2UgdGhlIGNvb3JkTGlzdCBvbnRvIHRoZSBib2FyZCBpZiBuZWVkZWRcbiAgICBjb29yZExpc3QgPSBmYWN0b3J5SGVscGVyLm51ZGdlQ29vcmRzT24oY29vcmRMaXN0LFxuICAgICAgZ2FtZWJvYXJkLmdldEJvYXJkKCkpXG5cbiAgICAvLyBVcGRhdGUgc2hhcmVkIGNvb3JkaW5hdGUgbGlzdFxuICAgIHNoYXJlZENvb3JkTGlzdCA9IGNvb3JkTGlzdDtcblxuICAgIC8vIFNob3cgYXZhaWxhYmlsaXR5IHdpdGggaG92ZXIgY29sb3JzXG4gICAgbGV0IGhvdmVyQ2xhc3NlcyA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBmYWN0b3J5SGVscGVyLmNoZWNrSWZPcGVuKGNvb3JkTGlzdCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1zb2xvJywgJ3BsYWNlLWhvdmVyJ11cbiAgICB9XG4gICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICBpZiAoZXJyb3IgPT09ICdjZWxsIG9jY3VwaWVkJykge1xuICAgICAgICBob3ZlckNsYXNzZXMgPSBbJ3BsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8nLFxuICAgICAgICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZCddXG4gICAgICB9IGVsc2UgaWYgKGVycm9yID09PSAnb3V0IG9mIGJvdW5kcycpIHtcbiAgICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1vb2Itc29sbycsXG4gICAgICAgICAgJ3BsYWNlLWhvdmVyLW9vYiddO1xuICAgICAgfVxuICAgIH1cbiAgICBjb29yZExpc3QuZm9yRWFjaChob3ZlckNvb3JkID0+IHtcbiAgICAgIGNvbnN0IGNlbGxJbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoXG4gICAgICAgIFtob3ZlckNvb3JkWzBdLCBob3ZlckNvb3JkWzFdXSwgZ2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICAgICk7XG4gICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuY2hpbGROb2Rlcy5pdGVtKGNlbGxJbmRleCkuXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoaG92ZXJDbGFzc2VzWzFdKTtcbiAgICB9KTtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoaG92ZXJDbGFzc2VzWzBdKTtcbiAgfVxuXG4gIGNvbnN0IGRpc3BsYXlDb29yZCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZE9iaiA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRGcm9tSW5kZXgoaW5kZXgsIGJvYXJkKTtcbiAgICBjb25zdCBjb29yZFRleHQgPSBgWyR7Y29vcmRPYmoueH0sICR7Y29vcmRPYmoueX1dYDtcbiAgICByZXR1cm4gY29vcmRUZXh0O1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmQgPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRPYmogPSBmYWN0b3J5SGVscGVyLmdldENvb3JkRnJvbUluZGV4KGluZGV4LCBib2FyZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNvb3JkT2JqLngsXG4gICAgICB5OiBjb29yZE9iai55LFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcCA9IChjb29yZExpc3QsIGJvYXJkLCBlbGVtZW50KSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIHBhcmVudC5jaGlsZE5vZGVzW2ZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoXG4gICAgICAgIGNvb3JkLCBib2FyZFxuICAgICAgKV0uY2xhc3NMaXN0LmFkZCgnc2hpcC1zdGFuZGluZycpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgY2xlYXJDbGFzcyA9IChwYXJlbnQsIGNsYXNzTmFtZSkgPT4ge1xuICAgIHBhcmVudC5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICdzdHJpbmcnKVxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICBlbHNlXG4gICAgICAgIGNoaWxkLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGxvZ01lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgY29uc3QgaW5mb0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1kZXRhaWxzJyk7XG4gICAgY29uc3QgY3VycmVudE1lc3NhZ2UgPSBpbmZvRGV0YWlscy5maXJzdENoaWxkO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdpbmZvLWRldGFpbHMtbWVzc2FnZScpO1xuICAgIG1lc3NhZ2UuaW5uZXJUZXh0ID0gbXNnO1xuXG4gICAgaWYgKGN1cnJlbnRNZXNzYWdlKSB7XG4gICAgICBpbmZvRGV0YWlscy5pbnNlcnRCZWZvcmUobWVzc2FnZSwgY3VycmVudE1lc3NhZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvRGV0YWlscy5hcHBlbmRDaGlsZChtZXNzYWdlKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbnN0IGxvZ1JlbWFpbmluZyA9IChzaGlwcykgPT4ge1xuICAgIGNvbnN0IGluZm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1jb250YWluZXInKTtcbiAgICBjb25zdCBwcmV2SW5mb1JlbWFpbmluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXJlbWFpbmluZycpO1xuICAgIGlmIChwcmV2SW5mb1JlbWFpbmluZykgaW5mb0NvbnRhaW5lci5yZW1vdmVDaGlsZChwcmV2SW5mb1JlbWFpbmluZyk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb1JlbWFpbmluZy5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZycpO1xuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1JlbWFpbmluZyk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZy10aXRsZScpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5pbm5lclRleHQgPSAnUmVtYWluaW5nIEVuZW15IFNoaXBzJztcbiAgICBpbmZvUmVtYWluaW5nLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmdUaXRsZSk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9SZW1haW5pbmdMaXN0LmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nLWxpc3QnKTtcbiAgICBpbmZvUmVtYWluaW5nLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmdMaXN0KTtcblxuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHtcbiAgICAgICAgY29uc3QgcmVtYWluaW5nU2hpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICByZW1haW5pbmdTaGlwLmNsYXNzTGlzdC5hZGQoJ3JlbWFpbmluZy1zaGlwJyk7XG4gICAgICAgIHJlbWFpbmluZ1NoaXAuaW5uZXJUZXh0ICs9IGAgJHtzaGlwLmdldE5hbWUoKX0gKCR7c2hpcC5nZXRMZW5ndGgoKX0pYDtcblxuICAgICAgICBpbmZvUmVtYWluaW5nTGlzdC5hcHBlbmRDaGlsZChyZW1haW5pbmdTaGlwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGNvbnN0IGxpc3RTdHIgPSBpbmZvUmVtYWluaW5nTGlzdC5pbm5lclRleHQ7XG4gICAgLy8gaW5mb1JlbWFpbmluZ0xpc3QuaW5uZXJUZXh0ID0gbGlzdFN0ci5zdWJzdHJpbmcoMCwgbGlzdFN0ci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlTWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBjb25zdCBpbmZvU3RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1zdGF0ZScpO1xuICAgIGluZm9TdGF0ZS5pbm5lclRleHQgPSBtc2c7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5Um90YXRlQnV0dG9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdGF0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtYnV0dG9uJyk7XG5cbiAgICBjb25zdCByb3RhdGVCdXR0b25UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcm90YXRlQnV0dG9uVGV4dC5jbGFzc0xpc3QuYWRkKCdyb3RhdGUtYnV0dG9uLXRleHQnKTtcbiAgICByb3RhdGVCdXR0b25UZXh0LmlubmVyVGV4dCA9ICdSb3RhdGUnO1xuXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdGF0ZUJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgncm90YXRlLWJ1dHRvbi1pY29uJyk7XG4gICAgcm90YXRlQnV0dG9uSWNvbi5pbm5lclRleHQgPSAnLic7XG5cbiAgICByb3RhdGVCdXR0b24uYXBwZW5kQ2hpbGQocm90YXRlQnV0dG9uVGV4dCk7XG4gICAgcm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbkljb24pO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXN0YXRlLWNvbnRhaW5lcicpLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvbik7XG5cbiAgICByb3RhdGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZ2FtZS50b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgIGNvbnN0IGhvclZlciA9IChnYW1lLmdldERpcmVjdGlvbigpID09PSAnZSdcbiAgICAgICAgPyAnaG9yaXpvbnRhbCdcbiAgICAgICAgOiAndmVydGljYWwnKTtcbiAgICAgIGxvZ01lc3NhZ2UoJ1JvdGF0ZWQgZGlyZWN0aW9uIHRvICcgKyBob3JWZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcmVtb3ZlUm90YXRlQnV0dG9uID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb3RhdGUtYnV0dG9uJykucmVtb3ZlKCk7XG4gIH1cblxuICBjb25zdCBtYWtlQ2VsbHNVbmNsaWNrZWQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKS5jaGlsZE5vZGVzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAoY2VsbC5jbGFzc0xpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsLXVuY2xpY2tlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgcmVtb3ZlQ2VsbHNVbmNsaWNrZWQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKS5jaGlsZE5vZGVzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2dyaWQtY2VsbC11bmNsaWNrZWQnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIG9wdGlvbnMgPSB7IHRpdGxlLCBkZXNjcmlwdGlvbiwgYnV0dG9uVGV4dCwgaGlkZUJ1dHRvblRleHQsIGNhbGxiYWNrIH1cbiAgY29uc3QgbWFrZU1vZGFsID0gKG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGNvbnN0IHBhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFnZS1jb250YWluZXInKTtcbiAgICBjb25zdCBnYW1lQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2dhbWUtY29udGFpbmVyJyk7XG5cbiAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnbW9kYWwnKTtcbiAgICBjb25zdCBtb2RhbFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBtb2RhbFRpdGxlLmNsYXNzTGlzdC5hZGQoJ21vZGFsLXRpdGxlJyk7XG4gICAgbW9kYWxUaXRsZS5pbm5lclRleHQgPSBvcHRpb25zLnRpdGxlO1xuICAgIGNvbnN0IG1vZGFsRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIG1vZGFsRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgnbW9kYWwtZGVzY3JpcHRpb24nKTtcbiAgICBtb2RhbERlc2NyaXB0aW9uLmlubmVyVGV4dCA9IG9wdGlvbnMuZGVzY3JpcHRpb247XG4gICAgY29uc3QgbW9kYWxCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBtb2RhbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdtb2RhbC1idXR0b24nKTtcbiAgICBtb2RhbEJ1dHRvbi5pbm5lclRleHQgPSBvcHRpb25zLmJ1dHRvblRleHQ7XG4gICAgY29uc3QgaGlkZU1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgaGlkZU1vZGFsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGUtbW9kYWwtYnV0dG9uJyk7XG4gICAgaGlkZU1vZGFsQnV0dG9uLmlubmVyVGV4dCA9IG9wdGlvbnMuaGlkZUJ1dHRvblRleHQ7XG5cbiAgICBtb2RhbENvbnRhaW5lci5hcHBlbmRDaGlsZChtb2RhbCk7XG4gICAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQoaGlkZU1vZGFsQnV0dG9uKTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbFRpdGxlKTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbERlc2NyaXB0aW9uKTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChtb2RhbEJ1dHRvbik7XG5cbiAgICBib2R5Lmluc2VydEJlZm9yZShtb2RhbENvbnRhaW5lciwgcGFnZUNvbnRhaW5lcik7XG5cbiAgICBtb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrKCk7XG4gICAgICBtb2RhbENvbnRhaW5lci5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGhpZGVNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAobW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb2RhbC1oaWRkZW4nKSkge1xuICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1oaWRkZW4nKTtcbiAgICAgICAgaGlkZU1vZGFsQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ21vZGFsLW1vc3RseS1oaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWhpZGRlbicpO1xuICAgICAgICBoaWRlTW9kYWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnbW9kYWwtbW9zdGx5LWhpZGRlbicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0aWFsaXplLFxuICAgIGNsZWFyRGlzcGxheSxcbiAgICBkcmF3R3JpZCxcbiAgICBsb2dNZXNzYWdlLFxuICAgIHN0YXRlTWVzc2FnZSxcbiAgICBsb2dSZW1haW5pbmcsXG4gICAgZGlzcGxheVJvdGF0ZUJ1dHRvbixcbiAgICByZW1vdmVSb3RhdGVCdXR0b24sXG4gICAgbWFrZUNlbGxzVW5jbGlja2VkLFxuICAgIHJlbW92ZUNlbGxzVW5jbGlja2VkLFxuICAgIG1ha2VNb2RhbCxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheTsiLCJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzJztcblxuZXhwb3J0IGNvbnN0IHBsYXllckZhY3RvcnkgPSAobXlOYW1lLCBib2FyZFNpemUpID0+IHtcbiAgY29uc3QgbmFtZSA9IG15TmFtZTtcbiAgY29uc3QgZ2FtZWJvYXJkID0gZ2FtZWJvYXJkRmFjdG9yeShib2FyZFNpemUpO1xuICBjb25zdCBhdHRhY2tlZFNwYWNlcyA9IFtdO1xuXG4gIGNvbnN0IGdldEdhbWVib2FyZCA9ICgpID0+IHsgcmV0dXJuIGdhbWVib2FyZDsgfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4geyByZXR1cm4gbmFtZTsgfTtcblxuICBjb25zdCBhdHRhY2sgPSAoY29vcmQsIGVuZW15UGxheWVyKSA9PiB7XG4gICAgbGV0IGFscmVhZHlBdHRhY2tlZCA9IGZhbHNlO1xuICAgIGF0dGFja2VkU3BhY2VzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChjZWxsLCBjb29yZCkpIHtcbiAgICAgICAgYWxyZWFkeUF0dGFja2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICghYWxyZWFkeUF0dGFja2VkKSB7XG4gICAgICB0cnkge1xuICAgICAgICBlbmVteVBsYXllci5nZXRHYW1lYm9hcmQoKS5yZWNlaXZlQXR0YWNrKGNvb3JkKTtcbiAgICAgICAgYXR0YWNrZWRTcGFjZXMucHVzaChjb29yZCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aHJvdyAoZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdhbHJlYWR5IGF0dGFja2VkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRHYW1lYm9hcmQsXG4gICAgZ2V0TmFtZSxcbiAgICBhdHRhY2ssXG4gIH1cbn1cblxuLy8gcHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMsIG5hbWUgfVxuZXhwb3J0IGNvbnN0IHNoaXBGYWN0b3J5ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgY29uc3QgaGl0cyA9IHByb3BzLmluaXRpYWxIaXRzIHx8IFtdO1xuICBjb25zdCBuYW1lID0gcHJvcHMubmFtZTtcblxuICBjb25zdCBoaXQgPSAoY29vcmQpID0+IHtcbiAgICBpZiAoIWhpdHMuaW5jbHVkZXMoY29vcmQpKSB7XG4gICAgICBoaXRzLnB1c2goY29vcmQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBpc1N1bmsgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGhpdHMubGVuZ3RoID09PSBsZW5ndGg7XG4gIH1cblxuICBjb25zdCBnZXRMZW5ndGggPSAoKSA9PiB7IHJldHVybiBsZW5ndGggfTtcblxuICBjb25zdCBnZXROYW1lID0gKCkgPT4geyByZXR1cm4gbmFtZSB9O1xuXG4gIHJldHVybiB7XG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgICBnZXRMZW5ndGgsXG4gICAgZ2V0TmFtZSxcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2FtZWJvYXJkRmFjdG9yeSA9IChzaXplKSA9PiB7XG4gIGxldCBib2FyZCA9IFtdO1xuICBjb25zdCBpbml0aWFsaXplID0gKCgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaXplOyBqKyspIHtcbiAgICAgICAgYm9hcmQucHVzaCh7XG4gICAgICAgICAgY29vcmQ6IFtqLCBpXSxcbiAgICAgICAgICBoaXQ6IDAsXG4gICAgICAgICAgc2hpcElkOiBudWxsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIGNvbnN0IHNoaXBzID0gW107XG5cbiAgY29uc3QgYWxsU2hpcHNTdW5rID0gKCkgPT4ge1xuICAgIGxldCBzdW5rID0gdHJ1ZTtcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSBzdW5rID0gZmFsc2U7XG4gICAgfSlcbiAgICByZXR1cm4gc3VuaztcbiAgfVxuXG4gIC8vIHNoaXBQcm9wcyA9IHsgbGVuZ3RoLCBpbml0aWFsSGl0cyB9XG4gIC8vIGxvY2F0aW9uUHJvcHMgPSB7IGNvb3JkOiBbeCwgeV0sIGRpcjogKCdlJyB8fCAncycpIH1cbiAgY29uc3QgcGxhY2VTaGlwID0gKHNoaXBQcm9wcywgbG9jYXRpb25Qcm9wcykgPT4ge1xuICAgIGxldCBwbGFjZWRTaGlwSWQgPSBudWxsO1xuICAgIGxldCBwbGFjZWRDb29yZHMgPSB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIHBsYWNlZENvb3JkcyA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzSWZPcGVuKFxuICAgICAgICBzaGlwUHJvcHMubGVuZ3RoLCBsb2NhdGlvblByb3BzLCBib2FyZCk7XG4gICAgICBwbGFjZWRTaGlwSWQgPSBzaGlwcy5wdXNoKHNoaXBGYWN0b3J5KHNoaXBQcm9wcykpIC0gMTtcbiAgICAgIGJvYXJkID0gYm9hcmQubWFwKGNlbGwgPT4ge1xuICAgICAgICBsZXQgbmV3Q2VsbCA9IGNlbGw7XG4gICAgICAgIHBsYWNlZENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChjZWxsLmNvb3JkLCBjb29yZCkpIHtcbiAgICAgICAgICAgIG5ld0NlbGwgPSB7XG4gICAgICAgICAgICAgIGNvb3JkOiBjb29yZCxcbiAgICAgICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgICAgICBzaGlwSWQ6IHBsYWNlZFNoaXBJZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmV3Q2VsbDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgKGUpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChjb29yZCwgYm9hcmQpO1xuICAgIGlmIChib2FyZFtpbmRleF0uaGl0ICE9PSAwKSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBoaXQnKTtcbiAgICB9XG4gICAgY29uc3Qgc2hpcElkID0gYm9hcmRbaW5kZXhdLnNoaXBJZDtcbiAgICBpZiAoc2hpcElkID09PSBudWxsKSB7XG4gICAgICBib2FyZFtpbmRleF0uaGl0ID0gLTE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IDE7XG4gICAgICBzaGlwc1tzaGlwSWRdLmhpdChjb29yZCk7XG4gICAgICBpZiAoc2hpcHNbc2hpcElkXS5pc1N1bmsoKSkge1xuICAgICAgICByZXR1cm4gMjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldFNoaXBzID0gKCkgPT4geyByZXR1cm4gc2hpcHMgfTtcblxuICBjb25zdCBnZXRVbnN1bmtTaGlwcyA9ICgpID0+IHtcbiAgICBjb25zdCB1bnN1bmtTaGlwcyA9IFtdO1xuICAgIHNoaXBzLmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKCkpIHVuc3Vua1NoaXBzLnB1c2goc2hpcCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHVuc3Vua1NoaXBzO1xuICB9XG5cbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiB7IHJldHVybiBib2FyZCB9O1xuXG4gIHJldHVybiB7XG4gICAgYWxsU2hpcHNTdW5rLFxuICAgIHBsYWNlU2hpcCxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIGdldFNoaXBzLFxuICAgIGdldFVuc3Vua1NoaXBzLFxuICAgIGdldEJvYXJkLFxuICB9XG59IiwiaW1wb3J0IGRpc3BsYXkgZnJvbSAnLi9kaXNwbGF5LmpzJztcbmltcG9ydCB7IGdhbWVib2FyZEZhY3RvcnksIHBsYXllckZhY3RvcnksIHNoaXBGYWN0b3J5IH0gZnJvbSAnLi4vc3JjL2ZhY3Rvcmllcy5qcyc7XG5pbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5pbXBvcnQgbG9naWMgZnJvbSAnLi9oZWxwZXJzL2VuZW15bG9naWMuanMnO1xuXG5jb25zdCBnYW1lID0gKCgpID0+IHtcbiAgY29uc3QgZW5lbXlEZWxheU1heEluaXRpYWwgPSAyO1xuICBsZXQgZW5lbXlEZWxheU1heCA9IDA7XG4gIGNvbnN0IHN0YXRlcyA9IFtcbiAgICB7XG4gICAgICBpZDogMCxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIG5hbWU6ICdQbGFjZSB5b3VyIHNoaXBzJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDEsXG4gICAgICB0YXJnZXQ6ICdlbmVteScsXG4gICAgICBuYW1lOiBcIlBsYXllcidzIHR1cm5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICB0YXJnZXQ6ICdwbGF5ZXInLFxuICAgICAgbmFtZTogXCJFbmVteSdzIHR1cm5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDMsXG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBuYW1lOiBcIkdhbWUgZmluaXNoZWRcIlxuICAgIH1cbiAgXTtcbiAgbGV0IHBvc3NpYmxlRW5lbXlBdHRhY2tzID0gbnVsbDtcbiAgbGV0IHN0YXRlID0gc3RhdGVzWzBdO1xuICBsZXQgc2hpcExpc3Q7XG4gIGxldCBjdXJyZW50U2hpcDtcbiAgbGV0IGRpcmVjdGlvbjtcbiAgbGV0IHBsYXllcjEgPSBudWxsO1xuICBsZXQgZW5lbXkxID0gbnVsbDtcblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBsb2dpYy5yZXNldCgpO1xuXG4gICAgZW5lbXlEZWxheU1heCA9IGVuZW15RGVsYXlNYXhJbml0aWFsO1xuICAgIHN0YXRlID0gc3RhdGVzWzBdO1xuICAgIHNoaXBMaXN0ID0gW1xuICAgICAgeyBuYW1lOiAnQ2FycmllcicsIHNpemU6IDUgfSxcbiAgICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0IH0sXG4gICAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXG4gICAgICB7IG5hbWU6ICdTdWJtYXJpbmUnLCBzaXplOiAzIH0sXG4gICAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIgfVxuICAgIF07XG4gICAgY3VycmVudFNoaXAgPSAwO1xuICAgIGRpcmVjdGlvbiA9ICdlJztcblxuICAgIHBsYXllcjEgPSBwbGF5ZXJGYWN0b3J5KCdwbGF5ZXInLCAxMCk7XG4gICAgZW5lbXkxID0gcGxheWVyRmFjdG9yeSgnZW5lbXknLCAxMCk7XG4gICAgcG9zc2libGVFbmVteUF0dGFja3MgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmdldEJvYXJkKCk7XG5cbiAgICBkaXNwbGF5LmRyYXdHcmlkKHBsYXllcjEpO1xuICAgIGRpc3BsYXkuZHJhd0dyaWQoZW5lbXkxKTtcblxuICAgIHBsYWNlUmFuZG9tU2hpcHMoZW5lbXkxKTtcbiAgICBkaXJlY3Rpb24gPSAnZSc7XG4gICAgZGlzcGxheS5kaXNwbGF5Um90YXRlQnV0dG9uKCk7XG4gICAgZGlzcGxheS5sb2dNZXNzYWdlKCdQbGFjZSB5b3VyICcgKyBzaGlwTGlzdFtjdXJyZW50U2hpcF0ubmFtZSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcEZvclBsYWNlbWVudCA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcExpc3RbY3VycmVudFNoaXBdO1xuICB9XG5cbiAgY29uc3QgYWR2YW5jZVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRTaGlwIDwgNCkge1xuICAgICAgY3VycmVudFNoaXAgKys7XG4gICAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoJ1BsYWNlIHlvdXIgJyArIHNoaXBMaXN0W2N1cnJlbnRTaGlwXS5uYW1lKTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5LmxvZ1JlbWFpbmluZyhlbmVteTEuZ2V0R2FtZWJvYXJkKCkuZ2V0U2hpcHMoKSk7XG4gICAgICBkaXNwbGF5Lm1ha2VDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgYWR2YW5jZVN0YXRlKCk7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZHZhbmNlU3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnRW5lbXkgd2lucy4nKTtcbiAgICAgIGRpc3BsYXkucmVtb3ZlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgICAgZGlzcGxheS5tYWtlTW9kYWwoe1xuICAgICAgICB0aXRsZTogJ0VuZW15IHdpbnMuJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCZXR0ZXIgbHVjayBuZXh0IHRpbWUuJyxcbiAgICAgICAgYnV0dG9uVGV4dDogJ1BsYXkgYWdhaW4nLFxuICAgICAgICBoaWRlQnV0dG9uVGV4dDogJ0hpZGUnLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4geyBcbiAgICAgICAgICBkaXNwbGF5LmluaXRpYWxpemUoKTtcbiAgICAgICAgICBnYW1lLnN0YXJ0KCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJZb3UndmUgY2xpY2tlZCB0aGUgYnV0dG9uXCIpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChlbmVteTEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnWW91IHdpbiEnKTtcbiAgICAgIGRpc3BsYXkucmVtb3ZlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgICAgZGlzcGxheS5tYWtlTW9kYWwoe1xuICAgICAgICB0aXRsZTogJ1lvdSB3aW4hJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiWW91IHN1bmsgYWxsIHRoZSBlbmVteSdzIGJhdHRsZXNoaXBzLlwiLFxuICAgICAgICBidXR0b25UZXh0OiAnUGxheSBhZ2FpbicsXG4gICAgICAgIGhpZGVCdXR0b25UZXh0OiAnSGlkZScsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7IFxuICAgICAgICAgIGRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgIGdhbWUuc3RhcnQoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSd2ZSBjbGlja2VkIHRoZSBidXR0b25cIilcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5pZCA9PT0gMCkge1xuICAgICAgICBkaXNwbGF5LnJlbW92ZVJvdGF0ZUJ1dHRvbigpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuaWQgPT09IDEpIHtcbiAgICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1syXTtcbiAgICAgICAgY29uc3QgZGVsYXlUaW1lID0gKGVuZW15RGVsYXlNYXggLyA0ICtcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogZW5lbXlEZWxheU1heCAqIDMgLyA0KSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdEZWxheWluZyAnICsgZGVsYXlUaW1lICsgJyBzZWNvbmRzJyk7XG4gICAgICAgIGlmIChkZWxheVRpbWUgIT09IDApIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGVuZW15UmFuZG9tQXR0YWNrKCk7XG4gICAgICAgICAgfSwgMTAwMCAqIGRlbGF5VGltZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5lbXlSYW5kb21BdHRhY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlzcGxheS5tYWtlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgICAgc3RhdGUgPSBzdGF0ZXNbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGlzcGxheS5zdGF0ZU1lc3NhZ2Uoc3RhdGUubmFtZSk7XG4gIH1cblxuICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+IHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBnZXREaXJlY3Rpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRpcmVjdGlvbjtcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZURpcmVjdGlvbiA9ICgpID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIGRpcmVjdGlvbiA9ICdzJztcbiAgICBlbHNlIGRpcmVjdGlvbiA9ICdlJztcbiAgfVxuXG4gIGNvbnN0IGdldFBsYXllcnMgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBsYXllcjogcGxheWVyMSxcbiAgICAgIGVuZW15OiBlbmVteTFcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVJhbmRvbVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IGJvYXJkU2l6ZSA9IE1hdGguc3FydChwbGF5ZXIuZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKS5sZW5ndGgpO1xuICAgIHNoaXBMaXN0LmZvckVhY2goc2hpcCA9PiB7XG4gICAgICBsZXQgc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgd2hpbGUgKHN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGlmIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKSA9PT0gMCkgdG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGxldCBjb29yZFggPSBudWxsO1xuICAgICAgICBsZXQgY29vcmRZID0gbnVsbDtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2UnKSB7XG4gICAgICAgICAgY29vcmRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICAgIGNvb3JkWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNpemUgLSAxKSkpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHBsYXllci5nZXRHYW1lYm9hcmQoKS5wbGFjZVNoaXAoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGxlbmd0aDogc2hpcC5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBzaGlwLm5hbWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbY29vcmRYLCBjb29yZFldLFxuICAgICAgICAgICAgICBkaXI6IGRpcmVjdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICkpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBwbGFjZSBhIHNoaXAsIHRyeWluZyBhZ2FpbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBlbmVteVJhbmRvbUF0dGFjayA9ICgpID0+IHtcbiAgICBjb25zdCBhdHRhY2tDb29yZCA9IGxvZ2ljLmdldE1vdmUocG9zc2libGVFbmVteUF0dGFja3MpO1xuICAgIGNvbnNvbGUubG9nKCdDT09SRDogJyk7XG4gICAgY29uc29sZS5sb2coeyBhdHRhY2tDb29yZCB9KTtcbiAgICBjb25zdCBkaWRIaXQgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLnJlY2VpdmVBdHRhY2soYXR0YWNrQ29vcmQpO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyLWdyaWQnKTtcbiAgICBjb25zdCBhdHRhY2tDZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKGF0dGFja0Nvb3JkLCBwbGF5ZXIxLlxuICAgICAgZ2V0R2FtZWJvYXJkKCkuZ2V0Qm9hcmQoKSk7XG4gICAgaWYgKGRpZEhpdCA+IDApIHtcbiAgICAgIHBsYXllckdyaWQuY2hpbGROb2Rlcy5pdGVtKGF0dGFja0NlbGxJbmRleCkuY2xhc3NMaXN0LmFkZCgnaGl0JywgJ3BsYXllci1oaXQnKTtcbiAgICAgIGxvZ2ljLnByb2Nlc3NIaXQoYXR0YWNrQ29vcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwbGF5ZXJHcmlkLmNoaWxkTm9kZXMuaXRlbShhdHRhY2tDZWxsSW5kZXgpLmNsYXNzTGlzdC5hZGQoJ21pc3MnLCAncGxheWVyLW1pc3MnKTtcbiAgICAgIGxvZ2ljLnByb2Nlc3NNaXNzKGF0dGFja0Nvb3JkKTtcbiAgICB9XG4gICAgaWYgKGRpZEhpdCA9PT0gMikge1xuICAgICAgZGlzcGxheS5sb2dNZXNzYWdlKGZhY3RvcnlIZWxwZXIuc3Vua01lc3NhZ2UoYXR0YWNrQ29vcmQsXG4gICAgICAgIHBsYXllcjEuZ2V0R2FtZWJvYXJkKCksIGdhbWUuZ2V0U3RhdGUoKS50YXJnZXQpKVxuICAgICAgbG9naWMucHJvY2Vzc1N1bmsoYXR0YWNrQ29vcmQpO1xuICAgIH1cbiAgICBhZHZhbmNlU3RhdGUoKTtcbiAgfVxuXG4gIGNvbnN0IHRvZ2dsZURlbGF5ID0gKCkgPT4ge1xuICAgIGlmIChlbmVteURlbGF5TWF4ID09PSAwKSB7XG4gICAgICBlbmVteURlbGF5TWF4ID0gZW5lbXlEZWxheU1heEluaXRpYWw7XG4gICAgICByZXR1cm4gJ2RlbGF5IG9uJztcbiAgICB9IGVsc2Uge1xuICAgICAgZW5lbXlEZWxheU1heCA9IDA7XG4gICAgICByZXR1cm4gJ2RlbGF5IG9mZic7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzdGFydCxcbiAgICBnZXRTaGlwRm9yUGxhY2VtZW50LFxuICAgIGFkdmFuY2VTaGlwUGxhY2VtZW50LFxuICAgIGFkdmFuY2VTdGF0ZSxcbiAgICBnZXRTdGF0ZSxcbiAgICBnZXREaXJlY3Rpb24sXG4gICAgdG9nZ2xlRGlyZWN0aW9uLFxuICAgIGdldFBsYXllcnMsXG4gICAgdG9nZ2xlRGVsYXksXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdhbWU7IiwiaW1wb3J0IGdhbWUgZnJvbSAnLi4vZ2FtZS5qcyc7XG5pbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2ZhY3RvcnloZWxwZXIuanMnO1xuXG5jb25zdCBlbmVteUxvZ2ljID0gKCgpID0+IHtcbiAgbGV0IHBsYXllckdhbWVib2FyZCA9IG51bGw7XG4gIGxldCBhY3RpdmVIaXRzID0gW107XG4gIC8vIHsgY29vcmRzLCBuZXh0TW92ZXMsIGRBeGlzIH1cbiAgbGV0IGFjdGl2ZVNoaXBzID0gW107XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgcGxheWVyR2FtZWJvYXJkID0gbnVsbDtcbiAgICBhY3RpdmVIaXRzID0gW107XG4gICAgYWN0aXZlU2hpcHMgPSBbXTtcbiAgfVxuXG4gIGNvbnN0IHByb2Nlc3NIaXQgPSAoY29vcmQpID0+IHtcbiAgICBhY3RpdmVIaXRzLnB1c2goY29vcmQpO1xuXG4gICAgLy8gVXBkYXRlIG9yIGNyZWF0ZSBzaGlwIGluIGFjdGl2ZVNoaXBzXG4gICAgaWYgKGFjdGl2ZVNoaXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCQiB1cGRhdGluZyBhY3RpdmUgc2hpcCcpO1xuICAgICAgdXBkYXRlQWN0aXZlU2hpcCh7IGNvb3JkOiBjb29yZCB9KTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZUhpdHMubGVuZ3RoID09PSAyKSB7XG4gICAgICBjb25zb2xlLmxvZygnQkIgY3JlYXRpbmcgYWN0aXZlIHNoaXAnKTtcbiAgICAgIGNvbnN0IG5ld1NoaXAgPSB7XG4gICAgICAgIGNvb3JkczogW2FjdGl2ZUhpdHNbMF0sIGFjdGl2ZUhpdHNbMV1dXG4gICAgICB9XG4gICAgICBhY3RpdmVTaGlwcy5wdXNoKG5ld1NoaXApO1xuICAgICAgbmV3U2hpcC5kQXhpcyA9IChuZXdTaGlwLmNvb3Jkc1swXVswXSA9PT0gbmV3U2hpcC5jb29yZHNbMV1bMF0pID8gJ3MnIDogJ2UnO1xuICAgICAgY29uc29sZS5sb2coYWN0aXZlU2hpcHNbMF0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHByb2Nlc3NNaXNzID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVNoaXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIGdldE5leHRNb3ZlcyhhY3RpdmVTaGlwc1swXSk7XG4gICAgfSBlbHNlIGlmIChhY3RpdmVIaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChnZXRBZGphY2VudERhdGEoYWN0aXZlSGl0c1swXSkuZW1wdHkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGFjdGl2ZUhpdHMuc3BsaWNlKDAsIDEpO1xuICAgICAgICBjb25zb2xlLmxvZygnZXhoYXVzdGVkIGhpdCwgcmVtb3ZpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2coYWN0aXZlSGl0cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvY2Vzc1N1bmsgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBzdW5rU2hpcENvb3JkcyA9IGZhY3RvcnlIZWxwZXIuZ2V0Q29vcmRzT2ZTaGlwKGZhY3RvcnlIZWxwZXIuXG4gICAgICBnZXRTaGlwSWRBdENvb3JkKGNvb3JkLCBwbGF5ZXJHYW1lYm9hcmQpLCBwbGF5ZXJHYW1lYm9hcmQpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdzdW5rU2hpcENvb3JkczogJyk7XG4gICAgY29uc29sZS5sb2coc3Vua1NoaXBDb29yZHMpO1xuXG4gICAgLy8gRGVsZXRlIGFsbCBtYXRjaGluZyBoaXRzXG4gICAgY29uc29sZS5sb2coJ0JCIGRlbGV0aW5nIG1hdGNoaW5nIGhpdHMnKTtcbiAgICBmb3IgKGxldCBpID0gYWN0aXZlSGl0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgc3Vua1NoaXBDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKGFjdGl2ZUhpdHNbaV0sIGNvb3JkKSkge1xuICAgICAgICAgIGFjdGl2ZUhpdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBEZWxldGUgbWF0Y2hpbmcgc2hpcFxuICAgIGNvbnNvbGUubG9nKCdCQiBkZWxldGluZyBtYXRjaGluZyBzaGlwJyk7XG4gICAgLy8gQWRkIHRoZSBzdW5rIGhpdCB0byBzaGlwIG1lbW9yeVxuICAgIGlmIChhY3RpdmVTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnVEhFUkUgQVJFIE1VTFRJUExFIEFDVElWRSBTSElQUyEnKTtcbiAgICB9XG4gICAgYWN0aXZlU2hpcHNbMF0uY29vcmRzLnB1c2goY29vcmQpO1xuICAgIGxldCBzcGxpY2VTaGlwID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZVNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzdW5rU2hpcENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgYWN0aXZlU2hpcHNbaV0uY29vcmRzLmZvckVhY2goYUNvb3JkID0+IHtcbiAgICAgICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChhQ29vcmQsIGNvb3JkKSkge1xuICAgICAgICAgICAgc3BsaWNlU2hpcCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzcGxpY2VTaGlwICE9PSBudWxsKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3BsaWNpbmcuLi4nKTtcbiAgICAgIGFjdGl2ZVNoaXBzLnNwbGljZShzcGxpY2VTaGlwLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgKFwiRGlkbid0IGZpbmQgc2hpcCB0byBzcGxpY2VcIik7XG4gICAgfVxuXG5cbiAgICBjb25zb2xlLmxvZygnYWN0aXZlSGl0cyBhbmQgYWN0aXZlU2hpcHM6Jyk7XG4gICAgY29uc29sZS5sb2coYWN0aXZlSGl0cyk7XG4gICAgY29uc29sZS5sb2coYWN0aXZlU2hpcHMpO1xuICB9XG5cbiAgY29uc3QgZ2V0TW92ZSA9IChwb3NzaWJsZUVuZW15QXR0YWNrcykgPT4ge1xuICAgIC8vIEdldCBwbGF5ZXJHYW1lYm9hcmQgb25jZVxuICAgIGlmIChwbGF5ZXJHYW1lYm9hcmQgPT09IG51bGwpIHBsYXllckdhbWVib2FyZCA9IGdhbWUuZ2V0UGxheWVycygpLnBsYXllci5nZXRHYW1lYm9hcmQoKTtcblxuICAgIGlmIChhY3RpdmVTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBUaGVyZSBpcyBhIHNoaXAuIFNwbGljZSBuZXh0TW92ZSBmcm9tIHNoaXAgYW5kIHJldHVybiBpdC5cbiAgICAgIGNvbnNvbGUubG9nKCdCQiBnZXR0aW5nIG5leHRtb3ZlIGZyb20gYWN0aXZlc2hpcCcpO1xuICAgICAgbGV0IHNoaXAgPSBhY3RpdmVTaGlwc1swXTtcbiAgICAgIGlmICghc2hpcC5uZXh0TW92ZXMgfHwgIXNoaXAubmV4dE1vdmVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZ2V0TmV4dE1vdmVzKHNoaXApO1xuICAgICAgfVxuICAgICAgY29uc3QgcmFuZG9tTmV4dCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNoaXAubmV4dE1vdmVzLmxlbmd0aCk7XG5cbiAgICAgIHNwbGljZUNvb3JkRnJvbVBFQShzaGlwLm5leHRNb3Zlc1tyYW5kb21OZXh0XSwgcG9zc2libGVFbmVteUF0dGFja3MpO1xuICAgICAgcmV0dXJuIHNoaXAubmV4dE1vdmVzLnNwbGljZShyYW5kb21OZXh0LCAxKVswXTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZUhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5sb2coJ0JCIGFkamFjZW50IG1vdmUgZnJvbSBoaXQnKTtcbiAgICAgIC8vIE5vIHNoaXBzLCBidXQgdGhlcmUgYXJlIGhpdHMuIFRyeSBhZGphY2VudC5cbiAgICAgIGNvbnN0IGFkamFjZW50RW1wdHkgPSBnZXRBZGphY2VudERhdGEoYWN0aXZlSGl0c1swXSkuZW1wdHk7XG4gICAgICBjb25zdCByYW5kb21BZGphY2VudCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFkamFjZW50RW1wdHkubGVuZ3RoKTtcblxuICAgICAgc3BsaWNlQ29vcmRGcm9tUEVBKGFkamFjZW50RW1wdHlbcmFuZG9tQWRqYWNlbnRdLCBwb3NzaWJsZUVuZW15QXR0YWNrcyk7XG4gICAgICByZXR1cm4gYWRqYWNlbnRFbXB0eS5zcGxpY2UocmFuZG9tQWRqYWNlbnQsIDEpWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZygnQkIgZ2V0dGluZyByYW5kb20nKTtcbiAgICAgIC8vIE5vIHNoaXBzIG9yIGhpdHMsIHJldHVybiBhbnkgcmFuZG9tLlxuICAgICAgY29uc3QgcmFuZG9tID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zc2libGVFbmVteUF0dGFja3MubGVuZ3RoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdzcGxpY2luZyByYW5kb20nKTtcbiAgICAgIGNvbnN0IHJhbmRvbUF0dGFjayA9IHBvc3NpYmxlRW5lbXlBdHRhY2tzLnNwbGljZShyYW5kb20sIDEpO1xuICAgICAgcmV0dXJuIHJhbmRvbUF0dGFja1swXS5jb29yZDtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgY3VycmVudCBhY3RpdmUgc2hpcCdzIG5leHRNb3ZlcyB0byB0aGUgbmV4dCBvcGVuIHNwb3RzIGFsb25nIGRBeGlzXG4gIC8vIElmIHRoZXJlIGFyZW4ndCBhbnkgbW9yZSBhdmFpbGFibGUgbW92ZXMsIGZsaXAgYWxsIGNvb3JkcyB0byBuZXcgc2hpcHMuXG4gIGNvbnN0IHVwZGF0ZUFjdGl2ZVNoaXAgPSAoeyBjb29yZCwgZmxpcERBeGlzIH0pID0+IHtcbiAgICBsZXQgc2hpcCA9IGFjdGl2ZVNoaXBzWzBdO1xuICAgIHNoaXAuY29vcmRzLnB1c2goY29vcmQpO1xuICAgIGlmIChmbGlwREF4aXMpIHtcbiAgICAgIHNoaXAuZEF4aXMgPSAoc2hpcC5kQXhpcyA9PT0gJ2UnKSA/ICdzJyA6ICdlJztcbiAgICB9IGVsc2UgaWYgKHNoaXAuZEF4aXMgPT09IG51bGwpIHtcbiAgICAgIHNoaXAuZEF4aXMgPSAoc2hpcC5jb29yZHNbMF1bMF0gPT09IHNoaXAuY29vcmRzWzFdWzBdKSA/ICdzJyA6ICdlJztcbiAgICB9XG4gICAgbGV0IHNoaXBJZCA9IGZhY3RvcnlIZWxwZXIuZ2V0U2hpcElkQXRDb29yZChjb29yZCwgcGxheWVyR2FtZWJvYXJkKTtcbiAgICBsZXQgc2hpcEZyb21Cb2FyZCA9IHBsYXllckdhbWVib2FyZC5nZXRTaGlwcygpW3NoaXBJZF07XG4gICAgaWYgKCFzaGlwRnJvbUJvYXJkLmlzU3VuaygpKSB7XG4gICAgICBnZXROZXh0TW92ZXMoc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0TmV4dE1vdmVzID0gKHNoaXApID0+IHtcbiAgICBjb25zb2xlLmxvZygnZ2V0dGluZyBuZXh0IG1vdmVzJyk7XG4gICAgY29uc29sZS5sb2coYWN0aXZlU2hpcHMpO1xuICAgIGxldCBtaW4gPSBzaGlwLmNvb3Jkc1swXTtcbiAgICBsZXQgbWF4ID0gc2hpcC5jb29yZHNbMF07XG4gICAgbGV0IGRpck1vZCA9IChzaGlwLmRBeGlzID09PSAnZScpID8gMCA6IDE7XG4gICAgaWYgKHNoaXAuY29vcmRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc2hpcC5jb29yZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNraW5nIGNvb3JkaW5hdGVzIGZvciBtaW4tbWF4Li4uJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkQXhpczogJyArIHNoaXAuZEF4aXMpO1xuICAgICAgICBpZiAoc2hpcC5jb29yZHNbaV1bZGlyTW9kXSA8IG1pbltkaXJNb2RdKSB7XG4gICAgICAgICAgbWluID0gc2hpcC5jb29yZHNbaV07XG4gICAgICAgIH0gZWxzZSBpZiAoc2hpcC5jb29yZHNbaV1bZGlyTW9kXSA+IG1heFtkaXJNb2RdKSB7XG4gICAgICAgICAgbWF4ID0gc2hpcC5jb29yZHNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coYG1pbjogWyR7bWluWzBdfSwgJHttaW5bMV19XWApO1xuICAgIGNvbnNvbGUubG9nKGBtYXg6IFske21heFswXX0sICR7bWF4WzFdfV1gKTtcbiAgICAvLyBjbGVhciBuZXh0TW92ZXNcbiAgICAvLyBGb3IgZWFjaCBzcG90IHRvIHRoZSBzaWRlIG9mIG1pbiBvciBtYXgsIGlmIGl0J3Mgb3BlbiBhZGQgaXQgdG8gbmV4dE1vdmVzXG4gICAgc2hpcC5uZXh0TW92ZXMgPSBbXTtcblxuICAgIGxldCBtaW5OZXh0ID0gKHNoaXAuZEF4aXMgPT09ICdlJylcbiAgICAgID8gW21pblswXSAtIDEsIG1pblsxXV1cbiAgICAgIDogW21pblswXSwgbWluWzFdIC0gMV07XG4gICAgbGV0IG1pbk5leHRDZWxsID0gbnVsbDtcbiAgICBsZXQgbWF4TmV4dCA9IChzaGlwLmRBeGlzID09PSAnZScpXG4gICAgICA/IFttYXhbMF0gKyAxLCBtYXhbMV1dXG4gICAgICA6IFttYXhbMF0sIG1heFsxXSArIDFdO1xuICAgIGxldCBtYXhOZXh0Q2VsbCA9IG51bGw7XG4gICAgXG4gICAgY29uc29sZS5sb2coYG1pbk5leHQ6IFske21pbk5leHRbMF19LCAke21pbk5leHRbMV19XWApO1xuICAgIGNvbnNvbGUubG9nKGBtYXhOZXh0OiBbJHttYXhOZXh0WzBdfSwgJHttYXhOZXh0WzFdfV1gKTtcblxuICAgIGlmICghZmFjdG9yeUhlbHBlci5pc1dpdGhpbkJvdW5kYXJ5KG1pbk5leHQsIHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpKSkge1xuICAgICAgbWluTmV4dCA9IG51bGw7XG4gICAgfVxuICAgIGlmICghZmFjdG9yeUhlbHBlci5pc1dpdGhpbkJvdW5kYXJ5KG1heE5leHQsIHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpKSkge1xuICAgICAgbWF4TmV4dCA9IG51bGw7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChtaW5OZXh0ICE9PSBudWxsKSB7XG4gICAgICAgIG1pbk5leHRDZWxsID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKClbZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChtaW5OZXh0LFxuICAgICAgICAgIHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpKV07XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gO1xuICAgIH1cbiAgICBpZiAobWluTmV4dENlbGwgJiYgbWluTmV4dENlbGwuaGl0ID09PSAwKSB7XG4gICAgICBzaGlwLm5leHRNb3Zlcy5wdXNoKG1pbk5leHQpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgaWYgKG1heE5leHQgIT09IG51bGwpIHtcbiAgICAgICAgbWF4TmV4dENlbGwgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVtmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKG1heE5leHQsXG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCkpXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiA7XG4gICAgfVxuICAgIGlmIChtYXhOZXh0Q2VsbCAmJiBtYXhOZXh0Q2VsbC5oaXQgPT09IDApIHtcbiAgICAgIHNoaXAubmV4dE1vdmVzLnB1c2gobWF4TmV4dCk7XG4gICAgfVxuXG4gICAgLy8gSWYgbmVpdGhlciBhcmUgb3BlbiwgZG8gdGhlIGZsaXBcbiAgICBpZiAoc2hpcC5uZXh0TW92ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnZG9pbmcgdGhlIGZsaXAnKTtcbiAgICAgIGFjdGl2ZVNoaXBzLnNwbGljZSgwLCAxKTtcbiAgICAgIHNoaXAuY29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICBsZXQgdGhpc1NoaXAgPSB7XG4gICAgICAgICAgY29vcmRzOiBbY29vcmRdLFxuICAgICAgICAgIGRBeGlzOiAoc2hpcC5kQXhpcyA9PT0gJ2UnKSA/ICdzJyA6ICdlJ1xuICAgICAgICB9XG4gICAgICAgIGFjdGl2ZVNoaXBzLnB1c2godGhpc1NoaXApO1xuICAgICAgICBnZXROZXh0TW92ZXModGhpc1NoaXApO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCBzaGlwLm5leHRNb3ZlcyApO1xuICB9XG4gIFxuICBjb25zdCBnZXRBZGphY2VudERhdGEgPSAoY29vcmQpID0+IHtcbiAgICBsZXQgc2VhcmNoQXJyYXlzID0gW1xuICAgICAgW2Nvb3JkWzBdLCBjb29yZFsxXSAtIDFdLFxuICAgICAgW2Nvb3JkWzBdLCBjb29yZFsxXSArIDFdLFxuICAgICAgW2Nvb3JkWzBdIC0gMSwgY29vcmRbMV1dLFxuICAgICAgW2Nvb3JkWzBdICsgMSwgY29vcmRbMV1dLFxuICAgIF1cbiAgICBsZXQgYWRqSGl0cyA9IFtdO1xuICAgIGxldCBhZGpFbXB0eSA9IFtdO1xuICAgIGxldCBhZGpNaXNzZXMgPSBbXTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgc2VhcmNoQ29vcmQgPSBzZWFyY2hBcnJheXNbaV07XG4gICAgICAgIGNvbnN0IGJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKClcbiAgICAgICAgbGV0IGluZGV4ID0gZmFjdG9yeUhlbHBlci5nZXRJbmRleEZyb21Db29yZChzZWFyY2hDb29yZCwgYm9hcmQpO1xuICAgICAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAoYm9hcmRbaW5kZXhdLmhpdCA9PT0gMSkge1xuICAgICAgICAgICAgYWRqSGl0cy5wdXNoKHNlYXJjaENvb3JkKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2luZGV4XS5oaXQgPT09IDApIHtcbiAgICAgICAgICAgIGFkakVtcHR5LnB1c2goc2VhcmNoQ29vcmQpXG4gICAgICAgICAgfSBlbHNlIGlmIChib2FyZFtpbmRleF0uaGl0ID09PSAtMSkge1xuICAgICAgICAgICAgYWRqTWlzc2VzLnB1c2goc2VhcmNoQ29vcmQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIHsgXG4gICAgICAgIGNvbnNvbGUubG9nKCdvdXQgb2YgYm91bmRzJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coIHthZGpIaXRzLCBhZGpNaXNzZXMsIGFkakVtcHR5fSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGhpdHM6IGFkakhpdHMsXG4gICAgICBtaXNzZXM6IGFkak1pc3NlcyxcbiAgICAgIGVtcHR5OiBhZGpFbXB0eVxuICAgIH07XG4gIH1cblxuICBjb25zdCBzcGxpY2VDb29yZEZyb21QRUEgPSAoY29vcmQsIHBvc3NpYmxlRW5lbXlBdHRhY2tzKSA9PiB7XG4gICAgbGV0IGluZGV4ID0gbnVsbDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc3NpYmxlRW5lbXlBdHRhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoZmFjdG9yeUhlbHBlci5hcnJheXNNYXRjaChwb3NzaWJsZUVuZW15QXR0YWNrc1tpXS5jb29yZCwgY29vcmQpKSB7XG4gICAgICAgIGluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ3NwbGljaW5nICcpXG4gICAgY29uc29sZS5sb2coJ2luZGV4OiAnICsgaW5kZXgpO1xuICAgIGNvbnNvbGUubG9nKHBvc3NpYmxlRW5lbXlBdHRhY2tzW2luZGV4XSk7XG4gICAgcG9zc2libGVFbmVteUF0dGFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzZXQsXG4gICAgcHJvY2Vzc0hpdCxcbiAgICBwcm9jZXNzTWlzcyxcbiAgICBwcm9jZXNzU3VuayxcbiAgICBnZXRNb3ZlLFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBlbmVteUxvZ2ljOyIsImNvbnN0IGZhY3RvcnlIZWxwZXIgPSAoKCkgPT4ge1xuICBjb25zdCBhcnJheXNNYXRjaCA9IChjb29yZDEsIGNvb3JkMikgPT4ge1xuICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkoY29vcmQxKSA9PT0gSlNPTi5zdHJpbmdpZnkoY29vcmQyKSlcbiAgICAgID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY2hlY2tJZk9wZW4gPSAoY29vcmRMaXN0LCBib2FyZCkgPT4ge1xuICAgIGxldCBpc09wZW4gPSB0cnVlO1xuICAgIGNvb3JkTGlzdC5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgIGNvbnN0IGJvYXJkQ2VsbCA9IGJvYXJkW2dldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBib2FyZCldO1xuICAgICAgaWYgKGJvYXJkQ2VsbC5zaGlwSWQgIT09IG51bGwpIHtcbiAgICAgICAgaXNPcGVuID0gZmFsc2U7XG4gICAgICAgIHRocm93KCdjZWxsIG9jY3VwaWVkJyk7XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaXNPcGVuO1xuICB9XG5cbiAgICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogWzUsIDVdLCBkaXI6IChlIHx8IHMpIH1cbiAgY29uc3QgZ2V0Q29vcmRzSWZPcGVuID0gKGxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpID0+IHtcbiAgICBjb25zdCBjb29yZHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgc2VhcmNoWCA9IGxvY2F0aW9uUHJvcHMuY29vcmRbMF07XG4gICAgICBsZXQgc2VhcmNoWSA9IGxvY2F0aW9uUHJvcHMuY29vcmRbMV07XG4gICAgICBsb2NhdGlvblByb3BzLmRpciA9PT0gJ2UnXG4gICAgICAgID8gc2VhcmNoWCArPSBpXG4gICAgICAgIDogc2VhcmNoWSArPSBpO1xuICAgICAgY29uc3QgbWF0Y2hpbmdDZWxsID0gYm9hcmQuZmluZChjZWxsID0+IFxuICAgICAgICBhcnJheXNNYXRjaChjZWxsLmNvb3JkLCBbc2VhcmNoWCwgc2VhcmNoWV0pXG4gICAgICApO1xuICAgICAgXG4gICAgICBpZiAoIW1hdGNoaW5nQ2VsbCkgdGhyb3coJ291dCBvZiBib3VuZHMnKTtcbiAgICAgIGVsc2UgaWYgKG1hdGNoaW5nQ2VsbC5zaGlwSWQgIT09IG51bGwpIHRocm93KCdjZWxsIG9jY3VwaWVkJylcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBTdWNjZXNzXG4gICAgICAgIGNvb3Jkcy5wdXNoKFtzZWFyY2hYLCBzZWFyY2hZXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb29yZHM7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZHNDZW50ZXJlZCA9IChsZW5ndGgsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgc3RhcnRpbmdDb29yZCA9IG51bGw7XG4gICAgY29uc3QgZGlyID0gbG9jYXRpb25Qcm9wcy5kaXI7XG4gICAgaWYgKGRpciA9PT0gJ2UnKSB7XG4gICAgICBzdGFydGluZ0Nvb3JkID0gW1xuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzBdIC0gTWF0aC5mbG9vcigobGVuZ3RoIC0gMSkvMiksXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMV1cbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChkaXIgPT09ICdzJykge1xuICAgICAgc3RhcnRpbmdDb29yZCA9IFtcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFswXSxcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFsxXSAtIE1hdGguZmxvb3IoKGxlbmd0aCAtIDEpLzIpXG4gICAgICBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygncGxlYXNlIHNwZWNpZnkgZGlyZWN0aW9uIGJlZm9yZSBnZXR0aW5nIGNvb3JkaW5hdGVzJyk7XG4gICAgfVxuICAgIGxldCBjb29yZEFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKyspIHtcbiAgICAgIGNvbnN0IGNvb3JkWCA9IChkaXIgPT09ICdlJylcbiAgICAgICAgPyBzdGFydGluZ0Nvb3JkWzBdICsgaVxuICAgICAgICA6IHN0YXJ0aW5nQ29vcmRbMF07XG4gICAgICBjb25zdCBjb29yZFkgPSAoZGlyID09PSAncycpXG4gICAgICAgID8gc3RhcnRpbmdDb29yZFsxXSArIGlcbiAgICAgICAgOiBzdGFydGluZ0Nvb3JkWzFdO1xuICAgICAgY29vcmRBcnJheS5wdXNoKFtjb29yZFgsIGNvb3JkWV0pO1xuICAgIH1cbiAgICByZXR1cm4gY29vcmRBcnJheTtcbiAgfVxuXG4gIGNvbnN0IGdldEluZGV4RnJvbUNvb3JkID0gKGNvb3JkLCBib2FyZCkgPT4ge1xuICAgIGlmIChjb29yZFswXSA8IDAgfHwgY29vcmRbMF0gPiAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKSkge1xuICAgICAgdGhyb3coJ2dldEluZGV4Li4uOiBbMF0gaXMgb3V0IG9mIGJvdW5kcycpO1xuICAgIH0gZWxzZSBpZiAoY29vcmRbMV0gPCAwIHx8IGNvb3JkWzFdID4gKE1hdGguc3FydChib2FyZC5sZW5ndGgpIC0gMSkpIHtcbiAgICAgIHRocm93KCdnZXRJbmRleC4uLjogWzFdIGlzIG91dCBvZiBib3VuZHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBjb29yZFsxXSAqIE1hdGguc3FydChib2FyZC5sZW5ndGgpICsgY29vcmRbMF07XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRGcm9tSW5kZXggPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3Qgc2l6ZSA9IE1hdGguc3FydChib2FyZC5sZW5ndGgpO1xuICAgIGNvbnN0IHggPSBpbmRleCAlIHNpemU7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoaW5kZXggLyBzaXplKTtcbiAgICBcbiAgICByZXR1cm4geyB4OiB4LCB5OiB5IH1cbiAgfVxuXG4gIGNvbnN0IG51ZGdlQ29vcmRzQnkgPSAoY29vcmRMaXN0LCBudW1iZXIpID0+IHtcblxuICB9XG5cbiAgY29uc3QgbnVkZ2VDb29yZHNPbiA9IChjb29yZExpc3QsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgZmlyc3RDb29yZCA9IGNvb3JkTGlzdFswXTtcbiAgICBjb25zdCBsYXN0Q29vcmQgPSBjb29yZExpc3RbY29vcmRMaXN0Lmxlbmd0aCAtIDFdO1xuICAgIGxldCBuZXdMaXN0ID0gbnVsbDtcbiAgICAvLyBvZmYgdGhlIHJpZ2h0IHNpZGVcbiAgICBjb25zdCByaWdodFNpZGVIYW5nID0gbGFzdENvb3JkWzBdIC0gKE1hdGguc3FydChib2FyZC5sZW5ndGgpIC0gMSk7XG4gICAgY29uc3QgbGVmdFNpZGVIYW5nICA9IC0xICogZmlyc3RDb29yZFswXTtcbiAgICBjb25zdCB0b3BIYW5nICAgICAgID0gLTEgKiBmaXJzdENvb3JkWzFdO1xuICAgIGNvbnN0IGJvdHRvbUhhbmcgICAgPSBsYXN0Q29vcmRbMV0gLSAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKTtcbiAgICBpZiAocmlnaHRTaWRlSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSAtIHJpZ2h0U2lkZUhhbmcsIGNvb3JkWzFdXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobGVmdFNpZGVIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdICsgbGVmdFNpZGVIYW5nLCBjb29yZFsxXV07XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRvcEhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0sIGNvb3JkWzFdICsgdG9wSGFuZ107XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGJvdHRvbUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0sIGNvb3JkWzFdIC0gYm90dG9tSGFuZ107XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdDtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0xpc3Q7XG4gIH1cblxuICBjb25zdCBzdW5rTWVzc2FnZSA9IChjb29yZCwgZ2FtZWJvYXJkLCB0YXJnZXQpID0+IHtcbiAgICBjb25zb2xlLmxvZygge2Nvb3JkLCBnYW1lYm9hcmQsIHRhcmdldCB9KTtcbiAgICBpZiAoY29vcmQueCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb29yZCA9IFtjb29yZC54LCBjb29yZC55XTtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSBnZXRJbmRleEZyb21Db29yZChjb29yZCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnNvbGUubG9nKGluZGV4KTtcbiAgICBjb25zdCBzaGlwSWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmQoKVtpbmRleF0uc2hpcElkO1xuICAgIGNvbnN0IGF0dGFja2VyID0gKHRhcmdldCA9PT0gJ2VuZW15J1xuICAgICAgPyAnWW91J1xuICAgICAgOiAnRW5lbXknKTtcbiAgICBjb25zdCBzaGlwTmFtZSA9IGdhbWVib2FyZC5nZXRTaGlwcygpW3NoaXBJZF0uZ2V0TmFtZSgpO1xuICAgIGNvbnN0IHNoaXBTaXplID0gZ2FtZWJvYXJkLmdldFNoaXBzKClbc2hpcElkXS5nZXRMZW5ndGgoKTtcbiAgICByZXR1cm4gYXR0YWNrZXIgKyAnIHN1bmsgdGhlICcgKyBzaGlwTmFtZSArICchICgnICsgc2hpcFNpemUgKyAnKSc7XG4gIH1cblxuICBjb25zdCBnZXRTaGlwSWRBdENvb3JkID0gKGNvb3JkLCBnYW1lYm9hcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGdldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc3Qgc2hpcElkID0gZ2FtZWJvYXJkLmdldEJvYXJkKClbaW5kZXhdLnNoaXBJZDtcbiAgICByZXR1cm4gc2hpcElkO1xuICB9XG5cbiAgY29uc3QgZ2V0Q29vcmRzT2ZTaGlwID0gKHNoaXBJZCwgZ2FtZWJvYXJkKSA9PiB7XG4gICAgY29uc3QgYm9hcmQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmQoKTtcbiAgICBsZXQgc2hpcENvb3JkcyA9IFtdO1xuICAgIGJvYXJkLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAoY2VsbC5zaGlwSWQgPT09IHNoaXBJZCkge1xuICAgICAgICBjb25zb2xlLmxvZygncHVzaGluZyAnKTtcbiAgICAgICAgY29uc29sZS5sb2coY2VsbC5jb29yZCk7XG4gICAgICAgIHNoaXBDb29yZHMucHVzaChjZWxsLmNvb3JkKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBzaGlwQ29vcmRzO1xuICB9XG5cbiAgY29uc3QgaXNXaXRoaW5Cb3VuZGFyeSA9IChjb29yZCwgYm9hcmQpID0+IHtcbiAgICBpZiAoY29vcmRbMF0gPj0gMCAmJiBjb29yZFswXSA8IE1hdGguc3FydChib2FyZC5sZW5ndGgpKSB7XG4gICAgICBpZiAoY29vcmRbMV0gPj0gMCAmJiBjb29yZFsxXSA8IE1hdGguc3FydChib2FyZC5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFycmF5c01hdGNoLFxuICAgIGNoZWNrSWZPcGVuLFxuICAgIGdldENvb3Jkc0lmT3BlbixcbiAgICBnZXRDb29yZHNDZW50ZXJlZCxcbiAgICBnZXRJbmRleEZyb21Db29yZCxcbiAgICBnZXRDb29yZEZyb21JbmRleCxcbiAgICBudWRnZUNvb3Jkc0J5LFxuICAgIG51ZGdlQ29vcmRzT24sXG4gICAgc3Vua01lc3NhZ2UsXG4gICAgZ2V0U2hpcElkQXRDb29yZCxcbiAgICBnZXRDb29yZHNPZlNoaXAsXG4gICAgaXNXaXRoaW5Cb3VuZGFyeSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmFjdG9yeUhlbHBlcjsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIGh0dHA6Ly9tZXllcndlYi5jb20vZXJpYy90b29scy9jc3MvcmVzZXQvIFxcbiAgIHYyLjAgfCAyMDExMDEyNlxcbiAgIExpY2Vuc2U6IG5vbmUgKHB1YmxpYyBkb21haW4pXFxuKi9cXG5cXG5odG1sLCBib2R5LCBkaXYsIHNwYW4sIGFwcGxldCwgb2JqZWN0LCBpZnJhbWUsXFxuaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLFxcbmEsIGFiYnIsIGFjcm9ueW0sIGFkZHJlc3MsIGJpZywgY2l0ZSwgY29kZSxcXG5kZWwsIGRmbiwgZW0sIGltZywgaW5zLCBrYmQsIHEsIHMsIHNhbXAsXFxuc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhcixcXG5iLCB1LCBpLCBjZW50ZXIsXFxuZGwsIGR0LCBkZCwgb2wsIHVsLCBsaSxcXG5maWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCxcXG50YWJsZSwgY2FwdGlvbiwgdGJvZHksIHRmb290LCB0aGVhZCwgdHIsIHRoLCB0ZCxcXG5hcnRpY2xlLCBhc2lkZSwgY2FudmFzLCBkZXRhaWxzLCBlbWJlZCwgXFxuZmlndXJlLCBmaWdjYXB0aW9uLCBmb290ZXIsIGhlYWRlciwgaGdyb3VwLCBcXG5tZW51LCBuYXYsIG91dHB1dCwgcnVieSwgc2VjdGlvbiwgc3VtbWFyeSxcXG50aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8ge1xcblxcdG1hcmdpbjogMDtcXG5cXHRwYWRkaW5nOiAwO1xcblxcdGJvcmRlcjogMDtcXG5cXHRmb250LXNpemU6IDEwMCU7XFxuXFx0Zm9udDogaW5oZXJpdDtcXG5cXHR2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxufVxcbi8qIEhUTUw1IGRpc3BsYXktcm9sZSByZXNldCBmb3Igb2xkZXIgYnJvd3NlcnMgKi9cXG5hcnRpY2xlLCBhc2lkZSwgZGV0YWlscywgZmlnY2FwdGlvbiwgZmlndXJlLCBcXG5mb290ZXIsIGhlYWRlciwgaGdyb3VwLCBtZW51LCBuYXYsIHNlY3Rpb24ge1xcblxcdGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5ib2R5IHtcXG5cXHRsaW5lLWhlaWdodDogMTtcXG59XFxub2wsIHVsIHtcXG5cXHRsaXN0LXN0eWxlOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlLCBxIHtcXG5cXHRxdW90ZXM6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGU6YmVmb3JlLCBibG9ja3F1b3RlOmFmdGVyLFxcbnE6YmVmb3JlLCBxOmFmdGVyIHtcXG5cXHRjb250ZW50OiAnJztcXG5cXHRjb250ZW50OiBub25lO1xcbn1cXG50YWJsZSB7XFxuXFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG5cXHRib3JkZXItc3BhY2luZzogMDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL21leWVycmVzZXQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7Q0FHQzs7QUFFRDs7Ozs7Ozs7Ozs7OztDQWFDLFNBQVM7Q0FDVCxVQUFVO0NBQ1YsU0FBUztDQUNULGVBQWU7Q0FDZixhQUFhO0NBQ2Isd0JBQXdCO0FBQ3pCO0FBQ0EsZ0RBQWdEO0FBQ2hEOztDQUVDLGNBQWM7QUFDZjtBQUNBO0NBQ0MsY0FBYztBQUNmO0FBQ0E7Q0FDQyxnQkFBZ0I7QUFDakI7QUFDQTtDQUNDLFlBQVk7QUFDYjtBQUNBOztDQUVDLFdBQVc7Q0FDWCxhQUFhO0FBQ2Q7QUFDQTtDQUNDLHlCQUF5QjtDQUN6QixpQkFBaUI7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuXFxuICAtLWxpZ2h0LTE6IHdoaXRlO1xcbiAgLS1saWdodC0yOiAjRUVFO1xcbiAgLS1saWdodC0zOiByZ2IoMTMxLCAxNzQsIDIzOCk7XFxuICAtLWRhcmstMTogYmxhY2s7XFxuICAtLWRhcmstMjogcmdiKDIxLCAyMSwgMjIpO1xcbiAgLS1kYXJrLTM6IHJnYigzMiwgMzMsIDM3KTtcXG4gIC0tZGFyay00OiByZ2IoNTMsIDU1LCA2Nik7XFxuICAtLWRhcmstNTogcmdiKDcxLCA4NiwgMTA5KTtcXG4gIC0tbW9kYWwtYmFja2dyb3VuZDogcmdiYSgyMSwgMjEsIDIyLCAwLjgpO1xcbiAgLS1hY2NlbnQtMTogcmdiKDc3LCAxMzksIDI1NSk7XFxuICAtLWFjY2VudC0yOiByZ2IoNDUsIDk2LCAyMDQpO1xcbiAgLS1hY2NlbnQtMzogcmdiKDEzNCwgMTUwLCAxODQpO1xcbiAgLS1ob3Zlci1yZWQ6IHJnYigxNjcsIDk5LCA4Mik7XFxuICAtLXBsYXllci1oaXQ6ICNhZDc3NmI7XFxuXFxuICAtLWNvbnRhaW5lci13aWR0aDogbWluKDkwdncsIGNhbGMoNDByZW0gKyA1dncpKTtcXG5cXG4gIC8qIC0tZm9udC1mYWN0b3I6IG1heChjYWxjKDAuOHZ3ICsgMC43cmVtKSwgMS4ycmVtKTsgKi9cXG4gIC0tZm9udC1mYWN0b3I6IGNsYW1wKDEuM3JlbSwgY2FsYygwLjV2dyArIDAuN3JlbSksIDEuNXJlbSk7XFxuXFxuICAtLWZvbnQtbGc6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMS4wNSk7XFxuICAtLWZvbnQtbWQ6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC45KTtcXG4gIC0tZm9udC1zbTogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjcpO1xcbiAgLS1mb250LXhzOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuNik7XFxuXFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIE1vbm8nLCBtb25vc3BhY2U7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxufVxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbGcsIDEuOHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgyIHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbWQsIDEuNHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgzIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDFyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5wIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG59XFxuYnV0dG9uIHtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMTAwdncgLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCBncmF5KTtcXG4gIG1hcmdpbjogdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIHdpZHRoOiB2YXIoLS1jb250YWluZXItd2lkdGgpO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogY2FsYygxNnZoIC0gNHJlbSk7XFxufVxcbiNib2FyZHMtY29udGFpbmVyIHtcXG5cXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuLmdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1kYXJrLTEsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNDI1KTtcXG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQyNSk7XFxuICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICByaWdodDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4uZW5lbXktZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICNFRUUpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNSk7XFxuICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC41KTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgI0VFRSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uZ3JpZC1sYWJlbCB7XFxuICAvKiBoZWlnaHQ6IDJyZW07ICovXFxufVxcbi5lbmVteS1hcmVhIC5ncmlkLWxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGU6aG92ZXIge1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC0yLCBkYXJrYmx1ZSk7XFxufVxcbi5lbmVteS1hcmVhIHtcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXG59XFxuLnBsYXllci1hcmVhIHtcXG5cXG59XFxuLmdyaWQtY2VsbCB7XFxuICAvKiB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMzsgKi9cXG4gIGJvcmRlcjogY2FsYyh2YXIoLS1ncmlkLWJvcmRlci1zaXplKSAvIDIpIHNvbGlkIHZhcigtLWRhcmstMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTUsIHdoaXRlKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4wOHMsIGJhY2tncm91bmQtY29sb3IgMC4xcztcXG59XFxuLmVuZW15LWdyaWQgLmdyaWQtY2VsbC11bmNsaWNrZWQ6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIGxpZ2h0Z3JheSk7XFxuICAvKiBwb3NpdGlvbjogcmVsYXRpdmU7ICovXFxuICAvKiBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDBweCAwLjVweCBibGFjayxcXG4gICAgICAgICAgICAgIDBweCAwLjJyZW0gMC4zcmVtIDAgcmdiYSgwLDAsMCwwLjMpOyAqL1xcbiAgYm94LXNoYWRvdzogMHB4IDAuMnJlbSAwLjZyZW0gMCByZ2JhKDAsMCwwLDAuMik7XFxuICAvKiB0cmFuc2Zvcm06IHNjYWxlKDEuMjUsIDEuMjUpOyAqL1xcbiAgei1pbmRleDogMjtcXG59XFxuLnBsYWNlLWhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCByZ2IoOTgsIDE1MSwgMjMwKSk7XFxufVxcbi5wbGFjZS1ob3Zlci1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjcmltc29uO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCBnb2xkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCBnb2xkKTtcXG59XFxuLnNoaXAtc3RhbmRpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTEsIGJsdWUpO1xcbn1cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTMsIGxpZ2h0Z3JlZW4pO1xcbn1cXG4uaGl0LWZsaXAge1xcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuQGtleWZyYW1lcyBoaXRmbGlwIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xcbiAgfVxcbn1cXG4uZW5lbXktaGl0IHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcbiAgXFxufVxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMiwgIzExMSk7XFxuICAvKiBvcGFjaXR5OiAwOyAqL1xcbn1cXG4uZW5lbXktbWlzcyB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllci1oaXQsIGJyb3duKTtcXG59XFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDFyZW0gMC40cmVtIDAuNnJlbSAwLjRyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTUsIHJnYig3MSwgODYsIDEwOSkpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNCk7XFxufVxcbi5pbmZvLXRpdGxlIHtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbGcsIDEuNHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwO1xcbn1cXG4uaW5mby1zdGF0ZS1jb250YWluZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG4uaW5mby1zdGF0ZSB7XFxuICBoZWlnaHQ6IDEuNHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24sIC5yb3RhdGUtYnV0dG9uIGRpdiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGhlaWdodDogMS40cmVtO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjFyZW0gMC42cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNCwgIzIyMik7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMiwgYmx1ZSk7XFxufVxcbi5yb3RhdGUtYnV0dG9uLXRleHQge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjRyZW07XFxufVxcbi5yb3RhdGUtYnV0dG9uLWljb24ge1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMiwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgcGFkZGluZzogMC4wNXJlbSAwLjNyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLmluZm8tZGV0YWlscyB7XFxuICBoZWlnaHQ6IDE1cmVtO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBtYXJnaW4tYm90dG9tOiAwLjdyZW07XFxufVxcbi5pbmZvLXJlbWFpbmluZyB7XFxuICBoZWlnaHQ6IDdyZW07XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuNHJlbSAwLjNyZW07XFxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcbi5pbmZvLXJlbWFpbmluZy10aXRsZSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4uaW5mby1yZW1haW5pbmctbGlzdCB7XFxuXFxufVxcbi5yZW1haW5pbmctc2hpcCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0yLCB3aGl0ZSk7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMC4ycmVtO1xcbiAgbWFyZ2luOiAwIDAuM3JlbSAwLjJyZW0gMDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLmluZm8tZGV0YWlscy1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC40NXJlbSAwLjNyZW07XFxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcblxcbi5tb2RhbC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMDtcXG4gIHotaW5kZXg6IDU7XFxufVxcbi5tb2RhbCB7XFxuICBwYWRkaW5nOiA1cmVtIDVyZW0gNHJlbSA1cmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tb2RhbC1iYWNrZ3JvdW5kLCByZ2JhKDMwLCAzMCwgMzAsIDAuNykpO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG59XFxuLm1vZGFsLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1mb250LWZhY3RvciwgMS40cmVtKSAqIDEuMTUpO1xcbiAgbWFyZ2luLWJvdHRvbTogMC43cmVtO1xcbn1cXG4ubW9kYWwtZGVzY3JpcHRpb24ge1xcbiAgZm9udC1zaXplOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yLCAxLjRyZW0pICogMC43NSk7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbn1cXG4ubW9kYWwtYnV0dG9uIHtcXG4gIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1mb250LWZhY3RvciwgMS40cmVtKSAqIDAuNyk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNnJlbTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5oaWRlLW1vZGFsLWJ1dHRvbiB7XFxuICBmb250LXNpemU6IGNhbGModmFyKC0tZm9udC1mYWN0b3IsIDEuNHJlbSkgKiAwLjY1KTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjhyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjZyZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xcbiAgdG9wOiAycmVtO1xcbn1cXG4ubW9kYWwtaGlkZGVuIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLm1vZGFsLW1vc3RseS1oaWRkZW4ge1xcbiAgb3BhY2l0eTogMC4yNTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oODB2dywgMjByZW0pO1xcbiAgfVxcbiAgI3BhZ2UtY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgI2dhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBhZGRpbmctdG9wOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSk7XFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxKTtcXG4gIH1cXG4gIC5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC45KTtcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuOSk7XFxuICB9XFxuICAuaW5mby1jb250YWluZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSAtIDFyZW0pO1xcbiAgICBtYXJnaW4tdG9wOiAwLjhyZW07XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsdUJBQXVCOztFQUV2QixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsMEJBQTBCO0VBQzFCLHlDQUF5QztFQUN6Qyw2QkFBNkI7RUFDN0IsNEJBQTRCO0VBQzVCLDhCQUE4QjtFQUM5Qiw2QkFBNkI7RUFDN0IscUJBQXFCOztFQUVyQiwrQ0FBK0M7O0VBRS9DLHNEQUFzRDtFQUN0RCwwREFBMEQ7O0VBRTFELDBDQUEwQztFQUMxQyx5Q0FBeUM7RUFDekMseUNBQXlDO0VBQ3pDLHlDQUF5Qzs7RUFFekMseUJBQXlCO0FBQzNCOztBQUVB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QXFCO0FBQ3ZCO0FBQ0E7RUFDRSxrREFBa0Q7RUFDbEQsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxpREFBaUQ7RUFDakQsb0JBQW9CO0VBQ3BCLHFCQUFxQjtFQUNyQixzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLGtEQUFrRDtFQUNsRCxzQkFBc0I7RUFDdEIscUJBQXFCO0VBQ3JCLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsd0JBQXdCO0VBQ3hCLFNBQVM7QUFDWDtBQUNBO0VBQ0UsVUFBVTtFQUNWLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0U7SUFDRSxtQ0FBbUM7RUFDckM7RUFDQTtJQUNFLFlBQVk7RUFDZDtFQUNBO0lBQ0UsY0FBYztJQUNkLGlCQUFpQjtFQUNuQjtFQUNBO0lBQ0UsdUNBQXVDO0lBQ3ZDLGdEQUFnRDtFQUNsRDtFQUNBO0lBQ0UseUNBQXlDO0lBQ3pDLGtEQUFrRDtFQUNwRDtFQUNBO0lBQ0UsOENBQThDO0lBQzlDLGtCQUFrQjtFQUNwQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0tcGFnZS1tYXJnaW46IDFyZW07XFxuICAtLWdyaWQtYm9yZGVyLXNpemU6IDFweDtcXG5cXG4gIC0tbGlnaHQtMTogd2hpdGU7XFxuICAtLWxpZ2h0LTI6ICNFRUU7XFxuICAtLWxpZ2h0LTM6IHJnYigxMzEsIDE3NCwgMjM4KTtcXG4gIC0tZGFyay0xOiBibGFjaztcXG4gIC0tZGFyay0yOiByZ2IoMjEsIDIxLCAyMik7XFxuICAtLWRhcmstMzogcmdiKDMyLCAzMywgMzcpO1xcbiAgLS1kYXJrLTQ6IHJnYig1MywgNTUsIDY2KTtcXG4gIC0tZGFyay01OiByZ2IoNzEsIDg2LCAxMDkpO1xcbiAgLS1tb2RhbC1iYWNrZ3JvdW5kOiByZ2JhKDIxLCAyMSwgMjIsIDAuOCk7XFxuICAtLWFjY2VudC0xOiByZ2IoNzcsIDEzOSwgMjU1KTtcXG4gIC0tYWNjZW50LTI6IHJnYig0NSwgOTYsIDIwNCk7XFxuICAtLWFjY2VudC0zOiByZ2IoMTM0LCAxNTAsIDE4NCk7XFxuICAtLWhvdmVyLXJlZDogcmdiKDE2NywgOTksIDgyKTtcXG4gIC0tcGxheWVyLWhpdDogI2FkNzc2YjtcXG5cXG4gIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oOTB2dywgY2FsYyg0MHJlbSArIDV2dykpO1xcblxcbiAgLyogLS1mb250LWZhY3RvcjogbWF4KGNhbGMoMC44dncgKyAwLjdyZW0pLCAxLjJyZW0pOyAqL1xcbiAgLS1mb250LWZhY3RvcjogY2xhbXAoMS4zcmVtLCBjYWxjKDAuNXZ3ICsgMC43cmVtKSwgMS41cmVtKTtcXG5cXG4gIC0tZm9udC1sZzogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAxLjA1KTtcXG4gIC0tZm9udC1tZDogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjkpO1xcbiAgLS1mb250LXNtOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuNyk7XFxuICAtLWZvbnQteHM6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC42KTtcXG5cXG4gIC8qIC0tZ3JpZC1vZmZzZXQ6IDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgTW9ubycsIG1vbm9zcGFjZTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS44cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1tZCwgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDMge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDQge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMXJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbnAge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbn1cXG5idXR0b24ge1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbiNwYWdlLWNvbnRhaW5lciB7XFxuICB3aWR0aDogY2FsYygxMDB2dyAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsIGdyYXkpO1xcbiAgbWFyZ2luOiB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSk7XFxufVxcbiNnYW1lLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbiAgd2lkdGg6IHZhcigtLWNvbnRhaW5lci13aWR0aCk7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmctdG9wOiBjYWxjKDE2dmggLSA0cmVtKTtcXG59XFxuI2JvYXJkcy1jb250YWluZXIge1xcblxcbn1cXG4uZ3JpZC13cmFwcGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbn1cXG4uZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiB2YXIoLS1ncmlkLWJvcmRlci1zaXplLCAxcHgpIHNvbGlkIHZhcigtLWRhcmstMSwgYmxhY2spO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40MjUpO1xcbiAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNDI1KTtcXG4gIG1hcmdpbi1ib3R0b206IDAuOHJlbTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHJpZ2h0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5lbmVteS1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgI0VFRSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4ucGxheWVyLWdyaWQtd3JhcHBlciB7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC41KTtcXG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjUpO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgbGVmdDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4ucGxheWVyLWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjRUVFKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5ncmlkLWxhYmVsIHtcXG4gIC8qIGhlaWdodDogMnJlbTsgKi9cXG59XFxuLmVuZW15LWFyZWEgLmdyaWQtbGFiZWwge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4uZW5lbXktZGVsYXktdG9nZ2xlIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC0xLCBibHVlKTtcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZTpob3ZlciB7XFxuICBjb2xvcjogdmFyKC0tYWNjZW50LTIsIGRhcmtibHVlKTtcXG59XFxuLmVuZW15LWFyZWEge1xcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcbn1cXG4ucGxheWVyLWFyZWEge1xcblxcbn1cXG4uZ3JpZC1jZWxsIHtcXG4gIC8qIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zOyAqL1xcbiAgYm9yZGVyOiBjYWxjKHZhcigtLWdyaWQtYm9yZGVyLXNpemUpIC8gMikgc29saWQgdmFyKC0tZGFyay0yKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNSwgd2hpdGUpO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmVuZW15LWdyaWQgLmdyaWQtY2VsbC11bmNsaWNrZWQge1xcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLCAxKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjA4cywgYmFja2dyb3VuZC1jb2xvciAwLjFzO1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZDpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgbGlnaHRncmF5KTtcXG4gIC8qIHBvc2l0aW9uOiByZWxhdGl2ZTsgKi9cXG4gIC8qIGJveC1zaGFkb3c6IGluc2V0IDBweCAwcHggMHB4IDAuNXB4IGJsYWNrLFxcbiAgICAgICAgICAgICAgMHB4IDAuMnJlbSAwLjNyZW0gMCByZ2JhKDAsMCwwLDAuMyk7ICovXFxuICBib3gtc2hhZG93OiAwcHggMC4ycmVtIDAuNnJlbSAwIHJnYmEoMCwwLDAsMC4yKTtcXG4gIC8qIHRyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSk7ICovXFxuICB6LWluZGV4OiAyO1xcbn1cXG4ucGxhY2UtaG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIHJnYig5OCwgMTUxLCAyMzApKTtcXG59XFxuLnBsYWNlLWhvdmVyLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIGRvZGdlckJsdWUpO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGNyaW1zb247XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Itc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIGdvbGQpO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQtc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1yZWQsIGdvbGQpO1xcbn1cXG4uc2hpcC1zdGFuZGluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMywgbGlnaHRncmVlbik7XFxufVxcbi5oaXQtZmxpcCB7XFxuICB0cmFuc2Zvcm0tc3R5bGU6IHByZXNlcnZlLTNkO1xcbn1cXG5Aa2V5ZnJhbWVzIGhpdGZsaXAge1xcbiAgMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMGRlZyk7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDE4MGRlZyk7XFxuICB9XFxufVxcbi5lbmVteS1oaXQge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuICBcXG59XFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0yLCAjMTExKTtcXG4gIC8qIG9wYWNpdHk6IDA7ICovXFxufVxcbi5lbmVteS1taXNzIHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGxheWVyLWhpdCwgYnJvd24pO1xcbn1cXG4uaW5mby1jb250YWluZXIge1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgcGFkZGluZzogMXJlbSAwLjRyZW0gMC42cmVtIDAuNHJlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNSwgcmdiKDcxLCA4NiwgMTA5KSk7XFxuICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40KTtcXG59XFxuLmluZm8tdGl0bGUge1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDA7XFxufVxcbi5pbmZvLXN0YXRlLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxufVxcbi5pbmZvLXN0YXRlIHtcXG4gIGhlaWdodDogMS40cmVtO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiwgLnJvdGF0ZS1idXR0b24gZGl2IHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgaGVpZ2h0OiAxLjRyZW07XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuMXJlbSAwLjZyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuLnJvdGF0ZS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay00LCAjMjIyKTtcXG59XFxuLnJvdGF0ZS1idXR0b246YWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0yLCBibHVlKTtcXG59XFxuLnJvdGF0ZS1idXR0b24tdGV4dCB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNHJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24taWNvbiB7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0yLCB3aGl0ZSk7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBwYWRkaW5nOiAwLjA1cmVtIDAuM3JlbTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzIHtcXG4gIGhlaWdodDogMTVyZW07XFxuICBvdmVyZmxvdzogYXV0bztcXG4gIG1hcmdpbi1ib3R0b206IDAuN3JlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nIHtcXG4gIGhlaWdodDogN3JlbTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC40cmVtIDAuM3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuLmluZm8tcmVtYWluaW5nLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5pbmZvLXJlbWFpbmluZy1saXN0IHtcXG5cXG59XFxuLnJlbWFpbmluZy1zaGlwIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTIsIHdoaXRlKTtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjJyZW07XFxuICBtYXJnaW46IDAgMC4zcmVtIDAuMnJlbSAwO1xcbiAgYm9yZGVyLXJhZGl1czogMC4ycmVtO1xcbn1cXG4uaW5mby1kZXRhaWxzLW1lc3NhZ2Uge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjQ1cmVtIDAuM3JlbTtcXG4gIG1hcmdpbi1ib3R0b206IDAuMXJlbTtcXG59XFxuXFxuLm1vZGFsLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWFyZ2luOiAwO1xcbiAgei1pbmRleDogNTtcXG59XFxuLm1vZGFsIHtcXG4gIHBhZGRpbmc6IDVyZW0gNXJlbSA0cmVtIDVyZW07XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLW1vZGFsLWJhY2tncm91bmQsIHJnYmEoMzAsIDMwLCAzMCwgMC43KSk7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7XFxuICBib3JkZXItcmFkaXVzOiAycmVtO1xcbn1cXG4ubW9kYWwtdGl0bGUge1xcbiAgZm9udC1zaXplOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yLCAxLjRyZW0pICogMS4xNSk7XFxuICBtYXJnaW4tYm90dG9tOiAwLjdyZW07XFxufVxcbi5tb2RhbC1kZXNjcmlwdGlvbiB7XFxuICBmb250LXNpemU6IGNhbGModmFyKC0tZm9udC1mYWN0b3IsIDEuNHJlbSkgKiAwLjc1KTtcXG4gIG1hcmdpbi1ib3R0b206IDJyZW07XFxufVxcbi5tb2RhbC1idXR0b24ge1xcbiAgZm9udC1zaXplOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yLCAxLjRyZW0pICogMC43KTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAxcmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC42cmVtO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuLmhpZGUtbW9kYWwtYnV0dG9uIHtcXG4gIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1mb250LWZhY3RvciwgMS40cmVtKSAqIDAuNjUpO1xcbiAgcGFkZGluZzogMC4zcmVtIDAuOHJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNnJlbTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3M7XFxuICB0b3A6IDJyZW07XFxufVxcbi5tb2RhbC1oaWRkZW4ge1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4ubW9kYWwtbW9zdGx5LWhpZGRlbiB7XFxuICBvcGFjaXR5OiAwLjI1O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIDpyb290IHtcXG4gICAgLS1jb250YWluZXItd2lkdGg6IG1pbig4MHZ3LCAyMHJlbSk7XFxuICB9XFxuICAjcGFnZS1jb250YWluZXIge1xcbiAgICBoZWlnaHQ6IGF1dG87XFxuICB9XFxuICAjZ2FtZS1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgcGFkZGluZy10b3A6IDJyZW07XFxuICB9XFxuICAucGxheWVyLWdyaWQtd3JhcHBlciB7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxKTtcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDEpO1xcbiAgfVxcbiAgLmVuZW15LWdyaWQtd3JhcHBlciB7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjkpO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC45KTtcXG4gIH1cXG4gIC5pbmZvLWNvbnRhaW5lciB7XFxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxIC0gMXJlbSk7XFxuICAgIG1hcmdpbi10b3A6IDAuOHJlbTtcXG4gIH1cXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciAmJiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBhcnJbU3ltYm9sLml0ZXJhdG9yXSB8fCBhcnJbXCJAQGl0ZXJhdG9yXCJdKTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJyZXNldC5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21leWVycmVzZXQuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vbWV5ZXJyZXNldC5jc3MnO1xuaW1wb3J0ICcuL3N0eWxlLmNzcyc7XG5pbXBvcnQgZGlzcGxheSBmcm9tICcuL2Rpc3BsYXkuanMnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcblxuZGlzcGxheS5pbml0aWFsaXplKCk7XG5nYW1lLnN0YXJ0KCk7Il0sIm5hbWVzIjpbImdhbWUiLCJhbmltYXRlIiwiZmxpcENlbGxzIiwiYW5pbWF0aW9uUmVmcmVzaCIsImFuaW1hdGlvbkxlbmd0aCIsImZsaXBwaW5nIiwicmVzZXQiLCJhZGRUb0ZsaXBDZWxscyIsImVsZW1lbnQiLCJwdXNoIiwiY2xhc3NMaXN0IiwiYWRkIiwiZmxpcEFsbCIsImdldFN0YXRlIiwiaWQiLCJmb3JFYWNoIiwiY2VsbCIsInN0eWxlIiwiYW5pbWF0aW9uIiwib2Zmc2V0V2lkdGgiLCJzZXRUaW1lb3V0IiwiZmFjdG9yeUhlbHBlciIsImdhbWVib2FyZEZhY3RvcnkiLCJwbGF5ZXJGYWN0b3J5Iiwic2hpcEZhY3RvcnkiLCJkaXNwbGF5IiwiZ3JpZCIsInNoYXJlZENvb3JkTGlzdCIsImFsbEhvdmVyQ2xhc3NlcyIsImluaXRpYWxpemUiLCJjbGVhckRpc3BsYXkiLCJlbmVteUFyZWEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJlbmVteUdyaWRXcmFwcGVyIiwiZW5lbXlHcmlkTGFiZWwiLCJpbm5lclRleHQiLCJlbmVteURlbGF5VG9nZ2xlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJ0b2dnbGVEZWxheSIsImVuZW15R3JpZCIsInBsYXllckFyZWEiLCJwbGF5ZXJHcmlkV3JhcHBlciIsInBsYXllckdyaWRMYWJlbCIsInBsYXllckdyaWQiLCJib2FyZHNDb250YWluZXIiLCJpbmZvQ29udGFpbmVyIiwiZ2FtZUNvbnRhaW5lciIsImluZm9UaXRsZSIsImluZm9TdGF0ZUNvbnRhaW5lciIsImluZm9TdGF0ZSIsIm5hbWUiLCJpbmZvRGV0YWlscyIsImluZm9SZW1haW5pbmciLCJpbmZvUmVtYWluaW5nVGl0bGUiLCJhcHBlbmRDaGlsZCIsInBhZ2VDb250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiaGFzQ2hpbGROb2RlcyIsImNoaWxkTm9kZXMiLCJjaGlsZCIsInJlbW92ZSIsImtleSIsInRvZ2dsZURpcmVjdGlvbiIsImhvclZlciIsImdldERpcmVjdGlvbiIsImxvZ01lc3NhZ2UiLCJjbGVhckNsYXNzIiwiZGlzcGxheUhvdmVyIiwiZHJhd0dyaWQiLCJwbGF5ZXIiLCJnZXROYW1lIiwiZ2FtZWJvYXJkIiwiZ2V0R2FtZWJvYXJkIiwiaSIsImRhdGFzZXQiLCJjZWxsSWQiLCJjdXJyZW50U2hpcCIsImdldFNoaXBGb3JQbGFjZW1lbnQiLCJjb250YWlucyIsInBsYWNlU2hpcCIsImxlbmd0aCIsInNpemUiLCJjb29yZCIsImRpciIsImdldEJvYXJkIiwiYWR2YW5jZVNoaXBQbGFjZW1lbnQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Q29vcmQiLCJpc0hpdCIsInJlY2VpdmVBdHRhY2siLCJ4IiwieSIsInN1bmtNZXNzYWdlIiwibG9nUmVtYWluaW5nIiwiZ2V0U2hpcHMiLCJhZHZhbmNlU3RhdGUiLCJNYXRoIiwic3FydCIsInVuZGVmaW5lZCIsImhvdmVyTm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaXRlbSIsImdldFBsYXllcnMiLCJjZWxsQ29vcmQiLCJjb29yZExpc3QiLCJnZXRDb29yZHNDZW50ZXJlZCIsIm51ZGdlQ29vcmRzT24iLCJob3ZlckNsYXNzZXMiLCJjaGVja0lmT3BlbiIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImhvdmVyQ29vcmQiLCJjZWxsSW5kZXgiLCJnZXRJbmRleEZyb21Db29yZCIsImRpc3BsYXlDb29yZCIsImluZGV4IiwiYm9hcmQiLCJjb29yZE9iaiIsImdldENvb3JkRnJvbUluZGV4IiwiY29vcmRUZXh0IiwicGFyZW50IiwiY2xhc3NOYW1lIiwibXNnIiwiY3VycmVudE1lc3NhZ2UiLCJmaXJzdENoaWxkIiwibWVzc2FnZSIsImluc2VydEJlZm9yZSIsInNoaXBzIiwicHJldkluZm9SZW1haW5pbmciLCJyZW1vdmVDaGlsZCIsImluZm9SZW1haW5pbmdMaXN0Iiwic2hpcCIsImlzU3VuayIsInJlbWFpbmluZ1NoaXAiLCJnZXRMZW5ndGgiLCJzdGF0ZU1lc3NhZ2UiLCJkaXNwbGF5Um90YXRlQnV0dG9uIiwicm90YXRlQnV0dG9uIiwicm90YXRlQnV0dG9uVGV4dCIsInJvdGF0ZUJ1dHRvbkljb24iLCJyZW1vdmVSb3RhdGVCdXR0b24iLCJtYWtlQ2VsbHNVbmNsaWNrZWQiLCJyZW1vdmVDZWxsc1VuY2xpY2tlZCIsIm1ha2VNb2RhbCIsIm9wdGlvbnMiLCJib2R5IiwibW9kYWxDb250YWluZXIiLCJtb2RhbCIsIm1vZGFsVGl0bGUiLCJ0aXRsZSIsIm1vZGFsRGVzY3JpcHRpb24iLCJkZXNjcmlwdGlvbiIsIm1vZGFsQnV0dG9uIiwiYnV0dG9uVGV4dCIsImhpZGVNb2RhbEJ1dHRvbiIsImhpZGVCdXR0b25UZXh0IiwiY2FsbGJhY2siLCJteU5hbWUiLCJib2FyZFNpemUiLCJhdHRhY2tlZFNwYWNlcyIsImF0dGFjayIsImVuZW15UGxheWVyIiwiYWxyZWFkeUF0dGFja2VkIiwiYXJyYXlzTWF0Y2giLCJwcm9wcyIsImhpdHMiLCJpbml0aWFsSGl0cyIsImhpdCIsImluY2x1ZGVzIiwiaiIsInNoaXBJZCIsImFsbFNoaXBzU3VuayIsInN1bmsiLCJzaGlwUHJvcHMiLCJsb2NhdGlvblByb3BzIiwicGxhY2VkU2hpcElkIiwicGxhY2VkQ29vcmRzIiwiZ2V0Q29vcmRzSWZPcGVuIiwibWFwIiwibmV3Q2VsbCIsImdldFVuc3Vua1NoaXBzIiwidW5zdW5rU2hpcHMiLCJsb2dpYyIsImVuZW15RGVsYXlNYXhJbml0aWFsIiwiZW5lbXlEZWxheU1heCIsInN0YXRlcyIsInBvc3NpYmxlRW5lbXlBdHRhY2tzIiwic3RhdGUiLCJzaGlwTGlzdCIsImRpcmVjdGlvbiIsInBsYXllcjEiLCJlbmVteTEiLCJzdGFydCIsInBsYWNlUmFuZG9tU2hpcHMiLCJkZWxheVRpbWUiLCJyYW5kb20iLCJlbmVteVJhbmRvbUF0dGFjayIsImVuZW15Iiwic3VjY2VzcyIsImZsb29yIiwiY29vcmRYIiwiY29vcmRZIiwiYXR0YWNrQ29vcmQiLCJnZXRNb3ZlIiwiZGlkSGl0IiwiYXR0YWNrQ2VsbEluZGV4IiwicHJvY2Vzc0hpdCIsInByb2Nlc3NNaXNzIiwicHJvY2Vzc1N1bmsiLCJlbmVteUxvZ2ljIiwicGxheWVyR2FtZWJvYXJkIiwiYWN0aXZlSGl0cyIsImFjdGl2ZVNoaXBzIiwidXBkYXRlQWN0aXZlU2hpcCIsIm5ld1NoaXAiLCJjb29yZHMiLCJkQXhpcyIsImdldE5leHRNb3ZlcyIsImdldEFkamFjZW50RGF0YSIsImVtcHR5Iiwic3BsaWNlIiwic3Vua1NoaXBDb29yZHMiLCJnZXRDb29yZHNPZlNoaXAiLCJnZXRTaGlwSWRBdENvb3JkIiwic3BsaWNlU2hpcCIsImFDb29yZCIsIm5leHRNb3ZlcyIsInJhbmRvbU5leHQiLCJzcGxpY2VDb29yZEZyb21QRUEiLCJhZGphY2VudEVtcHR5IiwicmFuZG9tQWRqYWNlbnQiLCJyYW5kb21BdHRhY2siLCJmbGlwREF4aXMiLCJzaGlwRnJvbUJvYXJkIiwibWluIiwibWF4IiwiZGlyTW9kIiwibWluTmV4dCIsIm1pbk5leHRDZWxsIiwibWF4TmV4dCIsIm1heE5leHRDZWxsIiwiaXNXaXRoaW5Cb3VuZGFyeSIsInRoaXNTaGlwIiwic2VhcmNoQXJyYXlzIiwiYWRqSGl0cyIsImFkakVtcHR5IiwiYWRqTWlzc2VzIiwic2VhcmNoQ29vcmQiLCJtaXNzZXMiLCJjb29yZDEiLCJjb29yZDIiLCJKU09OIiwic3RyaW5naWZ5IiwiaXNPcGVuIiwiYm9hcmRDZWxsIiwic2VhcmNoWCIsInNlYXJjaFkiLCJtYXRjaGluZ0NlbGwiLCJmaW5kIiwic3RhcnRpbmdDb29yZCIsImNvb3JkQXJyYXkiLCJudWRnZUNvb3Jkc0J5IiwibnVtYmVyIiwiZmlyc3RDb29yZCIsImxhc3RDb29yZCIsIm5ld0xpc3QiLCJyaWdodFNpZGVIYW5nIiwibGVmdFNpZGVIYW5nIiwidG9wSGFuZyIsImJvdHRvbUhhbmciLCJhdHRhY2tlciIsInNoaXBOYW1lIiwic2hpcFNpemUiLCJzaGlwQ29vcmRzIl0sInNvdXJjZVJvb3QiOiIifQ==