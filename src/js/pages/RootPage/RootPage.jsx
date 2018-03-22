import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer } from 'js/app';
import { PageError } from 'js/other';
import { validateGameParams } from 'js/pages/page.methods';
import * as rootPageMethods from 'js/pages/RootPage/RootPage.methods';


class RootPage extends Component {
  
  constructor(props) {
    super(props);
    this.validateGameParams = validateGameParams.bind(this);
    for (const key in rootPageMethods) { this[key] = rootPageMethods[key].bind(this); }
  }

  render() {

    const { api, app, location } = this.props;

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
          <Redirect from='*' to={this.getDefaultPath()} />
        </Switch>}
        {(api.gameCategories.res.status !== 200 || api.games.res.status !== 200) &&
        <div style={{ marginTop: '50px' }}><PageError/></div>}
      </div>
    );
  }

  getDefaultPath() {
    return `/games/${this.props.pages.gamesPage.category}`;
  }
}

export default withRouter(connect(store => ({
  api: store.api,
  app: store.app,
  pages: store.pages,
}))(RootPage));