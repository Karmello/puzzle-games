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

    const { app, location } = this.props;

    if (app.isLoading) {
      if (location.pathname !== '/auth' && ['unknown', 'not_authorized'].indexOf(app.authStatus) > -1) {
        return <Redirect to={{ pathname: '/auth' }}/>;
      } else if (!location.pathname.startsWith('/games') && ['connected', 'error'].indexOf(app.authStatus) > -1) {
        return <Redirect to={{ pathname: '/games' }}/>;
      }
    }

    return (
      <div className='App'>
        <Loader isShown={app.isLoading}>
          {app.authStatus && <Switch>
            <Route exact path='/auth' render={props => (
              <AuthPage authStatus={app.authStatus} onDoneTryLogin={this.onDoneTryLogin} />
            )}/>
            <Route path='/' render={props => (
              <div>
                <AppBar/>
                <AppDrawer onLogout={this.onLogout.bind(this)} />
                <AppSnackBar message={this.state.snackBarMessage} onCloseCb={() => { this.setState({ snackBarMessage: '' }) }} />
                <Switch>
                  <Route path='/games' component={GamesPage} />
                  <Route exact path='/results' component={ResultsPage} />
                </Switch>
              </div>
            )}/>
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