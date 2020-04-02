import React, {Component} from "react";
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

        return (
        <Container>
            <StyledTitle>Recommendations</StyledTitle>
            <RecommendationsContainer>
                <Row>
                    <StyledText>{"Recommended weightings for AAPL:"}</StyledText>
                    {/* <StyledText style={{marginLeft: "5px"}}>{this.props.price[1].substring(0,2)}</StyledText> */}
                    <StyledText>{"%"}</StyledText>
                </Row>

                <Row>
                    <StyledText>{"Recommended weightings for MSFT:"}</StyledText>
                    {/* <StyledText style={{marginLeft: "5px"}}>{this.props.price[2].substring(0,2)}</StyledText> */}
                    <StyledText>{"%"}</StyledText>
                </Row>

                <Row>
                    <StyledText>{"Recommended weightings for NFLX:"}</StyledText>
                    {/* <StyledText style={{marginLeft: "5px"}}>{this.props.price[3].substring(0,2)}</StyledText> */}
                    <StyledText>{"%"}</StyledText>
                </Row>
                <Row>
                    <StyledText>{"Recommended weightings for TSLA:"}</StyledText>
                    {/* <StyledText style={{marginLeft: "5px"}}>{this.props.price[4].substring(0,2)}</StyledText> */}
                    <StyledText>{"%"}</StyledText>
                </Row>
            </RecommendationsContainer>
        </Container>
        );
      };
    }


export default Recommendations;
