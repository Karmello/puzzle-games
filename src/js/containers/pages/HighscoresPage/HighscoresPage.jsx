// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { App } from 'js/containers';
import { GameBtn } from 'js/components';
import { fetchHighscores } from 'js/actions/api';
import { changeHighscoresFilter } from 'js/actions/highscoresPage';
import { HighscoresFilter, HighscoresTable } from 'js/components';
import './HighscoresPage.css';

import type { T_HighscoresPageSettings, T_ApiEntities, T_GameOptionsModel } from 'js/flow-types';

type Props = {
  gameOptions:T_GameOptionsModel,
  highscoresPage:T_HighscoresPageSettings,
  api:T_ApiEntities,
  gameFilterToSet:{ id:string, category:string },
  optionsFilterToSet:T_GameOptionsModel,
  dispatch:Function
};

class HighscoresPage extends Component<Props> {

  componentWillMount() {
    const { gameFilterToSet, optionsFilterToSet } = this.props;
    this.onChange(gameFilterToSet, optionsFilterToSet);
  }
  
  componentWillReceiveProps(nextProps) {

    const { gameFilterToSet, optionsFilterToSet } = this.props;
    const nextGameFilterToSet = nextProps.gameFilterToSet;
    const nextOptionsFilterToSet = nextProps.optionsFilterToSet;

    let anyOptionChanged;

    if (nextOptionsFilterToSet && optionsFilterToSet) {
      const keys = Object.keys(nextOptionsFilterToSet);
      anyOptionChanged = keys.some(key => nextOptionsFilterToSet[key] !== optionsFilterToSet[key]);
    }

    if (gameFilterToSet.category !== nextGameFilterToSet.category || gameFilterToSet.id !== nextGameFilterToSet.id || anyOptionChanged) {
      this.onChange(nextGameFilterToSet, nextOptionsFilterToSet);
    }
  }

  render() {

    const { gameOptions, highscoresPage, api } = this.props;

    if (!highscoresPage.gameFilter.category || !highscoresPage.gameFilter.id) {
      return null;
    }

    return (
      <div className='HighscoresPage'>
        <div>
          <HighscoresFilter
            api={api}
            gameOptions={gameOptions}
            gameFilter={highscoresPage.gameFilter}
            optionsFilter={highscoresPage.optionsFilter}
          />
        </div>
        <div className='HighscoresPage-actionBtns'>
          <GameBtn
            name='play'
            label='Play'
            gameCategory={highscoresPage.gameFilter.category}
            gameId={highscoresPage.gameFilter.id}
            gameOptions={highscoresPage.optionsFilter}
          />
        </div>
        <div>
          <HighscoresTable api={api} />
        </div>
      </div>
    );
  }

  onChange(gameFilterToSet, optionsFilterToSet) {
    
    const { dispatch, api } = this.props;
    let ui = localStorage.getItem('ui');

    if (ui) {
      ui = JSON.parse(ui);
      const username = api.clientUser.res.data.username;
      ui[username].highscoresPage.gameFilter = gameFilterToSet;
      ui[username].highscoresPage.optionsFilter = optionsFilterToSet;
      localStorage.setItem('ui', JSON.stringify(ui));
      dispatch(changeHighscoresFilter(gameFilterToSet, optionsFilterToSet));
      dispatch(fetchHighscores(gameFilterToSet.id, optionsFilterToSet, App.minLoadTime));
    }
  }
}

export default connect(store => ({
  gameOptions: store.pages.gamesPage.options,
  highscoresPage: store.pages.highscoresPage,
  api: store.api
}))(HighscoresPage);