import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { GameMenu } from 'js/game';
import { startGame } from 'js/game/game.actions';
import { toggleAppDrawer } from 'js/app/app.actions';
import './AppBar.css';


class AppBar extends Component {

  render() {
    const { appName, game, apiGames } = this.props;
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
            gameCategory={apiGames.res.data.find(elem => elem.id === game.id).categoryId}
            onItemClick={itemId => { this.onMenuItemClick(itemId); }}
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

  onMenuItemClick(itemId) {
    const { dispatch, game } = this.props;
    dispatch(startGame(game.id, game.options, itemId === 'RESTART'));
  }
}

export default connect(store => ({
  appName: store.app.title,
  showDrawer: store.app.showDrawer,
  game: store.game,
  apiGames: store.api.games
}))(AppBar);