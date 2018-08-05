import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

import './ScatterChart.css'


export default class ScatterChart extends Component {
  constructor(props) {
    super(props);
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
         // console.log('Selected ', Chart.chart.getSelection())
        },
      },
    ]
    this.state = {
      options: {
        title: 'plot data and predicts',
        hAxis: { title: 'x', minValue: -1, maxValue: 1 },
        vAxis: { title: 'y', minValue: 0, maxValue: 1 },
        legend: { position: "bottom" },
        explorer: {
          actions: ['dragToZoom', 'rightClickToReset'],
          axis: 'vertical',
          keepInBounds: true,
          maxZoomIn: 4.0
        },
        //colors: ['#D44E41'],
        animation: {
          duration: 1000,
          easing: 'out'
        },
        theme: 'material'
      },
      columns: [
        {
          type: 'number',
          label: 'x',
        },
        {
          type: 'number',
          label: 'y',
        }
      ],
    }
  }
  render() {
    return (
      <Chart
        chartType="ScatterChart"
        data={this.props.dataArray}
        columns={this.state.columns}
        options={this.state.options}
        graph_id="Chart"
        chartEvents={this.chartEvents}
        className="Poly-chart"
        legendToggle
      />
    )
  }

}
