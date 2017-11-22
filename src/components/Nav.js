import React, { Component } from 'react'
import _ from 'lodash'

class Nav extends Component {
  state = {
    families: []
  }

  componentWillMount() {
    this.setState({
      families: _.uniq(_.map(this.props.bugs, e => e.family))
    })
  }

  render() {
    // const sample = { '01_A': this.props.bugs['01_A'] }

    return (
      <div className="nav" style={{ transform: 'scale(1)'}}>
        {_.map(this.state.families, (family, i) => (
          <Row
            key={i}
            bugs={_.filter(this.props.bugs, { family })}
            family={family}
            selected={this.props.selected}
            select={this.props.select}
          />
        ))}
      </div>
    )
  }
}

export default Nav

const Row = props => {
  return (
    <div className="nav-row">
      <div className="nav-title">{props.family.toUpperCase()}</div>
      <div className="thumbnail-container">
        {_.map(props.bugs, (bug, i) => (
          <Thumbnail
            key={i}
            id={bug.id}
            select={props.select}
            selected={props.selected[bug.id]}
            thumbnail={bug.thumbnail}
          />
        ))}
      </div>
    </div>
  )
}

const Thumbnail = props => {
  const opacity = props.selected ? 1 : 0.8
  return (
    <img
      src={process.env.PUBLIC_URL + '/thumbs/' + props.thumbnail}
      alt={props.thumbnail}
      style={{ width: 50, cursor: 'pointer', marginRight: "5px", opacity }}
      onClick={() => props.select(props.id)}
    />
  )
}
