// @flow
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer } from 'js/containers';
import { PageError } from 'js/components';
import { fetchGames, fetchGameCategories } from 'js/actions/api';
import { toggleAppLoader } from 'js/actions/app';
import { switchGameCategoryTab, changeGameOptions } from 'js/actions/gamesPage';
import { toggleExpansionPanel } from 'js/actions/gamePage';
import { changeHighscoresFilter } from 'js/actions/highscoresPage';
import { getUiConfig } from 'js/localStorage';
import { validateGameParams } from 'js/extracts/pages';
import { gamesRouteLogic, gameRouteLogic, highscoresRouteLogic  } from 'js/extracts/rootPageRoutesLogic';

import type { T_RouterProps, T_ApiEntities, T_GameOptionsModel, T_AppSettings, T_PagesSettings } from 'js/flow-types';

type Props = {
  api:T_ApiEntities,
  app:T_AppSettings,
  pages:T_PagesSettings,
  location:string,
  dispatch:Function
};

class RootPage extends Component<Props> {

  gamesRouteLogic:(props:T_RouterProps) => React.Node;
  gameRouteLogic:(props:T_RouterProps) => React.Node;
  highscoresRouteLogic:(props:T_RouterProps) => React.Node;
  
  getDefaultPath:() => string;
  shouldRenderPageError:() => boolean;

  ui:T_PagesSettings;

  validateGameParams:(pathParams:{ category:string, id:string }, queryParams:T_GameOptionsModel, savedGameOptions:T_GameOptionsModel) => {};

  constructor(props) {
    super(props);
    this.validateGameParams = validateGameParams.bind(this);
    this.gamesRouteLogic = gamesRouteLogic.bind(this);
    this.gameRouteLogic = gameRouteLogic.bind(this);
    this.highscoresRouteLogic = highscoresRouteLogic.bind(this);
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