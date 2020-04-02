import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";

const StyledTitle = styled.h3`
  color: #3f51b5;
  text-align: center;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;

const StyledButton = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 18px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.35em 1em;
  transition: 0.5s all ease-out;

  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const PortfolioOptimization = (props) => {
  return (
    <Container>
      <StyledTitle>Portfolio Optimization</StyledTitle>
      <ButtonContainer>
        <StyledButton onClick={props.EF_BTN}>Efficient Frontier</StyledButton>
        <StyledButton>VaR Analysis</StyledButton>
      </ButtonContainer>
    </Container>
  );
};

export default PortfolioOptimization;
