import React from 'react'

const download = require('downloadjs')
import { SubmitButton, TextArea, RadioButton, SelectButton } from '../../controls'
import { formats, languages, voices, rates } from '../../../config'
import { withFormik, Form } from 'formik'


const DEFAULT_LANGUAGE = languages[0].value
const DEFAULT_RATE = rates[1].value
const DEFAULT_FORMAT = formats[0].value


class SynthForm extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      language: DEFAULT_LANGUAGE,
    }
  }

  getVoiceOptions() {
    return voices.filter((option) => option.language === this.state.language)
  }


  render() {
    const { values, isSubmitting, handleChange, handleBlur, setFieldValue } = this.props
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
            this.setState({ language: value })
          }}
        />
        <RadioButton
          name="voice"
          label="Voice"
          options={this.getVoiceOptions()}
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
          id="text"
          type="text"
          label="Plain text"
          placeholder="Enter your email"
          value={values.text}
          onChange={handleChange}
        />
        <SubmitButton disabled={isSubmitting}/>
      </Form>
    )
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    text: '',
    rate: DEFAULT_RATE,
    format: DEFAULT_FORMAT,
  }),
  handleSubmit: (values, { setSubmitting }) => {
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
      var url = URL.createObjectURL(blob);
      var audioElement = document.getElementById('audio')
      audioElement.src = url;
      audioElement.play();
      // download(blob) //todo download like mp3
    })
  },
  displayName: 'SynthForm',
})(SynthForm)
