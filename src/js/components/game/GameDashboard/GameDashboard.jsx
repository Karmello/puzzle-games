// @flow
import * as React from 'react';
import { Chip } from '@material-ui/core';

import Timer from 'js/components/other/Timer/Timer';
import './GameDashboard.css';

import type { T_GameState, T_TimerRef } from 'js/flow-types';

type Props = {
  clientUserData:{ username:string },
  game:T_GameState
};

export default class GameDashboard extends React.Component<Props> {

  timerRef:T_TimerRef;

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
            ref={this.getRef}
          />
        </div>
        <div>
          <Chip label={`Moves: ${game.moves}`} style={{ 'minWidth': '90px' }} />
        </div>
      </div>
    );
  }

  getRef = (ref:T_TimerRef|null) => ref ? this.timerRef = ref : null;
}
