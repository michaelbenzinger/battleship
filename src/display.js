import factoryHelper from './helpers/factoryhelper.js';

const display = (() => {
  const initialize = () => {
    console.log('initializing display');

    const enemyGridWrapper = document.createElement('div');
    enemyGridWrapper.classList.add('grid-wrapper', 'enemy-grid-wrapper');
    const enemyGrid = document.createElement('div');
    enemyGrid.classList.add('grid', 'enemy-grid');
    const playerGridWrapper = document.createElement('div');
    playerGridWrapper.classList.add('grid-wrapper', 'player-grid-wrapper');
    const playerGrid = document.createElement('div')
    playerGrid.classList.add('grid', 'player-grid');

    document.querySelector('#game-container').appendChild(enemyGridWrapper);
    enemyGridWrapper.appendChild(enemyGrid);
    document.querySelector('#game-container').appendChild(playerGridWrapper);
    playerGridWrapper.appendChild(playerGrid);
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

      cell.addEventListener('click', (e) => {
        displayCoord(i, gameboard.getBoard());
        console.log(name);
      });
    }

    grid.style['grid-template-columns'] = `repeat(${Math.sqrt(gameboard
        .getBoard().length)}, 1fr)`;
  }

  const displayCoord = (index, board) => {
    const coordObj = factoryHelper.getCoordFromIndex(index, board);
    const coordText = `[${coordObj.x}, ${coordObj.y}]`;
    console.log(coordText);
  }

  return {
    initialize,
    populateGrid,
  }
})();

export default display;