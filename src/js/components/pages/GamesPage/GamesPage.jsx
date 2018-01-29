import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GamePage } from 'js/components/pages';
import { GameCard } from 'js/components/game';
import { Loader } from 'js/components/other';
import { fetchAllGames } from 'js/actions/api';
import { changeGameOptions } from 'js/actions/gameOptions';
import './GamesPage.css';


class GamesPage extends Component {

  componentDidMount() {

    if (!this.didFetchGames()) { this.props.dispatch(fetchAllGames()); }
  }

  render() {

    const { allGames, gameOptions } = this.props;

    if (!this.didFetchGames()) { return <Loader isShown />; }

    return (
      <Switch>
        <Route exact path='/games' render={props => (
          <div className='GamesPage-games'>
            {allGames.data.map(gameData => (
            <GameCard
              key={gameData.id}
              gameData={gameData}
              gameOptions={gameOptions[gameData.id]}
              onGameOptionsChange={this.onGameOptionsChange.bind(this)}
            />))}
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
    return allGames.status === 200 && allGames.data;
  }

  onGameOptionsChange(gameId, options) {

    this.props.dispatch(changeGameOptions(gameId, options));
  }
}

export default withRouter(connect(store => ({
  allGames: store.api.allGames,
  gameOptions: store.gameOptions
}))(GamesPage));