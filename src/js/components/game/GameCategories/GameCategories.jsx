// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';

import type { T_ApiEndPoint } from 'js/flow-types';

type Props = {
  category:string,
  gameCategories:T_ApiEndPoint
};

export default class GameCategories extends Component<Props> {

  render() {

    const { category, gameCategories } = this.props;

    return (
      <div>
        <Tabs
          value={category}
          indicatorColor='primary'
          textColor='primary'
        >
          {gameCategories.res.data.map(obj =>
            <Tab
              key={obj.id}
              value={obj.id}
              label={obj.name}
              component={Link}
              to={`/games/${obj.id}`}
            />
          )}
        </Tabs>
      </div>
    );
  }
}
