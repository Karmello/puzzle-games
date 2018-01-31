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
    
    this.setupOptionsComponent(this.props.resultsFilter.game.id);
  }

  render() {
  
    const { api, resultsFilter } = this.props;
    const { Options } = this.state;

    return (
      <div className='ResultsFilter'>
        <div>
          <FormControl>
            <InputLabel htmlFor='game'>Category</InputLabel>
            <Select
              value={resultsFilter.game.category}
              input={<Input name='category' id='category' />}
              onChange={e => this.onChange({ category: e.target.value })}
              disabled={this.shouldBeDisabled()}
            >
              {api.gameCategories.data.map(obj => (<MenuItem key={obj.id} value={obj.id}>{obj.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='game'>Game</InputLabel>
            <Select
              value={resultsFilter.game.id}
              input={<Input name='game' id='game' />}
              onChange={e => this.onChange({ id: e.target.value })}
              disabled={this.shouldBeDisabled()}
            >
              {api.games.data.map(obj => {
                if (obj.categoryId === resultsFilter.game.category) {
                  return <MenuItem key={obj.id} value={obj.id}>{obj.name}</MenuItem>;
                }
                return null;
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          {Options && <Options
            options={resultsFilter.options}
            onValueChangeCb={options => this.onChange(undefined, options)}
            disabled={this.shouldBeDisabled()}
          />}
        </div>
      </div>
    );
  }

  onChange(gameFilter, optionsFilter) {

    const { api, resultsFilter } = this.props;
    
    if (gameFilter) {
      if (!gameFilter.id) {
        gameFilter.id = api.games.data.find(obj => obj.categoryId === gameFilter.category).id;
      } else if (!gameFilter.category) {
        gameFilter.category = api.games.data.find(obj => obj.id === gameFilter.id).categoryId;
      }
    }

    if (!optionsFilter) { this.setupOptionsComponent(gameFilter ? gameFilter.id : resultsFilter.game.id); }
    this.props.onChange(gameFilter || resultsFilter.game, optionsFilter);
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
    const { api } = this.props;
    return api.results.status !== 200 || api.results.isFetching;
  }
}