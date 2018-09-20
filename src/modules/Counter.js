// action type
const INCREMENT = 'COUNTER_INCREMENT'
const DECREMENT = 'COUNTER_DECREMENT'

const initialState = {
  count: 5
}

// reducer
export default function counter(state=initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      }

    default:
      return state
  }
}

// action-creator
export const increment = () => {
  return { type: INCREMENT }
}

export const decrement = () => {
  return { type: DECREMENT }
}