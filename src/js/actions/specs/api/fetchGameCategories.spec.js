import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchGameCategories, API_FETCH_GAME_CATEGORIES } from 'js/actions/api';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async fetchGameCategories', () => {
  
  beforeAll(() => {
    localStorage.setItem('token', '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*');
  });

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
        type: API_FETCH_GAME_CATEGORIES,
        payload: {
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_GAME_CATEGORIES + '_SUCCESS',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/game-categories',
          },
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
        type: API_FETCH_GAME_CATEGORIES,
        payload: {
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_GAME_CATEGORIES + '_FAILURE',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/game-categories'
          },
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
