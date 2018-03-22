import React, { Component } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';

import { switchGameCategoryTab, changeGameOptions } from './gamesPage.actions';
import GameCategories from './GameCategories/GameCategories';
import GameCard from './GameCard/GameCard';
import './GamesPage.css';


class GamesPage extends Component {

  componentWillReceiveProps(nextProps) {
    
    const { api, gamesPage, gameCategoryToSet, dispatch } = nextProps;

    if (gamesPage.category !== gameCategoryToSet) {
      const ui = JSON.parse(localStorage.getItem('ui'));
      ui[api.clientUser.res.data.username].gamesPage.category = gameCategoryToSet;
      localStorage.setItem('ui', JSON.stringify(ui));
      dispatch(switchGameCategoryTab(gameCategoryToSet));
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
    const ui = JSON.parse(localStorage.getItem('ui'));
    ui[api.clientUser.res.data.username].gamesPage.options[gameId] = options;
    localStorage.setItem('ui', JSON.stringify(ui));
    dispatch(changeGameOptions(gameId, options));
  }
}

export default connect(store => ({
  gamesPage: store.pages.gamesPage,
  api: store.api
}))(GamesPage);