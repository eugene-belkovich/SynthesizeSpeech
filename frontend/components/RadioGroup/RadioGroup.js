import React from 'react';
import RadioOption from '../RadioOption';
import { withFormsy } from 'formsy-react';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.options[0].value,
    };
  }

  handleChange(event) {
    this.setState({ checked: event.target.value });
  }

  getRadioOptions() {
    const { options } = this.props;
    return options.map((option) => {
      return (
        <RadioOption
          name="radio"
          key={option.value}
          option={option}
          onChange={this.handleChange}
          checked={this.state.checked === option.value}
        />
      );
    });
  }

  render() {
    return (
      <div>
        {this.getRadioOptions()}
      </div>
    );
  }
}

export default withFormsy(RadioGroup);