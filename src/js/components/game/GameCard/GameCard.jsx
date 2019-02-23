// @flow
import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import GameBtn from './../GameBtn/GameBtn';
import GameOptions from './../GameOptions/GameOptions';
import { kebabToCamelCase } from 'js/helpers/methods';
import './GameCard.css';

import type { T_GameModel, T_GameOptionsModel } from 'js/flow-types';

type Props = {
  gameData:T_GameModel,
  gameOptions:T_GameOptionsModel,
  onGameOptionsChange:Function
};

export default class GameCard extends Component<Props> {

  render() {

    const { gameData, gameOptions } = this.props;
    let Options;

    if (!isEmpty(gameOptions)) {
      const id = kebabToCamelCase(gameData.id);
      Options = require(`js/components/engineOptions/${id}Options/${id}Options`).default;
    }

    return (
      <div className='GameCard'>
        <Card>
          <div className='GameCard-logoContainer'>
            <CardMedia
              image={`${process.env.REACT_APP_S3_BUCKET || ''}/${gameData.id}/logo.jpg`}
              title={gameData.name}
            />
          </div>
          <div className='GameCard-contentContainer'>
            <CardContent>
              <Typography variant='headline' component='h2'>{gameData.name}</Typography>
              <Typography component='p'>{gameData.description}</Typography>
              <div className='GameCard-options'>
                {Options &&
                <GameOptions
                  onValueChangeCb={this.onValueChangeCb}
                  options={gameOptions}
                  Content={Options}
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
          </div>
        </Card>
      </div>
    );
  }

  onValueChangeCb = (options:T_GameOptionsModel) => this.props.onGameOptionsChange(this.props.gameData.id, options);
}