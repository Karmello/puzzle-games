import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import { Button } from 'material-ui';


const getToObject = props => {
  
  const { name, gameCategory, gameId, gameOptions } = props;
  
  switch (name) {
    case 'play':
      return {
        pathname: `/games/${gameCategory}/${gameId}`,
        search: qs.stringify(gameOptions)
      }
    case 'highscores':
      return {
        pathname: '/highscores',
        search: `?category=${gameCategory}&id=${gameId}&` + qs.stringify(gameOptions)
      }
    default:
      return null;
  }
}

const GameBtn = props => (
  <Button
    variant={props.name === 'play' ? 'raised' : null}
    color='primary'
    component={Link}
    to={getToObject(props)}
  >{props.label}</Button>
);

GameBtn.propTypes = {
  name: PropTypes.oneOf(['play', 'highscores']),
  label: PropTypes.string.isRequired,
  gameCategory: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired,
  gameOptions: PropTypes.object
};

export default GameBtn;