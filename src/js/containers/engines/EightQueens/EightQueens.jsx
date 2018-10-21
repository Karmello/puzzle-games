// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/components';
import { initEngine, moveQueen, resetEngine } from 'js/actions/eightQueens';

class EightQueens extends Game {

  dimension:number;
  squareSize:number;
    
  constructor(props) {
    super(props);
    this.dimension = 8;
    this.squareSize = 75;
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game, eightQueensEngine } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridGameBoard
        dimension={this.dimension}
        squareSize={this.squareSize}
        Square={() => <Button disableRipple style={this.getBtnStyle()}> </Button>}
        isDraggable={true}
        isChessBoard={true}
        gridData={eightQueensEngine.queens}
        onDragMade={this.onMoveMade.bind(this)}
      />
    );
  }

  onMoveMade(fromIndex, toIndex) {
    this.props.dispatch(moveQueen(fromIndex, toIndex));
    super.onMakeMove();
  }

  getBtnStyle() {
    return  {
      minWidth: `${this.squareSize}px`,
      height: `${this.squareSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/eight-queens/queen.png)`,
      backgroundSize: `${this.squareSize-2}px ${this.squareSize-2}px`,
      backgroundColor: 'white'
    }
  }

  startNew = () => {
    return new Promise(resolve => {
      this.loadImg('eight-queens/queen.png').then(() => {
        const queens = Array.from({ length: this.dimension ** 2 }, (v, k) => {
          const coords = GridGameBoard.indexToCoords(k, this.dimension);
          return coords.x === coords.y;
        });
        this.props.dispatch(initEngine(queens));
        resolve();
      });
    });
  };

  checkIfSolved = () => {

    return new Promise(resolve => {

      const { indexToCoords } = GridGameBoard;
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
        if (!GridGameBoard.isAloneOnAxis('x', qCrds, dimension, queens)) {
          return resolve(false);
        }

        // y axis
        if (!GridGameBoard.isAloneOnAxis('y', qCrds, dimension, queens)) {
          return resolve(false);
        }
        
        // first diagonal (\)
        if (!GridGameBoard.isAloneOnAxis('d1', qCrds, dimension, queens)) {
          return resolve(false);
        }

        // second diagonal (/)
        if (!GridGameBoard.isAloneOnAxis('d2', qCrds, dimension, queens)) {
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