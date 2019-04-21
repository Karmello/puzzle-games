// @flow
import { APP_TOGGLE_LOADER, APP_SET_AUTH_STATUS, APP_SET_TITLE, APP_TOGGLE_DRAWER } from 'js/actions/app';
import type { T_Action, T_AppState } from 'js/flow-types';

const initialState = {
  NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV,
  title: 'Puzzle Games',
  authStatus: '',
  showDrawer: false,
  isLoading: true
};

const appReducer = (state:T_AppState = initialState, action:T_Action) => {
  
  switch (action.type) {

    case APP_SET_TITLE:
      return {
        ...state,
        title: action.payload.title
      }

    case APP_SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload.authStatus,
        showDrawer: false
      }

    case APP_TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading
      }

    case APP_TOGGLE_DRAWER:
      return {
        ...state,
        showDrawer: action.payload.showDrawer
      }

    default:
      return state;
  }
}

export default appReducer;
