import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import moment from 'moment'
import sortBy from 'sort-by'
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './List.css'

const orderByOptions = [
  {label: 'Popular', value: 'voteScore'},
  {label: 'Category', value: 'category'},
  {label: 'Recent', value: 'timestamp'},
]

class BaseList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string,
  }

  state = {
    orderBy: false
  }

  orderBy(option) {
    this.setState({
      orderBy: option
    })
  }
}

class ListContent extends BaseList {

  state = {
    orderBy: 'voteScore'
  }

  render() {
    const { items, title } = this.props;
    const { orderBy } = this.state;
    let showingPosts = items

    showingPosts.sort(sortBy(orderBy))

    return (
      <div className="list_content">
        <h2>{ title }</h2>
        <div class="row list_content__filter">
          { orderByOptions.map((option) => (
            <div onClick={ () => this.orderBy(option.value)} key={ option.value } className={ `col-xs list_content__filter__item ${option.value === orderBy? 'list_content__filter__item--selected' : ''}` }>
              <span>{ option.label }</span>
            </div>
          )) }
        </div>
        {showingPosts.map((item) => (
          <div className="list_content__item" key={item.id}>
            <div className="list_content__item__title">
              <Link className="link" to={`/posts/${item.id}`}>{item.title}</Link>
            </div>
            <div className="list_content__item__info">
              <p>
                date { moment(item.timestamp).format('MM-DD-YYYY') } - in <Link className="link" to={`/category/${item.category}`}>{ item.category }</Link> - by <span className="list_posts__item__info--author">{ item.author }</span> 
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const orderByCategoryOptions = [
  {label: 'Default', value: false},
  {label: 'Name', value: 'path'},
]
class List extends BaseList {
  render() {
    const { items, title } = this.props;
    const { orderBy } = this.state;
    let showingItems = items
    if ( orderBy ){
      showingItems.sort(sortBy(orderBy))
    }

    return (
      <div className="list_content">
        <h2>{ title }</h2>
        <div class="row list_content__filter">
          { orderByCategoryOptions.map((option) => (
            <div onClick={ () => this.orderBy(option.value)} key={ option.value } className={ `col-xs list_content__filter__item ${option.value === orderBy? 'list_content__filter__item--selected' : ''}` }>
              <span>{ option.label }</span>
            </div>
          )) }
        </div>
        {showingItems.map((item) => (
          <div className="list_content__item list_content__item--category" key={item.path}>
            <div className="list_content__item__title">
              <Link className="link" to={`/category/${item.path}`}>{item.name}</Link>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

List.propTypes = {
  items: PropTypes.array.isRequired,
}

export { ListContent, List };