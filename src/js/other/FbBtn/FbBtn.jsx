import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';


const FbBtn = props => {

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

FbBtn.propTypes = {
  authStatus: PropTypes.string.isRequired,
  onDoneTryLogin: PropTypes.func.isRequired
};

export default FbBtn;