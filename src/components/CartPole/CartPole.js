import React, { Component } from 'react'


export default class CartPole extends Component {
  render() {
    const props = this.props
    const inputs = props.inputValues
    const buttons = props.buttons
    const progress = props.progress
    return (
      <div>
        <h1>Reinforcement Learning: Cart Pole </h1>
        <div>
          <div>
            <span id="app-status">{props.appStatus}</span>
          </div>

          <div  onChange={props.changeInputs} >
            <div className="">
              <div className="input">
                <span className="">Locally-stored network</span>
                <input id="stored-model-status" value={inputs.storedModelStatus} disabled="true" readOnly="true"></input>
                <button id="delete-stored-model" disabled={buttons.deleteStoredModel.disabled} onClick={props.clickDeleteStoredModel}>Delete</button>
              </div>

              <div className="">
                <div className="input">
                  <span className="input-label">Hidden layer size(s) (e.g.: "5", "8,6"):</span>
                  <input id="hidden-layer-sizes" name="hiddenLayersSizes" value={inputs.hiddenLayersSizes}></input>
                  <button id="create-model" disabled={buttons.createModel.disabled} onClick={props.clickCreateModel}>Create model</button>
                </div>
              </div>

              <div className="input">
                <span className="input-label">Number of iterations:</span>
                <input id="num-iterations" name="numIterations" value={inputs.numIterations}></input>
              </div>
              <div className="input">
                <span className="input-label">Games per iteration:</span>
                <input id="games-per-iteration" name="gamesPerIteration" value={inputs.gamesPerIteration}></input>
              </div>
              <div className="input">
                <span className="input-label">Max. steps per game:</span>
                <input id="max-steps-per-game" name="maxStepsPerGame" value={inputs.maxStepsPerGame}></input>
              </div>
              <div className="input">
                <span className="input-label">Reward discount rate:</span>
                <input id="discount-rate" name="discountRate" value={inputs.discountRate}></input>
              </div>
              <div className="input">
                <span className="input-label">Learning rate:</span>
                <input id="learning-rate" name="learningRate" value={inputs.learningRate}></input>
              </div>
              <div className="input">
                <span className="input-label">Render during training:</span>
                <input type="checkbox" name="renderDuringTraining" id="render-during-training" checked={inputs.renderDuringTraining}/>
              </div>
              <div className="buttons-section">
                <button id="train" disabled={buttons.train.disabled} onClick={props.clickTrain}>{buttons.train.text}</button>
                <button id="test" disabled={buttons.test.disabled} onClick={props.clickTest}>{buttons.test.text}</button>
              </div>
            </div>

            <div className="horizontal-sections">
              <div>
                <span id="iteration-status" className="status-span">{progress.iteration.text}</span>
                <progress value={progress.iteration.value} max="100" id="iteration-progress"></progress>
              </div>
              <div>
                <span id="train-status" className="status-span"></span>
                <progress value={progress.train.value} max="100" id="train-progress"></progress>
              </div>
              <div>
                <span className="status-span">Training speed:</span>
                <span id="train-speed" className="status-span">{progress.train.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

