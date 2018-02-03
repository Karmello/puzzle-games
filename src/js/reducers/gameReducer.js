import { START_GAME, STOP_GAME_LOADER, MAKE_MOVE, SET_AS_SOLVED, END_GAME } from 'js/actions/game';

const initialState = {
  id: undefined,
  moves: 0,
  isSolved: false,
  isLoading: true,
  options: {
    mode: undefined,
    dimension: undefined
  }
};

const gameReducer = (state = initialState, action) => {
  
  switch (action.type) {
  
    case START_GAME:
      return {
        id: action.payload.id,
        moves: 0,
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

    case MAKE_MOVE:
      return {
        ...state,
        moves: state.moves + 1
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