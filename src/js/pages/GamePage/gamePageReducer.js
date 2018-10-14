// @flow

import { TOGGLE_EXPANSION_PANEL, GAME_PAGE_CLEAR } from 'js/pages/GamePage/gamePageActions';

import type { Action, GamePageStore } from 'types/store';

const initialState = {
  infoExpanded: false,
  bestScoreExpanded: false
};

const gamePageReducer = (state:GamePageStore = initialState, action:Action) => {
  
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