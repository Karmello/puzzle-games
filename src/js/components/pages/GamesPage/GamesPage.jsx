import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GamePage } from 'js/components/pages';
import { GameCard } from 'js/components/game';
import { Loader } from 'js/components/other';
import { getGames } from 'js/actions/api';
import { changeGameOptions } from 'js/actions/gameOptions';


class GamesPage extends Component {

  componentDidMount() {

    if (!this.didFetchGames()) { this.props.dispatch(getGames()); }
  }

  render() {

    const { apiGames, gameOptions } = this.props;

    if (!this.didFetchGames()) { return <Loader isShown />; }

    return (
      <Switch>
        <Route exact path='/games' render={props => (
          <div>
            {Object.keys(apiGames.data).map(gameId => (
            <GameCard
              key={gameId}
              gameData={apiGames.data[gameId]}
              gameOptions={gameOptions[gameId]}
              onGameOptionsChange={this.onGameOptionsChange.bind(this)}
            />))}
          </div>
        )}/>
        <Route exact path='/games/:id' render={props => {
          if (Object.keys(apiGames.data).indexOf(props.match.params.id) === -1) { return <Redirect to='/games' />; }
          return <GamePage/>;
        }}/>
      </Switch>
    );
  }

  didFetchGames() {

    const { apiGames } = this.props;
    return apiGames.status === 200 && apiGames.data;
  }

  onGameOptionsChange(gameId, options) {

    this.props.dispatch(changeGameOptions(gameId, options));
  }
}

export default withRouter(connect(store => ({
  apiGames: store.api.games,
  gameOptions: store.gameOptions
}))(GamesPage));