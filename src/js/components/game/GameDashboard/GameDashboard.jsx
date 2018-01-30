import React, { Component } from 'react';
import { Chip } from 'material-ui';

import { Timer } from 'js/components/other';
import './GameDashboard.css';


export default class GameDashboard extends Component {

  render() {

    const { game, engine, gameData } = this.props;

    return (
      <div className='GameDashboard'>
        <div>
          <Chip label={gameData.name} />
        </div>
        {engine && engine.moves !== undefined && <div>
          <Chip label={`Moves: ${engine.moves}`} />
        </div>}
        <div>
          <Timer
            on={!game.isLoading && !game.isSolved}
            paused={game.isSolved}
            ref={ref => this.timerRef = ref}
          />
        </div>
        {game.isSolved && <div><Chip label='SOLVED' /></div>}
      </div>
    );
  }
}