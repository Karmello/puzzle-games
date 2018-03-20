import { Component } from 'react';

import { App } from 'js/app';
import { fetchHighscore, saveNewHighscore } from 'js/api/api.actions';
import { stopGameLoader, makeMove, setAsSolved } from 'js/game/game.actions';


export default class Game extends Component {

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
      this.startNew(nextProps.game.doRestart).then(() => this.onFinishInit());
    
    // on move made
    } else if (nextGame.moves > 0 && nextGame.moves - game.moves === 1) {
      this.checkIfSolved().then(solved => {
        if (solved) {
          const { clientUser, gameApiData, readTimer, dispatch } = this.props;
          dispatch(setAsSolved());
          dispatch(saveNewHighscore({
            username: clientUser.res.data.username,
            gameId: gameApiData.id,
            options: game.options,
            details: { moves: nextGame.moves, seconds: readTimer().seconds }
          }));
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