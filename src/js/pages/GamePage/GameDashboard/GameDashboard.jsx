import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chip } from 'material-ui';

import { Timer } from 'js/other';
import './GameDashboard.css';


class GameDashboard extends Component {

  render() {
    const { clientUserData, game } = this.props;
    return (
      <div className='GameDashboard'>
        <div>
          <Chip label={`Player: ${clientUserData.username}`} style={{ 'minWidth': '90px' }} />
        </div>
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
    );
  }
}

GameDashboard.propTypes = {
  clientUserData: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired
};

export default GameDashboard;