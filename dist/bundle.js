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
  var enemyDelayMaxInitial = 0.8;
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
        var delayTime = enemyDelayMax / 2 + Math.random() * enemyDelayMax / 2;
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --page-margin: 1rem;\n  --grid-border-size: 1px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --modal-background: rgba(21, 21, 22, 0.8);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\nbutton {\n  font-family: 'Noto Sans Mono', monospace;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--dark-1, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--dark-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n.modal-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  z-index: 5;\n}\n.modal {\n  padding: 5rem 5rem 4rem 5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--modal-background, rgba(30, 30, 30, 0.7));\n  transition: opacity 0.3s;\n  border-radius: 2rem;\n}\n.modal-title {\n  font-size: calc(var(--font-factor, 1.4rem) * 1.15);\n  margin-bottom: 0.7rem;\n}\n.modal-description {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.75);\n  margin-bottom: 2rem;\n}\n.modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.7);\n  padding: 0.3rem 1rem;\n  border-radius: 0.6rem;\n  box-sizing: border-box;\n}\n.hide-modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.65);\n  padding: 0.3rem 0.8rem;\n  border-radius: 0.6rem;\n  position: relative;\n  box-sizing: border-box;\n  transition: opacity 0.3s;\n  top: 2rem;\n}\n.modal-hidden {\n  opacity: 0;\n  pointer-events: none;\n}\n.modal-mostly-hidden {\n  opacity: 0.25;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,mBAAmB;EACnB,uBAAuB;;EAEvB,gBAAgB;EAChB,eAAe;EACf,6BAA6B;EAC7B,eAAe;EACf,yBAAyB;EACzB,yBAAyB;EACzB,yBAAyB;EACzB,0BAA0B;EAC1B,yCAAyC;EACzC,6BAA6B;EAC7B,4BAA4B;EAC5B,8BAA8B;EAC9B,6BAA6B;EAC7B,qBAAqB;;EAErB,+CAA+C;;EAE/C,sDAAsD;EACtD,0DAA0D;;EAE1D,0CAA0C;EAC1C,yCAAyC;EACzC,yCAAyC;EACzC,yCAAyC;;EAEzC,yBAAyB;AAC3B;;AAEA;EACE,wCAAwC;EACxC,4BAA4B;EAC5B,sCAAsC;AACxC;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,iCAAiC;EACjC,wBAAwB;AAC1B;AACA;EACE,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;AAC1B;AACA;EACE,iCAAiC;AACnC;AACA;EACE,wCAAwC;EACxC,qBAAqB;EACrB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,iDAAiD;EACjD,kDAAkD;EAClD,qCAAqC;EACrC,gCAAgC;AAClC;AACA;EACE,aAAa;EACb,mBAAmB;EACnB,8BAA8B;EAC9B,uBAAuB;EACvB,6BAA6B;EAC7B,cAAc;EACd,8BAA8B;AAChC;AACA;;AAEA;AACA;EACE,uBAAuB;AACzB;AACA;EACE,aAAa;EACb,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,MAAM;EACN,+DAA+D;EAC/D,sBAAsB;AACxB;AACA;EACE,2CAA2C;EAC3C,oDAAoD;EACpD,qBAAqB;EACrB,kBAAkB;EAClB,4BAA4B;AAC9B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,yCAAyC;EACzC,kDAAkD;EAClD,kBAAkB;EAClB,2BAA2B;AAC7B;AACA;EACE,qCAAqC;EACrC,sBAAsB;AACxB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,gBAAgB;EAChB,mBAAmB;EACnB,eAAe;EACf,4BAA4B;AAC9B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,kBAAkB;AACpB;AACA;;AAEA;AACA;EACE,sCAAsC;EACtC,6DAA6D;EAC7D,sCAAsC;EACtC,sBAAsB;AACxB;AACA;EACE,sBAAsB;EACtB,kDAAkD;AACpD;AACA;EACE,eAAe;EACf,4CAA4C;EAC5C,wBAAwB;EACxB;oDACkD;EAClD,+CAA+C;EAC/C,kCAAkC;EAClC,UAAU;AACZ;AACA;EACE,oDAAoD;AACtD;AACA;EACE,eAAe;EACf,6CAA6C;AAC/C;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,eAAe;EACf,qBAAqB;AACvB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,eAAe;EACf,wCAAwC;AAC1C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,4BAA4B;AAC9B;AACA;EACE;IACE,wBAAwB;EAC1B;EACA;IACE,0BAA0B;EAC5B;AACF;AACA;;AAEA;AACA;;AAEA;AACA;EACE,qCAAqC;EACrC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,2BAA2B;EAC3B,kCAAkC;EAClC,iDAAiD;EACjD,yCAAyC;AAC3C;AACA;EACE,4BAA4B;EAC5B,iCAAiC;EACjC,mBAAmB;AACrB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;AACpB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;EACd,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;EACrB,eAAe;EACf,iBAAiB;AACnB;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,iCAAiC;EACjC,oBAAoB;AACtB;AACA;EACE,2BAA2B;EAC3B,uCAAuC;EACvC,iCAAiC;EACjC,uBAAuB;EACvB,uBAAuB;EACvB,qBAAqB;AACvB;AACA;EACE,aAAa;EACb,cAAc;EACd,qBAAqB;AACvB;AACA;EACE,YAAY;EACZ,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,sBAAsB;EACtB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,gBAAgB;AAClB;AACA;;AAEA;AACA;EACE,qBAAqB;EACrB,iCAAiC;EACjC,uCAAuC;EACvC,2BAA2B;EAC3B,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,4BAA4B;EAC5B,qCAAqC;EACrC,uBAAuB;EACvB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;EAClB,OAAO;EACP,MAAM;EACN,YAAY;EACZ,aAAa;EACb,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;EACT,UAAU;AACZ;AACA;EACE,4BAA4B;EAC5B,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,gEAAgE;EAChE,wBAAwB;EACxB,mBAAmB;AACrB;AACA;EACE,kDAAkD;EAClD,qBAAqB;AACvB;AACA;EACE,kDAAkD;EAClD,mBAAmB;AACrB;AACA;EACE,iDAAiD;EACjD,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;AACxB;AACA;EACE,kDAAkD;EAClD,sBAAsB;EACtB,qBAAqB;EACrB,kBAAkB;EAClB,sBAAsB;EACtB,wBAAwB;EACxB,SAAS;AACX;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;AACA;EACE,aAAa;AACf;;AAEA;EACE;IACE,mCAAmC;EACrC;EACA;IACE,YAAY;EACd;EACA;IACE,cAAc;IACd,iBAAiB;EACnB;EACA;IACE,uCAAuC;IACvC,gDAAgD;EAClD;EACA;IACE,yCAAyC;IACzC,kDAAkD;EACpD;EACA;IACE,8CAA8C;IAC9C,kBAAkB;EACpB;AACF","sourcesContent":[":root {\n  --page-margin: 1rem;\n  --grid-border-size: 1px;\n\n  --light-1: white;\n  --light-2: #EEE;\n  --light-3: rgb(131, 174, 238);\n  --dark-1: black;\n  --dark-2: rgb(21, 21, 22);\n  --dark-3: rgb(32, 33, 37);\n  --dark-4: rgb(53, 55, 66);\n  --dark-5: rgb(71, 86, 109);\n  --modal-background: rgba(21, 21, 22, 0.8);\n  --accent-1: rgb(77, 139, 255);\n  --accent-2: rgb(45, 96, 204);\n  --accent-3: rgb(134, 150, 184);\n  --hover-red: rgb(167, 99, 82);\n  --player-hit: #ad776b;\n\n  --container-width: min(90vw, calc(40rem + 5vw));\n\n  /* --font-factor: max(calc(0.8vw + 0.7rem), 1.2rem); */\n  --font-factor: clamp(1.3rem, calc(0.5vw + 0.7rem), 1.5rem);\n\n  --font-lg: calc(var(--font-factor) * 1.05);\n  --font-md: calc(var(--font-factor) * 0.9);\n  --font-sm: calc(var(--font-factor) * 0.7);\n  --font-xs: calc(var(--font-factor) * 0.6);\n\n  /* --grid-offset: 1rem; */\n}\n\nhtml {\n  font-family: 'Noto Sans Mono', monospace;\n  color: var(--light-1, white);\n  background-color: var(--dark-2, black);\n}\nh1 {\n  font-weight: 800;\n  font-size: var(--font-lg, 1.8rem);\n  margin-block-end: 0.3rem;\n}\nh2 {\n  font-weight: 600;\n  font-size: var(--font-md, 1.4rem);\n  margin-block-end: 0.3rem;\n}\nh3 {\n  font-weight: 400;\n  font-size: var(--font-sm, 1.1rem);\n  margin-block-end: 0.3rem;\n}\nh4 {\n  font-weight: 600;\n  font-size: var(--font-xs, 1rem);\n  margin-block-end: 0.3rem;\n}\np {\n  font-size: var(--font-xs, 0.9rem);\n}\nbutton {\n  font-family: 'Noto Sans Mono', monospace;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n#page-container {\n  width: calc(100vw - var(--page-margin, 2rem) * 2);\n  height: calc(100vh - var(--page-margin, 2rem) * 2);\n  background-color: var(--dark-3, gray);\n  margin: var(--page-margin, 2rem);\n}\n#game-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: var(--container-width);\n  margin: 0 auto;\n  padding-top: calc(16vh - 4rem);\n}\n#boards-container {\n\n}\n.grid-wrapper {\n  background-color: white;\n}\n.grid {\n  display: grid;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  gap: 0;\n  border: var(--grid-border-size, 1px) solid var(--dark-1, black);\n  box-sizing: border-box;\n}\n.enemy-grid-wrapper {\n  width: calc(var(--container-width) * 0.425);\n  padding-bottom: calc(var(--container-width) * 0.425);\n  margin-bottom: 0.8rem;\n  position: relative;\n  right: var(--grid-offset, 0);\n}\n.enemy-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.player-grid-wrapper {\n  width: calc(var(--container-width) * 0.5);\n  padding-bottom: calc(var(--container-width) * 0.5);\n  position: relative;\n  left: var(--grid-offset, 0);\n}\n.player-grid {\n  background-color: var(--dark-3, #EEE);\n  background-size: cover;\n}\n.grid-label {\n  /* height: 2rem; */\n}\n.enemy-area .grid-label {\n  display: inline-block;\n}\n.enemy-delay-toggle {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  font-weight: 700;\n  margin-left: 0.5rem;\n  cursor: pointer;\n  color: var(--accent-1, blue);\n}\n.enemy-delay-toggle:hover {\n  color: var(--accent-2, darkblue);\n}\n.enemy-area {\n  margin-right: 1rem;\n}\n.player-area {\n\n}\n.grid-cell {\n  /* transition: background-color 0.3; */\n  border: calc(var(--grid-border-size) / 2) solid var(--dark-2);\n  background-color: var(--dark-5, white);\n  box-sizing: border-box;\n}\n.enemy-grid .grid-cell-unclicked {\n  transform: scale(1, 1);\n  transition: transform 0.08s, background-color 0.1s;\n}\n.enemy-grid .grid-cell-unclicked:hover {\n  cursor: pointer;\n  background-color: var(--accent-3, lightgray);\n  /* position: relative; */\n  /* box-shadow: inset 0px 0px 0px 0.5px black,\n              0px 0.2rem 0.3rem 0 rgba(0,0,0,0.3); */\n  box-shadow: 0px 0.2rem 0.6rem 0 rgba(0,0,0,0.2);\n  /* transform: scale(1.25, 1.25); */\n  z-index: 2;\n}\n.place-hover {\n  background-color: var(--accent-3, rgb(98, 151, 230));\n}\n.place-hover-solo {\n  cursor: pointer;\n  background-color: var(--accent-3, dodgerBlue);\n}\n.place-hover-oob {\n  background-color: crimson;\n}\n.place-hover-oob-solo {\n  cursor: pointer;\n  background-color: red;\n}\n.place-hover-occupied {\n  background-color: var(--hover-red, gold);\n}\n.place-hover-occupied-solo {\n  cursor: pointer;\n  background-color: var(--hover-red, gold);\n}\n.ship-standing {\n  background-color: var(--accent-1, blue);\n}\n.hit {\n  background-color: var(--light-3, lightgreen);\n}\n.hit-flip {\n  transform-style: preserve-3d;\n}\n@keyframes hitflip {\n  0% {\n    transform: rotateY(0deg);\n  }\n  100% {\n    transform: rotateY(180deg);\n  }\n}\n.enemy-hit {\n\n}\n.player-hit {\n  \n}\n.miss {\n  background-color: var(--dark-2, #111);\n  /* opacity: 0; */\n}\n.enemy-miss {\n\n}\n.player-hit {\n  background-color: var(--player-hit, brown);\n}\n.info-container {\n  color: var(--dark-2, black);\n  padding: 1rem 0.4rem 0.6rem 0.4rem;\n  background-color: var(--dark-5, rgb(71, 86, 109));\n  width: calc(var(--container-width) * 0.4);\n}\n.info-title {\n  color: var(--light-1, white);\n  font-size: var(--font-lg, 1.4rem);\n  margin-block-end: 0;\n}\n.info-state-container {\n  margin-bottom: 0.5rem;\n}\n.info-state {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  display: inline-block;\n  margin-right: 0.5rem;\n  margin-top: 0.5rem;\n}\n.rotate-button, .rotate-button div {\n  display: inline-block;\n}\n.rotate-button {\n  height: 1.4rem;\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.1rem 0.6rem;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  user-select: none;\n}\n.rotate-button:hover {\n  background-color: var(--dark-4, #222);\n}\n.rotate-button:active {\n  background-color: var(--accent-2, blue);\n}\n.rotate-button-text {\n  font-size: var(--font-xs, 0.9rem);\n  margin-right: 0.4rem;\n}\n.rotate-button-icon {\n  color: var(--dark-2, black);\n  background-color: var(--light-2, white);\n  font-size: var(--font-sm, 1.1rem);\n  padding: 0.05rem 0.3rem;\n  border: 1px solid black;\n  border-radius: 0.2rem;\n}\n.info-details {\n  height: 15rem;\n  overflow: auto;\n  margin-bottom: 0.7rem;\n}\n.info-remaining {\n  height: 7rem;\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.4rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n.info-remaining-title {\n  font-size: var(--font-sm, 1.1rem);\n  font-weight: 700;\n}\n.info-remaining-list {\n\n}\n.remaining-ship {\n  display: inline-block;\n  font-size: var(--font-xs, 0.9rem);\n  background-color: var(--light-2, white);\n  color: var(--dark-2, black);\n  padding: 0.3rem 0.2rem;\n  margin: 0 0.3rem 0.2rem 0;\n  border-radius: 0.2rem;\n}\n.info-details-message {\n  font-size: var(--font-xs, 0.9rem);\n  color: var(--light-1, white);\n  background-color: var(--dark-3, #222);\n  padding: 0.45rem 0.3rem;\n  margin-bottom: 0.1rem;\n}\n\n.modal-container {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  margin: 0;\n  z-index: 5;\n}\n.modal {\n  padding: 5rem 5rem 4rem 5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--modal-background, rgba(30, 30, 30, 0.7));\n  transition: opacity 0.3s;\n  border-radius: 2rem;\n}\n.modal-title {\n  font-size: calc(var(--font-factor, 1.4rem) * 1.15);\n  margin-bottom: 0.7rem;\n}\n.modal-description {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.75);\n  margin-bottom: 2rem;\n}\n.modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.7);\n  padding: 0.3rem 1rem;\n  border-radius: 0.6rem;\n  box-sizing: border-box;\n}\n.hide-modal-button {\n  font-size: calc(var(--font-factor, 1.4rem) * 0.65);\n  padding: 0.3rem 0.8rem;\n  border-radius: 0.6rem;\n  position: relative;\n  box-sizing: border-box;\n  transition: opacity 0.3s;\n  top: 2rem;\n}\n.modal-hidden {\n  opacity: 0;\n  pointer-events: none;\n}\n.modal-mostly-hidden {\n  opacity: 0.25;\n}\n\n@media (max-width: 600px) {\n  :root {\n    --container-width: min(80vw, 20rem);\n  }\n  #page-container {\n    height: auto;\n  }\n  #game-container {\n    display: block;\n    padding-top: 2rem;\n  }\n  .player-grid-wrapper {\n    width: calc(var(--container-width) * 1);\n    padding-bottom: calc(var(--container-width) * 1);\n  }\n  .enemy-grid-wrapper {\n    width: calc(var(--container-width) * 0.9);\n    padding-bottom: calc(var(--container-width) * 0.9);\n  }\n  .info-container {\n    width: calc(var(--container-width) * 1 - 1rem);\n    margin-top: 0.8rem;\n  }\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z0QseURBQXlELEtBQUsscUJBQXFCLHFEQUFxRCx5QkFBeUIsS0FBSyxHQUFHLE9BQU8sZ0ZBQWdGLFlBQVksY0FBYyxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLGNBQWMsYUFBYSxhQUFhLGFBQWEsY0FBYyxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE1BQU0sT0FBTyxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLEtBQUssWUFBWSxhQUFhLE1BQU0sTUFBTSxLQUFLLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxLQUFLLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLFlBQVksTUFBTSxLQUFLLFVB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QTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUVBSSw4REFBQTtBQUNBekIsc0RBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL2FuaW1hdGUuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9mYWN0b3JpZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9oZWxwZXJzL2VuZW15bG9naWMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9zcmMvaGVscGVycy9mYWN0b3J5aGVscGVyLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL21leWVycmVzZXQuY3NzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9tZXllcnJlc2V0LmNzcz85MjRkIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JvaWxlcnBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5jb25zdCBhbmltYXRlID0gKCgpID0+IHtcbiAgbGV0IGZsaXBDZWxscyA9IFtdO1xuICBjb25zdCBhbmltYXRpb25SZWZyZXNoID0gMC45O1xuICBjb25zdCBhbmltYXRpb25MZW5ndGggPSAwLjM1O1xuICBsZXQgZmxpcHBpbmcgPSBmYWxzZTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBmbGlwQ2VsbHMgPSBbXTtcbiAgICBmbGlwcGluZyA9IGZhbHNlO1xuICB9XG5cbiAgY29uc3QgYWRkVG9GbGlwQ2VsbHMgPSAoZWxlbWVudCkgPT4ge1xuICAgIGZsaXBDZWxscy5wdXNoKGVsZW1lbnQpO1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGl0LWZsaXAnKTtcbiAgICBpZiAoIWZsaXBwaW5nKSB7XG4gICAgICBmbGlwcGluZyA9IHRydWU7XG4gICAgICBmbGlwQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZmxpcEFsbCA9ICgpID0+IHtcbiAgICBpZiAoZ2FtZS5nZXRTdGF0ZSgpLmlkICE9PSAzKSB7XG4gICAgICBmbGlwQ2VsbHMuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgY2VsbC5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XG4gICAgICB9KVxuICAgICAgZmxpcENlbGxzWzBdLm9mZnNldFdpZHRoO1xuICAgICAgZmxpcENlbGxzLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGNlbGwuc3R5bGUuYW5pbWF0aW9uID0gYGhpdGZsaXAgJHthbmltYXRpb25MZW5ndGh9cyAxYDtcbiAgICAgIH0pXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBmbGlwQWxsKCk7XG4gICAgICB9LCBhbmltYXRpb25SZWZyZXNoICogMTAwMCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNldCxcbiAgICBhZGRUb0ZsaXBDZWxscyxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgYW5pbWF0ZTsiLCJpbXBvcnQgZmFjdG9yeUhlbHBlciBmcm9tICcuL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuaW1wb3J0IGdhbWUgZnJvbSAnLi9nYW1lLmpzJztcbmltcG9ydCBhbmltYXRlIGZyb20gJy4vYW5pbWF0ZS5qcyc7XG5cbmNvbnN0IGRpc3BsYXkgPSAoKCkgPT4ge1xuICBsZXQgZ3JpZCA9IG51bGw7XG4gIGxldCBzaGFyZWRDb29yZExpc3QgPSBudWxsO1xuXG4gIGNvbnN0IGFsbEhvdmVyQ2xhc3NlcyA9IFtcbiAgICAncGxhY2UtaG92ZXInLFxuICAgICdwbGFjZS1ob3Zlci1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnLFxuICAgICdwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAncGxhY2UtaG92ZXItb29iJyxcbiAgICAncGxhY2UtaG92ZXItb29iLXNvbG8nXG4gIF07XG4gIGNvbnN0IGluaXRpYWxpemUgPSAoKSA9PiB7XG4gICAgY2xlYXJEaXNwbGF5KCk7XG4gICAgYW5pbWF0ZS5yZXNldCgpO1xuXG4gICAgY29uc3QgZW5lbXlBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW5lbXlBcmVhLmNsYXNzTGlzdC5hZGQoJ2VuZW15LWFyZWEnKTtcbiAgICBjb25zdCBlbmVteUdyaWRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZW5lbXlHcmlkV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdncmlkLXdyYXBwZXInLCAnZW5lbXktZ3JpZC13cmFwcGVyJyk7XG4gICAgY29uc3QgZW5lbXlHcmlkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGVuZW15R3JpZExhYmVsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtbGFiZWwnKTtcbiAgICBlbmVteUdyaWRMYWJlbC5pbm5lclRleHQgPSAnRW5lbXknO1xuICAgIGNvbnN0IGVuZW15RGVsYXlUb2dnbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoNCcpO1xuICAgIGVuZW15RGVsYXlUb2dnbGUuY2xhc3NMaXN0LmFkZCgnZW5lbXktZGVsYXktdG9nZ2xlJyk7XG5cbiAgICAvLyBlbmVteURlbGF5VG9nZ2xlLmlubmVyVGV4dCA9IGdhbWUudG9nZ2xlRGVsYXkoKTtcbiAgICBlbmVteURlbGF5VG9nZ2xlLmlubmVyVGV4dCA9ICdkZWxheSBvbic7XG4gICAgZW5lbXlEZWxheVRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnRhcmdldC5pbm5lclRleHQgPSBnYW1lLnRvZ2dsZURlbGF5KCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbmVteUdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbmVteUdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcsICdlbmVteS1ncmlkJyk7XG5cbiAgICBjb25zdCBwbGF5ZXJBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGxheWVyQXJlYS5jbGFzc0xpc3QuYWRkKCdwbGF5ZXItYXJlYScpO1xuICAgIGNvbnN0IHBsYXllckdyaWRXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZ3JpZC13cmFwcGVyJywgJ3BsYXllci1ncmlkLXdyYXBwZXInKTtcbiAgICBjb25zdCBwbGF5ZXJHcmlkTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHBsYXllckdyaWRMYWJlbC5jbGFzc0xpc3QuYWRkKCdncmlkLWxhYmVsJyk7XG4gICAgcGxheWVyR3JpZExhYmVsLmlubmVyVGV4dCA9ICdQbGF5ZXInO1xuICAgIGNvbnN0IHBsYXllckdyaWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHBsYXllckdyaWQuY2xhc3NMaXN0LmFkZCgnZ3JpZCcsICdwbGF5ZXItZ3JpZCcpO1xuXG4gICAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYm9hcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2JvYXJkcy1jb250YWluZXInKTtcbiAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmZvLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBnYW1lQ29udGFpbmVyLmlkID0gJ2dhbWUtY29udGFpbmVyJztcblxuICAgIGNvbnN0IGluZm9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgaW5mb1RpdGxlLmNsYXNzTGlzdC5hZGQoJ2luZm8tdGl0bGUnKTtcbiAgICBpbmZvVGl0bGUuaW5uZXJUZXh0ID0gJ0JhdHRsZXNoaXAnO1xuICAgIGNvbnN0IGluZm9TdGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9TdGF0ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpbmZvLXN0YXRlLWNvbnRhaW5lcicpO1xuICAgIGNvbnN0IGluZm9TdGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbmZvU3RhdGUuY2xhc3NMaXN0LmFkZCgnaW5mby1zdGF0ZScpO1xuICAgIGluZm9TdGF0ZS5pbm5lclRleHQgPSBnYW1lLmdldFN0YXRlKCkubmFtZTtcbiAgICBjb25zdCBpbmZvRGV0YWlscyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9EZXRhaWxzLmNsYXNzTGlzdC5hZGQoJ2luZm8tZGV0YWlscycpO1xuICAgIGNvbnN0IGluZm9SZW1haW5pbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvUmVtYWluaW5nLmNsYXNzTGlzdC5hZGQoJ2luZm8tcmVtYWluaW5nJyk7XG5cbiAgICBjb25zdCBpbmZvUmVtYWluaW5nVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZy10aXRsZScpO1xuICAgIGluZm9SZW1haW5pbmdUaXRsZS5pbm5lclRleHQgPSAnUmVtYWluaW5nIEVuZW15IFNoaXBzJztcbiAgICBpbmZvUmVtYWluaW5nLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmdUaXRsZSk7XG5cbiAgICAvLyBlbmVteUdyaWQuc3R5bGVbJ2JhY2tncm91bmQtaW1hZ2UnXSA9XG4gICAgLy8gICAndXJsKGh0dHBzOi8vc291cmNlLnVuc3BsYXNoLmNvbS9yYW5kb20/b2NlYW4pJztcbiAgICAvLyBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyAgIHBsYXllckdyaWQuc3R5bGVbJ2JhY2tncm91bmQtaW1hZ2UnXSA9XG4gICAgLy8gICAgICd1cmwoaHR0cHM6Ly9zb3VyY2UudW5zcGxhc2guY29tL3JhbmRvbT9ib2F0LGJhdHRsZXNoaXApJztcbiAgICAvLyB9LCA1MDAwKTtcblxuICAgIGluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1RpdGxlKTtcbiAgICBpbmZvU3RhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQoaW5mb1N0YXRlKTtcbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9TdGF0ZUNvbnRhaW5lcik7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvRGV0YWlscyk7XG4gICAgaW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nKTtcblxuICAgIGdhbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoYm9hcmRzQ29udGFpbmVyKTtcbiAgICBnYW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9Db250YWluZXIpO1xuXG4gICAgYm9hcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGVuZW15QXJlYSk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15R3JpZExhYmVsKTtcbiAgICBlbmVteUFyZWEuYXBwZW5kQ2hpbGQoZW5lbXlEZWxheVRvZ2dsZSk7XG4gICAgZW5lbXlBcmVhLmFwcGVuZENoaWxkKGVuZW15R3JpZFdyYXBwZXIpO1xuICAgIGVuZW15R3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQoZW5lbXlHcmlkKTtcblxuICAgIGJvYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJBcmVhKTtcbiAgICBwbGF5ZXJBcmVhLmFwcGVuZENoaWxkKHBsYXllckdyaWRMYWJlbCk7XG4gICAgcGxheWVyQXJlYS5hcHBlbmRDaGlsZChwbGF5ZXJHcmlkV3JhcHBlcik7XG4gICAgcGxheWVyR3JpZFdyYXBwZXIuYXBwZW5kQ2hpbGQocGxheWVyR3JpZCk7XG5cbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgaWYgKHBhZ2VDb250YWluZXIuaGFzQ2hpbGROb2Rlcykge1xuICAgICAgcGFnZUNvbnRhaW5lci5jaGlsZE5vZGVzLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhZ2VDb250YWluZXIuYXBwZW5kQ2hpbGQoZ2FtZUNvbnRhaW5lcik7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJy4nKSB7XG4gICAgICAgIGdhbWUudG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICAgIGNvbnN0IGhvclZlciA9IChnYW1lLmdldERpcmVjdGlvbigpID09PSAnZSdcbiAgICAgICAgICA/ICdob3Jpem9udGFsJ1xuICAgICAgICAgIDogJ3ZlcnRpY2FsJyk7XG4gICAgICAgIGxvZ01lc3NhZ2UoJ1JvdGF0ZWQgZGlyZWN0aW9uIHRvICcgKyBob3JWZXIpO1xuICAgICAgICBjbGVhckNsYXNzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ3JpZCcpLCBhbGxIb3ZlckNsYXNzZXMpO1xuICAgICAgICBkaXNwbGF5SG92ZXIoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBjbGVhckRpc3BsYXkgPSAoKSA9PiB7XG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWNvbnRhaW5lcicpO1xuICAgIGlmIChnYW1lQ29udGFpbmVyKSB7XG4gICAgICBnYW1lQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRyYXdHcmlkID0gKHBsYXllcikgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBwbGF5ZXIuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IHBsYXllci5nZXRHYW1lYm9hcmQoKTtcblxuICAgIGlmIChuYW1lID09PSAnZW5lbXknKSB7XG4gICAgICBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVuZW15LWdyaWQnKTtcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICBncmlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllci1ncmlkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdwbGVhc2Ugc3BlY2lmeSBvd25lciBhcyBcImVuZW15XCIgb3IgXCJwbGF5ZXJcIicpO1xuICAgIH1cblxuICAgIC8vIEFkZGluZyBjZWxscyBhbmQgZXZlbnQgbGlzdGVuZXJzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKS5sZW5ndGg7IGkgKyspIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnZ3JpZC1jZWxsJyk7XG4gICAgICBjZWxsLmRhdGFzZXQuY2VsbElkID0gaTtcbiAgICAgIGNlbGwuZGF0YXNldC5wbGF5ZXIgPSBuYW1lO1xuICAgICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIFxuICAgICAgaWYgKG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkuaWQgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGlmIHNoaXAgY2FuIGJlIHBsYWNlZFxuICAgICAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBnYW1lLmdldFNoaXBGb3JQbGFjZW1lbnQoKTtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYWNlLWhvdmVyJykpIHtcbiAgICAgICAgICAgICAgLy8gcGxhY2Ugc2hpcFxuICAgICAgICAgICAgICBnYW1lYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGxlbmd0aDogY3VycmVudFNoaXAuc2l6ZSxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGN1cnJlbnRTaGlwLm5hbWVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBzaGFyZWRDb29yZExpc3RbMF0sXG4gICAgICAgICAgICAgICAgICBkaXI6IGdhbWUuZ2V0RGlyZWN0aW9uKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIC8vIGRpc3BsYXkgcGxhY2VkIHNoaXBcbiAgICAgICAgICAgICAgcGxhY2VTaGlwKHNoYXJlZENvb3JkTGlzdCwgZ2FtZWJvYXJkLmdldEJvYXJkKCksIGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgLy8gZ2FtZS5hZHZhbmNlU2hpcFBsYWNlbWVudFxuICAgICAgICAgICAgICBpZiAoZ2FtZS5hZHZhbmNlU2hpcFBsYWNlbWVudCgpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJDbGFzcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LCBhbGxIb3ZlckNsYXNzZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgIGlmIChnYW1lLmdldFN0YXRlKCkudGFyZ2V0ID09PSAnZW5lbXknKSB7XG4gICAgICAgICAgICBjb25zdCBjb29yZCA9IGdldENvb3JkKGksIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICAgICAgICAgIGNvbnN0IGlzSGl0ID0gZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2soW2Nvb3JkLngsIGNvb3JkLnldKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG5hbWUgKyAnICcgKyBkaXNwbGF5Q29vcmQoaSwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpXG4gICAgICAgICAgICAvLyAgICsgJyAnICsgKGlzSGl0ID8gJ2hpdCEnIDogJ21pc3NlZCcpKTtcbiAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnZ3JpZC1jZWxsLXVuY2xpY2tlZCcpO1xuICAgICAgICAgICAgaWYgKGlzSGl0ID4gMCkge1xuICAgICAgICAgICAgICBhbmltYXRlLmFkZFRvRmxpcENlbGxzKGUudGFyZ2V0KTtcbiAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnLCAnZW5lbXktaGl0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnLCAnZW5lbXktbWlzcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzSGl0ID09PSAyKSB7XG4gICAgICAgICAgICAgIGxvZ01lc3NhZ2UoZmFjdG9yeUhlbHBlci5zdW5rTWVzc2FnZShjb29yZCwgZ2FtZWJvYXJkLCBnYW1lLmdldFN0YXRlKCkuXG4gICAgICAgICAgICAgICAgdGFyZ2V0KSlcbiAgICAgICAgICAgICAgbG9nUmVtYWluaW5nKHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRTaGlwcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdhbWUuYWR2YW5jZVN0YXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChuYW1lID09PSAncGxheWVyJykge1xuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgZGlzcGxheUhvdmVyKGUudGFyZ2V0LCBwbGF5ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIChlKSA9PiB7XG4gICAgICAgICAgaWYgKGdhbWUuZ2V0U3RhdGUoKS5pZCA9PT0gMCkge1xuICAgICAgICAgICAgY2xlYXJDbGFzcyhlLnRhcmdldC5wYXJlbnRFbGVtZW50LCBhbGxIb3ZlckNsYXNzZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ3JpZC5zdHlsZVsnZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zJ10gPSBgcmVwZWF0KCR7TWF0aC5zcXJ0KGdhbWVib2FyZFxuICAgICAgICAuZ2V0Qm9hcmQoKS5sZW5ndGgpfSwgMWZyKWA7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5SG92ZXIgPSAoZWxlbWVudCwgcGxheWVyKSA9PiB7XG4gICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGhvdmVyTm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCc6aG92ZXInKTtcbiAgICAgIGVsZW1lbnQgPSBob3Zlck5vZGVMaXN0Lml0ZW0oaG92ZXJOb2RlTGlzdC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgaWYgKHBsYXllciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwbGF5ZXIgPSBnYW1lLmdldFBsYXllcnMoKS5wbGF5ZXI7XG4gICAgfVxuXG4gICAgY29uc3QgZ2FtZWJvYXJkID0gcGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgY29uc3QgY2VsbENvb3JkID0gZ2V0Q29vcmQoZWxlbWVudC5kYXRhc2V0LmNlbGxJZCwgZ2FtZWJvYXJkLmdldEJvYXJkKCkpO1xuICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gZ2FtZS5nZXRTaGlwRm9yUGxhY2VtZW50KCk7XG4gICAgbGV0IGNvb3JkTGlzdCA9IG51bGw7XG5cbiAgICAvLyBHZXQgY29vcmRMaXN0IGNlbnRlcmVkIGFyb3VuZCBob3ZlcmVkIGNvb3JkaW5hdGVcbiAgICBjb29yZExpc3QgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0NlbnRlcmVkKFxuICAgICAgY3VycmVudFNoaXAuc2l6ZSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6IFtjZWxsQ29vcmQueCwgY2VsbENvb3JkLnldLFxuICAgICAgICBkaXI6IGdhbWUuZ2V0RGlyZWN0aW9uKClcbiAgICAgIH1cbiAgICApO1xuICAgIC8vIE51ZGdlIHRoZSBjb29yZExpc3Qgb250byB0aGUgYm9hcmQgaWYgbmVlZGVkXG4gICAgY29vcmRMaXN0ID0gZmFjdG9yeUhlbHBlci5udWRnZUNvb3Jkc09uKGNvb3JkTGlzdCxcbiAgICAgIGdhbWVib2FyZC5nZXRCb2FyZCgpKVxuXG4gICAgLy8gVXBkYXRlIHNoYXJlZCBjb29yZGluYXRlIGxpc3RcbiAgICBzaGFyZWRDb29yZExpc3QgPSBjb29yZExpc3Q7XG5cbiAgICAvLyBTaG93IGF2YWlsYWJpbGl0eSB3aXRoIGhvdmVyIGNvbG9yc1xuICAgIGxldCBob3ZlckNsYXNzZXMgPSBbXTtcbiAgICB0cnkge1xuICAgICAgZmFjdG9yeUhlbHBlci5jaGVja0lmT3Blbihjb29yZExpc3QsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItc29sbycsICdwbGFjZS1ob3ZlciddXG4gICAgfVxuICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgaWYgKGVycm9yID09PSAnY2VsbCBvY2N1cGllZCcpIHtcbiAgICAgICAgaG92ZXJDbGFzc2VzID0gWydwbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvJyxcbiAgICAgICAgICAncGxhY2UtaG92ZXItb2NjdXBpZWQnXVxuICAgICAgfSBlbHNlIGlmIChlcnJvciA9PT0gJ291dCBvZiBib3VuZHMnKSB7XG4gICAgICAgIGhvdmVyQ2xhc3NlcyA9IFsncGxhY2UtaG92ZXItb29iLXNvbG8nLFxuICAgICAgICAgICdwbGFjZS1ob3Zlci1vb2InXTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29vcmRMaXN0LmZvckVhY2goaG92ZXJDb29yZCA9PiB7XG4gICAgICBjb25zdCBjZWxsSW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKFxuICAgICAgICBbaG92ZXJDb29yZFswXSwgaG92ZXJDb29yZFsxXV0sIGdhbWVib2FyZC5nZXRCb2FyZCgpXG4gICAgICApO1xuICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LmNoaWxkTm9kZXMuaXRlbShjZWxsSW5kZXgpLlxuICAgICAgICBjbGFzc0xpc3QuYWRkKGhvdmVyQ2xhc3Nlc1sxXSk7XG4gICAgfSk7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGhvdmVyQ2xhc3Nlc1swXSk7XG4gIH1cblxuICBjb25zdCBkaXNwbGF5Q29vcmQgPSAoaW5kZXgsIGJvYXJkKSA9PiB7XG4gICAgY29uc3QgY29vcmRPYmogPSBmYWN0b3J5SGVscGVyLmdldENvb3JkRnJvbUluZGV4KGluZGV4LCBib2FyZCk7XG4gICAgY29uc3QgY29vcmRUZXh0ID0gYFske2Nvb3JkT2JqLnh9LCAke2Nvb3JkT2JqLnl9XWA7XG4gICAgcmV0dXJuIGNvb3JkVGV4dDtcbiAgfVxuXG4gIGNvbnN0IGdldENvb3JkID0gKGluZGV4LCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkT2JqID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZEZyb21JbmRleChpbmRleCwgYm9hcmQpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjb29yZE9iai54LFxuICAgICAgeTogY29vcmRPYmoueSxcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGFjZVNoaXAgPSAoY29vcmRMaXN0LCBib2FyZCwgZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHBhcmVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICBjb29yZExpc3QuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICBwYXJlbnQuY2hpbGROb2Rlc1tmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKFxuICAgICAgICBjb29yZCwgYm9hcmRcbiAgICAgICldLmNsYXNzTGlzdC5hZGQoJ3NoaXAtc3RhbmRpbmcnKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGNsZWFyQ2xhc3MgPSAocGFyZW50LCBjbGFzc05hbWUpID0+IHtcbiAgICBwYXJlbnQuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAnc3RyaW5nJylcbiAgICAgICAgY2hpbGQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgZWxzZVxuICAgICAgICBjaGlsZC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBsb2dNZXNzYWdlID0gKG1zZykgPT4ge1xuICAgIGNvbnN0IGluZm9EZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tZGV0YWlscycpO1xuICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlID0gaW5mb0RldGFpbHMuZmlyc3RDaGlsZDtcbiAgICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIG1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaW5mby1kZXRhaWxzLW1lc3NhZ2UnKTtcbiAgICBtZXNzYWdlLmlubmVyVGV4dCA9IG1zZztcblxuICAgIGlmIChjdXJyZW50TWVzc2FnZSkge1xuICAgICAgaW5mb0RldGFpbHMuaW5zZXJ0QmVmb3JlKG1lc3NhZ2UsIGN1cnJlbnRNZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5mb0RldGFpbHMuYXBwZW5kQ2hpbGQobWVzc2FnZSk7XG4gICAgfVxuXG4gIH1cblxuICBjb25zdCBsb2dSZW1haW5pbmcgPSAoc2hpcHMpID0+IHtcbiAgICBjb25zdCBpbmZvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tY29udGFpbmVyJyk7XG4gICAgY29uc3QgcHJldkluZm9SZW1haW5pbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1yZW1haW5pbmcnKTtcbiAgICBpZiAocHJldkluZm9SZW1haW5pbmcpIGluZm9Db250YWluZXIucmVtb3ZlQ2hpbGQocHJldkluZm9SZW1haW5pbmcpO1xuXG4gICAgY29uc3QgaW5mb1JlbWFpbmluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm9SZW1haW5pbmcuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmcnKTtcbiAgICBpbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKGluZm9SZW1haW5pbmcpO1xuXG4gICAgY29uc3QgaW5mb1JlbWFpbmluZ1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBpbmZvUmVtYWluaW5nVGl0bGUuY2xhc3NMaXN0LmFkZCgnaW5mby1yZW1haW5pbmctdGl0bGUnKTtcbiAgICBpbmZvUmVtYWluaW5nVGl0bGUuaW5uZXJUZXh0ID0gJ1JlbWFpbmluZyBFbmVteSBTaGlwcyc7XG4gICAgaW5mb1JlbWFpbmluZy5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nVGl0bGUpO1xuXG4gICAgY29uc3QgaW5mb1JlbWFpbmluZ0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvUmVtYWluaW5nTGlzdC5jbGFzc0xpc3QuYWRkKCdpbmZvLXJlbWFpbmluZy1saXN0Jyk7XG4gICAgaW5mb1JlbWFpbmluZy5hcHBlbmRDaGlsZChpbmZvUmVtYWluaW5nTGlzdCk7XG5cbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1NoaXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcmVtYWluaW5nU2hpcC5jbGFzc0xpc3QuYWRkKCdyZW1haW5pbmctc2hpcCcpO1xuICAgICAgICByZW1haW5pbmdTaGlwLmlubmVyVGV4dCArPSBgICR7c2hpcC5nZXROYW1lKCl9ICgke3NoaXAuZ2V0TGVuZ3RoKCl9KWA7XG5cbiAgICAgICAgaW5mb1JlbWFpbmluZ0xpc3QuYXBwZW5kQ2hpbGQocmVtYWluaW5nU2hpcCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjb25zdCBsaXN0U3RyID0gaW5mb1JlbWFpbmluZ0xpc3QuaW5uZXJUZXh0O1xuICAgIC8vIGluZm9SZW1haW5pbmdMaXN0LmlubmVyVGV4dCA9IGxpc3RTdHIuc3Vic3RyaW5nKDAsIGxpc3RTdHIubGVuZ3RoIC0gMSk7XG4gIH1cblxuICBjb25zdCBzdGF0ZU1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgY29uc3QgaW5mb1N0YXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZm8tc3RhdGUnKTtcbiAgICBpbmZvU3RhdGUuaW5uZXJUZXh0ID0gbXNnO1xuICB9XG5cbiAgY29uc3QgZGlzcGxheVJvdGF0ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICBjb25zdCByb3RhdGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3RhdGVCdXR0b24uY2xhc3NMaXN0LmFkZCgncm90YXRlLWJ1dHRvbicpO1xuXG4gICAgY29uc3Qgcm90YXRlQnV0dG9uVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHJvdGF0ZUJ1dHRvblRleHQuY2xhc3NMaXN0LmFkZCgncm90YXRlLWJ1dHRvbi10ZXh0Jyk7XG4gICAgcm90YXRlQnV0dG9uVGV4dC5pbm5lclRleHQgPSAnUm90YXRlJztcblxuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICByb3RhdGVCdXR0b25JY29uLmNsYXNzTGlzdC5hZGQoJ3JvdGF0ZS1idXR0b24taWNvbicpO1xuICAgIHJvdGF0ZUJ1dHRvbkljb24uaW5uZXJUZXh0ID0gJy4nO1xuXG4gICAgcm90YXRlQnV0dG9uLmFwcGVuZENoaWxkKHJvdGF0ZUJ1dHRvblRleHQpO1xuICAgIHJvdGF0ZUJ1dHRvbi5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b25JY29uKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5mby1zdGF0ZS1jb250YWluZXInKS5hcHBlbmRDaGlsZChyb3RhdGVCdXR0b24pO1xuXG4gICAgcm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGdhbWUudG9nZ2xlRGlyZWN0aW9uKCk7XG4gICAgICBjb25zdCBob3JWZXIgPSAoZ2FtZS5nZXREaXJlY3Rpb24oKSA9PT0gJ2UnXG4gICAgICAgID8gJ2hvcml6b250YWwnXG4gICAgICAgIDogJ3ZlcnRpY2FsJyk7XG4gICAgICBsb2dNZXNzYWdlKCdSb3RhdGVkIGRpcmVjdGlvbiB0byAnICsgaG9yVmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHJlbW92ZVJvdGF0ZUJ1dHRvbiA9ICgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm90YXRlLWJ1dHRvbicpLnJlbW92ZSgpO1xuICB9XG5cbiAgY29uc3QgbWFrZUNlbGxzVW5jbGlja2VkID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmVteS1ncmlkJykuY2hpbGROb2Rlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGNlbGwuY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWQtY2VsbC11bmNsaWNrZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHJlbW92ZUNlbGxzVW5jbGlja2VkID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmVteS1ncmlkJykuY2hpbGROb2Rlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdncmlkLWNlbGwtdW5jbGlja2VkJyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBvcHRpb25zID0geyB0aXRsZSwgZGVzY3JpcHRpb24sIGJ1dHRvblRleHQsIGhpZGVCdXR0b25UZXh0LCBjYWxsYmFjayB9XG4gIGNvbnN0IG1ha2VNb2RhbCA9IChvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBjb25zdCBwYWdlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhZ2UtY29udGFpbmVyJyk7XG4gICAgY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnYW1lLWNvbnRhaW5lcicpO1xuXG4gICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdtb2RhbC1jb250YWluZXInKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoJ21vZGFsJyk7XG4gICAgY29uc3QgbW9kYWxUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XG4gICAgbW9kYWxUaXRsZS5jbGFzc0xpc3QuYWRkKCdtb2RhbC10aXRsZScpO1xuICAgIG1vZGFsVGl0bGUuaW5uZXJUZXh0ID0gb3B0aW9ucy50aXRsZTtcbiAgICBjb25zdCBtb2RhbERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICBtb2RhbERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ21vZGFsLWRlc2NyaXB0aW9uJyk7XG4gICAgbW9kYWxEZXNjcmlwdGlvbi5pbm5lclRleHQgPSBvcHRpb25zLmRlc2NyaXB0aW9uO1xuICAgIGNvbnN0IG1vZGFsQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbW9kYWxCdXR0b24uY2xhc3NMaXN0LmFkZCgnbW9kYWwtYnV0dG9uJyk7XG4gICAgbW9kYWxCdXR0b24uaW5uZXJUZXh0ID0gb3B0aW9ucy5idXR0b25UZXh0O1xuICAgIGNvbnN0IGhpZGVNb2RhbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGhpZGVNb2RhbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRlLW1vZGFsLWJ1dHRvbicpO1xuICAgIGhpZGVNb2RhbEJ1dHRvbi5pbm5lclRleHQgPSBvcHRpb25zLmhpZGVCdXR0b25UZXh0O1xuXG4gICAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICAgIG1vZGFsQ29udGFpbmVyLmFwcGVuZENoaWxkKGhpZGVNb2RhbEJ1dHRvbik7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxUaXRsZSk7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxEZXNjcmlwdGlvbik7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQobW9kYWxCdXR0b24pO1xuXG4gICAgYm9keS5pbnNlcnRCZWZvcmUobW9kYWxDb250YWluZXIsIHBhZ2VDb250YWluZXIpO1xuXG4gICAgbW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgb3B0aW9ucy5jYWxsYmFjaygpO1xuICAgICAgbW9kYWxDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBoaWRlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKG1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnbW9kYWwtaGlkZGVuJykpIHtcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kYWwtaGlkZGVuJyk7XG4gICAgICAgIGhpZGVNb2RhbEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdtb2RhbC1tb3N0bHktaGlkZGVuJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdtb2RhbC1oaWRkZW4nKTtcbiAgICAgICAgaGlkZU1vZGFsQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ21vZGFsLW1vc3RseS1oaWRkZW4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdGlhbGl6ZSxcbiAgICBjbGVhckRpc3BsYXksXG4gICAgZHJhd0dyaWQsXG4gICAgbG9nTWVzc2FnZSxcbiAgICBzdGF0ZU1lc3NhZ2UsXG4gICAgbG9nUmVtYWluaW5nLFxuICAgIGRpc3BsYXlSb3RhdGVCdXR0b24sXG4gICAgcmVtb3ZlUm90YXRlQnV0dG9uLFxuICAgIG1ha2VDZWxsc1VuY2xpY2tlZCxcbiAgICByZW1vdmVDZWxsc1VuY2xpY2tlZCxcbiAgICBtYWtlTW9kYWwsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXk7IiwiaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi4vc3JjL2hlbHBlcnMvZmFjdG9yeWhlbHBlci5qcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5ZXJGYWN0b3J5ID0gKG15TmFtZSwgYm9hcmRTaXplKSA9PiB7XG4gIGNvbnN0IG5hbWUgPSBteU5hbWU7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGdhbWVib2FyZEZhY3RvcnkoYm9hcmRTaXplKTtcbiAgY29uc3QgYXR0YWNrZWRTcGFjZXMgPSBbXTtcblxuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoKSA9PiB7IHJldHVybiBnYW1lYm9hcmQ7IH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWU7IH07XG5cbiAgY29uc3QgYXR0YWNrID0gKGNvb3JkLCBlbmVteVBsYXllcikgPT4ge1xuICAgIGxldCBhbHJlYWR5QXR0YWNrZWQgPSBmYWxzZTtcbiAgICBhdHRhY2tlZFNwYWNlcy5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbCwgY29vcmQpKSB7XG4gICAgICAgIGFscmVhZHlBdHRhY2tlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWFscmVhZHlBdHRhY2tlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZW5lbXlQbGF5ZXIuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhjb29yZCk7XG4gICAgICAgIGF0dGFja2VkU3BhY2VzLnB1c2goY29vcmQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdGhyb3cgKGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdygnYWxyZWFkeSBhdHRhY2tlZCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0R2FtZWJvYXJkLFxuICAgIGdldE5hbWUsXG4gICAgYXR0YWNrLFxuICB9XG59XG5cbi8vIHByb3BzID0geyBsZW5ndGgsIGluaXRpYWxIaXRzLCBuYW1lIH1cbmV4cG9ydCBjb25zdCBzaGlwRmFjdG9yeSA9IChwcm9wcykgPT4ge1xuICBjb25zdCBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gIGNvbnN0IGhpdHMgPSBwcm9wcy5pbml0aWFsSGl0cyB8fCBbXTtcbiAgY29uc3QgbmFtZSA9IHByb3BzLm5hbWU7XG5cbiAgY29uc3QgaGl0ID0gKGNvb3JkKSA9PiB7XG4gICAgaWYgKCFoaXRzLmluY2x1ZGVzKGNvb3JkKSkge1xuICAgICAgaGl0cy5wdXNoKGNvb3JkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaXNTdW5rID0gKCkgPT4ge1xuICAgIHJldHVybiBoaXRzLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4geyByZXR1cm4gbGVuZ3RoIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IHsgcmV0dXJuIG5hbWUgfTtcblxuICByZXR1cm4ge1xuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGdldE5hbWUsXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdhbWVib2FyZEZhY3RvcnkgPSAoc2l6ZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBbXTtcbiAgY29uc3QgaW5pdGlhbGl6ZSA9ICgoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2l6ZTsgaisrKSB7XG4gICAgICAgIGJvYXJkLnB1c2goe1xuICAgICAgICAgIGNvb3JkOiBbaiwgaV0sXG4gICAgICAgICAgaGl0OiAwLFxuICAgICAgICAgIHNoaXBJZDogbnVsbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICBjb25zdCBzaGlwcyA9IFtdO1xuXG4gIGNvbnN0IGFsbFNoaXBzU3VuayA9ICgpID0+IHtcbiAgICBsZXQgc3VuayA9IHRydWU7XG4gICAgc2hpcHMuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkgc3VuayA9IGZhbHNlO1xuICAgIH0pXG4gICAgcmV0dXJuIHN1bms7XG4gIH1cblxuICAvLyBzaGlwUHJvcHMgPSB7IGxlbmd0aCwgaW5pdGlhbEhpdHMgfVxuICAvLyBsb2NhdGlvblByb3BzID0geyBjb29yZDogW3gsIHldLCBkaXI6ICgnZScgfHwgJ3MnKSB9XG4gIGNvbnN0IHBsYWNlU2hpcCA9IChzaGlwUHJvcHMsIGxvY2F0aW9uUHJvcHMpID0+IHtcbiAgICBsZXQgcGxhY2VkU2hpcElkID0gbnVsbDtcbiAgICBsZXQgcGxhY2VkQ29vcmRzID0gdW5kZWZpbmVkO1xuICAgIHRyeSB7XG4gICAgICBwbGFjZWRDb29yZHMgPSBmYWN0b3J5SGVscGVyLmdldENvb3Jkc0lmT3BlbihcbiAgICAgICAgc2hpcFByb3BzLmxlbmd0aCwgbG9jYXRpb25Qcm9wcywgYm9hcmQpO1xuICAgICAgcGxhY2VkU2hpcElkID0gc2hpcHMucHVzaChzaGlwRmFjdG9yeShzaGlwUHJvcHMpKSAtIDE7XG4gICAgICBib2FyZCA9IGJvYXJkLm1hcChjZWxsID0+IHtcbiAgICAgICAgbGV0IG5ld0NlbGwgPSBjZWxsO1xuICAgICAgICBwbGFjZWRDb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goY2VsbC5jb29yZCwgY29vcmQpKSB7XG4gICAgICAgICAgICBuZXdDZWxsID0ge1xuICAgICAgICAgICAgICBjb29yZDogY29vcmQsXG4gICAgICAgICAgICAgIGhpdDogMCxcbiAgICAgICAgICAgICAgc2hpcElkOiBwbGFjZWRTaGlwSWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5ld0NlbGw7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IChlKVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY29vcmQpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGJvYXJkKTtcbiAgICBpZiAoYm9hcmRbaW5kZXhdLmhpdCAhPT0gMCkge1xuICAgICAgdGhyb3coJ2FscmVhZHkgaGl0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHNoaXBJZCA9IGJvYXJkW2luZGV4XS5zaGlwSWQ7XG4gICAgaWYgKHNoaXBJZCA9PT0gbnVsbCkge1xuICAgICAgYm9hcmRbaW5kZXhdLmhpdCA9IC0xO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvYXJkW2luZGV4XS5oaXQgPSAxO1xuICAgICAgc2hpcHNbc2hpcElkXS5oaXQoY29vcmQpO1xuICAgICAgaWYgKHNoaXBzW3NoaXBJZF0uaXNTdW5rKCkpIHtcbiAgICAgICAgcmV0dXJuIDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRTaGlwcyA9ICgpID0+IHsgcmV0dXJuIHNoaXBzIH07XG5cbiAgY29uc3QgZ2V0VW5zdW5rU2hpcHMgPSAoKSA9PiB7XG4gICAgY29uc3QgdW5zdW5rU2hpcHMgPSBbXTtcbiAgICBzaGlwcy5mb3JFYWNoKHNoaXAgPT4ge1xuICAgICAgaWYgKCFzaGlwLmlzU3VuaygpKSB1bnN1bmtTaGlwcy5wdXNoKHNoaXApO1xuICAgIH0pO1xuICAgIHJldHVybiB1bnN1bmtTaGlwcztcbiAgfVxuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4geyByZXR1cm4gYm9hcmQgfTtcblxuICByZXR1cm4ge1xuICAgIGFsbFNoaXBzU3VuayxcbiAgICBwbGFjZVNoaXAsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICBnZXRTaGlwcyxcbiAgICBnZXRVbnN1bmtTaGlwcyxcbiAgICBnZXRCb2FyZCxcbiAgfVxufSIsImltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgeyBnYW1lYm9hcmRGYWN0b3J5LCBwbGF5ZXJGYWN0b3J5LCBzaGlwRmFjdG9yeSB9IGZyb20gJy4uL3NyYy9mYWN0b3JpZXMuanMnO1xuaW1wb3J0IGZhY3RvcnlIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2ZhY3RvcnloZWxwZXIuanMnO1xuaW1wb3J0IGxvZ2ljIGZyb20gJy4vaGVscGVycy9lbmVteWxvZ2ljLmpzJztcblxuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IGVuZW15RGVsYXlNYXhJbml0aWFsID0gMC44O1xuICBsZXQgZW5lbXlEZWxheU1heCA9IDA7XG4gIGNvbnN0IHN0YXRlcyA9IFtcbiAgICB7XG4gICAgICBpZDogMCxcbiAgICAgIHRhcmdldDogbnVsbCxcbiAgICAgIG5hbWU6ICdQbGFjZSB5b3VyIHNoaXBzJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDEsXG4gICAgICB0YXJnZXQ6ICdlbmVteScsXG4gICAgICBuYW1lOiBcIlBsYXllcidzIHR1cm5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDIsXG4gICAgICB0YXJnZXQ6ICdwbGF5ZXInLFxuICAgICAgbmFtZTogXCJFbmVteSdzIHR1cm5cIlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDMsXG4gICAgICB0YXJnZXQ6IG51bGwsXG4gICAgICBuYW1lOiBcIkdhbWUgZmluaXNoZWRcIlxuICAgIH1cbiAgXTtcbiAgbGV0IHBvc3NpYmxlRW5lbXlBdHRhY2tzID0gbnVsbDtcbiAgbGV0IHN0YXRlID0gc3RhdGVzWzBdO1xuICBsZXQgc2hpcExpc3Q7XG4gIGxldCBjdXJyZW50U2hpcDtcbiAgbGV0IGRpcmVjdGlvbjtcbiAgbGV0IHBsYXllcjEgPSBudWxsO1xuICBsZXQgZW5lbXkxID0gbnVsbDtcblxuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBsb2dpYy5yZXNldCgpO1xuXG4gICAgZW5lbXlEZWxheU1heCA9IGVuZW15RGVsYXlNYXhJbml0aWFsO1xuICAgIHN0YXRlID0gc3RhdGVzWzBdO1xuICAgIHNoaXBMaXN0ID0gW1xuICAgICAgeyBuYW1lOiAnQ2FycmllcicsIHNpemU6IDUgfSxcbiAgICAgIHsgbmFtZTogJ0JhdHRsZXNoaXAnLCBzaXplOiA0IH0sXG4gICAgICB7IG5hbWU6ICdEZXN0cm95ZXInLCBzaXplOiAzIH0sXG4gICAgICB7IG5hbWU6ICdTdWJtYXJpbmUnLCBzaXplOiAzIH0sXG4gICAgICB7IG5hbWU6ICdQYXRyb2wgQm9hdCcsIHNpemU6IDIgfVxuICAgIF07XG4gICAgY3VycmVudFNoaXAgPSAwO1xuICAgIGRpcmVjdGlvbiA9ICdlJztcblxuICAgIHBsYXllcjEgPSBwbGF5ZXJGYWN0b3J5KCdwbGF5ZXInLCAxMCk7XG4gICAgZW5lbXkxID0gcGxheWVyRmFjdG9yeSgnZW5lbXknLCAxMCk7XG4gICAgcG9zc2libGVFbmVteUF0dGFja3MgPSBwbGF5ZXIxLmdldEdhbWVib2FyZCgpLmdldEJvYXJkKCk7XG5cbiAgICBkaXNwbGF5LmRyYXdHcmlkKHBsYXllcjEpO1xuICAgIGRpc3BsYXkuZHJhd0dyaWQoZW5lbXkxKTtcblxuICAgIHBsYWNlUmFuZG9tU2hpcHMoZW5lbXkxKTtcbiAgICBkaXJlY3Rpb24gPSAnZSc7XG4gICAgZGlzcGxheS5kaXNwbGF5Um90YXRlQnV0dG9uKCk7XG4gICAgZGlzcGxheS5sb2dNZXNzYWdlKCdQbGFjZSB5b3VyICcgKyBzaGlwTGlzdFtjdXJyZW50U2hpcF0ubmFtZSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0U2hpcEZvclBsYWNlbWVudCA9ICgpID0+IHtcbiAgICByZXR1cm4gc2hpcExpc3RbY3VycmVudFNoaXBdO1xuICB9XG5cbiAgY29uc3QgYWR2YW5jZVNoaXBQbGFjZW1lbnQgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRTaGlwIDwgNCkge1xuICAgICAgY3VycmVudFNoaXAgKys7XG4gICAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoJ1BsYWNlIHlvdXIgJyArIHNoaXBMaXN0W2N1cnJlbnRTaGlwXS5uYW1lKTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5LmxvZ1JlbWFpbmluZyhlbmVteTEuZ2V0R2FtZWJvYXJkKCkuZ2V0U2hpcHMoKSk7XG4gICAgICBkaXNwbGF5Lm1ha2VDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgYWR2YW5jZVN0YXRlKCk7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBhZHZhbmNlU3RhdGUgPSAoKSA9PiB7XG4gICAgaWYgKHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnRW5lbXkgd2lucy4nKTtcbiAgICAgIGRpc3BsYXkucmVtb3ZlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgICAgZGlzcGxheS5tYWtlTW9kYWwoe1xuICAgICAgICB0aXRsZTogJ0VuZW15IHdpbnMuJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCZXR0ZXIgbHVjayBuZXh0IHRpbWUuJyxcbiAgICAgICAgYnV0dG9uVGV4dDogJ1BsYXkgYWdhaW4nLFxuICAgICAgICBoaWRlQnV0dG9uVGV4dDogJ0hpZGUnLFxuICAgICAgICBjYWxsYmFjazogKCkgPT4geyBcbiAgICAgICAgICBkaXNwbGF5LmluaXRpYWxpemUoKTtcbiAgICAgICAgICBnYW1lLnN0YXJ0KCk7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJZb3UndmUgY2xpY2tlZCB0aGUgYnV0dG9uXCIpXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChlbmVteTEuZ2V0R2FtZWJvYXJkKCkuYWxsU2hpcHNTdW5rKCkpIHtcbiAgICAgIGRpc3BsYXkubG9nTWVzc2FnZSgnWW91IHdpbiEnKTtcbiAgICAgIGRpc3BsYXkucmVtb3ZlQ2VsbHNVbmNsaWNrZWQoKTtcbiAgICAgIHN0YXRlID0gc3RhdGVzWzNdO1xuICAgICAgZGlzcGxheS5tYWtlTW9kYWwoe1xuICAgICAgICB0aXRsZTogJ1lvdSB3aW4hJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiWW91IHN1bmsgYWxsIHRoZSBlbmVteSdzIGJhdHRsZXNoaXBzLlwiLFxuICAgICAgICBidXR0b25UZXh0OiAnUGxheSBhZ2FpbicsXG4gICAgICAgIGhpZGVCdXR0b25UZXh0OiAnSGlkZScsXG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7IFxuICAgICAgICAgIGRpc3BsYXkuaW5pdGlhbGl6ZSgpO1xuICAgICAgICAgIGdhbWUuc3RhcnQoKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIllvdSd2ZSBjbGlja2VkIHRoZSBidXR0b25cIilcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzdGF0ZS5pZCA9PT0gMCkge1xuICAgICAgICBkaXNwbGF5LnJlbW92ZVJvdGF0ZUJ1dHRvbigpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUuaWQgPT09IDEpIHtcbiAgICAgICAgZGlzcGxheS5yZW1vdmVDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1syXTtcbiAgICAgICAgY29uc3QgZGVsYXlUaW1lID0gKGVuZW15RGVsYXlNYXggLyAyICtcbiAgICAgICAgICAgIChNYXRoLnJhbmRvbSgpICogZW5lbXlEZWxheU1heCAvIDIpKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0RlbGF5aW5nICcgKyBkZWxheVRpbWUgKyAnIHNlY29uZHMnKTtcbiAgICAgICAgaWYgKGRlbGF5VGltZSAhPT0gMCkge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZW5lbXlSYW5kb21BdHRhY2soKTtcbiAgICAgICAgICB9LCAxMDAwICogZGVsYXlUaW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmVteVJhbmRvbUF0dGFjaygpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwbGF5Lm1ha2VDZWxsc1VuY2xpY2tlZCgpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlc1sxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkaXNwbGF5LnN0YXRlTWVzc2FnZShzdGF0ZS5uYW1lKTtcbiAgfVxuXG4gIGNvbnN0IGdldFN0YXRlID0gKCkgPT4ge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IGdldERpcmVjdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gZGlyZWN0aW9uO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGlyZWN0aW9uID0gKCkgPT4ge1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdlJykgZGlyZWN0aW9uID0gJ3MnO1xuICAgIGVsc2UgZGlyZWN0aW9uID0gJ2UnO1xuICB9XG5cbiAgY29uc3QgZ2V0UGxheWVycyA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcGxheWVyOiBwbGF5ZXIxLFxuICAgICAgZW5lbXk6IGVuZW15MVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlUmFuZG9tU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgY29uc3QgYm9hcmRTaXplID0gTWF0aC5zcXJ0KHBsYXllci5nZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpLmxlbmd0aCk7XG4gICAgc2hpcExpc3QuZm9yRWFjaChzaGlwID0+IHtcbiAgICAgIGxldCBzdWNjZXNzID0gZmFsc2U7XG4gICAgICB3aGlsZSAoc3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpID09PSAwKSB0b2dnbGVEaXJlY3Rpb24oKTtcbiAgICAgICAgbGV0IGNvb3JkWCA9IG51bGw7XG4gICAgICAgIGxldCBjb29yZFkgPSBudWxsO1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAnZScpIHtcbiAgICAgICAgICBjb29yZFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2l6ZSAtIDEpKSk7XG4gICAgICAgICAgY29vcmRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvb3JkWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUpKTtcbiAgICAgICAgICBjb29yZFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2l6ZSAtIDEpKSk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAocGxheWVyLmdldEdhbWVib2FyZCgpLnBsYWNlU2hpcChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbGVuZ3RoOiBzaGlwLnNpemUsXG4gICAgICAgICAgICAgIG5hbWU6IHNoaXAubmFtZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFtjb29yZFgsIGNvb3JkWV0sXG4gICAgICAgICAgICAgIGRpcjogZGlyZWN0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSkge1xuICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnRmFpbGVkIHRvIHBsYWNlIGEgc2hpcCwgdHJ5aW5nIGFnYWluJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGVuZW15UmFuZG9tQXR0YWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGF0dGFja0Nvb3JkID0gbG9naWMuZ2V0TW92ZShwb3NzaWJsZUVuZW15QXR0YWNrcyk7XG4gICAgY29uc29sZS5sb2coJ0NPT1JEOiAnKTtcbiAgICBjb25zb2xlLmxvZyh7IGF0dGFja0Nvb3JkIH0pO1xuICAgIGNvbnN0IGRpZEhpdCA9IHBsYXllcjEuZ2V0R2FtZWJvYXJkKCkucmVjZWl2ZUF0dGFjayhhdHRhY2tDb29yZCk7XG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXItZ3JpZCcpO1xuICAgIGNvbnN0IGF0dGFja0NlbGxJbmRleCA9IGZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQoYXR0YWNrQ29vcmQsIHBsYXllcjEuXG4gICAgICBnZXRHYW1lYm9hcmQoKS5nZXRCb2FyZCgpKTtcbiAgICBpZiAoZGlkSGl0ID4gMCkge1xuICAgICAgcGxheWVyR3JpZC5jaGlsZE5vZGVzLml0ZW0oYXR0YWNrQ2VsbEluZGV4KS5jbGFzc0xpc3QuYWRkKCdoaXQnLCAncGxheWVyLWhpdCcpO1xuICAgICAgbG9naWMucHJvY2Vzc0hpdChhdHRhY2tDb29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBsYXllckdyaWQuY2hpbGROb2Rlcy5pdGVtKGF0dGFja0NlbGxJbmRleCkuY2xhc3NMaXN0LmFkZCgnbWlzcycsICdwbGF5ZXItbWlzcycpO1xuICAgICAgbG9naWMucHJvY2Vzc01pc3MoYXR0YWNrQ29vcmQpO1xuICAgIH1cbiAgICBpZiAoZGlkSGl0ID09PSAyKSB7XG4gICAgICBkaXNwbGF5LmxvZ01lc3NhZ2UoZmFjdG9yeUhlbHBlci5zdW5rTWVzc2FnZShhdHRhY2tDb29yZCxcbiAgICAgICAgcGxheWVyMS5nZXRHYW1lYm9hcmQoKSwgZ2FtZS5nZXRTdGF0ZSgpLnRhcmdldCkpXG4gICAgICBsb2dpYy5wcm9jZXNzU3VuayhhdHRhY2tDb29yZCk7XG4gICAgfVxuICAgIGFkdmFuY2VTdGF0ZSgpO1xuICB9XG5cbiAgY29uc3QgdG9nZ2xlRGVsYXkgPSAoKSA9PiB7XG4gICAgaWYgKGVuZW15RGVsYXlNYXggPT09IDApIHtcbiAgICAgIGVuZW15RGVsYXlNYXggPSBlbmVteURlbGF5TWF4SW5pdGlhbDtcbiAgICAgIHJldHVybiAnZGVsYXkgb24nO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmVteURlbGF5TWF4ID0gMDtcbiAgICAgIHJldHVybiAnZGVsYXkgb2ZmJztcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0LFxuICAgIGdldFNoaXBGb3JQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVNoaXBQbGFjZW1lbnQsXG4gICAgYWR2YW5jZVN0YXRlLFxuICAgIGdldFN0YXRlLFxuICAgIGdldERpcmVjdGlvbixcbiAgICB0b2dnbGVEaXJlY3Rpb24sXG4gICAgZ2V0UGxheWVycyxcbiAgICB0b2dnbGVEZWxheSxcbiAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZ2FtZTsiLCJpbXBvcnQgZ2FtZSBmcm9tICcuLi9nYW1lLmpzJztcbmltcG9ydCBmYWN0b3J5SGVscGVyIGZyb20gJy4vZmFjdG9yeWhlbHBlci5qcyc7XG5cbmNvbnN0IGVuZW15TG9naWMgPSAoKCkgPT4ge1xuICBsZXQgcGxheWVyR2FtZWJvYXJkID0gbnVsbDtcbiAgbGV0IGFjdGl2ZUhpdHMgPSBbXTtcbiAgLy8geyBjb29yZHMsIG5leHRNb3ZlcywgZEF4aXMgfVxuICBsZXQgYWN0aXZlU2hpcHMgPSBbXTtcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBwbGF5ZXJHYW1lYm9hcmQgPSBudWxsO1xuICAgIGFjdGl2ZUhpdHMgPSBbXTtcbiAgICBhY3RpdmVTaGlwcyA9IFtdO1xuICB9XG5cbiAgY29uc3QgcHJvY2Vzc0hpdCA9IChjb29yZCkgPT4ge1xuICAgIGFjdGl2ZUhpdHMucHVzaChjb29yZCk7XG5cbiAgICAvLyBVcGRhdGUgb3IgY3JlYXRlIHNoaXAgaW4gYWN0aXZlU2hpcHNcbiAgICBpZiAoYWN0aXZlU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5sb2coJ0JCIHVwZGF0aW5nIGFjdGl2ZSBzaGlwJyk7XG4gICAgICB1cGRhdGVBY3RpdmVTaGlwKHsgY29vcmQ6IGNvb3JkIH0pO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlSGl0cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCQiBjcmVhdGluZyBhY3RpdmUgc2hpcCcpO1xuICAgICAgY29uc3QgbmV3U2hpcCA9IHtcbiAgICAgICAgY29vcmRzOiBbYWN0aXZlSGl0c1swXSwgYWN0aXZlSGl0c1sxXV1cbiAgICAgIH1cbiAgICAgIGFjdGl2ZVNoaXBzLnB1c2gobmV3U2hpcCk7XG4gICAgICBuZXdTaGlwLmRBeGlzID0gKG5ld1NoaXAuY29vcmRzWzBdWzBdID09PSBuZXdTaGlwLmNvb3Jkc1sxXVswXSkgPyAncycgOiAnZSc7XG4gICAgICBjb25zb2xlLmxvZyhhY3RpdmVTaGlwc1swXSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgcHJvY2Vzc01pc3MgPSAoY29vcmQpID0+IHtcbiAgICBpZiAoYWN0aXZlU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgZ2V0TmV4dE1vdmVzKGFjdGl2ZVNoaXBzWzBdKTtcbiAgICB9IGVsc2UgaWYgKGFjdGl2ZUhpdHMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGdldEFkamFjZW50RGF0YShhY3RpdmVIaXRzWzBdKS5lbXB0eS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYWN0aXZlSGl0cy5zcGxpY2UoMCwgMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdleGhhdXN0ZWQgaGl0LCByZW1vdmluZycpO1xuICAgICAgICBjb25zb2xlLmxvZyhhY3RpdmVIaXRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBwcm9jZXNzU3VuayA9IChjb29yZCkgPT4ge1xuICAgIGNvbnN0IHN1bmtTaGlwQ29vcmRzID0gZmFjdG9yeUhlbHBlci5nZXRDb29yZHNPZlNoaXAoZmFjdG9yeUhlbHBlci5cbiAgICAgIGdldFNoaXBJZEF0Q29vcmQoY29vcmQsIHBsYXllckdhbWVib2FyZCksIHBsYXllckdhbWVib2FyZCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ3N1bmtTaGlwQ29vcmRzOiAnKTtcbiAgICBjb25zb2xlLmxvZyhzdW5rU2hpcENvb3Jkcyk7XG5cbiAgICAvLyBEZWxldGUgYWxsIG1hdGNoaW5nIGhpdHNcbiAgICBjb25zb2xlLmxvZygnQkIgZGVsZXRpbmcgbWF0Y2hpbmcgaGl0cycpO1xuICAgIGZvciAobGV0IGkgPSBhY3RpdmVIaXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBzdW5rU2hpcENvb3Jkcy5mb3JFYWNoKGNvb3JkID0+IHtcbiAgICAgICAgaWYgKGZhY3RvcnlIZWxwZXIuYXJyYXlzTWF0Y2goYWN0aXZlSGl0c1tpXSwgY29vcmQpKSB7XG4gICAgICAgICAgYWN0aXZlSGl0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIERlbGV0ZSBtYXRjaGluZyBzaGlwXG4gICAgY29uc29sZS5sb2coJ0JCIGRlbGV0aW5nIG1hdGNoaW5nIHNoaXAnKTtcbiAgICAvLyBBZGQgdGhlIHN1bmsgaGl0IHRvIHNoaXAgbWVtb3J5XG4gICAgaWYgKGFjdGl2ZVNoaXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdUSEVSRSBBUkUgTVVMVElQTEUgQUNUSVZFIFNISVBTIScpO1xuICAgIH1cbiAgICBhY3RpdmVTaGlwc1swXS5jb29yZHMucHVzaChjb29yZCk7XG4gICAgbGV0IHNwbGljZVNoaXAgPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlU2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN1bmtTaGlwQ29vcmRzLmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgICBhY3RpdmVTaGlwc1tpXS5jb29yZHMuZm9yRWFjaChhQ29vcmQgPT4ge1xuICAgICAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKGFDb29yZCwgY29vcmQpKSB7XG4gICAgICAgICAgICBzcGxpY2VTaGlwID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHNwbGljZVNoaXAgIT09IG51bGwpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzcGxpY2luZy4uLicpO1xuICAgICAgYWN0aXZlU2hpcHMuc3BsaWNlKHNwbGljZVNoaXAsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyAoXCJEaWRuJ3QgZmluZCBzaGlwIHRvIHNwbGljZVwiKTtcbiAgICB9XG5cblxuICAgIGNvbnNvbGUubG9nKCdhY3RpdmVIaXRzIGFuZCBhY3RpdmVTaGlwczonKTtcbiAgICBjb25zb2xlLmxvZyhhY3RpdmVIaXRzKTtcbiAgICBjb25zb2xlLmxvZyhhY3RpdmVTaGlwcyk7XG4gIH1cblxuICBjb25zdCBnZXRNb3ZlID0gKHBvc3NpYmxlRW5lbXlBdHRhY2tzKSA9PiB7XG4gICAgLy8gR2V0IHBsYXllckdhbWVib2FyZCBvbmNlXG4gICAgaWYgKHBsYXllckdhbWVib2FyZCA9PT0gbnVsbCkgcGxheWVyR2FtZWJvYXJkID0gZ2FtZS5nZXRQbGF5ZXJzKCkucGxheWVyLmdldEdhbWVib2FyZCgpO1xuXG4gICAgaWYgKGFjdGl2ZVNoaXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIFRoZXJlIGlzIGEgc2hpcC4gU3BsaWNlIG5leHRNb3ZlIGZyb20gc2hpcCBhbmQgcmV0dXJuIGl0LlxuICAgICAgY29uc29sZS5sb2coJ0JCIGdldHRpbmcgbmV4dG1vdmUgZnJvbSBhY3RpdmVzaGlwJyk7XG4gICAgICBsZXQgc2hpcCA9IGFjdGl2ZVNoaXBzWzBdO1xuICAgICAgaWYgKCFzaGlwLm5leHRNb3ZlcyB8fCAhc2hpcC5uZXh0TW92ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBnZXROZXh0TW92ZXMoc2hpcCk7XG4gICAgICB9XG4gICAgICBjb25zdCByYW5kb21OZXh0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2hpcC5uZXh0TW92ZXMubGVuZ3RoKTtcblxuICAgICAgc3BsaWNlQ29vcmRGcm9tUEVBKHNoaXAubmV4dE1vdmVzW3JhbmRvbU5leHRdLCBwb3NzaWJsZUVuZW15QXR0YWNrcyk7XG4gICAgICByZXR1cm4gc2hpcC5uZXh0TW92ZXMuc3BsaWNlKHJhbmRvbU5leHQsIDEpWzBdO1xuICAgIH0gZWxzZSBpZiAoYWN0aXZlSGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZygnQkIgYWRqYWNlbnQgbW92ZSBmcm9tIGhpdCcpO1xuICAgICAgLy8gTm8gc2hpcHMsIGJ1dCB0aGVyZSBhcmUgaGl0cy4gVHJ5IGFkamFjZW50LlxuICAgICAgY29uc3QgYWRqYWNlbnRFbXB0eSA9IGdldEFkamFjZW50RGF0YShhY3RpdmVIaXRzWzBdKS5lbXB0eTtcbiAgICAgIGNvbnN0IHJhbmRvbUFkamFjZW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYWRqYWNlbnRFbXB0eS5sZW5ndGgpO1xuXG4gICAgICBzcGxpY2VDb29yZEZyb21QRUEoYWRqYWNlbnRFbXB0eVtyYW5kb21BZGphY2VudF0sIHBvc3NpYmxlRW5lbXlBdHRhY2tzKTtcbiAgICAgIHJldHVybiBhZGphY2VudEVtcHR5LnNwbGljZShyYW5kb21BZGphY2VudCwgMSlbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCQiBnZXR0aW5nIHJhbmRvbScpO1xuICAgICAgLy8gTm8gc2hpcHMgb3IgaGl0cywgcmV0dXJuIGFueSByYW5kb20uXG4gICAgICBjb25zdCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NzaWJsZUVuZW15QXR0YWNrcy5sZW5ndGgpO1xuICAgICAgY29uc29sZS5sb2coJ3NwbGljaW5nIHJhbmRvbScpO1xuICAgICAgY29uc3QgcmFuZG9tQXR0YWNrID0gcG9zc2libGVFbmVteUF0dGFja3Muc3BsaWNlKHJhbmRvbSwgMSk7XG4gICAgICByZXR1cm4gcmFuZG9tQXR0YWNrWzBdLmNvb3JkO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBjdXJyZW50IGFjdGl2ZSBzaGlwJ3MgbmV4dE1vdmVzIHRvIHRoZSBuZXh0IG9wZW4gc3BvdHMgYWxvbmcgZEF4aXNcbiAgLy8gSWYgdGhlcmUgYXJlbid0IGFueSBtb3JlIGF2YWlsYWJsZSBtb3ZlcywgZmxpcCBhbGwgY29vcmRzIHRvIG5ldyBzaGlwcy5cbiAgY29uc3QgdXBkYXRlQWN0aXZlU2hpcCA9ICh7IGNvb3JkLCBmbGlwREF4aXMgfSkgPT4ge1xuICAgIGxldCBzaGlwID0gYWN0aXZlU2hpcHNbMF07XG4gICAgc2hpcC5jb29yZHMucHVzaChjb29yZCk7XG4gICAgaWYgKGZsaXBEQXhpcykge1xuICAgICAgc2hpcC5kQXhpcyA9IChzaGlwLmRBeGlzID09PSAnZScpID8gJ3MnIDogJ2UnO1xuICAgIH0gZWxzZSBpZiAoc2hpcC5kQXhpcyA9PT0gbnVsbCkge1xuICAgICAgc2hpcC5kQXhpcyA9IChzaGlwLmNvb3Jkc1swXVswXSA9PT0gc2hpcC5jb29yZHNbMV1bMF0pID8gJ3MnIDogJ2UnO1xuICAgIH1cbiAgICBsZXQgc2hpcElkID0gZmFjdG9yeUhlbHBlci5nZXRTaGlwSWRBdENvb3JkKGNvb3JkLCBwbGF5ZXJHYW1lYm9hcmQpO1xuICAgIGxldCBzaGlwRnJvbUJvYXJkID0gcGxheWVyR2FtZWJvYXJkLmdldFNoaXBzKClbc2hpcElkXTtcbiAgICBpZiAoIXNoaXBGcm9tQm9hcmQuaXNTdW5rKCkpIHtcbiAgICAgIGdldE5leHRNb3ZlcyhzaGlwKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXROZXh0TW92ZXMgPSAoc2hpcCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdnZXR0aW5nIG5leHQgbW92ZXMnKTtcbiAgICBjb25zb2xlLmxvZyhhY3RpdmVTaGlwcyk7XG4gICAgbGV0IG1pbiA9IHNoaXAuY29vcmRzWzBdO1xuICAgIGxldCBtYXggPSBzaGlwLmNvb3Jkc1swXTtcbiAgICBsZXQgZGlyTW9kID0gKHNoaXAuZEF4aXMgPT09ICdlJykgPyAwIDogMTtcbiAgICBpZiAoc2hpcC5jb29yZHMubGVuZ3RoID4gMSkge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLmNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tpbmcgY29vcmRpbmF0ZXMgZm9yIG1pbi1tYXguLi4nKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2RBeGlzOiAnICsgc2hpcC5kQXhpcyk7XG4gICAgICAgIGlmIChzaGlwLmNvb3Jkc1tpXVtkaXJNb2RdIDwgbWluW2Rpck1vZF0pIHtcbiAgICAgICAgICBtaW4gPSBzaGlwLmNvb3Jkc1tpXTtcbiAgICAgICAgfSBlbHNlIGlmIChzaGlwLmNvb3Jkc1tpXVtkaXJNb2RdID4gbWF4W2Rpck1vZF0pIHtcbiAgICAgICAgICBtYXggPSBzaGlwLmNvb3Jkc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgbWluOiBbJHttaW5bMF19LCAke21pblsxXX1dYCk7XG4gICAgY29uc29sZS5sb2coYG1heDogWyR7bWF4WzBdfSwgJHttYXhbMV19XWApO1xuICAgIC8vIGNsZWFyIG5leHRNb3Zlc1xuICAgIC8vIEZvciBlYWNoIHNwb3QgdG8gdGhlIHNpZGUgb2YgbWluIG9yIG1heCwgaWYgaXQncyBvcGVuIGFkZCBpdCB0byBuZXh0TW92ZXNcbiAgICBzaGlwLm5leHRNb3ZlcyA9IFtdO1xuXG4gICAgbGV0IG1pbk5leHQgPSAoc2hpcC5kQXhpcyA9PT0gJ2UnKVxuICAgICAgPyBbbWluWzBdIC0gMSwgbWluWzFdXVxuICAgICAgOiBbbWluWzBdLCBtaW5bMV0gLSAxXTtcbiAgICBsZXQgbWluTmV4dENlbGwgPSBudWxsO1xuICAgIGxldCBtYXhOZXh0ID0gKHNoaXAuZEF4aXMgPT09ICdlJylcbiAgICAgID8gW21heFswXSArIDEsIG1heFsxXV1cbiAgICAgIDogW21heFswXSwgbWF4WzFdICsgMV07XG4gICAgbGV0IG1heE5leHRDZWxsID0gbnVsbDtcbiAgICBcbiAgICBjb25zb2xlLmxvZyhgbWluTmV4dDogWyR7bWluTmV4dFswXX0sICR7bWluTmV4dFsxXX1dYCk7XG4gICAgY29uc29sZS5sb2coYG1heE5leHQ6IFske21heE5leHRbMF19LCAke21heE5leHRbMV19XWApO1xuXG4gICAgaWYgKCFmYWN0b3J5SGVscGVyLmlzV2l0aGluQm91bmRhcnkobWluTmV4dCwgcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCkpKSB7XG4gICAgICBtaW5OZXh0ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKCFmYWN0b3J5SGVscGVyLmlzV2l0aGluQm91bmRhcnkobWF4TmV4dCwgcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCkpKSB7XG4gICAgICBtYXhOZXh0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKG1pbk5leHQgIT09IG51bGwpIHtcbiAgICAgICAgbWluTmV4dENlbGwgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVtmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKG1pbk5leHQsXG4gICAgICAgICAgcGxheWVyR2FtZWJvYXJkLmdldEJvYXJkKCkpXTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiA7XG4gICAgfVxuICAgIGlmIChtaW5OZXh0Q2VsbCAmJiBtaW5OZXh0Q2VsbC5oaXQgPT09IDApIHtcbiAgICAgIHNoaXAubmV4dE1vdmVzLnB1c2gobWluTmV4dCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBpZiAobWF4TmV4dCAhPT0gbnVsbCkge1xuICAgICAgICBtYXhOZXh0Q2VsbCA9IHBsYXllckdhbWVib2FyZC5nZXRCb2FyZCgpW2ZhY3RvcnlIZWxwZXIuZ2V0SW5kZXhGcm9tQ29vcmQobWF4TmV4dCxcbiAgICAgICAgICBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKSldO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIDtcbiAgICB9XG4gICAgaWYgKG1heE5leHRDZWxsICYmIG1heE5leHRDZWxsLmhpdCA9PT0gMCkge1xuICAgICAgc2hpcC5uZXh0TW92ZXMucHVzaChtYXhOZXh0KTtcbiAgICB9XG5cbiAgICAvLyBJZiBuZWl0aGVyIGFyZSBvcGVuLCBkbyB0aGUgZmxpcFxuICAgIGlmIChzaGlwLm5leHRNb3Zlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkb2luZyB0aGUgZmxpcCcpO1xuICAgICAgYWN0aXZlU2hpcHMuc3BsaWNlKDAsIDEpO1xuICAgICAgc2hpcC5jb29yZHMuZm9yRWFjaChjb29yZCA9PiB7XG4gICAgICAgIGxldCB0aGlzU2hpcCA9IHtcbiAgICAgICAgICBjb29yZHM6IFtjb29yZF0sXG4gICAgICAgICAgZEF4aXM6IChzaGlwLmRBeGlzID09PSAnZScpID8gJ3MnIDogJ2UnXG4gICAgICAgIH1cbiAgICAgICAgYWN0aXZlU2hpcHMucHVzaCh0aGlzU2hpcCk7XG4gICAgICAgIGdldE5leHRNb3Zlcyh0aGlzU2hpcCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coIHNoaXAubmV4dE1vdmVzICk7XG4gIH1cbiAgXG4gIGNvbnN0IGdldEFkamFjZW50RGF0YSA9IChjb29yZCkgPT4ge1xuICAgIGxldCBzZWFyY2hBcnJheXMgPSBbXG4gICAgICBbY29vcmRbMF0sIGNvb3JkWzFdIC0gMV0sXG4gICAgICBbY29vcmRbMF0sIGNvb3JkWzFdICsgMV0sXG4gICAgICBbY29vcmRbMF0gLSAxLCBjb29yZFsxXV0sXG4gICAgICBbY29vcmRbMF0gKyAxLCBjb29yZFsxXV0sXG4gICAgXVxuICAgIGxldCBhZGpIaXRzID0gW107XG4gICAgbGV0IGFkakVtcHR5ID0gW107XG4gICAgbGV0IGFkak1pc3NlcyA9IFtdO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzZWFyY2hDb29yZCA9IHNlYXJjaEFycmF5c1tpXTtcbiAgICAgICAgY29uc3QgYm9hcmQgPSBwbGF5ZXJHYW1lYm9hcmQuZ2V0Qm9hcmQoKVxuICAgICAgICBsZXQgaW5kZXggPSBmYWN0b3J5SGVscGVyLmdldEluZGV4RnJvbUNvb3JkKHNlYXJjaENvb3JkLCBib2FyZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChib2FyZFtpbmRleF0uaGl0ID09PSAxKSB7XG4gICAgICAgICAgICBhZGpIaXRzLnB1c2goc2VhcmNoQ29vcmQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYm9hcmRbaW5kZXhdLmhpdCA9PT0gMCkge1xuICAgICAgICAgICAgYWRqRW1wdHkucHVzaChzZWFyY2hDb29yZClcbiAgICAgICAgICB9IGVsc2UgaWYgKGJvYXJkW2luZGV4XS5oaXQgPT09IC0xKSB7XG4gICAgICAgICAgICBhZGpNaXNzZXMucHVzaChzZWFyY2hDb29yZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggeyBcbiAgICAgICAgY29uc29sZS5sb2coJ291dCBvZiBib3VuZHMnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygge2FkakhpdHMsIGFkak1pc3NlcywgYWRqRW1wdHl9KTtcbiAgICByZXR1cm4ge1xuICAgICAgaGl0czogYWRqSGl0cyxcbiAgICAgIG1pc3NlczogYWRqTWlzc2VzLFxuICAgICAgZW1wdHk6IGFkakVtcHR5XG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHNwbGljZUNvb3JkRnJvbVBFQSA9IChjb29yZCwgcG9zc2libGVFbmVteUF0dGFja3MpID0+IHtcbiAgICBsZXQgaW5kZXggPSBudWxsO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zc2libGVFbmVteUF0dGFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChmYWN0b3J5SGVscGVyLmFycmF5c01hdGNoKHBvc3NpYmxlRW5lbXlBdHRhY2tzW2ldLmNvb3JkLCBjb29yZCkpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygnc3BsaWNpbmcgJylcbiAgICBjb25zb2xlLmxvZygnaW5kZXg6ICcgKyBpbmRleCk7XG4gICAgY29uc29sZS5sb2cocG9zc2libGVFbmVteUF0dGFja3NbaW5kZXhdKTtcbiAgICBwb3NzaWJsZUVuZW15QXR0YWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZXNldCxcbiAgICBwcm9jZXNzSGl0LFxuICAgIHByb2Nlc3NNaXNzLFxuICAgIHByb2Nlc3NTdW5rLFxuICAgIGdldE1vdmUsXG4gIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGVuZW15TG9naWM7IiwiY29uc3QgZmFjdG9yeUhlbHBlciA9ICgoKSA9PiB7XG4gIGNvbnN0IGFycmF5c01hdGNoID0gKGNvb3JkMSwgY29vcmQyKSA9PiB7XG4gICAgcmV0dXJuIChKU09OLnN0cmluZ2lmeShjb29yZDEpID09PSBKU09OLnN0cmluZ2lmeShjb29yZDIpKVxuICAgICAgPyB0cnVlIDogZmFsc2U7XG4gIH1cblxuICBjb25zdCBjaGVja0lmT3BlbiA9IChjb29yZExpc3QsIGJvYXJkKSA9PiB7XG4gICAgbGV0IGlzT3BlbiA9IHRydWU7XG4gICAgY29vcmRMaXN0LmZvckVhY2goY29vcmQgPT4ge1xuICAgICAgY29uc3QgYm9hcmRDZWxsID0gYm9hcmRbZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGJvYXJkKV07XG4gICAgICBpZiAoYm9hcmRDZWxsLnNoaXBJZCAhPT0gbnVsbCkge1xuICAgICAgICBpc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhyb3coJ2NlbGwgb2NjdXBpZWQnKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBpc09wZW47XG4gIH1cblxuICAgIC8vIGxvY2F0aW9uUHJvcHMgPSB7IGNvb3JkOiBbNSwgNV0sIGRpcjogKGUgfHwgcykgfVxuICBjb25zdCBnZXRDb29yZHNJZk9wZW4gPSAobGVuZ3RoLCBsb2NhdGlvblByb3BzLCBib2FyZCkgPT4ge1xuICAgIGNvbnN0IGNvb3JkcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzZWFyY2hYID0gbG9jYXRpb25Qcm9wcy5jb29yZFswXTtcbiAgICAgIGxldCBzZWFyY2hZID0gbG9jYXRpb25Qcm9wcy5jb29yZFsxXTtcbiAgICAgIGxvY2F0aW9uUHJvcHMuZGlyID09PSAnZSdcbiAgICAgICAgPyBzZWFyY2hYICs9IGlcbiAgICAgICAgOiBzZWFyY2hZICs9IGk7XG4gICAgICBjb25zdCBtYXRjaGluZ0NlbGwgPSBib2FyZC5maW5kKGNlbGwgPT4gXG4gICAgICAgIGFycmF5c01hdGNoKGNlbGwuY29vcmQsIFtzZWFyY2hYLCBzZWFyY2hZXSlcbiAgICAgICk7XG4gICAgICBcbiAgICAgIGlmICghbWF0Y2hpbmdDZWxsKSB0aHJvdygnb3V0IG9mIGJvdW5kcycpO1xuICAgICAgZWxzZSBpZiAobWF0Y2hpbmdDZWxsLnNoaXBJZCAhPT0gbnVsbCkgdGhyb3coJ2NlbGwgb2NjdXBpZWQnKVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIFN1Y2Nlc3NcbiAgICAgICAgY29vcmRzLnB1c2goW3NlYXJjaFgsIHNlYXJjaFldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvb3JkcztcbiAgfVxuXG4gIGNvbnN0IGdldENvb3Jkc0NlbnRlcmVkID0gKGxlbmd0aCwgbG9jYXRpb25Qcm9wcykgPT4ge1xuICAgIGxldCBzdGFydGluZ0Nvb3JkID0gbnVsbDtcbiAgICBjb25zdCBkaXIgPSBsb2NhdGlvblByb3BzLmRpcjtcbiAgICBpZiAoZGlyID09PSAnZScpIHtcbiAgICAgIHN0YXJ0aW5nQ29vcmQgPSBbXG4gICAgICAgIGxvY2F0aW9uUHJvcHMuY29vcmRbMF0gLSBNYXRoLmZsb29yKChsZW5ndGggLSAxKS8yKSxcbiAgICAgICAgbG9jYXRpb25Qcm9wcy5jb29yZFsxXVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKGRpciA9PT0gJ3MnKSB7XG4gICAgICBzdGFydGluZ0Nvb3JkID0gW1xuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzBdLFxuICAgICAgICBsb2NhdGlvblByb3BzLmNvb3JkWzFdIC0gTWF0aC5mbG9vcigobGVuZ3RoIC0gMSkvMilcbiAgICAgIF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93KCdwbGVhc2Ugc3BlY2lmeSBkaXJlY3Rpb24gYmVmb3JlIGdldHRpbmcgY29vcmRpbmF0ZXMnKTtcbiAgICB9XG4gICAgbGV0IGNvb3JkQXJyYXkgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArKykge1xuICAgICAgY29uc3QgY29vcmRYID0gKGRpciA9PT0gJ2UnKVxuICAgICAgICA/IHN0YXJ0aW5nQ29vcmRbMF0gKyBpXG4gICAgICAgIDogc3RhcnRpbmdDb29yZFswXTtcbiAgICAgIGNvbnN0IGNvb3JkWSA9IChkaXIgPT09ICdzJylcbiAgICAgICAgPyBzdGFydGluZ0Nvb3JkWzFdICsgaVxuICAgICAgICA6IHN0YXJ0aW5nQ29vcmRbMV07XG4gICAgICBjb29yZEFycmF5LnB1c2goW2Nvb3JkWCwgY29vcmRZXSk7XG4gICAgfVxuICAgIHJldHVybiBjb29yZEFycmF5O1xuICB9XG5cbiAgY29uc3QgZ2V0SW5kZXhGcm9tQ29vcmQgPSAoY29vcmQsIGJvYXJkKSA9PiB7XG4gICAgaWYgKGNvb3JkWzBdIDwgMCB8fCBjb29yZFswXSA+IChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpKSB7XG4gICAgICB0aHJvdygnZ2V0SW5kZXguLi46IFswXSBpcyBvdXQgb2YgYm91bmRzJyk7XG4gICAgfSBlbHNlIGlmIChjb29yZFsxXSA8IDAgfHwgY29vcmRbMV0gPiAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKSkge1xuICAgICAgdGhyb3coJ2dldEluZGV4Li4uOiBbMV0gaXMgb3V0IG9mIGJvdW5kcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IGNvb3JkWzFdICogTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgKyBjb29yZFswXTtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRDb29yZEZyb21JbmRleCA9IChpbmRleCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBzaXplID0gTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCk7XG4gICAgY29uc3QgeCA9IGluZGV4ICUgc2l6ZTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihpbmRleCAvIHNpemUpO1xuICAgIFxuICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfVxuICB9XG5cbiAgY29uc3QgbnVkZ2VDb29yZHNCeSA9IChjb29yZExpc3QsIG51bWJlcikgPT4ge1xuXG4gIH1cblxuICBjb25zdCBudWRnZUNvb3Jkc09uID0gKGNvb3JkTGlzdCwgYm9hcmQpID0+IHtcbiAgICBjb25zdCBmaXJzdENvb3JkID0gY29vcmRMaXN0WzBdO1xuICAgIGNvbnN0IGxhc3RDb29yZCA9IGNvb3JkTGlzdFtjb29yZExpc3QubGVuZ3RoIC0gMV07XG4gICAgbGV0IG5ld0xpc3QgPSBudWxsO1xuICAgIC8vIG9mZiB0aGUgcmlnaHQgc2lkZVxuICAgIGNvbnN0IHJpZ2h0U2lkZUhhbmcgPSBsYXN0Q29vcmRbMF0gLSAoTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkgLSAxKTtcbiAgICBjb25zdCBsZWZ0U2lkZUhhbmcgID0gLTEgKiBmaXJzdENvb3JkWzBdO1xuICAgIGNvbnN0IHRvcEhhbmcgICAgICAgPSAtMSAqIGZpcnN0Q29vcmRbMV07XG4gICAgY29uc3QgYm90dG9tSGFuZyAgICA9IGxhc3RDb29yZFsxXSAtIChNYXRoLnNxcnQoYm9hcmQubGVuZ3RoKSAtIDEpO1xuICAgIGlmIChyaWdodFNpZGVIYW5nID4gMCkge1xuICAgICAgbmV3TGlzdCA9IGNvb3JkTGlzdC5tYXAoY29vcmQgPT4ge1xuICAgICAgICByZXR1cm4gW2Nvb3JkWzBdIC0gcmlnaHRTaWRlSGFuZywgY29vcmRbMV1dO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChsZWZ0U2lkZUhhbmcgPiAwKSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0Lm1hcChjb29yZCA9PiB7XG4gICAgICAgIHJldHVybiBbY29vcmRbMF0gKyBsZWZ0U2lkZUhhbmcsIGNvb3JkWzFdXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodG9wSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gKyB0b3BIYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYm90dG9tSGFuZyA+IDApIHtcbiAgICAgIG5ld0xpc3QgPSBjb29yZExpc3QubWFwKGNvb3JkID0+IHtcbiAgICAgICAgcmV0dXJuIFtjb29yZFswXSwgY29vcmRbMV0gLSBib3R0b21IYW5nXTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMaXN0ID0gY29vcmRMaXN0O1xuICAgIH1cbiAgICByZXR1cm4gbmV3TGlzdDtcbiAgfVxuXG4gIGNvbnN0IHN1bmtNZXNzYWdlID0gKGNvb3JkLCBnYW1lYm9hcmQsIHRhcmdldCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCB7Y29vcmQsIGdhbWVib2FyZCwgdGFyZ2V0IH0pO1xuICAgIGlmIChjb29yZC54ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvb3JkID0gW2Nvb3JkLngsIGNvb3JkLnldO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IGdldEluZGV4RnJvbUNvb3JkKGNvb3JkLCBnYW1lYm9hcmQuZ2V0Qm9hcmQoKSk7XG4gICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgIGNvbnN0IHNoaXBJZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpW2luZGV4XS5zaGlwSWQ7XG4gICAgY29uc3QgYXR0YWNrZXIgPSAodGFyZ2V0ID09PSAnZW5lbXknXG4gICAgICA/ICdZb3UnXG4gICAgICA6ICdFbmVteScpO1xuICAgIGNvbnN0IHNoaXBOYW1lID0gZ2FtZWJvYXJkLmdldFNoaXBzKClbc2hpcElkXS5nZXROYW1lKCk7XG4gICAgY29uc3Qgc2hpcFNpemUgPSBnYW1lYm9hcmQuZ2V0U2hpcHMoKVtzaGlwSWRdLmdldExlbmd0aCgpO1xuICAgIHJldHVybiBhdHRhY2tlciArICcgc3VuayB0aGUgJyArIHNoaXBOYW1lICsgJyEgKCcgKyBzaGlwU2l6ZSArICcpJztcbiAgfVxuXG4gIGNvbnN0IGdldFNoaXBJZEF0Q29vcmQgPSAoY29vcmQsIGdhbWVib2FyZCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gZ2V0SW5kZXhGcm9tQ29vcmQoY29vcmQsIGdhbWVib2FyZC5nZXRCb2FyZCgpKTtcbiAgICBjb25zdCBzaGlwSWQgPSBnYW1lYm9hcmQuZ2V0Qm9hcmQoKVtpbmRleF0uc2hpcElkO1xuICAgIHJldHVybiBzaGlwSWQ7XG4gIH1cblxuICBjb25zdCBnZXRDb29yZHNPZlNoaXAgPSAoc2hpcElkLCBnYW1lYm9hcmQpID0+IHtcbiAgICBjb25zdCBib2FyZCA9IGdhbWVib2FyZC5nZXRCb2FyZCgpO1xuICAgIGxldCBzaGlwQ29vcmRzID0gW107XG4gICAgYm9hcmQuZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmIChjZWxsLnNoaXBJZCA9PT0gc2hpcElkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwdXNoaW5nICcpO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsLmNvb3JkKTtcbiAgICAgICAgc2hpcENvb3Jkcy5wdXNoKGNlbGwuY29vcmQpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHNoaXBDb29yZHM7XG4gIH1cblxuICBjb25zdCBpc1dpdGhpbkJvdW5kYXJ5ID0gKGNvb3JkLCBib2FyZCkgPT4ge1xuICAgIGlmIChjb29yZFswXSA+PSAwICYmIGNvb3JkWzBdIDwgTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkpIHtcbiAgICAgIGlmIChjb29yZFsxXSA+PSAwICYmIGNvb3JkWzFdIDwgTWF0aC5zcXJ0KGJvYXJkLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyYXlzTWF0Y2gsXG4gICAgY2hlY2tJZk9wZW4sXG4gICAgZ2V0Q29vcmRzSWZPcGVuLFxuICAgIGdldENvb3Jkc0NlbnRlcmVkLFxuICAgIGdldEluZGV4RnJvbUNvb3JkLFxuICAgIGdldENvb3JkRnJvbUluZGV4LFxuICAgIG51ZGdlQ29vcmRzQnksXG4gICAgbnVkZ2VDb29yZHNPbixcbiAgICBzdW5rTWVzc2FnZSxcbiAgICBnZXRTaGlwSWRBdENvb3JkLFxuICAgIGdldENvb3Jkc09mU2hpcCxcbiAgICBpc1dpdGhpbkJvdW5kYXJ5LFxuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmYWN0b3J5SGVscGVyOyIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogaHR0cDovL21leWVyd2ViLmNvbS9lcmljL3Rvb2xzL2Nzcy9yZXNldC8gXFxuICAgdjIuMCB8IDIwMTEwMTI2XFxuICAgTGljZW5zZTogbm9uZSAocHVibGljIGRvbWFpbilcXG4qL1xcblxcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSxcXG5oMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBwLCBibG9ja3F1b3RlLCBwcmUsXFxuYSwgYWJiciwgYWNyb255bSwgYWRkcmVzcywgYmlnLCBjaXRlLCBjb2RlLFxcbmRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCxcXG5zbWFsbCwgc3RyaWtlLCBzdHJvbmcsIHN1Yiwgc3VwLCB0dCwgdmFyLFxcbmIsIHUsIGksIGNlbnRlcixcXG5kbCwgZHQsIGRkLCBvbCwgdWwsIGxpLFxcbmZpZWxkc2V0LCBmb3JtLCBsYWJlbCwgbGVnZW5kLFxcbnRhYmxlLCBjYXB0aW9uLCB0Ym9keSwgdGZvb3QsIHRoZWFkLCB0ciwgdGgsIHRkLFxcbmFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBcXG5maWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIFxcbm1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LFxcbnRpbWUsIG1hcmssIGF1ZGlvLCB2aWRlbyB7XFxuXFx0bWFyZ2luOiAwO1xcblxcdHBhZGRpbmc6IDA7XFxuXFx0Ym9yZGVyOiAwO1xcblxcdGZvbnQtc2l6ZTogMTAwJTtcXG5cXHRmb250OiBpbmhlcml0O1xcblxcdHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG59XFxuLyogSFRNTDUgZGlzcGxheS1yb2xlIHJlc2V0IGZvciBvbGRlciBicm93c2VycyAqL1xcbmFydGljbGUsIGFzaWRlLCBkZXRhaWxzLCBmaWdjYXB0aW9uLCBmaWd1cmUsIFxcbmZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgc2VjdGlvbiB7XFxuXFx0ZGlzcGxheTogYmxvY2s7XFxufVxcbmJvZHkge1xcblxcdGxpbmUtaGVpZ2h0OiAxO1xcbn1cXG5vbCwgdWwge1xcblxcdGxpc3Qtc3R5bGU6IG5vbmU7XFxufVxcbmJsb2NrcXVvdGUsIHEge1xcblxcdHF1b3Rlczogbm9uZTtcXG59XFxuYmxvY2txdW90ZTpiZWZvcmUsIGJsb2NrcXVvdGU6YWZ0ZXIsXFxucTpiZWZvcmUsIHE6YWZ0ZXIge1xcblxcdGNvbnRlbnQ6ICcnO1xcblxcdGNvbnRlbnQ6IG5vbmU7XFxufVxcbnRhYmxlIHtcXG5cXHRib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcblxcdGJvcmRlci1zcGFjaW5nOiAwO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvbWV5ZXJyZXNldC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7OztDQUdDOztBQUVEOzs7Ozs7Ozs7Ozs7O0NBYUMsU0FBUztDQUNULFVBQVU7Q0FDVixTQUFTO0NBQ1QsZUFBZTtDQUNmLGFBQWE7Q0FDYix3QkFBd0I7QUFDekI7QUFDQSxnREFBZ0Q7QUFDaEQ7O0NBRUMsY0FBYztBQUNmO0FBQ0E7Q0FDQyxjQUFjO0FBQ2Y7QUFDQTtDQUNDLGdCQUFnQjtBQUNqQjtBQUNBO0NBQ0MsWUFBWTtBQUNiO0FBQ0E7O0NBRUMsV0FBVztDQUNYLGFBQWE7QUFDZDtBQUNBO0NBQ0MseUJBQXlCO0NBQ3pCLGlCQUFpQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBodHRwOi8vbWV5ZXJ3ZWIuY29tL2VyaWMvdG9vbHMvY3NzL3Jlc2V0LyBcXG4gICB2Mi4wIHwgMjAxMTAxMjZcXG4gICBMaWNlbnNlOiBub25lIChwdWJsaWMgZG9tYWluKVxcbiovXFxuXFxuaHRtbCwgYm9keSwgZGl2LCBzcGFuLCBhcHBsZXQsIG9iamVjdCwgaWZyYW1lLFxcbmgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIHAsIGJsb2NrcXVvdGUsIHByZSxcXG5hLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsXFxuZGVsLCBkZm4sIGVtLCBpbWcsIGlucywga2JkLCBxLCBzLCBzYW1wLFxcbnNtYWxsLCBzdHJpa2UsIHN0cm9uZywgc3ViLCBzdXAsIHR0LCB2YXIsXFxuYiwgdSwgaSwgY2VudGVyLFxcbmRsLCBkdCwgZGQsIG9sLCB1bCwgbGksXFxuZmllbGRzZXQsIGZvcm0sIGxhYmVsLCBsZWdlbmQsXFxudGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsXFxuYXJ0aWNsZSwgYXNpZGUsIGNhbnZhcywgZGV0YWlscywgZW1iZWQsIFxcbmZpZ3VyZSwgZmlnY2FwdGlvbiwgZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgXFxubWVudSwgbmF2LCBvdXRwdXQsIHJ1YnksIHNlY3Rpb24sIHN1bW1hcnksXFxudGltZSwgbWFyaywgYXVkaW8sIHZpZGVvIHtcXG5cXHRtYXJnaW46IDA7XFxuXFx0cGFkZGluZzogMDtcXG5cXHRib3JkZXI6IDA7XFxuXFx0Zm9udC1zaXplOiAxMDAlO1xcblxcdGZvbnQ6IGluaGVyaXQ7XFxuXFx0dmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbn1cXG4vKiBIVE1MNSBkaXNwbGF5LXJvbGUgcmVzZXQgZm9yIG9sZGVyIGJyb3dzZXJzICovXFxuYXJ0aWNsZSwgYXNpZGUsIGRldGFpbHMsIGZpZ2NhcHRpb24sIGZpZ3VyZSwgXFxuZm9vdGVyLCBoZWFkZXIsIGhncm91cCwgbWVudSwgbmF2LCBzZWN0aW9uIHtcXG5cXHRkaXNwbGF5OiBibG9jaztcXG59XFxuYm9keSB7XFxuXFx0bGluZS1oZWlnaHQ6IDE7XFxufVxcbm9sLCB1bCB7XFxuXFx0bGlzdC1zdHlsZTogbm9uZTtcXG59XFxuYmxvY2txdW90ZSwgcSB7XFxuXFx0cXVvdGVzOiBub25lO1xcbn1cXG5ibG9ja3F1b3RlOmJlZm9yZSwgYmxvY2txdW90ZTphZnRlcixcXG5xOmJlZm9yZSwgcTphZnRlciB7XFxuXFx0Y29udGVudDogJyc7XFxuXFx0Y29udGVudDogbm9uZTtcXG59XFxudGFibGUge1xcblxcdGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxuXFx0Ym9yZGVyLXNwYWNpbmc6IDA7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2Nzc1dpdGhNYXBwaW5nVG9TdHJpbmcuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tcGFnZS1tYXJnaW46IDFyZW07XFxuICAtLWdyaWQtYm9yZGVyLXNpemU6IDFweDtcXG5cXG4gIC0tbGlnaHQtMTogd2hpdGU7XFxuICAtLWxpZ2h0LTI6ICNFRUU7XFxuICAtLWxpZ2h0LTM6IHJnYigxMzEsIDE3NCwgMjM4KTtcXG4gIC0tZGFyay0xOiBibGFjaztcXG4gIC0tZGFyay0yOiByZ2IoMjEsIDIxLCAyMik7XFxuICAtLWRhcmstMzogcmdiKDMyLCAzMywgMzcpO1xcbiAgLS1kYXJrLTQ6IHJnYig1MywgNTUsIDY2KTtcXG4gIC0tZGFyay01OiByZ2IoNzEsIDg2LCAxMDkpO1xcbiAgLS1tb2RhbC1iYWNrZ3JvdW5kOiByZ2JhKDIxLCAyMSwgMjIsIDAuOCk7XFxuICAtLWFjY2VudC0xOiByZ2IoNzcsIDEzOSwgMjU1KTtcXG4gIC0tYWNjZW50LTI6IHJnYig0NSwgOTYsIDIwNCk7XFxuICAtLWFjY2VudC0zOiByZ2IoMTM0LCAxNTAsIDE4NCk7XFxuICAtLWhvdmVyLXJlZDogcmdiKDE2NywgOTksIDgyKTtcXG4gIC0tcGxheWVyLWhpdDogI2FkNzc2YjtcXG5cXG4gIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oOTB2dywgY2FsYyg0MHJlbSArIDV2dykpO1xcblxcbiAgLyogLS1mb250LWZhY3RvcjogbWF4KGNhbGMoMC44dncgKyAwLjdyZW0pLCAxLjJyZW0pOyAqL1xcbiAgLS1mb250LWZhY3RvcjogY2xhbXAoMS4zcmVtLCBjYWxjKDAuNXZ3ICsgMC43cmVtKSwgMS41cmVtKTtcXG5cXG4gIC0tZm9udC1sZzogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAxLjA1KTtcXG4gIC0tZm9udC1tZDogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjkpO1xcbiAgLS1mb250LXNtOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuNyk7XFxuICAtLWZvbnQteHM6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC42KTtcXG5cXG4gIC8qIC0tZ3JpZC1vZmZzZXQ6IDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgTW9ubycsIG1vbm9zcGFjZTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG59XFxuaDEge1xcbiAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1sZywgMS44cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDIge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1tZCwgMS40cmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDMge1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIG1hcmdpbi1ibG9jay1lbmQ6IDAuM3JlbTtcXG59XFxuaDQge1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMXJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbnAge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbn1cXG5idXR0b24ge1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgTW9ubycsIG1vbm9zcGFjZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4jcGFnZS1jb250YWluZXIge1xcbiAgd2lkdGg6IGNhbGMoMTAwdncgLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKSAqIDIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCBncmF5KTtcXG4gIG1hcmdpbjogdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pO1xcbn1cXG4jZ2FtZS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG4gIHdpZHRoOiB2YXIoLS1jb250YWluZXItd2lkdGgpO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBwYWRkaW5nLXRvcDogY2FsYygxNnZoIC0gNHJlbSk7XFxufVxcbiNib2FyZHMtY29udGFpbmVyIHtcXG5cXG59XFxuLmdyaWQtd3JhcHBlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG59XFxuLmdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogdmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSwgMXB4KSBzb2xpZCB2YXIoLS1kYXJrLTEsIGJsYWNrKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNDI1KTtcXG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQyNSk7XFxuICBtYXJnaW4tYm90dG9tOiAwLjhyZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICByaWdodDogdmFyKC0tZ3JpZC1vZmZzZXQsIDApO1xcbn1cXG4uZW5lbXktZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICNFRUUpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNSk7XFxuICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC41KTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGxlZnQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLnBsYXllci1ncmlkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgI0VFRSk7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbn1cXG4uZ3JpZC1sYWJlbCB7XFxuICAvKiBoZWlnaHQ6IDJyZW07ICovXFxufVxcbi5lbmVteS1hcmVhIC5ncmlkLWxhYmVsIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuLmVuZW15LWRlbGF5LXRvZ2dsZSB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtMSwgYmx1ZSk7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGU6aG92ZXIge1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC0yLCBkYXJrYmx1ZSk7XFxufVxcbi5lbmVteS1hcmVhIHtcXG4gIG1hcmdpbi1yaWdodDogMXJlbTtcXG59XFxuLnBsYXllci1hcmVhIHtcXG5cXG59XFxuLmdyaWQtY2VsbCB7XFxuICAvKiB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMzsgKi9cXG4gIGJvcmRlcjogY2FsYyh2YXIoLS1ncmlkLWJvcmRlci1zaXplKSAvIDIpIHNvbGlkIHZhcigtLWRhcmstMik7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTUsIHdoaXRlKTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkIHtcXG4gIHRyYW5zZm9ybTogc2NhbGUoMSwgMSk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4wOHMsIGJhY2tncm91bmQtY29sb3IgMC4xcztcXG59XFxuLmVuZW15LWdyaWQgLmdyaWQtY2VsbC11bmNsaWNrZWQ6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTMsIGxpZ2h0Z3JheSk7XFxuICAvKiBwb3NpdGlvbjogcmVsYXRpdmU7ICovXFxuICAvKiBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDBweCAwLjVweCBibGFjayxcXG4gICAgICAgICAgICAgIDBweCAwLjJyZW0gMC4zcmVtIDAgcmdiYSgwLDAsMCwwLjMpOyAqL1xcbiAgYm94LXNoYWRvdzogMHB4IDAuMnJlbSAwLjZyZW0gMCByZ2JhKDAsMCwwLDAuMik7XFxuICAvKiB0cmFuc2Zvcm06IHNjYWxlKDEuMjUsIDEuMjUpOyAqL1xcbiAgei1pbmRleDogMjtcXG59XFxuLnBsYWNlLWhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCByZ2IoOTgsIDE1MSwgMjMwKSk7XFxufVxcbi5wbGFjZS1ob3Zlci1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCBkb2RnZXJCbHVlKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjcmltc29uO1xcbn1cXG4ucGxhY2UtaG92ZXItb29iLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG4ucGxhY2UtaG92ZXItb2NjdXBpZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCBnb2xkKTtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkLXNvbG8ge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItcmVkLCBnb2xkKTtcXG59XFxuLnNoaXAtc3RhbmRpbmcge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTEsIGJsdWUpO1xcbn1cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTMsIGxpZ2h0Z3JlZW4pO1xcbn1cXG4uaGl0LWZsaXAge1xcbiAgdHJhbnNmb3JtLXN0eWxlOiBwcmVzZXJ2ZS0zZDtcXG59XFxuQGtleWZyYW1lcyBoaXRmbGlwIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiByb3RhdGVZKDBkZWcpO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgxODBkZWcpO1xcbiAgfVxcbn1cXG4uZW5lbXktaGl0IHtcXG5cXG59XFxuLnBsYXllci1oaXQge1xcbiAgXFxufVxcbi5taXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMiwgIzExMSk7XFxuICAvKiBvcGFjaXR5OiAwOyAqL1xcbn1cXG4uZW5lbXktbWlzcyB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBsYXllci1oaXQsIGJyb3duKTtcXG59XFxuLmluZm8tY29udGFpbmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIHBhZGRpbmc6IDFyZW0gMC40cmVtIDAuNnJlbSAwLjRyZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTUsIHJnYig3MSwgODYsIDEwOSkpO1xcbiAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNCk7XFxufVxcbi5pbmZvLXRpdGxlIHtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbGcsIDEuNHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwO1xcbn1cXG4uaW5mby1zdGF0ZS1jb250YWluZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbn1cXG4uaW5mby1zdGF0ZSB7XFxuICBoZWlnaHQ6IDEuNHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcXG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcXG59XFxuLnJvdGF0ZS1idXR0b24sIC5yb3RhdGUtYnV0dG9uIGRpdiB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5yb3RhdGUtYnV0dG9uIHtcXG4gIGhlaWdodDogMS40cmVtO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjFyZW0gMC42cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC4zcmVtO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstNCwgIzIyMik7XFxufVxcbi5yb3RhdGUtYnV0dG9uOmFjdGl2ZSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMiwgYmx1ZSk7XFxufVxcbi5yb3RhdGUtYnV0dG9uLXRleHQge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjRyZW07XFxufVxcbi5yb3RhdGUtYnV0dG9uLWljb24ge1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMiwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgcGFkZGluZzogMC4wNXJlbSAwLjNyZW07XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLmluZm8tZGV0YWlscyB7XFxuICBoZWlnaHQ6IDE1cmVtO1xcbiAgb3ZlcmZsb3c6IGF1dG87XFxuICBtYXJnaW4tYm90dG9tOiAwLjdyZW07XFxufVxcbi5pbmZvLXJlbWFpbmluZyB7XFxuICBoZWlnaHQ6IDdyZW07XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuNHJlbSAwLjNyZW07XFxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcbi5pbmZvLXJlbWFpbmluZy10aXRsZSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4uaW5mby1yZW1haW5pbmctbGlzdCB7XFxuXFxufVxcbi5yZW1haW5pbmctc2hpcCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0yLCB3aGl0ZSk7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMC4ycmVtO1xcbiAgbWFyZ2luOiAwIDAuM3JlbSAwLjJyZW0gMDtcXG4gIGJvcmRlci1yYWRpdXM6IDAuMnJlbTtcXG59XFxuLmluZm8tZGV0YWlscy1tZXNzYWdlIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC40NXJlbSAwLjNyZW07XFxuICBtYXJnaW4tYm90dG9tOiAwLjFyZW07XFxufVxcblxcbi5tb2RhbC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1hcmdpbjogMDtcXG4gIHotaW5kZXg6IDU7XFxufVxcbi5tb2RhbCB7XFxuICBwYWRkaW5nOiA1cmVtIDVyZW0gNHJlbSA1cmVtO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1tb2RhbC1iYWNrZ3JvdW5kLCByZ2JhKDMwLCAzMCwgMzAsIDAuNykpO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xcbiAgYm9yZGVyLXJhZGl1czogMnJlbTtcXG59XFxuLm1vZGFsLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1mb250LWZhY3RvciwgMS40cmVtKSAqIDEuMTUpO1xcbiAgbWFyZ2luLWJvdHRvbTogMC43cmVtO1xcbn1cXG4ubW9kYWwtZGVzY3JpcHRpb24ge1xcbiAgZm9udC1zaXplOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yLCAxLjRyZW0pICogMC43NSk7XFxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xcbn1cXG4ubW9kYWwtYnV0dG9uIHtcXG4gIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1mb250LWZhY3RvciwgMS40cmVtKSAqIDAuNyk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMXJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuNnJlbTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5oaWRlLW1vZGFsLWJ1dHRvbiB7XFxuICBmb250LXNpemU6IGNhbGModmFyKC0tZm9udC1mYWN0b3IsIDEuNHJlbSkgKiAwLjY1KTtcXG4gIHBhZGRpbmc6IDAuM3JlbSAwLjhyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjZyZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzO1xcbiAgdG9wOiAycmVtO1xcbn1cXG4ubW9kYWwtaGlkZGVuIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLm1vZGFsLW1vc3RseS1oaWRkZW4ge1xcbiAgb3BhY2l0eTogMC4yNTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICA6cm9vdCB7XFxuICAgIC0tY29udGFpbmVyLXdpZHRoOiBtaW4oODB2dywgMjByZW0pO1xcbiAgfVxcbiAgI3BhZ2UtY29udGFpbmVyIHtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgfVxcbiAgI2dhbWUtY29udGFpbmVyIHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHBhZGRpbmctdG9wOiAycmVtO1xcbiAgfVxcbiAgLnBsYXllci1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSk7XFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAxKTtcXG4gIH1cXG4gIC5lbmVteS1ncmlkLXdyYXBwZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC45KTtcXG4gICAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuOSk7XFxuICB9XFxuICAuaW5mby1jb250YWluZXIge1xcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSAtIDFyZW0pO1xcbiAgICBtYXJnaW4tdG9wOiAwLjhyZW07XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxtQkFBbUI7RUFDbkIsdUJBQXVCOztFQUV2QixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixlQUFlO0VBQ2YseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6Qix5QkFBeUI7RUFDekIsMEJBQTBCO0VBQzFCLHlDQUF5QztFQUN6Qyw2QkFBNkI7RUFDN0IsNEJBQTRCO0VBQzVCLDhCQUE4QjtFQUM5Qiw2QkFBNkI7RUFDN0IscUJBQXFCOztFQUVyQiwrQ0FBK0M7O0VBRS9DLHNEQUFzRDtFQUN0RCwwREFBMEQ7O0VBRTFELDBDQUEwQztFQUMxQyx5Q0FBeUM7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RUFBZ0U7RUFDaEUsd0JBQXdCO0VBQ3hCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0Usa0RBQWtEO0VBQ2xELHFCQUFxQjtBQUN2QjtBQUNBO0VBQ0Usa0RBQWtEO0VBQ2xELG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaURBQWlEO0VBQ2pELG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSxrREFBa0Q7RUFDbEQsc0JBQXNCO0VBQ3RCLHFCQUFxQjtFQUNyQixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLHdCQUF3QjtFQUN4QixTQUFTO0FBQ1g7QUFDQTtFQUNFLFVBQVU7RUFDVixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFO0lBQ0UsbUNBQW1DO0VBQ3JDO0VBQ0E7SUFDRSxZQUFZO0VBQ2Q7RUFDQTtJQUNFLGNBQWM7SUFDZCxpQkFBaUI7RUFDbkI7RUFDQTtJQUNFLHVDQUF1QztJQUN2QyxnREFBZ0Q7RUFDbEQ7RUFDQTtJQUNFLHlDQUF5QztJQUN6QyxrREFBa0Q7RUFDcEQ7RUFDQTtJQUNFLDhDQUE4QztJQUM5QyxrQkFBa0I7RUFDcEI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLXBhZ2UtbWFyZ2luOiAxcmVtO1xcbiAgLS1ncmlkLWJvcmRlci1zaXplOiAxcHg7XFxuXFxuICAtLWxpZ2h0LTE6IHdoaXRlO1xcbiAgLS1saWdodC0yOiAjRUVFO1xcbiAgLS1saWdodC0zOiByZ2IoMTMxLCAxNzQsIDIzOCk7XFxuICAtLWRhcmstMTogYmxhY2s7XFxuICAtLWRhcmstMjogcmdiKDIxLCAyMSwgMjIpO1xcbiAgLS1kYXJrLTM6IHJnYigzMiwgMzMsIDM3KTtcXG4gIC0tZGFyay00OiByZ2IoNTMsIDU1LCA2Nik7XFxuICAtLWRhcmstNTogcmdiKDcxLCA4NiwgMTA5KTtcXG4gIC0tbW9kYWwtYmFja2dyb3VuZDogcmdiYSgyMSwgMjEsIDIyLCAwLjgpO1xcbiAgLS1hY2NlbnQtMTogcmdiKDc3LCAxMzksIDI1NSk7XFxuICAtLWFjY2VudC0yOiByZ2IoNDUsIDk2LCAyMDQpO1xcbiAgLS1hY2NlbnQtMzogcmdiKDEzNCwgMTUwLCAxODQpO1xcbiAgLS1ob3Zlci1yZWQ6IHJnYigxNjcsIDk5LCA4Mik7XFxuICAtLXBsYXllci1oaXQ6ICNhZDc3NmI7XFxuXFxuICAtLWNvbnRhaW5lci13aWR0aDogbWluKDkwdncsIGNhbGMoNDByZW0gKyA1dncpKTtcXG5cXG4gIC8qIC0tZm9udC1mYWN0b3I6IG1heChjYWxjKDAuOHZ3ICsgMC43cmVtKSwgMS4ycmVtKTsgKi9cXG4gIC0tZm9udC1mYWN0b3I6IGNsYW1wKDEuM3JlbSwgY2FsYygwLjV2dyArIDAuN3JlbSksIDEuNXJlbSk7XFxuXFxuICAtLWZvbnQtbGc6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMS4wNSk7XFxuICAtLWZvbnQtbWQ6IGNhbGModmFyKC0tZm9udC1mYWN0b3IpICogMC45KTtcXG4gIC0tZm9udC1zbTogY2FsYyh2YXIoLS1mb250LWZhY3RvcikgKiAwLjcpO1xcbiAgLS1mb250LXhzOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yKSAqIDAuNik7XFxuXFxuICAvKiAtLWdyaWQtb2Zmc2V0OiAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIE1vbm8nLCBtb25vc3BhY2U7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxufVxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbGcsIDEuOHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgyIHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtbWQsIDEuNHJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmgzIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQtc20sIDEuMXJlbSk7XFxuICBtYXJnaW4tYmxvY2stZW5kOiAwLjNyZW07XFxufVxcbmg0IHtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDFyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMC4zcmVtO1xcbn1cXG5wIHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG59XFxuYnV0dG9uIHtcXG4gIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIE1vbm8nLCBtb25vc3BhY2U7XFxuICBib3JkZXItcmFkaXVzOiAwLjNyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG59XFxuI3BhZ2UtY29udGFpbmVyIHtcXG4gIHdpZHRoOiBjYWxjKDEwMHZ3IC0gdmFyKC0tcGFnZS1tYXJnaW4sIDJyZW0pICogMik7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSB2YXIoLS1wYWdlLW1hcmdpbiwgMnJlbSkgKiAyKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgZ3JheSk7XFxuICBtYXJnaW46IHZhcigtLXBhZ2UtbWFyZ2luLCAycmVtKTtcXG59XFxuI2dhbWUtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxuICB3aWR0aDogdmFyKC0tY29udGFpbmVyLXdpZHRoKTtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZy10b3A6IGNhbGMoMTZ2aCAtIDRyZW0pO1xcbn1cXG4jYm9hcmRzLWNvbnRhaW5lciB7XFxuXFxufVxcbi5ncmlkLXdyYXBwZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcbi5ncmlkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IHZhcigtLWdyaWQtYm9yZGVyLXNpemUsIDFweCkgc29saWQgdmFyKC0tZGFyay0xLCBibGFjayk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQyNSk7XFxuICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMC40MjUpO1xcbiAgbWFyZ2luLWJvdHRvbTogMC44cmVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgcmlnaHQ6IHZhcigtLWdyaWQtb2Zmc2V0LCAwKTtcXG59XFxuLmVuZW15LWdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjRUVFKTtcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxufVxcbi5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjUpO1xcbiAgcGFkZGluZy1ib3R0b206IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuNSk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBsZWZ0OiB2YXIoLS1ncmlkLW9mZnNldCwgMCk7XFxufVxcbi5wbGF5ZXItZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICNFRUUpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcXG59XFxuLmdyaWQtbGFiZWwge1xcbiAgLyogaGVpZ2h0OiAycmVtOyAqL1xcbn1cXG4uZW5lbXktYXJlYSAuZ3JpZC1sYWJlbCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcbi5lbmVteS1kZWxheS10b2dnbGUge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjb2xvcjogdmFyKC0tYWNjZW50LTEsIGJsdWUpO1xcbn1cXG4uZW5lbXktZGVsYXktdG9nZ2xlOmhvdmVyIHtcXG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtMiwgZGFya2JsdWUpO1xcbn1cXG4uZW5lbXktYXJlYSB7XFxuICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxufVxcbi5wbGF5ZXItYXJlYSB7XFxuXFxufVxcbi5ncmlkLWNlbGwge1xcbiAgLyogdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjM7ICovXFxuICBib3JkZXI6IGNhbGModmFyKC0tZ3JpZC1ib3JkZXItc2l6ZSkgLyAyKSBzb2xpZCB2YXIoLS1kYXJrLTIpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay01LCB3aGl0ZSk7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uZW5lbXktZ3JpZCAuZ3JpZC1jZWxsLXVuY2xpY2tlZCB7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMDhzLCBiYWNrZ3JvdW5kLWNvbG9yIDAuMXM7XFxufVxcbi5lbmVteS1ncmlkIC5ncmlkLWNlbGwtdW5jbGlja2VkOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0zLCBsaWdodGdyYXkpO1xcbiAgLyogcG9zaXRpb246IHJlbGF0aXZlOyAqL1xcbiAgLyogYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAwcHggMC41cHggYmxhY2ssXFxuICAgICAgICAgICAgICAwcHggMC4ycmVtIDAuM3JlbSAwIHJnYmEoMCwwLDAsMC4zKTsgKi9cXG4gIGJveC1zaGFkb3c6IDBweCAwLjJyZW0gMC42cmVtIDAgcmdiYSgwLDAsMCwwLjIpO1xcbiAgLyogdHJhbnNmb3JtOiBzY2FsZSgxLjI1LCAxLjI1KTsgKi9cXG4gIHotaW5kZXg6IDI7XFxufVxcbi5wbGFjZS1ob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgcmdiKDk4LCAxNTEsIDIzMCkpO1xcbn1cXG4ucGxhY2UtaG92ZXItc29sbyB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQtMywgZG9kZ2VyQmx1ZSk7XFxufVxcbi5wbGFjZS1ob3Zlci1vb2Ige1xcbiAgYmFja2dyb3VuZC1jb2xvcjogY3JpbXNvbjtcXG59XFxuLnBsYWNlLWhvdmVyLW9vYi1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuLnBsYWNlLWhvdmVyLW9jY3VwaWVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgZ29sZCk7XFxufVxcbi5wbGFjZS1ob3Zlci1vY2N1cGllZC1zb2xvIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLXJlZCwgZ29sZCk7XFxufVxcbi5zaGlwLXN0YW5kaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWFjY2VudC0xLCBibHVlKTtcXG59XFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1saWdodC0zLCBsaWdodGdyZWVuKTtcXG59XFxuLmhpdC1mbGlwIHtcXG4gIHRyYW5zZm9ybS1zdHlsZTogcHJlc2VydmUtM2Q7XFxufVxcbkBrZXlmcmFtZXMgaGl0ZmxpcCB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogcm90YXRlWSgwZGVnKTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZVkoMTgwZGVnKTtcXG4gIH1cXG59XFxuLmVuZW15LWhpdCB7XFxuXFxufVxcbi5wbGF5ZXItaGl0IHtcXG4gIFxcbn1cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTIsICMxMTEpO1xcbiAgLyogb3BhY2l0eTogMDsgKi9cXG59XFxuLmVuZW15LW1pc3Mge1xcblxcbn1cXG4ucGxheWVyLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wbGF5ZXItaGl0LCBicm93bik7XFxufVxcbi5pbmZvLWNvbnRhaW5lciB7XFxuICBjb2xvcjogdmFyKC0tZGFyay0yLCBibGFjayk7XFxuICBwYWRkaW5nOiAxcmVtIDAuNHJlbSAwLjZyZW0gMC40cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay01LCByZ2IoNzEsIDg2LCAxMDkpKTtcXG4gIHdpZHRoOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjQpO1xcbn1cXG4uaW5mby10aXRsZSB7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LWxnLCAxLjRyZW0pO1xcbiAgbWFyZ2luLWJsb2NrLWVuZDogMDtcXG59XFxuLmluZm8tc3RhdGUtY29udGFpbmVyIHtcXG4gIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG59XFxuLmluZm8tc3RhdGUge1xcbiAgaGVpZ2h0OiAxLjRyZW07XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XFxuICBtYXJnaW4tdG9wOiAwLjVyZW07XFxufVxcbi5yb3RhdGUtYnV0dG9uLCAucm90YXRlLWJ1dHRvbiBkaXYge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG4ucm90YXRlLWJ1dHRvbiB7XFxuICBoZWlnaHQ6IDEuNHJlbTtcXG4gIGNvbG9yOiB2YXIoLS1saWdodC0xLCB3aGl0ZSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTMsICMyMjIpO1xcbiAgcGFkZGluZzogMC4xcmVtIDAuNnJlbTtcXG4gIGJvcmRlci1yYWRpdXM6IDAuM3JlbTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLTQsICMyMjIpO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjphY3RpdmUge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50LTIsIGJsdWUpO1xcbn1cXG4ucm90YXRlLWJ1dHRvbi10ZXh0IHtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC14cywgMC45cmVtKTtcXG4gIG1hcmdpbi1yaWdodDogMC40cmVtO1xcbn1cXG4ucm90YXRlLWJ1dHRvbi1pY29uIHtcXG4gIGNvbG9yOiB2YXIoLS1kYXJrLTIsIGJsYWNrKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWxpZ2h0LTIsIHdoaXRlKTtcXG4gIGZvbnQtc2l6ZTogdmFyKC0tZm9udC1zbSwgMS4xcmVtKTtcXG4gIHBhZGRpbmc6IDAuMDVyZW0gMC4zcmVtO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxufVxcbi5pbmZvLWRldGFpbHMge1xcbiAgaGVpZ2h0OiAxNXJlbTtcXG4gIG92ZXJmbG93OiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogMC43cmVtO1xcbn1cXG4uaW5mby1yZW1haW5pbmcge1xcbiAgaGVpZ2h0OiA3cmVtO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgY29sb3I6IHZhcigtLWxpZ2h0LTEsIHdoaXRlKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstMywgIzIyMik7XFxuICBwYWRkaW5nOiAwLjRyZW0gMC4zcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xcbn1cXG4uaW5mby1yZW1haW5pbmctdGl0bGUge1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXNtLCAxLjFyZW0pO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLmluZm8tcmVtYWluaW5nLWxpc3Qge1xcblxcbn1cXG4ucmVtYWluaW5nLXNoaXAge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgZm9udC1zaXplOiB2YXIoLS1mb250LXhzLCAwLjlyZW0pO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbGlnaHQtMiwgd2hpdGUpO1xcbiAgY29sb3I6IHZhcigtLWRhcmstMiwgYmxhY2spO1xcbiAgcGFkZGluZzogMC4zcmVtIDAuMnJlbTtcXG4gIG1hcmdpbjogMCAwLjNyZW0gMC4ycmVtIDA7XFxuICBib3JkZXItcmFkaXVzOiAwLjJyZW07XFxufVxcbi5pbmZvLWRldGFpbHMtbWVzc2FnZSB7XFxuICBmb250LXNpemU6IHZhcigtLWZvbnQteHMsIDAuOXJlbSk7XFxuICBjb2xvcjogdmFyKC0tbGlnaHQtMSwgd2hpdGUpO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay0zLCAjMjIyKTtcXG4gIHBhZGRpbmc6IDAuNDVyZW0gMC4zcmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogMC4xcmVtO1xcbn1cXG5cXG4ubW9kYWwtY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtYXJnaW46IDA7XFxuICB6LWluZGV4OiA1O1xcbn1cXG4ubW9kYWwge1xcbiAgcGFkZGluZzogNXJlbSA1cmVtIDRyZW0gNXJlbTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbW9kYWwtYmFja2dyb3VuZCwgcmdiYSgzMCwgMzAsIDMwLCAwLjcpKTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcXG4gIGJvcmRlci1yYWRpdXM6IDJyZW07XFxufVxcbi5tb2RhbC10aXRsZSB7XFxuICBmb250LXNpemU6IGNhbGModmFyKC0tZm9udC1mYWN0b3IsIDEuNHJlbSkgKiAxLjE1KTtcXG4gIG1hcmdpbi1ib3R0b206IDAuN3JlbTtcXG59XFxuLm1vZGFsLWRlc2NyaXB0aW9uIHtcXG4gIGZvbnQtc2l6ZTogY2FsYyh2YXIoLS1mb250LWZhY3RvciwgMS40cmVtKSAqIDAuNzUpO1xcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcXG59XFxuLm1vZGFsLWJ1dHRvbiB7XFxuICBmb250LXNpemU6IGNhbGModmFyKC0tZm9udC1mYWN0b3IsIDEuNHJlbSkgKiAwLjcpO1xcbiAgcGFkZGluZzogMC4zcmVtIDFyZW07XFxuICBib3JkZXItcmFkaXVzOiAwLjZyZW07XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG4uaGlkZS1tb2RhbC1idXR0b24ge1xcbiAgZm9udC1zaXplOiBjYWxjKHZhcigtLWZvbnQtZmFjdG9yLCAxLjRyZW0pICogMC42NSk7XFxuICBwYWRkaW5nOiAwLjNyZW0gMC44cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMC42cmVtO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcXG4gIHRvcDogMnJlbTtcXG59XFxuLm1vZGFsLWhpZGRlbiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5tb2RhbC1tb3N0bHktaGlkZGVuIHtcXG4gIG9wYWNpdHk6IDAuMjU7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgOnJvb3Qge1xcbiAgICAtLWNvbnRhaW5lci13aWR0aDogbWluKDgwdncsIDIwcmVtKTtcXG4gIH1cXG4gICNwYWdlLWNvbnRhaW5lciB7XFxuICAgIGhlaWdodDogYXV0bztcXG4gIH1cXG4gICNnYW1lLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICBwYWRkaW5nLXRvcDogMnJlbTtcXG4gIH1cXG4gIC5wbGF5ZXItZ3JpZC13cmFwcGVyIHtcXG4gICAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDEpO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyh2YXIoLS1jb250YWluZXItd2lkdGgpICogMSk7XFxuICB9XFxuICAuZW5lbXktZ3JpZC13cmFwcGVyIHtcXG4gICAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDAuOSk7XFxuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKHZhcigtLWNvbnRhaW5lci13aWR0aCkgKiAwLjkpO1xcbiAgfVxcbiAgLmluZm8tY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IGNhbGModmFyKC0tY29udGFpbmVyLXdpZHRoKSAqIDEgLSAxcmVtKTtcXG4gICAgbWFyZ2luLXRvcDogMC44cmVtO1xcbiAgfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiAobW9kdWxlcywgbWVkaWFRdWVyeSwgZGVkdXBlKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gX3NsaWNlZFRvQXJyYXkoYXJyLCBpKSB7IHJldHVybiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB8fCBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB8fCBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkoYXJyLCBpKSB8fCBfbm9uSXRlcmFibGVSZXN0KCk7IH1cblxuZnVuY3Rpb24gX25vbkl0ZXJhYmxlUmVzdCgpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTsgfVxuXG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7IGlmICghbykgcmV0dXJuOyBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7IGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7IGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pOyBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7IH1cblxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHsgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9XG5cbmZ1bmN0aW9uIF9pdGVyYWJsZVRvQXJyYXlMaW1pdChhcnIsIGkpIHsgdmFyIF9pID0gYXJyICYmICh0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIGFycltTeW1ib2wuaXRlcmF0b3JdIHx8IGFycltcIkBAaXRlcmF0b3JcIl0pOyBpZiAoX2kgPT0gbnVsbCkgcmV0dXJuOyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9zLCBfZTsgdHJ5IHsgZm9yIChfaSA9IF9pLmNhbGwoYXJyKTsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0gIT0gbnVsbCkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9XG5cbmZ1bmN0aW9uIF9hcnJheVdpdGhIb2xlcyhhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgcmV0dXJuIGFycjsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSkge1xuICB2YXIgX2l0ZW0gPSBfc2xpY2VkVG9BcnJheShpdGVtLCA0KSxcbiAgICAgIGNvbnRlbnQgPSBfaXRlbVsxXSxcbiAgICAgIGNzc01hcHBpbmcgPSBfaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tZXllcnJlc2V0LmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWV5ZXJyZXNldC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9tZXllcnJlc2V0LmNzcyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcbmltcG9ydCBkaXNwbGF5IGZyb20gJy4vZGlzcGxheS5qcyc7XG5pbXBvcnQgZ2FtZSBmcm9tICcuL2dhbWUuanMnO1xuXG5kaXNwbGF5LmluaXRpYWxpemUoKTtcbmdhbWUuc3RhcnQoKTsiXSwibmFtZXMiOlsiZ2FtZSIsImFuaW1hdGUiLCJmbGlwQ2VsbHMiLCJhbmltYXRpb25SZWZyZXNoIiwiYW5pbWF0aW9uTGVuZ3RoIiwiZmxpcHBpbmciLCJyZXNldCIsImFkZFRvRmxpcENlbGxzIiwiZWxlbWVudCIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJmbGlwQWxsIiwiZ2V0U3RhdGUiLCJpZCIsImZvckVhY2giLCJjZWxsIiwic3R5bGUiLCJhbmltYXRpb24iLCJvZmZzZXRXaWR0aCIsInNldFRpbWVvdXQiLCJmYWN0b3J5SGVscGVyIiwiZ2FtZWJvYXJkRmFjdG9yeSIsInBsYXllckZhY3RvcnkiLCJzaGlwRmFjdG9yeSIsImRpc3BsYXkiLCJncmlkIiwic2hhcmVkQ29vcmRMaXN0IiwiYWxsSG92ZXJDbGFzc2VzIiwiaW5pdGlhbGl6ZSIsImNsZWFyRGlzcGxheSIsImVuZW15QXJlYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImVuZW15R3JpZFdyYXBwZXIiLCJlbmVteUdyaWRMYWJlbCIsImlubmVyVGV4dCIsImVuZW15RGVsYXlUb2dnbGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInRvZ2dsZURlbGF5IiwiZW5lbXlHcmlkIiwicGxheWVyQXJlYSIsInBsYXllckdyaWRXcmFwcGVyIiwicGxheWVyR3JpZExhYmVsIiwicGxheWVyR3JpZCIsImJvYXJkc0NvbnRhaW5lciIsImluZm9Db250YWluZXIiLCJnYW1lQ29udGFpbmVyIiwiaW5mb1RpdGxlIiwiaW5mb1N0YXRlQ29udGFpbmVyIiwiaW5mb1N0YXRlIiwibmFtZSIsImluZm9EZXRhaWxzIiwiaW5mb1JlbWFpbmluZyIsImluZm9SZW1haW5pbmdUaXRsZSIsImFwcGVuZENoaWxkIiwicGFnZUNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJoYXNDaGlsZE5vZGVzIiwiY2hpbGROb2RlcyIsImNoaWxkIiwicmVtb3ZlIiwia2V5IiwidG9nZ2xlRGlyZWN0aW9uIiwiaG9yVmVyIiwiZ2V0RGlyZWN0aW9uIiwibG9nTWVzc2FnZSIsImNsZWFyQ2xhc3MiLCJkaXNwbGF5SG92ZXIiLCJkcmF3R3JpZCIsInBsYXllciIsImdldE5hbWUiLCJnYW1lYm9hcmQiLCJnZXRHYW1lYm9hcmQiLCJpIiwiZGF0YXNldCIsImNlbGxJZCIsImN1cnJlbnRTaGlwIiwiZ2V0U2hpcEZvclBsYWNlbWVudCIsImNvbnRhaW5zIiwicGxhY2VTaGlwIiwibGVuZ3RoIiwic2l6ZSIsImNvb3JkIiwiZGlyIiwiZ2V0Qm9hcmQiLCJhZHZhbmNlU2hpcFBsYWNlbWVudCIsInBhcmVudEVsZW1lbnQiLCJnZXRDb29yZCIsImlzSGl0IiwicmVjZWl2ZUF0dGFjayIsIngiLCJ5Iiwic3Vua01lc3NhZ2UiLCJsb2dSZW1haW5pbmciLCJnZXRTaGlwcyIsImFkdmFuY2VTdGF0ZSIsIk1hdGgiLCJzcXJ0IiwidW5kZWZpbmVkIiwiaG92ZXJOb2RlTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJpdGVtIiwiZ2V0UGxheWVycyIsImNlbGxDb29yZCIsImNvb3JkTGlzdCIsImdldENvb3Jkc0NlbnRlcmVkIiwibnVkZ2VDb29yZHNPbiIsImhvdmVyQ2xhc3NlcyIsImNoZWNrSWZPcGVuIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaG92ZXJDb29yZCIsImNlbGxJbmRleCIsImdldEluZGV4RnJvbUNvb3JkIiwiZGlzcGxheUNvb3JkIiwiaW5kZXgiLCJib2FyZCIsImNvb3JkT2JqIiwiZ2V0Q29vcmRGcm9tSW5kZXgiLCJjb29yZFRleHQiLCJwYXJlbnQiLCJjbGFzc05hbWUiLCJtc2ciLCJjdXJyZW50TWVzc2FnZSIsImZpcnN0Q2hpbGQiLCJtZXNzYWdlIiwiaW5zZXJ0QmVmb3JlIiwic2hpcHMiLCJwcmV2SW5mb1JlbWFpbmluZyIsInJlbW92ZUNoaWxkIiwiaW5mb1JlbWFpbmluZ0xpc3QiLCJzaGlwIiwiaXNTdW5rIiwicmVtYWluaW5nU2hpcCIsImdldExlbmd0aCIsInN0YXRlTWVzc2FnZSIsImRpc3BsYXlSb3RhdGVCdXR0b24iLCJyb3RhdGVCdXR0b24iLCJyb3RhdGVCdXR0b25UZXh0Iiwicm90YXRlQnV0dG9uSWNvbiIsInJlbW92ZVJvdGF0ZUJ1dHRvbiIsIm1ha2VDZWxsc1VuY2xpY2tlZCIsInJlbW92ZUNlbGxzVW5jbGlja2VkIiwibWFrZU1vZGFsIiwib3B0aW9ucyIsImJvZHkiLCJtb2RhbENvbnRhaW5lciIsIm1vZGFsIiwibW9kYWxUaXRsZSIsInRpdGxlIiwibW9kYWxEZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwibW9kYWxCdXR0b24iLCJidXR0b25UZXh0IiwiaGlkZU1vZGFsQnV0dG9uIiwiaGlkZUJ1dHRvblRleHQiLCJjYWxsYmFjayIsIm15TmFtZSIsImJvYXJkU2l6ZSIsImF0dGFja2VkU3BhY2VzIiwiYXR0YWNrIiwiZW5lbXlQbGF5ZXIiLCJhbHJlYWR5QXR0YWNrZWQiLCJhcnJheXNNYXRjaCIsInByb3BzIiwiaGl0cyIsImluaXRpYWxIaXRzIiwiaGl0IiwiaW5jbHVkZXMiLCJqIiwic2hpcElkIiwiYWxsU2hpcHNTdW5rIiwic3VuayIsInNoaXBQcm9wcyIsImxvY2F0aW9uUHJvcHMiLCJwbGFjZWRTaGlwSWQiLCJwbGFjZWRDb29yZHMiLCJnZXRDb29yZHNJZk9wZW4iLCJtYXAiLCJuZXdDZWxsIiwiZ2V0VW5zdW5rU2hpcHMiLCJ1bnN1bmtTaGlwcyIsImxvZ2ljIiwiZW5lbXlEZWxheU1heEluaXRpYWwiLCJlbmVteURlbGF5TWF4Iiwic3RhdGVzIiwicG9zc2libGVFbmVteUF0dGFja3MiLCJzdGF0ZSIsInNoaXBMaXN0IiwiZGlyZWN0aW9uIiwicGxheWVyMSIsImVuZW15MSIsInN0YXJ0IiwicGxhY2VSYW5kb21TaGlwcyIsImRlbGF5VGltZSIsInJhbmRvbSIsImVuZW15UmFuZG9tQXR0YWNrIiwiZW5lbXkiLCJzdWNjZXNzIiwiZmxvb3IiLCJjb29yZFgiLCJjb29yZFkiLCJhdHRhY2tDb29yZCIsImdldE1vdmUiLCJkaWRIaXQiLCJhdHRhY2tDZWxsSW5kZXgiLCJwcm9jZXNzSGl0IiwicHJvY2Vzc01pc3MiLCJwcm9jZXNzU3VuayIsImVuZW15TG9naWMiLCJwbGF5ZXJHYW1lYm9hcmQiLCJhY3RpdmVIaXRzIiwiYWN0aXZlU2hpcHMiLCJ1cGRhdGVBY3RpdmVTaGlwIiwibmV3U2hpcCIsImNvb3JkcyIsImRBeGlzIiwiZ2V0TmV4dE1vdmVzIiwiZ2V0QWRqYWNlbnREYXRhIiwiZW1wdHkiLCJzcGxpY2UiLCJzdW5rU2hpcENvb3JkcyIsImdldENvb3Jkc09mU2hpcCIsImdldFNoaXBJZEF0Q29vcmQiLCJzcGxpY2VTaGlwIiwiYUNvb3JkIiwibmV4dE1vdmVzIiwicmFuZG9tTmV4dCIsInNwbGljZUNvb3JkRnJvbVBFQSIsImFkamFjZW50RW1wdHkiLCJyYW5kb21BZGphY2VudCIsInJhbmRvbUF0dGFjayIsImZsaXBEQXhpcyIsInNoaXBGcm9tQm9hcmQiLCJtaW4iLCJtYXgiLCJkaXJNb2QiLCJtaW5OZXh0IiwibWluTmV4dENlbGwiLCJtYXhOZXh0IiwibWF4TmV4dENlbGwiLCJpc1dpdGhpbkJvdW5kYXJ5IiwidGhpc1NoaXAiLCJzZWFyY2hBcnJheXMiLCJhZGpIaXRzIiwiYWRqRW1wdHkiLCJhZGpNaXNzZXMiLCJzZWFyY2hDb29yZCIsIm1pc3NlcyIsImNvb3JkMSIsImNvb3JkMiIsIkpTT04iLCJzdHJpbmdpZnkiLCJpc09wZW4iLCJib2FyZENlbGwiLCJzZWFyY2hYIiwic2VhcmNoWSIsIm1hdGNoaW5nQ2VsbCIsImZpbmQiLCJzdGFydGluZ0Nvb3JkIiwiY29vcmRBcnJheSIsIm51ZGdlQ29vcmRzQnkiLCJudW1iZXIiLCJmaXJzdENvb3JkIiwibGFzdENvb3JkIiwibmV3TGlzdCIsInJpZ2h0U2lkZUhhbmciLCJsZWZ0U2lkZUhhbmciLCJ0b3BIYW5nIiwiYm90dG9tSGFuZyIsImF0dGFja2VyIiwic2hpcE5hbWUiLCJzaGlwU2l6ZSIsInNoaXBDb29yZHMiXSwic291cmNlUm9vdCI6IiJ9