// @flow
import { HIGHSCORES_PAGE_CHANGE_FILTER, HIGHSCORES_PAGE_CLEAR } from 'js/actions/highscoresPage';

import type { T_Action, T_HighscoresPageState } from 'js/flow-types';

const initialState = {
  gameFilter: {},
  optionsFilter: {}
};

const highscoresPageReducer = (state:T_HighscoresPageState = initialState, action:T_Action) => {

  switch (action.type) {

    case HIGHSCORES_PAGE_CHANGE_FILTER:
      return action.payload;

    case HIGHSCORES_PAGE_CLEAR:
      return initialState;

    default:
      return state;
  }
}

export default highscoresPageReducer;
