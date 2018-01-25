import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import { GamePage, GameCard, Loader } from 'js/components';
import { getGames, changeGameOptions } from 'js/actions';


class GamesPage extends Component {

  componentWillMount() {

    if (!this.didFetchGames()) { this.props.dispatch(getGames()); }
  }

  render() {

    const { apiGames, gameList } = this.props;

    if (!this.didFetchGames()) { return <Loader isShown />; }

    return (
      <Switch>
        <Route exact path='/games' render={props => (
          <div>
            {Object.keys(apiGames.data).map(gameId => (
            <GameCard
              key={gameId}
              gameData={apiGames.data[gameId]}
              gameOptions={gameList[gameId].options}
              onGameOptionsChange={this.onGameOptionsChange.bind(this)}
            />))}
          </div>
        )}/>
        <Route exact path='/games/:id' render={props => {
          if (Object.keys(apiGames.data).indexOf(props.match.params.id) === -1) { return <Redirect to='/games' />; }
          return <GamePage/>;
        }} />
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
  gameList: store.gameList,
  page: store.page
}))(GamesPage));