import React, { Component } from 'react'
import './App.css'
import Bug from './components/Bug'
import Nav from './components/Nav'
import Ground from './components/Ground'
import bugs from './bugs.json'
import _ from 'lodash'

class App extends Component {
  state = {
    dim: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    selected: {},
    scalingFactor: 0.3
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({
      dim: { width: window.innerWidth, height: window.innerHeight }
    })
  }

  select = ids => {
    const selected = { ...this.state.selected }
    _.map(ids, id => {
      selected[id] ? delete selected[id] : (selected[id] = true)
    })
    this.setState({
      selected
    })
  }

  setScalingFactor = scalingFactor => {
    
    let currentScalingFactor = this.state.scalingFactor
    console.log(scalingFactor, currentScalingFactor)
    if (scalingFactor === 'inc' && currentScalingFactor < 1.0) currentScalingFactor += 0.1
    if (scalingFactor === 'dec' && currentScalingFactor > 0.3) currentScalingFactor -= 0.1
    currentScalingFactor = Number(currentScalingFactor.toFixed(1))
    this.setState({ scalingFactor: currentScalingFactor })
    }

  render() {
    const selectedBugs = _.pick(bugs, _.keys(this.state.selected, e => e))

    return (
      <div className="App">
        {this.state.dim.width !== 0 ? (
          <Ground
            dim={this.state.dim}
            bugs={selectedBugs}
            scalingFactor={this.state.scalingFactor}
          />
        ) : (
          'Loading'
        )}
        <Nav
          bugs={bugs}
          select={this.select}
          selected={this.state.selected}
          setScalingFactor={this.setScalingFactor}
        />
      </div>
    )
  }
}

export default App
