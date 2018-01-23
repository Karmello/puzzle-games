import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer, FbBtn, Game, GamesList, Loader } from 'js/components';
import { endGame, getUser, postUser, setAuthStatus, toggleAppLoader } from 'js/actions';
import { fbLoginConfig, loadFbScript } from './App.auth.js';
import './App.css';


const logoSrc = process.env.PUBLIC_URL + '/imgs/welcome.jpg';
const logoHref = 'https://en.wikipedia.org/wiki/15_puzzle';

class App extends Component {

  static minLoadTime = 300;

  componentWillUpdate(nextProps, nextState) {
  
    const { app, game, dispatch } = this.props;

    const conditions = [
      !app.authStatus && ['unknown', 'not_authorized'].indexOf(nextProps.app.authStatus) > -1,
      app.authStatus !== 'connected' && nextProps.app.authStatus === 'connected',
      app.authStatus === 'connected' && nextProps.app.authStatus === 'unknown'
    ];

    let trueConditionIndex;
    const isAnyTrue = conditions.some((bool, i) => {
      if (bool) { trueConditionIndex = i; }
      return bool;
    });

    if (isAnyTrue) {
      if (app.authStatus && trueConditionIndex === 1) { this.onLoginSuccess(); }
      if (!app.isLoading) { dispatch(toggleAppLoader(true)); }
      if (game.id) { dispatch(endGame()); }
      setTimeout(() => { dispatch(toggleAppLoader(false)); }, App.minLoadTime);
    }
  }

  componentDidMount() {
    
    loadFbScript(() => {

      // app first load
      window.FB.init(fbLoginConfig);
      
      window.FB.getLoginStatus(res => {
        if (res.status === 'connected') {
          this.onLoginSuccess();
        } else {
          this.setAuthStatus(res.status);
        }
      });
    });
  }

  render() {

    const { app, game } = this.props;

    return (
      <div className='App'>
        <Switch>
          <Route exact={true} path='/' render={props => (
            <Loader isShown={app.isLoading}>
              {app.authStatus !== 'connected' && 
              <div className='App-auth'>
                <div className='App-auth-welcomeImgContainer'>
                  <a href={logoHref} target='new'>
                    <img src={logoSrc} alt='' />
                  </a>
                </div>
                <div>{this.props.app.name}</div>
                <div>
                  <FbBtn {...this.props} setAuthStatus={this.setAuthStatus.bind(this)} />
                </div>
              </div>
              }
              {app.authStatus === 'connected' &&
              <div>
                <AppDrawer setAuthStatus={this.setAuthStatus.bind(this)} />
                <AppBar/>
                {!game.id && <GamesList/>}
                {game.id && <Game/>}
              </div>}
            </Loader>
          )}/>
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    );
  }

  onLoginSuccess() {

    // getting fb user data
    window.FB.api('/me', fbUser => {

      const { dispatch } = this.props;

      // checking if fb user already in db
      dispatch(getUser(`fb.id=${fbUser.id}`)).then(() => {
        
        // need to create new db user
        if (this.props.api.me.status === 404) {
          dispatch(postUser({ fb: fbUser })).then(() => this.setAuthStatus('connected'));

        } else { this.setAuthStatus('connected'); }
      });
    });
  }

  setAuthStatus(status) {

    this.props.dispatch(setAuthStatus(status));
  }
}

export default withRouter(connect(store => store)(App));