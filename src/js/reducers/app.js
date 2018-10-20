// @flow
import { TOGGLE_APP_LOADER, SET_AUTH_STATUS, SET_APP_TITLE, TOGGLE_APP_DRAWER } from 'js/actions/app';
import type { T_Action, T_AppSettings } from 'js/flow-types';

const initialState = {
  NODE_ENV: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV,
  title: 'Puzzle Games',
  authStatus: '',
  showDrawer: false,
  isLoading: true
};

const appReducer = (state:T_AppSettings = initialState, action:T_Action) => {
  
  switch (action.type) {

    case SET_APP_TITLE:
      return {
        ...state,
        title: action.payload.title
      }

    case SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload.authStatus,
        showDrawer: false
      }

    case TOGGLE_APP_LOADER:
      return {
        ...state,
        isLoading: action.payload.isLoading
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