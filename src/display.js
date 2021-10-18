import factoryHelper from './helpers/factoryhelper.js';
import { gameboardFactory, playerFactory, shipFactory } from '../src/factories.js';
import game from './game.js';


const display = (() => {
  let grid = null;
  let sharedCoordList = null;

  const allHoverClasses = [
    'place-hover',
    'place-hover-solo',
    'place-hover-occupied',
    'place-hover-occupied-solo',
    'place-hover-oob',
    'place-hover-oob-solo'
  ];
  const initialize = () => {
    const enemyGridWrapper = document.createElement('div');
    enemyGridWrapper.classList.add('grid-wrapper', 'enemy-grid-wrapper');
    const enemyGridLabel = document.createElement('h3');
    enemyGridLabel.innerText = 'Enemy';
    const enemyGrid = document.createElement('div');
    enemyGrid.classList.add('grid', 'enemy-grid');
    const playerGridWrapper = document.createElement('div');
    playerGridWrapper.classList.add('grid-wrapper', 'player-grid-wrapper');
    const playerGridLabel = document.createElement('h2');
    playerGridLabel.innerText = 'Player';
    const playerGrid = document.createElement('div')
    playerGrid.classList.add('grid', 'player-grid');

    const gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';

    gameContainer.appendChild(enemyGridLabel);
    gameContainer.appendChild(enemyGridWrapper);
    enemyGridWrapper.appendChild(enemyGrid);
    gameContainer.appendChild(playerGridLabel);
    gameContainer.appendChild(playerGridWrapper);
    playerGridWrapper.appendChild(playerGrid);

    const pageContainer = document.querySelector('#page-container');
    if (pageContainer.hasChildNodes) {
      pageContainer.childNodes.forEach(child => {
        child.remove();
      });
    }
    document.querySelector('#page-container').appendChild(gameContainer);

    document.addEventListener('keydown', (e) => {
      if (e.key === '.') {
        game.toggleDirection();
        clearClass(document.querySelector('.player-grid'), allHoverClasses);
        displayHover();
      }
    });
  };

  const drawGrid = (player) => {
    const name = player.getName();
    const gameboard = player.getGameboard();

    if (name === 'enemy') {
      grid = document.querySelector('.enemy-grid');
    } else if (name === 'player') {
      grid = document.querySelector('.player-grid');
    } else {
      throw('please specify owner as "enemy" or "player"');
    }

    // Adding cells and event listeners
    for (let i = 0; i < gameboard.getBoard().length; i ++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.cellId = i;
      cell.dataset.player = name;
      grid.appendChild(cell);
      
      if (name === 'player') {
        cell.addEventListener('click', (e) => {
          if (game.getState().id === 0) {
            // if ship can be placed
            const currentShip = game.getShipForPlacement();
            if (e.target.classList.contains('place-hover')) {
              // place ship
              gameboard.placeShip(
                {
                  length: currentShip.size
                },
                {
                  coord: sharedCoordList[0],
                  dir: game.getDirection()
                }
              );
              // display placed ship
              placeShip(sharedCoordList, gameboard.getBoard(), e.target);
              // game.advanceShipPlacement
              if (game.advanceShipPlacement() === 1) {
                clearClass(e.target.parentElement, allHoverClasses);
              }
            }
          }
        });
      } else {
        cell.addEventListener('click', (e) => {
          if (game.getState().target === 'enemy') {
            const coord = getCoord(i, gameboard.getBoard());
            const isHit = gameboard.receiveAttack([coord.x, coord.y]);
            console.log(name + ' ' + displayCoord(i, gameboard.getBoard())
              + ' ' + (isHit ? 'hit!' : 'missed'));
            if (isHit) cell.style['background-color'] = 'red';
            game.advanceState();
          }
        });
      };

      if (name === 'player') {
        cell.addEventListener('mouseover', (e) => {
          if (game.getState().id === 0) {
            displayHover(e.target, player);
          }
        });

        cell.addEventListener('mouseout', (e) => {
          if (game.getState().id === 0) {
            clearClass(e.target.parentElement, allHoverClasses);
          }
        });
      }
    }

    grid.style['grid-template-columns'] = `repeat(${Math.sqrt(gameboard
        .getBoard().length)}, 1fr)`;
  }

  const displayHover = (element, player) => {
    if (element === undefined) {
      let hoverNodeList = document.querySelectorAll(':hover');
      element = hoverNodeList.item(hoverNodeList.length - 1);
    }
    if (player === undefined) {
      player = game.getPlayers().player;
    }

    const gameboard = player.getGameboard();

    const cellCoord = getCoord(element.dataset.cellId, gameboard.getBoard());
    const currentShip = game.getShipForPlacement();
    let coordList = null;

    // Get coordList centered around hovered coordinate
    coordList = factoryHelper.getCoordsCentered(
      currentShip.size,
      {
        coord: [cellCoord.x, cellCoord.y],
        dir: game.getDirection()
      }
    );
    // Nudge the coordList onto the board if needed
    coordList = factoryHelper.nudgeCoordsOn(coordList,
      gameboard.getBoard())

    // Update shared coordinate list
    sharedCoordList = coordList;

    // Show availability with hover colors
    let hoverClasses = [];
    try {
      factoryHelper.checkIfOpen(coordList, gameboard.getBoard());
      hoverClasses = ['place-hover-solo', 'place-hover']
    }
    catch (error) {
      console.log(error);
      if (error === 'cell occupied') {
        hoverClasses = ['place-hover-occupied-solo',
          'place-hover-occupied']
      } else if (error === 'out of bounds') {
        hoverClasses = ['place-hover-oob-solo',
          'place-hover-oob'];
      }
    }
    coordList.forEach(hoverCoord => {
      const cellIndex = factoryHelper.getIndexFromCoord(
        [hoverCoord[0], hoverCoord[1]], gameboard.getBoard()
      );
      element.parentElement.childNodes.item(cellIndex).
        classList.add(hoverClasses[1]);
    });
    element.classList.add(hoverClasses[0]);
  }

  const displayCoord = (index, board) => {
    const coordObj = factoryHelper.getCoordFromIndex(index, board);
    const coordText = `[${coordObj.x}, ${coordObj.y}]`;
    return coordText;
  }

  const getCoord = (index, board) => {
    const coordObj = factoryHelper.getCoordFromIndex(index, board);
    return {
      x: coordObj.x,
      y: coordObj.y,
    }
  }

  const placeShip = (coordList, board, element) => {
    const parent = element.parentElement;
    coordList.forEach(coord => {
      parent.childNodes[factoryHelper.getIndexFromCoord(
        coord, board
      )].classList.add('ship-standing');
    });
  }

  const clearClass = (parent, className) => {
    parent.childNodes.forEach(child => {
      if (typeof className === 'string')
        child.classList.remove(className);
      else
        child.classList.remove(...className);
    });
  }

  return {
    initialize,
    drawGrid,
  }
})();

export default display;