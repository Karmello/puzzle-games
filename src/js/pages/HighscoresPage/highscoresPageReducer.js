// @flow
import { CHANGE_HIGHSCORES_FILTER, HIGHSCORES_PAGE_CLEAR } from './highscoresPageActions';

import type { T_Action } from 'js/reducers';
import type { T_HighscoresPageSettings } from 'js/pages';

const initialState = {
  gameFilter: {},
  optionsFilter: {}
};

const highscoresPageReducer = (state:T_HighscoresPageSettings = initialState, action:T_Action) => {

  switch (action.type) {

    case CHANGE_HIGHSCORES_FILTER:
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