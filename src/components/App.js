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
import Footer from './navigation/Footer'
import PostEditPage from './pages/PostEditPage'
import NotFoundPage from './pages/NotFoundPage'
import { postsFetchData } from './post/actions';
import { categoriesFetchData } from './category/actions'

class App extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  }

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
            <Route exact path='/posts/create' render={(props) => (
              <PostCreatePage {...props} />
            )}/>
            <Route exact path='/posts/edit/:id' render={(props) => (
              <PostEditPage {...props} />
            )}/>
            <Route exact path='/:category/:id' render={(props) => (
              <PostPage {...props} />
            )}/>
            <Route exact path='/:id' render={(props) => (
              <CategoryPage {...props} />
            )}/>
            <Route render={(props) => (
              <NotFoundPage {...props} />
            )}/>
          </Switch>
        </div>
        <Footer />
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