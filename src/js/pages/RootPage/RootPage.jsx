import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer } from 'js/app';
import { PageError } from 'js/other';
import { fetchGames, fetchGameCategories } from 'js/api/api.actions';
import { toggleAppLoader } from 'js/app/app.actions';
import { switchGameCategoryTab, changeGameOptions } from 'js/pages/GamesPage/gamesPage.actions';
import { toggleExpansionPanel } from 'js/pages/GamePage/gamePage.actions';
import { changeHighscoresFilter } from 'js/pages/HighscoresPage/highscoresPage.actions';
import { getUiConfig } from 'js/localStorage';
import { validateGameParams } from 'js/pages/page.methods';
import * as rootPageMethods from 'js/pages/RootPage/RootPage.methods';


class RootPage extends Component {
  
  constructor(props) {
    super(props);
    this.validateGameParams = validateGameParams.bind(this);
    for (const key in rootPageMethods) { this[key] = rootPageMethods[key].bind(this); }
  }
  
  componentWillMount() {
    const { api, app } = this.props;
    if (app.authStatus === 'logged_in') {
      const username = api.clientUser.res.data.username;
      getUiConfig(username, ui => { this.ui = ui[username]; });
    }
  }

  componentDidMount() {
    
    const { dispatch, app } = this.props;

    if (app.authStatus === 'logged_in') {
      
      Promise.all([
        dispatch(fetchGames()),
        dispatch(fetchGameCategories())
      ]).then(() => {
        
        dispatch(toggleAppLoader(false));
        
        const ui = this.ui;

        dispatch(switchGameCategoryTab(ui.gamesPage.category));
        for (const gameId in ui.gamesPage.options) {
          dispatch(changeGameOptions(gameId, ui.gamesPage.options[gameId]));
        }
        dispatch(toggleExpansionPanel('info', ui.gamePage.infoExpanded));
        dispatch(toggleExpansionPanel('bestScore', ui.gamePage.bestScoreExpanded));
        dispatch(changeHighscoresFilter(ui.highscoresPage.gameFilter, ui.highscoresPage.optionsFilter));
      });
    }
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

    if (this.shouldRenderPageError()) {
      return (
        <div className='App-root'>
          <AppBar/>
          <AppDrawer/>
          <div style={{ marginTop: '50px' }}><PageError/></div>
        </div>
      );
    }
  
    if (api.gameCategories.res.status === 200 && api.games.res.status === 200) {
      return (
        <div className='App-root'>
          <AppBar/>
          <AppDrawer/>
          <Switch>
            <Route exact path='/games/:category' render={props => this.gamesRouteLogic(props)} />
            <Route exact path='/games/:category/:id' render={props => this.gameRouteLogic(props)} />
            <Route exact path='/highscores/:gameId' render={props => this.highscoresRouteLogic(props)} />
            {pages.gamesPage.category && <Redirect from='*' to={this.getDefaultPath()} />}
          </Switch>
        </div>
      );
    }

    return null;
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
  pages: store.pages
}))(RootPage));