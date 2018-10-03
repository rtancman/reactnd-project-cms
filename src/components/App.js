import React, { Component } from 'react';
import { Switch, Route } from 'react-router'
import './App.css';
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import PostCreatePage from './pages/PostCreatePage'
import Menu from './navigation/Menu'
import PostEditPage from './pages/PostEditPage'

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
              <PostCreatePage {...props} />
            )}/>
            <Route exact path='/posts/edit/:id' render={(props) => (
              <PostEditPage {...props} />
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
