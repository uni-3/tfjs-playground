import React, { Component } from 'react'
import { Link } from "react-router-dom"

import {Tab, Tabs} from '@material-ui/core'

import Logo from "./assets/logo.png"
import "./Header.css"

export default class Header extends Component {
  render() {
    const props = this.props
    return (
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="logo" />
        <h1 className="App-title">tfjs playground</h1>
        <Tabs
          value={props.tabValue} 
          onChange={props.onTabChange}
          indicatorColor="secondary"
          textColor="secondary"
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
      </header>
    )
  }
}