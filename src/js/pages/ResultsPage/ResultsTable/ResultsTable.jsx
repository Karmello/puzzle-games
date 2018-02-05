import React, { Component } from 'react';
import { Paper, Typography } from 'material-ui';
import moment from 'moment';
import { Table } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/other';
import './ResultsTable.css';


export default class ResultsTable extends Component {

  state = { dataStatus: undefined, sortedData: undefined };

  componentWillReceiveProps(nextProps) {
    
    const { api, table } = nextProps;
    const results = api.results;

    if (results.isAwaiting) {
      this.setState({ dataStatus: 'LOADING' });

    } else if (results.status === 200 && results.data) {

      if (results.data.length === 0) {
        this.setState({ dataStatus: 'NO_DATA' });
      
      } else {
        this.setState({ dataStatus: 'DATA_READY', sortedData: this.getSortedData(table, results.data) });
      }
    
    } else {
      this.setState({ dataStatus: undefined });
    }
  }

  render() {

    const { dataStatus, sortedData } = this.state;
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
                    {column.id && <TableSortLabel
                      active={i === table.activeColumnIndex}
                      direction={column.isInAscOrder ? 'desc' : 'asc'}
                      onClick={() => onSortChange(i)}
                    >{column.label}</TableSortLabel>}
                    {!column.id && column.label}
                  </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map(result => (
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

  getSortedData(table, data) {

    const dataCopy = data.slice();
    const orderBy = table.columns[table.activeColumnIndex].id.split('.');

    if (table.columns[table.activeColumnIndex].isInAscOrder) {
      dataCopy.sort((obj1, obj2) => {
        if (orderBy.length === 1) {
          return obj1[orderBy] < obj2[orderBy] ? -1 : 1;
        } else {
          return obj1[orderBy[0]][orderBy[1]] < obj2[orderBy[0]][orderBy[1]] ? -1 : 1;
        }
      });

    } else {
      dataCopy.sort((obj1, obj2) => {
        if (orderBy.length === 1) {
          return obj2[orderBy] < obj1[orderBy] ? -1 : 1;
        } else {
          return obj2[orderBy[0]][orderBy[1]] < obj1[orderBy[0]][orderBy[1]] ? -1 : 1;
        }
      });
    }

    return dataCopy;
  }
}