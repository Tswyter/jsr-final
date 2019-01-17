import React, { Component } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ItemImage = styled.div`
  height: 100px;
  width: 100px;
  overflow: hidden;
  margin: 0 1rem 1rem 0;
  img {
    max-height: 100%;
  }
`;

const ModalContent = styled.div`
  
`;

const YesButton = styled.button`
  background-color: #FFF;
  border: 1px solid green;
  border-radius: 3px;
  color: green;
  font-size: 1.25rem;
  margin-right: 1rem;
  cursor: pointer;
`;

const NoButton = styled.button`
  background-color: #FFF;
  border: 1px solid red;
  border-radius: 3px;
  color: red;
  font-size: 1.25rem;
  cursor: pointer;
`;

class MenuImage extends Component {
  state = {

  }

  toggleModal = () => {
    this.setState({
      open: this.state.open ? false : true
    })
  }

  render() {
    // this component displays the images and shows a blown up image when they are clicked.
    const { image: { src, alt }} = this.props
    return (
      <>
        <ItemImage>
          <img src={src} alt={alt} onClick={this.toggleModal} />
        </ItemImage>
        <Modal open={this.state.open} toggle={this.toggleModal}>
          <ModalContent>
            <img src={src} alt={alt} />
            <p>Is this image accurate?</p>
            <YesButton>Yes</YesButton><NoButton>No</NoButton>
          </ModalContent>
        </Modal>
      </>
    )
  }
}

export default MenuImage;