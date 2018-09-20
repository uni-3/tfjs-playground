import React, { Component } from 'react'

import { CircularProgress } from "@material-ui/core"

import styles from './Loading.css'

export default class Loading extends Component {

  render () {
    let loading = this.props.loading
    console.log('loading', loading)
    let progStyle = loading === true ? `${styles.loading}` : `${styles.loading} ${styles.disable}`
    return (
      <div className={progStyle}>
        <CircularProgress 
          className={styles.progress}
          size={50}
        />
        <h3>loading...</h3>
      </div>
    )
  }
}