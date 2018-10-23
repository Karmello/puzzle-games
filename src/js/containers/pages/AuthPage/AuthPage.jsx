// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Paper } from 'material-ui';

import { App } from 'js/containers';
import { AuthForm } from 'js/components';
import { toggleAppLoader, setAuthStatus } from 'js/actions/app';
import { registerUser, loginUser } from 'js/actions/api';
import './AuthPage.css';

import type { T_AppSettings, T_ApiEndPoint } from 'js/flow-types';

type Props = {
  dispatch:Function,
  app:T_AppSettings,
  clientUser:T_ApiEndPoint,
  location:{
    state:{
      from: {
        pathname:string,
        search:string
      }
    }
  }
};

class AuthPage extends Component<Props> {

  onAuthFormSubmit:(actionName:string, values:{}) => Promise<any>;

  constructor(props) {
    super(props);
    this.onAuthFormSubmit = this.onAuthFormSubmit.bind(this);
  }

  componentDidMount() {

    const { dispatch, app } = this.props;
    const token = localStorage.getItem('token');

    setTimeout(() => {
      if (app.authStatus !== 'logged_in' && token) {
        dispatch(loginUser({ token })).then(() => {
          if (this.props.clientUser.res.status === 200) {
            dispatch(setAuthStatus('logged_in'));
          } else {
            dispatch(toggleAppLoader(false));
          }
        });
      } else if (app.authStatus === '') {
        dispatch(setAuthStatus('logged_out'));
        dispatch(toggleAppLoader(false));
      }
    }, App.minLoadTime);
  }

  render() {

    const { app, location } = this.props;

    if (app.authStatus === 'logged_in') {
      
      const state = location.state;
      let pathname;
      
      if (!state || state.from.pathname === '/') {
        pathname = '/games';

      } else {
        pathname = state.from.pathname + state.from.search;
      }

      return (
        <div pathname={pathname}>
          <Redirect to={pathname} />
        </div>
      );
    }

    return (
      <div className='AuthPage'>
        <div>
          <div className='AuthPage-content'>
            <p>{app.title}</p>
            <div>
              <Paper>
                <AuthForm onSubmit={this.onAuthFormSubmit} />
              </Paper>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAuthFormSubmit(actionName, values) {

    const { dispatch } = this.props;
    const apiActions = { registerUser, loginUser };

    return new Promise(resolve => {
      setTimeout(() => {
        dispatch(apiActions[actionName + 'User'](values)).then(() => {
          if (this.props.clientUser.res.status === 200) {
            dispatch(toggleAppLoader(true));
            setTimeout(() => {
              dispatch(setAuthStatus('logged_in'));
              resolve();
            }, App.minLoadTime);
          } else {
            resolve(this.props.clientUser.res.data.errors);
          }
        });
      }, App.minLoadTime);
    });
  }
}

export default withRouter(connect(store => ({
  clientUser: store.api.clientUser,
  app: store.app,
  pages: store.pages
}))(AuthPage));