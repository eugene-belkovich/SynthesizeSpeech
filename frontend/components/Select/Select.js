import React from 'react';
import { withFormsy } from 'formsy-react';

class Select extends React.Component {

  componentDidMount() {
    this.props.setValue(this.props.options[0].value);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  getOptions() {
    return this.props.options.map((option, i) => (
      <option key={option.title+option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.props.showRequired() ? 'required' : this.props.showError() ? 'error' : '');



    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <select name={this.props.name} onChange={this.changeValue} value={this.props.getValue()}>
          {this.getOptions()}
        </select>
        <span className='validation-error'>{this.props.getErrorMessage()}</span>
      </div>
    );
  }
}

export default withFormsy(Select);
