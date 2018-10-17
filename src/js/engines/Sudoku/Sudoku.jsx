// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Game, GridGameBoard } from 'js/game';
import ValueField from './ValueField/ValueField';
import { initFrame, changeValue, resetFrame } from './sudokuActions';
import { initializeValues, checkIfSolved } from './sudokuHelpers';

class Sudoku extends Game {

  dimension:number;
  squareSize:number;

  constructor(props) {
    super(props);
    this.dimension = 9;
    this.squareSize = 65;
  }

  componentWillUnmount() {
    this.props.dispatch(resetFrame());
  }

  render() {
    const { game, sudokuEngine } = this.props;
    if (game.isLoading) { return null; }
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
              disabled={this.state.disabledIndexes.indexOf(index) > -1}
            />
          );
        }}
      />
    );
  }

  startNew = () => {
    return new Promise(resolve => {

      const disabledIndexes = [];
      const newValues = initializeValues(this.dimension);
      
      for (let i = 0; i < newValues.length; i++) {
        if (newValues[i]) { disabledIndexes.push(i); }
      }

      this.setState({ disabledIndexes });
      this.props.dispatch(initFrame(newValues));
      resolve();
    });
  }

  onMoveMade(col, row, newValue) {
    const { props, dimension } = this;
    props.dispatch(changeValue(GridGameBoard.coordsToIndex({ x: col, y: row }, dimension), newValue));
    super.onMakeMove();
  }

  checkIfSolved = () => {
    return checkIfSolved(this.props.sudokuEngine.values, this.dimension);
  }
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  sudokuEngine: store.engines['sudoku']
}))(Sudoku);