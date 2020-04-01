import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { firestore } from "../../firebaseConfig";
import Summary from "./Summary";
import StockLookUp from "./StockLookUp";
import PortfolioOptimization from "./PortfolioOptimization";

const Container = styled.div`
  margin: auto;
  height: 550px;
  max-width: 745px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Row = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 350px;
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 350px;
    margin-left: 40px;
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
    console.log("this.state: ", this.state);

    return (
      <Container style={{ display: "table-row" }}>
        <Row>
        <LeftColumn>
            <Summary user={this.props.user}/>
        </LeftColumn>
        <RightColumn>
            <StockLookUp />
        </RightColumn>
        </Row>
        <PortfolioOptimization />
      </Container>
    );
  }
}

export default Dashboard;
