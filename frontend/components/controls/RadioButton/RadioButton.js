import React, { Fragment } from 'react'
import styled from 'styled-components'
import Label from '../Label/index'

const StyledInput = styled.input.attrs({
  type: 'radio',
})`
  display: flex,
`

class StyledRadioButton extends React.Component {
  getRadioOptions() {
    const { options } = this.props
    return options.map((option) => {
      return (
        <Label key={option.value}>
          <StyledInput

            id={option.value}
            value={this.props.values[this.props.name]}
            name={this.props.name}

            checked={this.props.values[this.props.name] === option.value}

            onBlur={this.props.handleBlur}
            onChange={() => {
              this.props.setFieldValue(this.props.name, option.value)
            }}
          />
          {option.label}
        </Label>
      )
    })
  }

  render() {
    return (
      <div>
        <Label htmlFor={this.props.id} label={this.props.label}/>
        {this.getRadioOptions()}
      </div>
    )
  }
}

export default StyledRadioButton
