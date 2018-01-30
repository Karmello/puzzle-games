import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GamePage } from 'js/components/pages';
import { GameCategories, GameCard } from 'js/components/game';
import { Loader } from 'js/components/other';
import { switchGameCategoryTab } from 'js/actions/gamesPage';
import { changeGameOptions } from 'js/actions/gameOptions';
import './GamesPage.css';


class GamesPage extends Component {

  render() {

    const { gamesPage, allGames, gameCategories, gameOptions } = this.props;

    if (!this.didFetchGames()) { return <Loader isShown />; }

    return (
      <Switch>
        <Route exact path='/games' render={props => (
          <div>
            <GameCategories
              category={gamesPage.category}
              gameCategories={gameCategories}
              onSwitchTab={this.onSwitchCategoryTab.bind(this)}
            />
            <div className='GamesPage-games'>
              {allGames.data.map(gameData => {
                if (gameData.categoryId === gamesPage.category) {
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
        )}/>
        <Route exact path='/games/:id' render={props => {
          const gameData = allGames.data.find(elem => elem.id === props.match.params.id);
          if (!gameData) { return <Redirect to='/games' />; }
          return <GamePage gameData={gameData} />;
        }}/>
      </Switch>
    );
  }

  didFetchGames() {

    const { allGames } = this.props;
    return allGames.status === 200 && !allGames.isFetching;
  }

  onSwitchCategoryTab(e, value) {

    this.props.dispatch(switchGameCategoryTab(value));
  }

  onGameOptionsChange(gameId, options) {

    this.props.dispatch(changeGameOptions(gameId, options));
  }
}

export default withRouter(connect(store => ({
  gamesPage: store.pages.gamesPage,
  allGames: store.api.allGames,
  gameCategories: store.api.gameCategories,
  gameOptions: store.gameOptions
}))(GamesPage));