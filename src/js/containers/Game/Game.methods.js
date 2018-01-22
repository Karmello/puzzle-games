import { Game } from 'js/containers';
import { BossPuzzle } from 'js/components';
import { makeMove, setDimension, toggleGameLoader, switchTiles } from 'js/actions';
import { shuffleIntArray } from 'js/helpers';


export function getNewRoundData(dimension, imgNumber) {

  this.setState({ isImgLoaded: false });
  
  const initFrameDataConfig = {
    dimension: dimension,
    hiddenTileCoords: {
      x: Math.floor(Math.random() * dimension),
      y: Math.floor(Math.random() * dimension)
    }
  };
  
  return Promise.all([this.loadImg(imgNumber), BossPuzzle.initData(initFrameDataConfig)]);
}

export function loadImg(imgNumber) {

  return new Promise((resolve, reject) => {

    const img = new Image();
    img.src = process.env.PUBLIC_URL + '/imgs/img' + imgNumber + '.jpg';
      
    img.onload = () => {
      this.setState({ isImgLoaded: true });
      this.imgSrc = img.src;
      resolve();
    }

    img.onerror = (err) => { reject(err); }
  });
}

export function getNewImgNumbers() {

  const { bossPuzzle } = this.props;

  const run = () => {
    const newImgNumbers = shuffleIntArray(Array.from({ length: Game.numOfImgs }, (v, k) => k + 1));
    if (bossPuzzle.imgNumbers[bossPuzzle.imgNumbers.length - 1] === newImgNumbers[0]) {
      return run();
    } else {
      return newImgNumbers;
    }
  }

  return run();
}

export function wasJustSolved(cb) {

  const { bossPuzzle } = this.props;

  for (let i = 0; i < bossPuzzle.tiles.length; i++) {
    if (i + 1 !== bossPuzzle.tiles[i]) {
      return cb(false);
    }
  }

  cb(true);
}

export function onDimensionChange(newDimension) {

  this.props.dispatch(setDimension(newDimension));
}

export function onNewGameChoose(id) {

  this.props.dispatch(toggleGameLoader(true, id));
}

export function onSquareTileClick() {

  const { round, bossPuzzle, row, col, dispatch } = this.props;

  if (!round.isSolved) {
    
    const targetCoords = { x: row, y: col };
    const allMovementCoords = BossPuzzle.findAllMovementCoords(targetCoords, bossPuzzle.dimension);

    for (let coords of allMovementCoords) {

      // If hidden tile found
      if (coords.x === bossPuzzle.hiddenTileCoords.x && coords.y === bossPuzzle.hiddenTileCoords.y) {

        const index1 = BossPuzzle.coordsToIndex(targetCoords, bossPuzzle.dimension);
        const index2 = BossPuzzle.coordsToIndex(coords, bossPuzzle.dimension);

        // Switching tiles
        dispatch(makeMove());
        dispatch(switchTiles(index1, index2, targetCoords));
        return;
      }
    }
  }
}

export function onNextClick() {

  this.props.dispatch(toggleGameLoader(true));
}