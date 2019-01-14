import React, { Component } from 'react';
import './App.css';
import urlencode from 'urlencode';
import Header from './components/Header';
import RestaurantList from './components/RestaurantList';
import RestaurantMenu from './components/RestaurantMenu';
import Input from './components/Input';

import styled from 'styled-components';

const ContentArea = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
`;

const Sidebar = styled.aside`
  width: 20%;
  margin-right: 20px;
`;

const MenuContainer = styled.main`
  flex-grow: 1;
  min-height: 10px;
`;

const coordinates = new Promise((resolve, reject) => {
  if (!navigator.geolocation) {
    resolve(navigator.geolocation.getCurrentPosition((position) => `lat=${position.coords.latitude}&long=${position.coords.longitude}`))
  } else {
    resolve(`lat=42.279949599999995&long=-71.0691982`);
  }
});

class App extends Component {
  state = {
    restaurants: [],
    selectedRestaurant: {}
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    coordinates.then(coords => {
      fetch(`http://localhost:3001/restaurant-search?${coords}`)
        .then(res => res.json())
        .then(restaurants => this.setState({ restaurants: restaurants[0]['restaurants'] }))
        .catch(err => console.log(err));
    })
    .catch(err => console.error(err));
  }

  selectRestaurant = (e) => {
    const selectedRestaurant = this.state.restaurants.find(restaurant => restaurant.name === e.target.innerText);
    this.setState({ selectedRestaurant });
    fetch(`http://localhost:3001/firebase?restaurantId=${this.state.selectedRestaurant.id}&restaurantName=${urlencode(this.state.selectedRestaurant.name)}`)
      .then(res => res.json())
      .then(res => {
        // const menuItems = Object.values(res.menu);
        // const images = menuItems.map(item => item.images);
        // menuItems[this.props.restaurant.id].images = images;
        // console.log('images',menuItems)
        this.setState({ items: res });
      })
      .catch(err => console.error(err));
  }

  searchValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    setTimeout(() => {
      fetch(`http://localhost:3001/restaurant-search?term=${this.state.restaurantSearchTerm}&location=boston`)
        .then(res => res.json())
        .then(restaurants => this.setState({ restaurants: restaurants[0]['restaurants'] }))
        .catch(err => console.error(err));
    },0);
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <ContentArea>
          <Sidebar>
            <>
              <Input name="restaurantSearchTerm" type="text" placeholder="Search Restaurants" value={this.state.restaurantSearchTerm} changeWatcher={this.searchValue} />
            </>
            <RestaurantList restaurants={this.state.restaurants} clickHandler={(e) => this.selectRestaurant(e)}/>
          </Sidebar>
          <MenuContainer>
            <RestaurantMenu restaurant={this.state.selectedRestaurant} items={this.state.items} />
          </MenuContainer>
        </ContentArea>
      </div>
    );
  }
}

export default App;
