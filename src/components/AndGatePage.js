import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

import AndGate from './AndGate/AndGate'
import LossChart from './LossChart/LossChart'

import './AndGatePage.css';

class AndGatePage extends Component {
  constructor(props) {
    super(props)
    this.initState = {
      firstInput: 1,
      secondInput: 1,
      epochs: 1000,
      learningRate: 0.05,
      predictedOutput: '',
      lossArray: [],
      weightModel: tf.variable(tf.randomNormal([3, 1], 0, 0.1, 'float32', 12))
    }
    this.state = this.initState
  }

  predictOutput = (event) => {
    event.preventDefault()

    this.setState({ lossArray: [] })

    const epochs = this.state.epochs
    const learningRate = this.state.learningRate


    // and gate
    /*
    x = [1 1 1
         1 0 1
         0 1 1
         0 0 0]
    y = [1
         0
         0
         0]
    */
    // input
    const xs = tf.tensor2d([[1, 1, 1], [1, 0, 1], [0, 1, 1], [0, 0, 1]])
    // desired output
    const ys = tf.tensor2d([[1], [0], [0], [0]])
    // random value
    const w = tf.variable(tf.randomNormal([3, 1], 0, 0.1, 'float32', 12))

    // f(x) = x * w + b (b=0 for now)
    const f = x => tf.relu(tf.matMul(x, w))
    // loss = 平均二乗誤差(output - y)
    const loss = (output, y) => output.sub(y).square().mean()

    const optimizer = tf.train.sgd(learningRate)
    for (let i = 0; i < epochs; i++) {
      optimizer.minimize(() => {
        let currentLoss = loss(f(xs), ys)
        if (i % 10 === 0) {
          // set coordinate point(x, y)
          currentLoss.data().then(data => {
            const lossEntry = [i, Number(data)]
            this.setState({ 
              lossArray: [...this.state.lossArray, lossEntry],
              weightModel: w
             })
          })
        }
        //?
        return currentLoss
      })
    }

  }

  predict = (event) => {
    event.preventDefault()
    const w = this.state.weightModel
    const f = x => tf.relu(tf.matMul(x, w))

    const firstInput = this.state.firstInput
    const secondInput = this.state.secondInput
    // input value
    const userInput = tf.tensor2d([[firstInput, secondInput, 1]])
    const pred = f(userInput).dataSync()
    this.setState({ predictedOutput: Number(pred).toFixed(6)})
  }


  formChangedHandler = (event) => {
    if (event.target.name === 'firstInput') {
      this.setState({ firstInput: +event.target.value})
    } else if (event.target.name === 'secondInput') {
      this.setState({ secondInput: +event.target.value })
    } else if (event.target.name === 'epochs') {
      this.setState({ epochs: +event.target.value })
    } else if (event.target.name === 'learningRate') {
      this.setState({ learningRate: +event.target.value })
    }
  }

  resetModel = (event) => {
    event.preventDefault()
    this.setState(this.initState)
  }

  render() {
    let lossArray = this.state.lossArray.length ? this.state.lossArray : [[0,0]]
    return (
      <div className="AndGate">
        <h2>Train&Predict Andgate</h2>
        <AndGate
          formChangedHandler={this.formChangedHandler}
          predictOutput={this.predictOutput}
          predict={this.predict}
          resetModel={this.resetModel}
          firstInput={this.state.firstInput}
          secondInput={this.state.secondInput}
          epochs={this.state.epochs}
          learningRate={this.state.learningRate}
          predictedOutput={this.state.predictedOutput} />
        <div>
          <LossChart lossArray={lossArray} epochs={this.state.epochs} />
        </div>
      </div>
    );
  }
}


export default AndGatePage;