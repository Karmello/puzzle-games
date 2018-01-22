import React, { Component } from 'react';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import BossPuzzleSettings from './BossPuzzleSettings';
import games from './GamesList.games';
import './GamesList.css';


export default class GamesList extends Component {
  
  render() {

    return (
      <div className='GamesList'>
        {games.map((game, key) => (
        <div key={key}>
          <Card>
            {game.img && <CardMedia image={game.img.src} title={game.img.title} />}
            <CardContent>
              <Typography type='headline' component='h2'>{game.title}</Typography>
              <Typography component='p'>{game.description}</Typography>
              <div className='GamesList-settings'>
                {game.id === 'BOSS_PUZZLE' && <BossPuzzleSettings {...this.props} />}
              </div>
            </CardContent>
            <CardActions className='GamesList-actions'>
              <div>
                <Button color='primary' onClick={() => { this.props.onChoose(game.id) }}>Play</Button>
              </div>
            </CardActions>
          </Card>
        </div>))}
      </div>
    );
  }
}