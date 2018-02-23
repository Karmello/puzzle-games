import appReducer from 'js/app/app.reducer';
import { setAppTitle, setAuthStatus, toggleAppLoader, toggleAppDrawer } from 'js/app/app.actions';


describe('appReducer', () => {

  it('should return the initial state', () => {
    expect(appReducer(undefined, {})).toEqual({
      NODE_ENV: 'test',
      title: 'Puzzle Games',
      authStatus: '',
      showDrawer: false,
      isLoading: true
    });
  });

  it('should handle SET_APP_TITLE', () => {
    expect(appReducer({
      NODE_ENV: 'test',
      title: 'Puzzle Games',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: true
    }, setAppTitle('Eight Queens'))).toEqual({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: true
    });
  });

  it('should handle SET_AUTH_STATUS', () => {
    expect(appReducer({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: '',
      showDrawer: true,
      isLoading: false
    }, setAuthStatus('connected'))).toEqual({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: false
    });
  });

  it('should handle TOGGLE_APP_LOADER', () => {
    
    expect(appReducer({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: false
    }, toggleAppLoader(true))).toEqual({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: true
    });

    expect(appReducer({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: true
    }, toggleAppLoader(false))).toEqual({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: false
    });
  });

  it('should handle TOGGLE_APP_DRAWER', () => {
    
    expect(appReducer({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: false
    }, toggleAppDrawer(true))).toEqual({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: true,
      isLoading: false
    });

    expect(appReducer({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: true,
      isLoading: false
    }, toggleAppDrawer(false))).toEqual({
      NODE_ENV: 'test',
      title: 'Eight Queens',
      authStatus: 'connected',
      showDrawer: false,
      isLoading: false
    });
  });
});