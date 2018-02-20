import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/app';
import { PlayBtn } from 'js/other';
import { apiRequestClear } from 'js/api/api.actionCreators';
import { fetchHighscores, fetchUsers, FETCH_HIGHSCORES } from 'js/api/api.actions';
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

    const keys = Object.keys(nextOptionsFilterToSet);
    const anyOptionChanged = keys.some(key => nextOptionsFilterToSet[key] !== optionsFilterToSet[key]);

    if (gameFilterToSet.category !== nextGameFilterToSet.category || gameFilterToSet.id !== nextGameFilterToSet.id || anyOptionChanged) {
      dispatch(changeHighscoresFilter(nextGameFilterToSet, nextOptionsFilterToSet));
      this.fetchApiData(nextGameFilterToSet, nextOptionsFilterToSet);
    }
  }

  componentWillUnmount() {
    
    this.props.dispatch(apiRequestClear(FETCH_HIGHSCORES));
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
          <PlayBtn
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

    const { api, dispatch } = this.props;

    dispatch(fetchUsers()).then(() => {
      const gameId = api.games.res.data.find(elem => elem.id === gameFilter.id)._id;
      dispatch(fetchHighscores(gameId, optionsFilter, App.minLoadTime));
    });
  }
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  highscoresPage: store.pages.highscoresPage,
  api: store.api
}))(HighscoresPage);