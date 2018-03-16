import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'material-ui';

import { GridGameBoard } from 'js/other';


class EightQueens extends Component {

  componentDidMount() {
    this.props.onFinishInit();
  }

  render() {
    return (
      <GridGameBoard
        dimension={8}
        squareSize={75}
        square={<Button style={{ minWidth: '75px', height: '75px' }}>hi</Button>}
      />
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