import React, { Component } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border-radius: 3px;
  padding: 0.5rem;
  ${({ hidden }) => hidden ? 'display: none' : 'display: inline-block'};
  border: 0;
  border-bottom: 1px solid #efefef;
  ${({ type }) => type === 'submit' && `
    background-color: blue;
    color: #FFF;
  `}
`;

class Input extends Component {
  state = {};
  render() {
    const { type, placeholder, value = '', name, hidden, changeWatcher } = this.props;
    return(
      <>
        <StyledInput type={type} placeholder={placeholder} name={name} value={value} onChange={changeWatcher} hidden={hidden} />
      </>
    )
  }
}

export default Input;