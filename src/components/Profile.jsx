import React, { Component } from "react";
import { Form, Button, Container, Toast, Row } from "react-bootstrap";
import { auth, firestore, createUserProfileDocument } from "../firebaseConfig";

class Profile extends Component {
  state = {
    user: {
      name: "",
      portfolio: ""
    },
    showToast: false
  };

  onChangeHandle = e => {
    let user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  componentDidMount() {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          if (snapshot.data().balance == null) {
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

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    firestore
      .collection("users")
      .doc(this.state.user.id)
      .update(this.state.user);

    this.setState({ showToast: true });
  };

  render() {
    return (
      <>
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "50px"
          }}
        >
          <Toast
            delay={2000}
            style={{ position: "absolute" }}
            show={this.state.showToast}
            onClose={() => this.setState({ showToast: !this.state.showToast })}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">InvestEasy</strong>
              <small>1 min ago</small>
            </Toast.Header>
            <Toast.Body>Profile update complete</Toast.Body>
          </Toast>
        </Row>
        <Container>
          <h3>Profile details</h3>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                onChange={this.onChangeHandle}
                name="name"
                value={this.state.user.name}
                type="text"
                placeholder="Full Name"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPortfolio">
              <Form.Label>Portfolios</Form.Label>
              <Form.Control
                onChange={this.onChangeHandle}
                name="portfolio"
                value={this.state.user.portfolio}
                type="text"
                placeholder="AAPL, TSLA, AMZN"
              />
              <Form.Text className="text-muted">
                Please separate stock tickers with a comma (i.e: 'AMZN, AAPL')
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default Profile;
