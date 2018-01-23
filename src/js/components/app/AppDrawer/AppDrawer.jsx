import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, List } from 'material-ui';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PowerSettingsNewIcon from 'material-ui-icons/PowerSettingsNew';

import { toggleAppDrawer } from 'js/actions';
import './AppDrawer.css';


class AppDrawer extends Component {
  
  render() {

    const { showDrawer, onLogout } = this.props;

    return (
      <Drawer
        className='AppDrawer'
        open={showDrawer}
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
              <ListItem button onClick={onLogout}>
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
}

export default connect(store => ({
  showDrawer: store.app.showDrawer
}))(AppDrawer);