import React, { Component } from 'react'
import _ from 'lodash'
import Bug from './Bug'

class Ground extends Component {
  state = {
    frame: 0,
    mousePosition: {
      x: 0,
      y: 0
    }
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

  handleMouseMove = (e, eventDesc) => {
    e.preventDefault()
    
    if (eventDesc === "touchStart") e = e.touches[0]
    if (eventDesc === "touchMove") e = e.changedTouches[0]
    
    let mousePosition = {
      x: e.clientX,
      y: e.clientY
    }
    this.setState({ mousePosition })    
    console.log()
    
  }

  render() {
    return (
      <div
        className="ground"
        ref={e => (this.ground = e)}
        onMouseDown={e => this.handleMouseMove(e, "mouse")}
        onMouseMove={e => this.handleMouseMove(e, "mouse")}
        onTouchStart={e => this.handleMouseMove(e, "touchStart")}
        onTouchMove={e => this.handleMouseMove(e, "touchMove")}
      >
        {true && _.map(this.props.bugs, (e, i) => (
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
