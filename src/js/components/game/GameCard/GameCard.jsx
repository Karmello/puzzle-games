import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { PlayBtn } from 'js/components/game';
import './GameCard.css';


export default class GameCard extends Component {

  state = { imgSrc: undefined }

  componentWillMount() {
    
    const img = new Image();
    img.src = `${process.env.REACT_APP_S3_BUCKET}/${this.props.gameData.id}/logo.jpg`;
    img.onload = () => { this.setState({ imgSrc: img.src }); }
  }

  componentWillUnmount() {
    
    this.setState({ imgSrc: undefined });
  }

  render() {

    const { gameData, gameOptions, onGameOptionsChange } = this.props;
    const { imgSrc } = this.state;
    let Options;

    try {
      Options = require(`js/components/game/gameOptions/${gameData.id}Options/${gameData.id}Options`).default;
    } catch(ex) {
      console.log(ex);
    }

    return (
      <div className='GameCard'>
        <Card>
          <CardMedia style={{ height: '250px' }} image={imgSrc} title={gameData.name} />
          <CardContent>
            <Typography type='headline' component='h2'>{gameData.name}</Typography>
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
              <Button
                color='primary'
                component={Link}
                to={{
                  pathname: '/results',
                  search: `?category=${gameData.categoryId}&id=${gameData.id}&` + qs.stringify(gameOptions)
                }}
              >See results</Button>
            </div>
            <div>
              <PlayBtn
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