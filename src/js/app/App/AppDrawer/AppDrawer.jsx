import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { PlayCircleOutline, ContentPaste, PowerSettingsNew } from 'material-ui-icons';

import { toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/app/app.actions';
import { FETCH_OR_CREATE_CLIENT_USER } from 'js/api/api.actions';
import { apiRequestClear } from 'js/api/api.actionCreators';
import './AppDrawer.css';


class AppDrawer extends Component {
  
  state = {
    avatar: undefined
  }

  componentDidMount() {
    
    window.FB.api(`/${this.props.clientUser.res.data.fb.id}/picture`, 'GET', {}, res => {
      if (res.data && !res.data.is_silhouette) {
        this.setState({ avatar: res.data });
      }
    });
  }

  render() {

    const { avatar } = this.state;
    const { authStatus, showDrawer, clientUser, gameCategory } = this.props;

    return (
      <Drawer
        className='AppDrawer'
        open={showDrawer}
        onClose={this.onDrawerClose.bind(this)}
      >
        {avatar &&
        <div className='AppDrawer-user'>
          <div><img src={avatar.url} alt='' title={clientUser.res.data.fb.name} /></div>
          <div>{clientUser.res.data.fb.name}</div>
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
              {authStatus === 'connected' && <ListItem button onClick={this.onLogout.bind(this)}>
                <ListItemIcon><PowerSettingsNew/></ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>}
            </List>
          </div>
        </div>
      </Drawer>
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
    
    dispatch(toggleAppLoader(true));
    
    window.FB.logout(res => {
      dispatch(setAuthStatus(res.status));
      dispatch(apiRequestClear(FETCH_OR_CREATE_CLIENT_USER));
      dispatch(toggleAppLoader(false));
    });
  }
}

export default connect(store => ({
  authStatus: store.app.authStatus,
  showDrawer: store.app.showDrawer,
  gameCategory: store.pages.gamesPage.category,
  highscoresPage: store.pages.highscoresPage,
  clientUser:  store.api.clientUser
}))(AppDrawer);