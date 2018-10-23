// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import { GameOptions } from 'js/components';

export default class KnightsTourOptions extends GameOptions {
  
  render() {

    const { dimension } = this.state;
    const { path, disabled } = this.props;

    return (
      <div>
        {dimension &&
        <FormControl>
          <InputLabel htmlFor='dimension'>Dimension</InputLabel>
          <Select
            value={dimension}
            input={<Input name='dimension' id='dimension' />}
            onChange={e => this.onValueChange('dimension', e.target.value)}
            disabled={disabled}
          >
            <MenuItem
              value='5'
              component={path ? Link: undefined}
              to={`${String(path)}?dimension=5`}
            >5 x 5</MenuItem>
            <MenuItem
              value='8'
              component={path ? Link: undefined}
              to={`${String(path)}?dimension=8`}
            >8 x 8</MenuItem>
          </Select>
        </FormControl>}
      </div>
    );
  }
}