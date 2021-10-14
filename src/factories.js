import factoryHelper from '../helpers/factoryhelper.js';

export const shipFactory = (length, initialHits) => {
  const hits = initialHits || [];

  const hit = (position) => {
    if (!hits.includes(position)) {
      hits.push(position);
      return true;
    } else {
      return false;
    }
  }

  const isSunk = () => {
    return hits.length === length;
  }

  return {
    hit,
    isSunk,
  }
}

export const gameboardFactory = (size) => {
  const gameboard = [];
  const initialize = (() => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        gameboard.push({
          coord: [j, i],
          shipId: null
        })
      }
    }
  })();

  const ships = [];

  const allShipsSunk = () => {

  }

  const placeShip = (shipProps, locationProps) => {

  }

  const receiveAttack = (position) => {

  }

  const getGameboard = () => { return gameboard };

  return {
    allShipsSunk,
    placeShip,
    receiveAttack,
    getGameboard,
  }
}