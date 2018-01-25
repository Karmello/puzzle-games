import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppBar as MaterialAppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

import { GameMenu } from 'js/components';
import { toggleAppDrawer, startGame } from 'js/actions';
import './AppBar.css';


class AppBar extends Component {

  render() {

    const { app, game } = this.props;

    return (
      <MaterialAppBar className='AppBar' position='static' color='primary'>
        <Toolbar>
          <IconButton
            color='contrast'
            aria-label='Menu'
            onClick={this.onAppDrawerIconClick.bind(this)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            className='AppBar-typography'
            type='title'
            color='inherit'
          >{app.name}</Typography>
          {game.id && <GameMenu {...this.props} onItemClick={this.onGameMenuItemClick.bind(this)} />}
        </Toolbar>
      </MaterialAppBar>
    );
  }

  onAppDrawerIconClick() {

    const { app, dispatch } = this.props;
    dispatch(toggleAppDrawer(!app.showDrawer));
  }

  onGameMenuItemClick(itemId) {

    const { game, dispatch } = this.props;

    switch (itemId) {

      case 'NEW':
        dispatch(startGame(game.id));
        break;

      default:
        break;
    }
  }
}

export default connect(store => store)(AppBar);