import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Game, GridGameBoard } from 'js/game';
import ValueField from './ValueField/ValueField';


class Sudoku extends Game {

  constructor(props) {
    super(props);
    this.dimension = 9;
    this.squareSize = 75;
  }

  render() {
    return (
      <GridGameBoard
        dimension={this.dimension}
        squareSize={this.squareSize}
        Square={props => <ValueField {...props} size={this.squareSize} />}
      />
    );
  }

  startNew() {
    return new Promise(resolve => {
      resolve();
    });
  }
}

Sudoku.propTypes = {
  readTimer: PropTypes.func.isRequired
};

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  sudokuEngine: store.engines['sudoku']
}))(Sudoku);