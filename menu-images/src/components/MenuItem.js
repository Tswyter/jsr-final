import React, { Component } from 'react';
import styled from 'styled-components';

const ItemContainer = styled.div``;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 0.75rem;
  }
`;

const ItemContent = styled.div`
  display: ${({ show }) => show ? `block` : `none`};
`;

const ContentSidebar = styled.div`
  min-width: 20%;
`;

const ContentImageGrid = styled.div`
  flex-grow: 1;
  display: flex;
`;

const Availability = styled.div`
  background: ${({ available }) => available ? 'green' : 'red'};
`;

const ItemImage = styled.div`
  height: 100px;
  width: 100px;
  overflow: hidden;
  margin: 0 1rem 1rem 0;
  img {
    max-height: 100%;
  }
`;

class MenuItem extends Component {
  state = {
    open: false
  };

  toggleItem = () => {
    this.setState({ open: this.state.open ? false : true })
  }

  render() {
    const { item } = this.props
    return(
      <ItemContainer>
        <ItemHeader onClick={this.toggleItem}>
          <div>
            <h3>{item.name}</h3>
            <p>{item.ingredients}</p>
          </div>
          <div>
            <h3>{item.price}</h3>
            <p>{item.rating}</p>
          </div>
        </ItemHeader>
        <ItemContent show={this.state.open}>
          <ContentSidebar>
            <Availability available={item.availability}>
              {item.availability ? 'yes' : 'no'}
            </Availability>
          </ContentSidebar>
          <ContentImageGrid>
            {item.images && item.images.map(image => 
              <ItemImage key={Math.random() * 100 + image.alt} src={image.src} alt={image.alt}>
                <img src={image.src} alt={image.alt} />
              </ItemImage>)}
          </ContentImageGrid>
        </ItemContent>
      </ItemContainer>
    );
  }
}

export default MenuItem;