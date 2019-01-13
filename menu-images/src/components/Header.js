import React, { Component } from 'react';
import styled from 'styled-components';

const HeaderBar = styled.div`
  background: red;
  padding: 1rem 0;
  text-align: center;
  font-size: 2rem;
  color: #fff;
  font-weight: 800;
`;

class Header extends Component {
  render() {
    return (
      <HeaderBar>
        PictureMenu
      </HeaderBar>
    )
  }
}

export default Header;