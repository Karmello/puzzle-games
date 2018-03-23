import { CHANGE_HIGHSCORES_FILTER, HIGHSCORES_PAGE_CLEAR } from './highscoresPage.actions';

const initialState = {
  gameFilter: {},
  optionsFilter: {}
};

const highscoresPageReducer = (state = initialState, action) => {

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