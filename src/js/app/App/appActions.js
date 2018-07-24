export const SET_APP_TITLE = 'SET_APP_TITLE';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
export const TOGGLE_APP_LOADER = 'TOGGLE_APP_LOADER';
export const TOGGLE_APP_DRAWER = 'TOGGLE_APP_DRAWER';

export const setAppTitle = title => ({
  type: SET_APP_TITLE,
  payload: {
    title: title
  }
});

export const setAuthStatus = status => ({
  type: SET_AUTH_STATUS,
  payload: {
    authStatus: status
  }
});

export const toggleAppLoader = show => ({
  type: TOGGLE_APP_LOADER,
  payload: {
    isLoading: show
  }
});

export const toggleAppDrawer = show => ({
  type: TOGGLE_APP_DRAWER,
  payload: {
    showDrawer: show
  }
});