import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chip } from 'material-ui';

import { App, BossPuzzle, Loader, Timer } from 'js/components';
import { setAsSolved, stopGameLoader } from 'js/actions';
import './Game.css';


class Game extends Component {

  render() {
    
    const { engines, game, gameApiData } = this.props;
    const currentGame = engines[game.id];

    return (
      <Loader isShown={game.isLoading}>
        <div className='Game'>
          <div className='Game-dashboard'>
            <div><Chip label={gameApiData[game.id].name} /></div>
            <div><Chip label={'Moves: ' + currentGame.moves} /></div>
            <div><Timer on={!game.isLoading && !game.isSolved} paused={game.isSolved} /></div>
            {game.isSolved && <div><Chip label='SOLVED' /></div>}
          </div>
          <div className='Game-component'>
            <BossPuzzle
              onFinishInit={this.onFinishInit.bind(this)}
              onBeenSolved={this.onBeenSolved.bind(this)}
            />
          </div>
        </div>
      </Loader>
    );
  }

  onFinishInit() {

    setTimeout(() => { this.props.dispatch(stopGameLoader()); }, App.minLoadTime);
  }
  
  onBeenSolved() {

    this.props.dispatch(setAsSolved());
  }
}

export default connect(store => ({
  game: store.game,
  engines: store.engines,
  gameApiData: store.api.games.data
}))(Game);