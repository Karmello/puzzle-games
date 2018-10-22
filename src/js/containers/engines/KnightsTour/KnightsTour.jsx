// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/components';
import { initEngine, moveKnight, resetEngine } from 'js/actions/knightsTour';
import { indexToCoords, findAllMovementCoords } from 'js/extracts/gridGameBoard';

class KnightsTour extends Game {

  squareSize:number;
  knightImgPath:string;
  okArrowImgPath:string;

  constructor(props) {
    super(props);
    this.squareSize = 75;
    this.knightImgPath = 'knights-tour/knight.jpg';
    this.okArrowImgPath = 'knights-tour/ok_arrow.png';
  }

  componentWillUnmount() {
    this.props.dispatch(resetEngine());
  }

  render() {
    const { game, knightsTourEngine } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridGameBoard
        dimension={Number(game.options.dimension)}
        squareSize={this.squareSize}
        Square={props => (
          <Button
            disabled
            disableRipple
            style={props.index === knightsTourEngine.active ? this.getKnightBtnStyle() : this.getVisitedBtnStyle()}
          > </Button>
        )}
        isChessBoard={true}
        gridData={knightsTourEngine.visited}
        onEmptyCellClick={index => this.onEmptyCellClick(index)}
      />
    );
  }

  onEmptyCellClick(index:number) {
    
    const { knightsTourEngine: { active }, game: { options: { dimension } } } = this.props;
    const newCoords = indexToCoords(index, Number(dimension));
    const allMovementCoords = findAllMovementCoords(indexToCoords(active, Number(dimension)), Number(dimension), 'CHESS_KNIGHT');

    for (let coords of allMovementCoords) {
      if (coords.x === newCoords.x && coords.y === newCoords.y) {
        this.props.dispatch(moveKnight(index));
        return super.onMakeMove();
      }
    }
  }

  getKnightBtnStyle() {
    return  {
      minWidth: `${this.squareSize}px`,
      height: `${this.squareSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${this.knightImgPath})`,
      backgroundSize: `${this.squareSize-2}px ${this.squareSize-2}px`,
      backgroundColor: 'white'
    }
  }

  getVisitedBtnStyle() {
    return  {
      minWidth: `${this.squareSize}px`,
      height: `${this.squareSize}px`,
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/${this.okArrowImgPath})`,
      backgroundSize: `${this.squareSize-2}px ${this.squareSize-2}px`
    }
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
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  knightsTourEngine: store.engines['knights-tour']
}))(KnightsTour);