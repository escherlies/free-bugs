import React, { Component } from 'react';

class Bug extends Component {

  state = {
    offset: {
      x: 0,
      y: 0
    },
    translate: {
      x: 0,
      y: 0,
    },
    rotate: 0,
    timestamp: 0,
  }

  componentWillMount(){
    // this.setState({
    //   translate: {
    //     x: Math.floor(Math.random() * this.props.parent.width),
    //     y: Math.floor(Math.random() * this.props.parent.height)
    //   }
    // })
  }

  componentWillReceiveProps(nextProps) {

    const deltaW = this.props.parent.width - nextProps.parent.width
    const deltaH = this.props.parent.height - nextProps.parent.height

    const translate = {... this.state.translate}

    this.setState({
      translate: {
        x: translate.x - deltaW,
        y: translate.y - deltaH,
      }
    })
  }

  setOffset = () => {

    const bug = this.bug
    Promise.all([bug]).then( () => {

      setTimeout(() => {

        console.log(bug)
        console.log(bug.clientWidth, bug.clientHeight)
        this.setState({
          offset: {
            x: bug.clientWidth/2,
            y: bug.clientHeight/2
          }
        }), 2000
      })
    })
  }
  
  componentDidMount() {

    this.setOffset()
   
    const animate = (t) => {

      const boundary = 100

      const offset = {...this.state.offset}

      // velocity [pixel per second]
      let v = 100
      let vx = v / 1000 * (t - this.state.timestamp)
      let vy = -v / 1000 * (t - this.state.timestamp)

      let translate = { ... this.state.translate }
      translate.x += vx
      translate.y += vy
      const actualPosition = {
        x: translate.x + offset.x,
        y: translate.y + offset.y
      }

      // TODO: crawling logic
      if (actualPosition.x > this.props.parent.width + boundary && vx > 0) translate.x -= (this.props.parent.width + 2 * boundary)
      else if (actualPosition.x < -boundary && vx < 0) translate.x += (this.props.parent.width + 2 * boundary)
      if (actualPosition.y > this.props.parent.height + boundary && vy > 0) translate.y -= (this.props.parent.height + 2 * boundary)
      else if (actualPosition.y < -boundary && vy < 0) translate.y += (this.props.parent.height + 2 * boundary)
      this.setState({
        translate,
        timestamp: t
      })

      if (t < 100000) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  render() {

    let sf = this.props.scalingFactor
    let tx = this.state.translate.x
    let ty = this.state.translate.y
    let ro = this.state.rotate
    let offset = this.state.offset

    console.log(this.state.offset)

    const transform = `translate(${tx}px, ${ty}px) rotate(${ro}deg) scale(${sf})`

    return (
      <div>
        <div ref={elem => this.bug = elem} className="bug" style={{ transform }}>
          <img
            src={process.env.PUBLIC_URL + '/bugs/' + this.props.fileName}
            alt={this.props.info.name}
          />
        </div>
        <div style={{
          position: "absolute",
          left: "0",
          right: "0",
          width: tx+offset.x,
          height: ty+offset.y,
          border: '1px solid #000'
        }}>
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            transform: `translate(${tx+this.state.offset.x}px, ${ty+this.state.offset.y-30}px)`
          }}>
          {Math.floor(tx+this.state.offset.x)}
          </div>
          <div style={{
            position: "absolute",
            left: 0,
            right: 0,
            transform: `translate(${tx+this.state.offset.x-50}px, ${ty+this.state.offset.y}px)`
          }}>
            {Math.floor(ty+this.state.offset.y)}
          </div>
        </div>
      </div>
    );
  }
}

export default Bug;
