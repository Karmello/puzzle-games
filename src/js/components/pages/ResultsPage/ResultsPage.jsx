import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/components/app';
import { apiRequestClear } from 'js/actionCreators';
import { fetchResults, fetchAllUsers, FETCH_RESULTS } from 'js/actions/api';
import { changeResultsFilter } from 'js/actions/resultsPage';
import ResultsFilter from './ResultsFilter';
import ResultsTable from './ResultsTable';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    this.fetchApiData();
  }
  
  componentWillUnmount() {
    
    this.props.dispatch(apiRequestClear(FETCH_RESULTS));
  }

  render() {

    const { gameOptions, resultsFilter, api } = this.props;

    return (
      <div className='ResultsPage'>
        <ResultsFilter
          api={api}
          gameOptions={gameOptions}
          resultsFilter={resultsFilter}
          onChange={this.onResultsFilterChange.bind(this)}
        />
        <ResultsTable api={api} />
      </div>
    );
  }

  onResultsFilterChange(categoryId, gameId, gameOptions) {

    this.props.dispatch(changeResultsFilter(categoryId, gameId, gameOptions));
    setTimeout(() => this.fetchApiData());
  }

  fetchApiData() {

    const { api, resultsFilter, dispatch } = this.props;

    dispatch(fetchAllUsers()).then(() => {
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