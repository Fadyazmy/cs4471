import React, { Component } from "react";

import Register from "./components/Reg";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Navbar from "./components/navbar";
import Modal from "./components/Modal/Modal";


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
            <Route path="/test" component={Modal} />
          </div>
        </Router>
      </div>
    );
  }
}

export default Application;
