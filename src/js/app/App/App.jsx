import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer } from 'js/app';
import { Loader, MySnackBar, PageError } from 'js/other';
import { fetchGames, fetchGameCategories } from 'js/api/api.actions';
import { switchGameCategoryTab } from 'js/pages/GamesPage/gamesPage.actions';
import { toggleExpansionPanel } from 'js/pages/GamePage/gamePage.actions';
import * as appMethods from 'js/app/App/App.methods';
import { validateGameParams } from 'js/pages/page.methods';
import './App.css';


class App extends Component {

  static minLoadTime = 500;

  constructor(props) {
    super(props);
    this.state = { snackBarMessage: '' };
    this.validateGameParams = validateGameParams.bind(this);
    for (const key in appMethods) { this[key] = appMethods[key].bind(this); }
  }

  componentWillReceiveProps(nextProps) {
    
    const { api, app } = this.props;

    if (app.authStatus === '' && nextProps.app.authStatus === 'logged_out') {
      this.setState({ snackBarMessage: 'Could not automagically log in.' });
    
    } else if (api.newHighscore.req.isAwaiting && !nextProps.api.newHighscore.req.isAwaiting && nextProps.api.newHighscore.res.status === 200) {
      this.setState({ snackBarMessage: 'Your score has been saved.' });
    }
  }

  componentDidMount() {
    
    const { dispatch, pages } = this.props;
    
    dispatch(fetchGames());
    dispatch(fetchGameCategories());

    if (localStorage.getItem('token')) {
      dispatch(switchGameCategoryTab(localStorage.getItem('gamesPageCategory')));
      dispatch(toggleExpansionPanel('info', localStorage.getItem('gamePageInfoExpanded')));
      dispatch(toggleExpansionPanel('bestScore', localStorage.getItem('gamePageBestScoreExpanded')));
    
    } else {
      localStorage.setItem('gamesPageCategory', pages.gamesPage.category);
      localStorage.setItem('gamePageInfoExpanded', pages.gamePage.infoExpanded);
      localStorage.setItem('gamePageBestScoreExpanded', pages.gamePage.bestScoreExpanded);
    }
  }

  render() {

    const { api, app } = this.props;

    return (
      <div className='App'>
        <MySnackBar
          message={this.state.snackBarMessage}
          onClose={() => { this.setState({ snackBarMessage: '' }) }}
        />
        <Loader centered={true} isShown={app.isLoading}>
          <Switch>
            <Route exact path='/auth' render={props => this.authRouteLogic(props)}/>
            <Route path='/' render={props => {
              if (app.authStatus !== 'logged_in') {
                return (
                  <div pathname='/auth'>
                    <Redirect to={{
                      pathname: '/auth',
                      state: api.clientUser.res.status === 200 ? undefined : { from: props.location }
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
            }}/>
          </Switch>
        </Loader>
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
  pages: store.pages
}))(App));