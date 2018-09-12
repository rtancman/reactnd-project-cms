import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' render={(props) => (
          <Home {...props} />
        )}/>
        <Route path='/category/:id' render={(props) => (
          <CategoryPage {...props} />
        )}/>
        <Route path='/posts/:id' render={(props) => (
          <PostPage {...props} />
        )}/>
      </div>
    );
  }
}

export default App;
