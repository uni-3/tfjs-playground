import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

import './TableWithBar.css'


export default class TableWithBar extends Component {
  constructor(props) {
    super(props)
    this.chartEvents = [
      {
        eventName: 'select',
        callback(Chart) {
          console.log('Selected ', Chart)
        },
      },
    ]

    this.state = {
      formatters: [
        {
          type: 'BarFormat',
          column: 1,
          options: {
            width: 120
          }
        }
      ],
      options: {
         allowHtml: true,
         //showRowNumber: true,
      }
    }
  }



  render() {
    return (
      <Chart
        chartType="Table"
        data={this.props.data}
        options={this.state.options}
        formatters={this.state.formatters}
        chartEvents={this.chartEvents}
        rootProps={{ 'data-id': '2'}}
        className="table-with-bar-chart"
      />
    )
  }

}
