import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { GameCategories, GameCard } from 'js/components/game';
import { Loader } from 'js/components/other';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';
import './GamesPage.css';


class GamesPage extends Component {

  componentWillReceiveProps(nextProps) {
    
    const { category, gamesPage, dispatch } = nextProps;

    if (category !== gamesPage.category) {
      dispatch(switchGameCategoryTab(category));
    }
  } 

  render() {

    const { gamesPage, allGames, gameCategories } = this.props;

    if (!this.didFetchGames()) { return <Loader isShown />; }

    return (
      <div>
        <GameCategories
          category={gamesPage.category}
          gameCategories={gameCategories}
        />
        <div className='GamesPage-games'>
          {allGames.data.map(gameData => {
            if (gameData.categoryId === gamesPage.category) {
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
      </div>
    );
  }

  didFetchGames() {

    const { allGames } = this.props;
    return allGames.status === 200 && !allGames.isFetching;
  }

  onGameOptionsChange(gameId, options) {

    this.props.dispatch(changeGameOptions(gameId, options));
  }
}

export default withRouter(connect(store => ({
  gamesPage: store.pages.gamesPage,
  allGames: store.api.allGames,
  gameCategories: store.api.gameCategories
}))(GamesPage));