import React, { Component } from 'react'

import { Button, TextField } from '@material-ui/core'
import Dropzone from 'react-dropzone'

import './NlpApi.css'


export default class NlpApi extends Component {

  renderResult() {
    let props = this.props.nlpApi
    if (props.res === null) {
      return
    }
    let text = JSON.stringify(props.res, null, 2)
    console.log('text', text)
    return (
      <div className="result">
        <TextField
          id="resultttext"
          label="result"
          multiline
          className="output-text"
          margin="normal"
          value={text}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    )
  }

  render() {
    const { inputText, onChange, postTextParse } = this.props
    console.log('nlp comp this', this)
    return (
      <div className="nlp-api">
        <h2>日本語形態素解析</h2>
        <div className="input-field">
          <TextField
            id="inputtext"
            label="日本語の文章"
            placeholder="ポケモンGO"
            multiline
            className="input-text"
            margin="normal"
            onChange={onChange}
            value={inputText}
          />
          <Button onClick={postTextParse} variant="outlined" color="primary">textparse</Button>
        </div>

        {this.renderResult()}
      </div>
    )
  }
}