// @flow
import { Component } from 'react';

import { App } from 'js/containers';
import { fetchHighscore, saveNewHighscore } from 'js/actions/api';
import { stopGameLoader, makeMove, setAsSolved } from 'js/actions/game';
import type { T_GameSettings, T_BossPuzzleEngine, T_EightQueensEngine, T_SudokuEngine } from 'js/flow-types';

type Props = {
  dispatch:Function,
  readTimer:Function,
  clientUser:any,
  game:T_GameSettings,
  bossPuzzleEngine:T_BossPuzzleEngine,
  eightQueensEngine:T_EightQueensEngine,
  sudokuEngine:T_SudokuEngine
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
          const { clientUser, readTimer, dispatch } = this.props;
          dispatch(setAsSolved());
          dispatch(saveNewHighscore({
            username: clientUser.res.data.username,
            gameId: nextGame.id,
            options: game.options,
            details: { moves: nextGame.moves, seconds: readTimer().seconds }
          })).then(action => {
            if (action.payload.status === 200) {
              dispatch(fetchHighscore(nextGame.id, nextGame.options))
            }
          });
        }
      });
    }
  }
  
  render() {
    return super.render();
  }

  onFinishInit() {
    setTimeout(() => {
      const { dispatch, game } = this.props;
      dispatch(fetchHighscore(game.id, game.options)).then(() => dispatch(stopGameLoader()));
    }, App.minLoadTime);
  }

  onMakeMove() {
    setTimeout(() => {
      this.props.dispatch(makeMove());
    });
  }

  loadImg(imgPath:string) {

    return new Promise((resolve, reject) => {

      const img = new Image();
      img.src = `${process.env.REACT_APP_S3_BUCKET || ''}/${imgPath}`;
        
      img.onload = () => {
        this.setState({ imgSrc: img.src });
        resolve();
      }

      img.onerror = (err) => { reject(err); }
    });
  }
}