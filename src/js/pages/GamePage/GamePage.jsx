import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from 'material-ui';

import GameDashboard from './GameDashboard/GameDashboard';
import GamePageInfo from './GamePageInfo/GamePageInfo';
import { Loader } from 'js/other';
import { setAppTitle } from 'js/app/app.actions';
import { startGame, endGame } from 'js/game/game.actions';
import { changeGameOptions } from 'js/pages/GamesPage/gamesPage.actions';
import './GamePage.css';


class GamePage extends Component {

  componentWillMount() {

    const { queryParams, match, gameData, dispatch } = this.props;
    const id = match.params.id;

    dispatch(setAppTitle(gameData.name));
    dispatch(changeGameOptions(id, queryParams));
    dispatch(startGame(id, queryParams, false));
  }

  componentWillUnmount() {

    const { dispatch } = this.props;

    dispatch(endGame());
    dispatch(setAppTitle('Puzzle Games'));
  }

  render() {

    const { match, game, clientUser } = this.props;
    const id = match.params.id;
    const Engine = require(`js/engines/${id}/${id}`).default;

    return (
      <div className='GamePage'>
        <Paper>
          <GameDashboard
            clientUserData={clientUser.res.data}
            game={game}
            ref={ref => this.gameDashBoardRef = ref}
          />
        </Paper>
        <Loader isShown={game.isLoading}>
          <div className='GamePage-main'>
            <div className='GamePage-engine'>
              <div style={{ pointerEvents: game.isSolved ? 'none' : 'initial' }}>
                <Engine readTimer={() => this.gameDashBoardRef.timerRef.state} />
              </div>
            </div>
            <div>
              <GamePageInfo />
            </div>
          </div>
        </Loader>
      </div>
    );
  }
}

export default withRouter(connect(store => ({
  clientUser: store.api.clientUser,
  engines: store.engines,
  game: store.game
}))(GamePage));