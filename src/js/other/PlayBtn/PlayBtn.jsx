import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { Button } from 'material-ui';


const PlayBtn = props => (
  <Button
    variant='raised'
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

PlayBtn.propTypes = {
  gameCategory: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  gameOptions: PropTypes.object.isRequired
};

export default PlayBtn;