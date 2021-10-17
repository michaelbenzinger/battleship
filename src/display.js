import factoryHelper from './helpers/factoryhelper.js';
import { gameboardFactory, playerFactory, shipFactory } from '../src/factories.js';
import game from './game.js';


const display = (() => {
  const initialize = () => {
    console.log('initializing display');

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
  };

  const populateGrid = (player) => {
    let grid = null;
    const name = player.getName();
    const gameboard = player.getGameboard();
    if (name === 'enemy') {
      grid = document.querySelector('.enemy-grid');
    } else if (name === 'player') {
      grid = document.querySelector('.player-grid');
    } else {
      throw('please specify owner as "enemy" or "player"');
    }

    for (let i = 0; i < gameboard.getBoard().length; i ++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.cellId = i;
      cell.dataset.player = name;
      grid.appendChild(cell);

      // Test: displays all ship coordinates
    
      // const coordTest = getCoord(i, gameboard.getBoard());
      // const isHitTest = gameboard.receiveAttack([coordTest.x, coordTest.y]);
      // console.log(coordTest);
      // console.log(isHitTest);
      // if (isHitTest) {
      //   cell.style['background-color'] = 'red';
      // }
      
      cell.addEventListener('click', (e) => {
        if (game.getState().target === name) {
          const coord = getCoord(i, gameboard.getBoard());
          const isHit = gameboard.receiveAttack([coord.x, coord.y]);
          console.log(name + ' ' + displayCoord(i, gameboard.getBoard())
            + ' ' + (isHit ? 'hit!' : 'missed'));
          if (isHit) cell.style['background-color'] = 'red';
          game.advanceState();
        }
      });
    }

    grid.style['grid-template-columns'] = `repeat(${Math.sqrt(gameboard
        .getBoard().length)}, 1fr)`;
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

  return {
    initialize,
    populateGrid,
  }
})();

export default display;