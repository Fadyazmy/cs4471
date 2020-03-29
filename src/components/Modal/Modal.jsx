import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
// import { Route, Link } from "react-router-dom";

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: .5;
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


const Modal = ({ isShowing, close, title }) => isShowing ? ReactDOM.createPortal (

  <div data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <Overlay />
    <Wrapper >
      <StyledModal >
          <CloseButton onClick={close}>
            <span>&times;</span>
          </CloseButton>
        <ModalHeader>
          <StyledText>{title}</StyledText>
        </ModalHeader>
        <p>
          placeholder
        </p>
        <button>
            submit
        </button>
      </StyledModal>
    </Wrapper>
  </div>, document.body
) : null;

export default Modal;