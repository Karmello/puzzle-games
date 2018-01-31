import React, { Component } from 'react';
import { Button } from 'material-ui';

import './ErrorPage.css';


export default class ErrorPage extends Component {

  render() {
    return (
      <div className='ErrorPage'>
        <div>Something went wrong</div>
        <div>
          <Button
            raised
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