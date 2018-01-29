import React, { Component } from 'react';
import { Input, Select } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';


export default class ResultsFilter extends Component {

  state = {
    Options: undefined
  }

  componentWillMount() {
    
    this.setupOptionsComponent(this.props.resultsFilter.gameId);
  }

  render() {
  
    const { allGames, resultsFilter } = this.props;
    const { Options } = this.state;

    return (
      <div className='ResultsFilter'>
        <div>
          <FormControl>
            <InputLabel htmlFor='game'>Game</InputLabel>
            <Select
              value={resultsFilter.gameId}
              input={<Input name='game' id='game' />}
              onChange={e => this.onChange(e.target.value)}
            >
              {allGames.data.map(elem => (<MenuItem key={elem.id} value={elem.id}>{elem.name}</MenuItem>))}
            </Select>
          </FormControl>
        </div>
        <div>
          {Options && <Options
            options={resultsFilter}
            onValueChangeCb={options => this.onChange(resultsFilter.gameId, options)}
          />}
        </div>
      </div>
    );
  }

  onChange(gameId, options) {

    if (!options) { this.setupOptionsComponent(gameId); }
    this.props.onChange(gameId, options);
  }

  setupOptionsComponent(gameId) {

    try {
      const Options = require(`js/components/game/gameOptions/${gameId}Options/${gameId}Options`).default;
      this.setState({ Options });
    } catch(ex) {
      console.log(ex);
      this.setState({ Options: undefined });
    }
  }
}