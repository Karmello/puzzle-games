import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchGames, FETCH_GAMES } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async fetchGames', () => {
  
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  
  it('should return valid response', () => {
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        statusText: 'OK',
        response: [{ id: 'BossPuzzle' }, { id: 'EightQueens' }]
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_GAMES,
        payload: {}
      },
      {
        type: FETCH_GAMES + '_SUCCESS',
        payload: {
          method: 'get',
          url: baseURL + '/games',
          status: 200,
          statusText: 'OK',
          data: [{ id: 'BossPuzzle' }, { id: 'EightQueens' }]
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
        type: FETCH_GAMES,
        payload: {}
      },
      {
        type: FETCH_GAMES + '_FAILURE',
        payload: {
          method: 'get',
          url: baseURL + '/games',
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