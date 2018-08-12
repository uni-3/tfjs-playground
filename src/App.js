import React, { Component } from "react"
import { BrowserRouter as Router } from "react-router-dom"

import Routes from './Routes'
import Header from './Header'

import "./App.css"

class App extends Component {
  constructor(props) {
    super(props)
    const paths = {
        home: '/',
        andgate: '/andgate',
        polynomial: '/polynomial',
        cartpole: '/cartpole'
    }
    this.initState = {
      paths: paths,
      tabValue: 0,
    }
    this.state = this.initState
  }

  componentWillMount() {
    this.setTabValue()
  }

  setTabValue() {
    let tabValue = 0
    let pathname = window.location.pathname
    Object.keys(this.state.paths).map((key, index) => {
      let regex = new RegExp(key)
      if (pathname.match(regex)) {
        tabValue = index
      }
    })
    this.setState({
      tabValue: tabValue
    })
  }

  onTabChange = (e, value) => {
    this.setState({
      tabValue: value
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Header
            onTabChange={this.onTabChange}
            tabValue={this.state.tabValue}
            paths={this.state.paths}
          />
          <Routes />
        </div>
      </Router>
    );
  }
}

export default App;
