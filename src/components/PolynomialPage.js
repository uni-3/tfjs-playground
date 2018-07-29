import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

import {generateData} from './Polynomial/data'

import PolynomialChart from './Polynomial/PolynomialChart'


class PolynomialPage extends Component {
  constructor(props) {
    super(props)
    this.initState = {
      epochs: 500,
      learningRate: 0.5,
      trueCoeff: {},
      randCoeff: {},
      learnedCoeff: {},
      dataArray: [],
      lossArray: []
    }
    this.state = this.initState
  }

  componentDidMount () {
    const epochs = this.state.epochs
    // init plot data
    const trueCoefficients = {
      a: -.9, b: -.2, c: .9, d: .5
    }
    const trainingData = generateData(epochs, trueCoefficients)

    const x = trainingData.xs.dataSync()
    const y = trainingData.ys.dataSync()

    let dataArray = [['x', 'y_data']]
    for (let i in x) {
      dataArray.push([x[i], y[i]])
    }

    this.setState({
      trueCoeff: trueCoefficients, 
      dataArray: dataArray
    })
  }

  predictOutput = (event) => {
    event.preventDefault()

    const epochs = this.state.epochs
    const learningRate = this.state.learningRate
    const trueCoefficients = {
      a: -.8, b: -.2, c: .9, d: .5
    }
    const trainingData = generateData(epochs, trueCoefficients)


    // Step 1. Set up variables, these are the things we want the model
    // to learn in order to do prediction accurately. We will initialize
    // them with random values.
    const a = tf.variable(tf.scalar(Math.random()));
    const b = tf.variable(tf.scalar(Math.random()));
    const c = tf.variable(tf.scalar(Math.random()));
    const d = tf.variable(tf.scalar(Math.random()));

    // generate random value
    const xs = trainingData.xs
    const ys = trainingData.ys

    // plot data
    const x = trainingData.xs.dataSync()
    const y_true = trainingData.ys.dataSync()

    const f = (x) => {
      return tf.tidy(() => {
        return a.mul(x.pow(tf.scalar(3, 'int32')))
          .add(b.mul(x.square()))
          .add(c.mul(x))
          .add(d)
      })
    }

    const randCoeff = {
      a: a.dataSync(),
      b: b.dataSync(),
      c: c.dataSync(),
      d: d.dataSync()
    }
    this.setState({
      randCoeff: randCoeff
    })

    const predictionsRand = f(trainingData.xs)
    const y_rand = predictionsRand.dataSync()
    const loss = (output, y) => output.sub(y).square().mean()

    const optimizer = tf.train.sgd(learningRate)
    for (let i = 0; i < epochs; i++) {
      optimizer.minimize(() => {
        let currentLoss = loss(f(xs), ys)
        if (i % 10 === 0) {
          // set coordinate point(x, y)
          currentLoss.data().then(data => {
            const lossEntry = [i, Number(data)]
            const learnedCoeff = {
              a: a.dataSync(),
              b: b.dataSync(),
              c: c.dataSync(),
              d: d.dataSync()
            }
            this.setState({ 
              lossArray: [...this.state.lossArray, lossEntry],
              learnedCoeff: learnedCoeff 
            })
          })
        }
        return currentLoss
      })

      let predictions = f(trainingData.xs)
      let y_pred = predictions.dataSync()
      let dataArray = [['x', 'y_true', 'y_rand', 'y_pred']]
      for (let i in x) {
        dataArray.push([x[i], y_true[i], y_rand[i], y_pred[i]])
      }

      this.setState({
        dataArray: dataArray
      })

    }

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
    //event.preventDefault()
    console.log('reset')
    this.setState(this.initState)
  }

  renderCoeff(title, coeff) {
    if (Object.keys(coeff).length === 0) {
      return
    }
    return (
      <p>{title}
        <span>
          a: {coeff.a}
        </span>
        <span>
          b: {coeff.b}
        </span>
        <span>
          c: {coeff.c}
        </span>
        <span>
          d: {coeff.d}
        </span>
      </p>
    )
  }

  render() {
    let dataArray = this.state.dataArray.length ? this.state.dataArray : [[0,0]]
    let trueCoeff = this.state.trueCoeff
    let randCoeff = this.state.randCoeff
    let learnedCoeff = this.state.learnedCoeff
    return (
      <div className="Poly">
        <div>
          { this.renderCoeff('true coefficients: ', trueCoeff) }
          { this.renderCoeff('generate randomly coefficients: ', randCoeff) }
          { this.renderCoeff('learned coefficients: ', learnedCoeff) }
        </div>
        <div className="polynomial-buttons">
          <button id="trainButton" onClick={this.predictOutput}>Train</button>
        </div>
        <PolynomialChart dataArray={dataArray} />
      </div>
    );
    //<button id="resetButton" onClick={this.resetModel}>Reset</button>
  }
}


export default PolynomialPage;