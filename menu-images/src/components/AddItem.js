import React, { Component } from 'react';
import urlencode from 'urlencode';
import styled from 'styled-components';
import Modal from './Modal';
import Input from './Input';
// componente makes a button that opens a modal when clicked.

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
    const query = [].slice.call(e.target.elements)
      .filter(element => 
        element.type !== 'submit' && element.value)
      .map((element, i) => `${i !== 0 ? '&' : ''}${element.name}=${urlencode(element.value)}`).join('');
    console.log(query);
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

  render() {
    return (
      <>
        <button onClick={this.toggleModal}>{this.props.children}</button>
        <Modal open={this.state.open} toggle={this.toggleModal}>
          <h2>Add a menu item for {this.props.restaurant.name}</h2>
          <Form onSubmit={e => this.processForm(e)}>
            <Input name="name" type="text" placeholder="Item Name" value={this.state.name} changeWatcher={this.watchInputs} />
            <Input name="ingredients" type="text" placeholder="Item Ingredients" value={this.state.ingredients} changeWatcher={(e) => this.watchInputs(e)} />
            <Input name="price" type="text" placeholder="price" value={this.state.price} changeWatcher={(e) => this.watchInputs(e)} />
            <Input name="rating" type="text" placeholder="rating" value={this.state.rating} changeWatcher={(e) => this.watchInputs(e)} />
            <Input name="accuracy" type="text" placeholder="accuracy" value={this.state.accuracy} value={this.state.accuracy} changeWatcher={(e) => this.watchInputs(e)} hidden />
            <Input name="restaurantId" type="text" value={this.props.restaurant.id} changeWatcher={(e) => this.watchInputs(e)} hidden />
            <Input name="restaurantName" type="text" value={this.props.restaurant.name} changeWatcher={(e) => this.watchInputs(e)} hidden /> 
            <Input name="image" type="file" placeholder="Add an image" changeWatcher={(e) => this.watchInputs(e)} />
            <Input type="submit" value="Submit" />
          </Form>
        </Modal>
      </>
    )
  }
}

export default AddItem;