import React, { Component } from 'react';
import { Button, Menu } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';

import './GameMenu.css';


export default class GameMenu extends Component {
  
  componentWillMount() {
    this.setup();
  }

  render() {

    const { btnElem } = this.state;

    return (
      <div className='GameMenu'>
        <Button
          raised
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
          <MenuItem style={this.getItemStyle()} onClick={() => { this.onItemClick('NEW') }}>New</MenuItem>
          <MenuItem style={this.getItemStyle()} onClick={() => { this.onItemClick('END') }}>End</MenuItem>
        </Menu>
      </div>
    );
  }
  
  getItemStyle() {
    return {
      width: '100px'
    }
  }

  setup(e) {

    this.setState({
      btnElem: e ? e.currentTarget : null
    });
  }

  onItemClick(itemId) {

    this.setup();
    this.props.onItemClick(itemId);
  }
}