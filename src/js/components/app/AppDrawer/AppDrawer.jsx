import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';
import ContentPasteIcon from 'material-ui-icons/ContentPaste';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import { toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/actions/app';
import { apiRequestClear } from 'js/actionCreators';
import './AppDrawer.css';


class AppDrawer extends Component {
  
  state = {
    clientUser: undefined,
    avatar: undefined
  }

  componentWillMount() {

    const { fetchedClientUser, createdClientUser } = this.props;

    if (fetchedClientUser.status === 200) {
      this.setState({ clientUser: fetchedClientUser });
    
    } else if (createdClientUser.status === 200) {
      this.setState({ clientUser: createdClientUser });
    }
  }

  componentDidMount() {
    
    window.FB.api(`/${this.state.clientUser.data.fb.id}/picture`, 'GET', {}, res => {
      if (res.data && !res.data.is_silhouette) {
        this.setState({ avatar: res.data });
      }
    });
  }

  render() {

    const { clientUser, avatar } = this.state;
    const { authStatus, showDrawer } = this.props;

    return (
      <Drawer
        className='AppDrawer'
        open={showDrawer}
        onClose={this.onDrawerClose.bind(this)}
      >
        {avatar &&
        <div className='AppDrawer-user'>
          <div>{avatar && <img src={avatar.url} alt='' title={clientUser.data.fb.name} />}</div>
          <div>{clientUser.data.fb.name}</div>
        </div>}
        <div
          tabIndex={0}
          role='button'
          onClick={this.onDrawerClose.bind(this)}
          onKeyDown={this.onDrawerClose.bind(this)}
        >
          <div className='AppDrawer-content'>
            <List>
              <ListItem component={Link} to='/games' button>
                <ListItemIcon><PlayCircleOutlineIcon/></ListItemIcon>
                <ListItemText primary='Games' />
              </ListItem>
              <ListItem component={Link} to='/results' button>
                <ListItemIcon><ContentPasteIcon/></ListItemIcon>
                <ListItemText primary='Results' />
              </ListItem>
              {authStatus === 'connected' && <ListItem button onClick={this.onLogout.bind(this)}>
                <ListItemIcon><PowerSettingsNewIcon/></ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>}
            </List>
          </div>
        </div>
      </Drawer>
    );
  }

  onDrawerClose() {

    this.props.dispatch(toggleAppDrawer(false));
  }

  onLogout() {

    const { dispatch } = this.props;
    
    dispatch(toggleAppLoader(true));
    
    window.FB.logout(res => {
      dispatch(apiRequestClear('CREATE_CLIENT_USER'));
      dispatch(apiRequestClear('FETCH_CLIENT_USER'));
      dispatch(setAuthStatus(res.status));
      dispatch(toggleAppLoader(false));
    });
  }
}

export default connect(store => ({
  authStatus: store.app.authStatus,
  showDrawer: store.app.showDrawer,
  fetchedClientUser:  store.api.fetchedClientUser,
  createdClientUser: store.api.createdClientUser
}))(AppDrawer);