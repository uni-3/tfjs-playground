import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core'

import { MnistData, IMAGE_HEIGHT, IMAGE_WIDTH, IMAGE_SIZE, CLASSES, TEST_ELEMENTS } from '../MnistTsne/data'
import { MnistModel } from './model'

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
      accValues: [] 

    }
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    let mnistModel = new MnistModel(canvas)

    mnistModel.initModel()

    console.log('mnist model', mnistModel)
    this.setState({
      mnistModel: mnistModel
    })
  }

  async onTrain(e) { 
    let [lossValues, accValues] =  await this.state.mnistModel.train()

    this.setState({
      lossValues: lossValues,
      accValues: accValues
    })
  }

 async onTest(e) { 
   console.log('on test')
   let predNum = 20
   let [batch, predictions, labels] = await this.state.mnistModel.predict(predNum)
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
    return (
      <div>
        <h3>train</h3>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={this.onTrain.bind(this)}
          >train</Button>
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
          className="mnistdata"
        ></canvas>
      </div>

    )
  }
}