// @flow

import { TOGGLE_EXPANSION_PANEL, GAME_PAGE_CLEAR } from 'js/pages/GamePage/gamePageActions';

import type { T_Action } from 'js/reducers';
import type { T_GamePageSettings } from 'js/pages';

const initialState = {
  infoExpanded: false,
  bestScoreExpanded: false
};

const gamePageReducer = (state:T_GamePageSettings = initialState, action:T_Action) => {
  
  switch (action.type) {

    case TOGGLE_EXPANSION_PANEL:
      return {
        ...state,
        [action.meta.name + 'Expanded']: action.payload.expanded
      }

    case GAME_PAGE_CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default gamePageReducer;