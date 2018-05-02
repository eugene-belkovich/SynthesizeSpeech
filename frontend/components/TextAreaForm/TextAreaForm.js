import React from 'react'
import Formsy from 'formsy-react'
import Textarea from '../Textarea'
import Select from '../Select'
import RadioGroup from '../RadioGroup'
import { formats, languages, genders, voices, rates } from '../../config'

const download = require('downloadjs')

class TextAreaForm extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    canSubmit: false,
    currentFormat: formats[0],
    currentLanguage: languages[0],
    currentGender: genders[0],
    currentRate: rates[0],
    voiceOptions: [],
  }

  disableButton() {
    this.setState({ canSubmit: false })
  }

  enableButton() {
    this.setState({ canSubmit: true })
  }

  submit(model) {
    fetch('http://127.0.0.1:8081/', {
      body: JSON.stringify(model),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    }).then((response) => {
      return response.blob()
    }).then((myBlob) => {
      download(myBlob)
    })
  }

  getVoiceOptions() {
    const {currentLanguage, currentGender} = this.state;
    const voiceOptions = voices.filter((option) => option.gender === currentGender.value && option.language === currentLanguage.value);
    this.setState({ voiceOptions })
    return voiceOptions
  }

  handleLanguageChange() {

  }

  render() {
    const {currentFormat, currentLanguage, currentGender, currentRate, voiceOptions} = this.state;
    return (
      <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <Select name="format" options={formats} default={currentFormat} required/>
        <Select name="language" options={languages} default={currentLanguage} required/>
        <RadioGroup name="genders" options={genders} default={currentGender} required/>
        <Select name="voices" options={this.getVoiceOptions()} default={voiceOptions[0]} required/>
        <Select name="rate" options={rates} default={currentRate} required/>
        <Textarea
          name="text"
          validations="isExisty"
          validationError="Please enter any text"
          required
        />
        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy>
    )
  }
}

export default TextAreaForm