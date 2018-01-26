import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { BossPuzzleOptions } from 'js/components';
import './GameCard.css';


export default (props) => (
  <div className='GameCard'>
    <Card>
      <CardMedia
        style={{ height: '250px' }}
        image={`${process.env.REACT_APP_S3_BUCKET}/${props.gameData.id}/logo.jpg`}
        title={props.gameData.name}
      />
      <CardContent>
        <Typography type='headline' component='h2'>{props.gameData.name}</Typography>
        <Typography component='p'>{props.gameData.description}</Typography>
        <div className='GameCard-options'>
          {props.gameData.id === 'BossPuzzle' &&
          <BossPuzzleOptions
            options={props.gameOptions}
            onValueChangeCb={(options) => { props.onGameOptionsChange(props.gameData.id, options); }}
          />}
        </div>
      </CardContent>
      <CardActions className='GameCard-actions'>
        <div>
          <Button
            color='primary'
            component={Link}
            to={`/games/${props.gameData.id}`}
          >Play</Button>
        </div>
      </CardActions>
    </Card>
  </div>
);