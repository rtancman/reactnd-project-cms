import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Category from './pages/Category'
import Post from './pages/Post'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={({ history }) => (
          <Home />
        )}/>
        <Route path='/category/:id' render={({ history }) => (
          <Category />
        )}/>
        <Route path='/post/:id' render={({ history }) => (
          <Post />
        )}/>
      </div>
    );
  }
}

export default App;
