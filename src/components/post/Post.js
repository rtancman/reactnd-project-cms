import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postFetchData } from './actions';
import { Link } from "react-router-dom";

class Post extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchData(this.props.postId)
  }

  render() {
    let content = ''
    const postContent = this.props.content
    const { isFetching, didInvalidate } = this.props

    if (didInvalidate) {
      content = (<p>Sorry! There was an error loading the items</p>)
    } else if (isFetching) {
      content = (
        <div>
          <CircularProgress thickness={7} />
          <p>Loading…</p>
        </div>
      )
    } else if ( postContent ) {
      content = (
        <div>
          { postContent.title }
        </div>
      )
    }

    return (
      <div className="ListPosts">
        <h2>Post</h2>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {
    content: post.content,
    didInvalidate: post.didInvalidate,
    isFetching: post.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (postId) => dispatch(postFetchData(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
