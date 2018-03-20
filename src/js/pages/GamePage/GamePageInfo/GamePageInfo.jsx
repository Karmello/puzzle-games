import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ExpansionPanel, { ExpansionPanelSummary, ExpansionPanelDetails } from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Typography from 'material-ui/Typography';

import './GamePageInfo.css';


const renderBestHighscore = res => {
  if (res.status === 200 && res.data) {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Best score</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            <div>
              <span>{`${humanizeHighscoreTime(res.data.details.seconds)} and ${res.data.details.moves} moves by `}</span>
              <span style={{ fontWeight: 'bold' }}>{`${res.data.username}`}</span>
            </div>
            <div>{`(${moment(res.data.date).fromNow()})`}</div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
  return null;
}

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
    if (hours == 'an hour') { hours = '1 hour'; }
  }

  if (minutes) {
    minutes = moment.duration(minutes, 'minutes').humanize();
    if (minutes == 'a minute') { minutes = '1 minute'; }
  }

  if (seconds) {
    seconds = moment.duration(seconds, 'seconds').humanize();
    if (seconds == '1 seconds') { seconds = '1 second'; }
  }

  return `${hours ? hours : ''} ${minutes ? minutes : ''} ${seconds ? seconds : ''}`;
}

const GamePageInfo = props => {
  const { bestHighscore } = props;
  return (
    <div className='GamePageInfo'>
      {renderBestHighscore(bestHighscore.res)}
    </div>
  );
};

GamePageInfo.propTypes = {
  bestHighscore: PropTypes.object.isRequired
};

export default GamePageInfo;