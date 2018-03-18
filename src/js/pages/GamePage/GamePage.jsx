import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from 'material-ui';

import { Loader } from 'js/other';
import GameDashboard from './GameDashboard/GameDashboard';
import { setAppTitle } from 'js/app/app.actions';
import { startGame, endGame } from 'js/game/game.actions';
import { changeGameOptions } from 'js/pages/GamesPage/gamesPage.actions';
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
    const Engine = require(`js/engines/${id}/${id}`).default;

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
            <div style={{ pointerEvents: game.isSolved ? 'none' : 'initial' }}>
              <Engine
                restarting={this.state.restarting}
                readTimer={() => this.gameDashBoardRef.timerRef.state}
              />
            </div>
          </div>
        </Loader>
      </div>
    );
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
  engines: store.engines,
  game: store.game
}))(GamePage));