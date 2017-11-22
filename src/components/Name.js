import React, { Component } from 'react'
import '../App.css'

const Name = props => {
  const { family, subfamily, genus, species, german, english } = props.details

  return (
    <div className='bug-description'>
      <div>{family.toUpperCase()}</div>
      <div>{subfamily.toUpperCase()}</div>
      <div>{genus.toUpperCase()}</div>
      <div>{species.toUpperCase()}</div>
      <br />
      <div className="title german">{german}</div>
      <div className="title english">{english}</div>
    </div>
  )
}

export default Name
