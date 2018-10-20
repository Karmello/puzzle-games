// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'material-ui';

import { Game, GridGameBoard } from 'js/components';
import { initFrame, resetFrame } from 'js/actions/knightsTour';

class KnightsTour extends Game {

  dimension:number;
  squareSize:number;

  constructor(props) {
    super(props);
    this.dimension = 8;
    this.squareSize = 75;
  }

  componentWillUnmount() {
    this.props.dispatch(resetFrame());
  }

  render() {
    const { game, knightsTourEngine } = this.props;
    if (game.isLoading) { return null; }
    return (
      <GridGameBoard
        dimension={this.dimension}
        squareSize={this.squareSize}
        Square={() => <Button disabled disableRipple style={this.getBtnStyle()}> </Button>}
        isChessBoard={true}
        gridData={knightsTourEngine.visited}
        onDragMade={this.onMoveMade.bind(this)}
        onEmptyBoardClick={index => { console.log(index); }}
      />
    );
  }

  onMoveMade() {
    // this.props.dispatch(moveQueen(fromIndex, toIndex));
    super.onMakeMove();
  }

  getBtnStyle() {
    return  {
      minWidth: `${this.squareSize}px`,
      height: `${this.squareSize}px`,
      border: '1px solid gray',
      borderRadius: '0px',
      backgroundImage: `url(${process.env.REACT_APP_S3_BUCKET || ''}/knights-tour/knight.jpg)`,
      backgroundSize: `${this.squareSize-2}px ${this.squareSize-2}px`,
      backgroundColor: 'white'
    }
  }

  startNew = () => {
    return new Promise(resolve => {
      this.loadImg('knights-tour/knight.jpg').then(() => {
        const visited = Array.from({ length: this.dimension ** 2 }, () => {
          return false;
        });
        visited[2] = true;
        this.props.dispatch(initFrame(visited));
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