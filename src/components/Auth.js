import React from 'react'
import { Redirect } from 'react-router-dom'

const appTokenKey = 'key'

const Auth = (props) => {
  if (localStorage.getItem(appTokenKey)) {
    return props.children
  }
  return (
    <Redirect to={'/login'}/>
  )
}

export default Auth