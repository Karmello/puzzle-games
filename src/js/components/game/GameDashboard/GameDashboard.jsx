import React, { Component } from 'react';
import { Chip } from 'material-ui';

import { Timer } from 'js/components/other';
import './GameDashboard.css';


export default class GameDashboard extends Component {

  render() {

    const { game, gameData } = this.props;

    return (
      <div className='GameDashboard'>
        <div>
          <Chip label={gameData.name} />
        </div>
        <div>
          <Chip label={`Moves: ${game.moves}`} />
        </div>
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