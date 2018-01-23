import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Chip } from 'material-ui';

import { App, BossPuzzle } from 'js/containers';
import { Loader, Timer } from 'js/components';
import { setAsSolved, toggleGameLoader } from 'js/actions';
import './Game.css';


class Game extends Component {

  render() {
    
    const { games, game } = this.props;
    const currentGame = games[game.id];

    return (
      <div className='Game'>
        <Loader isShown={game.isLoading}>
          {game.id &&
          <div className='Game-on'>
            <div className='Game-dashboard'>
              <div><Chip label={game.id} /></div>
              <div><Chip label={'Moves: ' + currentGame.moves} /></div>
              <div><Timer on={!game.isLoading && !game.isSolved} paused={game.isSolved} /></div>
            </div>
            <div className='Game-navigation'>
              <div>
                <Button raised onClick={() => { this.onNewGameChoose(game.id); }}>New</Button>
              </div>
            </div>
            <div className='Game-component'>
              <BossPuzzle
                onFinishInit={this.onFinishInit.bind(this)}
                onBeenSolved={this.onBeenSolved.bind(this)}
              />
            </div>
          </div>}
        </Loader>
      </div>
    );
  }

  onNewGameChoose(id) {

    this.props.dispatch(toggleGameLoader(true, id));
  }

  onFinishInit() {

    setTimeout(() => { this.props.dispatch(toggleGameLoader(false)); }, App.minLoadTime);
  }
  
  onBeenSolved() {

    this.props.dispatch(setAsSolved());
  }
}

export default connect(store => ({
  game: store.game,
  games: store.games
}))(Game);