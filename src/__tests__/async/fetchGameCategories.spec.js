import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchGameCategories, FETCH_GAME_CATEGORIES } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);


describe('async fetchGameCategories', () => {
  
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  
  it('should return valid response', () => {
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: [{ id: 'sliding' }, { id: 'chess' }]
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_GAME_CATEGORIES,
        payload: {}
      },
      {
        type: FETCH_GAME_CATEGORIES + '_SUCCESS',
        payload: {
          method: 'get',
          url: '/game-categories',
          status: 200,
          statusText: 'OK',
          data: [{ id: 'sliding' }, { id: 'chess' }]
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchGameCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return valid error', () => {
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        statusText: 'BAD_REQUEST'
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_GAME_CATEGORIES,
        payload: {}
      },
      {
        type: FETCH_GAME_CATEGORIES + '_FAILURE',
        payload: {
          method: 'get',
          url: '/game-categories',
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchGameCategories()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});