import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { categoriesFetchData } from './actions';

class ListCategories extends Component {
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
            <li key={item.path}>
              {item.name}
            </li>
          ))}
        </ul>
      )
    }

    return (
      <div className="ListCategories">
        <h2>Categories</h2>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    items: categories.items,
    didInvalidate: categories.didInvalidate,
    isFetching: categories.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(categoriesFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCategories);
