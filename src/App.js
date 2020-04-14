import React, { Component } from 'react';
import './App.css';
import FavMovie from './Application/FavMovie';

class App extends Component {
  render () {
    return (
      <div style={{margin:25}}>
      <FavMovie/>
      </div>
    );
  }
}

export default App;
