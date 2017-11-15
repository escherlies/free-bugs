import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Bug from './components/Bug'
import Nav from './components/Nav'
import Ground from './components/Ground'

class App extends Component {

  state = {
    dim: {
      width: 0,
      height: 0
    }
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ dim: { width: window.innerWidth, height: window.innerHeight } });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <button>Show Dev Tools</button>

        {
          this.state.dim.width !== 0 ? <Ground dim={this.state.dim} /> : 'Loading'
        }
      </div>
    );
  }
}

export default App;
