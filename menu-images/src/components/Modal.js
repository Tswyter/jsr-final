import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  pointer-events: ${({show}) => show ? 'auto' : 'none' };
  opacity: ${({show}) => show ? '1' : '0' };
  z-index: 50;
`;

const Content = styled.div`
  background-color: #FFF;
  padding: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 100;
`;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
  overflow: scroll;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
`;

class Modal extends Component {
  state = {

  }


  render() {
    return(
      <Container show={this.props.open}>
        <Content>
          {this.props.children}
        </Content>
        <Background onClick={this.props.toggle} />
      </Container>
    )
  }
}

export default Modal;