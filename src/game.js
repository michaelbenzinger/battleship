import display from './display.js';
import { gameboardFactory, playerFactory, shipFactory } from '../src/factories.js';

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
  let state = states[0];
  let player1 = null;
  let enemy1 = null;

  const start = () => {
    player1 = playerFactory('player', 10);
    enemy1 = playerFactory('enemy', 10);
    player1.getGameboard().placeShip(
      {
        length: 3
      },
      {
        coord: [1, 1],
        dir: 's'
      }
    );
    player1.getGameboard().placeShip(
      {
        length: 2
      },
      {
        coord: [3, 1],
        dir: 's'
      }
    );
    player1.getGameboard().placeShip(
      {
        length: 5
      },
      {
        coord: [5, 1],
        dir: 's'
      }
    );

    enemy1.getGameboard().placeShip(
      {
        length: 2
      },
      {
        coord: [1, 2],
        dir: 'e'
      }
    );
    enemy1.getGameboard().placeShip(
      {
        length: 5
      },
      {
        coord: [1, 4],
        dir: 'e'
      }
    );
    enemy1.getGameboard().placeShip(
      {
        length: 3
      },
      {
        coord: [1, 6],
        dir: 'e'
      }
    );

    display.populateGrid(player1);
    display.populateGrid(enemy1);

    // Place boards here after populating grid

    state = states[1];
    console.log(state.name);
  };

  const advanceState = () => {
    if (player1.getGameboard().allShipsSunk()) {
      alert('Enemy wins!');
      state = states[3];

    } else if (enemy1.getGameboard().allShipsSunk()) {
      alert('Player wins!');
      state = states[3];
    } else {
      if (state.id === 1) state = states[2];
      else state = states[1];
    }
    console.log(state.name);
  }

  const getState = () => {
    return state;
  }

  return {
    start,
    advanceState,
    getState,
  }
})();

export default game;