import React, { Component } from 'react'
import _ from 'lodash'
import Bug from './Bug'
import { bugs } from '../bugs'

class Ground extends Component {

  state = {
    scalingFactor: 0.1,
    selected: []
  }

  componentDidMount() {
    const N = 1 + Math.floor(Math.random() * 8)
    this.setState({
      selected: _.sampleSize(bugs, 1 )
    })
  }


  render() {
    console.log('N bugs: %s', this.state.selected.length)

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
            />
          )
        }
      </div>
    );
  }
}

export default Ground;
