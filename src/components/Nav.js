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

  selectFamily = family => {
    const allSelected = _.keys(this.props.selected)

    // filter all familymembers and map their id
    const familyBugs = _.map(_.filter(this.props.bugs, { family }), e => e.id)

    // get selected family members
    const selectedFamilyBugs = _.intersection(allSelected, familyBugs)

    // select none if all are selected
    if (selectedFamilyBugs.length === familyBugs.length) {
      return this.props.select(familyBugs)
    }

    // if non selected, select all
    const toSelect = _.difference(familyBugs, selectedFamilyBugs)
    console.log(toSelect)
    
    return this.props.select(toSelect)

  }

  render() {
    // const sample = { '01_A': this.props.bugs['01_A'] }

    return (
      <div className="nav" style={{ transform: 'scale(1)' }}>
        {_.map(this.state.families, (family, i) => (
          <Row
            key={i}
            bugs={_.filter(this.props.bugs, { family })}
            family={family}
            selected={this.props.selected}
            select={this.props.select}
            selectFamily={this.selectFamily}
          />
        ))}
        <div className="nav-row">
          <div className="nav-title">SELECT RANDOM</div>
        </div>
      </div>
    )
  }
}

export default Nav

const Row = props => {
  return (
    <div className="nav-row">
      <div
        className="nav-title"
        onClick={() => props.selectFamily(props.family)}
      >
        {props.family.toUpperCase()}
      </div>
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
  const opacity = props.selected ? 1 : 0.5
  return (
    <img
      src={process.env.PUBLIC_URL + '/thumbs/' + props.thumbnail}
      alt={props.thumbnail}
      style={{ width: 50, cursor: 'pointer', marginRight: '5px', opacity }}
      onClick={() => props.select([props.id])}
    />
  )
}
