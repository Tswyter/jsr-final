import React, { Component } from 'react';
import urlencode from 'urlencode';
import styled from 'styled-components';
import MenuItem from './MenuItem';
import AddItem from './AddItem';

const MenuContainer = styled.section`
  text-align: left;
`;

const RestaurantInfo = styled.div`
  border-bottom: 1px solid #efefef;
  p {
    font-size: 0.75rem;
    line-height: 0.5em;
  }
`;

const Menu = styled.div`
`;

// this.state.items needs to be populated from our firebase database
class RestaurantMenu extends Component {
  state = {
    items: []
  };

  componentWillMount() {
    // get items from firebase database for specific restaurant
    // add items to states
    fetch(`http://localhost:3001/firebase?restaurantId=${this.props.restaurant.id}&restaurantName=${urlencode(this.props.restaurant.name)}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        const menuItems = Object.values(res.menu);
        const images = menuItems.map(item => item.images);
        menuItems[this.props.restaurant.id].images = images;
        console.log('images',menuItems)
        this.setState({ items: menuItems })
      })
      .catch(err => console.error(err));
  }

  renderNewItem = (item) => {
    this.setState({ items: [...this.state.items, item]});
  }
  
  render() {
    const { restaurant } = this.props; 
    const { items } = this.state;
    if (restaurant.name) {
      return (
        <MenuContainer>
          <RestaurantInfo>
            <h1>{restaurant.name}</h1>
            <p>{restaurant.location.address1}</p>
            <p>{restaurant.location.city}, {restaurant.location.zip_code}</p>
          </RestaurantInfo>
          <Menu>
            {items.length > 0 
              && items.map(item =>
                <MenuItem key={`menuItem-${Math.random() * 100}`} item={item}></MenuItem>)}
              <AddItem restaurant={restaurant} handleNewItems={this.renderNewItem}>Add an Item</AddItem>
          </Menu>
        </MenuContainer>
      )
    } else {
      return (
        <MenuContainer>
          <h1>Please select a restaurant in the sidebar.</h1>
        </MenuContainer>
      )
    }
  }
}

export default RestaurantMenu;