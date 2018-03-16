import { shuffleIntArray } from 'js/helpers';
import { Game } from 'js/game';


const initDataLoopRuns = 1000;

export const initData = args => {
  
  if (args.dimension < 2) { throw new Error('Dimension must be greater than or equal 2'); }

  const run = () => {

    let { dimension, hiddenTileCoords } = args;

    const tiles = Array.from({ length: dimension ** 2 }, (value, key) => key + 1);
    const tempHiddenTileCoords = { ...hiddenTileCoords };
  
    for (let i = 0; i < initDataLoopRuns; i++) {

      const allMovementCoords = Game.findAllMovementCoords(hiddenTileCoords, dimension);
      const coordsToSwitchWith = allMovementCoords[Math.floor(Math.random() * allMovementCoords.length)];

      const index1 = Game.coordsToIndex(hiddenTileCoords, dimension);
      const index2 = Game.coordsToIndex(coordsToSwitchWith, dimension);

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