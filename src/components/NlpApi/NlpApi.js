import React, { Component } from 'react'

import { Button, TextField } from '@material-ui/core'
import { Tooltip, CircularProgress } from "@material-ui/core"
import InsertComment from '@material-ui/icons/InsertComment'
import Dropzone from 'react-dropzone'

import Wordcloud from '../Wordcloud/Wordcloud'
import TableWithBar from '../TableWithBar/TableWithBar'
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

  tableWithBarTextParseData() {
    let res = this.props.nlpApi.res
    if (res === null || res === undefined || res.tfidfs === undefined) {
      return null
    }

    let header = ['word', 'score']
    let d = [header]
    Object.entries(res.tfidfs[0]).forEach(([key, value]) => {
      d.push([key, value])
    })

    return d
  }

  tableWithBarData(data) {
    let header = ['word', 'score']
    let d = [header]
    Object.entries(data).forEach(([index, value]) => {
      d.push([value[0], value[1]])
    })

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

  renderLdaTableWithBar(obj) {
    return (
      obj.map((res) => {
        let plotData = this.tableWithBarData(res.data)
        return (
          <div key={res.topic} className="lda-table">
            <p>topic: {res.topic}</p>
            <TableWithBar
              data={plotData}
            />
          </div>
        )
 
      })
    )
  }

  renderLdaResult() {
    let res = this.props.nlpApi.res

    // TODO resをobjectで受け取る
    if (res === null || typeof(res) !== 'string') {
      return
    }
    let resJson = JSON.parse(res)

    if (resJson[0].topics === undefined) {
      return
    }

    return ( resJson.map((obj) => {
      return (
        <div className="lda-tables">
          {this.renderLdaTableWithBar(obj.word_freq)}
        </div>
      )
    })
    )

  }

  render() {
    //console.log('nlp comp this', this)
    const { nlpApi, onChange, postTextParse, postLexrank, postLda, loadSample } = this.props
    const { inputText, inputNgram, loading, res } = nlpApi
    let  postDisable = inputText.length === 0 ? 'disabled' : null

    return (
      <div className="nlp-api">
        <h2>日本語解析</h2>
        <div className="input-field">
          {this.renderLoading(loading)}
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
            <Button 
              onClick={postLda}
              variant="outlined"
              color="primary"
              className="button"
              disabled={postDisable}
            >トピック抽出</Button>
          </div>
          <div className="inputs">
            <Tooltip
              title="load sample text"
              placement="top">
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
              id="ngram"
              label="Ngram"
              value={inputNgram}
              onChange={onChange}
              type="number"
              className="ngram"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps = {{
                min: "1",
                step: "1"
              }}
            />
            <TextField
              id="text"
              label="日本語の文章"
              placeholder="ポケモンGO"
              multiline
              className="text"
              onChange={onChange}
              value={inputText}
            />
          </div>
        </div>
        {this.renderResult()}
        <Wordcloud
          data={this.wordcloudData()}
        />
        <TableWithBar
          data={this.tableWithBarTextParseData()}
        />
        {this.renderLdaResult()}
      </div>
    )
  }
}