import sampleText from '../assets/mitsuo.json'


// action type
export const SET_TEXT = 'SET_TEXT'
export const POST_TEXT_PARSE = 'POST_TEXT_PARSE'
export const POST_LEXRANK = 'POST_LEXRANK'
export const POST_LDA = 'POST_LDA'
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED'
export const FETCH_FAILED = 'FETCH_FAILED'

const initialState = {
  loading: false,
  inputText: '',
  inputNgram: 1,
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

    case POST_LEXRANK:
      console.log('post lex req', action)
      return {
        ...state,
        ...action.payload,
        loading: true
      }

    case POST_LDA:
      console.log('post lda req', action)
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
  let key = 'inputText'
  console.log('onchange text', e.target.name)
  console.log('onchange text', e.target.id)
  if (e.target.id === 'ngram') {
    key = 'inputNgram'
  }
  return { 
    type: SET_TEXT,
    payload: {
      [key]: e.target.value
    }
  }
}

export function loadSample(e) {
  console.log('load sample', sampleText)

  return { 
    type: SET_TEXT,
    payload: {
      inputText: sampleText.text
    }
  }
}

export const postTextParse = () => {
  return { 
    type: POST_TEXT_PARSE 
  }
}

export const postLexrank = () => {
  return { 
    type: POST_LEXRANK
  }
}

export const postLda = () => {
  return { 
    type: POST_LDA
  }
}

export const fetch = () => {
  return { 
    type: FETCH_SUCCEEDED
  }
}
