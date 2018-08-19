// action type
const SEARCH_REQUESTED = 'SEARCH_REQUESTED'
const SEARCH_SUCCEEDED = 'SEARCH_SUCCEEDED'
const SET_FORM = 'SET_FORM'

const initialState = {
  author: '夏目漱石',
  title: '',
  page: 1,
  loading: false,
  res: {}
}

// reducer
export default function libraryApi(state=initialState, action) {
  switch (action.type) {
    case SEARCH_REQUESTED:
      return {
        ...state,
        loading: true
      }
    case SEARCH_SUCCEEDED:
      return {
        ...state,
        loading: false,
        res: action.res
      }
    case SET_FORM:
      /*
        action.payload = { key: value}
      */
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// action-creator
export function onSearch(e) {
  console.log('action search', e)
  e.preventDefault()
  return { 
    type: SEARCH_REQUESTED,
  }
}

export function fetch() {
  return { 
    type: SEARCH_SUCCEEDED
  }
}

export function changedForm(e) {
  console.log('action changed form', e)
  const payload = {
    [e.target.name]: e.target.value
  }
  return { 
    type: SET_FORM,
    payload: payload
  }
}