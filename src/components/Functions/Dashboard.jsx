import React, { Component } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import { ListGroup, Row, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
import { firestore } from "../../firebaseConfig";

const useStyles = makeStyles({
  outerDiv: {
    "&:hover": {
      "& $Icon": {
        color: "#fff"
      }
    }
  },
  Icon: () => ({
    fontSize: 80,
    color: "#3f51b5"
  })
});

const Container = styled.div`
  display: flex;
  margin: auto;
  height: 500px;
  width: 80%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

class Dashboard extends Component {
  state = {
    tickers: [],
    recommendations: [],
    recommendations_lookup: false
  };

  onChangeHandle = e => {
    let val = e.target.value;
    if (this.state.tickers.indexOf(val) < 0) {
      // Add to tickers array
      this.setState({ tickers: [...this.state.tickers, val] });
    } else {
      // Remove ticker from array
      this.setState({
        tickers: this.state.tickers.filter(function(item) {
          return item !== val;
        })
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    let body = { tickers: this.state.tickers, uid: this.props.user.id };

    axios.post("http://<someurl-tbd>", body).then(res => {
      console.log(res);
    });
  };

  handleTransaction = rec => {
    // TODO:
    // update transaction that it's been executed - DONE
    console.log("Rec transaction", rec);
    firestore
      .collection("recommendations")
      .doc(rec.id)
      .update({ exec: true });

    // udpate user balance
    if (rec.action === "sell") {
      firestore
        .collection("users")
        .doc(rec.uid)
        .update({ balance: this.props.user.balance + Number(rec.price) });
    } else {
      firestore
        .collection("users")
        .doc(rec.uid)
        .update({ balance: this.props.user.balance - Number(rec.price)});
    }
  };

  render() {
    console.log("id: ", this.props.user);
    let recommendations_temp = [];

    if (
      this.props.user &&
      this.props.user.id &&
      this.state.recommendations.length == 0 &&
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
    console.log("this.state: ", this.state);

    return (
      <Container style={{ display: "table-row" }}>
        <Row style={{ width: "100%" }}>
          <Row style={{ width: "100%" }}>
            <h3>Summary</h3>
          </Row>
          <Card border="info" style={{ width: "18rem" }}>
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              Balance
            </Card.Header>
            <Card.Body
              style={{
                display: "flex",
                alignSelf: "center"
              }}
            >
              <Card.Title>
                {this.props.user && this.props.user.balance
                  ? this.props.user.balance
                  : 0}
              </Card.Title>
            </Card.Body>
          </Card>
        </Row>
        <br />
        <Row style={{ width: "100%" }}>
          <Row style={{ width: "100%" }}>
            <h3>Stock Ticker Lookup</h3>
          </Row>
          <ListGroup style={{ width: "100%" }}>
            {this.state.recommendations.map(rec => (
              <>
                {rec.action == "buy" ? (
                  <ListGroup.Item>
                    Buy {`$${rec.price} of ${rec.stock} stock`}{" "}
                    <Button variant="success">Buy</Button>
                  </ListGroup.Item>
                ) : (
                  <ListGroup.Item>
                    Sell {`$${rec.price} of ${rec.stock} stock`}{" "}
                    <Button
                      variant="info"
                      onClick={() => this.handleTransaction(rec)}
                    >
                      Sell
                    </Button>
                  </ListGroup.Item>
                )}
              </>
            ))}
          </ListGroup>
        </Row>
        <br />
        <Row>
          <Row style={{ width: "100%" }}>
            <h3>Portfolio recommendations</h3>
          </Row>
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Tickers</Form.Label>
                <Form.Check
                  type={"checkbox"}
                  onChange={this.onChangeHandle}
                  id={`ticker-1`}
                  name={`tickers`}
                  value={"AAPL"}
                  label={`AAPL`}
                />
                <Form.Check
                  type={"checkbox"}
                  onChange={this.onChangeHandle}
                  id={`ticker-2`}
                  name={`tickers`}
                  value={`AMZN`}
                  label={`AMZN`}
                />
                <Form.Check
                  type={"checkbox"}
                  onChange={this.onChangeHandle}
                  id={`ticker-3`}
                  name={`tickers`}
                  value={`GOOG`}
                  label={`GOOG`}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
