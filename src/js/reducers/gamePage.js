// @flow
import { GAME_PAGE_TOGGLE_EXPANSION_PANEL, GAME_PAGE_CLEAR } from 'js/actions/gamePage';

import type { T_Action, T_GamePageState } from 'js/flow-types';

const initialState = {
  infoExpanded: false,
  bestScoreExpanded: false
};

const gamePageReducer = (state:T_GamePageState = initialState, action:T_Action) => {
  
  switch (action.type) {

    case GAME_PAGE_TOGGLE_EXPANSION_PANEL:
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
