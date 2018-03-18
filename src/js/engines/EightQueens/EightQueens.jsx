import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/game';
import { initFrame, moveQueen, resetFrame } from 'js/engines/EightQueens/eightQueens.actions';


class EightQueens extends Game {

  constructor(props) {
    super(props);
    this.dimension = 8;
    this.squareSize = 75;
  }

  componentWillUnmount() {
    this.props.dispatch(resetFrame());
  }

  render() {
    const { eightQueensEngine } = this.props;
    return (
      <GridGameBoard
        dimension={this.dimension}
        squareSize={this.squareSize}
        Square={() => <Button disableRipple style={this.getBtnStyle()}> </Button>}
        draggable={true}
        gridData={eightQueensEngine.queens}
        onDragMade={this.onMoveMade.bind(this)}
      />
    );
  }

  startNew() {
    return new Promise(resolve => {
      this.loadImg('EightQueens/queen.png').then(() => {
        const queens = Array.from({ length: this.dimension ** 2 }, (v, k) => {
          const coords = GridGameBoard.indexToCoords(k, this.dimension);
          return coords.x === coords.y;
        });
        this.props.dispatch(initFrame(queens));
        resolve();
      });
    });
  }

  onMoveMade(fromIndex, toIndex) {
    this.props.dispatch(moveQueen(fromIndex, toIndex));
    this.onMakeMove();
  }

  checkIfSolved() {
    
    return new Promise(resolve => {

      const { coordsToIndex, indexToCoords } = GridGameBoard;
      const dimension = this.dimension;
      const { eightQueensEngine } = this.props;
      const queens = eightQueensEngine.queens;
      const qIndxs = [];

      for (const key in queens) {
        if (queens[key]) {
          qIndxs.push(Number(key));
        }
      }

      for (const q of qIndxs) {
        
        const qCrds = indexToCoords(q, dimension);
        
        for (let x = 0; x < dimension; x++) {
          if (x !== qCrds.x && queens[coordsToIndex({ x, y: qCrds.y }, dimension)]) {
            return resolve(false);
          }
        }
        
        for (let y = 0; y < dimension; y++) {
          if (y !== qCrds.y && queens[coordsToIndex({ x: qCrds.x, y }, dimension)]) {
            return resolve(false);
          }
        }
        
        for (let z1 = 0; z1 < dimension - Math.abs(qCrds.x - qCrds.y); z1++) {
          const { x, y } = qCrds;
          const i = (((y - Math.min(x, y)) + z1) * dimension) + (x - Math.min(x, y) + z1);
          if (i !== q && queens[i]) {
            return resolve(false);
          }
        }

        for (let z2 = 0; z2 < dimension - Math.abs(dimension - qCrds.x - qCrds.y - 1); z2++) {
          const { x, y } = qCrds;
          const i = (((y + Math.min(dimension - 1 - y, x)) - z2) * dimension) + (x - Math.min(dimension - 1 - y, x) + z2);
          if (i !== q && queens[i]) {
            return resolve(false);
          }
        }
      }

      resolve(true);
    });
  }

  getBtnStyle() {
    return  {
      minWidth: `${this.squareSize}px`,
      height: `${this.squareSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET}/EightQueens/queen.png)`,
      backgroundSize: `${this.squareSize-2}px ${this.squareSize-2}px`,
      backgroundColor: 'white'
    }
  }
}

EightQueens.propTypes = {
  restarting: PropTypes.bool.isRequired,
  readTimer: PropTypes.func.isRequired
};

export default connect(store => ({
  clientUser: store.api.clientUser,
  gameApiData: store.api.games.res.data.find(elem => elem.id === 'EightQueens'),
  game: store.game,
  eightQueensEngine: store.engines.EightQueens
}))(EightQueens);