import React, { Component } from 'react';
import { Paper, Typography } from 'material-ui';
import moment from 'moment';
import { Table } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { find } from 'lodash';

import { Loader } from 'js/other';
import './HighscoresTable.css';


const columns = ['No.', 'Time', 'Moves', 'Date', 'Player'];

export default class HighscoresTable extends Component {

  state = { dataStatus: undefined };

  componentWillReceiveProps(nextProps) {
    
    const { api } = nextProps;

    if (api.highscores.isAwaiting) {
      this.setState({ dataStatus: 'LOADING' });

    } else if (api.highscores.status === 200 && api.highscores.data) {
      this.setState({ dataStatus: api.highscores.data.length === 0 ? 'NO_DATA' : 'DATA_READY' });
    
    } else {
      this.setState({ dataStatus: undefined });
    }
  }

  render() {

    const { dataStatus } = this.state;
    const { api } = this.props;

    switch (dataStatus) {

      case 'LOADING':
        return <Loader isShown />;

      case 'NO_DATA':
        return <div>Nothing to show</div>;

      case 'DATA_READY':
        return (
          <Paper className='HighscoresTable'>
            <Typography className='HighscoresTable-title' type='title'>Highscores</Typography>
            <Table>
              <TableHead>
                <TableRow>
                {columns.map((label, i) => (
                  <TableCell key={i}>{label}</TableCell>
                ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {api.highscores.data.map((highscore, i) => (
                  <TableRow key={highscore._id} style={this.getRowStyle(highscore)}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{moment.utc(highscore.details.seconds * 1000).format('HH:mm:ss')}</TableCell>
                    <TableCell numeric>{highscore.details.moves}</TableCell>
                    <TableCell>{moment(highscore.date).format('YYYY, MMMM Do, h:mm:ss a')}</TableCell>
                    <TableCell>{find(api.users.data, elem => elem._id === highscore.userId).fb.name}</TableCell>
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

  getRowStyle(highscore) {

    if (highscore.userId === this.props.api.clientUser.data._id) {
      return { fontWeight: 'bold' };
    }
  }
}