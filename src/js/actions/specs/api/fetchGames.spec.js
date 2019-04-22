import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchGames, API_FETCH_GAMES } from 'js/actions/api';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async fetchGames', () => {
  
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
        response: [{ id: 'boss-puzzle' }, { id: 'eight-queens' }]
      });
    });
    
    const expectedActions = [
      {
        type: API_FETCH_GAMES,
        payload: {
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_GAMES + '_SUCCESS',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/games',
          },
          status: 200,
          statusText: 'OK',
          data: [{ id: 'boss-puzzle' }, { id: 'eight-queens' }]
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchGames()).then(() => {
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
        type: API_FETCH_GAMES,
        payload: {
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_GAMES + '_FAILURE',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/games',
          },
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchGames()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
