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
    const { value, disabled } = this.props;
    this.selectValues = [null];
    if (!disabled) {
      for (let i = 1; i < 10; i++) { this.selectValues.push(i); }
    } else {
      this.selectValues.push(value);
    }
  }

  render() {
    const { value, disabled } = this.props;
    return (
      <div style={this.getStyle()}>
        <Select
          value={value}
          onChange={this.onChange.bind(this)}
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
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',
      width: `${size}px`,
      height: `${size}px`,
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

  onChange(e:T_Event) {
    const { col, row, value, onChange } = this.props;
    if (value !== e.target.value) {
      onChange(col, row, e.target.value);
    }
  }
}

export default ValueField;