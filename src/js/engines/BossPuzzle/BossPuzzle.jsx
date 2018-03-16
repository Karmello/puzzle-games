import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { GridGameBoard } from 'js/other';
import SquareTile from './SquareTile/SquareTile';
import { initFrame, switchTiles, clearHiddenTileCoords, resetFrame } from './bossPuzzle.actions';
import { getNewImgNumbers, initData } from './BossPuzzle.static';


const numOfImgs = 20;

class BossPuzzle extends Component {

  static tilesSizes = { 3: 150, 4: 125, 5: 100 };
  
  state = { imgSrc: null }

  componentDidMount() {

    this.startNew();
  }

  componentWillReceiveProps(nextProps) {
    
    // restarting game
    if (!this.props.game.isLoading && nextProps.game.isLoading) {
      this.setState({ imgSrc: null });
      this.startNew(nextProps.restarting);
    }
  }

  componentDidUpdate(prevProps) {

    const { bossPuzzleEngine, game, onBeenSolved, dispatch } = this.props;

    // if move was made
    if (game.moves === prevProps.game.moves + 1) {
      
      // checking if solved
      for (let i = 0; i < bossPuzzleEngine.tiles.length; i++) {
        if (i + 1 !== bossPuzzleEngine.tiles[i]) {
          return;
        }
      }

      // if been solved
      dispatch(clearHiddenTileCoords());
      onBeenSolved();
    }
  }

  componentWillUnmount() {
        
    this.props.dispatch(resetFrame());
  }

  render() {

    const { imgSrc } = this.state;
    const { game, bossPuzzleEngine } = this.props;
    
    if (game.options.mode === 'NUM' || (game.options.mode === 'IMG' && imgSrc)) {
      return (
        <GridGameBoard
          className={'BossPuzzle-' + game.options.dimension}
          dimension={Number(game.options.dimension)}
          squareSize={BossPuzzle.tilesSizes[game.options.dimension]}
          Square={props => (
            <SquareTile
              options={game.options}
              hiddenTileCoords={bossPuzzleEngine.hiddenTileCoords}
              tiles={bossPuzzleEngine.tiles}
              imgSrc={imgSrc}
              isSolved={game.isSolved}
              onMoveMade={this.onMoveMade.bind(this)}
              {...props}
            />
          )}
        />
      );
    }

    return null;
  }

  startNew(doRestart) {

    const { game, bossPuzzleEngine, dispatch, onFinishInit } = this.props;
    const { imgIndex, imgNumbers } = bossPuzzleEngine;

    let nextImgIndex, nextImgNumbers;

    if (game.options.mode === 'IMG') {
      
      if (!doRestart) {
        if (imgIndex === undefined || imgIndex === imgNumbers.length - 1) {
          nextImgIndex = 0;
          nextImgNumbers = getNewImgNumbers(imgNumbers, numOfImgs)
        } else {
          nextImgIndex = imgIndex + 1;
          nextImgNumbers = imgNumbers;
        } 
      } else {
        nextImgIndex = imgIndex;
        nextImgNumbers = imgNumbers;
      }
    }

    const newHiddenTileCoords = {
      x: Math.floor(Math.random() * game.options.dimension),
      y: Math.floor(Math.random() * game.options.dimension)
    }
    
    const tasks = [];
    tasks.push(initData({ dimension: game.options.dimension, hiddenTileCoords: newHiddenTileCoords }));
    if (game.options.mode === 'IMG') { tasks.push(this.loadImg(nextImgNumbers[nextImgIndex])); }

    return Promise.all(tasks).then((data) => {
      dispatch(initFrame(nextImgNumbers, nextImgIndex, data[0].tiles, data[0].hiddenTileCoords));
      onFinishInit();
    });
  }

  loadImg(imgNumber) {

    return new Promise((resolve, reject) => {

      const img = new Image();
      img.src = `${process.env.REACT_APP_S3_BUCKET}/BossPuzzle/img${imgNumber}.jpg`;
        
      img.onload = () => {
        this.setState({ imgSrc: img.src });
        resolve();
      }

      img.onerror = (err) => { reject(err); }
    });
  }

  onMoveMade(index1, index2, targetCoords) {

    const { dispatch, onMakeMove } = this.props;
    dispatch(switchTiles(index1, index2, targetCoords));
    onMakeMove();
  }
}

BossPuzzle.propTypes = {
  onFinishInit: PropTypes.func.isRequired,
  onMakeMove: PropTypes.func.isRequired,
  onBeenSolved: PropTypes.func.isRequired,
  restarting: PropTypes.bool.isRequired
};

export default connect(store => ({
  game: store.pages.gamePage,
  bossPuzzleEngine: store.engines.BossPuzzle
}))(BossPuzzle);