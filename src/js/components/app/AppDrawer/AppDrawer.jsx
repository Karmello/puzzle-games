import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PlayCircleOutlineIcon from 'material-ui-icons/PlayCircleOutline';
import ContentPasteIcon from 'material-ui-icons/ContentPaste';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import { toggleAppDrawer } from 'js/actions';
import './AppDrawer.css';


class AppDrawer extends Component {
  
  constructor(props) {
    super(props);
    this.state = { avatar: undefined };
  }

  componentWillUpdate(nextProps, nextState) {

    if (nextProps.user.data) {
      window.FB.api(`/${nextProps.user.data.fb.id}/picture`, 'GET', {}, res => {
        if (res.data && !res.data.is_silhouette) {
          this.setState({ avatar: res.data });
        }
      });
    }
  }

  render() {

    const { app, user, onLogout } = this.props;
    const avatar = this.state.avatar;

    return (
      <Drawer
        className='AppDrawer'
        open={app.showDrawer}
        onClose={this.closeDrawer.bind(this)}
      >
        {user.data && avatar &&
        <div className='AppDrawer-user'>
          <div>{avatar && <img src={avatar.url} alt='' title={user.data.fb.name} />}</div>
          <div>{user.data.fb.name}</div>
        </div>}
        <div
          tabIndex={0}
          role='button'
          onClick={this.closeDrawer.bind(this)}
          onKeyDown={this.closeDrawer.bind(this)}
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
              {app.authStatus === 'connected' && <ListItem button onClick={onLogout}>
                <ListItemIcon><PowerSettingsNewIcon/></ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>}
            </List>
          </div>
        </div>
      </Drawer>
    );
  }

  closeDrawer() {
    
    this.props.dispatch(toggleAppDrawer(false));
  }
}

export default connect(store => ({
  app: store.app,
  user: store.api.user
}))(AppDrawer);