// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';
import { isEmpty } from 'lodash';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, switchTiles, clearHiddenTileCoords, resetEngine } from 'js/actions/bossPuzzle';
import { getNewImgNumbers, initData } from 'js/extracts/bossPuzzle';
import { coordsToIndex, indexToCoords, findAllMovementCoords } from 'js/extracts/gridBoard';
import { C_BossPuzzle } from 'js/constants';

const { numOfImgs, fontSizes, tileSizes } = C_BossPuzzle;

class BossPuzzle extends Game {

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {

    const { game: { isLoading, options: { mode, dimension } } } = this.props;
    const { imgSrc } = this.state;

    if (isLoading) { return null; }
    
    if (mode === 'NUM' || (mode === 'IMG' && imgSrc)) {
      return (
        <GridBoard
          dimension={Number(dimension)}
          gridMap={this.createGridMap()}
          element={{
            size: tileSizes[String(dimension)],
            Element: this.renderElement()
          }}
        />
      );
    }

    return null;
  }

  renderElement() {
    const { mode } = this.props.game.options;
    return props => (
      <Button
        disableRipple
        variant='raised'
        style={this.getStyle(props)}
        onClick={this.onTileClick.bind(this, props)}
      >
        {mode === 'NUM' ? this.getTileLabel(props) : ''}
      </Button>
    );
  }
  
  createGridMap() {
    const { dimension } = this.props.game.options;
    const { tiles, hiddenTileCoords } = this.props.bossPuzzleEngine;
    const hiddenIndex = coordsToIndex(hiddenTileCoords, Number(dimension));
    const gridMap = {};
    tiles.forEach((value, i) => {
      gridMap[i] = { isOccupied: i !== hiddenIndex || isEmpty(hiddenTileCoords) };
    });
    return gridMap;
  }

  onTileClick(elemProps) {
    
    const { row, col } = elemProps;
    const { game: { isSolved, options }, bossPuzzleEngine: { hiddenTileCoords } } = this.props;

    if (!isSolved) {

      const targetCoords = { x: col, y: row };
      const allMovementCoords = findAllMovementCoords(targetCoords, Number(options.dimension));

      for (let coords of allMovementCoords) {
        // If hidden tile found
        if (coords.x === hiddenTileCoords.x && coords.y === hiddenTileCoords.y) {
          const index1 = coordsToIndex(targetCoords, Number(options.dimension));
          const index2 = coordsToIndex(coords, Number(options.dimension));
          this.props.dispatch(switchTiles(index1, index2, targetCoords));
          super.onMakeMove();
        }
      }
    }
  }

  getTileLabel(elemProps:{ index:number }) {
    const { bossPuzzleEngine: { tiles } } = this.props;
    if (tiles.length > 0) { return tiles[elemProps.index]; } else { return ''; }
  }

  getStyle(elemProps) {
    
    const { col, row } = elemProps;
    const { imgSrc } = this.state;
    const { mode, dimension } = this.props.game.options;
    const { hiddenTileCoords } = this.props.bossPuzzleEngine;
    const tileSize = tileSizes[Number(dimension)];

    const style = {
      minWidth: `${tileSize}px`,
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      fontSize: `${fontSizes[dimension || '3']}px`,
      color: '#001f3f',
      backgroundColor: 'rgba(61, 153, 112, 0.75)',
      backgroundImage: undefined,
      backgroundSize: undefined,
      backgroundPosition: undefined
    };

    if (col !== hiddenTileCoords.x || row !== hiddenTileCoords.y) {

      const label = this.getTileLabel(elemProps);

      if (mode === 'IMG' && imgSrc && label) {
        const imgCoords = indexToCoords(Number(label) - 1, Number(dimension));
        const imgSize = tileSizes[Number(dimension)];
        style.backgroundImage = `url(${imgSrc})`;
        style.backgroundSize = `${Number(dimension) * imgSize}px ${Number(dimension) * imgSize}px`;
        style.backgroundPosition = `-${Number(imgCoords.x) * imgSize}px -${Number(imgCoords.y) * imgSize}px`;
      }
    }

    return style;
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
    const { dispatch, bossPuzzleEngine: { tiles } } = this.props;
    return new Promise(resolve => {
      // checking if solved
      for (let i = 0; i < tiles.length; i++) {
        if (i + 1 !== tiles[i]) {
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