// @flow

import React, { Component } from 'react';
import { Chip } from 'material-ui';

import { Timer } from 'js/other';
import './GameDashboard.css';

import type { GameStore } from 'types/store';
import type { GameDashBoardRef } from 'types/other';


type Props = {
  clientUserData:{ username:string },
  game:GameStore
};

export default class GameDashboard extends Component<Props, {}> {

  timerRef:GameDashBoardRef;

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
            ref={ref => { if (ref) { this.timerRef = ref } }}
          />
        </div>
        <div>
          <Chip label={`Moves: ${game.moves}`} style={{ 'minWidth': '90px' }} />
        </div>
      </div>
    );
  }
}