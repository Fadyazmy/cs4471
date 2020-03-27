import React from "react";
import { Route, Link } from "react-router-dom";
import { auth, signOut } from "../firebaseConfig";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    auth.onAuthStateChanged(this.onAuthStateChanged);
    this.authNavbar.bind(this);
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticated: !!user });
  };

  authNavbar = function() {
    if (this.state.isAuthenticated) {
      return (
        <ul className="navbar-nav my-2 my-lg-0">
          <Button color="inherit">
            <Link
              to="#"
              onClick={signOut}
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              Log Out
            </Link>
          </Button>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav my-2 my-lg-0">
          <Button color="inherit">
            <Link
              to="sign"
              onClick={signOut}
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              Sign In
            </Link>
          </Button>{" "}
          <Button color="inherit">
            <Link
              to="register"
              onClick={signOut}
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              Sign Up
            </Link>
          </Button>
        </ul>
      );
    }
  };

  render() {
    return (
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Route>
            <Typography variant="h6" color="inherit">
              <Link
                to="#"
                onClick={signOut}
                style={{ color: "white", textDecoration: "none" }}
                className="nav-link"
              >
                InvestEasy
              </Link>
            </Typography>
            {this.authNavbar()}
          </Route>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navigation;