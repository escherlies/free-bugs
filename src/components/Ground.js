import React, { Component } from 'react';
import Bug from './Bug'

class Ground extends Component {

  state = {
    scalingFactor: 0.1,
  }

  
  render() {
    console.log(this.props)
    
    return (
      <div className="ground" ref={e => this.ground = e}>
        <Bug
          fileName={"01_A_Brentidae_Brentinae_Cephalobarus_macrocephalus.png"}
          info={{ name: "macrocephalus" }}
          scalingFactor={this.state.scalingFactor}
          parent={{
            width: this.props.dim.width,
            height: this.props.dim.height
          }}
        />
      </div>
    );
  }
}

export default Ground;
