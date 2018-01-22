import { Game } from 'js/containers';
import { Frame } from 'js/components';
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
  
  return Promise.all([this.loadImg(imgNumber), Frame.initData(initFrameDataConfig)]);
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

  const { game } = this.props;

  const run = () => {
    const newImgNumbers = shuffleIntArray(Array.from({ length: Game.numOfImgs }, (v, k) => k + 1));
    if (game.imgNumbers[game.imgNumbers.length - 1] === newImgNumbers[0]) {
      return run();
    } else {
      return newImgNumbers;
    }
  }

  return run();
}

export function wasJustSolved(cb) {

  const { frame } = this.props;

  for (let i = 0; i < frame.tiles.length; i++) {
    if (i + 1 !== frame.tiles[i]) {
      return cb(false);
    }
  }

  cb(true);
}

export function onDimensionChange(newDimension) {

  this.props.dispatch(setDimension(newDimension));
}

export function onNewGameChoose(mode) {

  this.props.dispatch(toggleGameLoader(true, mode, this.getNewImgNumbers()));
}

export function onSquareTileClick() {

  const { round, frame, row, col, dispatch } = this.props;

  if (!round.isSolved) {
    
    const targetCoords = { x: row, y: col };
    const allMovementCoords = Frame.findAllMovementCoords(targetCoords, frame.dimension);

    for (let coords of allMovementCoords) {

      // If hidden tile found
      if (coords.x === frame.hiddenTileCoords.x && coords.y === frame.hiddenTileCoords.y) {

        const index1 = Frame.coordsToIndex(targetCoords, frame.dimension);
        const index2 = Frame.coordsToIndex(coords, frame.dimension);

        // Switching tiles
        dispatch(makeMove());
        dispatch(switchTiles(index1, index2, targetCoords));
        return;
      }
    }
  }
}

export function onNextClick() {

  const { game, round } = this.props;
  let imgNumbers;

  if (round.number === game.imgNumbers.length) {
    imgNumbers = this.getNewImgNumbers();
  }

  this.props.dispatch(toggleGameLoader(true, undefined, imgNumbers));
}