// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import { GameOptions } from 'js/components';

export default class BossPuzzleOptions extends GameOptions {

  render() {

    const { mode, dimension } = this.state;
    const { path, disabled } = this.props;

    return (
      <div>
        {mode && <div>
          <FormControl>
            <InputLabel htmlFor='mode'>Mode</InputLabel>
            <Select
              value={mode}
              input={<Input name='mode' id='mode' />}
              onChange={e => this.onValueChange('mode', e.target.value)}
              disabled={disabled}
              style={{ width: '100px' }}
            >
              <MenuItem value='NUM' component={path ? Link: undefined} to={`${String(path)}?dimension=${dimension}&mode=NUM`}>Numbers</MenuItem>
              <MenuItem value='IMG' component={path ? Link: undefined} to={`${String(path)}?dimension=${dimension}&mode=IMG`}>Image</MenuItem>
            </Select>
          </FormControl>
        </div>}
        {dimension && <div>
          <FormControl>
            <InputLabel htmlFor='dimension'>Dimension</InputLabel>
            <Select
              value={dimension}
              input={<Input name='dimension' id='dimension' />}
              onChange={e => this.onValueChange('dimension', e.target.value)}
              disabled={disabled}
            >
              <MenuItem value='3' component={path ? Link: undefined} to={`${String(path)}?dimension=3&mode=${mode}`}>3 x 3</MenuItem>
              <MenuItem value='4' component={path ? Link: undefined} to={`${String(path)}?dimension=4&mode=${mode}`}>4 x 4</MenuItem>
              <MenuItem value='5' component={path ? Link: undefined} to={`${String(path)}?dimension=5&mode=${mode}`}>5 x 5</MenuItem>
            </Select>
          </FormControl>
        </div>}
      </div>
    );
  }
}