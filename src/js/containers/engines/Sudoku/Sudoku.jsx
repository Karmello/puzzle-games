// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Select, MenuItem } from '@material-ui/core';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, changeValue, resetEngine } from 'js/actions/sudoku';
import { initializeValues, checkIfSolved } from 'js/extracts/sudoku';
import { coordsToIndex } from 'js/extracts/gridBoard';
import { C_Sudoku } from 'js/constants';

import type { T_Event } from 'js/flow-types';
import './Sudoku.css';

const { dimension, elementSize, selectMaxValue } = C_Sudoku;

class Sudoku extends Game {

  static getElementStyle({ col, row }) {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
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

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game, sudokuEngine: { values } } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={{ x: Number(dimension), y: Number(dimension ) }}
        element={{
          size: elementSize,
          Element: this.renderElement(values),
          getStyle: Sudoku.getElementStyle.bind(this)
        }}
      />
    );
  }

  renderElement(values) {
    return props => {
      
      const { col, row } = props;
      const index = coordsToIndex({ x: col, y: row }, dimension);
      const disabled = this.state.disabledIndexes.indexOf(index) > -1;
      
      const selectValues = [null];

      if (!disabled) {
        for (let i = 1; i <= selectMaxValue; i++) { selectValues.push(i); }
      } else {
        selectValues.push(values[index]);
      }

      return (
        <div style={props.style}>
          <Select
            value={(values && values[index]) || -1}
            onChange={this.onElementValueChange.call(this, props, values[index])}
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
              >
                {selectValue}
              </MenuItem>)
            )}
          </Select>
        </div>
      );
    }
  }

  onElementValueChange(elemProps:{ col:number, row:number }, value:number) {
    return (e:T_Event) => {
      const { col, row } = elemProps;
      if (value !== e.target.value) {
        this.props.dispatch(changeValue(coordsToIndex({ x: col, y: row }, dimension), e.target.value));
        super.onMakeMove();
      }
    }
  }

  startNew = () => {
    return new Promise(resolve => {

      const disabledIndexes = [];
      const newValues = initializeValues(dimension);
      
      for (let i = 0; i < newValues.length; i++) {
        if (newValues[i]) { disabledIndexes.push(i); }
      }

      this.setState({ disabledIndexes });
      this.props.dispatch(initEngine(newValues));
      resolve();
    });
  };

  checkIfSolved = () => {
    return checkIfSolved(this.props.sudokuEngine.values, dimension);
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  sudokuEngine: store.engines['sudoku']
}))(Sudoku);
