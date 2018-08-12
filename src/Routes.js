import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Counter from "./containers/Counter"

import AndGatePage from "./components/AndGatePage"
import PolynomialPage from "./components/PolynomialPage"
import CartPolePage from "./components/CartPolePage"

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Counter} />
        <Route exact path="/andgate" component={AndGatePage} />
        <Route exact path="/polynomial" component={PolynomialPage} />
        <Route exact path="/cartpole" component={CartPolePage} />
      </Switch>
    )
  }
}