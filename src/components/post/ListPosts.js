import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import { postsFetchData } from './actions';
import './ListPosts.css'
import { ListContent } from 'components/layout/List'

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
          <ListContent items={items} />
        </div>
      )
    }

    return (
      <div className="ListPosts">
        <div className="list_posts">
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(postsFetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPosts);