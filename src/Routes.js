import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Counter from "./containers/Counter"
import LibraryApi from "./containers/LibraryApi"
import NlpApi from "./containers/NlpApi"

import ImageNetPage from "./components/ImageNetPage"
import AndGatePage from "./components/AndGatePage"
import PolynomialPage from "./components/PolynomialPage"

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Counter} />
        <Route exact path="/bookapi" component={LibraryApi} />
        <Route exact path="/nlpapi" component={NlpApi} />
        <Route exact path="/imagenet" component={ImageNetPage} />
        <Route exact path="/andgate" component={AndGatePage} />
        <Route exact path="/polynomial" component={PolynomialPage} />
      </Switch>
    )
  }
}