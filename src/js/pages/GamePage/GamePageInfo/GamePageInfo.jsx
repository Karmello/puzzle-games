import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';

import { GameBtn } from 'js/game';
import './GamePageInfo.css';


const humanizeHighscoreTime = _seconds => {

  moment.relativeTimeThreshold('s', 60);
  moment.relativeTimeThreshold('ss', 0);
  moment.relativeTimeThreshold('m', 60);

  const duration = moment.duration(_seconds, 'seconds');

  let hours = duration.hours();
  let minutes = duration.minutes();
  let seconds = duration.seconds();

  if (hours) {
    hours = moment.duration(hours, 'hours').humanize();
  }

  if (minutes) {
    minutes = moment.duration(minutes, 'minutes').humanize();
  }

  if (seconds) {
    seconds = moment.duration(seconds, 'seconds').humanize();
    if (seconds == '1 seconds') { seconds = 'a second'; }
  }

  return `${hours ? hours : ''} ${minutes ? minutes : ''} ${seconds ? seconds : ''}`;
}

const renderBestHighscore = props => {

  const res = props.bestHighscore.res;
  const { game, gameData } = props;

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Best score</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {props.bestHighscore.res.status === 200 && props.bestHighscore.res.data &&
        <div className='GamePageInfo-panel-content'>
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

const renderInfo = props => {

  const { gameData } = props;
  
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Info</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className='GamePageInfo-panel-content'>
          <Typography style={{ textAlign: 'justify' }}>{gameData.info}</Typography>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const GamePageInfo = props => {
  return (
    <div className='GamePageInfo'>
      <div>{renderInfo(props)}</div>
      <div>{renderBestHighscore(props)}</div>
    </div>
  );
};

GamePageInfo.propTypes = {
  game: PropTypes.object.isRequired,
  gameData: PropTypes.object.isRequired,
  bestHighscore: PropTypes.object.isRequired
};

export default GamePageInfo;