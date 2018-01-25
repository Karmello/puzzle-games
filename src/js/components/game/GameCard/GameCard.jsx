import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { BossPuzzleOptions } from 'js/components';
import './GameCard.css';


export default class GameCard extends Component {
  
  render() {

    const { gameData, gameOptions, onGameOptionsChange } = this.props;
    const { id, name, description } = gameData;

    return (
      <div className='GameCard'>
        <Card>
          <CardMedia
            style={{ height: '250px' }}
            image={`${process.env.REACT_APP_S3_BUCKET}/${id}/logo.jpg`}
            title={name}
          />
          <CardContent>
            <Typography type='headline' component='h2'>{name}</Typography>
            <Typography component='p'>{description}</Typography>
            <div className='GameCard-options'>
              {id === 'BossPuzzle' &&
              <BossPuzzleOptions
                options={gameOptions}
                onValueChangeCb={(options) => { onGameOptionsChange(id, options); }}
              />}
            </div>
          </CardContent>
          <CardActions className='GameCard-actions'>
            <div>
              <Button color='primary' component={Link} to={`/games/${id}`}>Play</Button>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}