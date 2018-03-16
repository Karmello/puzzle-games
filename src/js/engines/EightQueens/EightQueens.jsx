import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './EightQueens.css';


class EightQueens extends Component {

  componentDidMount() {
    this.props.onFinishInit();
  }

  render() {
    return (
      <div className='EightQueens'>Eight Queens</div>
    );
  }
}

EightQueens.propTypes = {
  onFinishInit: PropTypes.func.isRequired,
  onMakeMove: PropTypes.func.isRequired,
  onBeenSolved: PropTypes.func.isRequired,
  restarting: PropTypes.bool.isRequired
};

export default connect(store => ({
  game: store.pages.gamePage,
  eightQueensEngine: store.engines.EightQueens
}))(EightQueens);