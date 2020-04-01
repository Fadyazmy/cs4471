import React from 'react';
import styled from "styled-components";

const Container = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 50px;
    border: 2px solid #3f51b5;
    border-radius: 25px;
    height: 250px;
`;

const StyledTitle = styled.h3`
    color: #3f51b5;
    text-align: center;
    margin-top: 5px;
`;
const StyledBody = styled.div`

    height: 50%;
    width: 65%;
    border: 2px solid #008080;
    border-radius: 25px;
    margin: 0 auto;
    margin-top: 35px;
    position: relative;
`;

const StyledHeader = styled.h5`
    color: #3f51b5;
    margin-top: 15px;
    text-align: center;
`;


const Balance = styled.h5`

    text-align: center;
    color: #3f51b5;
`;

const Summary = (user) => {

    return (

        <Container>
            <StyledTitle>User Summary</StyledTitle>
                <StyledBody>
                    <StyledHeader>Balance</StyledHeader>
                    <Balance>$
                        {user.user && user.user.balance
                        ? user.user.balance
                        : 0}
                    </Balance>
                </StyledBody>
        </Container> 
    );

}

export default Summary;