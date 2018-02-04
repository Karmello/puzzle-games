import React from 'react';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import { Button } from 'material-ui';


export default (props) => (
  <Button
    raised
    color='primary'
    component={Link}
    to={{
      pathname: `/games/${props.gameCategory}/${props.gameId}`,
      search: qs.stringify(props.gameOptions)
    }}
  >
    Play
  </Button>
);