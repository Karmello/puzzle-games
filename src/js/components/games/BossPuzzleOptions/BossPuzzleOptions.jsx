import React, { Component } from 'react';
import { Input, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import { setDimension } from 'js/actions';
import './BossPuzzleOptions.css';


export default class BossPuzzleOptions extends Component {
  
  render() {

    const { dimension, style } = this.props;

    return (
      <div className='BossPuzzleOptions'>
        <div>
          <FormControl>
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
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor='style'>Style</InputLabel>
            <Select
              value={style}
              input={<Input name='style' id='style' />}
              onChange={this.onStyleChange.bind(this)}
            >
              <MenuItem value='IMG'>Images</MenuItem>
              <MenuItem value='NUM'>Numbers</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }

  onDimensionChange(e) {

    const { dimension, dispatch } = this.props;
    if (e.target.value !== dimension) { dispatch(setDimension(e.target.value)); }
  }

  onStyleChange(e) {

  }
}