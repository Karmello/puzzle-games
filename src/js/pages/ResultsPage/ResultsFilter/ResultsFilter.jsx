import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import './ResultsFilter.css';


export default class ResultsFilter extends Component {

  state = {
    gameId: undefined,
    Options: undefined
  }

  componentWillMount() {
    
    this.setupOptionsComponent(this.props.resultsFilter.game.id);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.resultsFilter.game.id !== this.state.gameId) {
      this.setupOptionsComponent(nextProps.resultsFilter.game.id);
    }
  }

  render() {
  
    const { Options } = this.state;
    const { api, resultsFilter } = this.props;

    return (
      <div className='ResultsFilter'>
        <div>
          <FormControl>
            <InputLabel htmlFor='game'>Category</InputLabel>
            <Select
              value={resultsFilter.game.category}
              input={<Input name='category' id='category' />}
              disabled={this.shouldBeDisabled()}
              style={{ width: '90px' }}
            >
              {api.gameCategories.data.map(obj => (
                <MenuItem
                  key={obj.id}
                  value={obj.id}
                  component={Link}
                  to={this.getMenuItemLink(obj.id)}
                >{obj.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='game'>Game</InputLabel>
            <Select
              value={resultsFilter.game.id}
              input={<Input name='game' id='game' />}
              disabled={this.shouldBeDisabled()}
              style={{ width: '130px' }}
            >
              {api.games.data.map(obj => {
                if (obj.categoryId === resultsFilter.game.category) {
                  return (
                    <MenuItem
                      key={obj.id}
                      value={obj.id}
                      component={Link}
                      to={this.getMenuItemLink(obj.categoryId, obj.id)}
                    >{obj.name}
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          {Options && <Options
            options={resultsFilter.options}
            path={`/results?category=${resultsFilter.game.category}&id=${resultsFilter.game.id}`}
            disabled={this.shouldBeDisabled()}
          />}
        </div>
      </div>
    );
  }

  getMenuItemLink(category, id) {

    const { gameOptions, resultsFilter, api } = this.props;
    let options;

    if (!id) { id = api.games.data.find(obj => obj.categoryId === category).id; }
    let url = `/results?category=${category}&id=${id}`;
    if (id !== resultsFilter.game.id) { options = gameOptions[id]; } else { options = resultsFilter.options; }
    for (const key in options) { url += `&${key}=${options[key]}`; }
    return url;
  }

  setupOptionsComponent(gameId) {

    try {
      const Options = require(`js/game/gameOptions/${gameId}Options/${gameId}Options`).default;
      this.setState({ gameId, Options });
    } catch(ex) {
      console.log(ex);
      this.setState({ gameId: undefined, Options: undefined });
    }
  }

  shouldBeDisabled() {
    const { api } = this.props;
    return api.results.status !== 200 || api.results.isAwaiting;
  }
}