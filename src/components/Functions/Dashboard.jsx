import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  firestore,
  auth,
  createUserProfileDocument
} from "../../firebaseConfig";
import StockLookUp from "./StockLookUp";
import PortfolioOptimization from "./PortfolioOptimization";
import Recommendations from "./Recommendations";
import { Card, Form, Button } from "react-bootstrap";

const Container = styled.div`
  margin: auto;
  height: 550px;
  max-width: 900px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Row = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

class Dashboard extends Component {
  state = {
    tickers: [],
    quantities: [],
    recommendations: [],
    recommendations_lookup: false,
    EF_BTN_flag: false,
    user: {},
    price: [],
    services: ""
  };

  onChangeHandle = e => {
    let state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  componentDidMount() {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            user: {
              id: snapshot.id,
              ...snapshot.data()
            },
            tickers: snapshot.data().portfolio,
            quantities: snapshot
              .data()
              .portfolio.split(",")
              .map(() => "0, ")
              .join("")
              .slice(0, -2)
          });
        });
      }
    });

    firestore
      .collection("registry")
      .where("type", "==", "available")
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          console.log("No registry available.");
          return;
        }

        snapshot.forEach(doc => {
          //   console.log("doc.id: ", doc.id);
          let { services } = doc.data();
          // let id = doc.id;
          //   console.log("HH: ", { id: doc.id, ...data });
          this.setState({ services });
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    let body = {
      tickers: this.state.tickers,
      quantity: this.state.quantities,
      uid: this.props.user.id
    };

    axios
      .post(
        "https://f2c56610.eu.ngrok.io/users?uid=OqtorhEjYza1tTkBsnxmhMDPibF3&tickers=[AAPL,MSFT,NFLX,TSLA]&quantity=[100,500,400,100]",
        body
      )
      .then(res => {
        console.log("data data", res.data);
        this.setState({ price: res.data.price });
      });
  };

  EF_BTN = () => {
    console.log("BTN");
    this.setState({ EF_BTN_flag: !this.state.EF_BTN_flag });
  };

  render() {
    let { EF_BTN_flag } = this.state;
    console.log("tickers:: ", this.state.tickers);

    let recommendations_temp = [];
    if (
      this.props.user &&
      this.props.user.id &&
      this.state.recommendations.length === 0 &&
      !this.state.recommendations_lookup
    ) {
      firestore
        .collection("recommendations")
        .where("uid", "==", this.props.user.id)
        .where("exec", "==", false)
        .onSnapshot(snapshot => {
          if (snapshot.empty) {
            console.log("No user recommendations.");
            return;
          }

          snapshot.forEach(doc => {
            console.log("doc.id: ", doc.id);
            let stock = doc.data();
            recommendations_temp.push({ id: doc.id, ...stock });
          });

          this.setState({
            recommendations_lookup: true,
            recommendations: recommendations_temp
          });
        });
    }

    console.log(
      "SERVICES :",
      this.state.services,
      this.state.services.indexOf("EF") > -1
    );
    return (
      <Container style={{ display: "table-row" }}>
        <Row>
          {this.state.price.length > 0 && (
            <Card style={{ width: "100%", maxHeight: "350px" }}>
              <Card.Body>
                <Recommendations
                  tickers={this.state.tickers.split(",")}
                  price={this.state.price.length > 0 ? this.state.price : []}
                />
              </Card.Body>
            </Card>
          )}
          {this.state.services.split(',').indexOf("EF") > -1 && (
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <PortfolioOptimization EF_BTN={this.EF_BTN} />
              </Card.Body>
            </Card>
          )}
          {EF_BTN_flag && (
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Tickers</Form.Label>
                    <Form.Control
                      value={this.state.tickers ? this.state.tickers : ""}
                      onChange={this.onChangeHandle}
                      name="tickers"
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Ticker quantities</Form.Label>
                    <Form.Control
                      value={this.state.quantities ? this.state.quantities : ""}
                      onChange={this.onChangeHandle}
                      name="quantities"
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>
                  <Button
                    onClick={this.handleSubmit}
                    variant="primary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          )}

          {this.state.services.split(',').indexOf("LOOKUP") > -1 && (
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <StockLookUp />
              </Card.Body>
            </Card>
          )}
        </Row>
        <br />
      </Container>
    );
  }
}

export default Dashboard;
