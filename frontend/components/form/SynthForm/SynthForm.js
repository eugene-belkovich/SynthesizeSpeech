import React from 'react'

const download = require('downloadjs')
import { SubmitButton, TextArea, RadioButton, SelectButton, HiddenInput } from '../../controls'
import { formats, languages, voices, rates } from '../../../config'
import { withFormik, Form } from 'formik'


function getVoicesByLanguage(language) {
  return voices.filter((option) => option.language === language)
}

let DEFAULT_LANGUAGE = languages[0].value
const DEFAULT_RATE = rates[1].value
const DEFAULT_FORMAT = formats[0].value

class SynthForm extends React.PureComponent {
  render() {
    const { values, handleChange, handleBlur, setFieldValue } = this.props
    return (
      <Form>
        <SelectButton
          name="language"
          label="Language"
          options={languages}
          values={values}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          onChange={(value) => {
            setFieldValue('voice', getVoicesByLanguage(value)[0].value)
            DEFAULT_LANGUAGE = value;
          }}
        />
        <RadioButton
          name="voice"
          label="Voice"
          options={getVoicesByLanguage(DEFAULT_LANGUAGE)}
          values={values}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
          withDefault
        />
        <RadioButton
          name="rate"
          label="Rate"
          options={rates}
          values={values}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
        <RadioButton
          name="format"
          label="Format"
          options={formats}
          values={values}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
        <TextArea
          name="text"
          type="text"
          label="Plain text"
          placeholder="Enter your email"
          value={values.text}
          onChange={handleChange}
        />
        <HiddenInput id="type" name="type" type="hidden"/>
        <SubmitButton
          label="Listen to speech"
          onClick={() => {
            setFieldValue('type', 'play');
          }}
        />
        <SubmitButton
          type="submit"
          label="Download"
          onClick={() => {
            setFieldValue('type', 'download');
          }}
        />
      </Form>
    )
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    text: '',
    type: '',
    voice: getVoicesByLanguage(DEFAULT_LANGUAGE)[0].value,
    rate: DEFAULT_RATE,
    format: DEFAULT_FORMAT,
  }),
  handleSubmit: (values) => {
    console.log(JSON.stringify(values, null, 2))

    fetch('http://127.0.0.1:8081/', {
      body: JSON.stringify(values),
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
    }).then((blob) => {
      //todo if for download or speakers
      if(values.type === 'play') {
        var url = URL.createObjectURL(blob);
        var audioElement = document.getElementById('audio')
        audioElement.src = url;
        audioElement.play();
      } else {
        download(blob) //todo download like mp3
      }
    })
  },
  displayName: 'SynthForm',
})(SynthForm)
