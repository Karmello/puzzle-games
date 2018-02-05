import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

import { switchGameCategoryTab, changeGameOptions } from './gamesPage.actions';
import GameCategories from './GameCategories/GameCategories';
import GameCard from './GameCard/GameCard';
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
    
    const { gamesPage, gameCategoryToSet, dispatch } = nextProps;

    if (gamesPage.category !== gameCategoryToSet) {
      dispatch(switchGameCategoryTab(gameCategoryToSet));
    }
  } 

  render() {

    const { gamesPage, api } = this.props;

    return (
      <div className='GamesPage'>
        <GameCategories
          category={gamesPage.category}
          gameCategories={api.gameCategories}
        />
        <SwipeableViews
          className='GamesPage-games'
          axis={'x-reverse'}
          index={this.state.categoryIds.indexOf(gamesPage.category)}
        >
          {api.gameCategories.data.map(categoryData => (
            <div key={categoryData.id}>
              {api.games.data.map(gameData => {
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

    this.props.dispatch(changeGameOptions(gameId, options));
  }
}

export default withRouter(connect(store => ({
  gamesPage: store.pages.gamesPage,
  api: store.api
}))(GamesPage));