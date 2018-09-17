import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postsFetchData, removePostFetch } from './actions';
import { Link } from "react-router-dom";

class ListPosts extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.fetchData()
  }

  remove(postId) {
    this.props.remove(postId)
  }

  linkRemove(postId, statusRemove) {
    if (postId === statusRemove.id) {
      return (<a href='#'><CircularProgress size={20} /> Removing...</a>)
    }
    return (<a href='#' onClick={() => this.remove(postId)}>Remove</a>)
  }

  render() {
    let content = ''
    const { items, isFetching, didInvalidate, statusRemove } = this.props

    if (didInvalidate) {
      content = (<p>Sorry! There was an error loading the items</p>)
    } else if (isFetching) {
      content = (
        <div>
          <CircularProgress thickness={7} />
          <p>Loading…</p>
        </div>
      )
    } else if ( items.length > 0 ) {
      content = (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/posts/${item.id}`}>{item.title}</Link> - { this.linkRemove(item.id, statusRemove) }
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="ListPosts">
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ posts, removePost }) => {
  return {
    items: posts.items,
    didInvalidate: posts.didInvalidate,
    isFetching: posts.isFetching,
    statusRemove: removePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(postsFetchData()),
    remove: (postId) => dispatch(removePostFetch(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
