import React, { Component } from 'react';
import { Input, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import './BossPuzzleOptions.css';


export default class BossPuzzleOptions extends Component {
  
  state = { dimension: undefined, style: undefined }

  componentWillMount() {

    this.setState({ ...this.props.options });
  }

  render() {

    const { dimension, style } = this.state;
    const { disabled } = this.props;

    return (
      <div className='BossPuzzleOptions'>
        <div>
          <FormControl>
            <InputLabel htmlFor='dimension'>Dimension</InputLabel>
            <Select
              value={dimension}
              input={<Input name='dimension' id='dimension' />}
              onChange={e => this.onValueChange('dimension', e.target.value)}
              disabled={disabled}
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
              onChange={e => this.onValueChange('style', e.target.value)}
              disabled={disabled}
            >
              <MenuItem value='IMG'>Images</MenuItem>
              <MenuItem value='NUM'>Numbers</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }

  onValueChange(key, value) {

    this.setState({ [key]: value });
    
    if (this.props.onValueChangeCb) {
      setTimeout(() => { this.props.onValueChangeCb(this.state); });
    }
  }
}