import React, { Component } from 'react';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { GameMenu } from 'js/components';
import './AppBar.css';


export default class AppBar extends Component {

  render() {

    const { appName, gameId, onDrawerIconClick, onGameMenuItemClick } = this.props;

    return (
      <MaterialAppBar className='AppBar' position='static' color='primary'>
        <Toolbar>
          <IconButton
            color='contrast'
            aria-label='Menu'
            onClick={() => { onDrawerIconClick(); }}
          ><MenuIcon/></IconButton>
          <Typography
            className='AppBar-typography'
            type='title'
            color='inherit'
          >{appName}</Typography>
          {gameId && <GameMenu onItemClick={(itemId) => { onGameMenuItemClick(itemId); }} />}
        </Toolbar>
      </MaterialAppBar>
    );
  }
}