export const apiRequest = (actionType) => {
  return {
    type: actionType,
    payload: {
      isFetching: true
    }
  }
}

export const apiRequestSuccess = (actionType, res) => {
  return {
    type: `${actionType}_SUCCESS`,
    payload: {
      isFetching: false,
      method: res.config.method,
      url: res.config.url,
      params: res.config.params,
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
      isFetching: false,
      method: err.config.method,
      url: err.config.url,
      params: err.config.params,
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