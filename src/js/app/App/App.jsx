// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { AuthPage, RootPage } from 'js/pages';
import { Loader, MySnackBar } from 'js/other';
import type { T_AppSettings } from 'js/app';
import type { T_ApiEntities } from 'js/api';

import './App.css';

type Props = {
  api:T_ApiEntities,
  app:T_AppSettings
};

type State = {
  snackBarMessage:string
};

class App extends Component<Props, State> {

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
            <Route exact path='/auth' component={AuthPage}/>
            <Route path='/' component={RootPage}/>
          </Switch>
        </Loader>
      </div>
    );
  }
}

export default withRouter(connect(store => ({
  api: store.api,
  app: store.app
}))(App));