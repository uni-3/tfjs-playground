import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from "react-router-dom"

import {Tab, Tabs} from '@material-ui/core'
import { Button } from '@material-ui/core'

import Logo from "./assets/logo.png"
import "./Header.css"

import firebase from 'firebase'
const appTokenKey = 'key'

class Header extends Component {

  componentDidMount() {

  }


  isLogin() {
    if (localStorage.getItem(appTokenKey)) {
      return true
    }
  }

  onLogout(e) {
    console.log('on logout', this)
    localStorage.removeItem(appTokenKey)
    firebase.auth().signOut()

    this.props.history.push('/login')
  }

  renderLogout() {
    if(!this.isLogin()) {
      return
    }
    return (
      <div class="logout">
        <Button
          onClick={this.onLogout.bind(this)}
          variant="outlined"
          color="secondary"
          className="button"
        >logout
        </Button>
      </div>
    )
  }

  renderTab(props) {
    if(!this.isLogin()) {
      return
    }
    return (
      <Tabs
        value={props.tabValue} 
        onChange={props.onTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        className="tabs"
        scrollable // not work for  bug https://github.com/mui-org/material-ui/issues/12524
      >
        {
          Object.keys(props.paths).map((key, index) => {
            return (
              <Tab 
                key={key} 
                label={key}
                component={Link} 
                to={props.paths[key]}
              />
            )
          })
        }
      </Tabs>
    )
  }

  render() {
    const props = this.props
    return (
      <header className="App-header">
        <Link to="/" className="logo-link">
          <img src={Logo} className="App-logo" alt="logo" />
        </Link>
        <div className="content">
          {this.renderLogout()}
          {this.renderTab(props)}
        </div>
      </header>
    )
  }
}
        //<h1 className="App-title">tfjs playground</h1>

export default withRouter(Header)