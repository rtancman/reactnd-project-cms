import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import './App.css';
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'
import PostPage from './pages/PostPage'
import PostCreatePage from './pages/PostCreatePage'
import Menu from './navigation/Menu'
import PostEditPage from './pages/PostEditPage'
import { postsFetchData } from 'components/post/actions';
import { categoriesFetchData } from 'components/category/actions'

class App extends Component {
  componentDidMount() {
    if ( this.props.categories.items.length < 1) this.props.fetchCategories()
    if ( this.props.posts.items.length < 1) this.props.fetchPosts()
  }

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

const mapStateToProps = ({ categories, posts }) => {
  return {
    categories,
    posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(categoriesFetchData()),
    fetchPosts: () => dispatch(postsFetchData()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));