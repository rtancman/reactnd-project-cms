import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ListContent } from '../layout/List'

class ListPosts extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired
  }

  render() {
    let content = ''
    const { items, isFetching, didInvalidate, statusRemove } = this.props

    if (didInvalidate) {
      content = (
        <div>
          <p>Sorry! There was an error loading the items</p>
        </div>
      )
    } else if (isFetching) {
      content = (
        <div>
          <CircularProgress thickness={7} />
          <p>Loading…</p>
        </div>
      )
    } else if ( items.length > 0 ) {
      content = (
        <div>
          <ListContent title='Posts' items={items} />
        </div>
      )
    }

    return (
      <div className='ListPosts'>
        <div className='list_posts'>
          { content }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    items: posts.items,
    didInvalidate: posts.didInvalidate,
    isFetching: posts.isFetching,
  };
};

export default connect(mapStateToProps)(ListPosts);