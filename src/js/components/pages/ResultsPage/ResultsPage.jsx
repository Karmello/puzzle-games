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

    this.fetchApiData(this.props.resultsFilter);
  }
  
  componentWillUnmount() {
    
    this.props.dispatch(apiRequestClear(FETCH_RESULTS));
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.resultsFilter.options) {

      const optionKeys = Object.keys(nextProps.resultsFilter.options);
      const anyOptionChanged = optionKeys.some(key => nextProps.resultsFilter.options[key] !== this.props.resultsFilter.options[key]);

      if (anyOptionChanged || nextProps.resultsFilter.game.id !== this.props.resultsFilter.game.id) {
        this.fetchApiData(nextProps.resultsFilter);
      }
    }
  }

  render() {

    const { resultsFilter, api } = this.props;

    return (
      <div className='ResultsPage'>
        <ResultsFilter
          api={api}
          resultsFilter={resultsFilter}
          onChange={this.onResultsFilterChange.bind(this)}
        />
        <ResultsTable api={api} />
      </div>
    );
  }

  onResultsFilterChange(gameFilter, optionsFilter) {

    const { gameOptions, dispatch } = this.props;
    dispatch(changeResultsFilter(gameFilter, optionsFilter || gameOptions[gameFilter.id]));
  }

  fetchApiData(resultsFilter) {

    const { api, dispatch } = this.props;

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