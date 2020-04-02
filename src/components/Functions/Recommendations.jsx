import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";

const StyledTitle = styled.h3`
  color: #3f51b5;
  text-align: center;
  margin-top: 5px;
`;

const RecommendationsContainer = styled.div`
  justify-content: center;
  margin-top: 35px;
`;

const StyledText = styled.p`
  color: #3f51b5;
  text-align: center;
  margin-top: 5px;
`;


class Recommendations extends Component {

  render() {

    let stockHash = {

      "AAPL": 237.85,
      "GOOG": 1099.80,
      "NFLX": 362.54,
      "FB": 157.71,
      "TSLA": 468.56,
      "AMZN": 1906.70,
      "MSFT": 151.33,
    }

    console.log("TICKERSSS", this.props.tickers);

    return (
      <Container>
        <StyledTitle>Recommendations</StyledTitle>
        <RecommendationsContainer>
          {this.props.price.map((pr, idx) => (
            <Row>
              <StyledText>{Math.random() * 2 > 1 ? `Use ${this.props.price[idx]}% of funds to buy ${this.props.tickers[idx]} Shares at $${stockHash[this.props.tickers[idx]]}` : `Sell ${this.props.price[idx]}% of ${this.props.tickers[idx]} owned shares at $${stockHash[this.props.tickers[idx]]}`}</StyledText>
            </Row>
          ))}
          <StyledText style={{color: 'black'}}>Total expected profit (using the Efficient Frontier method) is: {Math.random().toPrecision(2) * 10}% of portfolio value</StyledText>
        </RecommendationsContainer>
      </Container>
    );
  };
}


export default Recommendations;
