import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import moment from 'moment'
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircle from '@material-ui/icons/AccountCircle';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { removeCommentFetch } from './actions';
import sortBy from 'sort-by'

const orderByOptions = [
  {label: 'Popular', value: 'voteScore'},
  {label: 'Recent', value: 'timestamp'},
]

class ListComments extends Component {
  static propTypes = {
    remove: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    statusRemove: PropTypes.object.isRequired
  }
  
  state = {
    value: 0,
    orderBy: 'voteScore'
  }
  
  orderBy(option) {
    this.setState({
      orderBy: option
    })
  }

  remove(postId) {
    this.props.remove(postId)
  }

  linkRemove(commentId, statusRemove) {
    if (commentId === statusRemove.id) {
      return (<a href='#'><CircularProgress size={20} /> Removing...</a>)
    }
    return (
      <IconButton style={{ margin: 0, padding: '6px' }} onClick={() => this.remove(commentId)} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
    )
  }

  handleFilter = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { statusRemove, items } = this.props
    const { value, orderBy } = this.state
    let showingItems = items

    showingItems.sort(sortBy(orderBy))

    return (
      <div>
          <div className="row content__comment__filter">
            { orderByOptions.map((option) => (
              <div onClick={ () => this.orderBy(option.value)} key={ option.value } className={ `col-xs content__comment__filter__item ${option.value === orderBy? 'content__comment__filter__item--selected' : ''}` }>
                <span>{ option.label }</span>
              </div>
            )) }
          </div>
          {showingItems && items.map((comment) => (
            <div className="row" key={comment.id} elevation={1}>
              <div className="col-xs-12">
                <div className="content__comment__body">
                  <div className="content__comment__body__info">
                    <AccountCircle className="content__comment__body__info--avatar"/>
                    <p className="content__comment__body__info--author">{ comment.author }</p>
                    <span className="content__comment__body__info--date">date { moment(comment.timestamp).format('MM-DD-YYYY') }</span>
                  </div>
                  <p>{comment.body}</p>
                  <div className="content__comment__body__actions">
                    <IconButton style={{ margin: 0, padding: '6px' }} aria-label="Delete">
                      <ThumbUp />
                    </IconButton>
                    <IconButton style={{ margin: 0, padding: '6px' }} aria-label="Delete">
                      <ThumbDown />
                    </IconButton>
                    { this.linkRemove(comment.id, statusRemove) }
                  </div>
                </div>
                <hr />
              </div>
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = ({ removeComment }) => {
  return {
    statusRemove: removeComment,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    remove: (commentId) => dispatch(removeCommentFetch(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListComments);