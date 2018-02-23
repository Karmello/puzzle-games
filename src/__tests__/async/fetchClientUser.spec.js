import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchClientUser, FETCH_OR_CREATE_CLIENT_USER } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);


describe('async fetchClientUser', () => {
  
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
        payload: { params: { fbId: '1234567890' } }
      },
      {
        type: FETCH_OR_CREATE_CLIENT_USER + '_SUCCESS',
        payload: {
          method: 'get',
          url: '/user/1234567890',
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
    
    return store.dispatch(fetchClientUser('1234567890')).then(() => {
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
        payload: { params: { fbId: '1234567890' } }
      },
      {
        type: FETCH_OR_CREATE_CLIENT_USER + '_FAILURE',
        payload: {
          method: 'get',
          url: '/user/1234567890',
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    
    return store.dispatch(fetchClientUser('1234567890')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});