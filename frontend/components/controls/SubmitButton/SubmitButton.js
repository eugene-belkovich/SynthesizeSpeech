import React from 'react'
import styled from 'styled-components'

const SubmitButton = styled.button.attrs({
})`
  display: flex;
`;

export default (props) => {
  return (
    <SubmitButton {...props}>{props.label}</SubmitButton>
  )
}
