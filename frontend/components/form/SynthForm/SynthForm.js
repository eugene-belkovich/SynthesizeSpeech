import React from 'react'

const download = require('downloadjs')
import { SubmitButton, TextArea, RadioButton } from '../../controls'
import { formats, languages, voices, rates } from '../../../config'
import { withFormik, Form } from 'formik'


const DEFAULT_LANGUAGE = languages[0].value
const DEFAULT_RATE = rates[1].value
const DEFAULT_FORMAT = formats[0].value


class SynthForm extends React.Component {
  getVoiceOptions() {
    return voices.filter((option) => option.language === DEFAULT_LANGUAGE)
  }


  render() {
    const { values, isSubmitting, handleChange, handleBlur, setFieldValue } = this.props

    return (
      <Form>
        <RadioButton
          name="voice"
          label="Voice"
          options={this.getVoiceOptions()}
          values={values}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
        <RadioButton
          name="rate"
          label="Rates"
          options={rates}
          values={values}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />
        <RadioButton
          name="format"
          label="Formats"
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
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)

    // fetch('http://127.0.0.1:8081/', {
    //   body: JSON.stringify(model),
    //   cache: 'no-cache',
    //   credentials: 'same-origin',
    //   headers: {
    //     'content-type': 'application/json',
    //   },
    //   method: 'POST',
    //   mode: 'cors',
    //   redirect: 'follow',
    //   referrer: 'no-referrer',
    // }).then((response) => {
    //   return response.blob()
    // }).then((myBlob) => {
    //   download(myBlob)
    // })
  },
  displayName: 'SynthForm',
})(SynthForm)