import { SWITCH_GAME_CATEGORY_TAB, CHANGE_GAME_OPTIONS } from './gamesPage.actions';

const initialState = {
  category: 'sliding',
  options: {
    BossPuzzle: { mode: 'NUM', dimension: '3' },
    EightQueens: {}
  }
};

const gamesPageReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case SWITCH_GAME_CATEGORY_TAB:
      return {
        ...state,
        category: action.payload.category
      }

    case CHANGE_GAME_OPTIONS:
      return {
        ...state,
        options: {
          ...state.options,
          [action.meta.id]: {
            ...state.options[action.meta.id],
            ...action.payload.options
          }
        }
      }

    default:
      return state;
  }
}

export default gamesPageReducer;