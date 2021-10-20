import game from '../game.js';
import factoryHelper from './factoryhelper.js';

const enemyLogic = (() => {
  let playerGameboard = null;
  let activeHits = [];
  // { coords, nextMoves, dAxis }
  let activeShips = [];

  const processHit = (coord) => {
    activeHits.push(coord);

    // Update or create ship in activeShips
    if (activeShips.length > 0) {
      console.log('BB updating active ship');
      updateActiveShip({ coord: coord });
    } else if (activeHits.length === 2) {
      console.log('BB creating active ship');
      const newShip = {
        coords: [activeHits[0], activeHits[1]]
      }
      activeShips.push(newShip);
      newShip.dAxis = (newShip.coords[0][0] === newShip.coords[1][0]) ? 's' : 'e';
      console.log(activeShips[0]);
    }
  }

  const processMiss = (coord) => {
    if (activeShips.length > 0) {
      getNextMoves(activeShips[0]);
    } else if (activeHits.length > 0) {
      if (getAdjacentData(activeHits[0]).empty.length === 0) {
        activeHits.splice(0, 1);
        console.log('exhausted hit, removing');
        console.log(activeHits);
      }
    }
  }

  const processSunk = (coord) => {
    const sunkShipCoords = factoryHelper.getCoordsOfShip(factoryHelper.
      getShipIdAtCoord(coord, playerGameboard), playerGameboard);
    
    console.log('sunkShipCoords: ');
    console.log(sunkShipCoords);

    // Delete all matching hits
    console.log('BB deleting matching hits');
    for (let i = activeHits.length - 1; i >= 0; i--) {
      sunkShipCoords.forEach(coord => {
        if (factoryHelper.arraysMatch(activeHits[i], coord)) {
          activeHits.splice(i, 1);
        }
      });
    }

    // Delete matching ship
    console.log('BB deleting matching ship');
    // Add the sunk hit to ship memory
    if (activeShips.length > 0) {
      console.log('THERE ARE MULTIPLE ACTIVE SHIPS!');
    }
    activeShips[0].coords.push(coord);
    let spliceShip = null;
    for (let i = 0; i < activeShips.length; i++) {
      sunkShipCoords.forEach(coord => {
        activeShips[i].coords.forEach(aCoord => {
          if (factoryHelper.arraysMatch(aCoord, coord)) {
            spliceShip = i;
          }
        })
      });
    }
    if (spliceShip !== null) {
      console.log('splicing...');
      activeShips.splice(spliceShip, 1);
    } else {
      throw ("Didn't find ship to splice");
    }


    console.log('activeHits and activeShips:');
    console.log(activeHits);
    console.log(activeShips);
  }

  const getMove = (possibleEnemyAttacks) => {
    // Get playerGameboard once
    if (playerGameboard === null) playerGameboard = game.getPlayers().player.getGameboard();

    if (activeShips.length > 0) {
      // There is a ship. Splice nextMove from ship and return it.
      console.log('BB getting nextmove from activeship');
      let ship = activeShips[0];
      if (!ship.nextMoves || !ship.nextMoves.length > 0) {
        getNextMoves(ship);
      }
      const randomNext = Math.floor(Math.random() * ship.nextMoves.length);

      spliceCoordFromPEA(ship.nextMoves[randomNext], possibleEnemyAttacks);
      return ship.nextMoves.splice(randomNext, 1)[0];
    } else if (activeHits.length > 0) {
      console.log('BB adjacent move from hit');
      // No ships, but there are hits. Try adjacent.
      const adjacentEmpty = getAdjacentData(activeHits[0]).empty;
      const randomAdjacent = Math.floor(Math.random() * adjacentEmpty.length);

      spliceCoordFromPEA(adjacentEmpty[randomAdjacent], possibleEnemyAttacks);
      return adjacentEmpty.splice(randomAdjacent, 1)[0];
    } else {
      console.log('BB getting random');
      // No ships or hits, return any random.
      const random = Math.floor(Math.random() * possibleEnemyAttacks.length);
      console.log('splicing random');
      const randomAttack = possibleEnemyAttacks.splice(random, 1);
      return randomAttack[0].coord;
    }
  }

  // Update current active ship's nextMoves to the next open spots along dAxis
  // If there aren't any more available moves, flip all coords to new ships.
  const updateActiveShip = ({ coord, flipDAxis }) => {
    let ship = activeShips[0];
    ship.coords.push(coord);
    if (flipDAxis) {
      ship.dAxis = (ship.dAxis === 'e') ? 's' : 'e';
    } else if (ship.dAxis === null) {
      ship.dAxis = (ship.coords[0][0] === ship.coords[1][0]) ? 's' : 'e';
    }
    let shipId = factoryHelper.getShipIdAtCoord(coord, playerGameboard);
    let shipFromBoard = playerGameboard.getShips()[shipId];
    if (!shipFromBoard.isSunk()) {
      getNextMoves(ship);
    }
  }

  const getNextMoves = (ship) => {
    console.log('getting next moves');
    console.log(activeShips);
    let min = ship.coords[0];
    let max = ship.coords[0];
    let dirMod = (ship.dAxis === 'e') ? 0 : 1;
    if (ship.coords.length > 1) {
      for (let i = 1; i < ship.coords.length; i++) {
        console.log('checking coordinates for min-max...');
        console.log('dAxis: ' + ship.dAxis);
        if (ship.coords[i][dirMod] < min[dirMod]) {
          min = ship.coords[i];
        } else if (ship.coords[i][dirMod] > max[dirMod]) {
          max = ship.coords[i];
        }
      }
    }
    console.log(`min: [${min[0]}, ${min[1]}]`);
    console.log(`max: [${max[0]}, ${max[1]}]`);
    // clear nextMoves
    // For each spot to the side of min or max, if it's open add it to nextMoves
    ship.nextMoves = [];

    let minNext = (ship.dAxis === 'e')
      ? [min[0] - 1, min[1]]
      : [min[0], min[1] - 1];
    let minNextCell = null;
    let maxNext = (ship.dAxis === 'e')
      ? [max[0] + 1, max[1]]
      : [max[0], max[1] + 1];
    let maxNextCell = null;
    
    console.log(`minNext: [${minNext[0]}, ${minNext[1]}]`);
    console.log(`maxNext: [${maxNext[0]}, ${maxNext[1]}]`);

    if (!factoryHelper.isWithinBoundary(minNext, playerGameboard.getBoard())) {
      minNext = null;
    }
    if (!factoryHelper.isWithinBoundary(maxNext, playerGameboard.getBoard())) {
      maxNext = null;
    }

    try {
      if (minNext !== null) {
        minNextCell = playerGameboard.getBoard()[factoryHelper.getIndexFromCoord(minNext,
          playerGameboard.getBoard())];
      }
    } catch {
      return ;
    }
    if (minNextCell && minNextCell.hit === 0) {
      ship.nextMoves.push(minNext);
    }
    try {
      if (maxNext !== null) {
        maxNextCell = playerGameboard.getBoard()[factoryHelper.getIndexFromCoord(maxNext,
          playerGameboard.getBoard())];
      }
    } catch {
      return ;
    }
    if (maxNextCell && maxNextCell.hit === 0) {
      ship.nextMoves.push(maxNext);
    }

    // If neither are open, do the flip
    if (ship.nextMoves.length === 0) {
      console.log('doing the flip');
      activeShips.splice(0, 1);
      ship.coords.forEach(coord => {
        let thisShip = {
          coords: [coord],
          dAxis: (ship.dAxis === 'e') ? 's' : 'e'
        }
        activeShips.push(thisShip);
        getNextMoves(thisShip);
      });
    }
    console.log( ship.nextMoves );
  }
  
  const getAdjacentData = (coord) => {
    let searchArrays = [
      [coord[0], coord[1] - 1],
      [coord[0], coord[1] + 1],
      [coord[0] - 1, coord[1]],
      [coord[0] + 1, coord[1]],
    ]
    let adjHits = [];
    let adjEmpty = [];
    let adjMisses = [];
    
    for (let i = 0; i < 4; i++) {
      try {
        const searchCoord = searchArrays[i];
        const board = playerGameboard.getBoard()
        let index = factoryHelper.getIndexFromCoord(searchCoord, board);
        if (index !== null) {
          if (board[index].hit === 1) {
            adjHits.push(searchCoord);
          } else if (board[index].hit === 0) {
            adjEmpty.push(searchCoord)
          } else if (board[index].hit === -1) {
            adjMisses.push(searchCoord)
          }
        }
      } catch { 
        console.log('out of bounds');
      }
    }

    console.log( {adjHits, adjMisses, adjEmpty});
    return {
      hits: adjHits,
      misses: adjMisses,
      empty: adjEmpty
    };
  }

  const spliceCoordFromPEA = (coord, possibleEnemyAttacks) => {
    let index = null;
    for (let i = 0; i < possibleEnemyAttacks.length; i++) {
      if (factoryHelper.arraysMatch(possibleEnemyAttacks[i].coord, coord)) {
        index = i;
      }
    }
    console.log('splicing ')
    console.log('index: ' + index);
    console.log(possibleEnemyAttacks[index]);
    possibleEnemyAttacks.splice(index, 1);
  }

  return {
    processHit,
    processMiss,
    processSunk,
    getMove,
  }
})();

export default enemyLogic;