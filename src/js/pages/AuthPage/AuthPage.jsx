import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/app';
import { FbBtn } from 'js/other';
import { toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import { fetchClientUser, createClientUser } from 'js/api/api.actions';
import { fbLoginConfig, loadFbScript } from './AuthPage.fb.js';
import './AuthPage.css';


const logoSrc = `${process.env.REACT_APP_S3_BUCKET}/logo.jpg`;
const logoHref = 'https://en.wikipedia.org/wiki/15_puzzle';

class AuthPage extends Component {
  
  componentDidMount() {
    
    loadFbScript(() => {
      window.FB.init(fbLoginConfig);
      window.FB.getLoginStatus(res => { this.onDoneTryLogin(res); });
    });
  }

  render() {

    return (
      <div className='AuthPage'>
        <div className='AuthPage-welcomeImgContainer'>
          <a href={logoHref} target='new'>
            <img src={logoSrc} alt='' />
          </a>
        </div>
        <div>{this.props.appName}</div>
        <div>
          <FbBtn {...this.props} onDoneTryLogin={this.onDoneTryLogin.bind(this)} />
        </div>
      </div>
    );
  }

  onDoneTryLogin(res) {

    const { dispatch, isAppLoading } = this.props;

    new Promise((resolve) => {

      if (!isAppLoading) { dispatch(toggleAppLoader(true)); }

      if (res.status === 'connected') {
        window.FB.api('/me', me => {
          if (!me.error) {     
            dispatch(fetchClientUser(`${me.id}`)).then(() => {  
              if (this.props.clientUser.status === 200) {
                resolve('connected');
              } else {
                dispatch(createClientUser({ fb: me })).then(() => {
                  if (this.props.clientUser.status === 200) { resolve('connected'); } else { resolve('error'); }
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

export default connect(store => ({
  appName: store.app.title,
  isAppLoading: store.app.isLoading,
  clientUser: store.api.clientUser
}))(AuthPage);