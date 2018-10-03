import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import EditComment from './EditComment'

const orderByOptions = [
  {label: 'Popular', value: '-voteScore'},
  {label: 'Recent', value: '-timestamp'},
]

class ListComments extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  }
  
  state = {
    value: 0,
    orderBy: '-voteScore'
  }
  
  orderBy(option) {
    this.setState({
      orderBy: option
    })
  }

  handleFilter = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { items } = this.props
    const { orderBy } = this.state
    let showingItems = items

    if ( showingItems.length < 1 ) return ''
    
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
            <div className="row" key={comment.id}>
              <EditComment comment={comment} />
            </div>
          ))}
      </div>
    )
  }
}

export default ListComments;