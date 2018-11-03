// @flow
import React from 'react';
import { connect } from 'react-redux';

import { GridBoard } from 'js/containers';
import { Game, ValueField } from 'js/components';
import { initEngine, changeValue, resetEngine } from 'js/actions/sudoku';
import { initializeValues, checkIfSolved } from 'js/extracts/sudoku';
import { coordsToIndex } from 'js/extracts/gridBoard';

class Sudoku extends Game {

  dimension:number;
  elementSize:number;

  constructor(props) {
    super(props);
    this.dimension = 9;
    this.elementSize = 65;
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  renderElement(values) {
    return props => {
      const { col, row } = props;
      const { dimension, elementSize, onMoveMade, state: { disabledIndexes } } = this;
      const index = coordsToIndex({ x: col, y: row }, dimension);
      return (
        <ValueField
          {...props}
          value={(values && values[index]) || -1}
          size={elementSize}
          onChange={onMoveMade.bind(this)}
          disabled={disabledIndexes.indexOf(index) > -1}
        />
      );
    }
  }

  render() {
    const { game, sudokuEngine: { values } } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={this.dimension}
        gridMap={this.createGridMap()}
        element={{
          size: this.elementSize,
          Element: this.renderElement(values)
        }}
      />
    );
  }

  createGridMap() {
    const { values } = this.props.sudokuEngine;
    const gridMap = {};
    values.forEach((value, i) => {
      gridMap[i] = { isOccupied: true };
    });
    return gridMap;
  }

  onMoveMade(col, row, newValue) {
    const { props, dimension } = this;
    props.dispatch(changeValue(coordsToIndex({ x: col, y: row }, dimension), newValue));
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