import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/app';
import { GameBtn } from 'js/game';
import { fetchHighscores } from 'js/api/apiActions';
import { changeHighscoresFilter } from './highscoresPageActions';
import HighscoresFilter from './HighscoresFilter/HighscoresFilter';
import HighscoresTable from './HighscoresTable/HighscoresTable';
import './HighscoresPage.css';


class HighscoresPage extends Component {

  componentWillMount() {
    const { gameFilterToSet, optionsFilterToSet } = this.props;
    this.onChange(gameFilterToSet, optionsFilterToSet);
  }
  
  componentWillReceiveProps(nextProps) {

    const { gameFilterToSet, optionsFilterToSet } = this.props;
    const nextGameFilterToSet = nextProps.gameFilterToSet;
    const nextOptionsFilterToSet = nextProps.optionsFilterToSet;

    let anyOptionChanged;

    if (nextOptionsFilterToSet && optionsFilterToSet) {
      const keys = Object.keys(nextOptionsFilterToSet);
      anyOptionChanged = keys.some(key => nextOptionsFilterToSet[key] !== optionsFilterToSet[key]);
    }

    if (gameFilterToSet.category !== nextGameFilterToSet.category || gameFilterToSet.id !== nextGameFilterToSet.id || anyOptionChanged) {
      this.onChange(nextGameFilterToSet, nextOptionsFilterToSet);
    }
  }

  render() {

    const { gameOptions, highscoresPage, api } = this.props;

    if (!highscoresPage.gameFilter.category || !highscoresPage.gameFilter.id) {
      return null;
    }

    return (
      <div className='HighscoresPage'>
        <div>
          <HighscoresFilter
            api={api}
            gameOptions={gameOptions}
            gameFilter={highscoresPage.gameFilter}
            optionsFilter={highscoresPage.optionsFilter}
          />
        </div>
        <div className='HighscoresPage-actionBtns'>
          <GameBtn
            name='play'
            label='Play'
            gameCategory={highscoresPage.gameFilter.category}
            gameId={highscoresPage.gameFilter.id}
            gameOptions={highscoresPage.optionsFilter}
          />
        </div>
        <div>
          <HighscoresTable api={api} />
        </div>
      </div>
    );
  }

  onChange(gameFilterToSet, optionsFilterToSet) {
    
    const { dispatch, api } = this.props;
    const ui = JSON.parse(localStorage.getItem('ui'));
    const username = api.clientUser.res.data.username;

    ui[username].highscoresPage.gameFilter = gameFilterToSet;
    ui[username].highscoresPage.optionsFilter = optionsFilterToSet;
    localStorage.setItem('ui', JSON.stringify(ui));
    
    dispatch(changeHighscoresFilter(gameFilterToSet, optionsFilterToSet));
    dispatch(fetchHighscores(gameFilterToSet.id, optionsFilterToSet, App.minLoadTime));
  }
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  highscoresPage: store.pages.highscoresPage,
  api: store.api
}))(HighscoresPage);