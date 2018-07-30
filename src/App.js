import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import Logo from "./assets/logo.png"
import "./App.css"

import AndGatePage from "./components/AndGatePage"
import PolynomialPage from "./components/PolynomialPage"

import {Tab, Tabs} from '@material-ui/core'


class App extends Component {
  constructor(props) {
    super(props)
    this.initState = {
      tabValue: 0,
      paths: {
        home: '/',
        andgate: '/andgate',
        polynomial: '/polynomial'
      }
    }
    this.state = this.initState
  }

  handleChange = (event, value) => {
    this.setState({
      tabValue: value
    })
  }

  render() {
    return (
      <Router>
        <div>
          <header className="App-header">
            <img src={Logo} className="App-logo" alt="logo" />
            <h1 className="App-title">tfjs playground</h1>
          </header>
          <Tabs value={this.state.tabValue} onChange={this.handleChange}>
            {
              Object.keys(this.state.paths).map((key, index) => {
                return (
                  <Tab 
                    key={key} 
                    label={key}
                    component={Link} 
                    to={this.state.paths[key]}
                  />
                )
              })
            }
          </Tabs>
          <Route exact path="/" />
          <Route exact path="/andgate" component={AndGatePage} />
          <Route exact path="/polynomial" component={PolynomialPage} />
        </div>
      </Router>
    );
  }
}

export default App;
