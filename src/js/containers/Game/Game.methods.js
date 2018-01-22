import { Game } from 'js/containers';
import * as BossPuzzleMethods from 'js/components/BossPuzzle/BossPuzzle.methods';
import { setDimension, toggleGameLoader } from 'js/actions';
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
  
  return Promise.all([this.loadImg(imgNumber), BossPuzzleMethods.initData(initFrameDataConfig)]);
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

  const bossPuzzle = this.props.games.BOSS_PUZZLE;

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

export function onDimensionChange(newDimension) {

  this.props.dispatch(setDimension(newDimension));
}

export function onNewGameChoose(id) {

  this.props.dispatch(toggleGameLoader(true, id));
}

export function onNextClick() {

  this.props.dispatch(toggleGameLoader(true));
}