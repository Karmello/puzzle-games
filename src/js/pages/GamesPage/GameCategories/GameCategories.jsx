import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Tabs } from 'material-ui';
import { Tab } from 'material-ui/Tabs';


class GameCategories extends Component {

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

GameCategories.propTypes = {
  category: PropTypes.string.isRequired,
  gameCategories: PropTypes.object.isRequired
};

export default GameCategories;