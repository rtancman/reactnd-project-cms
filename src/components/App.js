import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import PostAdminPage from './pages/PostAdminPage'
import Menu from './navigation/Menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu />
        <div className="container">
          <Switch>
            <Route exact path='/' render={(props) => (
              <Home {...props} />
            )}/>
            <Route exact path='/category/:id' render={(props) => (
              <CategoryPage {...props} />
            )}/>
            <Route exact path='/posts/create' render={(props) => (
              <PostAdminPage {...props} />
            )}/>
            <Route exact path='/posts/:id' render={(props) => (
              <PostPage {...props} />
            )}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
