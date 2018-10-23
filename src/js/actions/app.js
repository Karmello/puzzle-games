// @flow
export const APP_SET_TITLE = 'APP_SET_TITLE';
export const APP_SET_AUTH_STATUS = 'APP_SET_AUTH_STATUS';
export const APP_TOGGLE_LOADER = 'APP_TOGGLE_LOADER';
export const APP_TOGGLE_DRAWER = 'APP_TOGGLE_DRAWER';

export const setAppTitle = (title:string) => ({
  type: APP_SET_TITLE,
  payload: {
    title: title
  }
});

export const setAuthStatus = (status:string) => ({
  type: APP_SET_AUTH_STATUS,
  payload: {
    authStatus: status
  }
});

export const toggleAppLoader = (show:boolean) => ({
  type: APP_TOGGLE_LOADER,
  payload: {
    isLoading: show
  }
});

export const toggleAppDrawer = (show:boolean) => ({
  type: APP_TOGGLE_DRAWER,
  payload: {
    showDrawer: show
  }
});