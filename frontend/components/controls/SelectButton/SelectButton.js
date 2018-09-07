import React, { Fragment } from 'react'
import styled from 'styled-components'
import Label from '../Label/index'

const StyledInput = styled.select`
  display: flex,
`

const StyledOption = styled.option`
  display: flex,
`

class StyledSelectButton extends React.Component {
  getOptions() {
    const { options } = this.props
    return options.map((option) => {
      return (
        <Label key={option.value}>
          <StyledOption value={option.value}>{option.label}</StyledOption>
        </Label>
      )
    })
  }

  test() {
    const { options } = this.props
    const divs = options.map((option) => <option key={option.value}>{option.label}</option>)
    return divs
  }
  onSelected(e) {
    this.props.setFieldValue(this.props.name, e.target.value)
  }

  render() {
    return (
      <div>
        <Label htmlFor={this.props.id} label={this.props.label}/>
        <StyledInput
          id={this.props.id}
          value={this.props.values[this.props.name]}
          name={this.props.name}
          onChange={this.onSelected}
        >
          {this.test()}
        </StyledInput>
      </div>
    )
  }
}

export default StyledSelectButton
