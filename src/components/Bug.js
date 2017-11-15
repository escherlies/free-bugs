import React, { Component } from 'react';

class Bug extends Component {

  state = {
    initalPosition: {
      x: 0,
      y: 0
    },
    translate: {
      x: 0,
      y: 0,
    },
    rotate: 0,
  }

  componentWillMount() {
    this.setState({
      initalPosition: {
        x: Math.floor(Math.random() * this.props.parent.width),
        y: Math.floor(Math.random() * this.props.parent.height)
      }
    })
  }

  componentDidMount() {
    const animate = (t) => {

      
      // TODO: crawling logic
      this.setState({
        translate: {
          x: Math.sin(t / 1000) * 100,
          y: Math.cos(t / 1000) * 100
        },
      })

      if (t < 10000) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  render() {

    let sf = this.props.scalingFactor
    let tx = this.state.translate.x
    let ty = this.state.translate.y
    let ro = this.state.rotate

    const transform = `translate(${tx}px, ${ty}px) rotate(${ro}deg) scale(${sf},${sf})`

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
