import React, { Component } from 'react'
import _ from 'lodash'
import Bug from './Bug'
import { bugs } from '../bugs'

class Ground extends Component {

  state = {
    scalingFactor: 0.08,
    selected: [],
    frame: 0
  }

  componentDidMount() {
    const N = 1 + Math.floor(Math.random() * 8)
    this.setState({
      selected: _.sampleSize(bugs, 42 )
    })

    requestAnimationFrame(this.animate)
  }
  
  animate = (t) => {
    this.setState({
      frame: this.state.frame+1,
      t
    })
    requestAnimationFrame(this.animate)
  }

  render() {  
    return (
      <div className="ground" ref={e => this.ground = e}>
        {
          _.map(this.state.selected, (e, i) =>
            <Bug
              key={i}
              index={i}
              fileName={e}
              info={{ name: e }}
              scalingFactor={this.state.scalingFactor}
              parent={{
                width: this.props.dim.width,
                height: this.props.dim.height
              }}
              t={this.state.t}
              frame={this.state.frame}
            />
          )
        }
      </div>
    );
  }
}

export default Ground;
