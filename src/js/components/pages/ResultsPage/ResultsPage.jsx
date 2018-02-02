import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/components/app';
import { apiRequestClear } from 'js/actionCreators';
import { fetchResults, fetchUsers, FETCH_RESULTS } from 'js/actions/api';
import { changeResultsFilter } from 'js/actions/resultsPage';
import ResultsFilter from './ResultsFilter';
import ResultsTable from './ResultsTable';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    const { filterToSet, dispatch } = this.props;
    const { game, options } = filterToSet;
    
    dispatch(changeResultsFilter(game.category, game.id, options));
    this.fetchApiData(filterToSet)
  }
  
  componentWillReceiveProps(nextProps) {

    const { filterToSet, dispatch } = this.props;
    const { game, options } = filterToSet;
    const nextFilterToSet = nextProps.filterToSet;

    const keys = Object.keys(nextFilterToSet.options);
    const anyOptionChanged = keys.some(key => nextFilterToSet.options[key] !== options[key]);

    if (game.category !== nextFilterToSet.game.category || game.id !== nextFilterToSet.game.id || anyOptionChanged) {
      dispatch(changeResultsFilter(nextFilterToSet.game.category, nextFilterToSet.game.id, nextFilterToSet.options));
      this.fetchApiData(nextFilterToSet)
    }
  }

  componentWillUnmount() {
    
    this.props.dispatch(apiRequestClear(FETCH_RESULTS));
  }

  render() {

    const { gameOptions, resultsFilter, api } = this.props;

    return (
      <div className='ResultsPage'>
        <ResultsFilter api={api} gameOptions={gameOptions} resultsFilter={resultsFilter} />
        <ResultsTable api={api} />
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
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  resultsFilter: store.pages.resultsPage.filter,
  api: store.api
}))(ResultsPage);