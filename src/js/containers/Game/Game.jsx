import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Chip } from 'material-ui';

import { App } from 'js/containers';
import { Frame, Loader, NewGameSetup, Timer } from 'js/components';
import { endRound, initFrame, newRound, resetFrame, setAsSolved, toggleGameLoader } from 'js/actions';
import * as GameMethods from './Game.methods';
import './Game.css';


const tilesSizes = { 3: 150, 4: 125, 5: 100 };

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

    const { game, round, dispatch } = this.props;

    // Game loader started
    if (!game.isLoading && nextProps.game.isLoading) {

      const config = {
        dimension: nextProps.frame.dimension,
        roundNumber: round.number === nextProps.game.imgNumbers.length ? 1 : round.number + 1
      }

      config.imgNumber = nextProps.game.imgNumbers[config.roundNumber - 1];

      this.getNewRoundData(config.dimension, config.imgNumber).then((data) => {
        dispatch(newRound(config.roundNumber));
        dispatch(initFrame(config.dimension, data[1].tiles, data[1].hiddenTileCoords));
        setTimeout(() => { dispatch(toggleGameLoader(false)); }, App.minLoadTime);
      });
    }

    // End game
    if (game.mode !== 'OFF' && nextProps.game.mode === 'OFF') {
      
      dispatch(endRound());
      dispatch(resetFrame());
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const { round, dispatch } = this.props;

    if (round.moves === prevProps.round.moves + 1) {
      this.wasJustSolved(yes => {
        if (yes) {
          dispatch(setAsSolved());
        }
      });
    }
  }

  componentWillUnmount() {
    
    const { game, dispatch } = this.props;
    
    if (game.mode !== 'OFF') {
      dispatch(endRound());
      dispatch(resetFrame());
    }
  }

  render() {
    
    const { isImgLoaded } = this.state;
    const { game, round } = this.props;

    return (
      <div className='Game'>
        <Loader isShown={game.isLoading}>
          {game.mode === 'OFF' &&
          <div className='Game-off'>
            <NewGameSetup
              {...this.props}
              onDimensionChange={this.onDimensionChange.bind(this)}
              onChoose={this.onNewGameChoose.bind(this)}
            />
          </div>}
          {isImgLoaded && game.mode !== 'OFF' &&
          <div className='Game-on'>
            <div className='Game-dashboard'>
              <div><Chip label={'Mode: ' + game.mode} /></div>
              {game.mode !== 'PRACTICE' && <div><Chip label={'Moves: ' + round.moves} /></div>}
              {game.mode !== 'PRACTICE' && <div><Timer on={!round.isSolved} paused={round.isSolved} /></div>}
            </div>
            <div className='Game-navigation'>
              <div>{'img' + game.imgNumbers[round.number - 1] + '.jpg'}</div>
              <div>
                {(game.mode === 'PRACTICE' || round.isSolved) && <Button raised onClick={this.onNextClick.bind(this)}>Next</Button>}
              </div>
            </div>
            <div className='Game-frameContainer'>
              <Frame {...this.props} tilesSizes={tilesSizes} imgSrc={this.imgSrc} onSquareTileClick={this.onSquareTileClick} />
            </div>
          </div>}
        </Loader>
      </div>
    );
  }
}

export default connect(store => store)(Game);