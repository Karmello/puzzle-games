import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import { AppBar, AppDrawer, AppSnackBar } from 'js/components/app';
import { AuthPage, GamesPage, ResultsPage } from 'js/components/pages';
import { Loader } from 'js/components/other';
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

    const { app } = this.props;

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
                  <AppBar/>
                  <AppDrawer/>
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
}

export default withRouter(connect(store => ({
  app: store.app,
  game: store.game
}))(App));