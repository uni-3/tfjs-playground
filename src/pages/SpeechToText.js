import React, { Component } from 'react'

import UploadAudioToGcs from "../containers/UploadAudioToGcs"
import GoogleSpeechToText from "../containers/GoogleSpeechToText"


export default class SpeechToText extends Component {
  render() {
    return (
      <div>
        <h2>Upload audio file, then submit to transcribe an audio file.</h2>
        <h3>
          requirements, encoding: FLAC, sampleRateHertz: 44100, language: ja
        </h3>
        <UploadAudioToGcs />
        <GoogleSpeechToText />
      </div>
    )
  }
}