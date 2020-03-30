import React, {useState} from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Modal from "../Modal/Modal";
import UseModal from "../Modal/UseModal";

const Container = styled.div`

    display: flex;
    margin: auto;
    height: 500px;
    width: 80%;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const StockLookUpContainer = styled.div`
    
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 80%;
    width: 80%;
    margin: 20px;
    
    &:hover { 
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
    }
`;

const PortfolioOptimizationContainer = styled.div`

    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 80%;
    width: 80%;
    margin: 20px;
    
    &:hover { 
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
    }
`;

const StyledText = styled.h1`
    
    color: #3f51b5;
    text-align: center;
`;


const StyledIconContainer = styled.div`
    
    position: relative;
    top: 25%;
    text-align: center;
    justify-content: center;
`;

const Dashboard = ({user}) => {

    const {isShowing, show, hide} = UseModal();

    const [title, setTitle] = useState("");

    return (

        <Container>
            <Modal
                isShowing={isShowing}
                close={hide}
                title={title}
                user={user}
            />

            <StockLookUpContainer onClick={() => {
                console.log("CLICK", isShowing)
                
                show();
                setTitle("Stock Ticker Lookup");}}>
            
                
                <StyledText>
                    Stock Ticker Lookup
                </StyledText>
                
                <StyledIconContainer>
                    <SearchIcon style={{color: "#3f51b5", fontSize: 80}} />
                </StyledIconContainer>

            </StockLookUpContainer>

            <PortfolioOptimizationContainer onClick={() => {
                show();
                setTitle("Portfolio Optimization");}}>
                
                <StyledText>
                    Portfolio Optimization
                </StyledText>

                <StyledIconContainer>
                    <EqualizerIcon style={{color: "#3f51b5", fontSize: 80}} />
                </StyledIconContainer>

            </PortfolioOptimizationContainer>

        </Container>
    );

}

export default Dashboard;