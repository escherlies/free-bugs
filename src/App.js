import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bug from './components/Bug'
import Nav from './components/Nav'
import Ground from './components/Ground'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Ground />
      </div>
    );
  }
}

export default App;
