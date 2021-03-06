import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Counter from "./containers/Counter"
import Wikiart from "./containers/Wikiart"
import LibraryApi from "./containers/LibraryApi"
import NlpApi from "./containers/NlpApi"
import Login from "./containers/Login"
import MnistCnn from "./containers/MnistCnn"

import SpeechToText from "./pages/SpeechToText"

import ImageNetPage from "./components/ImageNetPage"
import AndGatePage from "./components/AndGatePage"
import PolynomialPage from "./components/PolynomialPage"

//import MnistTsne from "./components/MnistTsne/MnistTsne"

import Auth from "./components/Auth"

//import { firebaseApp } from './firebase'

const NoMatch = ({ location }) => (
  <div>
    <h3>sorry, No match for <code>{location.pathname}</code></h3>
  </div>
)


export default class Routes extends Component {
  render() {
        //<Redirect from="/" to="/login" />
    return (
      <Switch>
        { /* <Route exact path="/login" component={Login} /> */}
        { /* <Auth> */}
          <Switch>
            <Route exact path="/" component={Counter} />
            <Route exact path="/audioapi" component={SpeechToText} />
            <Route exact path="/bookapi" component={LibraryApi} />
            <Route exact path="/nlpapi" component={NlpApi} />
            <Route exact path="/wikiart" component={Wikiart} />
            <Route exact path="/imagenet" component={ImageNetPage} />
            <Route exact path="/andgate" component={AndGatePage} />
            <Route exact path="/polynomial" component={PolynomialPage} />
            <Route exact path="/mnistcnn" component={MnistCnn} />
            <Route component={NoMatch} />
          </Switch>
        { /* </Auth> */}
      </Switch>
    )
  }
}
//<Route exact path="/mnisttsne" component={MnistTsne} />
