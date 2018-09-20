import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'

import * as d3 from 'd3'

import LineChart from '../LineChart/LineChart'

import { MnistData, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE, CLASSES, TEST_ELEMENTS } from '../MnistTsne/data'
//import { MnistModel } from './model'

import styles from './MnistCnn.css'


export default class MnistCnn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mnistModel: null,
      batch: null,
      predictions: null,
      labels: null,
      lossValues: [],
      accValues: [],
      embeddingLabels: [],
      embeddingPredicts: [],
      width: 500,
      height: 500
    }
    this.colors = d3.scaleOrdinal(d3.schemeCategory10)
  }

  async componentDidMount() {
    const canvas = this.refs.canvas
    // action initModel
    //this.props.initModel(canvas)
    this.props.initModel(canvas)

    // canvas for embedding
    await this.initVisualization()
  }

  async initVisualization() {
    let canvas = d3.select('#emb-vis').append('canvas')
             .attr('width', this.state.width)
             .attr('height', this.state.height)
    let context = canvas.node().getContext('2d')

    this.setState({
      context: context
    })
  }

  async trainData() {
    let { mnistModel } = this.props.mnistCnn

    const lossValues = []
    const accValues = []
    console.log('train this.', this)

    for (let i = 0; i < mnistModel.trainBatch; i++) {
      console.log('train')
      //let [lossValue, accValue] = await this.trainFrame(i)
      let [lossValue, accValue] = await mnistModel.trainFrame(i)
      lossValues.push(lossValue)
      accValues.push(accValue)

      // get embedding
      let [labels, predicts] = await mnistModel.getLayerModel(500)

      //console.log('embedding predicts', predicts)
      this.setState({
        lossValues: lossValues,
        accValues: accValues,
        embeddingLabels: labels,
        embeddingPredicts: predicts
      })
    }

    //let lastLoss = lossValues[lossValues.length - 1].loss.toFixed(2)
    //let lastAcc = accValues[accValues.length - 1].accuracy.toFixed(2)

    console.log('train finish: ')
    //console.log('loss: ', lastLoss)
    //console.log('acc: ', lastAcc)
    //const layer = mnistModel.model.getLayer('conv2d_Conv2D1_input')
    const layer = mnistModel.model.getLayer('emb')
    console.log('model layer', layer)
    return [lossValues, accValues]
  }

  async onTrain(e) { 
    let [lossValues, accValues] = await this.trainData()
    this.setState({
      width: 500,
      height: 500
    })
  }


  async onTest(e) { 
    console.log('on test')
    let { mnistModel } = this.props.mnistCnn
    let predNum = 20
    let [batch, predictions, labels] = await mnistModel.predict(predNum)
    console.log('pred state', batch, predictions, labels)
    this.setState({
      batch: batch,
      predictions: predictions,
      labels: labels
    })
  }


  drawImage(image, canvas) {
    if (canvas === null) {
     return
   }

    const [width, height] = [IMAGE_WIDTH, IMAGE_HEIGHT]
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    const imageData = new ImageData(width, height)
    const data = image.dataSync()
    for (let i = 0; i < height * width; ++i) {
      const j = i * 4;
      imageData.data[j + 0] = data[i] * 255;
      imageData.data[j + 1] = data[i] * 255;
      imageData.data[j + 2] = data[i] * 255;
      imageData.data[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0)
  }


  renderEmbedding() {
    const labels = this.state.embeddingLabels
    const data = this.state.embeddingPredicts

    const context = this.state.context

    const x = d3.scaleLinear().range([0, this.state.width]).domain([-1.2, 1.1])
    const y = d3.scaleLinear().range([0, this.state.height]).domain([-1.2, 1.1])

    //console.log('emb data', data)
    //console.log('emb label',  labels)
    context.clearRect(0, 0, this.state.width, this.state.height)

    context.font = '16px sans'
    context.fillStyle = '#000000'
    context.fillText('Emedding', x(0), y(-1.1))
    labels.forEach((d, i) => {
      let dataX =  data[i*2]
      let dataY = data[i*2+1]
      //console.log('index', i)
      //console.log('x indei', dataX)
      //console.log('y index ', dataY)
      context.font = '10px sans'
      context.fillStyle = this.colors(parseInt(labels[i], 10))
      context.fillText(labels[i], x(dataX), y(dataY))
    })
  }
 

  extGoogleChartData() {
    if (this.state.lossValues.length === 0) {
      return []
    }
    let lossValues = this.state.lossValues
    let accValues = this.state.accValues
    let lastLoss = lossValues[lossValues.length - 1].loss.toFixed(2)
    let lastAcc = accValues[accValues.length - 1].accuracy.toFixed(2)

    let lossData = lossValues.map((lossValue, index) => {
      return [index, lossValue.loss]
    })
    

    let accData = accValues.map((accValue, index) => {
        return [index, accValue.accuracy]
      })

    return [lossData, accData, lastLoss, lastAcc]

  }

  renderLineCharts(chartDatas) {
    return (
      chartDatas.map(data => {
        return (
          <div className={styles['train-charts']}>
            epoch {data.rows.length}: {data.lastData}
            <LineChart
              rows={data.rows}
              hAxis={data.hAxis}
              vAxis={data.vAxis}
              legend={data.legend}
              columns={data.columns}
              title={data.title}
              className={styles['line-chart']}
            />
          </div>
        )
      })
    )
  }

  renderTrainResults() {
    console.log('render train result.')
    if (this.state.lossValues.length === 0) {
      return
    }
    let { mnistModel } = this.props.mnistCnn

    let [lossData, accData, lastLoss, lastAcc] = this.extGoogleChartData()
    //console.log('render train data.', lastAcc, lastLoss)
    let lossChartData = [
      {
        lastData: lastLoss,
        rows: lossData,
        hAxis: {
          title: 'epoch',
          minValue: 0,
          maxValue: mnistModel.trainBatch
        },
        vAxis: {
          title: 'loss',
          minValue: 0,
          maxValue: 0.1 
        },
        //legend: 'left',
        columns: [
          {
            type: 'number',
            label: 'Epoch'
          },
          {
            type: 'number',
            label: 'Loss'
          }
        ],
        title: 'Epoch vs. Loss'
      }
    ]

    let accChartData = [
      {
        lastData: lastAcc,
        rows: accData,
        hAxis: {
          title: 'epoch',
          minValue: 0,
          maxValue: mnistModel.trainBatch
        },
        vAxis: {
          title: 'acc',
          minValue: 0,
          maxValue: 1.0
        },
        //legend: 'left',
        columns: [
          {
            type: 'number',
            label: 'Epoch'
          },
          {
            type: 'number',
            label: 'Accuracy'
          }
        ],
        title: 'Epoch vs. Accuracy'
      }
    ]

    return (
      <div className={styles['train-results']}>
        {this.renderLineCharts(accChartData)}
        {this.renderLineCharts(lossChartData)}
        {this.renderEmbedding()}
      </div>
    )
  }


  renderTestResults(batch, predictions, labels) {
    if (batch === null) {
      return
    }
    console.log('pred state', batch, predictions, labels)

    let totalCorrect = 0

    const resultCanvases = labels.map((value, index) => {
      const image = batch.xs.slice([index, 0], [1, batch.xs.shape[1]])

      const pred = predictions[index]
      const label = labels[index]

      //let correct = 'pred-incorrect'
      let correct = styles['pred-incorrect']
      if (pred === label) {
        correct = styles['pred-correct']
        totalCorrect += 1
      } 

      return (
        <div key={index} className={styles['predict-image']}>
          <div className={correct}>
            predicton: {pred}
          </div>
          <canvas className={styles['pred-canvas']} ref={(e) => {this.drawImage(image.flatten(), e)}} />
        </div>
      )
    })

    return (
      <div class={styles.predicts}>
        <h4>
            predictions(correct: {totalCorrect} / {predictions.length})
        </h4>
        <div className={styles.results}>
          {resultCanvases}
        </div>
      </div>
    )
  }


  render() {
    let {batch, predictions, labels} = this.state


    //if (this.state.context === null) {
    //  this.renderEmbedding()
    //}

    let lvs = this.state.lossValues.length
    let embStyle = lvs === 0 ? `${styles.embedding} ${styles.displaynone}` : `${styles.embedding}`
    return (
      <div className={styles.mnistcnn}>
        <h3>train</h3>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.onTrain.bind(this)}
          >train</Button>
          {this.renderTrainResults()}

          <div id="emb-vis" className={embStyle}>
          </div>
        </div>

        <h3>test</h3>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.onTest.bind(this)}
          >test</Button>
          {this.renderTestResults(batch, predictions, labels)}
        </div>

        <canvas
          ref="canvas"
          className={styles.mnistdata}
        ></canvas>
      </div>

    )
  }
}