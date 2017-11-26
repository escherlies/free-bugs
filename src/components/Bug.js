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
    velocity: Math.random() * 100 + 50,
    rotate: Math.random() * 360,
    rotateNext: 0.5,
    timestamp: 0,
    boundary: 100,
    stop: false,
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
    // handle window resizing
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

    this.animate(nextProps.t, nextProps.frame)
  }

  setOffset = () => {
    const bug = this.bug
    console.log(bug.clientHeight)

    const set = () => {
      // midpoint of self
      const midpoint = {
        x: bug.clientWidth / 2,
        y: bug.clientHeight / 2
      }

      // spawn somewhere in 80% of window midle
      const spawn = {
        x: window.innerWidth * 0.1 + Math.random() * window.innerWidth * 0.8,
        y: window.innerHeight * 0.1 + Math.random() * window.innerHeight * 0.8
      }

      this.setState({
        offset: {
          x: midpoint.x,
          y: midpoint.y
        },
        translate: {
          x: -midpoint.x + spawn.x,
          y: -midpoint.y + spawn.y
        },
        boundary:
          bug.clientHeight > bug.clientWidth
            ? bug.clientHeight * this.props.scalingFactor
            : bug.clientWidth * this.props.scalingFactor,
        isLoading: bug.clientHeight > 50 ? false : true
      })
    }

    const int = setInterval(() => {
      if (this.state.isLoading) set()
    }, 20)

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
      clearInterval(int)
    }, 1000)
  }

  animate = (t, frame) => {
    // return
    const showInfo = this.state.showInfo

    let { offset, boundary, timestamp, rotate, rotateNext, translate } = {
      ...this.state
    }

    if (this.state.showInfo)
      translate = {
        x: this.props.mousePosition.x - this.state.offset.x,
        y: this.props.mousePosition.y - this.state.offset.y
      }

    // velocity [pixel per second]
    let v = this.state.velocity / 1000 * (t - timestamp)

    if (showInfo || this.state.stop) v = 0
    // handle stopping
    if (!this.state.stopTimeoutActive) {
      this.setState({ stopTimeoutActive: true })

      if (this.state.stop) {
        setTimeout(() => {
          this.setState({ stop: false, stopTimeoutActive: false })
        }, Math.floor((Math.random() + 0.5) * 1000))
      } else {
        setTimeout(() => {
          this.setState({ stop: true, stopTimeoutActive: false })
        }, Math.floor((Math.random() * 5 + 1) * 1000))
      }
    }

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
    const rotationInterval = showInfo ? 3 : 30
    const rotationMax = showInfo ? 3 : 20

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

  handleMouse = (e, showInfo) => {
    this.setState({ showInfo })
    // console.log(e.target.clientX, e.target.clientY)
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
      <div
        style={{
          visibility: this.state.isLoading ? 'hidden' : 'visible',
          pointerEvents: 'click',
          userSelect: 'none',
          userDrag: 'none'
        }}
      >
        {/* <Name details={details} /> */}
        <div
          ref={elem => (this.bug = elem)}
          className="bug"
          style={{ transform }}
          onMouseDown={e => this.handleMouse(e, true)}
          onMouseUp={e => this.handleMouse(e, false)}
          onMouseLeave={e => this.handleMouse(e, false)}
          onTouchStart={e => this.handleMouse(e, true)}
          onTouchEnd={e => this.handleMouse(e, false)}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              '/bugsAt20Percent/' +
              this.props.details.image
            }
            alt={details.image}
            onDragStart={e => e.preventDefault()}
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
              transform: `translate(${tx + offset.x}px, ${ty +
                offset.y -
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
