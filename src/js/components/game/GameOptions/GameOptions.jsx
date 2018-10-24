// @flow
import * as React from 'react';
import { isEmpty } from 'lodash';

import type { T_GameOptionsModel } from 'js/flow-types';
import './GameOptions.css';

export type Props = {
  options:T_GameOptionsModel,
  Content:React.ComponentType<Props>,
  path?:string,
  disabled?:boolean,
  onValueChangeCb?:Function
};

export default class GameOptions extends React.Component<Props, T_GameOptionsModel> {
  
  state = { mode: '', dimension: '' }

  componentWillMount() {
    const { mode, dimension } = this.props.options;
    this.setState({ mode, dimension });
  }

  componentWillReceiveProps(nextProps:Props) {
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
    const { onValueChangeCb } = this.props;
    this.setState({ [key]: value });
    if (onValueChangeCb) { setTimeout(() => onValueChangeCb(this.state)); }
  }
}