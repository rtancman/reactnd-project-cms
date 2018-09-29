import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { createPostFetch } from './actions';
import { categoriesFetchData } from 'components/category/actions'
import PostForm from './PostForm'

class AddPost extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
  }

  addPost = (post, resetForm) => {
    this.props.addPost(post, resetForm)
  }

  componentDidMount() {
    if ( this.props.categories.items.length < 1) this.props.fetchCategoriesData()
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
    createPost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post, resetForm) => dispatch(createPostFetch(post, resetForm)),
    fetchCategoriesData: () => dispatch(categoriesFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
