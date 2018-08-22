// action type
const SET_TEXT = 'SET_TEXT'
const POST_TEXT_PARSE = 'POST_TEXT_PARSE'
const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED'

const initialState = {
  loading: true,
  inputText: '',
  res: null
}

// reducer
export default function nlpApi(state=initialState, action) {
  switch (action.type) {
    case SET_TEXT:
      return {
        ...state,
        ...action.payload
      }

    case POST_TEXT_PARSE:
      console.log('post text req', action)
      return {
        ...state,
        ...action.payload,
        loading: true
      }

    case FETCH_SUCCEEDED:
      console.log('fetch text ', action)
      return {
        ...state,
        loading: false,
        res: action.res
      }

    default:
      return state
  }
}

// action-creator
export function onChange(e) {
  return { 
    type: SET_TEXT,
    payload: {
      inputText: e.target.value
    }
  }
}

export function postTextParse() {
  return { 
    type: POST_TEXT_PARSE 
  }
}

export function fetch() {
  return { 
    type: FETCH_SUCCEEDED
  }
}
