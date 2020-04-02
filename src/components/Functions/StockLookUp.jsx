import React, {useState} from 'react';
import styled from "styled-components";
import { firestore } from "../../firebaseConfig";

const Container = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 2px solid #3f51b5;
    border-radius: 25px;
    height: 250px;
`;

const StyledTitle = styled.h3`
    color: #3f51b5;
    text-align: center;
    margin-top: 5px;
`;

const StyledHeader = styled.h5`
    color: #3f51b5;
    margin-top: 15px;
    margin-left: 10px;
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

const Input = styled.input`
  
    background-color: #3f51b5;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
    width: 55%;
    height: 50px;
    position: relative;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 0px 10px;
    border: none;
    border-radius: 4px;
    color: #fff;
    outline: none;

    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    ::placeholder {
        color: #fff;
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StockLookUp = (tickers) => {

    console.log('tickers: ', tickers.tickers)
    const [ticker, setTicker] = useState('');
    const [quantity, setQuantity] = useState('');
    const [stockValue, setStockValue] = useState('');
    const [quantityValue, setQuantityValue] = useState('');

    const updatePortfolio = () => {
        firestore
                  .doc(`/users/${tickers.tickers.id}`)
                  .update({ portfolio: tickers.tickers.portfolio, quantities: tickers.tickers.quantities });
    }

    const addStock = (ticker) => {

        tickers.tickers.portfolio += ticker + ', ';
        
    }

    const addQuantity = (quantity) => {
        
        tickers.tickers.quantities += quantity + ', ';
    }

  const handleClick = () => {
    setStockValue('');
    setQuantityValue('');
  }

    return (

        <Container>
            <StyledTitle>Stock Ticker Look Up</StyledTitle>
                <StyledHeader>Add stock to portfolio</StyledHeader>
                <InputContainer>
                    <Input placeholder="Enter a stock ticker" value={stockValue} onChange={(event) => {setTicker(event.target.value); setStockValue(event.target.value)}}></Input>
                    <Input placeholder="Enter number of shares" value={quantityValue} onChange={(event) => {setQuantity(event.target.value); setQuantityValue(event.target.value)}}></Input>
                </InputContainer>
                <ButtonContainer>
                    <StyledButton onClick={() => {addStock(ticker); addQuantity(quantity); alert('Stock and quantity added succesfully'); handleClick(); updatePortfolio()}}>Submit</StyledButton>
                </ButtonContainer>
        </Container> 
    );

}

export default StockLookUp;