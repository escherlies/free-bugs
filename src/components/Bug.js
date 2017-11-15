import React, { Component } from 'react';

class Bug extends Component {

  state = {
    offset: {
      x: 0,
      y: 0
    },
    translate: {
      x: 300,
      y: 300,
    },
    rotate: 0,
    rotateNext: 0.5,
    timestamp: 0,
  }

  componentWillMount() {
    // this.setState({
    //   translate: {
    //     x: Math.floor(Math.random() * this.props.parent.width),
    //     y: Math.floor(Math.random() * this.props.parent.height)
    //   }
    // })
  }

  componentDidMount() {
    this.setOffset()
  }

  componentWillReceiveProps(nextProps) {

    const deltaW = this.props.parent.width - nextProps.parent.width
    const deltaH = this.props.parent.height - nextProps.parent.height

    const translate = { ... this.state.translate }

    this.setState({
      translate: {
        x: translate.x - deltaW,
        y: translate.y - deltaH,
      }
    })
  }

  frame = 0

  setOffset = () => {

    const bug = this.bug
    setTimeout(() => {
      console.log(bug.clientWidth, bug.clientHeight)
      this.setState({
        offset: {
          x: bug.clientWidth / 2,
          y: bug.clientHeight / 2
        }
      })
      this.frame = requestAnimationFrame(this.animate)
    }, 2000)
  }



  animate = (t) => {

    const boundary = 100

    const offset = { ...this.state.offset }

    // velocity [pixel per second]
    const v = 100 / 1000 * (t - this.state.timestamp)

    /**
     * Calc vectors and update position
     */
    const angle = this.state.rotate / 180 * Math.PI
    const vy = v * Math.sin(angle)
    const vx = v * Math.cos(angle)

    let translate = { ... this.state.translate }
    translate.x += vx
    translate.y += vy
    const actualPosition = {
      x: translate.x + offset.x,
      y: translate.y + offset.y
    }

    // handle direktino 
    const rotationInterval = 30
    const rotationMax = 30

    let rotate = this.state.rotate
    let rotateNext = this.state.rotateNext

    rotate += rotateNext

    if (this.frame % rotationInterval === 0) rotateNext = (Math.random() * 2 - 1) * rotationMax / rotationInterval

    // keep bugs in frame
    if (actualPosition.x > this.props.parent.width + boundary && vx > 0) translate.x -= (this.props.parent.width + 2 * boundary)
    else if (actualPosition.x < -boundary && vx < 0) translate.x += (this.props.parent.width + 2 * boundary)
    if (actualPosition.y > this.props.parent.height + boundary && vy > 0) translate.y -= (this.props.parent.height + 2 * boundary)
    else if (actualPosition.y < -boundary && vy < 0) translate.y += (this.props.parent.height + 2 * boundary)

    // update state
    this.setState({
      translate,
      timestamp: t,
      rotate,
      rotateNext
    })

    this.frame = requestAnimationFrame(this.animate)
  }

  render() {

    let sf = this.props.scalingFactor
    let tx = this.state.translate.x
    let ty = this.state.translate.y
    let ro = this.state.rotate
    let offset = this.state.offset

    const transform = `translate(${tx}px, ${ty}px) rotate(${ro + 90}deg) scale(${sf})`

    return (
      <div key={this.props.index}>
        <div ref={elem => this.bug = elem} className="bug" style={{ transform }}>
          <img
            src={process.env.PUBLIC_URL + '/bugs/' + this.props.fileName}
            alt={this.props.info.name}
          />
        </div>
        {
          false &&
        <div style={{
          position: "absolute",
          left: "0",
          right: "0",
          width: tx + offset.x,
          height: ty + offset.y,
          border: '1px solid #000'
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            transform: `translate(${tx + this.state.offset.x}px, ${ty + this.state.offset.y - 30}px)`
          }}>
            {Math.floor(tx + this.state.offset.x)}
          </div>
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            transform: `translate(${tx + this.state.offset.x - 50}px, ${ty + this.state.offset.y}px)`
          }}>
            {Math.floor(ty + this.state.offset.y)}
          </div>
        </div>
        }
      </div>
    );
  }
}

export default Bug;
