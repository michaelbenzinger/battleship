import factoryHelper from '../src/helpers/factoryhelper.js';

export const playerFactory = (myName, boardSize) => {
  const name = myName;
  const gameboard = gameboardFactory(boardSize);
  const attackedSpaces = [];

  const getGameboard = () => { return gameboard; };

  const getName = () => { return name; };

  const attack = (coord, enemyPlayer) => {
    let alreadyAttacked = false;
    attackedSpaces.forEach(cell => {
      if (factoryHelper.arraysMatch(cell, coord)) {
        alreadyAttacked = true;
      }
    })
    if (!alreadyAttacked) {
      try {
        enemyPlayer.getGameboard().receiveAttack(coord);
        attackedSpaces.push(coord);
        return true;
      } catch (e) {
        throw (e);
      }
    } else {
      throw('already attacked');
    }
  }

  return {
    getGameboard,
    getName,
    attack,
  }
}

// props = { length, initialHits, name }
export const shipFactory = (props) => {
  const length = props.length;
  const hits = props.initialHits || [];
  const name = props.name;

  const hit = (coord) => {
    if (!hits.includes(coord)) {
      hits.push(coord);
      return true;
    } else {
      return false;
    }
  }

  const isSunk = () => {
    return hits.length === length;
  }

  const getLength = () => { return length };

  const getName = () => { return name };

  return {
    hit,
    isSunk,
    getLength,
    getName,
  }
}

export const gameboardFactory = (size) => {
  let board = [];
  const initialize = (() => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        board.push({
          coord: [j, i],
          hit: 0,
          shipId: null
        })
      }
    }
  })();

  const ships = [];

  const allShipsSunk = () => {
    let sunk = true;
    ships.forEach(ship => {
      if (!ship.isSunk()) sunk = false;
    })
    return sunk;
  }

  // shipProps = { length, initialHits }
  // locationProps = { coord: [x, y], dir: ('e' || 's') }
  const placeShip = (shipProps, locationProps) => {
    let placedShipId = null;
    let placedCoords = undefined;
    try {
      placedCoords = factoryHelper.getCoordsIfOpen(
        shipProps.length, locationProps, board);
      placedShipId = ships.push(shipFactory(shipProps)) - 1;
      board = board.map(cell => {
        let newCell = cell;
        placedCoords.forEach(coord => {
          if (factoryHelper.arraysMatch(cell.coord, coord)) {
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
      throw (e)
    }
  }

  const receiveAttack = (coord) => {
    const index = factoryHelper.getIndexFromCoord(coord, board);
    if (board[index].hit !== 0) {
      throw('already hit');
    }
    const shipId = board[index].shipId;
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
  }

  const getShips = () => { return ships };

  const getUnsunkShips = () => {
    const unsunkShips = [];
    ships.forEach(ship => {
      if (!ship.isSunk()) unsunkShips.push(ship);
    });
    return unsunkShips;
  }

  const getBoard = () => { return board };

  return {
    allShipsSunk,
    placeShip,
    receiveAttack,
    getShips,
    getUnsunkShips,
    getBoard,
  }
}