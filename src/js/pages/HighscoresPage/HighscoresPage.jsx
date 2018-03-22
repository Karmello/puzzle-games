import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/app';
import { GameBtn } from 'js/game';
import { fetchHighscores } from 'js/api/api.actions';
import { changeHighscoresFilter } from './highscoresPage.actions';
import HighscoresFilter from './HighscoresFilter/HighscoresFilter';
import HighscoresTable from './HighscoresTable/HighscoresTable';
import './HighscoresPage.css';


class HighscoresPage extends Component {

  componentDidMount() {

    const { gameFilterToSet, optionsFilterToSet, dispatch } = this.props;
    
    dispatch(changeHighscoresFilter(gameFilterToSet, optionsFilterToSet));
    this.fetchApiData(gameFilterToSet, optionsFilterToSet);
  }
  
  componentWillReceiveProps(nextProps) {

    const { gameFilterToSet, optionsFilterToSet, dispatch } = this.props;
    const nextGameFilterToSet = nextProps.gameFilterToSet;
    const nextOptionsFilterToSet = nextProps.optionsFilterToSet;

    let anyOptionChanged;

    if (nextOptionsFilterToSet && optionsFilterToSet) {
      const keys = Object.keys(nextOptionsFilterToSet);
      anyOptionChanged = keys.some(key => nextOptionsFilterToSet[key] !== optionsFilterToSet[key]);
    }

    if (gameFilterToSet.category !== nextGameFilterToSet.category || gameFilterToSet.id !== nextGameFilterToSet.id || anyOptionChanged) {
      dispatch(changeHighscoresFilter(nextGameFilterToSet, nextOptionsFilterToSet));
      this.fetchApiData(nextGameFilterToSet, nextOptionsFilterToSet);
    }
  }

  render() {

    const { gameOptions, highscoresPage, api } = this.props;

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

  fetchApiData(gameFilter, optionsFilter) {
    setTimeout(() => {
      this.props.dispatch(fetchHighscores(gameFilter.id, optionsFilter, App.minLoadTime));
    });
  }
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  highscoresPage: store.pages.highscoresPage,
  api: store.api
}))(HighscoresPage);