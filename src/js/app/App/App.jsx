import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { Loader, MySnackBar, PageError } from 'js/other';
import { fetchGames, fetchGameCategories } from 'js/api/api.actions';
import * as appMethods from 'js/app/App/App.methods';
import { validateGameParams } from 'js/pages/page.methods';
import AppBar from './AppBar/AppBar';
import AppDrawer from './AppDrawer/AppDrawer';
import './App.css';


class App extends Component {

  static minLoadTime = 500;

  constructor(props) {
    super(props);
    this.defaultPath = `/games/${props.gamesPage.category}`;
    this.state = { snackBarMessage: '' };
    this.validateGameParams = validateGameParams.bind(this);
    for (const key in appMethods) { this[key] = appMethods[key].bind(this); }
  }

  componentWillReceiveProps(nextProps) {
    
    const { authStatus, api } = this.props;

    if (authStatus === '' && nextProps.authStatus === 'logged_out') {
      this.setState({ snackBarMessage: 'Could not login.' });
    
    } else if (api.newHighscore.req.isAwaiting && !nextProps.api.newHighscore.req.isAwaiting && nextProps.api.newHighscore.res.status === 200) {
      this.setState({ snackBarMessage: 'Your score has been saved.' });
    }
  }

  componentDidMount() {

    this.props.dispatch(fetchGames());
    this.props.dispatch(fetchGameCategories());
  }

  render() {

    const { authStatus, isLoading, api } = this.props;

    return (
      <div className='App'>
        <Loader centered={true} isShown={isLoading}>
          <Switch>
            <Route exact path='/auth' render={props => this.authRouteLogic(props)}/>
            <Route path='/' render={props => {
              if (authStatus !== 'logged_in') {
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
                  <MySnackBar
                    message={this.state.snackBarMessage}
                    onClose={() => { this.setState({ snackBarMessage: '' }) }}
                  />
                  {api.gameCategories.res.status === 200 && api.games.res.status === 200 &&
                  <Switch>
                    <Route exact path='/games/:category' render={props => this.gamesRouteLogic(props)} />
                    <Route exact path='/games/:category/:id' render={props => this.gameRouteLogic(props)} />
                    <Route exact path='/highscores' render={props => this.highscoresRouteLogic(props)} />
                    <Redirect from='*' to={this.defaultPath} />
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
}

export default withRouter(connect(store => ({
  authStatus: store.app.authStatus,
  isLoading: store.app.isLoading,
  gamesPage: store.pages.gamesPage,
  highscoresPage: store.pages.highscoresPage,
  api: store.api
}))(App));