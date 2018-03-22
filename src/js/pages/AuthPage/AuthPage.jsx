import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Paper } from 'material-ui';

import { App } from 'js/app';
import { AuthForm } from 'js/other';
import { toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import { registerUser, loginUser } from 'js/api/api.actions';
import './AuthPage.css';


class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.onAuthFormSubmit = this.onAuthFormSubmit.bind(this);
  }

  componentDidMount() {

    const { dispatch, app } = this.props;
    const  token = localStorage.getItem('token');

    setTimeout(() => {
      if (app.authStatus !== 'logged_in' && token) {
        dispatch(loginUser({ token })).then(() => {
          if (this.props.clientUser.res.status === 200) {
            dispatch(setAuthStatus('logged_in'));
          } else {
            dispatch(toggleAppLoader(false));
          }
        });
      } else {
        dispatch(setAuthStatus('logged_out'));
        dispatch(toggleAppLoader(false));
      }
    }, App.minLoadTime);
  }

  render() {

    const { app, pages, location } = this.props;

    if (app.authStatus === 'logged_in') {
      
      const state = location.state;
      let pathname;
      
      if (!state || state.from.pathname === '/') {
        pathname = pages.gamesPage.category;
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

    const apiActions = { registerUser, loginUser };

    return new Promise(resolve => {
      setTimeout(() => {
        this.props.dispatch(apiActions[actionName + 'User'](values)).then(() => {
          if (this.props.clientUser.res.status === 200) {
            this.props.dispatch(setAuthStatus('logged_in'));
            resolve();
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