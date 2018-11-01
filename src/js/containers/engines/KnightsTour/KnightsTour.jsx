// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { Game, GridBoard } from 'js/components';
import { initEngine, moveKnight, resetEngine } from 'js/actions/knightsTour';
import { indexToCoords, findAllMovementCoords } from 'js/extracts/gridBoard';

class KnightsTour extends Game {

  elementSize:number;
  knightImgPath:string;
  okArrowImgPath:string;

  constructor(props) {
    super(props);
    this.elementSize = 75;
    this.knightImgPath = 'knights-tour/knight.jpg';
    this.okArrowImgPath = 'knights-tour/ok_arrow.png';
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  renderElement(active:number) {
    return props => {
      const { getKnightBtnStyle, getVisitedBtnStyle } = this;
      return (
        <Button
          disabled
          disableRipple
          style={props.index === active ? getKnightBtnStyle() : getVisitedBtnStyle()}
        > </Button>
      );
    }
  }

  render() {
    const { game, knightsTourEngine } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridBoard
        dimension={Number(game.options.dimension)}
        isChessBoard={true}
        data={knightsTourEngine.visited}
        element={{
          size: this.elementSize,
          Element: this.renderElement(knightsTourEngine.active)
        }}
        callback={{
          onMoveTry: this.onMoveTry.bind(this),
          onMoveDone: this.onMoveDone.bind(this)
        }}
      />
    );
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
    return super.onMakeMove();
  }

  startNew = () => {
    const { dispatch, game: { options: { dimension } } } = this.props;
    return new Promise(resolve => {
      Promise.all([this.loadImg(this.knightImgPath), this.loadImg(this.okArrowImgPath)]).then(() => {
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

  getKnightBtnStyle = () => {
    return  {
      minWidth: `${this.elementSize}px`,
      height: `${this.elementSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${this.knightImgPath})`,
      backgroundSize: `${this.elementSize-2}px ${this.elementSize-2}px`,
      backgroundColor: 'white'
    }
  };

  getVisitedBtnStyle = () => {
    return  {
      minWidth: `${this.elementSize}px`,
      height: `${this.elementSize}px`,
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${this.okArrowImgPath})`,
      backgroundSize: `${this.elementSize-2}px ${this.elementSize-2}px`
    }
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  knightsTourEngine: store.engines['knights-tour']
}))(KnightsTour);