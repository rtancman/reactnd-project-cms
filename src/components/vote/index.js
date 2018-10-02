import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { postVoteFetch, postUrl, commentUrl } from 'api/cms'
import './Vote.css'

class Vote extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }

  state = {
    total: this.props.total || 0,
    created: false,
    isFetching: false,
    didInvalidate: false,
  }
  
  voteUrl() {
    switch (this.props.type) {
      case 'comment':
        return commentUrl(this.props.id)
        break;
    
      case 'post':
        return postUrl(this.props.id)
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

    postVoteFetch(this.voteUrl(), option)
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
          <IconButton onClick={() => {this.voteOption('upVote')}} style={{ margin: 0, padding: '6px' }} aria-label="Up Vote">
            <ThumbUp />
          </IconButton>
          <IconButton onClick={() => {this.voteOption('downVote')}} style={{ margin: 0, padding: '6px' }} aria-label="Down Vote">
            <ThumbDown />
          </IconButton>
        </div>
      )
    }
    return(
      <div className="vote__bar">
        <span className="vote__bar__total">score { total || 0 }</span>
        { content }
      </div>
    )
  }
}

export default Vote