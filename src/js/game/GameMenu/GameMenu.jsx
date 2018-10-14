// @flow

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

import type { Event } from 'types/other';

type Props = {
  gameCategory:string,
  showRestartBtn:Boolean,
  onItemClick:Function
};

type State = {
  btnElem:any
};

export default class GameMenu extends Component<Props, State> {
  
  setup:(e?:Event) => null;
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
          onClick={(e) => { this.setup(e) }}
        >Game</Button>
        <Menu
          id='gameMenu'
          anchorEl={btnElem}
          open={Boolean(btnElem)}
          onClose={() => { this.setup() }}
        >
          <MenuItem
            style={this.getItemStyle()}
            onClick={() => { this.onItemClick('NEW') }}
          >New</MenuItem>
          {showRestartBtn && <MenuItem
            style={this.getItemStyle()}
            onClick={() => { this.onItemClick('RESTART') }}
          >Restart</MenuItem>}
          <MenuItem
            style={this.getItemStyle()}
            component={Link}
            to={`/games/${gameCategory}`}
            onClick={() => { this.onItemClick() }}
          >End</MenuItem>
        </Menu>
      </div>
    );
  }
  
  getItemStyle() {
    return {
      width: '65px'
    }
  }

  setup(e:Event) {
    this.setState({
      btnElem: e ? e.currentTarget : null
    });
  }

  onItemClick(itemId:string) {
    this.setup();
    if (itemId) { this.props.onItemClick(itemId); }
  }
}