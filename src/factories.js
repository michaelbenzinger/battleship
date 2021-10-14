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