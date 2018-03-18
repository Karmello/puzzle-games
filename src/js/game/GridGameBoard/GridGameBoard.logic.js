export const coordsToIndex = (coords, dimension) => {
  return coords.y * dimension + coords.x;
}

export const indexToCoords = (index, dimension) => {
  return {
    x: index % dimension,
    y: Math.floor(index/dimension)
  }
}

export const offsetToIndex = (offset, squareSize, dimension) => {
  const coords = { x: Math.round(offset.x / squareSize), y: Math.round(offset.y / squareSize) };
  if (coords.x >= 0 && coords.x < dimension && coords.y >= 0 && coords.y < dimension) {
    return Math.abs(coordsToIndex(coords, dimension));
  } else {
    return -1;
  }
}

export const findAllMovementCoords = (targetCoords, dimension) => {

  if (dimension < 2) { throw new Error('Dimension must be greater than or equal 2'); }

  const possibleDestinationCoords = [
    { x: targetCoords.x, y : targetCoords.y - 1 },
    { x: targetCoords.x + 1, y : targetCoords.y },
    { x: targetCoords.x, y : targetCoords.y + 1 },
    { x: targetCoords.x - 1, y : targetCoords.y }
  ];

  const realDestinationCoords = [];

  for (let coords of possibleDestinationCoords) {
    if (coords.x >= 0 && coords.x <= dimension - 1 && coords.y >= 0 && coords.y <= dimension - 1) {
      realDestinationCoords.push(coords);
    }
  }

  return realDestinationCoords;
}

export const isAloneOnAxis = (axis, targetCoords, dimension, gridData) => {

  let upperBound;
  let shouldTerminate;

  switch (axis) {
    
    case 'x':
      upperBound = dimension;
      shouldTerminate = i => i !== targetCoords.x && gridData[coordsToIndex({ x: i, y: targetCoords.y }, dimension)];
      break;

    case 'y':
      upperBound = dimension;
      shouldTerminate = i => i !== targetCoords.y && gridData[coordsToIndex({ x: targetCoords.x, y: i }, dimension)];
      break;

    case 'd1':
    case 'd2':

      if (axis === 'd1') {
        upperBound = dimension - Math.abs(targetCoords.x - targetCoords.y);
      } else if (axis === 'd2') {
        upperBound = dimension - Math.abs(dimension - targetCoords.x - targetCoords.y - 1);
      }

      shouldTerminate = i => {
        
        const { x, y } = targetCoords;
        let j;

        if (axis === 'd1') {
          j = (((y - Math.min(x, y)) + i) * dimension) + (x - Math.min(x, y) + i);
        } else if (axis === 'd2') {
          j = (((y + Math.min(dimension - 1 - y, x)) - i) * dimension) + (x - Math.min(dimension - 1 - y, x) + i);
        }

        const q = coordsToIndex(targetCoords, dimension);

        if (j !== q && gridData[j]) {
          return true;
        }

        return false;
      }

      break;

    default:
      return false;
  }

  for (let i = 0; i < upperBound; i++) {
    if (shouldTerminate(i)) {
      return false;
    }
  }

  return true;
}