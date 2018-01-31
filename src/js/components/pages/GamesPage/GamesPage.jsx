import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { GameCategories, GameCard } from 'js/components/game';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';
import './GamesPage.css';


class GamesPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = { categoryIds: [] };
  }

  componentWillMount() {

    const { api } = this.props;
    const categoryIds = [];

    for (const categoryData of api.gameCategories.data) { categoryIds.push(categoryData.id); }
    this.setState({ categoryIds });
  }

  componentWillReceiveProps(nextProps) {
    
    const { currentGameCategory, gameCategoryToSet, dispatch } = nextProps;

    if (currentGameCategory !== gameCategoryToSet) {
      dispatch(switchGameCategoryTab(gameCategoryToSet));
    }
  } 

  render() {

    const { currentGameCategory, gameOptions, api } = this.props;

    return (
      <div className='GamesPage'>
        <GameCategories
          category={currentGameCategory}
          gameCategories={api.gameCategories}
        />
        <SwipeableViews
          className='GamesPage-games'
          axis={'x-reverse'}
          index={this.state.categoryIds.indexOf(currentGameCategory)}
        >
          {api.gameCategories.data.map(categoryData => (
            <div key={categoryData.id}>
              {api.games.data.map(gameData => {
                if (gameData.categoryId === categoryData.id) {
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
          ))}
        </SwipeableViews>
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