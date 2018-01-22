import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import { setAuthStatus, toggleAppDrawer, toggleAppLoader } from 'js/actions';
import './AppDrawer.css';


class AppDrawer extends Component {
  
  render() {

    const { app } = this.props;

    return (
      <Drawer
        className='AppDrawer'
        open={app.showAppDrawer}
        onClose={this.closeDrawer.bind(this)}
      >
        <div
          tabIndex={0}
          role='button'
          onClick={this.closeDrawer.bind(this)}
          onKeyDown={this.closeDrawer.bind(this)}
        >
          <div className='AppDrawer-content'>
            <List>
              <ListItem button onClick={this.onItemClick.bind(this)}>
                <ListItemIcon>
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    );
  }

  closeDrawer() {
    
    this.props.dispatch(toggleAppDrawer(false));
  }

  onItemClick() {

    const { dispatch } = this.props;
    dispatch(toggleAppLoader(true));
    window.FB.logout(res => dispatch(setAuthStatus(res.status)));
  }
}

export default connect(store => store)(AppDrawer);