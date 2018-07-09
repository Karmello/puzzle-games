import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Game, GridGameBoard } from 'js/game';
import ValueField from './ValueField/ValueField';
import { initFrame, changeValue, resetFrame } from './sudokuActions';
import { startingValues, rotate, shuffleLines, flip } from './sudokuHelpers';


class Sudoku extends Game {

  constructor(props) {
    super(props);
    this.dimension = 9;
    this.squareSize = 65;
  }

  componentWillUnmount() {
    this.props.dispatch(resetFrame());
  }

  render() {
    const { sudokuEngine } = this.props;
    return (
      <GridGameBoard
        dimension={this.dimension}
        squareSize={this.squareSize}
        Square={props => {
          const { col, row } = props;
          const index = GridGameBoard.coordsToIndex({ x: col, y: row }, this.dimension);
          return (
            <ValueField
              {...props}
              value={(sudokuEngine.values && sudokuEngine.values[index]) || ''}
              size={this.squareSize}
              onChange={this.onMoveMade.bind(this)}
            />
          );
        }}
      />
    );
  }

  startNew() {
    return new Promise(resolve => {
      let values = [...startingValues];
      const jobs = [rotate, shuffleLines, flip];
      for (let i = 0; i < 100; i++) {
        values = jobs[Math.floor(Math.random() * jobs.length)](this.dimension, values);
      }
      this.props.dispatch(initFrame(values));
      resolve();
    });
  }

  onMoveMade(col, row, newValue) {
    this.props.dispatch(changeValue(GridGameBoard.coordsToIndex({ x: col, y: row }, this.dimension), newValue));
    this.onMakeMove();
  }

  checkIfSolved() {
    return new Promise(resolve => {
      resolve(false);
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