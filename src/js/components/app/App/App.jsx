import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer, AppSnackBar, FbBtn, Game, GameList, Loader } from 'js/components';
import { endGame, getGames, setAuthStatus, toggleAppLoader } from 'js/actions';
import { onDoneTryLogin, onLogout } from './App.methods.js';
import { fbLoginConfig, loadFbScript } from './App.fb.js';
import './App.css';


const logoSrc = `${process.env.REACT_APP_S3_BUCKET}/logo.jpg`;
const logoHref = 'https://en.wikipedia.org/wiki/15_puzzle';

class App extends Component {

  static minLoadTime = 300;

  constructor(props) {
    super(props);
    this.state = { snackBarMessage: '' };
    this.onDoneTryLogin = onDoneTryLogin;
    this.onLogout = onLogout;
  }

  componentWillUpdate(nextProps, nextState) {
  
    const { app, game, dispatch } = this.props;

    const conditions = [
      !app.authStatus && ['unknown', 'not_authorized', 'error'].indexOf(nextProps.app.authStatus) > -1,
      app.authStatus !== 'connected' && nextProps.app.authStatus === 'connected',
      app.authStatus === 'connected' && ['unknown', 'error'].indexOf(nextProps.app.authStatus) > -1
    ];

    let trueIndex;
    const isAnyTrue = conditions.some((bool, i) => { trueIndex = i; return bool });

    if (isAnyTrue) {
      if (!app.isLoading) { dispatch(toggleAppLoader(true)); }
      if (game.id) { dispatch(endGame()); }
      setTimeout(() => {
        dispatch(toggleAppLoader(false));
        if ([0, 2].indexOf(trueIndex) > -1) { this.setState({ snackBarMessage: 'Could not login.' }); }
      }, App.minLoadTime);
    }
  }

  componentDidMount() {
    
    const { dispatch } = this.props;

    loadFbScript(() => {
      window.FB.init(fbLoginConfig);
      dispatch(getGames()).then(() => {
        if (this.props.api.games.status === 200) {
          window.FB.getLoginStatus(res => {
            this.onDoneTryLogin(res);
          });
        } else {
          dispatch(setAuthStatus('error'));
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
              {['unknown', 'not_authorized'].indexOf(app.authStatus) > -1 &&
              <div className='App-auth'>
                <div className='App-auth-welcomeImgContainer'><a href={logoHref} target='new'><img src={logoSrc} alt='' /></a></div>
                <div>{this.props.app.name}</div>
                <div><FbBtn {...this.props} onDoneTryLogin={this.onDoneTryLogin.bind(this)} /></div>
              </div>}
              {['connected', 'error'].indexOf(app.authStatus) > -1 &&
              <div>
                <AppDrawer onLogout={this.onLogout.bind(this)} />
                <AppBar/>
                {!game.id && <GameList/>}
                {game.id && <Game/>}
              </div>}
              <AppSnackBar message={this.state.snackBarMessage} onCloseCb={() => { this.setState({ snackBarMessage: '' }) }} />
            </Loader>
          )}/>
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    );
  }

  
}

export default withRouter(connect(store => store)(App));