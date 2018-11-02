// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, moveQueen, resetEngine } from 'js/actions/eightQueens';
import { indexToCoords, isAloneOnAxis, isItEmptyBetweenThem } from 'js/extracts/gridBoard';

class EightQueens extends Game {

  dimension:number;
  elementSize:number;
    
  constructor(props) {
    super(props);
    this.dimension = 8;
    this.elementSize = 75;
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  renderElement() {
    return (props:Object) => <Button disableRipple style={this.getBtnStyle(props.isSelected)}> </Button>;
  }

  render() {
    const { game, eightQueensEngine } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={this.dimension}
        isChessBoard={true}
        elementsMap={eightQueensEngine.queens}
        element={{
          size: this.elementSize,
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

  onMoveTry(selectedIndex:number, clickedIndex:number) {
    const { queens } = this.props.eightQueensEngine;
    const isItEmptyBetween = isItEmptyBetweenThem(selectedIndex, clickedIndex, this.dimension, queens);
    return selectedIndex > -1 && (isItEmptyBetween === undefined || isItEmptyBetween === true);
  }

  onMoveDone(selectedIndex:number, clickedIndex:number) {
    this.props.dispatch(moveQueen(selectedIndex, clickedIndex));
    super.onMakeMove();
  }

  getBtnStyle(isSelected:boolean) {
    return  {
      minWidth: `${this.elementSize}px`,
      height: `${this.elementSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/eight-queens/queen.png)`,
      backgroundSize: `${this.elementSize-2}px ${this.elementSize-2}px`,
      backgroundColor: !isSelected ? 'white' : 'yellow'
    }
  }

  startNew = () => {
    return new Promise(resolve => {
      this.loadImg('eight-queens/queen.png').then(() => {
        const queens = Array.from({ length: this.dimension ** 2 }, (v, k) => {
          const coords = indexToCoords(k, this.dimension);
          return coords.x === coords.y;
        });
        this.props.dispatch(initEngine(queens));
        resolve();
      });
    });
  };

  checkIfSolved = () => {

    return new Promise(resolve => {

      const dimension = this.dimension;
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