import { TOGGLE_APP_LOADER, SET_AUTH_STATUS, TOGGLE_APP_DRAWER } from 'js/actions/app';

const initialState = {
  name: 'Puzzle Games',
  authStatus: '',
  showDrawer: false,
  isLoading: true
};

const appReducer = (state = initialState, action) => {
  
  switch (action.type) {

     case TOGGLE_APP_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }

    case SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload.authStatus,
        showDrawer: false
      }

    case TOGGLE_APP_DRAWER:
      return {
        ...state,
        showDrawer: action.payload.showDrawer
      }

    default:
      return state;
  }
}

export default appReducer;