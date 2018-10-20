import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { saveNewHighscore, SAVE_NEW_HIGHSCORE } from 'js/actions/api';

const mockStore = configureMockStore([thunk]);
const baseURL = process.env.REACT_APP_API_URI;


describe('async saveNewHighscore', () => {
  
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
        response: {
          _id : '5a88b1a32399f3011129d37d',
          date : '2018-02-17T22:50:11.066Z',
          details : { moves : 120, seconds : 30 },
          userId : '5a88b1a22399f3011129d37c',
          gameId : '5a88b19010216a6875e3163d',
          options : { mode : 'NUM', dimension : '3' }
        }
      });
    });
    
    const expectedActions = [
      {
        type: SAVE_NEW_HIGHSCORE,
        payload: {
          body: {
            details : { moves : 120, seconds : 30 },
            userId : '5a88b1a22399f3011129d37c',
            gameId : '5a88b19010216a6875e3163d',
            options : { mode : 'NUM', dimension : '3' }
          },
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: SAVE_NEW_HIGHSCORE + '_SUCCESS',
        payload: {
          config: {
            method: 'post',
            url: baseURL + '/highscore',
          },
          status: 200,
          statusText: 'OK',
          data: {
            _id : '5a88b1a32399f3011129d37d',
            date : '2018-02-17T22:50:11.066Z',
            details : { moves : 120, seconds : 30 },
            userId : '5a88b1a22399f3011129d37c',
            gameId : '5a88b19010216a6875e3163d',
            options : { mode : 'NUM', dimension : '3' }
          }
        }
      }
    ];
    
    const store = mockStore({});

    const newHighscore = {
      details : { moves : 120, seconds : 30 },
      userId : '5a88b1a22399f3011129d37c',
      gameId : '5a88b19010216a6875e3163d',
      options : { mode : 'NUM', dimension : '3' }
    };

    return store.dispatch(saveNewHighscore(newHighscore)).then(() => {
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
        type: SAVE_NEW_HIGHSCORE,
        payload: {
          body: {
            details : { moves : 120, seconds : 30 },
            userId : '5a88b1a22399f3011129d37c',
            gameId : '5a88b19010216a6875e3163d',
            options : { mode : 'NUM', dimension : '3' }
          },
          headers: {
            'x-access-token': '!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*!@#$%^&*'
          }
        }
      },
      {
        type: SAVE_NEW_HIGHSCORE + '_FAILURE',
        payload: {
          config: {
            method: 'post',
            url: baseURL + '/highscore',
          },
          status: 400,
          statusText: 'BAD_REQUEST'
        }
      }
    ];
    
    const store = mockStore({});

    const newHighscore = {
      details : { moves : 120, seconds : 30 },
      userId : '5a88b1a22399f3011129d37c',
      gameId : '5a88b19010216a6875e3163d',
      options : { mode : 'NUM', dimension : '3' }
    };

    return store.dispatch(saveNewHighscore(newHighscore)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});