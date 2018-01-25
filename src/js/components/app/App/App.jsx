import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AuthPage, GamesPage, ResultsPage, AppBar, AppDrawer, AppSnackBar, Loader } from 'js/components';
import { toggleAppLoader } from 'js/actions';
import { onDoneTryLogin, onLogout } from './App.methods.js';
import { fbLoginConfig, loadFbScript } from './App.fb.js';
import './App.css';


class App extends Component {

  static minLoadTime = 300;

  constructor(props) {
    super(props);
    this.state = { snackBarMessage: '' };
    this.onDoneTryLogin = onDoneTryLogin;
    this.onLogout = onLogout;
  }

  componentWillUpdate(nextProps, nextState) {
  
    const { app, dispatch } = this.props;

    const conditions = [
      !app.authStatus && ['unknown', 'not_authorized', 'error'].indexOf(nextProps.app.authStatus) > -1,
      app.authStatus !== 'connected' && nextProps.app.authStatus === 'connected',
      app.authStatus === 'connected' && ['unknown', 'error'].indexOf(nextProps.app.authStatus) > -1
    ];

    if (conditions.some(bool => bool)) {
      if (!app.isLoading) { dispatch(toggleAppLoader(true)); }
      setTimeout(() => {
        dispatch(toggleAppLoader(false));
        if (nextProps.app.authStatus === 'error') { this.setState({ snackBarMessage: 'Could not login.' }); }
      }, App.minLoadTime);
    }
  }

  componentDidMount() {

    loadFbScript(() => {
      window.FB.init(fbLoginConfig);
      window.FB.getLoginStatus(res => { this.onDoneTryLogin(res); });
    });
  }

  render() {

    const { app } = this.props;

    return (
      <div className='App'>
        <Loader isShown={app.isLoading}>
          {app.authStatus && <Switch>
            <Route exact path='/auth' render={props => {
              if (app.authStatus === 'connected' || app.authStatus === 'error') { return <Redirect to='/games' />; }
              return <AuthPage authStatus={app.authStatus} onDoneTryLogin={this.onDoneTryLogin} />;
            }}/>
            <Route path='/' render={props => {
              if (app.authStatus === 'unknown' || app.authStatus === 'not_authorized') { return <Redirect to='/auth' />; }
              return (
                <div>
                  <AppBar/>
                  <AppDrawer onLogout={this.onLogout.bind(this)} />
                  <AppSnackBar message={this.state.snackBarMessage} onCloseCb={() => { this.setState({ snackBarMessage: '' }) }} />
                  <Switch>
                    <Route path='/games' component={GamesPage} />
                    <Route exact path='/results' component={ResultsPage} />
                    <Redirect from='*' to='/games' />
                  </Switch>
                </div>
              );
            }}/>
          </Switch>}
        </Loader>
      </div>
    );
  }
}

export default withRouter(connect(store => ({
  app: store.app,
  api: store.api
}))(App));