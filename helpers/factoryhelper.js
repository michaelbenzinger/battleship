  // locationProps = { coord: [5, 5], dir: (e || s) }
  const factoryHelper = (() => {
    const getCoordsIfOpen = (length, locationProps, board) => {
      const coords = [];
      for (let i = 0; i < length; i++) {
        let searchX = locationProps.coord[0];
        let searchY = locationProps.coord[0];
        locationProps.dir === 'e'
          ? searchX += i
          : searchY += i;
        const matchingCell = board.find(cell => 
          arraysMatch(cell.coord, [searchX, searchY])
        );
        if (!matchingCell) throw('out of bounds');
        else if (matchingCell.shipId !== null) throw('cell occupied')
        else {
          // Success
          coords.push([searchX, searchY]);
        }
      }
      return coords;
    }

    const arraysMatch = (coord1, coord2) => {
      return (JSON.stringify(coord1) === JSON.stringify(coord2))
        ? true : false;
    }

    return {
      arraysMatch,
      getCoordsIfOpen,
    }
  })();

  export default factoryHelper;