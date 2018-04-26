import React from 'react'
import Formsy from 'formsy-react'
import Textarea from '../Textarea'
import Select from '../Select'
const download = require("downloadjs")

class TextAreaForm extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    canSubmit: false,
    formats: [
      { label: 'mp3', value: 'mp3' },
      { label: 'ogg', value: 'ogg_vorbis' },
      // { label: 'pcm', value: 'pcm' },
      { label: 'json', value: 'json' }
    ],
    languages: [
      { label: 'English', value: 'en-US' },
      { label: 'Russian', value: 'ru-RU' },
      { label: 'Danish', value: 'da-DK' },
      { label: 'Dutch', value: 'nl-NL' },
      { label: 'English (Australian)', value: 'en-AU' },
      { label: 'English (British) ', value: 'en-GB' },
      { label: 'English (Indian) ', value: 'en-IN' },
      { label: 'English (US)', value: 'en-US' },
      { label: 'English (Welsh)', value: 'en-GB-WLS' },
      { label: 'Welsh', value: 'cy-GB' },
      { label: 'French', value: 'fr-FR' },
      { label: 'French (Canadian)', value: 'fr-CA' },
      { label: 'German', value: 'de-DE' },
      { label: 'Icelandic', value: 'is-IS' },
      { label: 'Italian', value: 'it-IT' },
      { label: 'Japanese', value: 'ja-JP' },
      { label: 'Korean', value: 'ko-KR' },
      { label: 'Norwegian', value: 'nb-NO' },
      { label: 'Polish', value: 'pl-PL' },
      { label: 'Portuguese (Brazilian)', value: 'pt-BR' },
      { label: 'Portuguese (European)', value: 'pt-PT' },
      { label: 'Spanish (Castilian)', value: 'es-ES' },
      { label: 'Spanish (Latin American)', value: 'es-US' },
      { label: 'Romanian', value: 'ro-RO' },
      { label: 'Swedish', value: 'sv-SE' },
      { label: 'Turkish', value: 'tr-TR' },
    ],
    genders: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' }
    ],
    voices: [
      { label: 'Mads', value: 'Mads', gender: 'male', language: 'da-DK' },
      { label: 'Naja', value: 'Naja', gender: 'female', language: 'da-DK' },
      { label: 'Lotte', value: 'Lotte', gender: 'female', language: 'nl-NL' },
      { label: 'Ruben', value: 'Ruben', gender: 'male', language: 'nl-NL' },
      { label: 'Nicole', value: 'Nicole', gender: 'female', language: 'en-AU' },
      { label: 'Russell', value: 'Russell', gender: 'male', language: 'en-AU' },
      { label: 'Amy', value: 'Amy', gender: 'female', language: 'en-GB' },
      { label: 'Brian', value: 'Brian', gender: 'male', language: 'en-GB' },
      { label: 'Emma', value: 'Emma', gender: 'female', language: 'en-GB' },
      { label: 'Aditi', value: 'Aditi', gender: 'female', language: 'en-IN' },
      { label: 'Raveena', value: 'Raveena', gender: 'female', language: 'en-IN' },
      { label: 'Ivy', value: 'Ivy', gender: 'female', language: 'en-US' },
      { label: 'Joanna', value: 'Joanna', gender: 'female', language: 'en-US' },
      { label: 'Joey', value: 'Joey', gender: 'male', language: 'en-US' },
      { label: 'Justin', value: 'Justin', gender: 'male', language: 'en-US' },
      { label: 'Kendra', value: 'Kendra', gender: 'female', language: 'en-US' },
      { label: 'Kimberly', value: 'Kimberly', gender: 'female', language: 'en-US' },
      { label: 'Matthew', value: 'Matthew', gender: 'male', language: 'en-US' },
      { label: 'Salli', value: 'Salli', gender: 'female', language: 'en-US' },
      { label: 'Geraint', value: 'Geraint', gender: 'male', language: 'en-GB-WLS' },
      { label: 'Céline/Celine', value: 'Céline/Celine', gender: 'female', language: 'fr-FR' },
      { label: 'Mathieu', value: 'Mathieu', gender: 'male', language: 'fr-FR' },
      { label: 'Chantal', value: 'Chantal', gender: 'female', language: 'fr-CA' },
      { label: 'Hans', value: 'Hans', gender: 'male', language: 'de-DE' },
      { label: 'Marlene', value: 'Marlene', gender: 'female', language: 'de-DE' },
      { label: 'Vicki', value: 'Vicki', gender: 'female', language: 'de-DE' },
      { label: 'Dóra/Dora', value: 'Dóra/Dora', gender: 'female', language: 'is-IS' },
      { label: 'Karl', value: 'Karl', gender: 'male', language: 'is-IS' },
      { label: 'Carla', value: 'Carla', gender: 'female', language: 'it-IT' },
      { label: 'Giorgio', value: 'Giorgio', gender: 'male', language: 'it-IT' },
      { label: 'Mizuki', value: 'Mizuki', gender: 'female', language: 'jp-JP' },
      { label: 'Takumi', value: 'Takumi', gender: 'male', language: 'jp-JP' },
      { label: 'Seoyeon', value: 'Seoyeon', gender: 'female', language: 'ko-KR' },
      { label: 'Liv', value: 'Liv', gender: 'female', language: 'nb-NO' },
      { label: 'Jacek', value: 'Jacek', gender: 'male', language: 'pl-PL' },
      { label: 'Jan', value: 'Jan', gender: 'male', language: 'pl-PL' },
      { label: 'Ewa', value: 'Ewa', gender: 'female', language: 'pl-PL' },
      { label: 'Maja', value: 'Maja', gender: 'female', language: 'pl-PL' },
      { label: 'Ricardo', value: 'Ricardo', gender: 'male', language: 'pt-BR' },
      { label: 'Vitória/Vitoria', value: 'Vitória/Vitoria', gender: 'female', language: 'pt-BR' },
      { label: 'Cristiano', value: 'Cristiano', gender: 'male', language: 'pt-PT' },
      { label: 'Inês/Ines', value: 'Inês/Ines', gender: 'female', language: 'pt-PT' },
      { label: 'Carmen', value: 'Carmen', gender: 'female', language: 'ro-RO' },
      { label: 'Maxim', value: 'Maxim', gender: 'male', language: 'ru-RU' },
      { label: 'Tatyana', value: 'Tatyana', gender: 'female', language: 'ru-RU' },
      { label: 'Conchita', value: 'Conchita', gender: 'female', language: 'es-ES' },
      { label: 'Enrique', value: 'Enrique', gender: 'male', language: 'es-ES' },
      { label: 'Penélope/Penelope', value: 'Penélope/Penelope', gender: 'female', language: 'es-US' },
      { label: 'Miguel', value: 'Miguel', gender: 'male', language: 'es-US' },
      { label: 'Astrid', value: 'Astrid', gender: 'female', language: 'sv-SE' },
      { label: 'Filiz', value: 'Filiz', gender: 'female', language: 'tr-TR' },
      { label: 'Gwyneth', value: 'Gwyneth', gender: 'female', language: 'cy-GB' },
    ],
    rates: [
      { label: '8000Hz', value: '8000' },
      { label: '16000Hz', value: '16000' },
      { label: '22050Hz', value: '22050' },
    ]
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
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    }).then((response) => {
      return response.blob()
    }).then((myBlob) => {
      download(myBlob);
    })
  }

  render() {
    return (
      <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <Select name="format" options={this.state.formats} required/>
        <Select name="language" options={this.state.languages} required/>
        <Select name="genders" options={this.state.genders} required/>
        <Select name="voices" options={this.state.voices} required/>
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