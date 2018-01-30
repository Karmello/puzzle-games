import React, { Component } from 'react';
import { Tabs } from 'material-ui';
import { Tab } from 'material-ui/Tabs';

import './GameCategories.css';


export default class GameCategories extends Component {

  render() {

    const { category, gameCategories, onSwitchTab } = this.props;

    if (gameCategories.isFetching || gameCategories.status !== 200) { return null; }

    return (
      <div className='GameCategories'>
        <Tabs
          value={category}
          onChange={(e, value) => onSwitchTab(e, value)}
          indicatorColor='primary'
          textColor='primary'
        >
          {gameCategories.data.map(obj => <Tab className='GameCategories-item' key={obj.id} value={obj.id} label={obj.name} />)}
        </Tabs>
      </div>
    );
  }
}