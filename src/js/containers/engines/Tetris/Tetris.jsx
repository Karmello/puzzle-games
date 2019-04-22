// @flow
import React from 'react';
import { connect } from 'react-redux';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { C_Tetris } from 'js/constants';
import { initEngine, updateEngine, resetEngine } from 'js/actions/tetris';

import './Tetris.css';

const { dimension, elementSize, minElemSize } = C_Tetris;

class Tetris extends Game {

  static renderElement() {
    return (props:{ style: {} }) => {
      return (
        <div style={props.style}> </div>
      );
    }
  }

  static getElementStyle() {
    return {
      backgroundColor: 'lightblue'
    };
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return (
      <div className='Tetris'>
        <GridBoard
          dimension={dimension}
          gridMap={this.createGridMap()}
          element={{
            size: elementSize,
            minSize: minElemSize,
            Element: Tetris.renderElement(),
            getStyle: Tetris.getElementStyle.bind(this)
          }}
        />
      </div>
    );
  }

  createGridMap() {
    const { blocks } = this.props.tetrisEngine;
    const gridMap = [];
    blocks.forEach((renderBlock, i) => {
      gridMap[i] = renderBlock;
    });
    return gridMap;
  }

  startNew = () => {
    const { dispatch } = this.props;
    let intervalId;
    let index = 0;
    return new Promise(resolve => {
      const blocks = Array.from({ length: dimension.x * dimension.y }, () => false);
      dispatch(initEngine(blocks));
      intervalId = setInterval(() => {
        if (index < dimension.x * dimension.y) {
          blocks[index] = true;
          if (index > 0) { blocks[index - 1] = false; }
          index++;
        } else {
          clearInterval(intervalId);
        }
        dispatch(updateEngine(blocks));
      }, 100);
      resolve();
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  tetrisEngine: store.engines['tetris']
}))(Tetris);
