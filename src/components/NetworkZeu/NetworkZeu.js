import React, { Component } from 'react'

import { NetworkGraph } from 'zeu'


export default class NetworkZeu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 200,
      height: 200,
      network: null
    }
  }

  componentDidMount() {
    let intervalId = this.renderGraph()

    this.setState({ 
      intervalId: intervalId
    })
  }

  componentWillUnmount() {
    console.log('counter unmount')
    clearInterval(this.state.intervalId)

  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  renderGraph() {
    console.log('render graph')
    let options = {
      nodes: [{
        id: 'a',
        x: 30,
        y: 100,
        color: this.getRandomColor(),
        size: 15,
        text: {
          value: 'A node',
          font: '16px Arial',
          xOffset: 0,
          yOffset: 20
        },
        neighbors: [{
          id: 'b',
          edge: {
            width: 1,
            color: this.getRandomColor(),
            dash: [2,2]
          }
        }]
      }]
    }

    let network = new NetworkGraph('network-graph', options)

    //network.addNodes(options.nodes)
    network.addNodes([
      {
        id: 'b',
        x: 150,
        y: 100,
        color: this.getRandomColor(),
        size: 10,
        text: {
          value: 'B node',
          font: '16px Arial',
          xOffset: 0,
          yOffset: 20
        }
      }
    ])
    /*
    */

    // add link
    network.addNeighbor( 
      'a', // node id
      {
        id: 'b',
        edge: {
          width: 3,
          color: this.getRandomColor(),
          dash: [5, 5]
        }
      }
    )


    return setInterval(() => {
      // 3-6
      let signalSize =  Math.floor(Math.random() * 3 + 3)
      network.signal({
        from: 'a',
        to: 'b',
        color: this.getRandomColor(),
        duration: 10000, // ms
        size: signalSize
      })

      this.setState({
        network: network
      })
      this.updataNode(signalSize)
    }, 1000)

  }


  updataNode(size) {
    let network = this.state.network
    //console.log('network', network)

    if(network._nodes[1].size >= 20) {
      network._nodes[1].size = 10
      this.setState({
        network: network
      })
      return
    } 
    network._nodes[1].size += size

    this.setState({
      network: network
    })
  }

  render() {
    let state = this.state
    return (
      <div>
        <canvas id="network-graph" width={state.width} height={state.height}></canvas>
      </div>

    )
  }
}