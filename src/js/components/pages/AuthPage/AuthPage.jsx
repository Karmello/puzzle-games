import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FbBtn } from 'js/components';
import './AuthPage.css';


const logoSrc = `${process.env.REACT_APP_S3_BUCKET}/logo.jpg`;
const logoHref = 'https://en.wikipedia.org/wiki/15_puzzle';

class AuthPage extends Component {
  
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
          <FbBtn {...this.props} onDoneTryLogin={this.props.onDoneTryLogin.bind(this)} />
        </div>
      </div>
    );
  }
}

export default connect(store => ({
  appName: store.app.name
}))(AuthPage);