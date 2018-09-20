// action type
export const DROP = 'ON_DROP'
export const DROPPED = 'DROPPED'
export const UPLOAD = 'UPLOAD'
export const UPLOADED = 'UPLOADED'

const initialState = {
  files: [],
  duration: null,
  dataUrl: null,
  gcsPath: '',
  loading: false
}

// reducer
export default function uploadAudioToGcs(state=initialState, action) {
  switch (action.type) {
    case DROP:
      return {
        ...state,
        loading: true 
      }

    case DROPPED:
      return {
        ...state,
        ...action.payload, // files duration dataUrl
        loading: false
      }

    case UPLOAD:
      return {
        ...state,
        loading: true 
      }

    case UPLOADED:
    console.log('module uploaded', action.payload)
      let metadata = action.payload.res.metadata
      let bucket = metadata.bucket
      let fullPath = metadata.fullPath
      let path = 'gs://' + bucket + '/' + fullPath
      return {
        ...state,
        gcsPath: path,
        loading: false
      }

    default:
      return state
  }
}

// action-creator
export const onDrop = (files, rejected) => {
  return { 
    type: DROP,
    payload: {
      files: files,
      rejected: rejected
    }
  }
}

export const onUpload = () => {
  return { 
    type: UPLOAD
  }
}
