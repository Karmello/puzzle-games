import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchHighscores, API_FETCH_HIGHSCORES } from 'js/actions/api';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async fetchHighscores', () => {
  
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
          '_id' : '5a88b1a32399f3011129d37d',
          'date' : '2018-02-17T22:50:11.066Z',
          'details' : { 'moves' : 120, 'seconds' : 30 },
          'username' : 'Karmello',
          'gameId' : 'boss-puzzle',
          'options' : { 'mode' : 'NUM', 'dimension' : '3' }
        }]
      });
    });
    
    const expectedActions = [
      {
        type: API_FETCH_HIGHSCORES,
        payload: {
          params: { gameId: '5a88b19010216a6875e3163d' },
          query: { mode: 'NUM', dimension: '3' },
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_HIGHSCORES + '_SUCCESS',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/highscores/5a88b19010216a6875e3163d?dimension=3&mode=NUM',
          },
          status: 200,
          statusText: 'OK',
          data: [{
            '_id' : '5a88b1a32399f3011129d37d',
            'date' : '2018-02-17T22:50:11.066Z',
            'details' : { 'moves' : 120, 'seconds' : 30 },
            'username' : 'Karmello',
            'gameId' : 'boss-puzzle',
            'options' : { 'mode' : 'NUM', 'dimension' : '3' }
          }]
        }
      }
    ];
    
    const store = mockStore({});
    const action = fetchHighscores('5a88b19010216a6875e3163d', { mode: 'NUM', dimension: '3' });

    return store.dispatch(action).then(() => {
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
        type: API_FETCH_HIGHSCORES,
        payload: {
          params: { gameId: '5a88b19010216a6875e3163d' },
          query: { mode: 'NUM', dimension: '3' },
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: API_FETCH_HIGHSCORES + '_FAILURE',
        payload: {
          config: {
            method: 'get',
            url: baseURL + '/highscores/5a88b19010216a6875e3163d?dimension=3&mode=NUM',
          },
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    const action = fetchHighscores('5a88b19010216a6875e3163d', { mode: 'NUM', dimension: '3' });

    return store.dispatch(action).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
