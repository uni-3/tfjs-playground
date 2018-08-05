import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Logo from "./assets/logo.png"
import "./App.css"

import Counter from "./containers/Counter"

import AndGatePage from "./components/AndGatePage"
import PolynomialPage from "./components/PolynomialPage"
import CartPolePage from "./components/CartPolePage"

import {Tab, Tabs} from '@material-ui/core'


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
          <header className="App-header">
            <img src={Logo} className="App-logo" alt="logo" />
            <h1 className="App-title">tfjs playground</h1>
          </header>
          <Tabs value={this.state.tabValue} onChange={this.onTabChange}>
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
          <Switch>
            <Route exact path="/" component={Counter}/>
            <Route exact path="/andgate" component={AndGatePage} />
            <Route exact path="/polynomial" component={PolynomialPage} />
          <  Route exact path="/cartpole" component={CartPolePage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
