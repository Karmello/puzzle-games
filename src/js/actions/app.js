export const TOGGLE_APP_LOADER = 'TOGGLE_APP_LOADER';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
export const TOGGLE_APP_DRAWER = 'TOGGLE_APP_DRAWER';

export const toggleAppLoader = (show) => {
  return {
    type: TOGGLE_APP_LOADER,
    payload: {
      isLoading: show
    }
  }
}

export const setAuthStatus = (status) => {
  return {
    type: SET_AUTH_STATUS,
    payload: {
      authStatus: status
    }
  }
}

export const toggleAppDrawer = (show) => {
  return {
    type: TOGGLE_APP_DRAWER,
    payload: {
      showDrawer: show
    }
  }
}