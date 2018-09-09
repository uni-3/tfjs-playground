import React, { Component } from 'react'
import { Chart } from 'react-google-charts'


export default class LineChart extends Component {
  constructor(props) {
    super(props)
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
          console.log('Selected ', Chart.chart.getSelection())
        },
      },
    ]

    console.log('props line chatr', props)
    let legend = props.legend || 'none'
    this.columns = props.columns || []
    this.options = {
      title: props.title || 'Epoch vs. Loss',
      hAxis: props.hAxis,
      vAxis: props.vAxis,
      legend: legend,
      explorer: {
        actions: ['dragToZoom', 'rightClickToReset'],
        axis: 'vertical',
        keepInBounds: true,
        maxZoomIn: 4.0
      },
      //colors: ['#D44E41'],
      colors: props.colors,
      animation: {
        duration: 1000,
        easing: 'out'
      },
      theme: 'material'
    }
  }

  render() {
    return (
      <Chart
        chartType="LineChart"
        rows={this.props.rows}
        columns={this.columns}
        options={this.options}
        chartEvents={this.chartEvents}
        className={this.props.className}
      />
    );
  }
}