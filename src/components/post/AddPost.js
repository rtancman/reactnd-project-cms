import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPostFetch } from './actions';
import { categoriesFetchData } from '../category/actions'
import PostForm from './PostForm'
import { ShowMessage } from '../layout/Message.js'

class AddPost extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired,
  }

  state = {
    created: false,
    isFetching: false,
    didInvalidate: false,
  }

  addPost = (post, resetForm) => {
    this.setState((state) => ({
      isFetching: true,
      created: false,
      didInvalidate: false,
    }))

    this.props.addPost(post).then(body => {
      this.setState((state) => ({
        created: true,
        isFetching: false,
        didInvalidate: false,
      }))
      resetForm()
    })
    .catch(ex => {
      this.setState((state) => ({
        isFetching: true,
        created: false,
        didInvalidate: true,
      }))
    })
  }

  componentDidMount() {
    if ( this.props.categories.items.length < 1) this.props.fetchCategories()
  }

  render() {
      const { categories } = this.props;
      const { isFetching, created, didInvalidate } = this.state;

      return (
        <div>
          { isFetching === false && created === true && ( <ShowMessage message='Post has been created' variant='success' open={true} /> ) }
          { isFetching === false && didInvalidate === true && ( <ShowMessage message='Error to create Post. Try Again!' variant='error' open={true} /> ) }
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
                isFetching={isFetching}
              />
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (post) => dispatch(createPostFetch(post)),
    fetchCategories: () => dispatch(categoriesFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
