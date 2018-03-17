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