import game from './game.js';

const animate = (() => {
  const flipCells = [];
  const animationRefresh = 0.9;
  const animationLength = 0.35;
  let flipping = false;

  const addToFlipCells = (element) => {
    flipCells.push(element);
    element.classList.add('hit-flip');
    if (!flipping) {
      flipping = true;
      flipAll();
    }
  }

  const flipAll = () => {
    if (game.getState().id !== 3) {
      flipCells.forEach(cell => {
        cell.style.animation = 'none';
      })
      flipCells[0].offsetWidth;
      flipCells.forEach(cell => {
        cell.style.animation = `hitflip ${animationLength}s 1`;
      })

      setTimeout(() => {
        flipAll();
      }, animationRefresh * 1000);
    }
  }

  return {
    addToFlipCells,
  }
})();

export default animate;