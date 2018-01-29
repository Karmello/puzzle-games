import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Loader } from 'js/components/other';
import { fetchAllResults, fetchAllGames, fetchAllUsers } from 'js/actions/api';
import { changeResultsFilter } from 'js/actions/resultsFilter';
import ResultsFilter from './ResultsFilter';
import ResultsTable from './ResultsTable';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    const { dispatch, allGames } = this.props;
    dispatch(fetchAllResults());
    dispatch(fetchAllUsers());
    if (allGames.status !== 200) { dispatch(fetchAllGames()); }
  }

  render() {

    const { allResults, allGames, allUsers, resultsFilter } = this.props;
    if (allResults.status !== 200 || allGames.status !== 200 || allUsers.status !== 200) { return <Loader isShown />; }

    return (
      <div className='ResultsPage'>
        <ResultsFilter
          allGames={allGames}
          resultsFilter={resultsFilter}
          onChange={this.onResultsFilterChange.bind(this)}
        />
        <ResultsTable
          allGames={allGames}
          allResults={allResults}
          allUsers={allUsers}
        />
      </div>
    );
  }

  onResultsFilterChange(gameId, options) {

    const { gameOptions, dispatch } = this.props;
    dispatch(changeResultsFilter(gameId, options || gameOptions[gameId]));
  }
}

export default connect(store => ({
  allResults: store.api.allResults,
  allGames: store.api.allGames,
  allUsers: store.api.allUsers,
  gameOptions: store.gameOptions,
  resultsFilter: store.resultsFilter
}))(ResultsPage);