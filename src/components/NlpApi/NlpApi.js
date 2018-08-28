import React, { Component } from 'react'

import { Button, TextField } from '@material-ui/core'
import { Tooltip, CircularProgress } from "@material-ui/core"
import InsertComment from '@material-ui/icons/InsertComment'
import Dropzone from 'react-dropzone'

import Wordcloud from '../Wordcloud/Wordcloud'
import CatText from "../../assets/wagahaiwa_nekodearu.txt"
import './NlpApi.css'


export default class NlpApi extends Component {

  wordcloudData() {
    let res = this.props.nlpApi.res
    if (res === null || res.tfidfs === undefined) {
      return null
    }

    let d = []
    for (let key in res.tfidfs[0]) {
      d.push({
        text: key,
        value: res.tfidfs[0][key]
      })
    }
    return d
  }



  renderLoading(loading) {
    if (loading === false) {
      return
    }

    return (
      <div>
        <CircularProgress size={50} />
      </div>
    )
  }

  renderResult() {
    let res = this.props.nlpApi.res
    if (res === null) {
      return
    }
    let text = JSON.stringify(res, null, 2)

    return (
      <div className="result">
        <TextField
          id="resultttext"
          label="result"
          multiline
          className="output-text"
          value={text}
          rowsMax={20}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    )
  }

  render() {
    console.log('nlp comp this', this)
    const { nlpApi, onChange, postTextParse, postLexrank, loadSample } = this.props
    const { inputText, loading, res } = nlpApi
    let  postDisable = inputText.length === 0 ? 'disabled' : null
    console.log('dis', postDisable)

    return (
      <div className="nlp-api">
        <h2>日本語解析</h2>
        <div className="input-field">
          <div className="post-buttons">
            <Button 
              onClick={postTextParse} 
              variant="outlined"
              color="primary"
              className="button"
              disabled={postDisable}
            >形態素解析</Button>
            <Button 
              onClick={postLexrank}
              variant="outlined"
              color="primary"
              className="button"
              disabled={postDisable}
            >文章要約</Button>
          </div>
          <Tooltip title="load sample text" placement="right">
            <Button 
              onClick={loadSample} 
              className="button"
              size="small"
              color="secondary"
            >
              <InsertComment className="icon" />
            </Button>
          </Tooltip>
          <TextField
            id="inputtext"
            label="日本語の文章"
            placeholder="ポケモンGO"
            multiline
            className="input-text"
            onChange={onChange}
            value={inputText}
          />
        </div>
        {this.renderResult()}
        {this.renderLoading(loading)}
        <Wordcloud
          data={this.wordcloudData()}
        />
      </div>
    )
  }
}