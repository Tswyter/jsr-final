import React, { Component } from 'react';
import urlencode from 'urlencode';
import styled from 'styled-components';
import Modal from './Modal';
import Input from './Input';
import ImageUploader from './ImageUploader';
import MenuImage from './MenuImage';
// componente makes a button that opens a modal when clicked.

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 100%;
  background: none;
  border: 3px dashed #efefef;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1.3rem;
  color: #aaa;
`;

class AddItem extends Component {
  state = {
    open: false,
    restaurantId: '0',
    accuracy: '100',
    rating: '5'
  }

  componentDidMount() {
    this.setState({ restaurantId: this.props.restaurant.id })
  }

  toggleModal = () => {
    this.setState({ open: this.state.open ? false : true });
  }

  watchInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  processForm = (e) => {
    e.preventDefault();
    let query = [].slice.call(e.target.elements)
      .filter(element => 
        element.type !== 'submit' && element.value)
      .map((element, i) => `${i !== 0 ? '&' : ''}${element.name}=${urlencode(element.value)}`).join('');
    query = this.state.uploadedImage ? `${query}&image=${this.state.uploadedImage}` : query;
    fetch(`http://localhost:3001/firebase/add-item?${query}`, {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json().then(resp => {
      console.log('success', resp);
      this.props.handleNewItems(resp.query);
      this.toggleModal();
    }))
    .catch(err => console.log('err', err));
  }

  handleImageUpload = (filePath) => {
    console.log(filePath);
    this.setState({
      uploadedImage: filePath
    });
  }

  // create ImageUploader component that handles uploading images to storage and passing the URL back to a function here, to be set in state and used when form is submitted.

  render() {
    return (
      <>
        <Button onClick={this.toggleModal}>{this.props.children}</Button>
        <Modal open={this.state.open} toggle={this.toggleModal}>
          <h2>Add a menu item for {this.props.restaurant.name}</h2>
          <Form onSubmit={e => this.processForm(e)}>
            <Input name="name" type="text" placeholder="Item Name" value={this.state.name} changeWatcher={this.watchInputs} />
            <Input name="ingredients" type="text" placeholder="Item Ingredients" value={this.state.ingredients} changeWatcher={(e) => this.watchInputs(e)} />
            <Input name="price" type="text" placeholder="price" value={this.state.price} changeWatcher={(e) => this.watchInputs(e)} />
            <Input name="rating" type="text" placeholder="rating" value={this.state.rating} changeWatcher={(e) => this.watchInputs(e)} />
            <Input name="accuracy" type="text" placeholder="accuracy" value={this.state.accuracy} changeWatcher={(e) => this.watchInputs(e)} hidden />
            <Input name="restaurantId" type="text" value={this.props.restaurant.id} changeWatcher={(e) => this.watchInputs(e)} hidden />
            <Input name="restaurantName" type="text" value={this.props.restaurant.name} changeWatcher={(e) => this.watchInputs(e)} hidden />
            {this.state.uploadedImage && <MenuImage image={{ src: this.state.uploadedImage, alt: this.state.name }} />}
            <ImageUploader handleImage={this.handleImageUpload} />
            <Input type="submit" value="Submit" />
          </Form>
        </Modal>
      </>
    )
  }
}

export default AddItem;