import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Paper, Table, Typography } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/components/other';
import { getResults, getGames } from 'js/actions/api';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    const { dispatch, apiGames } = this.props;
    dispatch(getResults());
    if (apiGames.status !== 200) { dispatch(getGames()); }
  }

  render() {

    const { apiResults, apiGames } = this.props;
    if (apiResults.status !== 200 || apiGames.status !== 200) { return <Loader isShown />; }

    return (
      <div className='ResultsPage'>
        <Paper className='ResultsPage-table'>
          <Typography className='ResultsPage-tableTitle' type='title'>Results</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>UserId</TableCell>
                <TableCell>Game</TableCell>
                <TableCell numeric>Moves</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiResults.data.map(result => (
                <TableRow key={result._id}>
                  <TableCell>{moment(result.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                  <TableCell>{result.userId}</TableCell>
                  <TableCell>{find(apiGames.data, elem => { return elem._id === result.gameId }).name}</TableCell>
                  <TableCell numeric>{result.details.moves}</TableCell>
                  <TableCell>{moment.utc(result.details.seconds * 1000).format('HH:mm:ss')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default connect(store => ({
  apiResults: store.api.results,
  apiGames: store.api.games
}))(ResultsPage);