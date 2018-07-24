export const apiRequest = (actionType, req) => {
  if (req) {
    return {
      type: actionType,
      payload: {
        headers: req.headers,
        params: req.params,
        query: req.query,
        body: req.body
      }
    }
  }
  return {
    type: actionType,
    payload: {}
  }
}

export const apiRequestSuccess = (actionType, res) => ({
  type: `${actionType}_SUCCESS`,
  payload: {
    method: res.config.method,
    url: res.config.url,
    status: res.status, 
    statusText: res.statusText,
    data: res.data
  }
});

export const apiRequestFailure = (actionType, err) => ({
  type: `${actionType}_FAILURE`,
  payload: {
    method: err.config.method,
    url: err.config.url,
    status: err.response ? err.response.status : 400,
    statusText: err.response ? err.response.statusText : 'BAD_REQUEST',
    data: err.response ? err.response.data : undefined
  }
});

export const apiRequestClear = (actionType) => ({
  type: `${actionType}_CLEAR`
});