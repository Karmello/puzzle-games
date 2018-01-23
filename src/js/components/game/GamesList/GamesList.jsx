import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { BossPuzzleSettings } from 'js/components';
import { startGame } from 'js/actions';
import './GamesList.css';


class GamesList extends Component {
  
  render() {

    const { gameApiData, games } = this.props;
    const bossPuzzle = games.BOSS_PUZZLE;

    return (
      <div className='GamesList'>
        {gameApiData.map((game, key) => (
        <div key={key}>
          <Card>
            <CardMedia
              style={{ height: '250px' }}
              image={`${process.env.REACT_APP_S3_BUCKET}/${game.id}/logo.jpg`}
              title={game.name}
            />
            <CardContent>
              <Typography type='headline' component='h2'>{game.name}</Typography>
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

    this.props.dispatch(startGame(id));
  }
}

export default connect(store => ({
  gameApiData: store.api.games.data,
  games: store.games
}))(GamesList);