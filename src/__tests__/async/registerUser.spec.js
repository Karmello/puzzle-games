import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { registerUser, REGISTER_OR_LOGIN_USER } from 'js/api/api.actions';

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
        type: REGISTER_OR_LOGIN_USER,
        payload: {
          body: {
            username: 'AlanWatts',
            password: '********'
          }
        }
      },
      {
        type: REGISTER_OR_LOGIN_USER + '_SUCCESS',
        payload: {
          method: 'post',
          url: baseURL + '/user/register',
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
        type: REGISTER_OR_LOGIN_USER,
        payload: {
          body: {
            username: 'AlanWatts',
            password: '********'
          }
        }
      },
      {
        type: REGISTER_OR_LOGIN_USER + '_FAILURE',
        payload: {
          method: 'post',
          url: baseURL + '/user/register',
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