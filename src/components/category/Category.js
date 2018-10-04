import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { categoryPostsFetchData } from './actions';
import { ListContent } from 'components/layout/List'
class Category extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  }

  state = {
    isFetching: true,
    didInvalidate: false,
  }

  componentDidMount() {
    this.props.fetchData(this.props.categoryId)
    .then(body => {
      this.setState((state) => ({
        isFetching: false,
        didInvalidate: false,
      }))
    })
    .catch(ex => {
      this.setState((state) => ({
        didInvalidate: true,
        isFetching: false,
      }))
    })
  }

  render() {
    let content = ''
    const { items, categoryId } = this.props
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
      content = (<ListContent title='Posts' items={items} />)
    }

    return (
      <div className='Category'>
        <div className='content'>
          <div className='content__head'>
            <h1 className='content__title'>{ categoryId }</h1>
            <hr />
          </div>
          { content }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categoryPosts }) => {
  return {
    items: categoryPosts.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (categoryId) => dispatch(categoryPostsFetchData(categoryId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
