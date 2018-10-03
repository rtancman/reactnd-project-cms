import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPostFetch, postFetchData } from './actions';
import { categoriesFetchData } from 'components/category/actions'
import { editPostFetch } from 'api/cms'
import { Link } from "react-router-dom";
import PostForm from './PostForm'
import { ShowMessage } from 'components/layout/Message.js'

class EditPost extends Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
  }

  state = {
    created: false,
    isFetching: false,
    didInvalidate: false,
  }

  editPost = (post, resetForm) => {
    this.setState((state) => ({
      isFetching: true,
      created: false,
      didInvalidate: false,
    }))

    editPostFetch(this.props.postId, post)
    .then(body => {
      this.setState((state) => ({
        isFetching: false,
        didInvalidate: false,
        created: true,
      }))
    })
    .catch(ex => {
      this.setState((state) => ({
        didInvalidate: true,
        created: false,
        isFetching: false,
      }))
    })
  }

  componentDidMount() {
    if ( this.props.categories.items.length < 1) this.props.fetchCategoriesData()
    this.props.fetchData(this.props.postId)
  }

  render() {
      const { categories, post } = this.props;
      const { isFetching, created, didInvalidate } = this.state;
      let content

      if ( post.content.id ) {
        content = (
          <PostForm
            handleSubmit={this.editPost}
            categories={categories.items}
            isFetching={isFetching}
            {...post.content}
          />
        )
      }else{
        content = (<p>Loading...</p>)
      }

      return (
        <div>
          { isFetching === false && created === true && ( <ShowMessage message='Post has been updated' variant='success' open={true} /> ) }
          { isFetching === false && didInvalidate === true && ( <ShowMessage message='Error to edit Post. Try Again!' variant='error' open={true} /> ) }
          <div className="content__head">
            <div className="container">
              <h1 className="content__title">Edit Post</h1>
              <Link className='link' to={`/posts/${post.content.id}`}>View Post</Link>
              <hr />
            </div>
          </div>
          <div className="content__body">
            <div className="container">
              {content}
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = ({categories, post}) => {
  return {
    categories,
    post,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    save: (post, resetForm) => dispatch(createPostFetch(post, resetForm)),
    fetchData: (postId) => dispatch(postFetchData(postId)),
    fetchCategoriesData: () => dispatch(categoriesFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
