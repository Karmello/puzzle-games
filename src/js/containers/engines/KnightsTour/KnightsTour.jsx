// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/components';
import { initEngine, moveKnight, resetEngine } from 'js/actions/knightsTour';
import { indexToCoords, findAllMovementCoords } from 'js/extracts/gridGameBoard';

class KnightsTour extends Game {

  dimension:number;
  squareSize:number;
  knightImgPath:string;
  okArrowImgPath:string;

  constructor(props) {
    super(props);
    this.dimension = 8;
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
        dimension={this.dimension}
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
    
    const { knightsTourEngine: { active } } = this.props;
    const newCoords = indexToCoords(index, this.dimension);
    const allMovementCoords = findAllMovementCoords(indexToCoords(active, this.dimension), this.dimension, 'CHESS_KNIGHT');

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
    return new Promise(resolve => {
      Promise.all([this.loadImg(this.knightImgPath), this.loadImg(this.okArrowImgPath)]).then(() => {
        const visited = Array.from({ length: this.dimension ** 2 }, () => false);
        const active = Math.floor(Math.random() * this.dimension ** 2);
        visited[active] = true;
        this.props.dispatch(initEngine(visited, active));
        resolve();
      });
    });
  };

  checkIfSolved = () => {
    return new Promise(resolve => {
      resolve(false);
    });
  };
}

export default connect(store => ({
  clientUser: store.api.clientUser,
  game: store.game,
  knightsTourEngine: store.engines['knights-tour']
}))(KnightsTour);