// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { GridBoard } from 'js/containers';
import { Game } from 'js/components';
import { initEngine, moveKnight, resetEngine } from 'js/actions/knightsTour';
import { indexToCoords, findAllMovementCoords } from 'js/extracts/gridBoard';

import { C_KnightsTour } from 'js/constants';

const { elementSize, imgPaths } = C_KnightsTour;

type Props = { index:number, active:number };
type State = { buttonStyle:Object };

class Element extends React.Component<Props, State> {

  state = { buttonStyle: {} };

  componentWillMount() {
    this.setState({ buttonStyle: this.getKnightBtnStyle() });
  }

  componentWillReceiveProps(nextProps:Props) {
    const { index, active } = nextProps;
    const { getKnightBtnStyle, getVisitedBtnStyle } = this;
    if (index === active) {
      this.setState({ buttonStyle: getKnightBtnStyle() });
    } else {
      this.setState({ buttonStyle: getVisitedBtnStyle() });
    }
  }

  render() {
    const { buttonStyle } = this.state;
    return (
      <Button
        disabled
        disableRipple
        style={buttonStyle}
      > </Button>
    );
  }

  getKnightBtnStyle() {
    return  {
      minWidth: `${elementSize}px`,
      height: `${elementSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${imgPaths.knight})`,
      backgroundSize: `${elementSize-2}px ${elementSize-2}px`
    }
  }

  getVisitedBtnStyle() {
    return  {
      minWidth: `${elementSize}px`,
      height: `${elementSize}px`,
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${imgPaths.okArrow})`,
      backgroundSize: `${elementSize-2}px ${elementSize-2}px`
    }
  }
}

const ConnectedElement = connect(store => ({
  active: store.engines['knights-tour'].active
}))(Element);

class KnightsTour extends Game {

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={Number(game.options.dimension)}
        isChessBoard={true}
        gridMap={this.createGridMap()}
        element={{
          size: elementSize,
          Element: ConnectedElement
        }}
        callback={{
          onMoveTry: this.onMoveTry.bind(this),
          onMoveDone: this.onMoveDone.bind(this)
        }}
      />
    );
  }

  createGridMap() {
    const { visited } = this.props.knightsTourEngine;
    const gridMap = {};
    visited.forEach((isVisited, i) => {
      gridMap[i] = { isOccupied: isVisited };
    });
    return gridMap;
  }

  onMoveTry(selectedIndex:number, clickedIndex:number) {
    
    const { knightsTourEngine: { active }, game: { options: { dimension } } } = this.props;
    const newCoords = indexToCoords(clickedIndex, Number(dimension));
    const allMovementCoords = findAllMovementCoords(indexToCoords(active, Number(dimension)), Number(dimension), 'CHESS_KNIGHT');

    for (let coords of allMovementCoords) {
      if (coords.x === newCoords.x && coords.y === newCoords.y) {
        return true;
      }
    }

    return false;
  }

  onMoveDone(selectedIndex:number, clickedIndex:number) {
    this.props.dispatch(moveKnight(clickedIndex));
    super.onMakeMove();
  }

  startNew = () => {
    const { dispatch, game: { options: { dimension } } } = this.props;
    return new Promise(resolve => {
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