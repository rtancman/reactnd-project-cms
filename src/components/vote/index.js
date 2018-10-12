import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { commentUrl } from '../../api/cms'
import { postVoteFetch, commentVoteFetch } from '../post/actions'
import './Vote.css'

class Vote extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    postVoteFetch: PropTypes.func.isRequired,
  }

  state = {
    total: this.props.total || 0,
    created: false,
    isFetching: false,
    didInvalidate: false,
  }
  
  voteFetchByType() {
    switch (this.props.type) {
      case 'comment':
        return this.props.commentVoteFetch
        break;
    
      case 'post':
        return this.props.postVoteFetch
        break;
    
      default:
        return false
        break;
    }
  }

  voteOption(option) {
    this.setState((state) => ({
      isFetching: true,
      created: false,
      didInvalidate: false,
    }))
    
    const voteFunc = this.voteFetchByType()
    if ( voteFunc === false ){
      this.setState((state) => ({
        didInvalidate: true,
        created: false,
        isFetching: false,
      }))
    }else{
      voteFunc(this.props.id, option)
      .then(body => {
        this.setState((state) => ({
          isFetching: false,
          didInvalidate: false,
          created: true,
          total: option === 'upVote'? state.total + 1 : state.total - 1
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
  }

  render() {
    const { didInvalidate, created, isFetching, total } = this.state
    let content

    if (isFetching === true) {
      content = (
        <div className="vote__bar__icons">
          <p>Loading...</p>
        </div>
      )
    }else if (isFetching === false) {
      content = (
        <div className="vote__bar__icons">
          <IconButton alt="Up Vote" title="Up Vote" onClick={() => {this.voteOption('upVote')}} style={{ margin: 0, padding: '6px' }} aria-label="Up Vote">
            <ThumbUp />
          </IconButton>
          <IconButton alt="Down Vote" title="Down Vote" onClick={() => {this.voteOption('downVote')}} style={{ margin: 0, padding: '6px' }} aria-label="Down Vote">
            <ThumbDown />
          </IconButton>
        </div>
      )
    }
    return(
      <div className="vote__bar">
        <span className="vote__bar__total"><FavoriteIcon style={{ fontSize: 12 }} title='Total score' alt='Total score'/> { total || 0 }</span>
        { content }
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    postVoteFetch: (postId, option) => dispatch(postVoteFetch(postId, option)),
    commentVoteFetch: (commentId, option) => dispatch(commentVoteFetch(commentId, option)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
