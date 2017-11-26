import React, { Component } from 'react'
import _ from 'lodash'
import logo from '../logo.png'

class Nav extends Component {
  state = {
    families: []
  }

  componentWillMount() {
    this.setState({
      families: _.uniq(_.map(this.props.bugs, e => e.family))
    })
  }

  componentDidMount() {
    this.selectRandom()
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

  selectRandom = () => {
    const allSelected = _.keys(this.props.selected)
    const all = _.map(this.props.bugs, e => e.id)
    const rand = _.sampleSize(all, 8)

    this.props.select(allSelected.concat(rand))
  }

  selectAll = () => {
    const all = _.map(this.props.bugs, e => e.id)
    this.props.select(all)
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
        <div className="nav-row margin" onClick={() => this.selectRandom()}>
          <div className="nav-title">SELECT RANDOM</div>
        </div>
        <div className="nav-row margin" onClick={() => this.selectAll()}>
          <div className="nav-title">SELECT ALL</div>
        </div>
        <div className="nav-row margin">
          <div className="thumbnail-container">
            <div
              className="scaling-button"
              onClick={() => this.props.setScalingFactor('dec')}
            >
              <div className="minus" />
            </div>
            <div
              className="scaling-button"
              onClick={() => this.props.setScalingFactor('inc')}
            >
              <div className="v-minus"> </div> <div className="minus" />
            </div>
          </div>
        </div>
        <Context />
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
  const filter = props.selected
    ? 'opacity(100%)'
    : 'saturate(0%) brightness(150%) opacity(50%)'
  return (
    <div style={{ width: 45, height: 45, marginRight: 5, opacity: "50%" }}>
      <img
        src={process.env.PUBLIC_URL + '/thumbs/' + props.thumbnail}
        alt={props.thumbnail}
        style={{ width: 45, cursor: 'pointer', marginRight: '10px', filter }}
        onClick={() => props.select([props.id])}
      />
    </div>
  )
}

const Context = props => {
  return <div className="context">
      <div>
        Daten: <a href="#">Naturkundemuseum Berlin</a>
      </div>
      <br />
      <div>
        Konzept/Design: <a href="http://www.sabine-redlich.de/">
          Sabine Redlich
        </a>
      </div>
      <div>
        Programmierung: <a href="https://github.com/enryco">
          Enrico Scherlies
        </a>
      </div>
      <a href="https://codingdavinci.de/">
        <img className="logo" src={logo} alt="" />
      </a>
    </div>
}
