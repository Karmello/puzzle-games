import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { PlayCircleOutline, ContentPaste, PowerSettingsNew } from 'material-ui-icons';

import { App } from 'js/app';
import { toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import './AppDrawer.css';


class AppDrawer extends Component {

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
                  <ListItemIcon><ContentPaste/></ListItemIcon>
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
    let url = `/highscores?category=${highscoresPage.gameFilter.category}&id=${highscoresPage.gameFilter.id}`;
    for (const key in highscoresPage.optionsFilter) { url += `&${key}=${highscoresPage.optionsFilter[key]}`; }
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