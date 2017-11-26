import React, { Component } from 'react'
import _ from 'lodash'
import Bug from './Bug'

class Ground extends Component {
  state = {
    frame: 0
  }

  componentDidMount() {
    // const N = 1 + Math.floor(Math.random() * 8)
    // this.setState({
    //   selected: _.sampleSize(bugs, 10 )
    // })

    requestAnimationFrame(this.animate)
  }

  animate = t => {
    this.setState({
      frame: this.state.frame + 1,
      t
    })
    requestAnimationFrame(this.animate)
  }

  handleMouseMove = e => {
    let mousePosition = {
      x: e.clientX,
      y: e.clientY
    }
    this.setState({ mousePosition })    
  }

  render() {
    return (
      <div
        className="ground"
        ref={e => (this.ground = e)}
        onMouseMove={e => this.handleMouseMove(e)}
        onMouseDown={e => this.handleMouseMove(e)}
      >
        {_.map(this.props.bugs, (e, i) => (
          <Bug
            key={i}
            details={e}
            scalingFactor={this.props.scalingFactor}
            parent={{
              width: this.props.dim.width,
              height: this.props.dim.height
            }}
            mousePosition={this.state.mousePosition}
            t={this.state.t}
            frame={this.state.frame}
          />
        ))}
      </div>
    )
  }
}

export default Ground
