import game from '../game.js';
import factoryHelper from './factoryhelper.js';

const enemyLogic = (() => {
  let playerGameboard = null;
  let activeHits = [];
  let activeShips = [];

  const processHit = (coord) => {
    if (playerGameboard === null) playerGameboard = game.getPlayers().player.getGameboard();

    activeHits.push(coord);
  }

  const processSunk = (coord) => {
    let newActiveHits = [];
    let newActiveShips = [];
    const board = playerGameboard.getBoard();
    for (let i = 0; i < activeHits.length; i ++) {
      if (factoryHelper.arraysMatch(coord, activeHits[i]) === false) {
        newActiveHits.push(activeHits[i]);
      }
    }
    activeShips.forEach(ship => {
      if (ship.shipId !== board[factoryHelper.getIndexFromCoord(coord, board)].shipId) {
        newActiveShips.push(ship);
      }
    });

    activeHits = newActiveHits;
    activeShips = newActiveShips;
  }

  const getMove = (possibleEnemyAttacks) => {
    // if (activeMoves.length > 0) {
    //   // If there are available moves, return one of them.
    //   return activeMoves.splice(Math.floor(Math.random() * activeMoves.length), 1);
    // } else if (activeHits.length > 0) {
    //   // If there are unsunk hits, pick one.
    //   const randomHitIndex = Math.floor(Math.random() * activeHits.length);
    //   // See if there are any adjacent hits. If so, feather out and get the next ...
    //   // Empty cell on either side.
    //   if (getAdjacentData(activeHits[randomHitIndex]).hits.length === 0) {

    //   }
    // }
    if (activeShips.length > 0) {

    }
  }

  const getAdjacentData = (coord) => {
    let searchArrays = [
      [coord.x, coord.y - 1],
      [coord.x, coord.y + 1],
      [coord.x - 1, coord.y],
      [coord.x + 1, coord.y],
    ]
    let adjHits = [];
    let adjEmpty = [];
    let adjMisses = [];
    
    for (let i = 0; i < 4; i++) {
      try {
        const searchCoord = searchArrays[i];
        const board = playerGameboard.getBoard()
        const index = factoryHelper.getIndexFromCoord(searchCoord, board);
        if (board[index].hit === 1) {
          adjHits.push(searchCoord);
        } else if (board[index].hit === 0) {
          adjEmpty.push(searchCoord)
        } else if (board[index].hit === -1) {
          adjMisses.push(searchCoord)
        }
      } catch { 
        // Out of bounds
        return;
      }
    }

    return {
      hits: adjHits,
      misses: adjMisses,
      empty: adjEmpty
    };
  }

  return {
    processHit,
    processSunk,
    getMove,
  }
})();

export default enemyLogic;