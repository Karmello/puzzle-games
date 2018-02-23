import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { fetchHighscores, FETCH_HIGHSCORES } from 'js/api/api.actions';

const mockStore = configureMockStore([thunk]);


describe('async fetchHighscores', () => {
  
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
          'userId' : '5a88b1a22399f3011129d37c',
          'gameId' : '5a88b19010216a6875e3163d',
          'options' : { 'mode' : 'NUM', 'dimension' : '3' }
        }]
      });
    });
    
    const expectedActions = [
      {
        type: FETCH_HIGHSCORES,
        payload: {
          params: { gameId: '5a88b19010216a6875e3163d' },
          query: { mode: 'NUM', dimension: '3' }
        }
      },
      {
        type: FETCH_HIGHSCORES + '_SUCCESS',
        payload: {
          method: 'get',
          url: '/highscores/5a88b19010216a6875e3163d',
          status: 200,
          statusText: 'OK',
          data: [{
            '_id' : '5a88b1a32399f3011129d37d',
            'date' : '2018-02-17T22:50:11.066Z',
            'details' : { 'moves' : 120, 'seconds' : 30 },
            'userId' : '5a88b1a22399f3011129d37c',
            'gameId' : '5a88b19010216a6875e3163d',
            'options' : { 'mode' : 'NUM', 'dimension' : '3' }
          }]
        }
      }
    ];
    
    const store = mockStore({});
    const action = fetchHighscores('5a88b19010216a6875e3163d', { mode: 'NUM', dimension: '3' }, 50);

    return store.dispatch(action).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, 50);
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
        type: FETCH_HIGHSCORES,
        payload: {
          params: { gameId: '5a88b19010216a6875e3163d' },
          query: { mode: 'NUM', dimension: '3' }
        }
      },
      {
        type: FETCH_HIGHSCORES + '_FAILURE',
        payload: {
          method: 'get',
          url: '/highscores/5a88b19010216a6875e3163d',
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});
    const action = fetchHighscores('5a88b19010216a6875e3163d', { mode: 'NUM', dimension: '3' }, 50);

    return store.dispatch(action).then(() => {
      setTimeout(() => {
        expect(store.getActions()).toEqual(expectedActions);
      }, 50);
    });
  });
});