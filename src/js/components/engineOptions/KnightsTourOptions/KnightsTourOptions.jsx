// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'material-ui';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import './KnightsTourOptions.css';

import type { T_GameOptionsModel } from 'js/flow-types';

type Props = {
  options:T_GameOptionsModel,
  path:string,
  disabled:boolean,
  onValueChangeCb:Function
};

type State = {
  dimension:string
};

export default class KnightsTourOptions extends Component<Props, State> {
  
  state = { dimension: '' }

  componentWillMount() {
    const { dimension } = this.props.options;
    this.setState({ dimension });
  }

  componentWillReceiveProps(nextProps:Props) {
    const { dimension } = this.state;
    const nextDimension = nextProps.options.dimension;
    if (dimension !== nextDimension) {
      this.setState({ dimension: nextDimension });
    }
  } 

  render() {

    const { dimension } = this.state;
    const { path, disabled } = this.props;

    return (
      <div className='KnightsTourOptions'>
        {dimension && <div>
          <FormControl>
            <InputLabel htmlFor='dimension'>Dimension</InputLabel>
            <Select
              value={dimension}
              input={<Input name='dimension' id='dimension' />}
              onChange={e => this.onValueChange('dimension', e.target.value)}
              disabled={disabled}
            >
              <MenuItem value='5' component={path ? Link: undefined} to={`${path}?dimension=5`}>5 x 5</MenuItem>
              <MenuItem value='8' component={path ? Link: undefined} to={`${path}?dimension=8`}>8 x 8</MenuItem>
            </Select>
          </FormControl>
        </div>}
      </div>
    );
  }

  onValueChange(key:string, value:string) {
    this.setState({ [key]: value });
    if (this.props.onValueChangeCb) {
      setTimeout(() => this.props.onValueChangeCb(this.state));
    }
  }
}