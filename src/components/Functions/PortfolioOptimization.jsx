import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 2px solid #3f51b5;
    border-radius: 25px;
    height: 150px;
    width: 400px;
`;

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

const PortfolioOptimization = () => {

    return (

        <Container>
            <StyledTitle>Portfolio Optimization</StyledTitle>
            <ButtonContainer>
                <StyledButton>Efficient Frontier</StyledButton>
                <StyledButton>VaR Analysis</StyledButton>
            </ButtonContainer>
        </Container>
    );

}

export default PortfolioOptimization;