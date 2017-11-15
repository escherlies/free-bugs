import React, { Component } from 'react';

class Bug extends Component {

  state = {
    tx: 0,
    ty: 0,
    ro: 0,
  }

  componentDidMount() {
    const animate = (t) => {
      this.setState({ tx: Math.sin(t/1000)*100})
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  render() {

    let sf = this.props.scalingFactor

    const transform = `translate(${this.state.tx}px, ${this.state.ty}px) rotate(${this.state.ro}deg) scale(${sf},${sf})`

    return (
      <div className="bug" style={{ transform }}>
        <img
          src={process.env.PUBLIC_URL + '/bugs/' + this.props.fileName}
          alt={this.props.info.name}
        />
      </div>
    );
  }
}

export default Bug;
