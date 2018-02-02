import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

  componentWillReceiveProps(nextProps) {
    
    this.setupOptionsComponent(nextProps.resultsFilter.game.id);
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
              onChange={e => this.onChange('CATEGORY', e.target.value)}
              disabled={this.shouldBeDisabled()}
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
              onChange={e => this.onChange('GAME', e.target.value)}
              disabled={this.shouldBeDisabled()}
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
        {/*<div>
          {Options && <Options
            options={resultsFilter.options}
            path={`/results?category=${resultsFilter.game.category}&id=${resultsFilter.game.id}`}
            onValueChangeCb={options => this.onChange('OPTIONS', options)}
            disabled={this.shouldBeDisabled()}
          />}
        </div>*/}
      </div>
    );
  }

  getMenuItemLink(category, id) {

    const { gameOptions, api } = this.props;

    if (!id) { id = api.games.data.find(obj => obj.categoryId === category).id; }
    let url = `/results?category=${category}&id=${id}`;
    for (const key in gameOptions[id]) { url += `&${key}=${gameOptions[id][key]}`; }
    return url;
  }

  onChange(subject, value) {

    // const { api, gameOptions, resultsFilter, onChange } = this.props;

    // switch (subject) {

    //    case 'CATEGORY':
    //     const gameId = api.games.data.find(obj => obj.categoryId === value).id;
    //     onChange(value, gameId, gameOptions[gameId]);
    //     this.setupOptionsComponent(gameId);
    //     break;

    //   case 'GAME':
    //     const options = resultsFilter.game.id !== value ? gameOptions[value] : resultsFilter.options;
    //     onChange(undefined, value, options);
    //     this.setupOptionsComponent(value);
    //     break;

    //   case 'OPTIONS':
    //     onChange(undefined, undefined, value);
    //     this.setupOptionsComponent(resultsFilter.game.id);
    //     break;

    //   default:
    //     return;
    // }
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
    return api.results.status !== 200 || api.results.isAwaiting;
  }
}