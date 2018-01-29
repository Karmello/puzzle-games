import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Paper, Table, Typography } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/components/other';
import { fetchAllResults, fetchAllGames, fetchAllUsers } from 'js/actions/api';
import './ResultsPage.css';


class ResultsPage extends Component {

  componentDidMount() {

    const { dispatch, allGames } = this.props;
    dispatch(fetchAllResults());
    dispatch(fetchAllUsers());
    if (allGames.status !== 200) { dispatch(fetchAllGames()); }
  }

  render() {

    const { allResults, allGames, allUsers } = this.props;
    if (allResults.status !== 200 || allGames.status !== 200 || allUsers.status !== 200) { return <Loader isShown />; }

    return (
      <div className='ResultsPage'>
        <Paper className='ResultsPage-table'>
          <Typography className='ResultsPage-tableTitle' type='title'>Results</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell>Game</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Dimension</TableCell>
                <TableCell>Style</TableCell>
                <TableCell numeric>Moves</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allResults.data.map(result => (
                <TableRow key={result._id}>
                  <TableCell>{find(allUsers.data, elem => elem._id === result.userId).fb.name}</TableCell>
                  <TableCell>{find(allGames.data, elem => elem._id === result.gameId).name}</TableCell>
                  <TableCell>{moment(result.date).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                  <TableCell numeric>{result.options.dimension}</TableCell>
                  <TableCell numeric>{result.options.style}</TableCell>
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
  allResults: store.api.allResults,
  allGames: store.api.allGames,
  allUsers: store.api.allUsers
}))(ResultsPage);