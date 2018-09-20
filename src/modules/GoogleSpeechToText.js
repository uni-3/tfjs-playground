import sampleResult from '../assets/speec-to-text-results.json'


// action type
export const SAMPLE_LOAD = 'SAMPLE_LOAD'
export const POST_AUDIO_API = 'POST_AUDIO_API'
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED'
export const FETCH_FAILED = 'FETCH_FAILED'


const initialState = {
  loading: false,
  dataUrl: '',
  res: null
}

// reducer
export default function googleSpeechToText(state=initialState, action) {
  switch (action.type) {
    case POST_AUDIO_API:
      console.log('post api', action)
      return {
        ...state,
        ...action.payload,
        loading: true
      }


    case FETCH_SUCCEEDED:
      console.log('fetch ', action)
      return {
        ...state,
        loading: false,
        ...action.payload // res
        //res: action.res
      }

    case SAMPLE_LOAD:
      return {
        ...state,
        ...action.payload, //res sample
      }

    default:
      return state
  }
}

// action-creator
export const loadResults = (e) => {
  console.log('load results', sampleResult)

  return { 
    type: SAMPLE_LOAD,
    payload: {
      res: sampleResult
    }
  }
}

export const postAudioApi = () => {
  return { 
    type: POST_AUDIO_API
  }
}

export const fetch = () => {
  return { 
    type: FETCH_SUCCEEDED
  }
}