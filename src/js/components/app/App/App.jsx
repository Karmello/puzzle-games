import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer, FbBtn, Game, GamesList, Loader } from 'js/components';
import { endGame, getGames, getUser, postUser, setAuthStatus, toggleAppLoader } from 'js/actions';
import { apiRequestClear } from 'js/actionCreators';
import { fbLoginConfig, loadFbScript } from './App.auth.js';
import './App.css';


const logoSrc = `${process.env.REACT_APP_S3_BUCKET}/logo.jpg`;
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

    const isAnyTrue = conditions.some(bool => bool);

    if (isAnyTrue) {
      if (!app.isLoading) { dispatch(toggleAppLoader(true)); }
      if (game.id) { dispatch(endGame()); }
      setTimeout(() => { dispatch(toggleAppLoader(false)); }, App.minLoadTime);
    }
  }

  // first app load
  componentDidMount() {
    
    // loading fb script
    loadFbScript(() => {
      
      // connecting to fb app
      window.FB.init(fbLoginConfig);

      // getting must have app data
      this.props.dispatch(getGames()).then(() => {

        // checking fb login status
        window.FB.getLoginStatus(res => {

          // when done
          this.onDoneTryLogin(res);
        });
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
                  <FbBtn {...this.props} onDoneTryLogin={this.onDoneTryLogin.bind(this)} />
                </div>
              </div>
              }
              {app.authStatus === 'connected' &&
              <div>
                <AppDrawer onLogout={this.onLogout.bind(this)} />
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

  onDoneTryLogin(res) {
  
    if (res.status === 'connected') {

      // getting fb user data
      window.FB.api('/me', fbUser => {

        const { dispatch } = this.props;

        // checking if fb user already in db
        dispatch(getUser(`fb.id=${fbUser.id}`)).then(() => {
          
          // need to create new db user
          if (this.props.api.user.status === 404) {
            dispatch(postUser({ fb: fbUser })).then(() => this.setAuthStatus('connected'));

          // db user already exists in db
          } else { this.setAuthStatus('connected'); }
        });
      });

    } else {
      this.setAuthStatus(res.status);
    }
  }

  onLogout() {

    const { dispatch } = this.props;
    
    dispatch(toggleAppLoader(true));
    
    window.FB.logout(res => {
      dispatch(apiRequestClear('USER'));
      dispatch(setAuthStatus(res.status));
    });
  }

  setAuthStatus(status) {

    this.props.dispatch(setAuthStatus(status));
  }
}

export default withRouter(connect(store => store)(App));