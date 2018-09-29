import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import { Button } from "@material-ui/core"

import Loading from '../Loading/Loading'
import styles from './UploadAudioToGcs.css'

export default class UploadAudioToGcs extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    //console.log('upload audio this', this)
    // show api result(text field? zone) 
    let { onDrop, onUpload } = this.props
    let { files, duration, dataUrl, loading } = this.props.uploadAudioToGcs

    let fileUrl = files.length === 0 ? '' : files[0].preview
    let disable = files.length === 0 ? true : false
    return (
      <div className={styles['audio-to-text']}>
        <Loading
          loading={loading}
        />
        <h2>Upload audio file to GCS</h2>
        <div className="upload-file">
          <Dropzone 
            //accept="audio/flac" // accept only flac
            className={styles.dropzone}
            onDrop={onDrop}
          >
            <p>Dropping some file here, or click to select file to upload.</p>
          </Dropzone>
          <audio src={fileUrl} />
          <ul>
            {
              files.map(f => <li key={f.name}>{f.name} : {duration}s - {f.size} bytes</li>)
            }
          </ul>
          <Button
            onClick={onUpload}
            disabled={disable}
            variant="outlined" color="primary"
          >upload</Button>
        </div>
      </div>

    )
  }

}