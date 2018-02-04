import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from 'material-ui';

import { App } from 'js/components/app';
import { Loader } from 'js/components/other';
import { startGame, setAsSolved, makeMove, endGame, stopGameLoader } from 'js/actions/game';
import { changeGameOptions } from 'js/actions/gamesPage';
import { setAppTitle } from 'js/actions/app';
import { saveNewResult } from 'js/actions/api';
import GameDashboard from './GameDashboard/GameDashboard';
import './GamePage.css';


class GamePage extends Component {

  state = { restarting: false }

  componentWillMount() {

    const { queryParams, match, gameData, dispatch } = this.props;
    const id = match.params.id;

    dispatch(setAppTitle(gameData.name));
    dispatch(changeGameOptions(id, queryParams));
    dispatch(startGame(id, queryParams));
  }

  componentWillUnmount() {

    const { dispatch } = this.props;

    this.setState({ restarting: false });
    dispatch(endGame());
    dispatch(setAppTitle('Puzzle Games'));
  }

  render() {

    const { match, game, gameData, queryParams } = this.props;
    const id = match.params.id;
    const Engine = require(`./engines/${id}/${id}`).default;

    return (
      <div className='GamePage'>
        <Paper>
          <GameDashboard
            gameData={gameData}
            game={game}
            mode={queryParams.mode}
            onMenuItemClick={this.onMenuItemClick.bind(this)}
            ref={ref => this.gameDashBoardRef = ref}
          />
        </Paper>
        <Loader isShown={game.isLoading}>
          <div className='GamePage-engine'>
            <div>
              <Engine
                onFinishInit={this.onFinishInit.bind(this)}
                onMakeMove={this.onMakeMove.bind(this)}
                onBeenSolved={this.onBeenSolved.bind(this)}
                restarting={this.state.restarting}
              />
            </div>
          </div>
        </Loader>
      </div>
    );
  }

  onFinishInit() {

    setTimeout(() => { this.props.dispatch(stopGameLoader()); }, App.minLoadTime);
  }
  
  onMakeMove() {

    this.props.dispatch(makeMove());
  }

  onBeenSolved() {

    const { authStatus, clientUser, gameData, game, gameOptions, dispatch } = this.props;
    
    dispatch(setAsSolved());
    
    if (authStatus === 'connected') {
      dispatch(saveNewResult({
        userId: clientUser.data._id,
        gameId: gameData._id,
        options: { ...gameOptions[game.id] },
        details: {
          moves: game.moves,
          seconds: this.gameDashBoardRef.timerRef.state.seconds
        }
      }));
    }
  }

  onMenuItemClick(itemId) {

    const { dispatch, game } = this.props;

    switch (itemId) {
      
      case 'NEW':
        this.setState({ restarting: false });
        break;

      case 'RESTART':
        this.setState({ restarting: true });
        break;
  
      default:
        break;
    }

    dispatch(startGame(game.id));
  }
}

export default withRouter(connect(store => ({
  authStatus: store.app.authStatus,
  clientUser: store.api.clientUser,
  engines: store.engines,
  game: store.game,
  gameOptions: store.pages.gamesPage.options
}))(GamePage));