import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

import SquareTile from './SquareTile';
import { clearHiddenTileCoords, initFrame, switchTiles, resetFrame } from 'js/actions';
import { getNewImgNumbers, initData } from './BossPuzzle.static';
import './BossPuzzle.css';


class BossPuzzle extends Component {

  static tilesSizes = { 3: 150, 4: 125, 5: 100 };
  static numOfImgs = 15;
  
  constructor(props) {
    super(props);
    this.state = { imgSrc: null };
  }

  componentWillMount() {

    this.startNew();
  }

  componentWillUpdate(nextProps, nextState) {

    // Game loader started
    if (!this.props.game.isLoading && nextProps.game.isLoading) {

      this.setState({ imgSrc: null });
      this.startNew();
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { bossPuzzle, onBeenSolved, dispatch } = this.props;

    // if move was made
    if (bossPuzzle.moves === prevProps.bossPuzzle.moves + 1) {
      
      // checking if solved
      for (let i = 0; i < bossPuzzle.tiles.length; i++) {
        if (i + 1 !== bossPuzzle.tiles[i]) {
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
    const { game, bossPuzzle } = this.props;
    
    if (imgSrc) {
      return (
        <div
          className={'BossPuzzle-' + bossPuzzle.dimension}
          style={{ pointerEvents: game.isSolved ? 'none' : 'initial' }}
        > {
        Array.from({ length: bossPuzzle.dimension }, (v, k) => k).map((i) => (
          <Row key={i} className='BossPuzzle-row'> {
          Array.from({ length: bossPuzzle.dimension }, (v, k) => k).map((j) => (
            <Col key={j} className='BossPuzzle-col'>
              <SquareTile
                bossPuzzle={bossPuzzle}
                imgSrc={imgSrc}
                row={Number(i)}
                col={Number(j)}
                isSolved={game.isSolved}
                onMoveMade={this.onMoveMade.bind(this)}
                showLabel={false}
              />
            </Col>
          ))}</Row>
        ))}</div>
      );
    }

    return null;
  }

  startNew() {

    const { bossPuzzle, dispatch, onFinishInit } = this.props;
    const { dimension, imgIndex, imgNumbers } = bossPuzzle;

    let nextImgIndex, nextImgNumbers;

    if (imgIndex !== undefined && imgIndex < imgNumbers.length - 1) {
      nextImgIndex = imgIndex + 1;
      nextImgNumbers = imgNumbers;

    } else {
      nextImgIndex = 0;
      nextImgNumbers = getNewImgNumbers(imgNumbers)
    }
        
    const newHiddenTileCoords = {
      x: Math.floor(Math.random() * dimension),
      y: Math.floor(Math.random() * dimension)
    }
    
    const task1 = this.loadImg(nextImgNumbers[nextImgIndex]);
    const task2 = initData({ dimension, hiddenTileCoords: newHiddenTileCoords });

    return Promise.all([task1, task2]).then((data) => {
      dispatch(initFrame(dimension, nextImgNumbers, nextImgIndex, data[1].tiles, data[1].hiddenTileCoords));
      onFinishInit();
    });
  }

  loadImg(imgNumber) {

    return new Promise((resolve, reject) => {

      const img = new Image();
      img.src = `${process.env.REACT_APP_S3_BUCKET}/BOSS_PUZZLE/img${imgNumber}.jpg`;
        
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
  bossPuzzle: store.games.BOSS_PUZZLE
}))(BossPuzzle);