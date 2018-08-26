export const ON_LOGIN = 'ON_LOGIN'
export const REF_LOGIN = 'REF_LOGIN'
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED'
export const LOGOUT = 'LOGOUT'


const initialState = {
  displayName: '',
  uid: '',
  email: ''
}

export default function login(state=initialState, action) {
  switch (action.type) {
    case ON_LOGIN:
      return {
        ...state,
        ...action.payload
      }

    case REF_LOGIN:
      return {
        ...state,
        ...action.payload
      }

    case LOGIN_SUCCEEDED:
      return {
        ...state,
        ...action.payload
      }

    case LOGOUT:
     return {
       ...state,
       ...initialState
     }

    default:
      return state
  }

} 

export const onLogin = () => {
  return {
    type: ON_LOGIN
  }
}

export const refLogin = () => {
  return {
    type: REF_LOGIN
  }
}

export const logout = () => {
  console.log('logout')
  return {
    type: LOGOUT
  } 
}
