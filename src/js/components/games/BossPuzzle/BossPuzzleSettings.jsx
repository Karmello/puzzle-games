import React, { Component } from 'react';
import { Input, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import { setDimension } from 'js/actions';


export default class BossPuzzleSettings extends Component {
  
  render() {

    const { dimension } = this.props;

    return (
      <FormControl style={{ marginTop: '15px' }}>
        <InputLabel htmlFor='dimension'>Dimension</InputLabel>
        <Select
          value={dimension}
          input={<Input name='dimension' id='dimension' />}
          onChange={this.onDimensionChange.bind(this)}
        >
          <MenuItem value={3}>3 x 3</MenuItem>
          <MenuItem value={4}>4 x 4</MenuItem>
          <MenuItem value={5}>5 x 5</MenuItem>
        </Select>
      </FormControl>
    );
  }

  onDimensionChange(e) {

    const { dimension, dispatch } = this.props;
    if (e.target.value !== dimension) { dispatch(setDimension(e.target.value)); }
  }
}