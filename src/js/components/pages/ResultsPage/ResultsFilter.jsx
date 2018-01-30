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
              disabled={this.shouldBeDisabled()}
            >
              {allGames.data.map(obj => (<MenuItem key={obj.id} value={obj.id}>{obj.name}</MenuItem>))}
            </Select>
          </FormControl>
        </div>
        <div>
          {Options && <Options
            options={resultsFilter.options}
            onValueChangeCb={options => this.onChange(resultsFilter.gameId, options)}
            disabled={this.shouldBeDisabled()}
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

  shouldBeDisabled() {
    const { results } = this.props;
    return results.status !== 200 || results.isFetching;
  }
}