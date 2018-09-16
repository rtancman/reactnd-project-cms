import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postFetchData, postCommentsFetchData } from './actions';
import { Link } from "react-router-dom";
import Comment from 'components/comment'

class Post extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetchData(this.props.postId)
    this.props.fetchCommentsData(this.props.postId)
  }

  render() {
    let content = ''
    const postContent = this.props.content
    const { isFetching, didInvalidate, comment, postId } = this.props

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
          <p>{ postContent.title }</p>
          {comment.items && (
            <Comment
              items={comment.items}
              postId={postId}
            />
          )}
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
    isFetching: post.isFetching,
    comment: post.comment
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (postId) => dispatch(postFetchData(postId)),
    fetchCommentsData: (postId) => dispatch(postCommentsFetchData(postId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
