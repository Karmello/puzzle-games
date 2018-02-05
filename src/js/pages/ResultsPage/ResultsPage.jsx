import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/app';
import { PlayBtn } from 'js/other';
import { apiRequestClear } from 'js/api/api.actionCreators';
import { fetchResults, fetchUsers, FETCH_RESULTS } from 'js/api/api.actions';
import { changeResultsFilter, setActiveColumn, toggleColumnSortDirection } from './resultsPage.actions';
import ResultsFilter from './ResultsFilter/ResultsFilter';
import ResultsTable from './ResultsTable/ResultsTable';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    const { filterToSet, dispatch } = this.props;
    const { game, options } = filterToSet;
    
    dispatch(changeResultsFilter(game.category, game.id, options));
    this.fetchApiData(filterToSet);
  }
  
  componentWillReceiveProps(nextProps) {

    const { filterToSet, dispatch } = this.props;
    const { game, options } = filterToSet;
    const nextFilterToSet = nextProps.filterToSet;

    const keys = Object.keys(nextFilterToSet.options);
    const anyOptionChanged = keys.some(key => nextFilterToSet.options[key] !== options[key]);

    if (game.category !== nextFilterToSet.game.category || game.id !== nextFilterToSet.game.id || anyOptionChanged) {
      dispatch(changeResultsFilter(nextFilterToSet.game.category, nextFilterToSet.game.id, nextFilterToSet.options));
      this.fetchApiData(nextFilterToSet);
    }
  }

  componentWillUnmount() {
    
    this.props.dispatch(apiRequestClear(FETCH_RESULTS));
  }

  render() {

    const { gameOptions, resultsPage, api } = this.props;

    return (
      <div className='ResultsPage'>
        <div>
          <ResultsFilter api={api} gameOptions={gameOptions} resultsFilter={resultsPage.filter} />
        </div>
        <div className='ResultsPage-actionBtns'>
          <PlayBtn
            gameCategory={resultsPage.filter.game.category}
            gameId={resultsPage.filter.game.id}
            gameOptions={resultsPage.filter.options}
          />
        </div>
        <div>
          <ResultsTable api={api} table={resultsPage.table} onSortChange={this.onSortChange.bind(this)} />
        </div>
      </div>
    );
  }

  fetchApiData(resultsFilter) {

    const { api, dispatch } = this.props;

    dispatch(fetchUsers()).then(() => {
      const gameId = api.games.data.find(elem => elem.id === resultsFilter.game.id)._id;
      dispatch(fetchResults(gameId, resultsFilter.options, App.minLoadTime));
    });
  }

  onSortChange(columnIndex) {

    const { resultsPage, dispatch } = this.props;

    if (resultsPage.table.activeColumnIndex === columnIndex) {
      dispatch(toggleColumnSortDirection(columnIndex));
      
    } else {
      dispatch(setActiveColumn(columnIndex));
    }
  }
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  resultsPage: store.pages.resultsPage,
  api: store.api
}))(ResultsPage);