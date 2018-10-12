import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ListContent } from '../layout/List'
import NotFoundPage from '../pages/NotFoundPage'

class Category extends Component {
  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    categories: PropTypes.object.isRequired,
    posts: PropTypes.object.isRequired,
  }

  render() {
    let content = ''
    const { categoryId, categories, posts } = this.props
    const validCategory = categories.items.filter((c) => c.path === categoryId)

    if (validCategory.length !== 1) {
      return(<NotFoundPage/>)
    }

    const categoryPosts = posts.items.filter((p) => p.category === categoryId)

    if ( categoryPosts.length > 0 ) {
      content = (<ListContent title='Posts' items={categoryPosts} />)
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
    )
  }
}

const mapStateToProps = ({ posts, categories }) => {
  return {
    posts,
    categories,
  }
}

export default connect(mapStateToProps)(Category)
