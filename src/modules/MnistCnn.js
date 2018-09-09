// action type
export const INIT_MODEL = 'INIT_MODEL'
export const MODEL_LOADED = 'MODEL_LOADED'

const initialState = {
  mnistModel: null,
  batch: null,
  predictions: null,
  canvas: null,
  labels: null,
  lossValues: [],
  accValues: [],
  loading: false
}

// reducer
export default function mnistCnn(state=initialState, action) {
  switch (action.type) {
    case INIT_MODEL:
      return {
        ...state,
        ...action.payload,
        loading: true
      }

    case MODEL_LOADED:
      return {
        ...state,
        ...action.payload,
        loading: false
      } 

    default:
      return state
  }
}

// action-creator
export const initModel = (canvas) => {
  console.log('init model', canvas)
  return { 
    type: INIT_MODEL,
    payload: {
      canvas: canvas
    }
  }
}
