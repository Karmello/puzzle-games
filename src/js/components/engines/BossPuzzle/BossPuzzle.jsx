import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import SquareTile from './SquareTile';
import { initFrame, switchTiles, clearHiddenTileCoords, resetFrame } from 'js/actions/bossPuzzle';
import { getNewImgNumbers, initData } from './BossPuzzle.static';
import './BossPuzzle.css';


class BossPuzzle extends Component {

  static tilesSizes = { 3: 150, 4: 125, 5: 100 };
  static numOfImgs = 20;
  
  state = { imgSrc: null }

  componentDidMount() {

    this.startNew();
  }

  componentWillReceiveProps(nextProps) {
    
    // restarting game
    if (!this.props.game.isLoading && nextProps.game.isLoading) {
      this.setState({ imgSrc: null });
      this.startNew();
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { bossPuzzleEngine, onBeenSolved, dispatch } = this.props;

    // if move was made
    if (bossPuzzleEngine.moves === prevProps.bossPuzzleEngine.moves + 1) {
      
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
    
    if ((game.options.style === 'IMG' && imgSrc) || game.options.style === 'NUM') {
      return (
        <div
          className={'BossPuzzle-' + game.options.dimension}
          style={{ pointerEvents: game.isSolved ? 'none' : 'initial' }}
        >
          {Array.from({ length: game.options.dimension }, (v, k) => k).map(i => (
          <Row key={i} className='BossPuzzle-row'> {
            Array.from({ length: game.options.dimension }, (v, k) => k).map(j => (
            <Col key={j} className='BossPuzzle-col'>
              <SquareTile
                options={game.options}
                hiddenTileCoords={bossPuzzleEngine.hiddenTileCoords}
                tiles={bossPuzzleEngine.tiles}
                imgSrc={imgSrc}
                row={Number(i)}
                col={Number(j)}
                isSolved={game.isSolved}
                onMoveMade={this.onMoveMade.bind(this)}
              />
            </Col>
          ))}</Row>
        ))}</div>
      );
    }

    return null;
  }

  startNew() {

    const { game, bossPuzzleEngine, dispatch, onFinishInit } = this.props;
    const { imgIndex, imgNumbers } = bossPuzzleEngine;

    let nextImgIndex, nextImgNumbers;

    if (imgIndex !== undefined && imgIndex < imgNumbers.length - 1) {
      nextImgIndex = imgIndex + 1;
      nextImgNumbers = imgNumbers;

    } else {
      nextImgIndex = 0;
      nextImgNumbers = getNewImgNumbers(imgNumbers)
    }

    const newHiddenTileCoords = {
      x: Math.floor(Math.random() * game.options.dimension),
      y: Math.floor(Math.random() * game.options.dimension)
    }
    
    const tasks = [];
    tasks.push(initData({ dimension: game.options.dimension, hiddenTileCoords: newHiddenTileCoords }));
    if (game.options.style === 'IMG') { tasks.push(this.loadImg(nextImgNumbers[nextImgIndex])); }

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

    this.props.dispatch(switchTiles(index1, index2, targetCoords));
  }
};

export default connect(store => ({
  game: store.game,
  gameOptions: store.gameOptions,
  bossPuzzleEngine: store.engines.BossPuzzle
}))(BossPuzzle);