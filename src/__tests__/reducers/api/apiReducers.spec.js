import getApiRequestReducer from 'js/api/apiReducerCreators';
import { apiRequest, apiRequestSuccess, apiRequestFailure } from 'js/api/apiActionCreators';


describe('apiReducers', () => {

  const reducer = getApiRequestReducer('API_REQUEST');

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      req: {
        isAwaiting: false
      },
      res: {
        config: {
          method: '',
          url: '',
        },
        status: 0,
        statusText: '',
        data: undefined
      }
    });
  });

  it('should handle API_REQUEST', () => {

    const req = {
      params: { id: '1234' },
      query: { sort: 1 }
    };

    expect(reducer(undefined, apiRequest('API_REQUEST', req))).toEqual({
      req: {
        isAwaiting: true,
        params: { id: '1234' },
        query: { sort: 1 },
        body: undefined,
        headers: undefined
      },
      res: {
        config: {
          method: '',
          url: ''
        },
        data: undefined,
        status: 0,
        statusText: ''
      }
    });

    const state = {
      req: {
        isAwaiting: false,
        params: { id: '9876' },
        query: { sort: -1 },
        body: { firstname: 'Alan', lastname: 'Watts' }
      },
      res: {
        config: {
          method: 'POST',
          url: '/url',
        },
        status: 200,
        statusText: 'OK',
        data: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    };

    expect(reducer(state, apiRequest('API_REQUEST', req))).toEqual({
      req: {
        isAwaiting: true,
        params: { id: '1234' },
        query: { sort: 1 }
      },
      res: {
        config: {
          method: 'POST',
          url: '/url',
        },
        status: 200,
        statusText: 'OK',
        data: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    });
  });

  it('should handle API_REQUEST_SUCCESS', () => {

    const state = {
      req: {
        isAwaiting: true,
        params: { id: '1234' },
        query: { sort: 1 },
        body: { firstname: 'Alan', lastname: 'Watts' }
      },
      res: {
        data: []
      }
    };

    const res = {
      config: { method: 'POST', url: '/url' },
      status: 200,
      statusText: 'OK',
      data: [{ id: 1 }, { id: 2 }, { id: 3 }]
    };

    expect(reducer(state, apiRequestSuccess('API_REQUEST', res)), ).toEqual({
      req: {
        params: { id: '1234' },
        query: { sort: 1 },
        body: { firstname: 'Alan', lastname: 'Watts' },
        isAwaiting: false
      },
      res: {
        config: {
          method: 'POST',
          url: '/url',
        },
        status: 200,
        statusText: 'OK',
        data: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    });
  });

  it('should handle API_REQUEST_FAILURE', () => {

    const state = {
      req: {
        params: { id: '1234' },
        query: { sort: 1 },
        body: { firstname: 'Alan', lastname: 'Watts' },
        isAwaiting: true
      },
      res: { data: [] }
    };

    const err = {
      config: { method: 'POST', url: '/url' },
      response: { status: 400, statusText: 'BAD_REQUEST' }
    };

    expect(reducer(state, apiRequestFailure('API_REQUEST', err)), ).toEqual({
      req: {
        params: { id: '1234' },
        query: { sort: 1 },
        body: { firstname: 'Alan', lastname: 'Watts' },
        isAwaiting: false
      },
      res: {
        config: {
          method: 'POST',
          url: '/url',
        },
        status: 400,
        statusText: 'BAD_REQUEST'
      }
    });
  });
});