import React from 'react'
import Formsy from 'formsy-react'
import Textarea from '../Textarea'
import Select from '../Select'


class TextAreaForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    canSubmit: false,
    formats: [
      { label: 'mp3', value: 'mp3' },
      { label: 'ogg_vorbis', value: 'ogg_vorbis' },
      { label: 'pcm', value: 'pcm' },
      { label: 'json', value: 'json' }
    ],
    languages: [
      { label: 'English', value: 'en-US' },
      { label: 'Russian', value: 'ru-RU' },
    ],
    rates: [
      { label: '16000Hz', value: '16000' },
    ]
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  submit(model) {
    console.log("model", model);
    fetch('http://127.0.0.1:8081/', {
      body: JSON.stringify(model), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    });
  }

  render() {
    return (
      <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <Select name="format" options={this.state.formats} required/>
        <Select name="language" options={this.state.languages} required/>
        <Select name="rate" options={this.state.rates} required/>
        <Textarea
          name="text"
          validations="isExisty"
          validationError="Please enter any text"
          required
        />
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy>
    );
  }
}

export default TextAreaForm