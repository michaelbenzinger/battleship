import display from './display.js';
import { gameboardFactory, playerFactory, shipFactory } from '../src/factories.js';
import factoryHelper from './helpers/factoryhelper.js';

const game = (() => {
  const states = [
    {
      id: 0,
      target: null,
      name: 'Place your ships.'
    },
    {
      id: 1,
      target: 'enemy',
      name: "Player's turn."
    },
    {
      id: 2,
      target: 'player',
      name: "Enemy's turn."
    },
    {
      id: 3,
      target: null,
      name: "Game finished."
    }
  ];
  let possibleEnemyAttacks = null;
  let state = states[0];
  const shipList = [
    { name: 'Carrier', size: 5 },
    { name: 'Battleship', size: 4 },
    { name: 'Destroyer', size: 3 },
    { name: 'Submarine', size: 3 },
    { name: 'Patrol Boat', size: 2 }
  ];
  let currentShip = 0;
  let direction = 'e';
  let player1 = null;
  let enemy1 = null;

  const start = () => {
    player1 = playerFactory('player', 10);
    enemy1 = playerFactory('enemy', 10);
    possibleEnemyAttacks = player1.getGameboard().getBoard();

    display.drawGrid(player1);
    display.drawGrid(enemy1);

    placeRandomShips(enemy1);
  };

  const getShipForPlacement = () => {
    return shipList[currentShip];
  }

  const advanceShipPlacement = () => {
    if (currentShip < 4) {
      currentShip ++;
      return 0;
    } else {
      state = states[1];
      return 1;
    }
  }

  const advanceState = () => {
    if (player1.getGameboard().allShipsSunk()) {
      alert('Enemy wins!');
      state = states[3];

    } else if (enemy1.getGameboard().allShipsSunk()) {
      alert('Player wins!');
      state = states[3];
    } else {
      if (state.id === 1) {
        state = states[2];
        enemyRandomAttack();
      } else {
        state = states[1];
      }
    }
  }

  const getState = () => {
    return state;
  }

  const getDirection = () => {
    return direction;
  }

  const toggleDirection = () => {
    if (direction === 'e') direction = 's';
    else direction = 'e';
  }

  const getPlayers = () => {
    return {
      player: player1,
      enemy: enemy1
    }
  }

  const placeRandomShips = (player) => {
    const boardSize = Math.sqrt(player.getGameboard().getBoard().length);
    shipList.forEach(ship => {
      let success = false;
      while (success === false) {
        if (Math.floor(Math.random() * 2) === 0) toggleDirection();
        let coordX = null;
        let coordY = null;
        if (direction === 'e') {
          coordX = Math.floor(Math.random() * (boardSize - (ship.size - 1)));
          coordY = Math.floor(Math.random() * (boardSize));
        } else {
          coordX = Math.floor(Math.random() * (boardSize));
          coordY = Math.floor(Math.random() * (boardSize - (ship.size - 1)));
        }
        try {
          if (player.getGameboard().placeShip(
            {
              length: ship.size,
              name: ship.name
            },
            {
              coord: [coordX, coordY],
              dir: direction
            }
          )) {
            success = true;
          }
        } catch {
          console.log('Failed to place a ship, trying again');
        }
      }
    });
  }

  const enemyRandomAttack = () => {
    const attackIndex = Math.floor(Math.random() * possibleEnemyAttacks.length);
    const attackCell = possibleEnemyAttacks.splice(attackIndex, 1)[0];
    const didHit = player1.getGameboard().receiveAttack(attackCell.coord);
    const playerGrid = document.querySelector('.player-grid');
    const attackCellIndex = factoryHelper.getIndexFromCoord(attackCell.coord, player1.
      getGameboard().getBoard());
    if (didHit > 0) {
      playerGrid.childNodes.item(attackCellIndex).classList.add('hit', 'player-hit');
    } else {
      playerGrid.childNodes.item(attackCellIndex).classList.add('miss', 'player-miss');
    }
    if (didHit === 2) {
      console.log(factoryHelper.sunkMessage(attackCell.coord, player1.getGameboard(),
        state.target));
    }
    advanceState();
  }

  return {
    start,
    getShipForPlacement,
    advanceShipPlacement,
    advanceState,
    getState,
    getDirection,
    toggleDirection,
    getPlayers,
  }
})();

export default game;