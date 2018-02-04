import React from 'react';
import { Button } from 'material-ui';


export default (props) => {

  const getLabel = () => {

    switch (props.authStatus) {
      case 'unknown': return 'Login with Facebook';
      case 'not_authorized': return 'Continue with Facebook';
      default: return '';
    }
  }

  const onClick = () => {

    if (props.authStatus !== 'connected') {
      window.FB.login(res => props.onDoneTryLogin(res), { scope: 'public_profile' });
    }
  }

  return (<Button raised color='primary' onClick={onClick}>{getLabel()}</Button>);
};