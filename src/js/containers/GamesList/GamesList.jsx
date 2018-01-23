import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { BossPuzzleSettings } from 'js/components';
import { toggleGameLoader } from 'js/actions';
import games from './GamesList.games';
import './GamesList.css';


class GamesList extends Component {
  
  render() {

    const bossPuzzle = this.props.games.BOSS_PUZZLE;

    return (
      <div className='GamesList'>
        {games.map((game, key) => (
        <div key={key}>
          <Card>
            {game.imgSrc && <CardMedia style={{ height: '250px' }} image={game.imgSrc} title={game.title} />}
            <CardContent>
              <Typography type='headline' component='h2'>{game.title}</Typography>
              <Typography component='p'>{game.description}</Typography>
              <div className='GamesList-settings'>
                {game.id === 'BOSS_PUZZLE' &&
                <BossPuzzleSettings
                  dimension={bossPuzzle.dimension}
                  dispatch={this.props.dispatch}
                />}
              </div>
            </CardContent>
            <CardActions className='GamesList-actions'>
              <div>
                <Button color='primary' onClick={() => { this.onChoose(game.id) }}>Play</Button>
              </div>
            </CardActions>
          </Card>
        </div>))}
      </div>
    );
  }

  onChoose(id) {

    this.props.dispatch(toggleGameLoader(true, id));
  }
}

export default connect(store => ({
  games: store.games
}))(GamesList);