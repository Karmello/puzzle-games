// @flow
import { HIGHSCORES_PAGE_CHANGE_FILTER, HIGHSCORES_PAGE_CLEAR } from 'js/actions/highscoresPage';

import type { T_Action, T_HighscoresPageSettings } from 'js/flow-types';

const initialState = {
  gameFilter: {},
  optionsFilter: {}
};

const highscoresPageReducer = (state:T_HighscoresPageSettings = initialState, action:T_Action) => {

  switch (action.type) {

    case HIGHSCORES_PAGE_CHANGE_FILTER:
      return {
        gameFilter: { ...action.payload.gameFilter },
        optionsFilter: { ...action.payload.optionsFilter }
      }

    case HIGHSCORES_PAGE_CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default highscoresPageReducer;