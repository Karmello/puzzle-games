import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Chip } from 'material-ui';

import { App } from 'js/containers';
import { BossPuzzle, Loader, GamesList, Timer } from 'js/components';
import { initFrame, resetFrame, setAsSolved, toggleGameLoader } from 'js/actions';
import * as GameMethods from './Game.methods';
import './Game.css';


class Game extends Component {
  
  static numOfImgs = 15;

  constructor(props) {

    super(props);
    this.state = { isImgLoaded: false };

    for (const methodName in GameMethods) {
      this[methodName] = GameMethods[methodName];
    }
  }

  componentWillUpdate(nextProps, nextState) {

    const { games, game, dispatch } = this.props;
    const bossPuzzle = games.BOSS_PUZZLE;

    // Game loader started
    if (!game.isLoading && nextProps.game.isLoading) {

      let imgNumbers, imgIndex;
      
      if (bossPuzzle.imgIndex === undefined || bossPuzzle.imgIndex === bossPuzzle.imgNumbers.length - 1) {
        imgNumbers = this.getNewImgNumbers();
        imgIndex = 0;

      } else {
        imgNumbers = nextProps.games.BOSS_PUZZLE.imgNumbers;
        imgIndex = bossPuzzle.imgIndex + 1;
      }

      const config = {
        dimension: nextProps.games.BOSS_PUZZLE.dimension,
        imgIndex: imgIndex
      }

      config.imgNumber = imgNumbers[config.imgIndex];

      this.getNewRoundData(config.dimension, config.imgNumber).then((data) => {
        dispatch(initFrame(config.dimension, data[1].tiles, data[1].hiddenTileCoords, imgNumbers, config.imgIndex));
        setTimeout(() => { dispatch(toggleGameLoader(false)); }, App.minLoadTime);
      });
    }

    // End game
    if (game.id && !nextProps.game.id) {
      dispatch(resetFrame());
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { games, dispatch } = this.props;
    const bossPuzzle = games.BOSS_PUZZLE;

    if (bossPuzzle.moves === prevProps.games.BOSS_PUZZLE.moves + 1) {
      this.wasJustSolved(yes => {
        if (yes) {
          dispatch(setAsSolved());
        }
      });
    }
  }

  componentWillUnmount() {
    
    const { game, dispatch } = this.props;
    
    if (game.id) {
      dispatch(resetFrame());
    }
  }

  render() {
    
    const { isImgLoaded } = this.state;
    const { games, game } = this.props;
    const bossPuzzle = games.BOSS_PUZZLE;

    return (
      <div className='Game'>
        <Loader isShown={game.isLoading}>
          {!game.id &&
          <div className='Game-off'>
            <GamesList
              {...this.props}
              onDimensionChange={this.onDimensionChange.bind(this)}
              onChoose={this.onNewGameChoose.bind(this)}
            />
          </div>}
          {isImgLoaded && game.id &&
          <div className='Game-on'>
            <div className='Game-dashboard'>
              <div><Chip label={game.id} /></div>
              <div><Chip label={'Moves: ' + bossPuzzle.moves} /></div>
              <div><Timer on={!game.isSolved} paused={game.isSolved} /></div>
            </div>
            <div className='Game-navigation'>
              <div>{'img' + bossPuzzle.imgNumbers[bossPuzzle.imgIndex] + '.jpg'}</div>
              <div>
                <Button raised onClick={this.onNextClick.bind(this)}>New</Button>
              </div>
            </div>
            <div className='Game-component'>
              <BossPuzzle {...this.props} imgSrc={this.imgSrc} onSquareTileClick={this.onSquareTileClick} />
            </div>
          </div>}
        </Loader>
      </div>
    );
  }
}

export default connect(store => store)(Game);