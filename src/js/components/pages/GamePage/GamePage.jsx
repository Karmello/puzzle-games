import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { App } from 'js/components/app';
import { GameDashboard } from 'js/components/game';
import { Loader } from 'js/components/other';
import { startGame, setAsSolved, endGame, stopGameLoader } from 'js/actions/game';
import './GamePage.css';


class GamePage extends Component {

  componentWillMount() {

    const { match, dispatch, gameOptions } = this.props;
    const id = match.params.id;
    dispatch(startGame(id, gameOptions[id]));
  }

  componentWillUnmount() {

    this.props.dispatch(endGame());
  }

  render() {

    const { match, apiGames, engines, game } = this.props;
    const id = match.params.id;
    const Engine = require(`js/components/engines/${id}/${id}`).default;

    return (
      <Loader isShown={game.isLoading}>
        <div className='GamePage'>
          <GameDashboard
            apiData={apiGames.data[id]}
            engine={engines[id]}
            game={game}
          />
          <div className='GamePage-engine'>
            <Engine
              onFinishInit={this.onFinishInit.bind(this)}
              onBeenSolved={this.onBeenSolved.bind(this)}
            />
          </div>
        </div>
      </Loader>
    );
  }

  onFinishInit() {

    setTimeout(() => { this.props.dispatch(stopGameLoader()); }, App.minLoadTime);
  }
  
  onBeenSolved() {

    this.props.dispatch(setAsSolved());
  }
}

export default withRouter(connect(store => ({
  apiGames: store.api.games,
  engines: store.engines,
  game: store.game,
  gameOptions: store.gameOptions
}))(GamePage));