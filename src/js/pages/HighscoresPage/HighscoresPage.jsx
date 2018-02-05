import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/app';
import { PlayBtn } from 'js/other';
import { apiRequestClear } from 'js/api/api.actionCreators';
import { fetchHighscores, fetchUsers, FETCH_HIGHSCORES } from 'js/api/api.actions';
import { changeHighscoresFilter, setActiveColumn, toggleColumnSortDirection } from './highscoresPage.actions';
import HighscoresFilter from './HighscoresFilter/HighscoresFilter';
import HighscoresTable from './HighscoresTable/HighscoresTable';
import './HighscoresPage.css';


class HighscoresPage extends Component {

  componentDidMount() {

    const { filterToSet, dispatch } = this.props;
    const { game, options } = filterToSet;
    
    dispatch(changeHighscoresFilter(game.category, game.id, options));
    this.fetchApiData(filterToSet);
  }
  
  componentWillReceiveProps(nextProps) {

    const { filterToSet, dispatch } = this.props;
    const { game, options } = filterToSet;
    const nextFilterToSet = nextProps.filterToSet;

    const keys = Object.keys(nextFilterToSet.options);
    const anyOptionChanged = keys.some(key => nextFilterToSet.options[key] !== options[key]);

    if (game.category !== nextFilterToSet.game.category || game.id !== nextFilterToSet.game.id || anyOptionChanged) {
      dispatch(changeHighscoresFilter(nextFilterToSet.game.category, nextFilterToSet.game.id, nextFilterToSet.options));
      this.fetchApiData(nextFilterToSet);
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
          <HighscoresFilter api={api} gameOptions={gameOptions} highscoresFilter={highscoresPage.filter} />
        </div>
        <div className='HighscoresPage-actionBtns'>
          <PlayBtn
            gameCategory={highscoresPage.filter.game.category}
            gameId={highscoresPage.filter.game.id}
            gameOptions={highscoresPage.filter.options}
          />
        </div>
        <div>
          <HighscoresTable api={api} table={highscoresPage.table} onSortChange={this.onSortChange.bind(this)} />
        </div>
      </div>
    );
  }

  fetchApiData(highscoresFilter) {

    const { api, dispatch } = this.props;

    dispatch(fetchUsers()).then(() => {
      const gameId = api.games.data.find(elem => elem.id === highscoresFilter.game.id)._id;
      dispatch(fetchHighscores(gameId, highscoresFilter.options, App.minLoadTime));
    });
  }

  onSortChange(columnIndex) {

    const { highscoresPage, dispatch } = this.props;

    if (highscoresPage.table.activeColumnIndex === columnIndex) {
      dispatch(toggleColumnSortDirection(columnIndex));
      
    } else {
      dispatch(setActiveColumn(columnIndex));
    }
  }
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  highscoresPage: store.pages.highscoresPage,
  api: store.api
}))(HighscoresPage);