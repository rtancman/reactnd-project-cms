import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { categoriesFetchData } from './actions';
import { Link } from 'react-router-dom';
import { List } from 'components/layout/List'

class ListCategories extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }

  state = {
    isFetching: false,
    didInvalidate: false,
  }

  render() {
    let content = ''
    const { items } = this.props
    const { isFetching, didInvalidate } = this.state

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
        <List title='Categories' items={items} />
      )
    }

    return (
      <div className='ListCategories'>
        { content }
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return {
    items: categories.items,
  };
};

export default connect(mapStateToProps)(ListCategories);
