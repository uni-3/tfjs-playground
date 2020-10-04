import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

import * as mobilenet from '@tensorflow-models/mobilenet'

import { Table, TableBody, TableHead, TableRow, TableCell } from "@material-ui/core"

import CatImg from "../assets/cat1.jpeg"
import AirplainImg from "../assets/airplain.jpeg"

import './ImageNetPage.css';


export default class ImageNetPage extends Component {
  constructor(props) {
    super(props)
    this.model = null
    this.state = {
      modelLoading: true,
      preds: [],
      files: []
    }
  }

  async componentDidMount() {
    const version = 2;
    const alpha = 0.5;

    this.model = await mobilenet.load({
      version, alpha
    })

    this.setState({
      modelLoading: false
    })
  }

  async onClick(e) {
    //console.log('onclick', e.target)
    let img = e.target
    const topk = 5

    const preds = await this.model.classify(img, topk)
    this.setState({
      preds: preds
    })
    /*
    this.model.classify(img, 5).then(preds => {
      //console.log('preds: ')
      //console.log(preds)

      this.setState({
        preds: preds
      })
    })
    */
  }

  onDrop(files) {
    this.setState({
      files: files
    })
    //console.log('file', files[0])
    //console.log('file', files[0].preview)
  }

  renderHeader() {
    return (
      <TableHead>
        <TableRow>
          <TableCell>クラス名</TableCell>
          <TableCell numeric>スコア</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  renderPredsTable(preds) {
    if (Object.keys(preds).length === 0) {
      return
    }
    let predsCell =  preds.map((pred, index) => {
        let name = pred.className
        let prob = Number(pred.probability).toFixed(5)
        return (
          <TableRow key={index}>
            <TableCell>
              {name}
            </TableCell>
            <TableCell>
              {prob}
            </TableCell>
          </TableRow>
        )
      })

      return (
        <div>
          <h3>Predicts</h3>
          <Table className="table">
            {this.renderHeader()}
            <TableBody>
              {predsCell}
            </TableBody>
          </Table>
        </div>
      )
  }

  render() {
    let disable = this.state.modelLoading ? 'disable' : ''
    //let fileUrl = this.state.files === [] ? '' : URL.createObjectURL(this.state.files[0])
    //console.log('this', this.state)
    let fileUrl = this.state.files.length === 0 ? '' : this.state.files[0].preview


    return (
      <div className="imagenet">
        <h2>Predict class name from image</h2>
        <h3>Click Image</h3>
        <h4>Examples</h4>
        <div className="sample-images">
          <img src={CatImg} className={`Cat1 ${disable}`} alt="cat" onClick={this.onClick.bind(this)} />
          <img src={AirplainImg} className={`Airplain ${disable}`} alt="airplain" onClick={this.onClick.bind(this)} />
        </div>
        <h4>Upload Image</h4>
        <div className="upload-images">
          <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
            <p>Dropping some file here, or click to select file to upload.</p>
          </Dropzone>
          <img alt="" src={fileUrl} className="uploadimg" onClick={this.onClick.bind(this)}/>
        </div>
        { this.renderPredsTable(this.state.preds) }
      </div>
    )
  }
}
