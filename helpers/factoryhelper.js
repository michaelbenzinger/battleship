  // locationProps = { coord: [5, 5], dir: (e || s) }
  const factoryHelper = (() => {
    const arraysMatch = (coord1, coord2) => {
      return (JSON.stringify(coord1) === JSON.stringify(coord2))
        ? true : false;
    }
    
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

    const getIndexFromCoord = (coord, board) => {
      const index = coord[1] * Math.sqrt(board.length) + coord[0];
      
      if (index > board.length - 1 || index < 0) {
        throw('getIndex...: out of bounds');
      } else {
        return index;
      }
    }

    return {
      arraysMatch,
      getCoordsIfOpen,
      getIndexFromCoord,
    }
  })();

  export default factoryHelper;