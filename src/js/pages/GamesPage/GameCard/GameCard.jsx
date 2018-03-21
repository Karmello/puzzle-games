import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { GameBtn } from 'js/game';
import './GameCard.css';


class GameCard extends Component {

  render() {

    const { gameData, gameOptions, onGameOptionsChange } = this.props;
    let Options;

    if (!isEmpty(gameOptions)) {
      Options = require(`js/gameOptions/${gameData.id}Options/${gameData.id}Options`).default;
    }

    return (
      <div className='GameCard'>
        <Card>
          <CardMedia
            style={{ height: '250px' }}
            image={`${process.env.REACT_APP_S3_BUCKET}/${gameData.id}/logo.jpg`}
            title={gameData.name}
          />
          <CardContent>
            <Typography variant='headline' component='h2'>{gameData.name}</Typography>
            <Typography component='p'>{gameData.description}</Typography>
            <div className='GameCard-options'>
              {Options && <Options
                options={gameOptions}
                onValueChangeCb={options => onGameOptionsChange(gameData.id, options)}
              />}
            </div>
          </CardContent>
          <CardActions className='GameCard-actions'>
            <div>
              <GameBtn
                name='highscores'
                label='Highscores'
                gameCategory={gameData.categoryId}
                gameId={gameData.id}
                gameOptions={gameOptions}
              />
            </div>
            <div>
              <GameBtn
                name='play'
                label='Play'
                gameCategory={gameData.categoryId}
                gameId={gameData.id}
                gameOptions={gameOptions}
              />
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

GameCard.propTypes = {
  gameData: PropTypes.object.isRequired,
  gameOptions: PropTypes.object,
  onGameOptionsChange: PropTypes.func
};

export default GameCard;