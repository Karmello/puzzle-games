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

    switch (this.props.authStatus) {
      case 'unknown': return 'Login with Facebook';
      case 'not_authorized': return 'Continue with Facebook';
      default: return '';
    }
  }

  onClick() {

    const { authStatus, onDoneTryLogin } = this.props;

    if (authStatus !== 'connected') {
      window.FB.login(res => onDoneTryLogin(res), { scope: 'public_profile' });
    }
  }
}