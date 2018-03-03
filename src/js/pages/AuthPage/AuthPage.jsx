import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Paper } from 'material-ui';

import { App } from 'js/app';
import { AuthForm } from 'js/other';
import { toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import { fetchClientUser, createClientUser } from 'js/api/api.actions';
import { fbLoginConfig, loadFbScript } from './AuthPage.fb.js';
import './AuthPage.css';


class AuthPage extends Component {
  
  componentDidMount() {
    
    loadFbScript(() => {
      window.FB.init(fbLoginConfig);
      window.FB.getLoginStatus(res => { this.login(res); });
    });
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

  onAuthFormSubmit(actionId, values) {

    console.log(actionId, values);
  }

  login(res) {

    const { dispatch, isAppLoading, authStatus } = this.props;

    if (res.status !== authStatus) {

      new Promise(resolve => {
        if (!isAppLoading) { dispatch(toggleAppLoader(true)); }

        if (res.status === 'connected') {
          window.FB.api('/me', me => {
            if (!me.error) {
              dispatch(fetchClientUser(`${me.id}`)).then(() => {
                if (this.props.clientUser.res.status === 200) {
                  resolve('connected');
                } else {
                  window.FB.api('/me/picture', picture => {
                    if (!picture.error) { me.avatarUrl = picture.data.url; }
                    dispatch(createClientUser({ fb: me })).then(() => {
                      if (this.props.clientUser.res.status === 200) { resolve('connected'); } else { resolve('error'); }
                    });
                  });
                }
              });
            } else { resolve('error'); }
          });
        } else { resolve(res.status); }

      }).then(status => {
        dispatch(setAuthStatus(status));
        setTimeout(() => dispatch(toggleAppLoader(false)), App.minLoadTime);
      });
    }
  }
}

export default connect(store => ({
  appName: store.app.title,
  isAppLoading: store.app.isLoading,
  clientUser: store.api.clientUser
}))(AuthPage);