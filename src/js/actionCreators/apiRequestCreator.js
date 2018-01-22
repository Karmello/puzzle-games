export const apiRequestSuccess = (verb, subject, res) => {
  return {
    type: `${verb}_${subject}_SUCCESS`,

    payload: {
      status: res.status, 
      statusText: res.statusText,
      data: res.data
    }
  }
}

export const apiRequestFailure = (verb, subject, err) => {
  return {
    type: `${verb}_${subject}_FAILURE`,
    payload: {
      status: err.response.status,
      statusText: err.response.statusText
    }
  }
}