import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Bug from './components/Bug'
import Nav from './components/Nav'
import Ground from './components/Ground'
import bugs from './bugs.json'

class App extends Component {
  state = {
    dim: {
      width: 0,
      height: 0
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

  select = id => {
    const selected = { ...this.state.selected }
    selected[id] ? (selected[id] = false) : (selected[id] = true)
    this.setState({
      selected
    })
    console.log(this.state.selected)
  }

  render() {
    console.log(this.state.dim)
    console.log(this.state.selected)

    return (
      <div className="App">
        <button>Show Dev Tools</button>

        {this.state.dim.width !== 0 ? (
          <Ground dim={this.state.dim} selected={this.state.selected} />
        ) : (
          'Loading'
        )}
        <Nav bugs={bugs} select={this.select} selected={this.state.selected} />
      </div>
    )
  }
}

export default App
