import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';

import { BossPuzzleOptions } from 'js/components';
import { startGame, changeGameOptions } from 'js/actions';
import './GameList.css';


class GameList extends Component {

  render() {

    const { gameApiData, gameList, dispatch } = this.props;

    if (gameApiData) {
      return (
        <div className='GameList'>
          {Object.keys(gameApiData).map((gameId, index) => (
          <div key={gameId}>
            <Card>
              <CardMedia
                style={{ height: '250px' }}
                image={`${process.env.REACT_APP_S3_BUCKET}/${gameId}/logo.jpg`}
                title={gameApiData[gameId].name}
              />
              <CardContent>
                <Typography type='headline' component='h2'>{gameApiData[gameId].name}</Typography>
                <Typography component='p'>{gameApiData[gameId].description}</Typography>
                <div className='GameList-options'>
                  {gameId === 'BOSS_PUZZLE' &&
                  <BossPuzzleOptions
                    options={gameList[gameId].options}
                    onValueChangeCb={(options) => { dispatch(changeGameOptions('BOSS_PUZZLE', options)); }}
                    ref={ref => this[`${gameId}_OPTIONS`] = ref}
                  />}
                </div>
              </CardContent>
              <CardActions className='GameList-actions'>
                <div>
                  <Button color='primary' onClick={() => { this.onPlayClick(gameId) }}>Play</Button>
                </div>
              </CardActions>
            </Card>
          </div>))}
        </div>
      );
    }

    return null;
  }

  onPlayClick(gameId) {

    this.props.dispatch(startGame(gameId, this[`${gameId}_OPTIONS`].state));
  }
}

export default connect(store => ({
  gameApiData: store.api.games.data,
  gameList: store.gameList
}))(GameList);