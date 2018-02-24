import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Input, Select } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import './HighscoresFilter.css';


class HighscoresFilter extends Component {

  state = {
    gameId: undefined,
    Options: undefined
  }

  componentWillMount() {
    
    this.setupOptionsComponent(this.props.gameFilter.id);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.gameFilter.id !== this.state.gameId) {
      this.setupOptionsComponent(nextProps.gameFilter.id);
    }
  }

  render() {
  
    const { Options } = this.state;
    const { api, gameFilter, optionsFilter } = this.props;

    return (
      <div className='HighscoresFilter'>
        <div>
          <FormControl>
            <InputLabel htmlFor='game'>Category</InputLabel>
            <Select
              value={gameFilter.category}
              input={<Input name='category' id='category' />}
              disabled={this.shouldBeDisabled()}
              style={{ width: '90px' }}
            >
              {api.gameCategories.res.data.map(obj => (
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
              value={gameFilter.id}
              input={<Input name='game' id='game' />}
              disabled={this.shouldBeDisabled()}
              style={{ width: '130px' }}
            >
              {api.games.res.data.map(obj => {
                if (obj.categoryId === gameFilter.category) {
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
            options={optionsFilter}
            path={`/highscores?category=${gameFilter.category}&id=${gameFilter.id}`}
            disabled={this.shouldBeDisabled()}
          />}
        </div>
      </div>
    );
  }

  getMenuItemLink(category, id) {

    const { gameOptions, gameFilter, optionsFilter, api } = this.props;
    let options;

    if (!id) { id = api.games.res.data.find(obj => obj.categoryId === category).id; }
    let url = `/highscores?category=${category}&id=${id}`;
    if (id !== gameFilter.id) { options = gameOptions[id]; } else { options = optionsFilter; }
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
    return api.highscores.res.status !== 200 || api.highscores.req.isAwaiting;
  }
}

HighscoresFilter.propTypes = {
  api: PropTypes.object.isRequired,
  gameOptions: PropTypes.object.isRequired,
  gameFilter: PropTypes.object.isRequired,
  optionsFilter: PropTypes.object.isRequired
};

export default HighscoresFilter;