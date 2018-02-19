import { CHANGE_HIGHSCORES_FILTER } from './highscoresPage.actions';

const initialState = {
  gameFilter: { category: 'sliding', id: 'BossPuzzle' },
  optionsFilter: { mode: 'NUM', dimension: '3' }
};

const highscoresPageReducer = (state = initialState, action) => {

  switch (action.type) {

    case CHANGE_HIGHSCORES_FILTER:
  
      const { category, id, options } = action.payload;
      const newState = { ...state };

      if (category) { newState.gameFilter.category = category; }
      if (id) { newState.gameFilter.id = id; }
      if (options) { newState.optionsFilter = { ...options }; }

      return newState;

    default:
      return state;
  }
}

export default highscoresPageReducer;