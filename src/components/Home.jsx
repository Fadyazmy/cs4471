import React, { Component } from "react";
import { auth, firestore, createUserProfileDocument } from "../firebaseConfig";
import Dashboard from "./Functions/Dashboard";

class Home extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          if (snapshot.data().balance < 0) {
            firestore
              .doc(`/users/${snapshot.id}`)
              .update({ balance: 100, num_transactions: 0 });
          }
          this.setState({ user: { id: snapshot.id, ...snapshot.data() } });
        });
      }
      this.setState({ user: userAuth });
    });
  }

  render() {
    return (
      <div className="home">
        {/**
         * Feature 1: Display
         * Feature 2: Material form to submit a POST request to API endpoint (tbd)
         * -- POST body include: uid (string), stock_tickers (array of strings)
         * i.e body = {
         *    uid: 'some_id',
         *    stock_tickers: ['APPL', 'SOMETHING_ELSE']
         *   }
         */}
        {this.state.user
          ? [
          
            <Dashboard user={this.state.user}/>
        
        ]
          : [<div>(not signed in) - HOME PAGE</div>]
          }
      </div>
    );
  }
}

export default Home;
