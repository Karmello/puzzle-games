import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { GameCategories, GameCard } from 'js/components/game';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';
import './GamesPage.css';


class GamesPage extends Component {

  componentWillReceiveProps(nextProps) {
    
    const { currentGameCategory, gameCategoryToSet, dispatch } = nextProps;

    if (currentGameCategory !== gameCategoryToSet) {
      dispatch(switchGameCategoryTab(gameCategoryToSet));
    }
  } 

  render() {

    const { currentGameCategory, gameOptions, api } = this.props;

    return (
      <div>
        <GameCategories
          category={currentGameCategory}
          gameCategories={api.gameCategories}
        />
        <div className='GamesPage-games'>
          {api.games.data.map(gameData => {
            if (gameData.categoryId === currentGameCategory) {
              return (
                <GameCard
                  key={gameData.id}
                  gameData={gameData}
                  gameOptions={gameOptions[gameData.id]}
                  onGameOptionsChange={this.onGameOptionsChange.bind(this)}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }

  onGameOptionsChange(gameId, options) {

    this.props.dispatch(changeGameOptions(gameId, options));
  }
}

export default withRouter(connect(store => ({
  currentGameCategory: store.pages.gamesPage.category,
  gameOptions: store.pages.gamesPage.options,
  api: store.api
}))(GamesPage));