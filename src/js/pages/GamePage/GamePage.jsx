import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
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

    const { match, queryParams, gameData, dispatch } = this.props;
    const id = match.params.id;
  
    dispatch(setAppTitle(gameData.name));
    if (!isEmpty(queryParams)) { dispatch(changeGameOptions(id, queryParams)); }
    dispatch(startGame(id, queryParams, false));
  }

  componentWillUnmount() {

    const { dispatch } = this.props;

    dispatch(endGame());
    dispatch(setAppTitle('Puzzle Games'));
  }

  render() {

    const { match, game, gameData, clientUser, bestHighscore } = this.props;
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
            <div>
              <GamePageInfo game={game} gameData={gameData} bestHighscore={bestHighscore} />
            </div>
            <div className='GamePage-engine'>
              <div style={this.getEngineContainerStyle(game.isSolved)}>
                <Engine readTimer={() => this.gameDashBoardRef.timerRef.state} />
              </div>
              {game.isSolved && <div className='GamePage-solved'>SOLVED !</div>}
            </div>
          </div>
        </Loader>
      </div>
    );
  }

  getEngineContainerStyle(isSolved) {
    if (isSolved) {
      return {
        opacity: 0.5,
        pointerEvents: 'none'
      }
    } else {
      return {
        opacity: 1,
        pointerEvents: 'initial'
      }
    }
  }
}

export default withRouter(connect(store => ({
  clientUser: store.api.clientUser,
  bestHighscore: store.api.bestHighscore,
  engines: store.engines,
  game: store.game
}))(GamePage));