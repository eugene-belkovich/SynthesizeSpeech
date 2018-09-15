import React from 'react'
import styled from 'styled-components'

const StyledHiddenInput = styled.input.attrs({
})`
  display: flex,
`

export default (props) => {
  return (
    <StyledHiddenInput {...props} />
  )
}
