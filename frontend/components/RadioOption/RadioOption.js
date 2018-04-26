import React from 'react'

class RadioOption extends React.Component {

  render() {
    const { option, checked, onChange } = this.props

    return (
      <label>
        <input
          type="radio"
          value={option.value}
          onChange={onChange}
          checked={checked}
        />
        {option.label}
      </label>
    )
  }
}

export default RadioOption