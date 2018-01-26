import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';
import ContentPasteIcon from 'material-ui-icons/ContentPaste';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import './AppDrawer.css';


export default class AppDrawer extends Component {
  
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

    const { authStatus, showDrawer, userData, onDrawerClose, onLogout } = this.props;
    const avatar = this.state.avatar;

    return (
      <Drawer
        className='AppDrawer'
        open={showDrawer}
        onClose={() => { onDrawerClose(); }}
      >
        {userData && avatar &&
        <div className='AppDrawer-user'>
          <div>{avatar && <img src={avatar.url} alt='' title={userData.fb.name} />}</div>
          <div>{userData.fb.name}</div>
        </div>}
        <div
          tabIndex={0}
          role='button'
          onClick={() => { onDrawerClose(); }}
          onKeyDown={() => { onDrawerClose(); }}
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
}