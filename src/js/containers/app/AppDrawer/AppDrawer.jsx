// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { PlayCircleOutline, PowerSettingsNew, List as ListIcon } from '@material-ui/icons';
import * as qs from 'query-string';
import { isEmpty } from 'lodash';

import { App } from 'js/containers';
import { toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/actions/app';
import { API_MAKE_AUTH_REQUEST, API_FETCH_GAMES, API_FETCH_GAME_CATEGORIES, API_FETCH_HIGHSCORES, API_FETCH_HIGHSCORE, API_SAVE_NEW_HIGHSCORE, API_FETCH_USERS } from 'js/actions/api';
import { apiRequestClear } from 'js/creators/action/api';
import { clearPageConfig } from 'js/creators/action/pages';

import type { T_AppState, T_ApiEndPoint, T_PagesState } from 'js/flow-types';

import './AppDrawer.css';

type Props = {
  app:T_AppState,
  clientUser:T_ApiEndPoint,
  pages:T_PagesState,
  dispatch:Function
};

class AppDrawer extends Component<Props> {

  render() {

    const { app, clientUser, pages } = this.props;

    return (
      <div className='AppDrawer'>
        <Drawer
          open={app.showDrawer}
          onClose={this.onDrawerClose.bind(this)}
        >
          {clientUser.res.status === 200 &&
          <div className='AppDrawer-user'>
            <span>Logged in as</span>
            <span><b>{clientUser.res.data.username}</b></span>
          </div>}
          <div
            tabIndex={0}
            role='button'
            onClick={this.onDrawerClose.bind(this)}
            onKeyDown={this.onDrawerClose.bind(this)}
          >
            <div className='AppDrawer-content'>
              <List>
                <ListItem button component={Link} to={`/games/${pages.gamesPage.category}`}>
                  <ListItemIcon><PlayCircleOutline/></ListItemIcon>
                  <ListItemText primary='Games' />
                </ListItem>
                <ListItem button component={Link} to={this.getHighscoresPageUrl()}>
                  <ListItemIcon><ListIcon /></ListItemIcon>
                  <ListItemText primary='Highscores' />
                </ListItem>
                {app.authStatus === 'logged_in' && <ListItem button onClick={this.onLogout.bind(this)}>
                  <ListItemIcon><PowerSettingsNew/></ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>}
              </List>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }

  getHighscoresPageUrl() {
    const { highscoresPage } = this.props.pages;
    let url = `/highscores/${String(highscoresPage.gameFilter.id)}`;
    if (!isEmpty(highscoresPage.optionsFilter)) { url += `?${qs.stringify(highscoresPage.optionsFilter)}`; }
    return url;
  }

  onDrawerClose() {
    this.props.dispatch(toggleAppDrawer(false));
  }

  onLogout() {
    
    const { dispatch } = this.props;
    
    setTimeout(() => {
      dispatch(toggleAppLoader(true));
      
      setTimeout(() => {
        localStorage.removeItem('token');
        dispatch(setAuthStatus('logged_out'));
        dispatch(apiRequestClear(API_MAKE_AUTH_REQUEST));
        dispatch(apiRequestClear(API_FETCH_GAMES));
        dispatch(apiRequestClear(API_FETCH_GAME_CATEGORIES));
        dispatch(apiRequestClear(API_FETCH_HIGHSCORES));
        dispatch(apiRequestClear(API_FETCH_HIGHSCORE));
        dispatch(apiRequestClear(API_FETCH_USERS));
        dispatch(apiRequestClear(API_SAVE_NEW_HIGHSCORE));
        dispatch(clearPageConfig('GAMES'));
        dispatch(clearPageConfig('GAME'));
        dispatch(clearPageConfig('HIGHSCORES'));
        dispatch(toggleAppLoader(false));
      }, App.minLoadTime);

    }, App.minLoadTime / 2);
  }
}

export default connect(store => ({
  clientUser:  store.api.clientUser,
  app: store.app,
  pages: store.pages
}))(AppDrawer);
