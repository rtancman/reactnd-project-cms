import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { categoryPostsFetchData } from './actions';

class Category extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    didInvalidate: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.fetchData(this.props.categoryId)
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
              <p>{item.title}, {item.author}, {item.voteScore}, {item.commentCount}</p>
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="Category">
        <h2>Category</h2>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ categoryPosts }) => {
  return {
    items: categoryPosts.items,
    didInvalidate: categoryPosts.didInvalidate,
    isFetching: categoryPosts.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (categoryId) => dispatch(categoryPostsFetchData(categoryId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
