// @flow
import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import './PageError.css';

export default class PageError extends Component<{}> {

  render() {
    return (
      <div className='PageError'>
        <div>Something went wrong</div>
        <div>
          <Button
            onClick={this.onReloadClick.bind(this)}
          >Reload</Button>
        </div>
      </div>
    );
  }

  onReloadClick() {
    setTimeout(() => { window.location.reload(); }, 300);
  }
}
