// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from 'material-ui';

import GameDashboard from 'js/components/game/GameDashboard/GameDashboard';
import GamePageInfo from 'js/components/game/GamePageInfo/GamePageInfo';
import { Loader } from 'js/components';
import { setAppTitle } from 'js/actions/app';
import { startGame, endGame } from 'js/actions/game';
import { toggleExpansionPanel } from 'js/actions/gamePage';
import { kebabToCamelCase } from 'js/helpers';
import './GamePage.css';

import type { T_ApiEntities, T_GameOptionsModel, T_GameSettings, T_GamePageSettings } from 'js/flow-types';

type Props = {
  dispatch: Function,
  match:{ params:{ id:string } },
  queryParams:T_GameOptionsModel,
  api:T_ApiEntities,
  gameData:{ name:string, categoryId:string, info:string },
  gamePage:T_GamePageSettings,
  game:T_GameSettings
};

class GamePage extends Component<Props> {

  gameDashBoardRef:{
    timerRef:{
      state:{ seconds:number }
    }
  };

  componentWillMount() {

    const { match, queryParams, gameData, dispatch } = this.props;
    const id = match.params.id;
  
    dispatch(setAppTitle(gameData.name));
    dispatch(startGame(id, queryParams, false));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(endGame());
    dispatch(setAppTitle('Puzzle Games'));
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
            ref={ref => ref ? this.gameDashBoardRef = ref : null}
          />
        </Paper>
        <Loader isShown={game.isLoading}>
          <div className='GamePage-main'>
            <div>
              <GamePageInfo
                game={game}
                gamePage={gamePage}
                gameData={gameData}
                bestHighscore={bestHighscore}
                onToggleExpansionPanel={this.onToggleExpansionPanel.bind(this)}
              />
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
}

export default withRouter(connect(store => ({
  api: store.api,
  game: store.game,
  gamePage: store.pages.gamePage
}))(GamePage));