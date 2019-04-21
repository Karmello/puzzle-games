// @flow
import * as React from 'react';
import { isEmpty } from 'lodash';

import type { T_GameOptionsModel, T_GameOptionsProps } from 'js/flow-types';
import './GameOptions.css';

export default class GameOptions extends React.Component<T_GameOptionsProps, T_GameOptionsModel> {
  
  state = { mode: '', dimension: '' }

  componentWillMount() {
    const { mode, dimension } = this.props.options;
    this.setState({ mode, dimension });
  }

  componentWillReceiveProps(nextProps:T_GameOptionsProps) {
    const newState = {};
    for (const key in this.state) {
      if (this.state[key] && this.state[key] !== nextProps.options[key]) {
        newState[key] = this.state[key];
      }
    }
    if (!isEmpty(newState)) { this.setState(newState); }
  } 

  render() {
    const { Content } = this.props;
    return (
      <div className='GameOptions'>
        <Content {...this.props} />
      </div>
    );
  }

  onValueChange(key:string, value:string) {
    if (this.state[key] !== value) {
      const { onValueChangeCb } = this.props;
      this.setState({ [key]: value });
      if (onValueChangeCb) { setTimeout(() => onValueChangeCb(this.state)); }
    }
  }
}
