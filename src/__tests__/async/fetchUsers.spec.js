import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchUsers, FETCH_USERS } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);


describe('async fetchUsers', () => {
  
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
          fb: { id: '1234567890', name: 'Alan Watts' }
        }]
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_USERS,
        payload: {}
      },
      {
        type: FETCH_USERS + '_SUCCESS',
        payload: {
          method: 'get',
          url: '/users',
          status: 200,
          statusText: 'OK',
          data: [{
            _id: '000000000000000000000000',
            fb: { id: '1234567890', name: 'Alan Watts' }
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
        type: FETCH_USERS,
        payload: {}
      },
      {
        type: FETCH_USERS + '_FAILURE',
        payload: {
          method: 'get',
          url: '/users',
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