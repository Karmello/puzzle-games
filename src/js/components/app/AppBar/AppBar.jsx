import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { GameMenu } from 'js/components/game';
import { toggleAppDrawer } from 'js/actions/app';
import { startGame } from 'js/actions/game';
import './AppBar.css';


class AppBar extends Component {

  render() {

    const { appName, gameId } = this.props;

    return (
      <MaterialAppBar className='AppBar' position='static' color='primary'>
        <Toolbar>
          <IconButton
            color='contrast'
            aria-label='Menu'
            onClick={this.onDrawerIconClick.bind(this)}
          ><MenuIcon/></IconButton>
          <Typography
            className='AppBar-typography'
            type='title'
            color='inherit'
          >{appName}</Typography>
          {gameId && <GameMenu onItemClick={(itemId) => { this.onGameMenuItemClick(itemId); }} />}
        </Toolbar>
      </MaterialAppBar>
    );
  }

  onDrawerIconClick() {

    const { dispatch, showDrawer } = this.props;
    dispatch(toggleAppDrawer(!showDrawer));
  }

  onGameMenuItemClick(itemId) {

    if (itemId === 'NEW') {
      const { dispatch, gameId } = this.props;
      dispatch(startGame(gameId));
    }
  }
}

export default connect(store => ({
  appName: store.app.name,
  showDrawer: store.app.showDrawer,
  gameId: store.game.id
}))(AppBar);