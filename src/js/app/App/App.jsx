import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AuthPage, RootPage } from 'js/pages';
import { Loader, MySnackBar } from 'js/other';
import { fetchGames, fetchGameCategories } from 'js/api/api.actions';
import { switchGameCategoryTab } from 'js/pages/GamesPage/gamesPage.actions';
import { toggleExpansionPanel } from 'js/pages/GamePage/gamePage.actions';
import './App.css';


class App extends Component {

  static minLoadTime = 500;

  constructor(props) {
    super(props);
    this.state = { snackBarMessage: '' };
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

    const { app } = this.props;

    return (
      <div className='App'>
        <MySnackBar
          message={this.state.snackBarMessage}
          onClose={() => { this.setState({ snackBarMessage: '' }) }}
        />
        <Loader centered={true} isShown={app.isLoading}>
          <Switch>
            <Route exact path='/auth' render={props => this.authRouteLogic(props)}/>
            <Route path='/' component={RootPage}/>
          </Switch>
        </Loader>
      </div>
    );
  }

  authRouteLogic(props) {

    const { authStatus } = this.props.app;

    if (authStatus === 'logged_in') {
      
      const state = props.location.state;
      let pathname;
      
      if (!state || state.from.pathname === '/') {
        pathname = this.props.pages.gamesPage.category;
      } else {
        pathname = state.from.pathname + state.from.search;
      }

      return (
        <div pathname={pathname}>
          <Redirect to={pathname} />
        </div>
      );
    }

    return <AuthPage authStatus={authStatus} />;
  }
}

export default withRouter(connect(store => ({
  api: store.api,
  app: store.app,
  pages: store.pages
}))(App));