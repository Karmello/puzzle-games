const initialState = {
  name: 'Puzzle Games',
  status: '',
  showAppDrawer: false,
  isLoading: true
};

const appReducer = (state = initialState, action) => {
  
  switch (action.type) {

    case 'SET_AUTH_STATUS':
      return {
        ...state,
        status: action.payload.status,
        showAppDrawer: false
      }

    case 'TOGGLE_APP_DRAWER':
      return {
        ...state,
        showAppDrawer: action.payload.showAppDrawer
      }

    case 'TOGGLE_APP_LOADER':
      return {
        ...state,
        isLoading: action.payload.isLoading
      }

    default:
      return state;
  }
}

export default appReducer;