import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { postsFetchData } from './actions';

class ListPosts extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.fetchData()
  }

  render() {
    let content = ''
    const { items, isFetching, didInvalidate } = this.props

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
              {item.title}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="ListPosts">
        <h2>Posts</h2>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    items: posts.items,
    didInvalidate: posts.didInvalidate,
    isFetching: posts.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(postsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);
