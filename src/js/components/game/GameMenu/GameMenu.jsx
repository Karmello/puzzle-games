// @flow
import * as React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'material-ui';
import MenuItem from 'material-ui/Menu/MenuItem';

import type { T_Event } from 'js/flow-types';

type Props = {
  gameCategory:string,
  showRestartBtn:boolean,
  onItemClick:Function
};

type State = {
  btnElem:React.Node
};

export default class GameMenu extends Component<Props, State> {
  
  setup:(e?:T_Event) => null;
  onItemClick:(itemId?:string) => null;

  componentWillMount() {
    this.setup();
  }

  render() {

    const { btnElem } = this.state;
    const { gameCategory, showRestartBtn } = this.props;

    return (
      <div className='GameMenu'>
        <Button
          variant='raised'
          color='primary'
          aria-owns={btnElem ? 'gameMenu' : null}
          aria-haspopup='true'
          onClick={this.onMenuShow.bind(this)}
        >Game</Button>
        <Menu
          id='gameMenu'
          anchorEl={btnElem}
          open={Boolean(btnElem)}
          onClose={this.onMenuClose.bind(this)}
        >
          <MenuItem
            style={this.getItemStyle()}
            onClick={this.onNewBtnClick.bind(this)}
          >New</MenuItem>
          {showRestartBtn && <MenuItem
            style={this.getItemStyle()}
            onClick={this.onRestartBtnClick.bind(this)}
          >Restart</MenuItem>}
          <MenuItem
            style={this.getItemStyle()}
            component={Link}
            to={`/games/${gameCategory}`}
            onClick={this.onEndBtnClick.bind(this)}
          >End</MenuItem>
        </Menu>
      </div>
    );
  }

  setup(e:T_Event) {
    this.setState({ btnElem: e ? e.currentTarget : null });
  }

  onItemClick(itemId:string) {
    this.setup();
    if (itemId) { this.props.onItemClick(itemId); }
  }

  onMenuShow(e:T_Event) {
    this.setup(e);
  }

  onMenuClose() {
    this.setup();
  }

  onNewBtnClick() {
    this.onItemClick('NEW');
  }

  onRestartBtnClick() {
    this.onItemClick('RESTART');
  }

  onEndBtnClick() {
    this.onItemClick.bind(this);
  }

  getItemStyle() {
    return {
      width: '65px'
    }
  }
}