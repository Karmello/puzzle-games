import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';
import { Game, GridGameBoard } from 'js/game';


const dimension = 8;
const squareSize = 75;
const colors = { 0: '#dbbe92', 1: '#52220b' };

const styles = {
  btn: (squareSize, col, row) => ({
    borderRadius: 0,
    minWidth: `${squareSize}px`,
    height: `${squareSize}px`,
    backgroundColor: colors[(col + row) % 2],
    backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET}/EightQueens/queen.png)`,
    backgroundSize: `${squareSize}px ${squareSize}px`
  })
};

class EightQueens extends Game {

  render() {
    return (
      <GridGameBoard
        dimension={dimension}
        squareSize={squareSize}
        Square={props => (
          <Button
            disableRipple
            disabled
            variant='flat'
            style={styles.btn(squareSize, props.col, props.row)}
          > </Button>
        )}
      />
    );
  }

  startNew(doRestart) {
    return new Promise(resolve => resolve());
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