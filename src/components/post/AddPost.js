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

  addPost = (post) => {
    this.props.fetchData(post)
  }

  render() {
      const { categories } = this.props;
      return (
        <div>
          <PostForm
            handleSubmit={this.addPost}
            categories={categories.items}
          />
        </div>
      );
  }
}

const mapStateToProps = ({posts, categories}) => {
  return {
    categories,
    posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (post) => dispatch(createPostFetch(post))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
