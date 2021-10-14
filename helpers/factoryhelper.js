  // locationProps = { coord: [5, 5], dir: (e || s) }
  const factoryHelper = (() => {
    const isOpen = (length, locationProps, gameboard) => {
      for (let i = 0; i < length; i++) {
        const searchCoordinate = locationProps.coord;
        locationProps.dir === 'e'
          ? searchCoordinate[0] += i
          : searchCoordinate[1] += i;
        const matchingCell = gameboard.getGameboard().find(cell => 
          JSON.stringify(cell.coord) === JSON.stringify(searchCoordinate));
        if (matchingCell.shipId !== null) return false;
      }
      return true;
    }

    return {
      isOpen,
    }
  })();

  export default factoryHelper;