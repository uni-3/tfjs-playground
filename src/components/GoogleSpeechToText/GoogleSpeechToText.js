import React, { Component } from 'react'

import { Button, TextField } from "@material-ui/core"
import { Table, TableBody, TableHead, TableSortLabel, TableRow, TableCell, TablePagination, TableFooter } from "@material-ui/core"
import { Tooltip, CircularProgress } from "@material-ui/core"

import Loading from '../Loading/Loading'

import styles from "./GoogleSpeechToText.css"

export default class GoogleSpeechToText extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    //this.props.loadResults()
  }

  componentDidUpdate() {
    console.log('google speech updatethis', this)
  }

  renderResult() {
    let res = this.props.googleSpeechToText.res
    console.log('res', res)
    if (res === null) {
      return
    }

    // resからtextをつなげてtextfieldに表示
    let text = ''

    res.map(obj => {
    console.log('obj', obj.alternatives[0])
      let alt = obj.alternatives[0]
      let t = alt.transcript + '\n'
      console.log('t', t)
      text += t
    })


    return (
      <div className={styles.result}>
        <TextField
          id="resultttext"
          label="result"
          multiline
          className={styles['output-text']}
          value={text}
          rowsMax={20}
          InputProps={{
            readOnly: true,
          }}
        />
      </div>

    )
  }

  render () {
    console.log('googlespeech state', this)
    let { loading } = this.props.googleSpeechToText
    // postボタンと結果を表示する部分が必要
    const { postAudioApi } = this.props
    return (
      <div className={styles['speech-to-text']}>
        <Loading
          loading={loading}
        />
        <h2>Speech To Text(google API)</h2>
        <Button 
          onClick={postAudioApi} 
          variant="outlined"
          color="primary"
          className={styles.button}
        >submit</Button>

        { this.renderResult() }

      </div>

    )
  }
}