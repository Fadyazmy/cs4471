import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Form, Button, Row, Modal } from "react-bootstrap";
import axios from 'axios'
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const StyledModal = styled.div`
  z-index: 100;
  background: white;
  position: relative;
  margin: 1.75rem auto;
  border-radius: 3px;
  max-width: 500px;
  height: 500px;
  padding: 2rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const CloseButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  border: none;
  margin-left: 95%;

  &:hover {
    background: #3f51b5;
    color: #fff;
  }
`;

const StyledText = styled.h1`
  color: #3f51b5;
  text-align: center;
`;

class StockTickerModal extends Component {
  state = {
    tickers: []
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

    axios
      .post("http://<someurl-tbd>", body)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    // console.log("isShowing: ", this.props.isShowing);
    console.log("user.id: ", this.props.user.id);
    return (
      <Modal show={this.props.isShowing}>
        <Overlay />
        <Wrapper>
          <StyledModal>
            <CloseButton onClick={this.props.close}>
              <span>&times;</span>
            </CloseButton>
            <ModalHeader>
              <StyledText>{this.props.title}</StyledText>
            </ModalHeader>
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
          </StyledModal>
        </Wrapper>
      </Modal>
    );
  }
}

export default StockTickerModal;
