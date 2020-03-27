import React, { Component } from "react";

import Register from "./components/Reg";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navbar from "./components/navbar";

import { Route, BrowserRouter as Router } from "react-router-dom";

class Application extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <div>
            <Route path="/" component={Home} exact />
            <Route path="/sign" component={SignIn} exact />
            <Route path="/register" component={Register} exact />
          </div>
        </Router>
      </div>
    );
  }
}

export default Application;
