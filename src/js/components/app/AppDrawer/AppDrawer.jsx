import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';
import ContentPasteIcon from 'material-ui-icons/ContentPaste';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import { toggleAppDrawer, toggleAppLoader, setAuthStatus } from 'js/actions';
import { apiRequestClear } from 'js/actionCreators';
import './AppDrawer.css';


class AppDrawer extends Component {
  
  constructor(props) {
    super(props);
    this.state = { avatar: undefined };
  }

  componentDidUpdate(prevProps, prevState) {

    const { userData } = this.props;

    if (userData) {
      window.FB.api(`/${userData.fb.id}/picture`, 'GET', {}, res => {
        if (res.data && !res.data.is_silhouette) {
          this.setState({ avatar: res.data });
        }
      });
    } 
  }

  render() {

    const { authStatus, showDrawer, user, onLogout } = this.props;
    const avatar = this.state.avatar;

    return (
      <Drawer
        className='AppDrawer'
        open={showDrawer}
        onClose={this.onDrawerClose.bind(this)}
      >
        {user.data && avatar &&
        <div className='AppDrawer-user'>
          <div>{avatar && <img src={avatar.url} alt='' title={user.data.fb.name} />}</div>
          <div>{user.data.fb.name}</div>
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
              {authStatus === 'connected' && <ListItem button onClick={onLogout}>
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
      dispatch(apiRequestClear('USER'));
      dispatch(setAuthStatus(res.status));
      dispatch(toggleAppLoader(false));
    });
  }
}

export default connect(store => ({
  authStatus: store.app.authStatus,
  showDrawer: store.app.showDrawer,
  user: store.api.user
}))(AppDrawer);