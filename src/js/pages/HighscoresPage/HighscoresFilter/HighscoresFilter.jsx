import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import './HighscoresFilter.css';


export default class HighscoresFilter extends Component {

  state = {
    gameId: undefined,
    Options: undefined
  }

  componentWillMount() {
    
    this.setupOptionsComponent(this.props.highscoresFilter.game.id);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.highscoresFilter.game.id !== this.state.gameId) {
      this.setupOptionsComponent(nextProps.highscoresFilter.game.id);
    }
  }

  render() {
  
    const { Options } = this.state;
    const { api, highscoresFilter } = this.props;

    return (
      <div className='HighscoresFilter'>
        <div>
          <FormControl>
            <InputLabel htmlFor='game'>Category</InputLabel>
            <Select
              value={highscoresFilter.game.category}
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
              value={highscoresFilter.game.id}
              input={<Input name='game' id='game' />}
              disabled={this.shouldBeDisabled()}
              style={{ width: '130px' }}
            >
              {api.games.data.map(obj => {
                if (obj.categoryId === highscoresFilter.game.category) {
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
            options={highscoresFilter.options}
            path={`/highscores?category=${highscoresFilter.game.category}&id=${highscoresFilter.game.id}`}
            disabled={this.shouldBeDisabled()}
          />}
        </div>
      </div>
    );
  }

  getMenuItemLink(category, id) {

    const { gameOptions, highscoresFilter, api } = this.props;
    let options;

    if (!id) { id = api.games.data.find(obj => obj.categoryId === category).id; }
    let url = `/highscores?category=${category}&id=${id}`;
    if (id !== highscoresFilter.game.id) { options = gameOptions[id]; } else { options = highscoresFilter.options; }
    for (const key in options) { url += `&${key}=${options[key]}`; }
    return url;
  }

  setupOptionsComponent(gameId) {

    try {
      const Options = require(`js/gameOptions/${gameId}Options/${gameId}Options`).default;
      this.setState({ gameId, Options });
    } catch(ex) {
      console.log(ex);
      this.setState({ gameId: undefined, Options: undefined });
    }
  }

  shouldBeDisabled() {
    const { api } = this.props;
    return api.highscores.status !== 200 || api.highscores.isAwaiting;
  }
}