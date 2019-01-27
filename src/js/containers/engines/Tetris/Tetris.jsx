// @flow
import React from 'react';
import { connect } from 'react-redux';

// import { GridBoard } from 'js/containers';
import { Game } from 'js/components';

class Tetris extends Game {

  componentWillUnmount() {
    // this.props.dispatch(resetEngine());
  }

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return null;
  }

  renderElement(values) {
    return props => {
      return (
        <div style={props.style}>x</div>
      );
    }
  }

  getElementStyle({ col, row, size }) {
    const style = {};
    return style;
  }

  startNew = () => {
    return new Promise(resolve => {
      resolve();
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  tetrisEngine: store.engines['tetris']
}))(Tetris);