// @flow

import React from 'react';
import { Button } from 'material-ui';

type Props = {
  authStatus:string,
  onClick:Function
};

export default (props:Props) => {

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