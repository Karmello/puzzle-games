import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs } from 'material-ui';
import { Tab } from 'material-ui/Tabs';


export default class GameCategories extends Component {

  render() {

    const { category, gameCategories } = this.props;

    if (gameCategories.req.isAwaiting || gameCategories.res.status !== 200) { return null; }

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