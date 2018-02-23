import { CHANGE_HIGHSCORES_FILTER } from './highscoresPage.actions';

const initialState = {
  gameFilter: { category: 'sliding', id: 'BossPuzzle' },
  optionsFilter: { mode: 'NUM', dimension: '3' }
};

const highscoresPageReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_HIGHSCORES_FILTER:
      return {
        gameFilter: { ...action.payload.gameFilter },
        optionsFilter: { ...action.payload.optionsFilter }
      }

    default:
      return state;
  }
}

export default highscoresPageReducer;