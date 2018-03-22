import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { loginUser, CLIENT_USER_ACTION } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async loginUser', () => {
  
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
        type: CLIENT_USER_ACTION,
        payload: {
          body: {
            username: 'AlanWatts',
            password: '********'
          }
        }
      },
      {
        type: CLIENT_USER_ACTION + '_SUCCESS',
        payload: {
          method: 'post',
          url: baseURL + '/user/login',
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
    
    return store.dispatch(loginUser({ username: 'AlanWatts', password: 'password' })).then(() => {
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
        type: CLIENT_USER_ACTION,
        payload: {
          body: {
            username: 'AlanWatts',
            password: '********'
          }
        }
      },
      {
        type: CLIENT_USER_ACTION + '_FAILURE',
        payload: {
          method: 'post',
          url: baseURL + '/user/login',
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(loginUser({ username: 'AlanWatts', password: 'password' })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});