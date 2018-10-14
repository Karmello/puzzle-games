// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from 'material-ui';
import { Tab } from 'material-ui/Tabs';


type Props = {
  category:string,
  gameCategories:any
};

export default class GameCategories extends Component<Props, {}> {

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