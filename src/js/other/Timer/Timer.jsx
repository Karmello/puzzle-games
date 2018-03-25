import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Chip } from 'material-ui';


class Timer extends Component {

  state = { seconds: 0 }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.on) {
      this.start();

    } else if (nextProps.paused) {
      this.stop();

    } else {
      this.reset();
    }
  }

  componentWillUnmount() {
    this.reset();
  }

  render() {
    return (
      <Chip label={'Time: ' + this.formatTime()} />
    );
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1 });
      }, 1000);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  clear() {
    this.setState({ seconds: 0 });
  }

  reset() {
    this.stop();
    this.clear();
  }

  formatTime() {
    return moment.utc(this.state.seconds * 1000).format('HH:mm:ss');
  }
}

Timer.propTypes = {
  on: PropTypes.bool.isRequired,
  paused: PropTypes.bool
};

export default Timer;