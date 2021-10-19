const factoryHelper = (() => {
  const arraysMatch = (coord1, coord2) => {
    return (JSON.stringify(coord1) === JSON.stringify(coord2))
      ? true : false;
  }

  const checkIfOpen = (coordList, board) => {
    let isOpen = true;
    coordList.forEach(coord => {
      const boardCell = board[getIndexFromCoord(coord, board)];
      if (boardCell.shipId !== null) {
        isOpen = false;
        throw('cell occupied');
      }
    })
    return isOpen;
  }

    // locationProps = { coord: [5, 5], dir: (e || s) }
  const getCoordsIfOpen = (length, locationProps, board) => {
    const coords = [];
    for (let i = 0; i < length; i++) {
      let searchX = locationProps.coord[0];
      let searchY = locationProps.coord[1];
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

  const getCoordsCentered = (length, locationProps) => {
    let startingCoord = null;
    const dir = locationProps.dir;
    if (dir === 'e') {
      startingCoord = [
        locationProps.coord[0] - Math.floor((length - 1)/2),
        locationProps.coord[1]
      ];
    } else if (dir === 's') {
      startingCoord = [
        locationProps.coord[0],
        locationProps.coord[1] - Math.floor((length - 1)/2)
      ];
    } else {
      throw('please specify direction before getting coordinates');
    }
    let coordArray = [];
    for (let i = 0; i < length; i ++) {
      const coordX = (dir === 'e')
        ? startingCoord[0] + i
        : startingCoord[0];
      const coordY = (dir === 's')
        ? startingCoord[1] + i
        : startingCoord[1];
      coordArray.push([coordX, coordY]);
    }
    return coordArray;
  }

  const getIndexFromCoord = (coord, board) => {
    const index = coord[1] * Math.sqrt(board.length) + coord[0];
    if (index > board.length - 1 || index < 0) {
      throw('getIndex...: out of bounds');
    } else {
      return index;
    }
  }

  const getCoordFromIndex = (index, board) => {
    const size = Math.sqrt(board.length);
    const x = index % size;
    const y = Math.floor(index / size);
    
    return { x: x, y: y }
  }

  const nudgeCoordsBy = (coordList, number) => {

  }

  const nudgeCoordsOn = (coordList, board) => {
    const firstCoord = coordList[0];
    const lastCoord = coordList[coordList.length - 1];
    let newList = null;
    // off the right side
    const rightSideHang = lastCoord[0] - (Math.sqrt(board.length) - 1);
    const leftSideHang  = -1 * firstCoord[0];
    const topHang       = -1 * firstCoord[1];
    const bottomHang    = lastCoord[1] - (Math.sqrt(board.length) - 1);
    if (rightSideHang > 0) {
      newList = coordList.map(coord => {
        return [coord[0] - rightSideHang, coord[1]];
      });
    } else if (leftSideHang > 0) {
      newList = coordList.map(coord => {
        return [coord[0] + leftSideHang, coord[1]];
      });
    } else if (topHang > 0) {
      newList = coordList.map(coord => {
        return [coord[0], coord[1] + topHang];
      });
    } else if (bottomHang > 0) {
      newList = coordList.map(coord => {
        return [coord[0], coord[1] - bottomHang];
      });
    } else {
      newList = coordList;
    }
    return newList;
  }

  const sunkMessage = (coord, gameboard, target) => {
    if (coord.x) {
      coord = [coord.x, coord.y];
    }
    const index = getIndexFromCoord(coord, gameboard.getBoard());
    const shipId = gameboard.getBoard()[index].shipId;
    const attacker = (target === 'enemy'
      ? 'You'
      : 'Enemy');
    const shipName = gameboard.getShips()[shipId].getName();
    const shipSize = gameboard.getShips()[shipId].getLength();
    return attacker + ' sunk the ' + shipName + '! (size: ' + shipSize + ')';
  }

  return {
    arraysMatch,
    checkIfOpen,
    getCoordsIfOpen,
    getCoordsCentered,
    getIndexFromCoord,
    getCoordFromIndex,
    nudgeCoordsBy,
    nudgeCoordsOn,
    sunkMessage,
  }
})();

export default factoryHelper;