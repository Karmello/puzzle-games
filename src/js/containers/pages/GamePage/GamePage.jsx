// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';

import GameDashboard from 'js/components/game/GameDashboard/GameDashboard';
import GameInfo from 'js/components/game/GameInfo/GameInfo';
import Loader from 'js/components/other/Loader/Loader';
import { fetchHighscore, saveNewHighscore } from 'js/actions/api';
import { setAppTitle } from 'js/actions/app';
import { startGame, endGame } from 'js/actions/game';
import { toggleExpansionPanel } from 'js/actions/gamePage';
import { kebabToCamelCase } from 'js/helpers/methods';
import { C_AppTitle } from 'js/constants';
import './GamePage.css';

import type { T_ApiEntities, T_GameOptionsModel, T_GameState, T_GamePageState, T_TimerRef } from 'js/flow-types';

type Props = {
  dispatch: Function,
  match:{ params:{ id:string } },
  queryParams:T_GameOptionsModel,
  api:T_ApiEntities,
  gameData:{ name:string, categoryId:string, info:string },
  gamePage:T_GamePageState,
  game:T_GameState
};

class GamePage extends Component<Props> {

  gameDashBoardRef:{
    timerRef:T_TimerRef
  };

  static getEngineContainerStyle(isSolved) {
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

  componentWillMount() {

    const { match, queryParams, gameData, dispatch } = this.props;
    const id = match.params.id;
  
    dispatch(fetchHighscore(id, queryParams));
    dispatch(setAppTitle(gameData.name));
    dispatch(startGame(id, queryParams, false));
  }

  componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    if (!this.props.game.isSolved && game.isSolved) {
      const {api, dispatch} = this.props;
      dispatch(saveNewHighscore({
        username: api.clientUser.res.data.username,
        gameId: game.id,
        options: game.options,
        details: {moves: game.moves, seconds: this.readTimer().seconds}
      })).then(action => {
        /* istanbul ignore next */
        action.payload.status === 200 && (() => {
          dispatch(fetchHighscore(game.id, game.options));
        })();
      });
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(endGame());
    dispatch(setAppTitle(C_AppTitle));
  }

  render() {

    const { match, game, gameData, gamePage } = this.props;
    const { clientUser, bestHighscore } = this.props.api;

    const id = kebabToCamelCase(match.params.id);
    const Engine = require(`js/containers/engines/${id}/${id}`).default;

    return (
      <div className='GamePage'>
        <Paper>
          <GameDashboard
            clientUserData={clientUser.res.data}
            game={game}
            ref={this.getGameDashboardRef}
          />
        </Paper>
        <Loader isShown={game.isLoading}>
          <div className='GamePage-main'>
            <div>
              <GameInfo
                game={game}
                gamePage={gamePage}
                gameData={gameData}
                bestHighscore={bestHighscore}
                onToggleExpansionPanel={this.onToggleExpansionPanel.bind(this)}
              />
            </div>
            <div className='GamePage-engine'>
              <div style={GamePage.getEngineContainerStyle(game.isSolved)}>
                <Engine />
              </div>
              {game.isSolved && <div className='GamePage-solved'>SOLVED !</div>}
            </div>
          </div>
        </Loader>
      </div>
    );
  }

  onToggleExpansionPanel(name, expanded) {
    const { dispatch, api } = this.props;
    let ui = localStorage.getItem('ui');
    if (ui) {
      ui = JSON.parse(ui);
      ui[api.clientUser.res.data.username].gamePage[`${name}Expanded`] = expanded;
      localStorage.setItem('ui', JSON.stringify(ui));
      dispatch(toggleExpansionPanel(name, expanded));
    }
  }

  readTimer = () => this.gameDashBoardRef.timerRef.state;
  getGameDashboardRef = ref => ref ? this.gameDashBoardRef = ref : null;
}

export default withRouter(connect(store => ({
  api: store.api,
  game: store.game,
  gamePage: store.pages.gamePage
}))(GamePage));
