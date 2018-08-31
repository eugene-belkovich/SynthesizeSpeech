import React from 'react'
import styled from 'styled-components'

const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  display: flex;
`;

export default (props) => {
  return (
    <SubmitButton>Submit</SubmitButton>
  )
}