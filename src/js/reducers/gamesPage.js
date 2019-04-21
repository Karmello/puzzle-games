// @flow
import { GAMES_PAGE_SWITCH_CATEGORY_TAB, GAMES_PAGE_CHANGE_GAME_OPTIONS, GAMES_PAGE_CLEAR } from 'js/actions/gamesPage';
import type { T_Action, T_GamesPageState } from 'js/flow-types';

const initialState = {
  category: '',
  options: {
    'boss-puzzle': {},
    'knights-tour': {}
  }
};

const gamesPageReducer = (state:T_GamesPageState = initialState, action:T_Action) => {
  
  switch (action.type) {

    case GAMES_PAGE_SWITCH_CATEGORY_TAB:
      return {
        category: action.payload.category,
        options: {
          'boss-puzzle': { ...state.options['boss-puzzle'] },
          'knights-tour': { ...state.options['knights-tour'] }
        }
      }

    case GAMES_PAGE_CHANGE_GAME_OPTIONS:
      return {
        category: state.category,
        options: {
          'boss-puzzle': { ...state.options['boss-puzzle'] },
          'knights-tour': { ...state.options['knights-tour'] },
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
