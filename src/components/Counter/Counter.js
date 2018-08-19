import React, { Component } from 'react'
import { Button, TextField } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
//remove

import NetworkD3 from '../NetworkD3/NetworkD3'

export default class Counter extends Component {

  render() {
    const { increment, decrement, counter } = this.props
    console.log('compo counter', this.props)
    return(
      <div>
        <h2>Counter</h2>
        <Button onClick={increment} variant="fab" color="primary" mini>
          <AddIcon />
        </Button>
        <Button button onClick={decrement} variant="fab" color="secondary" mini>
          <RemoveIcon />
        </Button>
        <div>
          <TextField
            label="Count" 
            value={counter.count}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
        <NetworkD3 />
      </div>
    )
  }
}