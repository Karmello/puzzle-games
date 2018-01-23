import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer, Game, GamesList } from 'js/containers';
import { fbLoginConfig, loadFbScript } from 'js/containers/App/App.auth.js';
import { FbBtn, Loader } from 'js/components';
import { endGame, getUser, postUser, setAuthStatus, toggleAppLoader } from 'js/actions';
import './App.css';


class App extends Component {

  static minLoadTime = 300;

  componentWillUpdate(nextProps, nextState) {
  
    const { app, game, dispatch } = this.props;

    const conditions = [
      !app.status && ['unknown', 'not_authorized'].indexOf(nextProps.app.status) > -1,
      app.status !== 'connected' && nextProps.app.status === 'connected',
      app.status === 'connected' && nextProps.app.status === 'unknown'
    ];

    let trueConditionIndex;
    const isAnyTrue = conditions.some((bool, i) => {
      if (bool) { trueConditionIndex = i; }
      return bool;
    });

    if (isAnyTrue) {
      if (app.status && trueConditionIndex === 1) { this.onLoginSuccess(); }
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
              {app.status !== 'connected' && 
              <div className='App-auth'>
                <div className='App-auth-welcomeImgContainer'>
                  <a href='https://en.wikipedia.org/wiki/15_puzzle' target='new'>
                    <img src={process.env.PUBLIC_URL + '/imgs/welcome.jpg'} alt='' />
                  </a>
                </div>
                <div>{this.props.app.name}</div>
                <div>
                  <FbBtn {...this.props} setAuthStatus={this.setAuthStatus.bind(this)} />
                </div>
              </div>
              }
              {app.status === 'connected' &&
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

  setAuthStatus(status) {

    this.props.dispatch(setAuthStatus(status));
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
}

const mapStateToProps = (store) => { return store; }
export default withRouter(connect(mapStateToProps)(App));