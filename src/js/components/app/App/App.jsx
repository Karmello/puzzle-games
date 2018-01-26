import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AuthPage, GamesPage, ResultsPage, AppBar, AppDrawer, AppSnackBar, Loader } from 'js/components';
import { startGame, toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/actions';
import { apiRequestClear } from 'js/actionCreators';
import './App.css';


class App extends Component {

  static minLoadTime = 300;

  constructor(props) {
    super(props);
    this.state = { snackBarMessage: '' };
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.props.app.authStatus !== 'error' && nextProps.app.authStatus === 'error') {
      this.setState({ snackBarMessage: 'Could not login.' });
    }
  }

  render() {

    const { app, api, game, dispatch } = this.props;

    return (
      <div className='App'>
        <Loader isShown={app.isLoading}>
          <Switch>
            <Route exact path='/auth' render={props => {
              if (app.authStatus === 'connected' || app.authStatus === 'error') { return <Redirect to='/games' />; }
              return <AuthPage authStatus={app.authStatus} />;
            }}/>
            <Route path='/' render={props => {
              if (app.authStatus !== 'connected' && app.authStatus !== 'error') { return <Redirect to='/auth' />; }
              return (
                <div>
                  <AppBar
                    appName={app.name}
                    gameId={game.id}
                    onDrawerIconClick={() => { dispatch(toggleAppDrawer(!app.showDrawer)); }}
                    onGameMenuItemClick={this.onGameMenuItemClick.bind(this)}
                  />
                  <AppDrawer
                    authStatus={app.authStatus}
                    showDrawer={app.showDrawer}
                    userData={api.user.data}
                    onDrawerClose={() => { dispatch(toggleAppDrawer(false)); }}
                    onLogout={this.onLogout.bind(this)}
                  />
                  <AppSnackBar
                    message={this.state.snackBarMessage}
                    onClose={() => { this.setState({ snackBarMessage: '' }) }}
                  />
                  <Switch>
                    <Route path='/games' component={GamesPage} />
                    <Route exact path='/results' component={ResultsPage} />
                    <Redirect from='*' to='/games' />
                  </Switch>
                </div>
              );
            }}/>
          </Switch>
        </Loader>
      </div>
    );
  }

  onGameMenuItemClick(itemId) {

    if (itemId === 'NEW') {
      const { dispatch, game } = this.props;
      dispatch(startGame(game.id));
    }
  }

  onLogout() {

    const { dispatch } = this.props;
    
    dispatch(toggleAppLoader(true));
    
    window.FB.logout(res => {
      dispatch(apiRequestClear('USER'));
      dispatch(setAuthStatus(res.status));
      dispatch(toggleAppLoader(false));
    });
  }
}

export default withRouter(connect(store => ({
  app: store.app,
  api: store.api,
  game: store.game
}))(App));