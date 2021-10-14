import { shipFactory } from './factories.js';

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