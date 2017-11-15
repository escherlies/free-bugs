import React, { Component } from 'react';
import Bug from './Bug'

class Ground extends Component {

  state = {
    scalingFactor: 0.1,
    width: 100,
    height: 100,
  }

  componentDidMount() {
    this.setState({
      width: this.ground.clientWidth,
      height: this.ground.clientHeight
    })
  }

  render() {


    return (
      <div className="ground" ref={e => this.ground = e}>
        <Bug
          fileName={"01_A_Brentidae_Brentinae_Cephalobarus_macrocephalus.png"}
          info={{ name: "macrocephalus" }}
          scalingFactor={this.state.scalingFactor}
          parent={{
            width: this.state.width,
            height: this.state.height
          }}
        />
      </div>
    );
  }
}

export default Ground;
