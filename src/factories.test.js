import { shipFactory } from './factories.js';

test('hit adds a hit to the ship', () => {
  const ship = shipFactory(3);
  expect(ship.hit([0,3])).toBe(true);
});