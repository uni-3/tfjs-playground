import React, { Component } from 'react'

import { Button } from '@material-ui/core'


const appTokenKey = 'key'

export default class Login extends Component {

  componentWillMount() { 
      console.log('get storage did', localStorage.getItem(appTokenKey))
    if (this.props.login.uid !== '') {
      console.log('set storage')
      localStorage.setItem(appTokenKey, this.props.login.uid)
    }

    /**
     * We have appToken relevant for our backend API
     */
    if (localStorage.getItem(appTokenKey)) {
      console.log('get storage')
      this.props.history.push("/")
      return
    }

    this.props.refLogin()

  }


  componentWillReceiveProps(nextProps) { 
    if (this.props.login.uid !== '') {
      localStorage.setItem(appTokenKey, this.props.login.uid)
    }

    /**
     * We have appToken relevant for our backend API
     */
    console.log('next', nextProps)
    console.log('props', this.props.login)
    if (nextProps.login !== this.props.login) {
      if (localStorage.getItem(appTokenKey)) {
        console.log('push to /')
        this.props.history.push("/")
        return
      }
    }
  }

  render() {
    console.log('login prop', this.props)
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