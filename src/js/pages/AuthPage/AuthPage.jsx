import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import { App } from 'js/app';
import { AuthForm } from 'js/other';
import { toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import { registerUser, loginUser } from 'js/api/api.actions';
import { toggleExpansionPanel } from 'js/pages/GamePage/gamePage.actions';
import './AuthPage.css';


class AuthPage extends Component {

  constructor(props) {
    super(props);
    this.onAuthFormSubmit = this.onAuthFormSubmit.bind(this);
  }

  componentDidMount() {

    const { authStatus, dispatch } = this.props;
    const  token = localStorage.getItem('token');

    if (!authStatus && token) {
      setTimeout(() => {
        dispatch(loginUser({ token })).then(() => {
          const res = this.props.clientUser.res;
          if (res.status === 200) {
            this.setUserUiState(res.data.uiState);
            dispatch(setAuthStatus('logged_in'));
            dispatch(toggleAppLoader(false));
          } else {
            dispatch(toggleAppLoader(false));
          }
        });
      }, App.minLoadTime);
    } else {
      dispatch(toggleAppLoader(false));
    }
  }

  render() {

    const { appName } = this.props;

    return (
      <div className='AuthPage'>
        <div>
          <div className='AuthPage-content'>
            <p>{appName}</p>
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

  setUserUiState(uiState) {
    const { dispatch } = this.props;
    dispatch(toggleExpansionPanel('info', uiState.gamePage.infoExpanded));
    dispatch(toggleExpansionPanel('bestScore', uiState.gamePage.bestScoreExpanded));
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

export default connect(store => ({
  appName: store.app.title,
  authStatus: store.app.authStatus,
  clientUser: store.api.clientUser
}))(AuthPage);