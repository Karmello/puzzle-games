import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer } from 'js/app';
import { PageError } from 'js/other';
import {
  CLIENT_USER_ACTION, FETCH_GAMES, FETCH_GAME_CATEGORIES, FETCH_HIGHSCORES, FETCH_HIGHSCORE, SAVE_NEW_HIGHSCORE,
  FETCH_USERS, fetchGames, fetchGameCategories
} from 'js/api/api.actions';
import { apiRequestClear } from 'js/api/api.actionCreators';
import { toggleAppLoader } from 'js/app/app.actions';
import { clearPageConfig } from 'js/pages/page.actionCreators';
import { switchGameCategoryTab, changeGameOptions } from 'js/pages/GamesPage/gamesPage.actions';
import { toggleExpansionPanel } from 'js/pages/GamePage/gamePage.actions';
import { getUiConfig } from 'js/localStorage';
import { validateGameParams } from 'js/pages/page.methods';
import * as rootPageMethods from 'js/pages/RootPage/RootPage.methods';


class RootPage extends Component {
  
  constructor(props) {
    super(props);
    this.validateGameParams = validateGameParams.bind(this);
    for (const key in rootPageMethods) { this[key] = rootPageMethods[key].bind(this); }
  }

  componentDidMount() {
    
    const { dispatch, api, app } = this.props;

    if (app.authStatus === 'logged_in') {

      const username = api.clientUser.res.data.username;

      Promise.all([
        dispatch(fetchGames()),
        dispatch(fetchGameCategories())
      ]).then(() => {
        getUiConfig(username, ui => {
          dispatch(toggleAppLoader(false));
          dispatch(switchGameCategoryTab(ui[username].gamesPage.category));
          for (const gameId in ui[username].gamesPage.options) {
            dispatch(changeGameOptions(gameId, ui[username].gamesPage.options[gameId]));
          }
          dispatch(toggleExpansionPanel('info', ui[username].gamePage.infoExpanded));
          dispatch(toggleExpansionPanel('bestScore', ui[username].gamePage.bestScoreExpanded));
        });
      });
    }
  }

  componentWillUnmount() {

    const { dispatch } = this.props;
    
    dispatch(apiRequestClear(CLIENT_USER_ACTION));
    dispatch(apiRequestClear(FETCH_GAMES));
    dispatch(apiRequestClear(FETCH_GAME_CATEGORIES));
    dispatch(apiRequestClear(FETCH_HIGHSCORES));
    dispatch(apiRequestClear(FETCH_HIGHSCORE));
    dispatch(apiRequestClear(FETCH_USERS));
    dispatch(apiRequestClear(SAVE_NEW_HIGHSCORE));

    dispatch(clearPageConfig('GAMES'));
    dispatch(clearPageConfig('GAME'));
  }

  render() {

    const { api, app, pages, location } = this.props;

    if (app.authStatus !== 'logged_in') {
      return (
        <div pathname='/auth'>
          <Redirect to={{
            pathname: '/auth',
            state: api.clientUser.res.status === 200 ? undefined : { from: location }
          }}/>
        </div>
      );
    }

    return (
      <div className='App-root'>
        <AppBar/>
        <AppDrawer/>
        {api.gameCategories.res.status === 200 && api.games.res.status === 200 &&
        <Switch>
          <Route exact path='/games/:category' render={props => this.gamesRouteLogic(props)} />
          <Route exact path='/games/:category/:id' render={props => this.gameRouteLogic(props)} />
          <Route exact path='/highscores' render={props => this.highscoresRouteLogic(props)} />
          {pages.gamesPage.category && <Redirect from='*' to={this.getDefaultPath()} />}
        </Switch>}
        {this.shouldRenderPageError() &&
        <div style={{ marginTop: '50px' }}><PageError/></div>}
      </div>
    );
  }

  getDefaultPath() {
    return `/games/${this.props.pages.gamesPage.category}`;
  }

  shouldRenderPageError() {
    const { api } = this.props;
    return (
      (!api.gameCategories.req.isAwaiting && api.gameCategories.res.status !== 200) ||
      (!api.games.req.isAwaiting && api.games.res.status !== 200)
    );
  }
}

export default withRouter(connect(store => ({
  api: store.api,
  app: store.app,
  pages: store.pages,
}))(RootPage));