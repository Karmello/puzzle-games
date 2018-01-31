import { START_GAME, STOP_GAME_LOADER, SET_AS_SOLVED, END_GAME } from 'js/actions/game';

const initialState = {
  id: undefined,
  isSolved: false,
  isLoading: true,
  options: {
    dimension: undefined,
    style: undefined
  }
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case START_GAME:
      return {
        id: action.payload.id,
        isSolved: false,
        isLoading: true,
        options: {
          ...(action.payload.options || state.options)
        }
      }
  
    case STOP_GAME_LOADER:
      return {
        ...state,
        isLoading: false
      }

    case SET_AS_SOLVED:
      return {
        ...state,
        isSolved: true
      }

    case END_GAME:
      return {
        ...initialState,
        isLoading: false
      }

    default:
      return state;
  }
}

export default gameReducer;