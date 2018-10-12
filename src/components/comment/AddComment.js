import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createCommentFetch } from '../../api/cms'
import CommentForm from './CommentForm'
import { pushListComments } from '../post/actions'
import { ShowMessage } from '../layout/Message.js'

class AddComment extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    pushComment: PropTypes.func.isRequired
  }

  state = {
    created: false,
    isFetching: false,
    didInvalidate: false,
  }

  save = (comment, resetForm) => {
    this.setState((state) => ({
      isFetching: true,
      didInvalidate: false,
    }))

    createCommentFetch(comment)
    .then(body => {
      this.props.pushComment(body)
      this.setState((state) => ({
        isFetching: false,
        didInvalidate: false,
      }))
      resetForm()
    })
    .catch(ex => {
      this.setState((state) => ({
        isFetching: false,
        didInvalidate: true,
      }))
    })
  }

  render() {
    const { isFetching, didInvalidate } = this.state;
    const { postId } = this.props;

    return (
      <div>
          { isFetching === false && didInvalidate === true && ( <ShowMessage message='Error to create comment. Try Again!' variant='error' open={true} /> ) }
          <CommentForm
            handleSubmit={this.save}
            isFetching={isFetching}
            postId={postId}
          />
      </div>
    )
  }
}

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    pushComment: (comment) => dispatch(pushListComments(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);