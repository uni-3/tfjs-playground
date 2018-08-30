import React, { Component } from 'react'

import WordCloud from 'react-d3-cloud'

export default class Wordcloud extends Component {
  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    let data = this.props.data

    if (JSON.stringify(nextProps.data) === JSON.stringify(data)) {
      console.log('next false', nextProps.data)

      return false
    }
    return true
  }

  render() {
    let data = this.props.data
    if (data === null) {
      return null
    }
    //const fontSizeMapper = word => Math.log2(word.value) * 20
    //const rotate = word => word.value % 360
    //const fontSizeMapper = word => word.value * 100
    const fontSizeMapper = word => Math.log2(word.value*10) * 20
    const rotate = word => word.value % 90

    return (
      <WordCloud
        data={data}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
      />

    )
  }
}