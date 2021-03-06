// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import GameCategories from 'js/components/game/GameCategories/GameCategories';
import GameCard from 'js/components/game/GameCard/GameCard';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';
import './GamesPage.css';

import type { T_GamesPageState, T_ApiEntities } from 'js/flow-types';

type Props = {
  dispatch:Function,
  history:{ push:Function },
  api:T_ApiEntities,
  gamesPage:T_GamesPageState,
  gameCategoryToSet:string
};

class GamesPage extends Component<Props> {

  componentWillReceiveProps(nextProps) {

    const {api, gamesPage, gameCategoryToSet, dispatch} = nextProps;

    if (gamesPage.category !== gameCategoryToSet) {
      let ui = localStorage.getItem('ui');
      if (ui) {
        ui = JSON.parse(ui);
        ui[api.clientUser.res.data.username].gamesPage.category = gameCategoryToSet;
        localStorage.setItem('ui', JSON.stringify(ui));
        dispatch(switchGameCategoryTab(gameCategoryToSet));
      }
    }
  }

  render() {

    const { gamesPage, gameCategoryToSet, api } = this.props;

    return (
      <div className='GamesPage'>
        <GameCategories
          category={gameCategoryToSet}
          gameCategories={api.gameCategories}
        />
        <SwipeableViews
          className='GamesPage-games'
          axis={'x'}
          index={api.gameCategories.res.data.findIndex(elem => elem.id === gameCategoryToSet)}
          onChangeIndex={this.onSwipe.bind(this)}
        >
          {api.gameCategories.res.data.map(categoryData => (
            <div className='GamesPage-category-games' key={categoryData.id}>
              {api.games.res.data.map(gameData => {
                if (gameData.categoryId === categoryData.id || categoryData.id === 'all') {
                  return (
                    <GameCard
                      key={gameData.id}
                      gameData={gameData}
                      gameOptions={gamesPage.options[gameData.id]}
                      onGameOptionsChange={this.onGameOptionsChange.bind(this)}
                    />
                  );
                }
                return null;
              })}
            </div>
          ))}
        </SwipeableViews>
      </div>
    );
  }

  onGameOptionsChange(gameId, options) {
    const { dispatch, api } = this.props;
    let ui = localStorage.getItem('ui');
    if (ui) {
      ui = JSON.parse(ui);
      ui[api.clientUser.res.data.username].gamesPage.options[gameId] = options;
      localStorage.setItem('ui', JSON.stringify(ui));
      dispatch(changeGameOptions(gameId, options));
    }
  }

  onSwipe(index) {
    const { api, history } = this.props;
    setTimeout(() => history.push(`/games/${api.gameCategories.res.data[index].id}`), 300);
  }
}

export default withRouter(connect(store => ({
  gamesPage: store.pages.gamesPage,
  api: store.api
}))(GamesPage));
