import { Component } from 'react';

import { App } from 'js/app';
import { saveNewHighscore } from 'js/api/api.actions';
import { stopGameLoader, makeMove, setAsSolved } from 'js/game/game.actions';
import { coordsToIndex, indexToCoords, findAllMovementCoords } from 'js/game/Game/Game.logic';


export default class Game extends Component {
  
  static coordsToIndex = coordsToIndex;
  static indexToCoords = indexToCoords;
  static findAllMovementCoords = findAllMovementCoords;

  state = { imgSrc: null }

  componentDidMount() {
    this.startNew().then(() => this.onFinishInit());
  }

  componentWillReceiveProps(nextProps) {
    
    const { game } = this.props;
    const nextGame = nextProps.game;

    // on restarting
    if (!game.isLoading && nextGame.isLoading) {
      this.setState({ imgSrc: null });
      this.startNew(nextProps.restarting).then(() => this.onFinishInit());
    
    // on move made
    } else if (nextGame.moves > 0 && nextGame.moves - game.moves === 1) {
      this.checkIfSolved().then(solved => {
        if (solved) {
          const { clientUser, gameApiData, readTimer, dispatch } = this.props;
          dispatch(setAsSolved());
          dispatch(saveNewHighscore({
            userId: clientUser.res.data._id,
            gameId: gameApiData._id,
            options: game.options,
            details: { moves: game.moves, seconds: readTimer().seconds }
          }));
        }
      });
    }
  }

  render() {
    return super.render();
  }

  onFinishInit() {
    setTimeout(() => { this.props.dispatch(stopGameLoader()); }, App.minLoadTime);
  }

  onMakeMove() {
    this.props.dispatch(makeMove());
  }

  loadImg(imgPath) {

    return new Promise((resolve, reject) => {

      const img = new Image();
      img.src = `${process.env.REACT_APP_S3_BUCKET}/${imgPath}`;
        
      img.onload = () => {
        this.setState({ imgSrc: img.src });
        resolve();
      }

      img.onerror = (err) => { reject(err); }
    });
  }
}