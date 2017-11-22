import React, { Component } from 'react'
import logo from './logo.svg'
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
    selected: {}
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

  render() {
    const selectedBugs = _.pick(bugs, _.keys(this.state.selected, e => e))
    

    return (
      <div className="App">
        {this.state.dim.width !== 0 ? (
          <Ground dim={this.state.dim} bugs={selectedBugs} scalingFactor={0.5}/>
        ) : (
          'Loading'
        )}
        <Nav bugs={bugs} select={this.select} selected={this.state.selected} />
      </div>
    )
  }
}

export default App
