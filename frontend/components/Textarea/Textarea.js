// MyInput.js
import { withFormsy } from 'formsy-react';
import React from 'react';

class Textarea extends React.Component {
  constructor(props) {
    super(props);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    return (
      <div>
        <textarea
          onChange={this.changeValue}
        />
        <span>{this.props.getErrorMessage()}</span>
      </div>
    );
  }
}

export default withFormsy(Textarea);