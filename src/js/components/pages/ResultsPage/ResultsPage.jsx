import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/components/app';
import { apiRequestClear } from 'js/actionCreators';
import { fetchResults, fetchAllUsers, FETCH_RESULTS } from 'js/actions/api';
import { changeResultsFilter } from 'js/actions/resultsFilter';
import ResultsFilter from './ResultsFilter';
import ResultsTable from './ResultsTable';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    this.fetchApiData(this.props.resultsFilter);
  }
  
  componentWillUnmount() {
    this.props.dispatch(apiRequestClear(FETCH_RESULTS));
  }

  componentWillReceiveProps(nextProps) {

    const optionKeys = Object.keys(nextProps.resultsFilter.options);
    const anyOptionChanged = optionKeys.some(key => nextProps.resultsFilter.options[key] !== this.props.resultsFilter.options[key]);

    if (anyOptionChanged || nextProps.resultsFilter.gameId !== this.props.resultsFilter.gameId) {
      this.fetchApiData(nextProps.resultsFilter);
    }
  }

  render() {

    const { results, allGames, allUsers, resultsFilter } = this.props;

    return (
      <div className='ResultsPage'>
        <ResultsFilter
          allGames={allGames}
          results={results}
          resultsFilter={resultsFilter}
          onChange={this.onResultsFilterChange.bind(this)}
        />
        <ResultsTable allUsers={allUsers} results={results}/>
      </div>
    );
  }

  onResultsFilterChange(gameId, options) {

    const { gameOptions, dispatch } = this.props;
    dispatch(changeResultsFilter(gameId, options || gameOptions[gameId]));
  }

  fetchApiData(resultsFilter) {

    const { dispatch, allGames } = this.props;

    dispatch(fetchAllUsers()).then(() => {
      dispatch(fetchResults(allGames.data.find(elem => elem.id === resultsFilter.gameId)._id, resultsFilter.options, App.minLoadTime));
    });
  }
}

export default connect(store => ({
  allUsers: store.api.allUsers,
  allGames: store.api.allGames,
  results: store.api.results,
  gameOptions: store.gameOptions,
  resultsFilter: store.resultsFilter
}))(ResultsPage);