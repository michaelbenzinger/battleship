import display from './display.js';
import { gameboardFactory, playerFactory, shipFactory } from '../src/factories.js';
import factoryHelper from './helpers/factoryhelper.js';
import logic from './helpers/enemylogic.js';

const game = (() => {
  const enemyDelayMaxInitial = 2;
  let enemyDelayMax = 0;
  const states = [
    {
      id: 0,
      target: null,
      name: 'Place your ships'
    },
    {
      id: 1,
      target: 'enemy',
      name: "Player's turn"
    },
    {
      id: 2,
      target: 'player',
      name: "Enemy's turn"
    },
    {
      id: 3,
      target: null,
      name: "Game finished"
    }
  ];
  let possibleEnemyAttacks = null;
  let state = states[0];
  let shipList;
  let currentShip;
  let direction;
  let player1 = null;
  let enemy1 = null;

  const start = () => {
    logic.reset();

    enemyDelayMax = enemyDelayMaxInitial;
    state = states[0];
    shipList = [
      { name: 'Carrier', size: 5 },
      { name: 'Battleship', size: 4 },
      { name: 'Destroyer', size: 3 },
      { name: 'Submarine', size: 3 },
      { name: 'Patrol Boat', size: 2 }
    ];
    currentShip = 0;
    direction = 'e';

    player1 = playerFactory('player', 10);
    enemy1 = playerFactory('enemy', 10);
    possibleEnemyAttacks = player1.getGameboard().getBoard();

    display.drawGrid(player1);
    display.drawGrid(enemy1);

    placeRandomShips(enemy1);
    direction = 'e';
    display.displayRotateButton();
    display.logMessage('Place your ' + shipList[currentShip].name);
  };

  const getShipForPlacement = () => {
    return shipList[currentShip];
  }

  const advanceShipPlacement = () => {
    if (currentShip < 4) {
      currentShip ++;
      display.logMessage('Place your ' + shipList[currentShip].name);
      return 0;
    } else {
      display.logRemaining(enemy1.getGameboard().getShips());
      display.makeCellsUnclicked();
      advanceState();
      return 1;
    }
  }

  const advanceState = () => {
    if (player1.getGameboard().allShipsSunk()) {
      display.logMessage('Enemy wins.');
      display.removeCellsUnclicked();
      state = states[3];
      display.makeModal({
        title: 'Enemy wins.',
        description: 'Better luck next time.',
        buttonText: 'Play again',
        hideButtonText: 'Hide',
        callback: () => { 
          display.initialize();
          game.start();
          console.log("You've clicked the button")
        }
      });

    } else if (enemy1.getGameboard().allShipsSunk()) {
      display.logMessage('You win!');
      display.removeCellsUnclicked();
      state = states[3];
      display.makeModal({
        title: 'You win!',
        description: "You sunk all the enemy's battleships.",
        buttonText: 'Play again',
        hideButtonText: 'Hide',
        callback: () => { 
          display.initialize();
          game.start();
          console.log("You've clicked the button")
        }
      });
    } else {
      if (state.id === 0) {
        display.removeRotateButton();
        state = states[1];
      } else if (state.id === 1) {
        display.removeCellsUnclicked();
        state = states[2];
        const delayTime = (enemyDelayMax / 4 +
            (Math.random() * enemyDelayMax * 3 / 4));
        console.log('Delaying ' + delayTime + ' seconds');
        if (delayTime !== 0) {
          setTimeout(() => {
            enemyRandomAttack();
          }, 1000 * delayTime);
        } else {
          enemyRandomAttack();
        }
      } else {
        display.makeCellsUnclicked();
        state = states[1];
      }
    }

    display.stateMessage(state.name);
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
    const attackCoord = logic.getMove(possibleEnemyAttacks);
    console.log('COORD: ');
    console.log({ attackCoord });
    const didHit = player1.getGameboard().receiveAttack(attackCoord);
    const playerGrid = document.querySelector('.player-grid');
    const attackCellIndex = factoryHelper.getIndexFromCoord(attackCoord, player1.
      getGameboard().getBoard());
    if (didHit > 0) {
      playerGrid.childNodes.item(attackCellIndex).classList.add('hit', 'player-hit');
      logic.processHit(attackCoord);
    } else {
      playerGrid.childNodes.item(attackCellIndex).classList.add('miss', 'player-miss');
      logic.processMiss(attackCoord);
    }
    if (didHit === 2) {
      display.logMessage(factoryHelper.sunkMessage(attackCoord,
        player1.getGameboard(), game.getState().target))
      logic.processSunk(attackCoord);
    }
    advanceState();
  }

  const toggleDelay = () => {
    if (enemyDelayMax === 0) {
      enemyDelayMax = enemyDelayMaxInitial;
      return 'delay on';
    } else {
      enemyDelayMax = 0;
      return 'delay off';
    }
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
    toggleDelay,
  }
})();

export default game;