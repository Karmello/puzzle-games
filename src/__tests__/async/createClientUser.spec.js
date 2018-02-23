import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { createClientUser, FETCH_OR_CREATE_CLIENT_USER } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async createClientUser', () => {
  
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  
  it('should return valid response', () => {
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: {
          _id: '000000000000000000000000',
          fb: { id: '1234567890', name: 'Alan Watts' }
        }
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_OR_CREATE_CLIENT_USER,
        payload: {
          body: {
            fb: { id: '1234567890', name: 'Alan Watts' }
          }
        }
      },
      {
        type: FETCH_OR_CREATE_CLIENT_USER + '_SUCCESS',
        payload: {
          method: 'post',
          url: baseURL + '/user',
          status: 200,
          statusText: 'OK',
          data: {
            _id: '000000000000000000000000',
            fb: { id: '1234567890', name: 'Alan Watts' }
          }
        }
      }
    ];
    
    const store = mockStore({});

    return store.dispatch(createClientUser({
      fb: { id: '1234567890', name: 'Alan Watts' }
    })).then(() => {
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
        type: FETCH_OR_CREATE_CLIENT_USER,
        payload: {
          body: {
            fb: { id: '1234567890', name: 'Alan Watts' }
          }
        }
      },
      {
        type: FETCH_OR_CREATE_CLIENT_USER + '_FAILURE',
        payload: {
          method: 'post',
          url: baseURL + '/user',
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});

    return store.dispatch(createClientUser({
      fb: { id: '1234567890', name: 'Alan Watts' }
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});