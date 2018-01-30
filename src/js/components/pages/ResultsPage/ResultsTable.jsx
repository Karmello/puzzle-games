import React, { Component } from 'react';
import { Paper, Typography } from 'material-ui';
import moment from 'moment';
import { Table } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/components/other';


export default class ResultsTable extends Component {

  render() {

    const { results, allUsers } = this.props;

    if (results.isFetching) {
      return <Loader isShown />;

    } else if (results.status !== 200) {
      return null;

    } else if (results.data.length === 0) { return <div>No results</div>; }

    return (
      <Paper className='ResultsTable'>
        <Typography className='ResultsTable-title' type='title'>Results</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Player</TableCell>
              <TableCell numeric>Moves</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.data.map(result => (
              <TableRow key={result._id}>
                <TableCell>{moment(result.date).format('YYYY, MMMM Do, h:mm:ss a')}</TableCell>
                <TableCell>{find(allUsers.data, elem => elem._id === result.userId).fb.name}</TableCell>
                <TableCell numeric>{result.details.moves}</TableCell>
                <TableCell>{moment.utc(result.details.seconds * 1000).format('HH:mm:ss')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}