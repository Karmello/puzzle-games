// @flow

import { SWITCH_GAME_CATEGORY_TAB, CHANGE_GAME_OPTIONS, GAMES_PAGE_CLEAR } from './gamesPageActions';

import type { Action } from 'types/store';
import type { T_GamesPageSettings } from 'js/pages';

const initialState = {
  category: '',
  options: {
    'boss-puzzle': {}
  }
};

const gamesPageReducer = (state:T_GamesPageSettings = initialState, action:Action) => {
  
  switch (action.type) {

    case SWITCH_GAME_CATEGORY_TAB:
      return {
        ...state,
        category: action.payload.category
      }

    case CHANGE_GAME_OPTIONS:
      return {
        ...state,
        options: {
          ...state.options,
          [action.meta.id]: {
            ...state.options[action.meta.id],
            ...action.payload.options
          }
        }
      }

    case GAMES_PAGE_CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default gamesPageReducer;