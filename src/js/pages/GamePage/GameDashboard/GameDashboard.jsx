import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

import { Timer } from 'js/other';
import GameMenu from './GameMenu/GameMenu';
import './GameDashboard.css';


class GameDashboard extends Component {

  render() {

    const { gameData, game, mode, onMenuItemClick } = this.props;

    return (
      <div className='GameDashboard'>
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

GameDashboard.propTypes = {
  gameData: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  mode: PropTypes.string,
  onMenuItemClick: PropTypes.func
};

export default GameDashboard;