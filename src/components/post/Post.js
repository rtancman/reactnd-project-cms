import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { postFetchData, postCommentsFetchData, removePostFetch } from './actions';
import { Link } from "react-router-dom";
import Comment from 'components/comment'

class Post extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    fetchCommentsData: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired,
    content: PropTypes.object.isRequired,
    comment: PropTypes.object.isRequired,
    statusRemove: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.fetchData(this.props.postId)
    this.props.fetchCommentsData(this.props.postId)
  }

  remove(postId) {
    this.props.remove(postId, this.props.history)
  }

  linkRemove(postId, statusRemove) {
    if (statusRemove.isFetching) {
      return (<span className='link 'href='#'><CircularProgress size={20} /> Removing...</span>)
    }

    return (
      <IconButton style={{ margin: 0, padding: '6px' }} onClick={() => this.remove(postId)} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    )
  }

  render() {
    let content = ''
    const postContent = this.props.content
    const { isFetching, didInvalidate, comment, postId, statusRemove } = this.props

    if (didInvalidate) {
      content = (
        <div className="content__text">
          <p>Sorry! There was an error loading the post</p>
        </div>
      )
    } else if (isFetching) {
      content = (
        <div>
          <CircularProgress thickness={7} />
          <div className="content__text">
            <p>Loading…</p>
          </div>
        </div>
      )
    } else if ( postContent ) {
      content = (
        <div>
          <div className="content__head">
            <div className="container">
              <h1 className="content__title">{ postContent.title }</h1>
              <p>
                date { moment(postContent.timestamp).format('MM-DD-YYYY') } - in <Link className="link" to={`/category/${postContent.category}`}>{ postContent.category }</Link> - by <span className="content__title__info--author">{ postContent.author }</span> 
              </p>
              <hr />
              <div className="content__title__actions">
                <IconButton style={{ margin: 0, padding: '6px' }} aria-label="Delete">
                  <ThumbUp />
                </IconButton>
                <IconButton style={{ margin: 0, padding: '6px' }} aria-label="Delete">
                  <ThumbDown />
                </IconButton>
                { this.linkRemove(postId, statusRemove) }
              </div>
            </div>
          </div>
          <div className="content__body">
            <div className="container">
              <p>{ postContent.body }</p>
              <div className="line"></div>
              {comment.items && (
                <Comment
                  items={comment.items}
                  postId={postId}
                />
              )}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="ListPosts">
        <div className="content">
          { content }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ post, removePost }) => {
  return {
    content: post.content,
    didInvalidate: post.didInvalidate,
    isFetching: post.isFetching,
    comment: post.comment,
    statusRemove: removePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (postId) => dispatch(postFetchData(postId)),
    fetchCommentsData: (postId) => dispatch(postCommentsFetchData(postId)),
    remove: (postId, history) => dispatch(removePostFetch(postId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
