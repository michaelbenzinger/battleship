import { gameboardFactory, shipFactory } from '../src/factories.js';
import factoryHelper from '../helpers/factoryhelper.js';

describe('shipFactory', () => {
  test('shipFactory.hit() adds a hit', () => {
    const ship = shipFactory({ length: 3 });
    expect(ship.hit([0,3])).toBe(true);
  });

  test('shipFactory.isSunk() true when length === # hits', () => {
    const ship = shipFactory({
      length: 4,
      initialHits: [
        [4,2], [4,3], [4,4], [4,5]
      ]});
    expect(ship.isSunk()).toBe(true);
  });

  test('shipFactory.isSunk() can return false', () => {
    const ship = shipFactory({
      length: 3,
      initialHits: [[7,7]]
    });
    expect (ship.isSunk()).toBe(false);
  });
});

describe('gameboardFactory', () => {
  test('gameboardFactory creates a board of the correct size', () => {
    expect(gameboardFactory(7).getBoard().length).toBe(49);
  });

  test('gameboardFactory.allShipsSunk() returns true on empty board', () => {
    expect(gameboardFactory(10).allShipsSunk()).toBe(true);
  });

  test('gameboardFactory.allShipsSunk() returns false', () => {
    const board = gameboardFactory(10);
    board.placeShip(
      {
        length: 4,
        initialHits: [
          [0, 0],
          [0, 1],
          [0, 2]
        ]
      },
      {
        coord: [0, 0],
        dir: 'e'
      }
    );
    expect(board.allShipsSunk()).toBe(false);
  });

  test('gameboardFactory.allShipsSunk() returns true on sunken ship', () => {
    const board = gameboardFactory(10);
    board.placeShip(
      {
        length: 4,
        initialHits: [
          [0, 0],
          [1, 0],
          [2, 0],
          [3, 0]
        ]
      },
      {
        coord: [0, 0],
        dir: 'e'
      }
    );
    board.placeShip(
      {
        length: 4,
        initialHits: [
          [2, 2],
          [3, 2],
          [4, 2],
          [5, 2]
        ]
      },
      {
        coord: [2, 2],
        dir: 'e'
      }
    );
    expect(board.allShipsSunk()).toBe(true);
  });

  test('gameboardFactory.placeShip() works on open board', () => {
    const board = gameboardFactory(10);
    const placedShipReturn = board.placeShip(
      {
        length: 5
      },
      {
        coord: [5, 4],
        dir: 'e'
      }
    );
    expect(placedShipReturn).toBe(true);
  });

  test("gameboardFactory.placeShip() doesn't work on out-of-bounds (1)", () => {
    const gameboard = gameboardFactory(10);
    expect (() => {
      gameboard.placeShip(
      {
        length: 5
      },
      {
        coord: [6, 4],
        dir: 'e'
      })
    }).toThrow('out of bounds');
  })

  test('gameboardFactory.placeShip() throws cell occupied error', () => {
    const gameboard = gameboardFactory(5);
    gameboard.placeShip(
      {
        length: 3
      },
      {
        coord: [0, 0],
        dir: 'e'
      }
    );
    expect(() => {
      gameboard.placeShip(
        {
          length: 3
        },
        {
          coord: [0, 0],
          dir: 's'
        }
      );
    }).toThrow('cell occupied');
  });

  test('gameboardFactory.receiveAttack() properly attacks', () => {
    const gameboard = gameboardFactory(5);
    gameboard.placeShip(
      {
        length: 3
      },
      {
        coord: [0, 0],
        dir: 'e'
      }
    );
    expect(gameboard.receiveAttack([2, 0])).toBe(true);
  });

  test('gameboardFactory.receiveAttack() properly misses', () => {
    const gameboard = gameboardFactory(5);
    gameboard.placeShip(
      {
        length: 3
      },
      {
        coord: [0, 0],
        dir: 'e'
      }
    );
    expect(gameboard.receiveAttack([0, 2])).toBe(false);
  });

  test('gameboardFactory.receiveAttack() throws already hit (1)', () => {
    const gameboard = gameboardFactory(10);
    gameboard.placeShip(
      {
        length: 5
      },
      {
        coord: [1, 1],
        dir: 's'
      }
    );
    gameboard.receiveAttack([1, 3]);
    expect(() => {
      gameboard.receiveAttack([1, 3]);
    }).toThrow('already hit');
  });

  test('gameboardFactory.receiveAttack() throws already hit (2)', () => {
    const gameboard = gameboardFactory(10);
    gameboard.receiveAttack([4, 7]);
    expect(() => {
      gameboard.receiveAttack([4, 7]);
    }).toThrow('already hit');
  });
})

describe('factoryHelper', () => {
  test('getCoordsIfOpen returns coords on open board', () => {
    const gameboard = gameboardFactory(10);
    expect(factoryHelper.getCoordsIfOpen(
      4,
      {
        coord: [3, 4],
        dir: 'e'
      },
      gameboard.getBoard()
    )).not.toBe(false);
  });

  test('getCoordsIfOpen throw out of bounds error', () => {
    const gameboard = gameboardFactory(10);
    expect(() => {
      factoryHelper.getCoordsIfOpen(
        4,
        {
          coord: [8, 8],
          dir: 'e'
        },
        gameboard.getBoard()
      )
    }).toThrow('out of bounds');
  });

  test('getIndexFromCoord works', () => {
    const gameboard = gameboardFactory(5);
    expect(() => {
      factoryHelper.getIndexFromCoord([4, 4], gameboard.getBoard())
    }).not.toThrow();
  });

  test('getIndexFromCoord throw out of bounds error', () => {
    const gameboard = gameboardFactory(10);
    expect(() => {
      factoryHelper.getIndexFromCoord([9, 10], gameboard.getBoard())
    }).toThrow('getIndex...: out of bounds');
  });
})