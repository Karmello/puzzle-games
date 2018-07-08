import React, { Component } from 'react';
import { Select, MenuItem } from 'material-ui';

import './ValueField.css';

class ValueField extends Component {

  constructor(props) {
    super(props);
    this.values = [];
    for (let i = 1; i < 10; i++) { this.values.push(i); }
  }
  
  render() {
    return (
      <div style={this.getStyle()}>
        <Select
          value={this.props.value}
          onChange={e => this.onChange(e)}
          classes={{ select: 'select', icon: 'icon' }}
          MenuProps={{
            transformOrigin: { vertical: 'center', horizontal: 'center' }
          }}
        >
          {this.values.map(value => (
            <MenuItem
              key={value}
              value={value}
              style={{ display: 'inline', padding: '11px', fontSize: '25px' }}
            >{value}</MenuItem>)
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
      height: `${size}px`
    };
    if (col === 2 || col === 5) { style.borderRight = '3px solid'; }
    if (row === 2 || row === 5) { style.borderBottom = '3px solid'; }
    return style;
  }

  onChange(e) {
    const { col, row } = this.props;
    this.props.onChange(col, row, e.target.value);
  }
}

export default ValueField;