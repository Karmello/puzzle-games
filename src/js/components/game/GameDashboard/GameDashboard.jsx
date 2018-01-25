import React, { Component } from 'react';
import { Chip } from 'material-ui';

import { Timer } from 'js/components';
import './GameDashboard.css';


export default class GameDashboard extends Component {

  render() {

    const { apiData, engine, game } = this.props;

    return (
      <div className='GameDashboard'>
        <div><Chip label={apiData.name} /></div>
        <div><Chip label={'Moves: ' + engine.moves} /></div>
        <div><Timer on={!game.isLoading && !game.isSolved} paused={game.isSolved} /></div>
        {game.isSolved && <div><Chip label='SOLVED' /></div>}
      </div>
    );
  }
}