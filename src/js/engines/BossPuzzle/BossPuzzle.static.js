import { shuffleIntArray } from 'js/helpers';
import { GameEngine } from 'js/engines';

const initDataLoopRuns = 1000;

export const initData = args => {
  
  if (args.dimension < 2) { throw new Error('Dimension must be greater than or equal 2'); }

  const run = () => {

    let { dimension, hiddenTileCoords } = args;

    const tiles = Array.from({ length: dimension ** 2 }, (value, key) => key + 1);
    const tempHiddenTileCoords = { ...hiddenTileCoords };
  
    for (let i = 0; i < initDataLoopRuns; i++) {

      const allMovementCoords = findAllMovementCoords(hiddenTileCoords, dimension);
      const coordsToSwitchWith = allMovementCoords[Math.floor(Math.random() * allMovementCoords.length)];

      const index1 = GameEngine.coordsToIndex(hiddenTileCoords, dimension);
      const index2 = GameEngine.coordsToIndex(coordsToSwitchWith, dimension);

      const temp = tiles[index1];
      tiles[index1] = tiles[index2];
      tiles[index2] = temp;

      hiddenTileCoords = coordsToSwitchWith;
    }

    for (let i = 0; i < tiles.length; i++) {
      if (i + 1 === tiles[i]) {
        return initData({ dimension, hiddenTileCoords: tempHiddenTileCoords });
      }
    }

    return { tiles, hiddenTileCoords };
  }

  return new Promise((resolve, reject) => {

    try {
      resolve(run(args));
    
    } catch(ex) {
      reject(ex);
    }
  });
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

export const getNewImgNumbers = (currentNumbers, numOfImgs) => {

  const run = () => {
    const newImgNumbers = shuffleIntArray(Array.from({ length: numOfImgs }, (v, k) => k + 1));
    if (currentNumbers[currentNumbers.length - 1] === newImgNumbers[0]) {
      return run();
    } else {
      return newImgNumbers;
    }
  }

  return run();
}