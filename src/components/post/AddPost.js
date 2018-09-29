import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { createPostFetch } from './actions';
import PostForm from './PostForm'

class AddPost extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.object.isRequired,

  }

  addPost = (post, resetForm) => {
    this.props.fetchData(post, resetForm)
  }

  render() {
      const { categories, createPost } = this.props;
      return (
        <div>
          <div className="content__head">
            <div className="container">
              <h1 className="content__title">Create Post</h1>
              <hr />
            </div>
          </div>
          <div className="content__body">
            <div className="container">
              <PostForm
                handleSubmit={this.addPost}
                categories={categories.items}
                {...createPost}
              />
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = ({categories, createPost}) => {
  return {
    categories,
    createPost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (post, resetForm) => dispatch(createPostFetch(post, resetForm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
