// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { GameMenu } from 'js/components';
import { startGame } from 'js/actions/game';
import { toggleAppDrawer } from 'js/actions/app';

import type { T_GameState } from 'js/flow-types';

import './AppBar.css';

type Props = {
  appName:string,
  showDrawer:boolean,
  game:T_GameState,
  gameCategory:string,
  dispatch:Function
};

class AppBar extends Component<Props> {

  render() {
    const { appName, game, gameCategory } = this.props;
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
          {game.id && <GameMenu
            gameCategory={gameCategory}
            onItemClick={this.onMenuItemClick.bind(this)}
            showRestartBtn={game.id === 'boss-puzzle' && game.options.mode ==='IMG'}
          />}
        </Toolbar>
      </MaterialAppBar>
    );
  }

  onDrawerIconClick() {
    const { dispatch, showDrawer } = this.props;
    dispatch(toggleAppDrawer(!showDrawer));
  }

  onMenuItemClick(itemId:string) {
    const { dispatch, game } = this.props;
    dispatch(startGame(game.id, game.options, itemId === 'RESTART'));
  }
}

export default connect(store => ({
  appName: store.app.title,
  showDrawer: store.app.showDrawer,
  game: store.game,
  gameCategory: store.pages.gamesPage.category
}))(AppBar);