import React, { Component } from 'react'
import { Button, TextField } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import NetworkD3 from '../NetworkD3/NetworkD3'
import NetworkZeu from '../NetworkZeu/NetworkZeu'

import styles from './Counter.css'

export default class Counter extends Component {

  render() {
    const { increment, decrement, counter } = this.props
    console.log('compo counter', this.props)
    return(
      <div className={styles.counter}>
        <h2>Counter</h2>
        <div className={styles.count}>
          <Button onClick={increment} variant="fab" color="primary" mini>
            <AddIcon />
          </Button>
          <Button button onClick={decrement} variant="fab" color="secondary" mini>
            <RemoveIcon />
          </Button>
          <TextField
            label="Count" 
            value={counter.count}
            InputProps={{
              readOnly: true
            }}
          />
        </div>
        <div className={styles.networkd3}>
          <NetworkD3 />
          <NetworkZeu location={this.props.location} />
        </div>
      </div>
    )
  }
}