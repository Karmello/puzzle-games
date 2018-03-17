import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/game';
import { initFrame, resetFrame } from 'js/engines/EightQueens/eightQueens.actions';


const queenImgUrl = `${process.env.REACT_APP_S3_BUCKET}/EightQueens/queen.png`;
const squareSize = 75;

const getBtnStyle = () => ({
  minWidth: `${squareSize}px`,
  height: `${squareSize}px`,
  borderRadius: '50px',
  backgroundImage: `url(${queenImgUrl})`,
  backgroundSize: `${squareSize}px ${squareSize}px`
});

class EightQueens extends Game {

  static dimension = 8;

  componentWillUnmount() {
    this.props.dispatch(resetFrame());
  }

  render() {
    const { eightQueensEngine } = this.props;
    return (
      <GridGameBoard
        dimension={EightQueens.dimension}
        squareSize={squareSize}
        Square={() => <Button style={getBtnStyle()}> </Button>}
        draggable={true}
        gridData={eightQueensEngine.queens}
      />
    );
  }

  startNew() {
    return new Promise(resolve => {
      this.loadImg('EightQueens/queen.png').then(() => {
        const queens = Array.from({ length: EightQueens.dimension ** 2 }, (v, k) => {
          const coords = Game.indexToCoords(k, EightQueens.dimension);
          return coords.x === coords.y;
        });
        this.props.dispatch(initFrame(queens));
        resolve();
      });
    });
  }

  checkIfSolved() {
    return new Promise(resolve => resolve(false));
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