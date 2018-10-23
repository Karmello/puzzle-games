// @flow
import React, { Component } from 'react';
import { Paper, Typography } from 'material-ui';
import moment from 'moment';
import { Table } from 'material-ui';
import { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import { Loader } from 'js/components';
import './HighscoresTable.css';

import type { T_HighscoreModel, T_ApiEntities } from 'js/flow-types';

type Props = {
  api:T_ApiEntities
};

type State = {
  dataStatus:string
};

const columns = ['No.', 'Player', 'Time', 'Moves', 'Date'];

export default class HighscoresTable extends Component<Props, State> {

  state = { dataStatus: '' };

  componentWillReceiveProps(nextProps:Props) {
    
    const { api } = nextProps;

    if (api.highscores.req.isAwaiting) {
      this.setState({ dataStatus: 'LOADING' });

    } else if (api.highscores.res.status === 200 && api.highscores.res.data) {
      this.setState({ dataStatus: api.highscores.res.data.length === 0 ? 'NO_DATA' : 'DATA_READY' });
    
    } else {
      this.setState({ dataStatus: '' });
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
            <Typography className='HighscoresTable-title' variant='title'>Highscores</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((label, i) => (
                    <TableCell key={i}>{label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {api.highscores.res.data.map((highscore, i) => (
                  <TableRow key={highscore._id} style={this.getRowStyle(highscore)}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{highscore.username}</TableCell>
                    <TableCell>{moment.utc(highscore.details.seconds * 1000).format('HH:mm:ss')}</TableCell>
                    <TableCell numeric>{highscore.details.moves}</TableCell>
                    <TableCell>{moment(highscore.date).format('YYYY, MMMM Do, h:mm:ss a')}</TableCell>
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

  getRowStyle(highscore:T_HighscoreModel) {

    if (highscore.username === this.props.api.clientUser.res.data.username) {
      return { fontWeight: 'bold' };
    }
  }
}