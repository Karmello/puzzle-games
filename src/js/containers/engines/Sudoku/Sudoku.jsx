// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem } from 'material-ui';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, changeValue, resetEngine } from 'js/actions/sudoku';
import { initializeValues, checkIfSolved } from 'js/extracts/sudoku';
import { coordsToIndex } from 'js/extracts/gridBoard';

import type { T_Event } from 'js/flow-types';
import './Sudoku.css';

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
      const { dimension, state: { disabledIndexes } } = this;
      const index = coordsToIndex({ x: col, y: row }, dimension);
      const disabled = disabledIndexes.indexOf(index) > -1;
      
      const selectValues = [null];

      if (!disabled) {
        for (let i = 1; i < 10; i++) { selectValues.push(i); }
      } else {
        selectValues.push(values[index]);
      }

      return (
        <div style={this.getStyle(props)}>
          <Select
            value={(values && values[index]) || -1}
            onChange={this.onChange.call(this, props, values[index])}
            classes={{ select: 'select', icon: 'icon' }}
            MenuProps={{
              transformOrigin: { vertical: 'center', horizontal: 'center' }
            }}
            disabled={disabled}
          >
            {selectValues.map(selectValue => (
              <MenuItem
                key={selectValue}
                value={selectValue}
                style={{ display: 'inline', padding: '11px', fontSize: '25px' }}
              >{selectValue}</MenuItem>)
            )}
          </Select>
        </div>
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

  onChange(elemProps:{ col:number, row:number }, value:number) {
    return (e:T_Event) => {
      const { col, row } = elemProps;
      if (value !== e.target.value) {
        const { dimension } = this;
        this.props.dispatch(changeValue(coordsToIndex({ x: col, y: row }, dimension), e.target.value));
        super.onMakeMove();
      }
    }
  }

  getStyle(elemProps) {
    const { col, row } = elemProps;
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      width: `${this.elementSize}px`,
      height: `${this.elementSize}px`,
      backgroundColor: '#FFFFF0',
      borderTop: undefined,
      borderRight: undefined,
      borderBottom: undefined,
      borderLeft: undefined
    };
    if (row > 0) { style.borderTop = '1px solid'; }
    if (col > 0) { style.borderLeft = '1px solid'; }
    if (col === 2 || col === 5) { style.borderRight = '2px solid'; }
    if (row === 2 || row === 5) { style.borderBottom = '2px solid'; }
    return style;
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