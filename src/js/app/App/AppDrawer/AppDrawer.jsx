import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { PlayCircleOutline, ContentPaste, PowerSettingsNew } from 'material-ui-icons';

import { App } from 'js/app';
import { toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import { REGISTER_OR_LOGIN_USER } from 'js/api/api.actions';
import { apiRequestClear } from 'js/api/api.actionCreators';
import './AppDrawer.css';


class AppDrawer extends Component {

  render() {

    const { authStatus, showDrawer, clientUser, gameCategory } = this.props;

    return (
      <div className='AppDrawer'>
        <Drawer
          open={showDrawer}
          onClose={this.onDrawerClose.bind(this)}
        >
          {clientUser.res.status === 200 &&
          <div className='AppDrawer-user'>
            <div>Logged in as</div>
            <div>{clientUser.res.data.username}</div>
          </div>}
          <div
            tabIndex={0}
            role='button'
            onClick={this.onDrawerClose.bind(this)}
            onKeyDown={this.onDrawerClose.bind(this)}
          >
            <div className='AppDrawer-content'>
              <List>
                <ListItem button component={Link} to={`/games/${gameCategory}`}>
                  <ListItemIcon><PlayCircleOutline/></ListItemIcon>
                  <ListItemText primary='Games' />
                </ListItem>
                <ListItem button component={Link} to={this.getHighscoresPageUrl()}>
                  <ListItemIcon><ContentPaste/></ListItemIcon>
                  <ListItemText primary='Highscores' />
                </ListItem>
                {authStatus === 'logged_in' && <ListItem button onClick={this.onLogout.bind(this)}>
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

    const { highscoresPage } = this.props;

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
        dispatch(setAuthStatus('logged_out'));
        dispatch(apiRequestClear(REGISTER_OR_LOGIN_USER));
        dispatch(toggleAppLoader(false));
      }, App.minLoadTime);
    }, App.minLoadTime / 2);
  }
}

export default connect(store => ({
  authStatus: store.app.authStatus,
  showDrawer: store.app.showDrawer,
  gameCategory: store.pages.gamesPage.category,
  highscoresPage: store.pages.highscoresPage,
  clientUser:  store.api.clientUser
}))(AppDrawer);