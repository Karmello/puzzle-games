import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import './GameCard.css';


export default class GameCard extends Component {

  render() {

    const { gameData, gameOptions, onGameOptionsChange } = this.props;
    const Options = require(`js/components/game/gameOptions/${gameData.id}Options/${gameData.id}Options`).default;

    return (
      <div className='GameCard'>
        <Card>
          <CardMedia
            style={{ height: '250px' }}
            image={`${process.env.REACT_APP_S3_BUCKET}/${gameData.id}/logo.jpg`}
            title={gameData.name}
          />
          <CardContent>
            <Typography type='headline' component='h2'>{gameData.name}</Typography>
            <Typography component='p'>{gameData.description}</Typography>
            <div className='GameCard-options'>
              <Options
                options={gameOptions}
                onValueChangeCb={options => onGameOptionsChange(gameData.id, options)}
              />
            </div>
          </CardContent>
          <CardActions className='GameCard-actions'>
            <div>
              <Button
                color='primary'
                component={Link}
                to={`/games/${gameData.id}`}
              >Play</Button>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}