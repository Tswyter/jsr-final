import React, { Component } from 'react';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';
import MenuImage from './MenuImage';

const ItemContainer = styled.div``;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  p {
    font-size: 0.75rem;
  }
`;

const ItemContent = styled.div`
  display: ${({ show }) => show ? `block` : `none`};
  background-image: linear-gradient(#fff, #efefef);
  padding: 1rem;
`;

const ContentController = styled.div`
  min-width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentImageGrid = styled.div`
  flex-grow: 1;
  display: flex;
`;

const Availability = styled.div`
  text-align: right;
`;

class MenuItem extends Component {
  state = {
    open: false
  };

  toggleItem = () => {
    this.setState({ open: this.state.open ? false : true })
  }

  componentDidMount() {
    const { item: { images } } = this.props
    if (typeof images !== 'undefined') {
      const ids = Object.keys(images);
      const values = Object.values(images);
      const imageObjects = ids.map((id, i) => ({ id, ...values[i] }));
      this.setState({ 
        images: imageObjects
      })
    }
  }

  toggleSuggestionModal = () => {

  }

  handleImage = (e) => {
    console.log(e);
    const images = this.state.images && this.state.images.length > 0 ? [...this.state.images, { id: 'something', src: e, alt: 'something' }] : [{ id: 'something', src: e, alt: 'something' }];
    this.setState({
      images
    });
    fetch(`http://localhost:3001/firebase/update-item?restaurantId=${this.props.restaurant}&menuItemId=${this.props.item.id}&filePath=${e}`, {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    })
    // .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  render() {
    const { item } = this.props;
    const { images } = this.state;
    return(
      <ItemContainer>
        <ItemHeader onClick={this.toggleItem}>
          <div>
            <h3>{item.name}</h3>
            <p>{item.ingredients}</p>
          </div>
          <div>
            <h3>${item.price}</h3>
            <p>{item.rating} stars</p>
          </div>
        </ItemHeader>
        <ItemContent show={this.state.open}>
          <ContentImageGrid>
            {images && images.map(image => 
              <MenuImage key={Math.random() * 100 + image.alt} image={image} />)}
          </ContentImageGrid>
          <ContentController>
            <div>
              <p>Would you like to add your own image?</p>
              <ImageUploader handleImage={this.handleImage} />
            </div>
            <Availability available={item.availability}>
              <p>Is this listing accurate?</p>
              <button>Yes</button><button onClick={this.toggleSuggestionModal}>No</button>
            </Availability>
          </ContentController>
        </ItemContent>
      </ItemContainer>
    );
  }
}

export default MenuItem;