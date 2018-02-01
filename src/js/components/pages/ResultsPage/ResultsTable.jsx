import React, { Component } from 'react';
import { Paper, Typography } from 'material-ui';
import moment from 'moment';
import { Table } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/components/other';


export default class ResultsTable extends Component {

  render() {

    const { api } = this.props;

    if (api.results.isAwaiting) {
      return <Loader isShown />;

    } else if (api.results.data) {

      if (api.results.data.length === 0) {
        return <div>No results</div>;

      } else {
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
                {api.results.data.map(result => (
                  <TableRow key={result._id}>
                    <TableCell>{moment(result.date).format('YYYY, MMMM Do, h:mm:ss a')}</TableCell>
                    <TableCell>{find(api.users.data, elem => elem._id === result.userId).fb.name}</TableCell>
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

    return null;
  }
}