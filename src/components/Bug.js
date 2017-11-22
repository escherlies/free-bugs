import React, { Component } from 'react'
import Name from './Name'

class Bug extends Component {
  state = {
    offset: {
      x: 0,
      y: 0
    },
    translate: {
      x: 0,
      y: 0
    },
    velocity: Math.random() * 200 + 50,
    rotate: Math.random() * 360,
    rotateNext: 0.5,
    timestamp: 0,
    boundary: 100,
    showInfo: false,
    isLoading: true
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

    const translate = { ...this.state.translate }

    this.setState({
      translate: {
        x: translate.x - deltaW,
        y: translate.y - deltaH
      },
      timestamp: nextProps.t
    })

    !this.state.showInfo && this.animate(nextProps.t, nextProps.frame)
  }

  setOffset = () => {
    const bug = this.bug
    console.log(bug.clientHeight)

    const set = () => {
      this.setState({
        offset: {
          x: bug.clientWidth / 2,
          y: bug.clientHeight / 2
        },
        boundary:
          bug.clientHeight > bug.clientWidth
            ? bug.clientHeight * this.props.scalingFactor
            : bug.clientWidth * this.props.scalingFactor,
        isLoading: bug.clientHeight > 18 ? false : true
      })
    }

    const int = setInterval(() => {
      set()
    }, 20)

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
      clearInterval(int)
    }, 1000)
  }

  animate = (t, frame) => {
    let { offset, boundary, timestamp, rotate, rotateNext, translate } = {
      ...this.state
    }

    // velocity [pixel per second]
    const v = this.state.velocity / 1000 * (t - timestamp)

    /**
     * Calc vectors and update position
     */
    const angle = rotate / 180 * Math.PI
    const vy = v * Math.sin(angle)
    const vx = v * Math.cos(angle)

    translate.x += vx
    translate.y += vy
    const actualPosition = {
      x: translate.x + offset.x,
      y: translate.y + offset.y
    }

    // handle direktino
    const rotationInterval = 30
    const rotationMax = 20

    rotate += rotateNext

    // TODO: changing directions smoother
    if (frame % rotationInterval === 0)
      rotateNext = (Math.random() * 2 - 1) * rotationMax / rotationInterval

    // keep bugs in frame
    if (actualPosition.x > this.props.parent.width + boundary && vx > 0)
      translate.x = -boundary - offset.x
    else if (actualPosition.x < -boundary && vx < 0)
      translate.x = this.props.parent.width + boundary - offset.x
    if (actualPosition.y > this.props.parent.height + boundary && vy > 0)
      translate.y = -boundary - offset.y
    else if (actualPosition.y < -boundary && vy < 0)
      translate.y = this.props.parent.height + boundary - offset.y

    // update state
    this.setState({
      translate,
      rotate,
      rotateNext
    })
  }

  showInfo = showInfo => {
    this.setState({ showInfo })
  }

  render() {
    const sf = this.props.scalingFactor
    const tx = this.state.translate.x
    const ty = this.state.translate.y
    const ro = this.state.rotate
    const offset = this.state.offset

    const transform = `translate(${tx}px, ${ty}px) rotate(${ro +
      90}deg) scale(${sf})`
    const details = this.props.details
    if (!details) return null

    return (
      <div style={{ visibility: this.state.isLoading ? 'hidden' : 'visible' }}>
        {/* <Name details={details} /> */}
        <div
          ref={elem => (this.bug = elem)}
          className="bug"
          style={{ transform }}
          onMouseDown={() => this.showInfo(true)}
          onMouseUp={() => this.showInfo(false)}
          onMouseLeave={() => this.showInfo(false)}
          onTouchStart={() => this.showInfo(true)}
          onTouchEnd={() => this.showInfo(false)}
        >
          <img
            src={process.env.PUBLIC_URL + '/bugs/' + this.props.details.image}
            alt={details.image}
          />
        </div>
        {this.state.showInfo && (
          <div
            className="bug-description-container"
            style={{
              position: 'absolute',
              left: this.state.boundary / 2,
              top: 0,
              zIndex: 1000,
              transform: `translate(${tx + this.state.offset.x}px, ${ty +
                this.state.offset.y -
                30}px)`
            }}
          >
            <Name details={details} />
          </div>
        )}
        {false && (
          <div
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              width: tx + offset.x,
              height: ty + offset.y,
              border: '1px solid #000'
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                transform: `translate(${tx + this.state.offset.x}px, ${ty +
                  this.state.offset.y -
                  30}px)`
              }}
            >
              {Math.floor(tx + this.state.offset.x)}
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                transform: `translate(${tx + this.state.offset.x - 50}px, ${ty +
                  this.state.offset.y}px)`
              }}
            >
              {Math.floor(ty + this.state.offset.y)}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Bug
