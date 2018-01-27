export const toggleAppLoader = (show) => {
  return {
    type: 'TOGGLE_APP_LOADER',
    payload: {
      isLoading: show
    }
  }
}

export const setAuthStatus = (status) => {
  return {
    type: 'SET_AUTH_STATUS',
    payload: {
      authStatus: status
    }
  }
}

export const toggleAppDrawer = (show) => {
  return {
    type: 'TOGGLE_APP_DRAWER',
    payload: {
      showDrawer: show
    }
  }
}