import React from 'react'

import NetworkD3 from '../NetworkD3/NetworkD3'

export default class Counter extends React.Component {
  render() {
    const { increment, decrement, counter } = this.props
    return(
      <div>
        <h2>Counter</h2>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
        <div>
          Count: {counter.count}
        </div>
        <NetworkD3 />
      </div>
    )
  }
}