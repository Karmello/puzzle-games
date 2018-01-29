import { CHANGE_GAME_OPTIONS } from 'js/actions/gameOptions';

const initialState = {
  'BossPuzzle': { dimension: 3, style: 'IMG' },
  'AnotherGame': { option1: 'value1', option2: 'value2' }
};

const gameOptionsReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case CHANGE_GAME_OPTIONS:
      return {
        ...state,
        [action.meta.id]: {
          ...action.payload.options
        } 
      }

    default:
      return state;
  }
}

export default gameOptionsReducer;