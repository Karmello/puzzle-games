// @flow
import { Component } from 'react';

import { App } from 'js/containers';
import { stopGameLoader, makeMove, setAsSolved } from 'js/actions/game';
import type {
  T_GameState,
  T_BossPuzzleEngine,
  T_EightQueensEngine,
  T_KnightsTourEngine,
  T_SudokuEngine,
  T_TetrisEngine
} from 'js/flow-types';

type Props = {
  dispatch:Function,
  clientUser:any,
  game:T_GameState,
  bossPuzzleEngine:T_BossPuzzleEngine,
  eightQueensEngine:T_EightQueensEngine,
  knightsTourEngine:T_KnightsTourEngine,
  sudokuEngine:T_SudokuEngine,
  tetrisEngine:T_TetrisEngine
};

type State = {
  imgSrc:string,
  disabledIndexes:Array<number>
};

export default class Game extends Component<Props, State> {

  startNew:(doRestart?:boolean) => Promise<any>;
  checkIfSolved:() => Promise<any>;

  state = {
    imgSrc: '',
    disabledIndexes: []
  };

  componentDidMount() {
    this.startNew().then(() => this.onFinishInit());
  }

  componentWillReceiveProps(nextProps:Props) {
    
    const { game } = this.props;
    const nextGame = nextProps.game;

    // on restarting
    if (!game.isLoading && nextGame.isLoading) {
      this.setState({ imgSrc: '' });
      this.startNew(nextProps.game.doRestart).then(() => this.onFinishInit());
    
    // on move made
    } else if (nextGame.moves > 0 && nextGame.moves - game.moves === 1) {
      this.checkIfSolved().then(solved => {
        if (solved) {
          const { dispatch } = this.props;
          dispatch(setAsSolved());
        }
      });
    }
  }
  
  render() {
    return super.render();
  }

  onFinishInit() {
    setTimeout(() => {
      this.props.dispatch(stopGameLoader());
    }, App.minLoadTime);
  }

  onMakeMove() {
    setTimeout(() => this.props.dispatch(makeMove()));
  }

  loadImg(imgPath:string):Promise<any> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `${process.env.REACT_APP_S3_BUCKET || ''}/${imgPath}`;
      img.onload = () => {
        this.setState({ imgSrc: img.src });
        resolve();
      };
      img.onerror = err => { reject(err); }
    });
  }
}
