import React, { Component } from 'react';
import { Paper, Typography } from 'material-ui';
import moment from 'moment';
import { Table } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/other';
import './ResultsTable.css';


export default class ResultsTable extends Component {

  state = { dataStatus: undefined };

  componentWillReceiveProps(nextProps) {
    
    const { api } = nextProps;
    const results = api.results;

    if (results.isAwaiting) {
      this.setState({ dataStatus: 'LOADING' });

    } else if (results.status === 200 && results.data) {
      this.setState({ dataStatus: results.data.length === 0 ? 'NO_DATA' : 'DATA_READY' });
    
    } else {
      this.setState({ dataStatus: undefined });
    }
  }

  render() {

    const { dataStatus } = this.state;
    const { api, table, onSortChange } = this.props;

    switch (dataStatus) {

      case 'LOADING':
        return <Loader isShown />;

      case 'NO_DATA':
        return <div>No results</div>;

      case 'DATA_READY':
        return (
          <Paper className='ResultsTable'>
            <Typography className='ResultsTable-title' type='title'>Results</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {table.columns.map((column, i) => (
                  <TableCell key={i} numeric={column.isNumeric}>
                    <TableSortLabel
                      active={i === table.activeColumnIndex}
                      direction={column.isInAscOrder ? 'asc' : 'desc'}
                      onClick={() => onSortChange(i)}
                    >{column.label}</TableSortLabel>
                  </TableCell>
                  ))}
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

      default:
        return null;
    }
  }
}