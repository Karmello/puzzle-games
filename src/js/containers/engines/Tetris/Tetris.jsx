// @flow
import React from 'react';
import { connect } from 'react-redux';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { C_Tetris } from 'js/constants';

const { dimension, elementSize, minElemSize } = C_Tetris;

class Tetris extends Game {

  componentWillUnmount() {
    // this.props.dispatch(resetEngine());
  }

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={dimension}
        gridMap={this.createGridMap()}
        element={{
          size: elementSize,
          minSize: minElemSize,
          Element: this.renderElement(),
          getStyle: this.getElementStyle.bind(this)
        }}
      />
    );
  }

  renderElement() {
    return props => {
      return (
        <div style={props.style}> </div>
      );
    }
  }

  createGridMap() {
    const gridMap = [];
    Array.from({ length: dimension.x * dimension.y }).forEach((value, key) => {
      gridMap[key] = true;
    });
    return gridMap;
  }

  getElementStyle({ size }) {
    const style = {
      minWidth: `${size}px`,
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: 'black'
    };
    return style;
  }

  startNew = () => {
    return new Promise(resolve => {
      resolve();
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  tetrisEngine: store.engines['tetris']
}))(Tetris);