// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, moveQueen, resetEngine } from 'js/actions/eightQueens';
import { indexToCoords, isAloneOnAxis, isItEmptyBetweenThem } from 'js/extracts/gridBoard';
import { C_EightQueens } from 'js/constants';

const { dimension, elementSize, imgPaths } = C_EightQueens;

class EightQueens extends Game {

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={dimension}
        isChessBoard={true}
        gridMap={this.createGridMap()}
        element={{
          size: elementSize,
          isSelectable: true,
          Element: this.renderElement()
        }}
        callback={{
          onMoveTry: this.onMoveTry.bind(this),
          onMoveDone: this.onMoveDone.bind(this)
        }}
      />
    );
  }

  renderElement() {
    return (props) => (
      <Button disableRipple style={this.getBtnStyle(props.isSelected)}> </Button>
    );
  }

  createGridMap() {
    const { queens } = this.props.eightQueensEngine;
    const gridMap = {};
    queens.forEach((isQueen, i) => {
      gridMap[i] = { isOccupied: isQueen };
    });
    return gridMap;
  }

  onMoveTry(selectedIndex:number, clickedIndex:number) {
    const { queens } = this.props.eightQueensEngine;
    const isItEmptyBetween = isItEmptyBetweenThem(selectedIndex, clickedIndex, dimension, queens);
    return selectedIndex > -1 && (isItEmptyBetween === undefined || isItEmptyBetween === true);
  }

  onMoveDone(selectedIndex:number, clickedIndex:number) {
    this.props.dispatch(moveQueen(selectedIndex, clickedIndex));
    super.onMakeMove();
  }

  getBtnStyle(isSelected:boolean) {
    return  {
      minWidth: `${elementSize}px`,
      height: `${elementSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${imgPaths.queen})`,
      backgroundSize: `${elementSize-2}px ${elementSize-2}px`,
      backgroundColor: !isSelected ? 'white' : 'yellow'
    }
  }

  startNew = () => {
    return new Promise(resolve => {
      this.loadImg(imgPaths.queen).then(() => {
        const queens = Array.from({ length: dimension ** 2 }, (v, k) => {
          const coords = indexToCoords(k, dimension);
          return coords.x === coords.y;
        });
        this.props.dispatch(initEngine(queens));
        resolve();
      });
    });
  };

  checkIfSolved = () => {

    return new Promise(resolve => {

      const { eightQueensEngine } = this.props;
      const queens = eightQueensEngine.queens;
      const qIndxs = [];

      for (let i = 0; i < queens.length; i++) {
        if (queens[i]) {
          qIndxs.push(Number(i));
        }
      }

      for (const q of qIndxs) {
        
        const qCrds = indexToCoords(q, dimension);
        
        // x axis
        if (!isAloneOnAxis('x', qCrds, dimension, queens)) {
          return resolve(false);
        }

        // y axis
        if (!isAloneOnAxis('y', qCrds, dimension, queens)) {
          return resolve(false);
        }
        
        // first diagonal (\)
        if (!isAloneOnAxis('d1', qCrds, dimension, queens)) {
          return resolve(false);
        }

        // second diagonal (/)
        if (!isAloneOnAxis('d2', qCrds, dimension, queens)) {
          return resolve(false);
        }
      }

      resolve(true);
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  eightQueensEngine: store.engines['eight-queens']
}))(EightQueens);