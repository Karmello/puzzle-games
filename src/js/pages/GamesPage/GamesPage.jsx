// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { switchGameCategoryTab, changeGameOptions } from './gamesPageActions';
import GameCategories from './GameCategories/GameCategories';
import GameCard from './GameCard/GameCard';
import './GamesPage.css';

import type { T_GamesPageSettings } from 'js/pages';
import type { T_ApiEntities } from 'js/api';

type Props = {
  dispatch:Function,
  api:T_ApiEntities,
  gamesPage:T_GamesPageSettings,
  gameCategoryToSet:string
};

class GamesPage extends Component<Props, {}> {

  componentWillReceiveProps(nextProps) {
    
    const { api, gamesPage, gameCategoryToSet, dispatch } = nextProps;

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
        >
          {api.gameCategories.res.data.map(categoryData => (
            <div key={categoryData.id}>
              {api.games.res.data.map(gameData => {
                if (gameData.categoryId === categoryData.id) {
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
}

export default connect(store => ({
  gamesPage: store.pages.gamesPage,
  api: store.api
}))(GamesPage);