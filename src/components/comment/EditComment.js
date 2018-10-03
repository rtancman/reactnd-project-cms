import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'
import CommentForm from './CommentForm'
import { pushListComments } from 'components/post/actions'
import { ShowMessage } from 'components/layout/Message.js'
import { removeCommentFetch } from './actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import Vote from 'components/vote'
import { editCommentFetch } from 'api/cms'

class EditComment extends Component {
  static propTypes = {
    pushComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
  }

  state = {
    created: false,
    isFetching: false,
    didInvalidate: false,
    edit: false,
  }

  save = (comment) => {
    this.setState((state) => ({
      isFetching: true,
      didInvalidate: false,
    }))
    
    editCommentFetch(comment.id, {body: comment.body, timestamp: Date.now()})
    .then(body => {
      // this.props.pushComment(body)
      this.setState((state) => ({
        isFetching: false,
        didInvalidate: false,
        edit: false,
      }))
    })
    .catch(ex => {
      this.setState((state) => ({
        isFetching: false,
        didInvalidate: true,
      }))
    })
  }

  remove(commentId) {
    this.props.remove(commentId)
  }

  handleEdit(bool) {
    this.setState({ edit: bool });
  }

  linkRemove(commentId, statusRemove) {
    if (commentId === statusRemove.id) {
      return (<span className='link'><CircularProgress size={20} /> Removing...</span>)
    }
    return (
      <IconButton style={{ margin: 0, padding: '6px' }} onClick={() => this.remove(commentId)} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    )
  }

  render() {
    const { isFetching, didInvalidate, edit } = this.state;
    const { comment } = this.props;
    let content = (
      <div>
        <p>{comment.body}</p>
        <div className="content__comment__body__actions">
          <Vote 
            type='comment' 
            id={comment.id}
            total={comment.voteScore || 0}
          />
          <IconButton alt="Edit" title="Edit" onClick={() => this.handleEdit(true)} style={{ margin: 0, padding: '6px' }} aria-label="Delete">
            <EditIcon />
          </IconButton>
          { this.linkRemove(comment.id, {}) }
        </div>
      </div>
    )

    if ( edit ) {
      content = (
        <div>
            { isFetching === false && didInvalidate === true && ( <ShowMessage message='Error to create comment. Try Again!' variant='error' open={true} /> ) }
            <CommentForm
              handleSubmit={this.save}
              isFetching={isFetching}
              postId={comment.parentId}
              onlyComment={true}
              {...comment}
            />
            <div className="content__comment__body__actions">
              <IconButton alt="Cancel" title="Cancel" onClick={() => this.handleEdit(false)} style={{ margin: 0, padding: '6px' }} aria-label="Delete">
                <CancelIcon />
              </IconButton>
            </div>
        </div>
      )
    }

    return (
      <div className="col-xs-12">
        <div className="content__comment__body">
          <div className="content__comment__body__info">
            <AccountCircle className="content__comment__body__info--avatar"/>
            <p className="content__comment__body__info--author">{ comment.author }</p>
            <span className="content__comment__body__info--date">date { moment(comment.timestamp).format('MM-DD-YYYY') }</span>
          </div>
          {content}
        </div>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = () => { return {} }

const mapDispatchToProps = (dispatch) => {
  return {
    pushComment: (comment) => dispatch(pushListComments(comment)),
    remove: (commentId) => dispatch(removeCommentFetch(commentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment);