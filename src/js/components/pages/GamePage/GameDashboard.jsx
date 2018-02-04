import React, { Component } from 'react';
import { Chip } from 'material-ui';

import { Timer } from 'js/components/other';
import GameMenu from './GameMenu';

export default class GameDashboard extends Component {

  render() {

    const { gameData, game, mode, onMenuItemClick } = this.props;

    return (
      <div className='GamePage-dashboard'>
        <div>
          <div>
            <Timer
              on={!game.isLoading && !game.isSolved}
              paused={game.isSolved}
              ref={ref => this.timerRef = ref}
            />
          </div>
          <div>
            <Chip label={`Moves: ${game.moves}`} style={{ 'minWidth': '90px' }} />
          </div>
        </div>
        <div>
          <GameMenu
            gameCategory={gameData.categoryId}
            onItemClick={(itemId) => { onMenuItemClick(itemId); }}
            showRestartBtn={gameData.id === 'BossPuzzle' && mode ==='IMG'}
          />
        </div>
      </div>
    );
  }
}