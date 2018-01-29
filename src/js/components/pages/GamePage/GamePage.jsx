import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { App } from 'js/components/app';
import { GameDashboard } from 'js/components/game';
import { Loader } from 'js/components/other';
import { startGame, setAsSolved, endGame, stopGameLoader } from 'js/actions/game';
import { saveNewResult } from 'js/actions/api';
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

    const { match, gameData, engines, game } = this.props;
    const id = match.params.id;
    const Engine = require(`js/components/engines/${id}/${id}`).default;

    return (
      <Loader isShown={game.isLoading}>
        <div className='GamePage'>
          <GameDashboard
            apiData={gameData}
            engine={engines[id]}
            game={game}
            ref={ref => this.gameDashBoardRef = ref}
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

    const { authStatus, clientUser, gameData, game, gameOptions, engines, dispatch } = this.props;
    
    dispatch(setAsSolved());
    
    if (authStatus === 'connected') {
      dispatch(saveNewResult({
        userId: clientUser.data._id,
        gameId: gameData._id,
        options: { ...gameOptions[game.id] },
        details: {
          moves: engines[game.id].moves,
          seconds: this.gameDashBoardRef.timerRef.state.seconds
        }
      }));
    }
  }
}

export default withRouter(connect(store => ({
  authStatus: store.app.authStatus,
  clientUser: store.api.clientUser,
  engines: store.engines,
  game: store.game,
  gameOptions: store.gameOptions
}))(GamePage));