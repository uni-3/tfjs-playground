import React, { Component } from 'react'

import { Button } from '@material-ui/core'


const appTokenKey = 'key'

export default class Login extends Component {

  componentWillMount() { 
    console.log('login prop', this.props)

    // ログインしているとき
    if (localStorage.getItem(appTokenKey)) {
      this.props.history.push("/")
      return
    } else {
      this.props.logout()
    }

    // ログインしたとき
    if (this.props.login.uid !== '') {
      localStorage.setItem(appTokenKey, this.props.login.uid)
    }

    // ログイン確認
    this.props.refLogin()
  }


  componentWillReceiveProps(nextProps) { 
    if (this.props.login.uid !== '') {
      localStorage.setItem(appTokenKey, this.props.login.uid)
    }

    // ログインしている
    if (nextProps.login.uid && this.props.login.uid) {
      if (localStorage.getItem(appTokenKey)) {
        this.props.history.push("/")
        return
      }
    }
  }

  render() {
    const { onLogin } = this.props
    return(
      <div>
        <div>
          <Button
            onClick={onLogin}
            variant="outlined"
            color="primary"
            className="button"
          >LOGIN WITH GOOGLE
          </Button>
        </div>
      </div>
    )
  }
}