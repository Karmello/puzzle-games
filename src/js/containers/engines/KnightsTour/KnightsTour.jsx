// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, moveKnight, resetEngine } from 'js/actions/knightsTour';
import { indexToCoords, findAllMovementCoords } from 'js/extracts/gridBoard';
import { C_KnightsTour } from 'js/constants';

const { elementSize, imgPaths } = C_KnightsTour;

class KnightsTour extends Game {

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={{ x: Number(game.options.dimension), y: Number(game.options.dimension) }}
        isChessBoard={true}
        gridMap={this.createGridMap()}
        element={{
          size: elementSize,
          Element: this.renderElement(),
          getStyle: this.getElementStyle.bind(this)
        }}
        callback={{
          onEmptyCellClick: this.onMoveTry.bind(this)
        }}
      />
    );
  }

  renderElement() {
    return props => (
      <Button
        disabled
        disableRipple
        style={props.style}
      > </Button>
    );
  }

  createGridMap() {
    const { visited } = this.props.knightsTourEngine;
    const gridMap = [];
    visited.forEach((isVisited, i) => {
      gridMap[i] = isVisited;
    });
    return gridMap;
  }

  onMoveTry(toIndex:number) {
    
    const { knightsTourEngine: { active }, game: { options: { dimension } } } = this.props;
    const newCoords = indexToCoords(toIndex, Number(dimension));
    const allMovementCoords = findAllMovementCoords(indexToCoords(active, Number(dimension)), Number(dimension), 'CHESS_KNIGHT');

    for (let coords of allMovementCoords) {
      if (coords.x === newCoords.x && coords.y === newCoords.y) {
        this.props.dispatch(moveKnight(toIndex));
        return super.onMakeMove();
      }
    }
  }

  getElementStyle({ index, size }) {
    const { active } = this.props.knightsTourEngine;
    if (index === active) {
      return  {
        border: '1px solid gray',
        borderRadius: '0px',
        backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${imgPaths.knight})`,
        backgroundSize: `${size-2}px ${size-2}px`
      }
    } else {
      return  {
        backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${imgPaths.okArrow})`,
        backgroundSize: `${size-2}px ${size-2}px`
      }
    }
  }
  
  startNew = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const { dispatch, game: { options: { dimension } } } = this.props;
        Promise.all([this.loadImg(imgPaths.knight), this.loadImg(imgPaths.okArrow)]).then(() => {
          const visited = Array.from({ length: Number(dimension) ** 2 }, () => false);
          let active;
          switch (dimension) {
            case '5':
              // <0 - dimension^2-1> (even only)
              active = Math.floor(Math.random() * ((Number(dimension) ** 2)/2)) * 2;
              break;
            default:
              // <0 - dimension^2-1>
              active = Math.floor(Math.random() * Number(dimension) ** 2);
              break;
          }
          visited[active] = true;
          dispatch(initEngine(visited, active));
          resolve();
        });
      });
    });
  };

  checkIfSolved = () => {
    return new Promise(resolve => {
      const { knightsTourEngine: { visited } } = this.props;
      if (visited.every(elem => elem)) { return resolve(true); }
      resolve(false);
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  knightsTourEngine: store.engines['knights-tour']
}))(KnightsTour);