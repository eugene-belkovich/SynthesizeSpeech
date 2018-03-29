const express = require('express')
const AWS = require('aws-sdk')
const fs = require('fs')
const util = require('util')
const Stream = require('stream')
const Speaker = require('speaker')
const router = express.Router()

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


  const Player = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
  })

  const Polly = new AWS.Polly({
    region: 'us-west-2'
  })
  let params = {
    'Text': text,
    'OutputFormat': 'pcm',
    'VoiceId': 'Kimberly',
    'SampleRate': rate,
  }

  Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
      console.log(err.code)
    } else if (data) {
      if (data.AudioStream instanceof Buffer) {
        console.log("The file was saved!")
        // Initiate the source
        const bufferStream = new Stream.PassThrough()
        // convert AudioStream into a readable stream
        bufferStream.end(data.AudioStream, (err, data) => {
          if (err) {
            console.log(err.code)
          } else {
            res.pipe(bufferStream)
          }
        })
      }
    }
  })

  res.json('post controller');
})

module.exports = router
