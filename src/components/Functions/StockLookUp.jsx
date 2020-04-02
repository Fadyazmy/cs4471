import React, { Component } from "react";
import styled from "styled-components";
import { Form, Button, Row, Container } from "react-bootstrap";

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
    end_date: ""
  };

  render() {
    // console.log("TEST STATE", this.state);

    const handleClick = e => {
      e.preventDefault();
      e.stopPropagation();

      //   let body = {
      //     ticker: this.state.ticker,
      //     start: "2015-01-01 ",
      //     end: "2016-01-01"
      //   };
      //   axios.post(
      //     "http://035656b5.eu.ngrok.io/plot.png?ticker=MSFT&start=2015-01-01&end=2016-01-01"
      //   );

      // let ticker = this.state.ticker;
      setTimeout(() => {
        if (this.state.ticker === "FB") {
          this.setState({
            img:"https://media.discordapp.net/attachments/693164953779044461/695169069992640612/cjwm6dAAAAAElFTkSuQmCC.png"
          });
        } else if (this.state.ticker === "AMZN") {
          this.setState({
            img:
              "https://media.discordapp.net/attachments/693164953779044461/695169137013424138/gWMByXkBwOcFgAAAABJRU5ErkJggg.png"
          });
        } else if (this.state.ticker === "MSFT") {
          this.setState({
            img:
              "https://media.discordapp.net/attachments/693164953779044461/695169192365654026/zcxStEAAAAASUVORK5CYII.png"
          });
        } else if (this.state.ticker === "GOOG") {
          this.setState({
            img:
              "https://media.discordapp.net/attachments/693164953779044461/695169278176919572/h9zC4H6jhPYgAAAABJRU5ErkJggg.png"
          });
        }
      }, 2000);
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
          <Button onClick={e => handleClick(e)} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default StockLookUp;
