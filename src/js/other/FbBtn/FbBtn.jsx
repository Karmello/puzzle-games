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

  if (props.authStatus !== 'logged_in') {
    return (
      <Button
        variant='raised'
        color='primary'
        onClick={props.onClick}
      >{getLabel()}</Button>
    );
  }

  return null;
};

FbBtn.propTypes = {
  authStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default FbBtn;