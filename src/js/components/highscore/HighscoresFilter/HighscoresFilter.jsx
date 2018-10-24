// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
import { isEmpty } from 'lodash';
import { Input, Select } from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';

import { GameOptions } from 'js/components';
import { kebabToCamelCase } from 'js/helpers';
import './HighscoresFilter.css';

import type { T_GameOptionsProps } from 'js/components';
import type { T_ApiEntities, T_GameOptionsModel } from 'js/flow-types';

type Props = {
  api:T_ApiEntities,
  gameOptions:T_GameOptionsModel,
  gameFilter:{ id?:string, category?:string },
  optionsFilter:T_GameOptionsModel
};

type State = {
  gameId?:string,
  Options?:React.ComponentType<T_GameOptionsProps>
};

export default class HighscoresFilter extends React.Component<Props, State> {

  getMenuItemLink:(categoryId:string, id?:string) => string;

  state = {
    gameId: undefined,
    Options: undefined
  }

  componentWillMount() {
    
    if (this.props.gameFilter.id) {
      this.setupOptionsComponent(this.props.gameFilter.id);
    }
  }

  componentWillReceiveProps(nextProps:Props) {

    if (nextProps.gameFilter.id !== this.state.gameId && nextProps.gameFilter.id) {
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
          {Options &&
          <GameOptions
            options={optionsFilter}
            path={gameFilter.id ? `/highscores/${gameFilter.id}` : ''}
            disabled={this.shouldBeDisabled()}
            Content={Options}
          ></GameOptions>}
        </div>
      </div>
    );
  }

  getMenuItemLink(category:string, id:string) {

    const { gameOptions, gameFilter, optionsFilter, api } = this.props;
    let options;

    if (!id) { id = api.games.res.data.find(obj => obj.categoryId === category).id; }
    let url = `/highscores/${id}`;
    if (id !== gameFilter.id) { options = gameOptions[id]; } else { options = optionsFilter; }
    if (!isEmpty(options)) { url += `?${qs.stringify(options)}`; }
    return url;
  }

  setupOptionsComponent(gameId:string) {

    let Options;

    if (this.props.gameOptions[gameId]) {
      const id = kebabToCamelCase(gameId);
      Options = require(`js/components/engineOptions/${id}Options`).default;
    }

    this.setState({ gameId, Options });
  }

  shouldBeDisabled() {
    const { api } = this.props;
    return api.highscores.res.status !== 200 || api.highscores.req.isAwaiting;
  }
}