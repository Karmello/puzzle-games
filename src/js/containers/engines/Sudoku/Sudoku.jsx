// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Game, GridBoard, ValueField } from 'js/components';
import { initEngine, changeValue, resetEngine } from 'js/actions/sudoku';
import { initializeValues, checkIfSolved } from 'js/extracts/sudoku';

const renderSquare = (sudokuRef, values) => props => {
  const { col, row } = props;
  const { dimension, squareSize, onMoveMade, state: { disabledIndexes } } = sudokuRef;
  const index = GridBoard.coordsToIndex({ x: col, y: row }, dimension);
  return (
    <ValueField
      {...props}
      value={(values && values[index]) || -1}
      size={squareSize}
      onChange={onMoveMade.bind(sudokuRef)}
      disabled={disabledIndexes.indexOf(index) > -1}
    />
  );
}

class Sudoku extends Game {

  dimension:number;
  squareSize:number;

  constructor(props) {
    super(props);
    this.dimension = 9;
    this.squareSize = 65;
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game, sudokuEngine: { values } } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={this.dimension}
        squareSize={this.squareSize}
        Square={renderSquare(this, values)}
      />
    );
  }

  onMoveMade(col, row, newValue) {
    const { props, dimension } = this;
    props.dispatch(changeValue(GridBoard.coordsToIndex({ x: col, y: row }, dimension), newValue));
    super.onMakeMove();
  }

  startNew = () => {
    return new Promise(resolve => {

      const disabledIndexes = [];
      const newValues = initializeValues(this.dimension);
      
      for (let i = 0; i < newValues.length; i++) {
        if (newValues[i]) { disabledIndexes.push(i); }
      }

      this.setState({ disabledIndexes });
      this.props.dispatch(initEngine(newValues));
      resolve();
    });
  };

  checkIfSolved = () => {
    return checkIfSolved(this.props.sudokuEngine.values, this.dimension);
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  sudokuEngine: store.engines['sudoku']
}))(Sudoku);