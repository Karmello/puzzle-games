import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { toggleAppDrawer } from 'js/app/app.actions';
import './AppBar.css';


class AppBar extends Component {

  render() {

    const { appName } = this.props;

    return (
      <MaterialAppBar className='AppBar' position='static' color='primary'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='Menu'
            onClick={this.onDrawerIconClick.bind(this)}
          ><MenuIcon/></IconButton>
          <Typography
            className='AppBar-typography'
            variant='title'
            color='inherit'
          >{appName}</Typography>
        </Toolbar>
      </MaterialAppBar>
    );
  }

  onDrawerIconClick() {

    const { dispatch, showDrawer } = this.props;
    dispatch(toggleAppDrawer(!showDrawer));
  }
}

export default connect(store => ({
  appName: store.app.title,
  showDrawer: store.app.showDrawer
}))(AppBar);