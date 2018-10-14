// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import { isEmpty } from 'lodash';
import { Button } from 'material-ui';

import type { GameOptions } from 'types/store';

type Props = {
  name:string,
  label:string,
  gameCategory:string,
  gameId:string,
  gameOptions:GameOptions
};

const getToObject = props => {
  
  const { name, gameCategory, gameId, gameOptions } = props;
  
  switch (name) {
    case 'play':
      return {
        pathname: `/games/${gameCategory}/${gameId}`,
        search: qs.stringify(gameOptions)
      }
    case 'highscores':
      const to = { pathname: `/highscores/${gameId}`, search: '' };
      if (!isEmpty(gameOptions)) { to.search = `?${qs.stringify(gameOptions)}`; }
      return to;
    default:
      return null;
  }
}

export default (props:Props) => (
  <Button
    variant={props.name === 'play' ? 'raised' : null}
    color='primary'
    component={Link}
    to={getToObject(props)}
  >{props.label}</Button>
);