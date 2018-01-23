import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';

import './Loader.css';


export default class Loader extends Component {
  
  render() {

    const { isShown } = this.props;

    return (
      <div className='Loader'>
        <div style={{ display: isShown ? 'none' : 'initial' }}>{this.props.children}</div>
        {isShown && <div className='Spinner'><CircularProgress/></div>}
      </div>
    );
  }
};