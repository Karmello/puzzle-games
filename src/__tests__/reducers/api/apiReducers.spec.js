import getApiRequestReducer from 'js/api/api.reducerCreators';
import { apiRequest, apiRequestSuccess, apiRequestFailure, apiRequestClear } from 'js/api/api.actionCreators';


describe('apiReducers', () => {

  const reducer = getApiRequestReducer('API_REQUEST');

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      req: { isAwaiting: false },
      res: { data: [] }
    });
  });

  it('should handle API_REQUEST', () => {

    const req = {
      params: { id: '1234' },
      query: { sort: 1 }
    };

    expect(reducer(undefined, apiRequest('API_REQUEST', req))).toEqual({
      req: {
        params: { id: '1234' },
        query: { sort: 1 },
        isAwaiting: true
      },
      res: { data: [] }
    });

    const state = {
      req: {
        params: { id: '9876' },
        query: { sort: -1 },
        body: { firstname: 'Alan', lastname: 'Watts' },
        method: 'POST',
        url: '/url',
        isAwaiting: false
      },
      res: {
        status: 200,
        statusText: 'OK',
        data: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    };

    expect(reducer(state, apiRequest('API_REQUEST', req))).toEqual({
      req: {
        params: { id: '1234' },
        query: { sort: 1 },
        isAwaiting: true
      },
      res: {
        status: 200,
        statusText: 'OK',
        data: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    });
  });

  it('should handle API_REQUEST_SUCCESS', () => {

    const state = {
      req: {
        params: { id: '1234' },
        query: { sort: 1 },
        body: { firstname: 'Alan', lastname: 'Watts' },
        isAwaiting: true
      },
      res: { data: [] }
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
        method: 'POST',
        url: '/url',
        isAwaiting: false
      },
      res: {
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
        method: 'POST',
        url: '/url',
        isAwaiting: false
      },
      res: {
        status: 400,
        statusText: 'BAD_REQUEST'
      }
    });
  });
});