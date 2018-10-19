// @flow
import React from 'react';
import { connect } from 'react-redux';

import { Game } from 'js/game';

class KnightsTour extends Game {

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return (
      <div>Knight's Tour game</div>
    );
  }

  startNew = () => {
    return new Promise(resolve => {
      resolve();
    });
  }

  checkIfSolved = () => {
    return new Promise(resolve => {
      resolve(false);
    });
  }
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game
}))(KnightsTour);