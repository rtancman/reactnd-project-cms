import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { removeCommentFetch } from './actions';

class ListComments extends Component {
  static propTypes = {
    remove: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    statusRemove: PropTypes.object.isRequired
  }

  remove(postId) {
    this.props.remove(postId)
  }

  linkRemove(commentId, statusRemove) {
    if (commentId === statusRemove.id) {
      return (<a href='#'><CircularProgress size={20} /> Removing...</a>)
    }
    return (<a href='#' onClick={() => this.remove(commentId)}>Remove</a>)
  }

  render() {
    const { statusRemove, items } = this.props

    return (
      <div>
        <p>comments</p>
        <ul>
          {items && items.map((comment) => (
            <li key={comment.id}>{comment.body}  - { this.linkRemove(comment.id, statusRemove) }</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ removeComment }) => {
  return {
    statusRemove: removeComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (commentId) => dispatch(removeCommentFetch(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListComments);