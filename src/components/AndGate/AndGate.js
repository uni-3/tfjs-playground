import React from 'react';
import './AndGate.css';

import AndGateImg from "../../assets/AndGate.png"

const andGate = (props) => (
  <div>
    <img src={AndGateImg} className="AndGate-img" alt="andgate" />
    <form className="AndGate-form" onChange={props.formChangedHandler} onSubmit={props.predictOutput}>
      <h2>Input</h2>
      <div className="AndGate-input">
        <div className="First-input">
          <label htmlFor="firstInput">First Input: </label>
          <select name="firstInput" value={props.firstInput}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
        <div className="Second-input">
          <label htmlFor="secondInput">Second Input: </label>
          <select name="secondInput" value={props.secondInput}>
            <option value="0">0</option>
            <option value="1">1</option>
          </select>
        </div>
      </div>
      <div className="AndGate-predict">
        <label htmlFor="predictedOutput">Predicted Output: </label>
        <input type="text" name="predictedOutput" size="10" placeholder="" value={props.predictedOutput} readOnly />
      </div>
      <div className="AndGate-buttons">
        <button id="predictButton" onClick={props.predict}>Predict</button>
      </div>
      <h2>Configure</h2>
      <div className="AndGate-input">
        <div className="AndGate-epochs">
          <label htmlFor="epochs">Epochs: </label>
          <input type="number" name="epochs" placeholder="Epochs" min="0" max="10000" value={props.epochs} />
        </div>
      </div>
      <div className="AndGate-input">
        <div className="AndGate-learningrate">
          <label htmlFor="learningRate">Learning Rate: </label>
          <input type="number" name="learningRate" placeholder="Learning Rate" step="0.01" value={props.learningRate} />
        </div>
      </div>
      <div className="AndGate-buttons">
        <button id="trainButton">Train Model</button>
        <button id="resetButton" onClick={props.resetModel}>Reset Model</button>
      </div>
    </form>
  </div>
);

export default andGate;