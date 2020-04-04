import React from "react";
import { Route, Link } from "react-router-dom";
import { auth, signOut, createUserProfileDocument } from "../firebaseConfig";
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

  componentDidMount() {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            user: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
        });
      }
    });
  }

  onAuthStateChanged = user => {
    this.setState({ isAuthenticated: !!user });
  };

  authNavbar = function() {
    if (this.state.isAuthenticated) {
      return (
        <ul
          style={{ flexDirection: "row" }}
          className="navbar-nav my-2 my-lg-0"
        >
          <Button color="inherit">
            <Link
              to="/"
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              {this.state.user && this.state.user.name
                ? `Hi, ${this.state.user.name} 👋`
                : ""}
            </Link>
          </Button>
          {this.state.user && this.state.user.name == "Admin" && (
            <Button color="inherit">
              <Link
                to="/admin"
                style={{ color: "white", textDecoration: "none" }}
                className="nav-link"
              >
                Admin
              </Link>
            </Button>
          )}
          <Button color="inherit">
            <Link
              to="/profile"
              style={{ color: "white", textDecoration: "none" }}
              className="nav-link"
            >
              Profile
            </Link>
          </Button>
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
        <ul
          style={{ flexDirection: "row" }}
          className="navbar-nav my-2 my-lg-0"
        >
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
                to="/"
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
