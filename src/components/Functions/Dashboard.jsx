import React, {useState} from 'react';
import styled from 'styled-components';
import {makeStyles} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Modal from "../Modal/Modal";
import UseModal from "../Modal/UseModal";

const useStyles = makeStyles({
    outerDiv: {
      "&:hover": {
        "& $Icon": {
          color: "#fff"
        }
      }
    },
    Icon: () => ({
      fontSize: 80,
      color: "#3f51b5",
    })
  });

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

const StyledText = styled.h1`
    
    color: #3f51b5;
    text-align: center;
`;

const StockLookUpContainer = styled.div`
    
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 80%;
    width: 80%;
    margin: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
    &:hover { 
        cursor: pointer;
        background-color: #3f51b5;
    }

    &:hover ${StyledText} {
        color: #fff;
    }
`;

const PortfolioOptimizationContainer = styled.div`

    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
    height: 80%;
    width: 80%;
    margin: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
    &:hover { 
        cursor: pointer;
        background-color: #3f51b5;
    }

    &:hover ${StyledText} {
        color: #fff;
    }
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

    const classes = useStyles();

    return (

        <Container>
            <Modal
                isShowing={isShowing}
                close={hide}
                title={title}
                user={user}
            />

            <StockLookUpContainer className={classes.outerDiv}
            
                onClick={() => {
                console.log("CLICK", isShowing)
                
                show();
                setTitle("Stock Ticker Lookup");}}>
            
                
                <StyledText>
                    Stock Ticker Lookup
                </StyledText>
                
                <StyledIconContainer>
                    <SearchIcon className={classes.Icon}/>
                </StyledIconContainer>

            </StockLookUpContainer>

            <PortfolioOptimizationContainer className={classes.outerDiv}

                onClick={() => {
                show();
                setTitle("Portfolio Optimization");}}>
                
                <StyledText>
                    Portfolio Optimization
                </StyledText>

                <StyledIconContainer>
                    <EqualizerIcon className={classes.Icon}/>
                </StyledIconContainer>

            </PortfolioOptimizationContainer>

        </Container>
    );

}

export default Dashboard;