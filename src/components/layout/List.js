import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import moment from 'moment'
import sortBy from 'sort-by'
import CommentIcon from '@material-ui/icons/Comment';
import EventIcon from '@material-ui/icons/Event';
import './List.css'
import Vote from '../vote'

const orderByOptions = [
  {label: 'Popular', value: '-voteScore'},
  {label: 'Category', value: 'category'},
  {label: 'Recent', value: '-timestamp'},
]

class BaseList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string,
  }

  state = {
    orderBy: false,
  }

  orderBy(option) {
    this.setState({
      orderBy: option
    })
  }
}

class ListContent extends BaseList {

  state = {
    orderBy: '-voteScore'
  }

  render() {
    const { items, title } = this.props
    const { orderBy } = this.state
    let showingPosts = items

    showingPosts.sort(sortBy(orderBy))

    return (
      <div className="list_content">
        <h2>{ title }</h2>
        <div className="row list_content__filter">
          { orderByOptions.map((option) => (
            <div data-filter-option-value={ option.value } onClick={ () => this.orderBy(option.value)} key={ option.value } className={ `col-xs list_content__filter__item ${option.value === orderBy? 'list_content__filter__item--selected' : ''}` }>
              <span>{ option.label }</span>
            </div>
          )) }
        </div>
        {showingPosts.map((item) => (
          <div className="list_content__item" key={item.id}>
            <div className="list_content__item__title">
              <Link className="link" to={`/${item.category}/${item.id}`}>{item.title}</Link>
              <div className="list_content__item__title--vote">
                <Vote
                  type='post' 
                  id={item.id}
                  total={item.voteScore || 0}
                />
              </div>
            </div>
            <div className="list_content__item__info">
              <p>
                <EventIcon style={{ fontSize: 10 }} title='Create at' alt='Create at' /> { moment(item.timestamp).format('MM/DD/YYYY') } <CommentIcon style={{ fontSize: 10 }} title='Total comments' alt='Total comments' /> { item.commentCount } - in <Link className="link" to={`/${item.category}`}>{ item.category }</Link> - by <span className="list_posts__item__info--author">{ item.author }</span>
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
    const { items, title } = this.props
    const { orderBy } = this.state
    let showingItems = items
    if ( orderBy ){
      showingItems.sort(sortBy(orderBy))
    }

    return (
      <div className="list_content">
        <h2>{ title }</h2>
        <div className="row list_content__filter">
          { orderByCategoryOptions.map((option) => (
            <div data-filter-option-value={ option.value } onClick={ () => this.orderBy(option.value)} key={ option.value } className={ `col-xs list_content__filter__item ${option.value === orderBy? 'list_content__filter__item--selected' : ''}` }>
              <span>{ option.label }</span>
            </div>
          )) }
        </div>
        {showingItems.map((item) => (
          <div className="list_content__item list_content__item--category" key={item.path}>
            <div className="list_content__item__title">
              <Link className="link" to={`/${item.path}`}>{item.name}</Link>
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

export { ListContent, List }