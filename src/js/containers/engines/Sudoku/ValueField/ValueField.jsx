// @flow
import React, { Component } from 'react';
import { Select, MenuItem } from 'material-ui';

import type { T_Event } from 'js/flow-types';
import './ValueField.css';

type Props = {
  value:number,
  disabled:boolean,
  col:number,
  row:number,
  size:number,
  onChange:Function
};

class ValueField extends Component<Props> {

  selectValues:Array<number|null>;

  componentWillMount() {
    this.selectValues = [null];
    for (let i = 1; i < 10; i++) { this.selectValues.push(i); }
  }
  
  render() {
    const { value, disabled } = this.props;
    return (
      <div style={this.getStyle()}>
        <Select
          value={value}
          onChange={e => this.onChange(e)}
          classes={{ select: 'select', icon: 'icon' }}
          MenuProps={{
            transformOrigin: { vertical: 'center', horizontal: 'center' }
          }}
          disabled={disabled}
        >
          {this.selectValues.map(selectValue => (
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

  getStyle() {
    const { col, row, size } = this.props;
    const style = {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
      boxSizing: 'border-box',
      border: '1px solid',
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: '#FFFFF0',
      borderRight: undefined,
      borderBottom: undefined
    };
    if (col === 2 || col === 5) { style.borderRight = '3px solid'; }
    if (row === 2 || row === 5) { style.borderBottom = '3px solid'; }
    return style;
  }

  onChange(e:T_Event) {
    const { col, row, value, onChange } = this.props;
    if (value !== e.target.value) {
      onChange(col, row, e.target.value);
    }
  }
}

export default ValueField;