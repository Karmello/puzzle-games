export const apiRequest = (actionType, req) => {
  if (req) {
    return {
      type: actionType,
      payload: {
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

export const apiRequestSuccess = (actionType, res) => {
  return {
    type: `${actionType}_SUCCESS`,
    payload: {
      method: res.config.method,
      url: res.config.url,
      status: res.status, 
      statusText: res.statusText,
      data: res.data
    }
  }
}

export const apiRequestFailure = (actionType, err) => {
  return {
    type: `${actionType}_FAILURE`,
    payload: {
      method: err.config.method,
      url: err.config.url,
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}

export const apiRequestClear = (actionType) => {
  return {
    type: `${actionType}_CLEAR`
  }
}