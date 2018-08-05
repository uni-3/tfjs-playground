import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import { TextField, Button } from "@material-ui/core";

import {generateData} from './Polynomial/data'

import ScatterChart from './ScatterChart/ScatterChart'
import LossChart from './LossChart/LossChart'

import './PolynomialPage.css';

class PolynomialPage extends Component {
  constructor(props) {
    super(props)
    this.initState = {
      epochs: 500,
      learningRate: 0.5,
      trueCoeff: {
        a: -.8, b: -.2, c: .9, d: .5
      },
      randCoeff: {},
      learnedCoeff: {},
      dataArray: [],
      lossArray: []
    }
    this.state = this.initState
  }

  componentDidMount () {
    const epochs = this.state.epochs
    const coeff = this.state.trueCoeff

    const trainingData = generateData(epochs, coeff)

    const x = trainingData.xs.dataSync()
    const y = trainingData.ys.dataSync()
    const data = [x, y]

    this.plotData(data, ['x', 'y_data'])
  }

  plotData(data, header=['x', 'y_data']) {
    // [[1,2,3], [4,5,6]]
    // [[1,4],[2,5],[3,6]]
    let dataArray = [header]
    for (let column in data[0]) {
      let value = []
      for (let row in data) {
        value.push(data[row][column])
      }
      dataArray.push(value)
    }

    this.setState({
      dataArray: dataArray
    })
  }

  predictOutput = (event) => {
    event.preventDefault()

    const epochs = this.state.epochs
    const trueCoeff = this.state.trueCoeff
    const learningRate = this.state.learningRate
    const trainingData = generateData(epochs, trueCoeff)


    // Step 1. Set up variables, these are the things we want the model
    // to learn in order to do prediction accurately. We will initialize
    // them with random values.
    const a = tf.variable(tf.scalar(Math.random()))
    const b = tf.variable(tf.scalar(Math.random()))
    const c = tf.variable(tf.scalar(Math.random()))
    const d = tf.variable(tf.scalar(Math.random()))

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
      let header = ['x', 'y_true', 'y_rand', 'y_pred']

      let data = [x, y_true, y_rand, y_pred]
      this.plotData(data, header)

    }

  }

  formChangedHandler = (event) => {
    event.preventDefault()
    const trueCoeff = this.state.trueCoeff

    Object.keys(trueCoeff).map((key, index) => {
      if (event.target.name === key) {
        trueCoeff[key] = Number(event.target.value)
        this.setState({ trueCoeff: trueCoeff })
      } 
    })
    if (event.target.name === 'epochs') {
      this.setState({ epochs: +event.target.value })
    } 
    if (event.target.name === 'learningRate') {
      this.setState({ learningRate: +event.target.value })
    }
  }

  resetModel = (event) => {
    //event.preventDefault()
    console.log('reset')
    this.setState(this.initState)
  }

  renderInput(title, obj, props={}, readOnly=false) {
    const keys = Object.keys(obj)
    if (keys.length === 0) {
      return
    }

    const contents = keys.map((key, index) => {
      const value = Number(obj[key]).toFixed(2)
      return (
        <TextField
          key={index}
          name={key}
          type="number"
          label={key}
          value={value}
          margin="normal"
          inputProps={props}
          InputProps={ {readOnly: readOnly} }
          className="input-textfield"
        />
      )
    })
    return (
      <div>
        <span className="input-title">{title}</span>
        {contents}
      </div>
    )
  }

  render() {
    let dataArray = this.state.dataArray.length ? this.state.dataArray : [[0,0]]
    let lossArray = this.state.lossArray.length ? this.state.lossArray : [[0,0]]
    let trueCoeff = this.state.trueCoeff
    let randCoeff = this.state.randCoeff
    let learnedCoeff = this.state.learnedCoeff

    let epochsProps = {
      step: 1,
      max: 1000,
      min: 0
    }
    let learningRateProps = {
      step: 0.01,
      max: 1,
      min: 0 
    }
    let coeffProps = {
      step: 0.01,
      max: 5,
      min: -5
    }
    return (
      <div className="Poly">
        <h2>Predict polynomial equation</h2>
        <BlockMath>
          f(x) = ax^3 + bx^2 + cx + d
        </BlockMath>
        <h3>Configure</h3>
        <div className="Polynomial-input" onChange={this.formChangedHandler}>
          { this.renderInput('epochs', { epochs: this.state.epochs }, epochsProps) }
          { this.renderInput('learning rate', { learningRate: this.state.learningRate }, learningRateProps) }
          <h3>Coefficients</h3>
          { this.renderInput('train coefficients: ', trueCoeff, coeffProps) }
          { this.renderInput('generate randomly coefficients: ', randCoeff, coeffProps, true) }
          { this.renderInput('learned coefficients: ', learnedCoeff, coeffProps, true) }
        </div>
        <div className="polynomial-buttons">
          <Button id="trainButton" variant="contained" color="primary" onClick={this.predictOutput}> 
            Train
          </Button>
        </div>
        <ScatterChart dataArray={dataArray} />
        <LossChart lossArray={lossArray} epochs={this.state.epochs} />
      </div>
    );
    //<button id="resetButton" onClick={this.resetModel}>Reset</button>
  }
}


export default PolynomialPage;