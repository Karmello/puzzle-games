import moment from 'moment';

export const humanizeHighscoreTime = _seconds => {

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