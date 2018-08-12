import React, { Component } from 'react'
import * as tf from '@tensorflow/tfjs'

import ScatterChart from './ScatterChart/ScatterChart'
import CartPole from './CartPole/CartPole'

import {SaveablePolicyNetwork} from './CartPole/network'
import {mean, sum} from './CartPole/utils'

import CartPoleData from './CartPole/data'

export default class CartPolePage extends Component {
  constructor(props) {
    super(props)
    const initInputValues = {
      storedModelStatus: 'N/A',
      hiddenLayersSizes: 4,
      numIterations: 20,
      gamesPerIteration: 20,
      maxStepsPerGame: 500,
      discountRate: 0.95,
      learningRate: 0.05,
      renderDuringTraining: false 
    }
    const initButtons = {
      deleteStoredModel: {
        disabled: true
      },
      createModel: {
        disabled: true
      },
      train: {
        disabled: true,
        text: 'Train'
      },
      test: {
        disabled: true,
        text: 'Test'
      }
    }
    const initProgress= {
      iteration: {
        text: '',
        value: 0
      },
      train: {
        text: '',
        value: 0
      },
    }
    this.initState = {
      canvasHeight: '300px',
      canvasWidth: '300px',
      dataArray: [],
      appStatus: 'Standing by.',
      inputValues: initInputValues,
      buttons: initButtons,
      progress: initProgress
    }
    this.state = this.initState
    this.policyNet = null
    this.cartPole = null
  }

  componentDidMount() {
    this.setUpUI()
  }

  async setUpUI() {
    this.cartPole = new CartPoleData(true)

    // if exist, load model
    if (await SaveablePolicyNetwork.checkStoredModelStatus() != null) {
      this.policyNet = await SaveablePolicyNetwork.loadModel()
      this.updateAppStatus('Loaded policy network from IndexedDB.')
      this.state.inputValues.hiddenLayersSizes = this.policyNet.hiddenLayerSizes()
    }
    await this.updateUIControlState()

  }

  async updateUIControlState() {
    const modelInfo = await SaveablePolicyNetwork.checkStoredModelStatus()
    const inputs = this.state.inputValues
    const buttons = this.state.buttons
    inputs.storedModelStatus = 'No stored model.'
    buttons.deleteStoredModel.disabled = true
    console.log('modelinfo', modelInfo)
    if (modelInfo == null) {
      this.setState({
        inputValues: inputs,
        buttons: buttons
      })
      //storedModelStatusInput.value = 'No stored model.'
      //deleteStoredModelButton.disabled = true
    } else {
      console.log('modelinfo', modelInfo)
      inputs.storedModelStatus = `Saved@${modelInfo.dateSaved.toISOString()}`
      buttons.deleteStoredModel.disabled = false
      buttons.createModel.disabled = true
      this.setState({
        inputValues: inputs,
        buttons: buttons
      })
      //storedModelStatusInput.value =
      //  `Saved@${modelInfo.dateSaved.toISOString()}`
      //deleteStoredModelButton.disabled = false
      //createModelButton.disabled = true
    }
    buttons.createModel.disabled = this.policyNet !== null
    buttons.train.disabled = this.policyNet === null
    buttons.test.disabled = this.policyNet === null
    this.setState({
      inputValues: inputs,
      buttons: buttons
    })
    //createModelButton.disabled = policyNet != null;
    //trainButton.disabled = policyNet == null;
    //testButton.disabled = policyNet == null;
    // not use
    //hiddenLayerSizesInput.disabled = policyNet != null;
    //renderDuringTrainingCheckbox.checked = this.state.renderDuringTraining;
  }

  disableModelControls() {
    const buttons = this.state.buttons
    buttons.deleteStoredModel.disabled = true
    buttons.train.text = 'Stop'
    buttons.test.disabled = true
    this.setState({
      buttons: buttons
    })
    //trainButton.textContent = 'Stop';
    //testButton.disabled = true;
    //deleteStoredModelButton.disabled = true;
  }

  enableModelControls() {
    const buttons = this.state.buttons
    buttons.deleteStoredModel.disabled = false
    buttons.train.text = 'Train'
    buttons.test.disabled = false
    this.setState({
      buttons: buttons
    })
    //trainButton.textContent = 'Train';
    //testButton.disabled = false;
    //deleteStoredModelButton.disabled = false;
  }

  /**
   * Display a message to the info div.
   *
   * @param {string} message The message to be displayed.
   */
  updateAppStatus(text) {
    this.setState({
      appStatus: text
    })
  }

  /**
   * A function invokved at the end of a training iteration.
   *
   * @param {number} iterationCount A count of how many iterations has completed
   *   so far in the current round of training.
   * @param {*} totalIterations Total number of iterations to complete in the
   *   current round of training.
   */
  onIterationEnd(iterationCount, totalIterations) {
    const progress = this.state.progress
    progress.train.text = `Iteration ${iterationCount} of ${totalIterations}`
    progress.train.value = iterationCount / totalIterations * 100
    this.setState({
      progress: progress
    })
    //trainStatus.textContent = `Iteration ${iterationCount} of ${totalIterations}`
    //trainProgress.value = iterationCount / totalIterations * 100
  }

  plotSteps(array) {
    this.setState({
      dataArray: array
    })
  }

  // Objects and functions to support display of cart pole status during training.
  // want to render during train...
  async maybeRenderDuringTraining(cartPole) {
    let renderDuringTraining = false
    if (renderDuringTraining) {
      this.renderCartPole(cartPole)
      // Unblock UI thread.
      await tf.nextFrame()
    }
  }

/**
 * A function invoked at the end of every game during training.
 *
 * @param {number} gameCount A count of how many games has completed so far in
 *   the current iteration of training.
 * @param {number} totalGames Total number of games to complete in the current
 *   iteration of training.
 */
onGameEnd(gameCount, totalGames) {
  const progress = this.state.progress

  progress.iteration.text = (gameCount === totalGames) ?
                            'Updating weights...'
                            : `Game ${gameCount} of ${totalGames}`
  progress.iteration.value = gameCount / totalGames * 100
  this.setState({
    progress: progress
  })
  //iterationStatus.textContent = `Game ${gameCount} of ${totalGames}`;
  //iterationProgress.value = gameCount / totalGames * 100;
  //if (gameCount === totalGames) {
  //  iterationStatus.textContent = 'Updating weights...';
  //}
}

  // change inputs
  changeInputs = (e) => {
    console.log('change inputs', e.target.name, e.target.value, e.target.checked)
    console.log('change inputs', e.target)
    const inputs = this.state.inputValues
    const key = e.target.name
    inputs[key] = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    this.setState({ inputValues: inputs})
    /*
    if (key === 'hiddenLayers') {
      this.setState({ inputValues: inputs})
    } 
    if (e.target.name === 'secondInput') {
      this.setState({ secondInput: +event.target.value })
    } 
    if (e.target.name === 'epochs') {
      this.setState({ epochs: +event.target.value })
    } 
    if (e.target.name === 'learningRate') {
      this.setState({ learningRate: +event.target.value })
    }
    */
  }


  clickCreateModel = async (e) => {
    e.preventDefault()
    try {
      const inputs = this.state.inputValues
      const hiddenLayerSizes =
        inputs.hiddenLayersSizes.toString().split(',').map(v => {
          const num = v.trim()
          if (!(num > 0)) {
            throw new Error(
              `Invalid hidden layer sizes string: ` +
              `${inputs.hiddenLayerSizesInput}`);
          }
          return num
        })
      this.policyNet = new SaveablePolicyNetwork(hiddenLayerSizes)
      console.log('DONE constructing new instance of SaveablePolicyNetwork')
      await this.updateUIControlState()
    } catch (err) {
      this.updateAppStatus(`ERROR: ${err.message}`)
    }
  }

  clickDeleteStoredModel = async (e) => {
    console.log('click delete')
    e.preventDefault()
    if (window.confirm(`Are you sure you want to delete the locally-stored model?`)) {
      await this.policyNet.removeModel()
      this.policyNet = null
      await this.updateUIControlState()
    }
  }

  clickTrain = async (e) => {
    e.preventDefault()
    const cartPole = new CartPoleData(true)
    let stopRequested = false
    if (this.state.buttons.train.text === 'Stop') {
      stopRequested = true
    } else {
      this.disableModelControls()
      const inputs = this.state.inputValues

      try {
        const trainIterations = inputs.numIterations
        if (!(trainIterations > 0)) {
          throw new Error(`Invalid n umber of iterations: ${trainIterations}`)
        }
        const gamesPerIteration = inputs.gamesPerIteration
        if (!(gamesPerIteration > 0)) {
          throw new Error(
            `Invalid # of games per iterations: ${gamesPerIteration}`)
        }
        const maxStepsPerGame = inputs.maxStepsPerGame
        if (!(maxStepsPerGame > 1)) {
          throw new Error(`Invalid max. steps per game: ${maxStepsPerGame}`);
        }
        const discountRate = Number.parseFloat(inputs.discountRate)
        if (!(discountRate > 0 && discountRate < 1)) {
          throw new Error(`Invalid discount rate: ${discountRate}`)
        }
        const learningRate = Number.parseFloat(inputs.learningRate)

        this.updateAppStatus(
          'Training policy network... Please wait. ' +
          'Network is saved to IndexedDB at the end of each iteration.')
        const optimizer = tf.train.adam(learningRate)

        let meanStepValues = [['iteration', 'meanSteps']]
        this.onIterationEnd(0, trainIterations)
        let t0 = new Date().getTime()
        stopRequested = false

        this.onGameEnd(0, gamesPerIteration)

        for (let i = 0; i < trainIterations; ++i) {
          const [gameSteps, ittr] = await this.policyNet.train(
            cartPole, optimizer,
            discountRate, gamesPerIteration,
            maxStepsPerGame)
          const t1 = new Date().getTime()
          const stepsPerSecond = sum(gameSteps) / ((t1 - t0) / 1e3)
          t0 = t1

          // render
          let progress = this.state.progress
          progress.train.text = `${stepsPerSecond.toFixed(1)} steps/s`
          this.onGameEnd(ittr, gamesPerIteration)
          this.setState({
            progress: progress
          })
          meanStepValues.push([
            i + 1, mean(gameSteps)
          ])
          // plot
          console.log(`# of tensors: ${tf.memory().numTensors}`)
          this.plotSteps(meanStepValues)

          this.onIterationEnd(i + 1, trainIterations)
          // Unblock UI thread.
          await tf.nextFrame()
          console.log('savable', this.policyNet)
          await this.policyNet.saveModel()
          await this.updateUIControlState()

          if (stopRequested) {
            this.updateAppStatus('Training stopped by user.')
            break
          }
        }
        if (!stopRequested) {
          this.updateAppStatus('Training completed.')
        }
      } catch (err) {
        this.updateAppStatus(`ERROR: ${err.message}`)
      }
      this.enableModelControls()
    }
  }


  clickTest = async (e) => {
    e.preventDefault()
    this.disableModelControls()
    let isDone = false
    const cartPole = new CartPoleData(true)
    cartPole.setRandomState()
    let steps = 0
    let stopRequested = false
    while (!isDone) {
      steps++
      tf.tidy(() => {
        const action = this.policyNet.getActions(cartPole.getStateTensor())[0]
        this.updateAppStatus(
          `Test in progress. ` +
          `Action: ${action === 1 ? '←' : ' →'} (Step ${steps})`)
        isDone = cartPole.update(action)

        // render canvas
        this.renderCartPole(cartPole)
      })
      // Unblock UI thread.
      await tf.nextFrame()
      if (stopRequested) {
        break
      }
    }
    if (stopRequested) {
      this.updateAppStatus(`Test stopped by user after ${steps} step(s).`)
    } else {
      this.updateAppStatus(`Test finished. Survived ${steps} step(s).`)
    }
    console.log(`# of tensors: ${tf.memory().numTensors}`)
    this.enableModelControls()

  }

  /* show cartpole during training or click test button  */
  renderCartPole(cartPole) {
    const canvas = this.refs.canvas

    const X_MIN = -cartPole.xThreshold
    const X_MAX = cartPole.xThreshold
    const xRange = X_MAX - X_MIN
    const scale = canvas.width / xRange

    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    const halfW = canvas.width / 2

    // 1. Draw the cart.
    const railY = canvas.height * 0.8;
    const cartW = cartPole.cartWidth * scale;
    const cartH = cartPole.cartHeight * scale;

    const cartX = cartPole.x * scale + halfW;

    context.beginPath();
    context.rect(cartX - cartW / 2, railY - cartH / 2, cartW, cartH)
    context.stroke();

    // 2. Draw the pole.
    const angle = cartPole.theta + Math.PI / 2;
    const poleTopX =
      halfW + scale * (cartPole.x + Math.cos(angle) * cartPole.length);
    const poleTopY = railY -
        scale * (cartPole.cartHeight / 2 + Math.sin(angle) * cartPole.length);
    context.beginPath();
    context.moveTo(cartX, railY - cartH / 2);
    context.lineTo(poleTopX, poleTopY);
    context.stroke();

  }

  renderChart() {
    let dataArray = this.state.dataArray.length ? this.state.dataArray : []
    if (dataArray.length === 0) {
      return
    }

    return (
      <ScatterChart dataArray={dataArray} />
    )
  }

  render() {
    return (
      <div>
        <CartPole
          height={this.state.canvasHeight} 
          width={this.state.canvasWidth}
          inputValues={this.state.inputValues}
          buttons={this.state.buttons}
          progress={this.state.progress}
          changeInputs={this.changeInputs}
          appStatus={this.state.appStatus}
          clickTrain={this.clickTrain.bind(this)}
          clickTest={this.clickTest.bind(this)}
          clickCreateModel={this.clickCreateModel.bind(this)}
          clickDeleteStoredModel={this.clickDeleteStoredModel.bind(this)}
        />
        <div className="canvases" id="steps-canvas"></div>
        <div>
          <canvas id="cart-pole-canvas" 
            height={this.state.canvasHeight} 
            width={this.state.canvasWidth}
            ref="canvas">
          </canvas>
        </div>
        {this.renderChart}
      </div>
    )
  }
}
