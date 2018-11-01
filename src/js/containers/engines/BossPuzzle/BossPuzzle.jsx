// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Game, GridBoard, SquareTile } from 'js/components';
import { initEngine, switchTiles, clearHiddenTileCoords, resetEngine } from 'js/actions/bossPuzzle';
import { getNewImgNumbers, initData } from 'js/extracts/bossPuzzle';

const numOfImgs = 20;

class BossPuzzle extends Game {

  static tilesSizes = { '3': 150, '4': 125, '5': 100 };

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  renderElement() {
    const { game, bossPuzzleEngine } = this.props;
    const { imgSrc } = this.state;
    return props => (
      <SquareTile
        options={game.options}
        hiddenTileCoords={bossPuzzleEngine.hiddenTileCoords}
        tiles={bossPuzzleEngine.tiles}
        imgSrc={imgSrc}
        isSolved={game.isSolved}
        onMoveMade={this.onMoveMade.bind(this)}
        {...props}
      />
    );
  }

  render() {

    const { game } = this.props;
    const { imgSrc } = this.state;

    if (game.isLoading) { return null; }
    
    if (game.options.mode === 'NUM' || (game.options.mode === 'IMG' && imgSrc)) {
      return (
        <GridBoard
          className={'BossPuzzle-' + String(game.options.dimension)}
          dimension={Number(game.options.dimension)}
          element={{
            size: BossPuzzle.tilesSizes[String(game.options.dimension)],
            Element: this.renderElement()
          }}
        />
      );
    }

    return null;
  }

  onMoveMade(index1, index2, targetCoords) {
    this.props.dispatch(switchTiles(index1, index2, targetCoords));
    super.onMakeMove();
  }

  startNew = doRestart => {
    
    return new Promise(resolve => {

      const { game, bossPuzzleEngine, dispatch } = this.props;
      const { imgIndex, imgNumbers } = bossPuzzleEngine;

      let nextImgIndex = 0, nextImgNumbers = [];

      if (game.options.mode === 'IMG') {
        
        if (!doRestart) {
          if (imgIndex === undefined || imgIndex === imgNumbers.length - 1) {
            nextImgNumbers = getNewImgNumbers(imgNumbers, numOfImgs)
          } else {
            nextImgIndex = imgIndex + 1;
            nextImgNumbers = imgNumbers;
          } 
        } else if (imgIndex !== undefined) {
          nextImgIndex = imgIndex;
          nextImgNumbers = imgNumbers;
        }
      }

      const newHiddenTileCoords = {
        x: Math.floor(Math.random() * Number(game.options.dimension)),
        y: Math.floor(Math.random() * Number(game.options.dimension))
      }
      
      const tasks = [];
      tasks.push(initData({ dimension: Number(game.options.dimension), hiddenTileCoords: newHiddenTileCoords }));
      if (game.options.mode === 'IMG') { tasks.push(this.loadImg(`boss-puzzle/img${nextImgNumbers[nextImgIndex]}.jpg`)); }

      return Promise.all(tasks).then((data:Array<any>) => {
        dispatch(initEngine(nextImgNumbers, nextImgIndex, data[0].tiles, data[0].hiddenTileCoords));
        resolve();
      });
    });
  };

  checkIfSolved = () => {

    const { bossPuzzleEngine, dispatch } = this.props;

    return new Promise(resolve => {

      // checking if solved
      for (let i = 0; i < bossPuzzleEngine.tiles.length; i++) {
        if (i + 1 !== bossPuzzleEngine.tiles[i]) {
          return resolve(false);
        }
      }

      // if been solved
      dispatch(clearHiddenTileCoords());
      resolve(true);
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  bossPuzzleEngine: store.engines['boss-puzzle']
}))(BossPuzzle);