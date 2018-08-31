import React from 'react'
import styled from 'styled-components'
import Label from '../Label/index'

const StyledTextArea = styled.textarea`
  display: flex;
  resize: none;
  width: 300px;
  height: 150px;
`

export default (props) => {
  return (
    <React.Fragment>
      <Label htmlFor={props.id} label={props.label} />
      <StyledTextArea {...props} />
    </React.Fragment>
  )
}