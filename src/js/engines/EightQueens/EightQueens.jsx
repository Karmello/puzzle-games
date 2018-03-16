import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/game';


const squareSize = 75;
const colors = { 0: '#dbbe92', 1: '#52220b' };

class EightQueens extends Game {

  render() {
    return (
      <GridGameBoard
        dimension={8}
        squareSize={squareSize}
        Square={props => {
          return (
            <Button
              disableRipple
              disabled
              variant='flat'
              style={{
                borderRadius: 0,
                minWidth: `${squareSize}px`,
                height: `${squareSize}px`,
                backgroundColor: colors[(props.col + props.row) % 2]
              }}
            > </Button>
          );
        }}
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