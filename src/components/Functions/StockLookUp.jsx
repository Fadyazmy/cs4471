import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Row, Container } from "react-bootstrap";
import axios from "axios";

// const Container = styled.div`
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//   border: 2px solid #3f51b5;
//   border-radius: 25px;
//   height: 150px;
//   padding: 20px;
// `;

const StyledTitle = styled.h3`
  color: #3f51b5;
  text-align: center;
  margin-top: 5px;
`;

class StockLookUp extends Component {
  state = {
    modal: false,
    img: "",
    ticker: "",
    start_date: "",
    end_date: "",
    error: false, 
    loading: false
  };

  render() {
    // console.log("TEST STATE", this.state);

    const handleClick = e => {
      e.preventDefault();
      e.stopPropagation();

      let body = {
        ticker: this.state.ticker,
        start: "2015-01-01 ",
        end: "2016-01-01"
      };
      // try {
      axios
        .post(
          `http://331b03cb.eu.ngrok.io/plot.png?ticker=${this.state.ticker}&start=2015-01-01&end=2016-01-01`
        )
        .then(resp => {
          console.log("RESP: ", resp);
        })
        .catch(err => {
          console.log("ERR: ", err);
        });
      setTimeout(() => {
        try {
          const img = require(`https://firebasestorage.googleapis.com/v0/b/cs4471-group5.appspot.com/o/${this.state.ticker}.png?alt=media`);
          this.setState({ img, loading: false });
        } catch (err) {
          //Do whatever you want when the image failed to load here
          this.setState({ error: true, loading: false });
        }
      }, 7500);
    };

    const onChangeHandle = e => {
      e.preventDefault();
      e.stopPropagation();

      let state = {};
      state[e.target.name] = e.target.value;
      console.log("STATE", state);
      this.setState(state);
    };

    return (
      <Container style={{ height: "100%" }}>
        <Row
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          {<img alt="" src={this.state.img} />}
          {this.state.error && <h3> Error. Ticker not found. </h3>}
          {this.state.loading && <h3> Loading </h3>}
        </Row>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              <StyledTitle>Stock Ticker Look Up</StyledTitle>
            </Form.Label>
            <Form.Control
              onChange={onChangeHandle}
              name="ticker"
              type="text"
              placeholder="ticker"
            />
          </Form.Group>
          <Button
            onClick={e => {
              handleClick(e);
              this.setState({ error: false, loading: true });
            }}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default StockLookUp;
