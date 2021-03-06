import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchUsers, API_FETCH_USERS } from 'js/actions/api';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async fetchUsers', () => {
  
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
        response: [{
          _id: '000000000000000000000000',
          username: 'AlanWatts'
        }]
      });
    });
    
    const expectedActions = [
      {
        type: API_FETCH_USERS,
        payload: {
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_USERS + '_SUCCESS',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/users',
          },
          status: 200,
          statusText: 'OK',
          data: [{
            _id: '000000000000000000000000',
            username: 'AlanWatts'
          }]
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchUsers()).then(() => {
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
        type: API_FETCH_USERS,
        payload: {
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_USERS + '_FAILURE',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/users',
          },
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchUsers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
