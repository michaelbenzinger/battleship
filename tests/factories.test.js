import { gameboardFactory, shipFactory } from '../src/factories.js';
import factoryHelper from '../helpers/factoryhelper.js';

describe('shipFactory', () => {
  test('shipFactory.hit() adds a hit', () => {
    const ship = shipFactory(3);
    expect(ship.hit([0,3])).toBe(true);
  });

  test('shipFactory.isSunk() true when length === # hits', () => {
    const ship = shipFactory(4,
      [
        [4,2], [4,3], [4,4], [4,5]
      ]);
    expect(ship.isSunk()).toBe(true);
  });

  test('shipFactory.isSunk() can return false', () => {
    const ship = shipFactory(3, [[7,7]]);
    expect (ship.isSunk()).toBe(false);
  });
});

describe('gameboardFactory', () => {
  test('gameboardFactory creates a board of the correct size', () => {
    expect(gameboardFactory(7).getGameboard().length).toBe(49);
  });
})

describe('factoryHelper', () => {
  test('isOpen returns true on open board', () => {
    const gameboard = gameboardFactory(10);
    expect(factoryHelper.isOpen(
      4,
      {
        coord: [3, 4],
        dir: 'e'
      },
      gameboard
    )).toBe(true);
  });

  test.todo('isOpen returns false when spot taken');
})