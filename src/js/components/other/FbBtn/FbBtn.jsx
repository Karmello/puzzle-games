import React, { Component } from 'react';
import { Button } from 'material-ui';


export default class FbBtn extends Component {

  render() {

    return (
      <Button
        raised
        color='primary'
        onClick={this.onClick.bind(this)}
      >{this.getLabel()}</Button>
    );
  }

  getLabel() {

    switch (this.props.app.authStatus) {
      case 'unknown': return 'Login with Facebook';
      case 'not_authorized': return 'Continue with Facebook';
      default: return '';
    }
  }

  onClick() {

    const { app, setAuthStatus } = this.props;

    if (app.authStatus !== 'connected') {
      window.FB.login(res => setAuthStatus(res.status), { scope: 'public_profile' });
    }
  }
}