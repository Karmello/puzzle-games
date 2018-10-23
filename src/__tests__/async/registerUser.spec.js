import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { registerUser, API_MAKE_AUTH_REQUEST } from 'js/actions/api';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async registerUser', () => {
  
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  
  it('should return valid response', () => {
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: {
          token: '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*',
          user: {
            _id: '000000000000000000000000',
            username: 'AlanWatts'
          }
        }
      });
    });
    
    const expectedActions = [
      {
        type: API_MAKE_AUTH_REQUEST,
        payload: {
          body: {
            username: 'AlanWatts',
            password: '********'
          }
        }
      },
      {
        type: API_MAKE_AUTH_REQUEST + '_SUCCESS',
        payload: {
          config: {
            method: 'post',
            url: baseURL + '/user/register',
          },
          status: 200,
          statusText: 'OK',
          data: {
            _id: '000000000000000000000000',
            username: 'AlanWatts'
          }
        }
      }
    ];
    
    const store = mockStore({});

    return store.dispatch(registerUser({ username: 'AlanWatts', password: 'password' })).then(() => {
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
        type: API_MAKE_AUTH_REQUEST,
        payload: {
          body: {
            username: 'AlanWatts',
            password: '********'
          }
        }
      },
      {
        type: API_MAKE_AUTH_REQUEST + '_FAILURE',
        payload: {
          config: {
            method: 'post',
            url: baseURL + '/user/register',
          },
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});

    return store.dispatch(registerUser({ username: 'AlanWatts', password: 'password' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});