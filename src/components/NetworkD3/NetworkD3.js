import React, { Component } from 'react'

import { Graph } from 'react-d3-graph'

import { Nodes, Links } from './data'
import Link from 'react-d3-graph/lib/components/link/Link';


export default class NetworkD3 extends Component {
  constructor(props) {
    super(props)
    this.data = {
      nodes: Nodes,
      links: Links
    }
  }

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightblue',
      size: 20,
      highlightStrokeColor: 'blue'
    },
    link: {
      highlightColor: 'gray'
    },
    width: 500,
    height: 500
  }

  // graph event callbacks
  onClickNode = (nodeId) => {
    console.log(`Clicked node ${nodeId}`)
  }

  onMouseOverNode = (nodeId) => {
    console.log(`Mouse over node ${nodeId}`)
  }

  onMouseOutNode = (nodeId) => {
    console.log(`Mouse out node ${nodeId}`)
  }

  onClickLink = (source, target) => {
    console.log(`Clicked link between ${source} and ${target}`)
  }

  onMouseOverLink = (source, target) => {
    console.log(`Mouse over in link between ${source} and ${target}`)
  }

  onMouseOutLink = (source, target) => {
    console.log(`Mouse out link between ${source} and ${target}`)
  }

  render() {
    return (
      <Graph 
        id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
        data={ this.data }
        config={ this.myConfig }
        onClickNode={ this.onClickNode }
        onClickLink={ this.onClickLink }
        onMouseOverNode={ this.onMouseOverNode }
        onMouseOutNode={ this.onMouseOutNode }
        onMouseOverLink = { this.onMouseOverLink }
        onMouseOutLink = { this.onMouseOutLink }
      >
      </Graph>
    )
  }
}