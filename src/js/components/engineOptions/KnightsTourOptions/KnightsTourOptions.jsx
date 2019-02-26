// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';

import GameOptions from 'js/components/game/GameOptions/GameOptions';
import type { T_Event } from 'js/flow-types';

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
            onChange={this.onDimensionChange}
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

  onDimensionChange = (e:T_Event) => this.onValueChange('dimension', String(e.target.value));
}