import { connect } from 'react-redux'

import * as loginModule from '../modules/Login'
import Login from '../components/Login/Login'


const mapStateToProps = state => {
  return {
    login: state.login
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onLogin: () => dispatch(loginModule.onLogin()),
    refLogin: () => dispatch(loginModule.refLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)