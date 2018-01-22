import React, { Component } from 'react';
import { Button, Card, Input, Select, Typography } from 'material-ui';
import { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';

import { modes } from './NewGameSetup.modes';
import './NewGameSetup.css';


export default class NewGameSetup extends Component {
  
  render() {

    const { frame } = this.props;

    return (
      <div className='NewGameSetup'>
        <div className='NewGameSetup-settings'>
          <div>
            <FormControl>
              <InputLabel htmlFor='dimension'>Dimension</InputLabel>
              <Select
                value={frame.dimension}
                input={<Input name='dimension' id='dimension' />}
                onChange={this.onDimensionChange.bind(this)}
              >
                <MenuItem value={3}>3 x 3</MenuItem>
                <MenuItem value={4}>4 x 4</MenuItem>
                <MenuItem value={5}>5 x 5</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='NewGameSetup-modes'>
          { modes.map((mode, key) => (
          <div key={key}>
            <Card>
              {mode.img && <CardMedia image={mode.img.src} title={mode.img.title} />}
              <CardContent>
                <Typography type='headline' component='h2'>{mode.title}</Typography>
                <Typography component='p'>{mode.description}</Typography>
              </CardContent>
              <CardActions className='NewGameSetup-actions'>
                <Button dense color='primary' onClick={() => { this.props.onChoose(mode.id) }}>Play</Button>
              </CardActions>
            </Card>
          </div>))}
        </div>
      </div>
    );
  }

  onDimensionChange(e) {

    if (e.target.value !== this.props.frame.dimension) {
      this.props.onDimensionChange(e.target.value);
    }
  }
}