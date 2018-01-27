import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FbBtn } from 'js/components/other';
import { toggleAppLoader, setAuthStatus } from 'js/actions/app';
import { getUser, postUser } from 'js/actions/api';
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

    const { dispatch } = this.props;

    new Promise((resolve) => {

      if (res.status === 'connected') {
        window.FB.api('/me', me => {
          if (!me.error) {     
            dispatch(getUser(`fb.id=${me.id}`)).then(() => {  
              if (this.props.apiUser.status === 200) {
                resolve('connected');
              } else {
                dispatch(postUser({ fb: me })).then(() => {
                  if (this.props.apiUser.status === 200) { resolve('connected'); } else { resolve('error'); }
                });
              }
            });
          } else { resolve('error'); }
        });
      } else { resolve(res.status); }

    }).then(status => {
      
      dispatch(setAuthStatus(status));
      dispatch(toggleAppLoader(false));
    });
  }
}

export default connect(store => ({
  appName: store.app.name,
  apiUser: store.api.user
}))(AuthPage);