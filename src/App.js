import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Logo from "./assets/logo.png"
import "./App.css"
import AndGatePage from "./components/AndGatePage"
import PolynomialPage from "./components/PolynomialPage"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header className="App-header">
            <img src={Logo} className="App-logo" alt="logo" />
            <h1 className="App-title">tfjs playground</h1>
          </header>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/andgate">andgate</Link>
            </li>
            <li>
              <Link to="/polynomial">polynomial</Link>
            </li>
          </ul>
          <Route exact path="/" />
          <Route exact path="/andgate" component={AndGatePage} />
          <Route exact path="/polynomial" component={PolynomialPage} />
        </div>
      </Router>
    );
  }
}

export default App;
