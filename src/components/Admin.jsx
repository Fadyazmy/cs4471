import React, { Component } from "react";
import { Form, Button, Container, Toast, Row } from "react-bootstrap";
import { auth, firestore, createUserProfileDocument } from "../firebaseConfig";

class Admin extends Component {
  state = {
    user: {
      name: "",
      portfolio: ""
    },
    services: "",
    showToast: false,
    services_list: "",
    new_service: ""
  };

  onChangeHandle = e => {
    let state = this.state;
    state[e.target.name] = e.target.value;
    console.log(e.target.name, "-- ", e.target.value);

    if (this.state.services.indexOf(e.target.name) > -1) {
      // if in services, pop
      //
      if (this.state.services.indexOf(e.target.name) > -1) {
        console.log("XXX ");
        this.setState({
          services: this.state.services
            .split(",")
            .filter(function(item) {
              return item !== e.target.name;
            })
            .join(",")
        });
      } else {
        // otherwise we push
        this.setState({
          services: this.state.services
            .split(",")
            .filter(function(item) {
              return item !== e.target.name;
            })
            .join(",")
        });
      }
    } else {
      // otherwise we push
      console.log(
        "this.state.services.split()",
        this.state.services.split(","),
        this.state.services.split(",").length
      );
      if (
        this.state.services.split(",").length == 1 &&
        this.state.services.split(",")[0] == ""
      ) {
        console.log("HEREE");
        this.setState({
          services: e.target.name
        });
      } else if (this.state.services.split(",").length == 1) {
        console.log("1");

        this.setState({
          services: [
            this.state.services.split(",")[0] + ("," + e.target.name)
          ][0]
        });
      } else {
        console.log(">2");
        console.log(
          "GGGGG: ",
          [...this.state.services.split(","), e.target.name].join(",")
        );

        this.setState({
          services: [...this.state.services.split(","), e.target.name].join(",")
        });
      }
    }
  };

  onChangeAddService = e => {
    console.log("onChangeAddService");
    this.setState({ new_service: e.target.value });
  };

  componentDidMount() {
    firestore
      .collection("registry")
      .where("type", "==", "available")
      .onSnapshot(snapshot => {
        if (snapshot.empty) {
          console.log("No user recommendations.");
          return;
        }

        snapshot.forEach(doc => {
          //   console.log("doc.id: ", doc.id);
          let { services, services_list } = doc.data();
          let id = doc.id;
          this.setState({ services, id, services_list });
        });
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.services_list.length > 1) {
      firestore
        .collection("registry")
        .doc(this.state.id)
        .update({
          services_list: this.state.services_list + "," + this.state.new_service
        });
    } else {
      firestore
        .collection("registry")
        .doc(this.state.id)
        .update({ services_list: this.state.new_service });
    }

    this.setState({ showToast: true });
  };

  render() {
    console.log("services_list: ", this.state.services_list);
    console.log("new_service: ", this.state.new_service);

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
            <Toast.Body>Service registry updated</Toast.Body>
          </Toast>
        </Row>
        <Container>
          <h3>Service Registry</h3>
          <p> This admin portal is only available to Admin users </p>
          <br />
          {/* 
          Saved as string
          split on ','
          check is included
          uncheck poped from state
          
          */}
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Add Service</Form.Label>
              <Form.Control
                name="new_service"
                value={this.state.new_service}
                type="text"
                placeholder="LOOKUP"
                onChange={this.onChangeAddService}
              />
              <Form.Text
                onChange={this.onChangeAddService}
                name="new_service"
                value={this.state.new_service}
                // className="text-muted"
              ></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label style={{ fontWeight: "bold" }}>
                Available services
              </Form.Label>
              <p> {this.state.services} </p>
            </Form.Group>
            {this.state.services_list.split(",").map((serv, id) => (
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  onChange={this.onChangeHandle}
                  name={serv}
                  type={"checkbox"}
                  id={`default-${serv}`}
                  checked={this.state.services.indexOf(serv) > -1}
                  label={`Service ${serv}`}
                />{" "}
              </Form.Group>
            ))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}

export default Admin;
