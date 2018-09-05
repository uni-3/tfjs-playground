import React, { Component } from 'react'

import * as tf from '@tensorflow/tfjs'
import * as tsne from '@tensorflow/tfjs-tsne'

import * as d3 from 'd3'
import { MnistData, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE, CLASSES, TEST_ELEMENTS } from './data'

import { Button, TextField } from '@material-ui/core'
import { Tooltip, CircularProgress } from "@material-ui/core"

import InsertComment from '@material-ui/icons/InsertComment'
import Dropzone from 'react-dropzone'

import './MnistTsne.css'


export default class MnistTsne extends Component {
  constructor(props) {
    super(props)


    this.state = {
      width: 800,
      height: 800,
      canvas: null,
      context: null,
      ministData: null,
      coordinates: null,
      labels: null
    }
    this.colors = d3.scaleOrdinal(d3.schemeCategory10)
  }

  async componentDidMount() {
    console.log('did mnist')
    await this.loadData()
    await this.initVisualization()
    console.log('loaded ', this.state)
  }

  async loadData() {
    console.log('did load', this)
    const canvas = this.refs.canvas
    //const context = canvas.getContext('2d')
    //const image = new Image()

    const md = new MnistData(canvas)
    console.log('did mnist ', md)
    let data = await md.load()

    this.setState({
      ministData: md
    })
  }


  async initVisualization() {
    let canvas = d3.select('#vis').append('canvas')
             .attr('width', this.state.width)
             .attr('height', this.state.height)
    let context = canvas.node().getContext('2d')

    this.setState({
      canvas: canvas,
      context: context
    })
  }

  async onEmbedding(data, numIterations, knnIter, perplexity) {
    /*
    console.log('on embe', data)
    console.log('on labels', labels)
    console.log('on num', numIterations)
    console.log('on knn', knnIter)
    console.log('on per', perplexity)
    */

    //const embedder = tsne.tsne(data, {
    //  perplexity: perplexity,
    //  verbose: false,
    //  knnMode: 'auto'
    //})
    const embedder = tsne.tsne(data)
    await embedder.iterateKnn(knnIter)
    console.log('on embedder', embedder)

    for (let i = 0; i < numIterations; i++) {
      await embedder.iterate(1)
      console.log('on embedder', i)
      const coordinates = await embedder.coordsArray()

      // render
      this.setState({
        coordinates: coordinates
      })
      await tf.nextFrame()
    }
  }

  //renderEmbedding(coordinates, labels) {
  renderEmbedding() {
    const data = this.state.ministData
    //const labelsTensor = tf.tensor2d(data.testLabels, [TEST_ELEMENTS, CLASSES])
    //const labels = labelsTensor.argMax(1).dataSync()

    const labels = this.state.labels
    const coordinates = this.state.coordinates

    const canvas = this.state.canvas
    const context = this.state.context
    const image = new Image()

    const x = d3.scaleLinear().range([0, this.state.width]).domain([0, 1])
    const y = d3.scaleLinear().range([0, this.state.height]).domain([0, 1])

    context.clearRect(0, 0, this.state.width, this.state.height)
    coordinates.forEach((d, i) => {
      context.font = '10px sans'
      context.fillStyle = this.colors(parseInt(labels[i], 10)) 
      context.fillText(labels[i], x(d[0]), y(d[1]))
    })
  }

  async start(numPoints=10000, tsneIter, knnIter, perplexity) {
    const data = this.state.ministData
    const NEW_WIDTH = 10
    const NEW_HEIGHT = 10
    console.log('data', data)

    const [reshaped, labels] = tf.tidy(() => {
      // labelデータを[row*column]=[テストデータセット*クラス数]の二次元配列に(onehot形式になってる？)
      const labelsTensor = tf.tensor2d(data.testLabels, [TEST_ELEMENTS, CLASSES])

      // 2列目の値が一番大きいインデックスを取得
      const labels = labelsTensor.argMax(1).dataSync()

      // test set images
      // 1次元（グレースケール）の画像をnumPointsの数だけ取得
      const images = tf.tensor4d(data.testImages, [
        TEST_ELEMENTS, IMAGE_HEIGHT, IMAGE_WIDTH, 1
      ]).slice([0], [numPoints])

      // resize image to [] size
      const resized = images.resizeBilinear([NEW_HEIGHT, NEW_WIDTH])

      // 要素に１画素のデータが入るように二次元配列へreshape
      const reshaped = resized.reshape([numPoints, NEW_HEIGHT*NEW_HEIGHT])

      return [reshaped, labels]
    })
    this.setState({
      labels: labels
    })

    await this.onEmbedding(reshaped, tsneIter, knnIter, perplexity)

    reshaped.dispose()
  }
  
  onStart(e) {
    const numPoints = parseInt(500, 10)
    const tsneIter = parseInt(500, 10)
    const knnIter = parseInt(800, 10)
    const perplexity = parseInt(40, 10)

    this.start(numPoints, tsneIter, knnIter, perplexity)
  }

  render() {
    const { coordinates } = this.state

    if (coordinates) {
      //console.log('update canvas')
      this.renderEmbedding()
    }
    return (
      <div>
        <h2>Mnist Tsne</h2>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.onStart.bind(this)}
        >start</Button>

        <canvas
          ref="canvas"
          className="mnistdata"
        ></canvas>
        <div id="vis">
        </div>
      </div>
    )
  }

}