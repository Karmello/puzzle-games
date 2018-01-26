import React from 'react';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { GameMenu } from 'js/components';
import './AppBar.css';


export default (props) => (
  <MaterialAppBar className='AppBar' position='static' color='primary'>
    <Toolbar>
      <IconButton
        color='contrast'
        aria-label='Menu'
        onClick={() => { props.onDrawerIconClick(); }}
      ><MenuIcon/></IconButton>
      <Typography
        className='AppBar-typography'
        type='title'
        color='inherit'
      >{props.appName}</Typography>
      {props.gameId &&
      <GameMenu onItemClick={(itemId) => { props.onGameMenuItemClick(itemId); }} />}
    </Toolbar>
  </MaterialAppBar>
);