// @flow
import React from 'react';
import moment from 'moment';
import { Typography, ExpansionPanel,  ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

import { GameBtn } from 'js/components';
import { humanizeHighscoreTime } from 'js/extracts/gameInfo';
import './GameInfo.css';

import type { T_GamePageState, T_GameState, T_ApiEndPoint } from 'js/flow-types';

type Props = {
  game:T_GameState,
  gameData:{ categoryId:string, info:string },
  gamePage:T_GamePageState,
  bestHighscore:T_ApiEndPoint,
  onToggleExpansionPanel:Function
};

const onChange = props => (e, expanded) => props.onToggleExpansionPanel('bestScore', expanded);

const renderBestHighscore = (props:Props) => {

  const res = props.bestHighscore.res;
  const { game, gameData, gamePage } = props;

  return (
    <ExpansionPanel
      expanded={gamePage.bestScoreExpanded}
      onChange={onChange(props)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Best score</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {props.bestHighscore.res.status === 200 && props.bestHighscore.res.data &&
        <div className='GameInfo-panel-content'>
          <Typography>
            <span>{`${humanizeHighscoreTime(res.data.details.seconds)} and ${res.data.details.moves} moves by `}</span>
            <span style={{ fontWeight: 'bold' }}>{`${res.data.username}`}</span>
            <span>{` (${moment(res.data.date).fromNow()})`}</span>
          </Typography>
          <br/>
          <div style={{ textAlign: 'right' }}>
            {game.id && <GameBtn
              name='highscores'
              label='See all highscores'
              gameCategory={gameData.categoryId}
              gameId={game.id}
              gameOptions={game.options}
            />}
          </div>
        </div>}
        {props.bestHighscore.res.status === 204 && <Typography>Nothing to show</Typography>}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const renderInfo = (props:Props) => {

  const { gameData, gamePage } = props;
  
  return (
    <ExpansionPanel
      expanded={gamePage.infoExpanded}
      onChange={(e, expanded) => props.onToggleExpansionPanel('info', expanded)}
    >
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Info</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className='GameInfo-panel-content'>
          <Typography style={{ textAlign: 'justify' }}>{gameData.info}</Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default (props:Props) => {
  return (
    <div className='GameInfo'>
      <div>{renderInfo(props)}</div>
      <div>{renderBestHighscore(props)}</div>
    </div>
  );
};