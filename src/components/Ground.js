import React, { Component } from 'react';
import Bug from './Bug'

class Ground extends Component {

  state = {
    scalingFactor: 0.1
  }


  render() {
  
    return (
      <div className="">
         <Bug 
          fileName={"01_A_Brentidae_Brentinae_Cephalobarus_macrocephalus.png"}
          info={{ name: "macrocephalus"}}
          scalingFactor={this.state.scalingFactor}
         />
      </div>
    );
  }
}

export default Ground;
