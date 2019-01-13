import React, { Component } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div``;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const ListItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid #efefef;
  text-align: left;
`;

class RestaurantList extends Component {
  render() {
    return (
      <>
        <ListContainer>
          <List>
            {this.props.restaurants.map((restaurant, i) => 
              <ListItem key={restaurant.id} onClick={this.props.clickHandler}>{restaurant.name}</ListItem>)
            }
          </List>
        </ListContainer>
      </>
    )
  }
}

export default RestaurantList;