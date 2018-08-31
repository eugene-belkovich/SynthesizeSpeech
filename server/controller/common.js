const express = require('express')
const AWS = require('aws-sdk')
const fs = require('fs')
const util = require('util')
const router = express.Router()

const Polly = new AWS.Polly({
    region: 'us-west-2'
})

router.get('/', function (req, res) {
  console.log('get controller')
  res.json('get controller');
})

router.post('/', function (req, res) {
  console.log('post controller', req.body)
  const text = req.body.text
  const format = req.body.format
  const language = req.body.language
  const rate = req.body.rate

  let params = {
    'Text': text,
    'OutputFormat': 'mp3',
    'VoiceId': 'Kimberly',
    'SampleRate': rate,
  }

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log("Error " + err + err.code)
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        res.set('content-type', 'audio/mp3');
        res.write(data.AudioStream);
        res.end();
      }
    }
  })
})

module.exports = router
